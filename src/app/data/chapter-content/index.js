/**
 * Chapter Content Registry
 * Central export point for all chapter learning content.
 * Each chapter follows the shared student-facing content contract.
 *
 * IMPORTANT: chapter.slug values here must exactly match the routable
 * slugs in src/app/data/javaChapters.js (the "Legacy" track) or this
 * content silently never renders on any real page. See
 * conditionals-combined.js / loops-combined.js / arrays-combined.js for
 * the merge history of the granular files they replace.
 */

import chapterVariables from "./data-types-variables";
import chapterOperators from "./operators";
import chapterConditionals from "./conditionals-combined";
import chapterLoops from "./loops-combined";
import chapterArrays from "./arrays-combined";
import chapter10 from "./10-strings-master";
import chapter11 from "./11-methods";
import chapter12 from "./12-classes-objects";
import chapterConstructors from "./constructors";

export const chapters = [
  chapterVariables,
  chapterOperators,
  chapterConditionals,
  chapterLoops,
  chapterArrays,
  chapter10,
  chapter11,
  chapter12,
  chapterConstructors,
];

export const chapterMap = chapters.reduce((map, chapter) => {
  map[chapter.slug] = chapter;
  return map;
}, {});

export function getChapterBySlug(slug) {
  return chapterMap[slug] || null;
}

export function getAllChapterSlugs() {
  return chapters.map((ch) => ch.slug);
}

export function getAllChapterTitles() {
  return chapters.map((ch) => ({ slug: ch.slug, title: ch.title }));
}

export default chapters;
