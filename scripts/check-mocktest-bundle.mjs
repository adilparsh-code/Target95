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
// A chunk "contains the content-engine bank" when it embeds catalog ids (unique to the data) or a
// large number of explanation fragments. One to a few fragment matches are ordinary phrases that
// also exist in study chapters or in the legacy mock-test bank (reported separately, see below).
const MIN_PROBES_FOR_BANK = 10;
function scan(file) {
  const content = readText(file);
  const ids = sourceIds.filter((id) => content.includes(`"${id}"`) || content.includes(`'${id}'`)).length;
  const fragments = probes.filter((probe) => content.includes(probe.text)).length;
  return { ids, fragments, isBank: ids > 0 || fragments >= MIN_PROBES_FOR_BANK };
}
const countHits = (file) => { const { ids, fragments, isBank } = scan(file); return isBank ? Math.max(ids, fragments) : 0; };
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
for (const item of onDemand) console.log(`  ${item.file} (${item.hits} probes) - loaded on demand, not by the mock-test pages`);

if (failures > 0) { console.error(`FAIL: ${failures} static mock-test chunk(s) expose answer text.`); process.exit(1); }
console.log("PASS: no mock-test route loads content-engine answer text statically.");
