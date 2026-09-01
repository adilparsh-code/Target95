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
  const body = raw.replace(/export\s+default\s+\w+\s*;?/g, "");
  try {
    return new Function(`${body}\n;return ${name};`)();
  } catch (e) {
    return { __error: e.message };
  }
}

const report = [];
for (const file of files) {
  const ch = load(file);
  if (!ch) { report.push({ file, note: "no top-level object" }); continue; }
  if (ch.__error) { report.push({ file, note: "eval error: " + ch.__error }); continue; }
  const counts = {};
  let total = 0;
  const problems = [];
  const ids = new Set();
  for (const cat of CATS) {
    const items = ch[cat];
    if (!Array.isArray(items)) continue;
    counts[cat] = items.length;
    total += items.length;
    items.forEach((q, i) => {
      const where = `${cat}[${i}]`;
      if (!q.id) problems.push(`${where} missing id`);
      else if (ids.has(q.id)) problems.push(`${where} duplicate id ${q.id}`);
      else ids.add(q.id);
      if (!q.question) problems.push(`${where} missing question`);
      const isMcqLike = cat === "mcqs" || cat === "assertionReasons";
      if (isMcqLike) {
        if (!Array.isArray(q.options) || q.options.length < 2) problems.push(`${where} ${q.id} no options`);
        const ca = q.correctAnswer;
        if (typeof ca !== "string" || !/^[A-E]$/.test(ca.trim())) {
          problems.push(`${where} ${q.id} non-letter correctAnswer: ${JSON.stringify(ca)}`);
        } else if (Array.isArray(q.options)) {
          const idx = ca.trim().toUpperCase().charCodeAt(0) - 65;
          if (idx >= q.options.length) problems.push(`${where} ${q.id} answer letter out of range`);
        }
      }
      if (!q.explanation && !q.solution && !q.sampleAnswer) problems.push(`${where} ${q.id} no explanation/solution`);
    });
  }
  report.push({ file, slug: ch.slug, id: ch.id, title: ch.title, total, counts, problems });
}

let grand = 0;
for (const r of report) {
  console.log(`\n### ${r.file}  slug=${r.slug ?? "(none)"} id=${r.id ?? "-"}`);
  if (r.note) { console.log("  " + r.note); continue; }
  grand += r.total;
  console.log("  total=" + r.total, JSON.stringify(r.counts));
  if (r.problems.length) {
    console.log("  PROBLEMS (" + r.problems.length + "):");
    r.problems.slice(0, 12).forEach((p) => console.log("    - " + p));
    if (r.problems.length > 12) console.log("    ... +" + (r.problems.length - 12) + " more");
  }
}
console.log("\nGRAND TOTAL QUESTIONS =", grand);
