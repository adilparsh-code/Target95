// Content selectors. The single read API for chapters and questions.
// P1 repoints the UI onto it one consumer at a time.

import { getPracticeUrl as buildPracticeUrl } from "@/lib/practiceUrls";
import { validateCatalog } from "@/content/validate.mjs";
import { slugifyChapterLabel } from "@/content/identity.mjs";
import { getMockTestQuestionPool as filterMockTestPool } from "@/lib/mocktest";
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

/** Questions held out of chapter selectors with the reason; never silently dropped. */
export function getQuarantinedQuestions() {
  return getCatalog().quarantined;
}

/**
 * Mock-test pool over the unified questions. mocktest.js owns the filtering
 * rules; this only supplies the pool and resolves legacy chapter slugs
 * (e.g. "introduction", "loops") to canonical chapters first.
 */
export function getMockTestQuestionPool({ chapter = "all", ...options } = {}) {
  const scoped = getQuestions({ chapter: chapter === "all" ? undefined : chapter });
  const pool = scoped.map((question) => ({ ...question, chapter: question.chapterSlug, board: question.board || "ICSE" }));
  return filterMockTestPool({ ...options, chapter: "all", questions: pool });
}

/**
 * Resolve a saved bookmark ({ chapter, questionId }) to a question.
 *
 * Bookmarks are keyed by "<chapter>:<questionId>" where <chapter> is whichever
 * slug the saving screen had (canonical, study, bank alias, or a slugified
 * chapter title) and ids may be stored as strings or numbers. Question ids are
 * unique, so the id finds the question and the chapter only has to be a slug the
 * catalog recognises; a bookmark with an unknown chapter stays unresolved, as it
 * always did. Never throws and never drops the bookmark itself.
 *
 * @returns {{status: "found"|"quarantined"|"missing", question: object|null, reason?: string}}
 */
export function resolveBookmarkedQuestion({ chapter, questionId } = {}) {
  const { questionIndex, quarantinedIndex, aliasIndex } = getCatalog();
  const id = String(questionId ?? "");
  const live = questionIndex.get(id);
  const held = live ? null : quarantinedIndex.get(id);
  const question = live || held?.question || null;
  if (!question) return { status: "missing", question: null };

  const label = String(chapter ?? "");
  const chapterKnown =
    aliasIndex.has(label) ||
    aliasIndex.has(slugifyChapterLabel(label)) ||
    label === question.chapterSlug ||
    slugifyChapterLabel(label) === question.chapterSlug;
  if (!chapterKnown) return { status: "missing", question: null };

  return held ? { status: "quarantined", question, reason: held.reason } : { status: "found", question };
}

/** Reuses the existing practiceUrls helper so route logic stays in one place. */
export function getPracticeUrl(chapter) {
  const resolved = typeof chapter === "string" ? getChapter(chapter) : chapter;
  return buildPracticeUrl(resolved?.subject || "java", resolved?.slug || null);
}

export function getCatalogFindings() {
  const { chapters, questions, quarantined } = getCatalog();
  return validateCatalog({ chapters, questions, quarantined });
}
