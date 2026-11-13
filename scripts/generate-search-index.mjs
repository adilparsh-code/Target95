#!/usr/bin/env node
// Regenerates src/content/searchIndex.mjs (the answer-free search projection).
//
//   npm run generate:search-index
//
// test/search-index.test.mjs fails if the snapshot drifts from the catalog or if it ever
// contains an answer-bearing field.
import fs from "node:fs";
import path from "node:path";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

const root = process.cwd();
register(pathToFileURL(path.join(root, "scripts/lib/alias-loader.mjs")));

const { buildSearchIndex, renderSearchIndexModule } = await import(pathToFileURL(path.join(root, "src/content/searchProjection.mjs")));
const { getCatalog } = await import(pathToFileURL(path.join(root, "src/lib/content/staticSource.js")));

const { questions, chapters } = getCatalog();
const index = buildSearchIndex(questions, chapters);
const target = path.join(root, "src/content/searchIndex.mjs");
fs.writeFileSync(target, renderSearchIndexModule(index));
console.log(`Wrote ${path.relative(root, target)}: ${index.questions.length} questions, ${index.chapters.length} chapters, ${fs.statSync(target).size} bytes.`);
