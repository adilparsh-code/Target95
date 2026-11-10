#!/usr/bin/env node
// Regenerates src/content/questionStats.mjs from the real unified catalog.
//
//   npm run generate:content-stats
//
// The study centre shows per-chapter question counts on pages that must not
// ship the whole question bank (~106 KB gzipped) to every visitor, so it reads
// this small snapshot instead. test/content-catalog.test.mjs fails when the
// snapshot no longer matches the catalog, so it cannot drift silently.
import fs from "node:fs";
import path from "node:path";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

const root = process.cwd();
register(pathToFileURL(path.join(root, "scripts/lib/alias-loader.mjs")));

const { computeQuestionStats, renderQuestionStatsModule } = await import(pathToFileURL(path.join(root, "src/content/stats.mjs")));
const { getCatalog } = await import(pathToFileURL(path.join(root, "src/lib/content/staticSource.js")));

const stats = computeQuestionStats(getCatalog().questions);
const target = path.join(root, "src/content/questionStats.mjs");
fs.writeFileSync(target, renderQuestionStatsModule(stats));
console.log(`Wrote ${path.relative(root, target)} for ${Object.keys(stats).length} chapters.`);
