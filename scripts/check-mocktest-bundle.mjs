#!/usr/bin/env node
// Answer-key exposure audit for the mock-test client bundles. Run after `next build`:
//
//   node scripts/check-mocktest-bundle.mjs
//
// Takes sentinel strings (explanation text, answer-bearing ids) from every question the
// mock-test server can deliver, and fails if any of them appears in a JavaScript chunk that the
// mock-test pages load statically. It also REPORTS (does not fail on) chunks that hold the
// content catalog but are only loaded on demand (the global search), because those are
// reachable from any page.
import fs from "node:fs";
import path from "node:path";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

const root = process.cwd();
register(pathToFileURL(path.join(root, "scripts/lib/alias-loader.mjs")));
const { getContentQuestions } = await import(pathToFileURL(path.join(root, "src/lib/mocktestContent.js")));

const nextDir = path.join(root, ".next");
if (!fs.existsSync(nextDir)) {
  console.error("No .next build found. Run `next build` first.");
  process.exit(2);
}

const questions = getContentQuestions();
const sentinels = questions
  .map((q) => ({ id: q.sourceId, text: q.explanation && q.explanation.length >= 30 ? q.explanation.slice(0, 60) : null }))
  .filter((item) => item.text);
// JS source escapes quotes/newlines; compare on the first run of plain characters.
const plain = (text) => text.split(/["\\\n]/)[0];
const probes = sentinels.map((item) => ({ id: item.id, text: plain(item.text) })).filter((item) => item.text.length >= 25);

const readText = (file) => fs.readFileSync(file, "utf8");
const sourceIds = questions.map((q) => q.sourceId);
// A chunk "contains the content-engine bank" when it embeds a large number of explanation
// fragments (answer-bearing text). Question ids alone do NOT count: the answer-free search
// projection legitimately carries ids and question text. One to a few fragment matches are
// ordinary phrases that also exist in study chapters or in the legacy mock-test bank.
const MIN_PROBES_FOR_BANK = 10;
function scan(file) {
  const content = readText(file);
  const ids = sourceIds.filter((id) => content.includes(`"${id}"`) || content.includes(`'${id}'`)).length;
  const fragments = probes.filter((probe) => content.includes(probe.text)).length;
  return { ids, fragments, isBank: fragments >= MIN_PROBES_FOR_BANK, answerFreeIndex: fragments < MIN_PROBES_FOR_BANK && ids >= 100 };
}
const countHits = (file) => { const { fragments, isBank } = scan(file); return isBank ? fragments : 0; };
const overlapOnly = (file) => { const { ids, fragments, isBank } = scan(file); return !isBank && fragments > 0 ? fragments : 0; };

// Static chunks of a route: every `static/chunks/*.js` named in its client-reference manifest
// (plus the root layout's).
function staticChunksFor(routeDir) {
  const chunks = new Set();
  for (const manifest of [path.join(nextDir, "server/app", routeDir, "page_client-reference-manifest.js"), path.join(nextDir, "server/app/layout_client-reference-manifest.js")]) {
    if (!fs.existsSync(manifest)) continue;
    for (const match of readText(manifest).matchAll(/static\/chunks\/[A-Za-z0-9_\-./]+?\.js/g)) chunks.add(match[0]);
  }
  return [...chunks];
}

// Chunk-to-chunk references: dynamic imports appear as "static/chunks/<name>.js" literals.
const chunkRefs = (chunk) => {
  const file = path.join(nextDir, chunk);
  if (!fs.existsSync(file)) return [];
  return [...new Set([...readText(file).matchAll(/static\/chunks\/[A-Za-z0-9_\-./]+?\.js/g)].map((match) => match[0]))];
};
// Everything a route can load: its static chunks plus every chunk reachable through dynamic imports.
function reachableChunks(start) {
  const seen = new Set(start);
  const queue = [...start];
  while (queue.length) for (const next of chunkRefs(queue.shift())) if (!seen.has(next)) { seen.add(next); queue.push(next); }
  return [...seen];
}

const ROUTES = ["mock-test", "mock-test/instructions", "mock-test/player", "mock-test/result"];
let failures = 0;
console.log(`Probes: ${probes.length} explanation fragments from ${questions.length} deliverable questions.`);
for (const route of ROUTES) {
  const chunks = staticChunksFor(route);
  const hits = chunks.map((chunk) => ({ chunk, hits: countHits(path.join(nextDir, chunk)) })).filter((item) => item.hits > 0);
  const overlaps = chunks.map((chunk) => ({ chunk, n: overlapOnly(path.join(nextDir, chunk)) })).filter((item) => item.n > 0);
  console.log(`/${route}: ${chunks.length} static chunks, ${hits.length} embed the content-engine bank, ${overlaps.length} share a few phrases with legacy/study text`);
  for (const item of hits) { console.log(`  LEAK ${item.chunk} (${item.hits} matches)`); failures += 1; }
  for (const item of overlaps) console.log(`  note ${item.chunk}: ${item.n} explanation phrase(s) also present in legacy/study copy (not the bank)`);
  // Dynamic reachability: anything the page can load on demand (global search in the Navbar included).
  const reachable = reachableChunks(chunks);
  const dynamicBank = reachable.filter((chunk) => !chunks.includes(chunk) && countHits(path.join(nextDir, chunk)) > 0);
  const dynamicIndex = reachable.filter((chunk) => !chunks.includes(chunk) && scan(path.join(nextDir, chunk)).answerFreeIndex);
  console.log(`  reachable on demand: ${reachable.length - chunks.length} more chunks; ${dynamicIndex.length} answer-free search index, ${dynamicBank.length} embedding the bank`);
  for (const chunk of dynamicBank) { console.log(`  LEAK (on demand) ${chunk}`); failures += 1; }
}

// Positive control: the practice routes DO ship the bank. If the detector cannot see it there,
// a clean result above would mean nothing, so fail loudly.
for (const route of ["bookmarks", "question-bank"]) {
  const chunks = staticChunksFor(route);
  const found = reachableChunks(chunks).filter((chunk) => countHits(path.join(nextDir, chunk)) > 0);
  console.log(`control /${route}: detector sees ${found.length} bank chunk(s)${found.length ? " (expected)" : " - DETECTOR BROKEN"}`);
  if (!found.length) failures += 1;
}

const onDemand = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".js")) {
      const hits = countHits(full);
      if (hits > 0) onDemand.push({ file: path.relative(nextDir, full), hits });
    }
  }
};
walk(path.join(nextDir, "static/chunks"));
console.log(`Client chunks anywhere that contain content-engine answer text: ${onDemand.length}`);
for (const item of onDemand) console.log(`  static/${item.file.replace(/^static\//, "")} (${item.hits} probes) - only reachable from practice routes (verified above)`);

if (failures > 0) { console.error(`FAIL: ${failures} mock-test chunk(s) expose or can reach answer text.`); process.exit(1); }
console.log("PASS: no mock-test route loads, or can reach on demand, content-engine answer text.");
