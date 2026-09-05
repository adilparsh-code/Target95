/**
 * Chapter Content Registry
 * Central export point for all chapter learning content.
 * Each chapter follows the shared student-facing content contract.
 */

import chapterVariables from "./data-types-variables";
import chapterOperators from "./operators";
import chapter01 from "./01-if";
import chapter02 from "./02-if-else";
import chapter03 from "./03-nested-if";
import chapter04 from "./04-switch";
import chapter05 from "./05-for-loop";
import chapter06 from "./06-while-loop";
import chapter07 from "./07-do-while-loop";
import chapter08 from "./08-arrays-1d";
import chapter09 from "./09-arrays-2d";
import chapter10 from "./10-strings";
import chapter11 from "./11-methods";
import chapter12 from "./12-classes-objects";
import chapterConstructors from "./constructors";

export const chapters = [
  chapterVariables,
  chapterOperators,
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
  chapter06,
  chapter07,
  chapter08,
  chapter09,
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
