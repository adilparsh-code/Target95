import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("chapter-list Solve links use the chapter question player for supplemental ICSE records", async () => {
  const source = await readFile("src/app/components/study/QuestionSection.jsx", "utf8");
  assert.match(source, /href=\{\`\/Java\/\$\{chapter\}\/question\/\$\{q\.id\}\`\}/);
  assert.doesNotMatch(source, /q\.practiceHref/);
});
