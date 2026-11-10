// Content selectors (P0). The single read API for chapters and questions.
// Nothing imports this yet; P1 repoints the UI onto it one consumer at a time.

import { getPracticeUrl as buildPracticeUrl } from "@/lib/practiceUrls";
import { validateCatalog } from "@/content/validate.mjs";
import { getCatalog } from "./staticSource";

export function getChapters({ subject } = {}) {
  const { chapters } = getCatalog();
  return subject ? chapters.filter((chapter) => chapter.subject === subject) : chapters;
}

/** Resolve a chapter by id, slug or any alias. Returns null when unknown. */
export function getChapter(slugOrId) {
  if (!slugOrId) return null;
  const { chapters, aliasIndex } = getCatalog();
  const id = aliasIndex.get(slugOrId) || slugOrId;
  return chapters.find((chapter) => chapter.id === id) || null;
}

export function getQuestions({ chapter, type, difficulty } = {}) {
  const { questions, aliasIndex } = getCatalog();
  const chapterId = chapter ? aliasIndex.get(chapter) || chapter : null;
  return questions.filter(
    (question) =>
      (!chapterId || question.chapterId === chapterId) &&
      (!type || question.type === type) &&
      (!difficulty || question.difficulty === difficulty),
  );
}

/** Reuses the existing practiceUrls helper so route logic stays in one place. */
export function getPracticeUrl(chapter) {
  const resolved = typeof chapter === "string" ? getChapter(chapter) : chapter;
  return buildPracticeUrl(resolved?.subject || "java", resolved?.slug || null);
}

export function getCatalogFindings() {
  const { chapters, questions } = getCatalog();
  return validateCatalog({ chapters, questions });
}
