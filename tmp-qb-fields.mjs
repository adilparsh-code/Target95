import fs from "node:fs";
import path from "node:path";

const dir = "src/app/data/question-bank";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".js") && f !== "index.js");
const CATS = [
  "mcqs", "assertionReasons", "trueFalse", "fillBlanks", "outputQuestions",
  "errorFinding", "programmingQuestions", "debuggingQuestions",
  "caseBasedQuestions", "vivaQuestions",
];
function load(file) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const name = (raw.match(/^\s*(?:const|let|var)\s+(\w+)\s*=\s*\{/m) || [])[1];
  if (!name) return null;
  try { return new Function(`${raw.replace(/export\s+default\s+\w+\s*;?/g, "")}\n;return ${name};`)(); }
  catch { return null; }
}
const byCat = {};
for (const file of files) {
  const ch = load(file);
  if (!ch) continue;
  for (const cat of CATS) {
    if (!Array.isArray(ch[cat])) continue;
    byCat[cat] ??= { n: 0, keys: {} };
    for (const q of ch[cat]) {
      byCat[cat].n++;
      for (const k of Object.keys(q)) byCat[cat].keys[k] = (byCat[cat].keys[k] || 0) + 1;
    }
  }
}
for (const [cat, info] of Object.entries(byCat)) {
  const keys = Object.entries(info.keys).sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `${k}(${v})`).join(" ");
  console.log(`\n${cat}  n=${info.n}\n  ${keys}`);
}
