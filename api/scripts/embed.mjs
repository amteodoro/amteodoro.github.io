#!/usr/bin/env node
/**
 * Pre-compute embeddings for all knowledge base chunks.
 * 
 * Usage:
 *   OPENROUTER_API_KEY=sk-... node scripts/embed.mjs
 * 
 * This generates src/embeddings.json which is bundled into the worker.
 * The embeddings are computed using a small, fast model via OpenRouter.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_KEY = process.env.OPENROUTER_API_KEY;
if (!API_KEY) {
    console.error('ERROR: Set OPENROUTER_API_KEY environment variable');
    process.exit(1);
}

// Dynamically import the knowledge base
// We need to extract the array from the JS module
const kbPath = join(__dirname, '..', 'src', 'knowledge-base.js');
const kbContent = readFileSync(kbPath, 'utf-8');

// Parse chunks from the JS file using a simple regex approach
// Extract the content fields
const chunkRegex = /\{\s*id:\s*"([^"]+)"[\s\S]*?content:\s*`([^`]+)`\s*\}/g;
const chunks = [];
let match;
while ((match = chunkRegex.exec(kbContent)) !== null) {
    chunks.push({ id: match[1], content: match[2].trim() });
}

console.log(`Found ${chunks.length} chunks to embed`);

// Use OpenRouter with a small embedding model
// OpenRouter supports openai/text-embedding-3-small
const EMBED_URL = 'https://openrouter.ai/api/v1/embeddings';
const EMBED_MODEL = 'nvidia/llama-nemotron-embed-vl-1b-v2:free';

async function getEmbeddings(texts) {
    const response = await fetch(EMBED_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: EMBED_MODEL,
            input: texts,
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Embedding API error ${response.status}: ${err}`);
    }

    const data = await response.json();
    return data.data.map(d => d.embedding);
}

async function main() {
    console.log(`Using model: ${EMBED_MODEL}`);

    // Embed in batches of 10
    const batchSize = 10;
    const allEmbeddings = [];

    for (let i = 0; i < chunks.length; i += batchSize) {
        const batch = chunks.slice(i, i + batchSize);
        const texts = batch.map(c => c.content);
        console.log(`Embedding batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(chunks.length / batchSize)}...`);

        const embeddings = await getEmbeddings(texts);

        for (let j = 0; j < batch.length; j++) {
            allEmbeddings.push({
                id: batch[j].id,
                content: batch[j].content,
                embedding: embeddings[j],
            });
        }
    }

    const outputPath = join(__dirname, '..', 'src', 'embeddings.json');
    writeFileSync(outputPath, JSON.stringify(allEmbeddings, null, 2));
    console.log(`\nWrote ${allEmbeddings.length} embeddings to ${outputPath}`);
    console.log(`Embedding dimensions: ${allEmbeddings[0].embedding.length}`);
}

main().catch(console.error);
