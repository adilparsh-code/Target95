import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { getQuestionHref } from "../src/lib/study/chapterSections.mjs";

test("chapter-list Solve links use the chapter question player for supplemental ICSE records", async () => {
  const icse = { id: "icse-x-oop-1", board: "ICSE", practiceHref: "/question-bank" };
  assert.equal(getQuestionHref(icse, "classes-objects"), "/Java/classes-objects/question/icse-x-oop-1");

  // The component must build its link through that single helper, never from practiceHref.
  const source = await readFile("src/app/components/study/QuestionSection.jsx", "utf8");
  assert.match(source, /href=\{getQuestionHref\(q, chapter\)\}/);
  assert.doesNotMatch(source, /q\.practiceHref/);
});
