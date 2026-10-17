import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const source = fs.readFileSync(new URL("../src/app/learn/[board]/[classSlug]/page.jsx", import.meta.url), "utf8");

test("BoardPrep class cards link only subjects with published chapters", () => {
  assert.match(source, /getPublishedChapters\(boardSlug, classSlug, subject\.slug\)\.length/);
  assert.match(source, /publishedCount \? <Link/);
  assert.match(source, /<article key=\{subject\.slug\}/);
  assert.match(source, /Coming soon/);
});
