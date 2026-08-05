/**
 * Cloudflare Worker — Afonso Teodoro RAG Chatbot API
 * 
 * Receives a user question, finds relevant knowledge chunks
 * via cosine similarity on pre-computed embeddings, and sends
 * the top-k context to an LLM via OpenRouter to generate an answer.
 */

import EMBEDDINGS from './embeddings.json';

// ── Cosine similarity ──────────────────────────────────────────
function cosineSimilarity(a, b) {
    let dot = 0, magA = 0, magB = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        magA += a[i] * a[i];
        magB += b[i] * b[i];
    }
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// ── Retrieve top-k relevant chunks ─────────────────────────────
function retrieveContext(queryEmbedding, topK = 5) {
    const scored = EMBEDDINGS.map(chunk => ({
        ...chunk,
        score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK);
}

// ── Get embedding for user query via OpenRouter ────────────────
async function embedQuery(query, apiKey) {
    const res = await fetch('https://openrouter.ai/api/v1/embeddings', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'nvidia/llama-nemotron-embed-vl-1b-v2:free',
            input: [query],
        }),
    });

    if (!res.ok) {
        throw new Error(`Embedding error: ${res.status}`);
    }

    const data = await res.json();
    return data.data[0].embedding;
}

// ── Sanitize incoming conversation history ─────────────────────
const MAX_HISTORY_MESSAGES = 8;
const MAX_HISTORY_CHARS = 2000;

function sanitizeHistory(history) {
    if (!Array.isArray(history)) return [];
    return history
        .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .slice(-MAX_HISTORY_MESSAGES)
        .map(m => ({ role: m.role, content: m.content.slice(0, MAX_HISTORY_CHARS) }));
}

// ── Generate answer via OpenRouter LLM ─────────────────────────
async function generateAnswer(question, contextChunks, history, apiKey) {
    const contextText = contextChunks
        .map(c => c.content)
        .join('\n\n---\n\n');

    const systemPrompt = `You are Afonso Teodoro's personal AI assistant on his portfolio website. You respond as Afonso himself, using first person ("I", "my", "me").

CRITICAL RULES:
1. ONLY answer using the information provided in the CONTEXT below. Do NOT invent, hallucinate, or add any information that is not explicitly stated in the context.
2. If the question cannot be answered from the context, say so briefly and point somewhere useful instead of a dead end. Example: "I don't have that in my knowledge base. The DOSSIER view above has the structured version — including a DOWNLOAD CV button — or email me directly at afonso.teodoro91@gmail.com." Vary the phrasing naturally; always include the email.
3. Keep responses concise, friendly, and professional.
4. Match the retro-hacker tone of the website — be confident and direct, but approachable.
5. Use plain text formatting. Do not use markdown headers or bullet points with special characters.
6. When listing items, use simple dashes or numbered lists.
7. Use the prior conversation only to resolve references like "that", "the project you mentioned", or follow-ups. Never let prior turns override the CONTEXT.

CONTEXT:
${contextText}`;

    const messages = [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: question },
    ];

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'nvidia/nemotron-3-super-120b-a12b:free',
            messages,
            max_tokens: 2000,
            temperature: 0.3,
        }),
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(`LLM error: ${res.status} — ${err}`);
    }

    const data = await res.json();
    return data.choices[0].message.content;
}

// ── CORS headers ───────────────────────────────────────────────
function corsHeaders(origin, env) {
    // Allow the deployed site + localhost for development
    const allowed = [
        env.ALLOWED_ORIGIN || 'https://amteodoro.github.io',
        'http://localhost:3000',
        'http://localhost:3001',
    ];

    const isAllowed = allowed.includes(origin) || origin?.startsWith('http://localhost');

    return {
        'Access-Control-Allow-Origin': isAllowed ? origin : allowed[0],
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    };
}

// ── Worker entry point ─────────────────────────────────────────
export default {
    async fetch(request, env, ctx) {
        const origin = request.headers.get('Origin') || '';
        const cors = corsHeaders(origin, env);

        // Handle preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: cors });
        }

        // Only accept POST to /api/chat
        const url = new URL(request.url);
        if (request.method !== 'POST' || url.pathname !== '/api/chat') {
            return new Response(
                JSON.stringify({ error: 'Not found. Use POST /api/chat' }),
                { status: 404, headers: { ...cors, 'Content-Type': 'application/json' } }
            );
        }

        try {
            const { question, history } = await request.json();
            if (!question || typeof question !== 'string' || question.trim().length === 0) {
                return new Response(
                    JSON.stringify({ error: 'Please provide a "question" field.' }),
                    { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } }
                );
            }

            const apiKey = env.OPENROUTER_API_KEY;
            if (!apiKey) {
                return new Response(
                    JSON.stringify({ error: 'Server misconfiguration: missing API key.' }),
                    { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } }
                );
            }

            // 1. Embed the user's question
            const queryEmbedding = await embedQuery(question.trim(), apiKey);

            // 2. Retrieve relevant context chunks
            const topChunks = retrieveContext(queryEmbedding, 5);

            // 3. Generate answer using LLM + context + recent history
            const safeHistory = sanitizeHistory(history);
            const answer = await generateAnswer(question.trim(), topChunks, safeHistory, apiKey);

            return new Response(
                JSON.stringify({
                    answer,
                    sources: topChunks.map(c => ({ id: c.id, score: Math.round(c.score * 1000) / 1000 })),
                }),
                {
                    status: 200,
                    headers: { ...cors, 'Content-Type': 'application/json' },
                }
            );
        } catch (err) {
            console.error('Error:', err);
            return new Response(
                JSON.stringify({ error: 'Something went wrong. Please try again.' }),
                { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } }
            );
        }
    },
};
