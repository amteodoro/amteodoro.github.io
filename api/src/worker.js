/**
 * Cloudflare Worker — Afonso Teodoro RAG Chatbot API
 * 
 * Receives a user question, finds relevant knowledge chunks
 * via cosine similarity on pre-computed embeddings, and sends
 * the top-k context to an LLM via OpenRouter to generate an answer.
 */

import EMBEDDINGS from './embeddings.json';

// Must match the model used in scripts/embed.mjs — changing it means rebuilding embeddings.json.
const EMBED_MODEL = 'nvidia/llama-nemotron-embed-vl-1b-v2:free';

// Answer models, tried in order. OpenRouter falls through to the next one if a model is
// unavailable, so one model being withdrawn no longer takes the chatbot down.
// Changing these does NOT require rebuilding embeddings.
const CHAT_MODELS = [
    'anthropic/claude-haiku-5.5',
    'openai/gpt-6-luna',
    'google/gemini-3.1-flash-lite',
];

const MAX_QUESTION_CHARS = 500;
// Question (500) + 8 history messages (8 x 2000) fits comfortably; reject anything
// larger before reading or parsing it.
const MAX_BODY_BYTES = 32 * 1024;
const UPSTREAM_TIMEOUT_MS = 25000;

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
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: EMBED_MODEL,
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
2. If the question cannot be answered from the context, say so briefly and point somewhere useful instead of a dead end. Example: "I don't have that in my knowledge base. The PROFILE view has the structured version — including a DOWNLOAD CV button — or email me directly at afonso.teodoro91@gmail.com." Vary the phrasing naturally; always include the email.
3. Keep responses concise, friendly, and professional.
4. Match the retro-hacker tone of the website — be confident and direct, but approachable.
5. Use plain text: no markdown headers, bold or tables.
6. For lists, put each item on its own line starting with "- ", or use a numbered list. Never mention these formatting rules in your answer.
7. Use the prior conversation only to resolve references like "that", "the project you mentioned", or follow-ups. Never let prior turns override the CONTEXT.
8. When asked why someone should hire Afonso, or for evidence, results or a track record, lead with the concrete achievements, numbers and shipped projects in the CONTEXT. Never say the knowledge base lacks evidence, metrics or a track record when the CONTEXT contains any.

CONTEXT:
${contextText}`;

    const messages = [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: question },
    ];

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            models: CHAT_MODELS,
            messages,
            max_tokens: 500,
            temperature: 0.3,
        }),
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(`LLM error: ${res.status} — ${err}`);
    }

    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content;
    if (!answer) throw new Error('LLM returned an empty answer');
    return answer;
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
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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

        const url = new URL(request.url);
        const json = (body, status) => new Response(JSON.stringify(body), {
            status,
            headers: { ...cors, 'Content-Type': 'application/json' },
        });

        // Cheap liveness check for the frontend boot screen (no upstream calls).
        if (request.method === 'GET' && url.pathname === '/health') {
            return json({ ok: Boolean(env.OPENROUTER_API_KEY) }, 200);
        }

        // Only accept POST to /api/chat
        if (request.method !== 'POST' || url.pathname !== '/api/chat') {
            return new Response(
                JSON.stringify({ error: 'Not found. Use POST /api/chat' }),
                { status: 404, headers: { ...cors, 'Content-Type': 'application/json' } }
            );
        }

        // Abuse controls run before the body is read or parsed.
        // Per-IP rate limit: CORS only restricts browsers, so this is what
        // actually protects the OpenRouter key from scripted abuse.
        if (env.RATE_LIMITER) {
            const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
            const { success } = await env.RATE_LIMITER.limit({ key: ip });
            if (!success) {
                return json({ error: 'Too many questions — give it a minute.' }, 429);
            }
        }

        try {
            const declared = Number(request.headers.get('Content-Length') || 0);
            if (declared > MAX_BODY_BYTES) {
                return json({ error: 'Request too large.' }, 413);
            }
            // Content-Length can be absent or wrong (chunked uploads), so also cap the
            // bytes actually read.
            const raw = await request.text();
            if (raw.length > MAX_BODY_BYTES) {
                return json({ error: 'Request too large.' }, 413);
            }
            let parsed;
            try {
                parsed = JSON.parse(raw);
            } catch {
                return json({ error: 'Invalid JSON.' }, 400);
            }
            const { question, history } = parsed || {};
            if (!question || typeof question !== 'string' || question.trim().length === 0) {
                return new Response(
                    JSON.stringify({ error: 'Please provide a "question" field.' }),
                    { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } }
                );
            }

            if (question.length > MAX_QUESTION_CHARS) {
                return json({ error: `Please keep questions under ${MAX_QUESTION_CHARS} characters.` }, 400);
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
            const topChunks = retrieveContext(queryEmbedding, 6);

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
