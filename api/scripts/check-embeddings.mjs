#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const kbPath = join(here, "..", "src", "knowledge-base.js");
const embeddingsPath = join(here, "..", "src", "embeddings.json");
const kbContent = readFileSync(kbPath, "utf8");
const embeddings = JSON.parse(readFileSync(embeddingsPath, "utf8"));

const chunkRegex = /\{\s*id:\s*"([^"]+)[\s\S]*?content:\s*`([^`]+)`\s*\}/g;
const chunks = [];
let match;
while ((match = chunkRegex.exec(kbContent)) !== null) {
  chunks.push({ id: match[1], content: match[2].trim() });
}

const kbIds = new Set(chunks.map((chunk) => chunk.id));
const embeddingIds = new Set(embeddings.map((chunk) => chunk.id));
const missing = chunks.filter((chunk) => !embeddingIds.has(chunk.id)).map((chunk) => chunk.id);
const stale = embeddings.filter((chunk) => !kbIds.has(chunk.id)).map((chunk) => chunk.id);
const changed = chunks
  .filter((chunk) => {
    const embedded = embeddings.find((candidate) => candidate.id === chunk.id);
    return embedded && embedded.content !== chunk.content;
  })
  .map((chunk) => chunk.id);

if (missing.length || stale.length || changed.length || kbIds.size !== chunks.length || embeddingIds.size !== embeddings.length) {
  console.error(JSON.stringify({ missing, stale, changed, knowledgeChunks: chunks.length, embeddings: embeddings.length }, null, 2));
  process.exit(1);
}

console.log(`Embeddings are in sync: ${chunks.length} chunks.`);
