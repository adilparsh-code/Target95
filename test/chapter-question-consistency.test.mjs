// P1-A: the chapter pages (/study/[slug], /Java/[chapter]) must list exactly the
// questions their count claims, through one identity table, with no duplicates and
// no question lost to an alias mismatch.
import { test, before } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

let api;
let catalog;
let studyCenter;
let bank;
let identity;

before(async () => {
  register(pathToFileURL(path.join(process.cwd(), "scripts/lib/alias-loader.mjs")));
  api = await import("../src/lib/content/index.js");
  ({ getCatalog: catalog } = await import("../src/lib/content/staticSource.js"));
  studyCenter = await import("../src/lib/studyCenter.js");
  bank = await import("../src/lib/javaChapterQuestionBank.js");
  identity = await import("../src/content/identity.mjs");
});

// Every slug a student can land on: study slugs, canonical slugs, aliases, bank route slugs.
async function everyRouteSlug() {
  const curriculum = await import("../src/app/data/javaCurriculum.js");
  return [
    ...new Set([
      ...studyCenter.getStudyChapters().map((chapter) => chapter.slug),
      ...curriculum.javaChapters.map((chapter) => chapter.slug),
      ...Object.keys(bank.chapterQuestionBankBySlug),
      ...catalog().aliasIndex.keys(),
    ]),
  ];
}

test("canonical slug lookup lists questions for the canonical chapter", () => {
  for (const slug of ["introduction-to-java", "for-loop", "arrays-1d", "constructors", "classes-objects", "if-else"]) {
    assert.ok(api.getChapterQuestionRecords(slug).length > 0, `${slug} should list questions`);
  }
});

test("legacy slug lookup lists the same questions as its canonical twin", () => {
  for (const [legacy, canonical] of [
    ["introduction", "introduction-to-java"],
    ["loops", "for-loop"],
    ["arrays", "arrays-1d"],
    ["variables-data-types", "data-types-variables"],
    ["class-as-basis-of-computation", "classes-objects"],
    ["constructor", "constructors"],
    ["data-processing-in-java", "input-in-java"],
  ]) {
    const legacyIds = api.getChapterQuestionRecords(legacy).map((record) => record.id);
    const canonicalIds = api.getChapterQuestionRecords(canonical).map((record) => record.id);
    assert.ok(legacyIds.length > 0, legacy);
    assert.deepEqual(legacyIds, canonicalIds, `${legacy} vs ${canonical}`);
  }
});

test("question count equals displayed question count on every chapter route", async () => {
  const mismatches = [];
  for (const slug of await everyRouteSlug()) {
    const chapter = studyCenter.resolveStudyChapter(slug);
    if (!chapter) continue; // not a routable chapter
    const displayed = api.getChapterQuestionRecords(slug).length;
    if (chapter.totalQuestions !== displayed) mismatches.push(`${slug}: count ${chapter.totalQuestions} vs list ${displayed}`);
  }
  assert.deepEqual(mismatches, []);
});

test("the study list of a chapter also equals its difficulty breakdown", async () => {
  for (const slug of await everyRouteSlug()) {
    const chapter = studyCenter.resolveStudyChapter(slug);
    if (!chapter) continue;
    const list = api.getChapterQuestions ? api.getChapterQuestions(slug) : api.getQuestions({ chapter: slug });
    assert.equal(chapter.easyCount, list.filter((q) => q.difficulty === "Easy").length, slug);
    assert.equal(chapter.mediumCount, list.filter((q) => q.difficulty === "Medium").length, slug);
    assert.equal(chapter.hardCount, list.filter((q) => q.difficulty === "Hard").length, slug);
  }
});

test("no chapter lists a question twice, and lists keep source order", async () => {
  const order = new Map(catalog().questions.map((question, index) => [question.id, index]));
  for (const slug of await everyRouteSlug()) {
    const ids = api.getChapterQuestionRecords(slug).map((record) => record.id);
    assert.equal(new Set(ids).size, ids.length, `${slug} lists a duplicate`);
    const positions = ids.map((id) => order.get(id));
    assert.deepEqual(positions, [...positions].sort((a, b) => a - b), `${slug} order`);
  }
  const all = catalog().questions.map((question) => question.id);
  assert.equal(new Set(all).size, all.length);
});

test("no question is lost to an alias mismatch: every bank route still lists its questions", () => {
  const { chapterQuestionBankBySlug } = bank;
  for (const [routeSlug, routeQuestions] of Object.entries(chapterQuestionBankBySlug)) {
    const listed = new Set(api.getChapterQuestionRecords(routeSlug).map((record) => record.id));
    const missing = routeQuestions.map((question) => String(question.id)).filter((id) => !listed.has(id));
    assert.deepEqual(missing, [], `${routeSlug} is missing questions the bank route exposes`);
  }
});

test("sibling chapters expose the questions the question-player route already serves", () => {
  for (const sibling of ["while-loop", "do-while-loop", "arrays-2d", "nested-if", "switch", "custom-methods", "string-handling"]) {
    assert.ok(api.getChapterQuestionRecords(sibling).length > 0, sibling);
  }
});

test("every catalog question is reachable from at least one chapter list, nothing fabricated", () => {
  const { questions } = catalog();
  const sourceIds = new Set(bank.allJavaChapterQuestions.map((question) => String(question.id)));
  const reachable = new Set();
  for (const chapter of api.getChapters()) {
    for (const record of api.getChapterQuestionRecords(chapter.id)) reachable.add(record.id);
  }
  const unreachable = questions.filter((question) => !reachable.has(question.id)).map((question) => question.id);
  // Only supplemental ICSE board questions filed under a title slug may be outside a chapter list.
  assert.ok(unreachable.every((id) => !sourceIds.has(id)), "a Java bank question is unreachable");
  const fabricated = [...reachable].filter((id) => !catalog().recordIndex.has(id));
  assert.deepEqual(fabricated, []);
  // Chapters with no questions stay empty.
  assert.deepEqual(api.getChapterQuestionRecords("ethical-computing"), []);
  assert.deepEqual(api.getChapterQuestionRecords("no-such-chapter"), []);
});

test("bookmarks resolve for every listed question under the slug of the route that lists it", async () => {
  const failures = [];
  for (const slug of await everyRouteSlug()) {
    for (const record of api.getChapterQuestionRecords(slug)) {
      const result = api.resolveBookmarkedQuestion({ chapter: slug, questionId: record.id });
      if (result.status !== "found") failures.push(`${slug}:${record.id}`);
    }
  }
  assert.deepEqual(failures, []);
});

test("global search still sees every question a chapter lists, with a resolvable chapter", () => {
  const searchable = new Map(api.getQuestions().map((question) => [question.id, question]));
  for (const chapter of api.getChapters()) {
    for (const record of api.getChapterQuestionRecords(chapter.id)) {
      const question = searchable.get(record.id);
      assert.ok(question, `${record.id} missing from search source`);
      assert.ok(api.getChapter(question.chapterId), `${record.id} chapter does not resolve`);
    }
  }
});

test("both chapter routes read questions through the content selectors, not the legacy adapter", () => {
  for (const file of ["src/app/study/[slug]/page.jsx", "src/app/Java/[chapter]/page.jsx"]) {
    const source = fs.readFileSync(path.join(process.cwd(), file), "utf8");
    assert.match(source, /getChapterQuestionRecords/, `${file} should use the selector`);
    assert.doesNotMatch(source, /questionBankAdapter/, `${file} still imports the legacy adapter`);
  }
});

test("identity resolution is shared: the selector, counts and bookmarks agree on every alias", () => {
  for (const [alias, id] of Object.entries(identity.ALIAS_TO_CANONICAL)) {
    assert.equal(api.getChapter(alias).id, id, alias);
    assert.deepEqual(
      api.getQuestions({ chapter: alias }).map((q) => q.id),
      api.getQuestions({ chapter: id }).map((q) => q.id),
      alias,
    );
  }
});

test("every question a chapter lists with a player link opens in the question route (except supplemental ICSE board items)", async () => {
  const curriculum = await import("../src/lib/curriculum.js");
  const dead = [];
  for (const slug of await everyRouteSlug()) {
    if (!studyCenter.resolveStudyChapter(slug)) continue;
    const playable = new Set(api.getChapterPlayerQuestions(slug).map((question) => String(question.id)));
    for (const record of api.getChapterQuestionRecords(slug)) {
      const opens = curriculum.getQuestionContent("java", slug, record.id) || playable.has(String(record.id));
      if (!opens) dead.push(`${slug}:${record.id}`);
    }
  }
  // The only questions without a player shape are the supplemental ICSE X board items.
  assert.deepEqual(dead.filter((entry) => !entry.split(":")[1].startsWith("icse-")), []);
});

test("player lists keep the requested slug, one entry per question, and the legacy order", () => {
  for (const slug of ["loops", "for-loop", "data-processing-in-java", "arrays-2d"]) {
    const list = api.getChapterPlayerQuestions(slug);
    assert.ok(list.length > 0, slug);
    assert.ok(list.every((question) => question.chapter === slug));
    assert.equal(new Set(list.map((question) => question.id)).size, list.length);
  }
  const legacy = bank.chapterQuestionBankBySlug["for-loop"].map((question) => String(question.id));
  assert.deepEqual(api.getChapterPlayerQuestions("for-loop").map((question) => question.id), legacy);
});
