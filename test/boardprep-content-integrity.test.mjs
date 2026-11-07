import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "src/app/data/boardprep/content");
// Leaked drafting/self-correction text must never reach students.
const SCRATCH = /(\bwait\b[,.…—-]|\.\.\. wait|seems inconsistent|perhaps the|may have a typo|let me (re|recompute|recalculate|verify|provide)|actually,? (let|the standard)|\bhmm\b|i may have made)/i;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const subjectFiles = walk(ROOT).filter((f) => f.endsWith("subject.json"));
const chapterFiles = walk(ROOT).filter((f) => f.endsWith(".json") && !f.endsWith("subject.json"));

function listedChapters(subjectFile) {
  const subject = JSON.parse(fs.readFileSync(subjectFile, "utf8"));
  const out = new Map();
  const visit = (node) => {
    if (Array.isArray(node)) node.forEach(visit);
    else if (node && typeof node === "object") {
      if (Array.isArray(node.chapters)) node.chapters.forEach((c) => out.set(c.slug, c.id));
      Object.values(node).forEach(visit);
    }
  };
  visit(subject);
  return out;
}

test("every chapter file is valid JSON", () => {
  for (const file of chapterFiles) {
    assert.doesNotThrow(() => JSON.parse(fs.readFileSync(file, "utf8")), path.relative(ROOT, file));
  }
});

test("chapter file ids match the id listed in subject.json", () => {
  for (const subjectFile of subjectFiles) {
    const listed = listedChapters(subjectFile);
    const dir = path.dirname(subjectFile);
    for (const file of chapterFiles.filter((f) => f.startsWith(dir + path.sep))) {
      const slug = path.basename(file, ".json");
      if (!listed.has(slug)) continue;
      const chapter = JSON.parse(fs.readFileSync(file, "utf8"));
      assert.equal(chapter.id, listed.get(slug), path.relative(ROOT, file));
    }
  }
});

test("questions are well formed and free of leaked drafting text", () => {
  const seen = new Set();
  for (const file of chapterFiles) {
    const chapter = JSON.parse(fs.readFileSync(file, "utf8"));
    const where = path.relative(ROOT, file);
    assert.ok(!SCRATCH.test(JSON.stringify(chapter)), `${where} contains drafting text`);
    for (const q of chapter.questions || []) {
      assert.ok(!seen.has(q.id), `duplicate question id ${q.id}`);
      seen.add(q.id);
      assert.ok(q.prompt && q.explanation, `${where}:${q.id} needs prompt and explanation`);
      if (q.type === "mcq") {
        assert.ok(Array.isArray(q.options) && q.options.length >= 2, `${where}:${q.id} options`);
        const correct = String(q.options[q.correctIndex] ?? "").trim().toLowerCase();
        const answer = String(q.answer ?? "").trim().toLowerCase().replace(/\.$/, "");
        assert.ok(answer, `${where}:${q.id} needs a non-empty answer`);
        assert.ok(correct && (correct === answer || correct.includes(answer) || answer.startsWith(correct)), `${where}:${q.id} answer must match options[correctIndex]`);
      }
    }
  }
});
