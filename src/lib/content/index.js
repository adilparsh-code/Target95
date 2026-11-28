// Unified content read API. Route components should use these selectors rather
// than independently combining the legacy study registry, rich chapter registry,
// Markdown files and question-bank adapters.

import { getPracticeUrl as buildPracticeUrl } from "@/lib/practiceUrls";
import { validateCatalog } from "@/content/validate.mjs";
import { getCatalog } from "./staticSource";
import { questionBelongsToChapter } from "@/content/normalize.mjs";
import { resolveStudyChapter } from "@/lib/studyCenter";
import { getMarkdownChapterContent } from "@/lib/markdownContent";
import getQuestionBankChapter from "@/lib/questionBankAdapter";
import { getChapterBySlug as getRichChapterBySlug } from "@/app/data/chapter-content";

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
      (!chapterId || questionBelongsToChapter(question, chapterId)) &&
      (!type || question.type === type) &&
      (!difficulty || question.difficulty === difficulty),
  );
}

/**
 * Resolve all server-side data needed by a student chapter page in one place.
 * Legacy registries remain supported behind this boundary while content is
 * migrated; page components no longer know which backing store owns a section.
 */
export function getChapterPageData(slug) {
  if (!slug || typeof slug !== "string") return null;

  const chapter = resolveStudyChapter(slug);
  if (!chapter) return null;

  const contentSlug = chapter.contentSlug || slug;
  const registrySlug = contentSlug === "constructors" ? "constructor"
    : contentSlug === "introduction-to-java" ? "introduction"
    : contentSlug;

  let content = null;
  try {
    content = getRichChapterBySlug(registrySlug);
    if (!content) {
      const markdownSlug = registrySlug === "introduction-to-java" ? "introduction" : registrySlug;
      content = getMarkdownChapterContent(markdownSlug)?.content ?? null;
    }
  } catch {
    // Optional authored content must not take down the chapter route.
    content = null;
  }

  let questions = null;
  try {
    questions = getQuestionBankChapter(slug);
  } catch {
    // Keep the learning page available if an optional question bank is invalid.
    questions = null;
  }

  return { chapter, content, questions };
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
