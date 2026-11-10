import { test, before } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import { checkIdentityTable, canonicalIdFor, quarantineReasonFor } from "../src/content/identity.mjs";
import { hasErrors } from "../src/content/validate.mjs";

let api;
let catalog;

before(async () => {
  register(pathToFileURL(path.join(process.cwd(), "test/helpers/alias-loader.mjs")));
  api = await import("../src/lib/content/index.js");
  ({ getCatalog: catalog } = await import("../src/lib/content/staticSource.js"));
});

test("identity table is structurally sound", () => {
  assert.deepEqual(checkIdentityTable(), []);
});

test("identity table ignores prototype keys such as 'constructor'", () => {
  assert.equal(canonicalIdFor("constructor"), "constructors");
  assert.equal(canonicalIdFor("toString"), null);
  assert.equal(quarantineReasonFor("hasOwnProperty"), null);
});

test("real catalog has zero validation errors", () => {
  const errors = api.getCatalogFindings().filter((finding) => finding.severity === "ERROR");
  assert.deepEqual(errors, []);
  assert.equal(hasErrors(api.getCatalogFindings()), false);
});

test("every question in the bank is kept: live + quarantined equals the source total", async () => {
  const { questionBankQuestions } = await import("../src/lib/questionBank.js");
  const { questions, quarantined } = catalog();
  assert.equal(questions.length + quarantined.length, questionBankQuestions.length);
  assert.deepEqual(
    quarantined.map((entry) => entry.question.id).sort(),
    ["icse-x-numbers-case-004", "icse-x-numbers-program-003"],
  );
  assert.ok(quarantined.every((entry) => entry.reason.length > 20));
});

test("slugs from all three namespaces resolve to a chapter", async () => {
  const curriculum = await import("../src/app/data/javaCurriculum.js");
  const legacy = (await import("../src/app/data/javaChapters.js")).default;
  const content = await import("../src/app/data/chapter-content/index.js");
  const bank = await import("../src/lib/javaChapterQuestionBank.js");
  const slugs = [
    ...curriculum.javaChapters.map((chapter) => chapter.slug),
    ...legacy.map((chapter) => chapter.slug),
    ...content.chapters.map((chapter) => chapter.slug),
    ...Object.keys(bank.chapterQuestionBankBySlug),
    "class-as-the-basis-of-computation",
  ];
  const unresolved = [...new Set(slugs)].filter((slug) => !api.getChapter(slug));
  assert.deepEqual(unresolved, []);
});

test("legacy and canonical slugs land on the same chapter", () => {
  assert.equal(api.getChapter("introduction").id, "introduction-to-java");
  assert.equal(api.getChapter("loops").id, "for-loop");
  assert.equal(api.getChapter("class-as-the-basis-of-computation").id, "classes-objects");
  assert.equal(api.getChapter("constructor").id, "constructors");
});

test("mock-test pool comes from real questions, not the dummy sample", () => {
  const pool = api.getMockTestQuestionPool({ board: "ICSE" });
  assert.ok(pool.length > 800);
  assert.ok(pool.every((question) => question.question && question.chapterId));
  assert.ok(!pool.some((question) => /linked list|two sum/i.test(question.question)));
  const loops = api.getMockTestQuestionPool({ board: "ICSE", chapter: "loops" });
  assert.ok(loops.length > 0 && loops.length < pool.length);
});
