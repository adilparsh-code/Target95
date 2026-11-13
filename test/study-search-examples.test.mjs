import { test, before } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

let studyCenter;

before(async () => {
  register(pathToFileURL(path.join(process.cwd(), "test/helpers/extensionlessLoader.mjs")));
  studyCenter = await import("../src/lib/studyCenter.js");
});

test("searchStudyContent does not throw for chapters whose examples are grouped by level", () => {
  const grouped = studyCenter.getStudyChapters().filter((chapter) => chapter.studyData?.examples && !Array.isArray(chapter.studyData.examples));
  assert.ok(grouped.length > 0, "fixture: at least one chapter groups examples by level");
  for (const term of ["polymorphism", "loop", "array", "x", "zzzz-no-match"]) {
    assert.doesNotThrow(() => studyCenter.searchStudyContent(term, {}), term);
  }
  assert.ok(studyCenter.searchStudyContent("loop", {}).chapters.length > 0);
});
