/**
 * Server-side content-engine source for mock tests.
 *
 * SERVER ONLY. This module imports the content catalog, which contains answer keys and
 * explanations. It must never be imported from a client component or from
 * `mocktestAttempts.js`; the bundle audit (scripts/check-mocktest-bundle.mjs) fails the
 * release if content-engine text reaches the mock-test client chunks.
 *
 * Phase 1 scope (approved): valid MCQ and True/False questions only, for ICSE IX and
 * ICSE X (ISC XI after a separate readiness check, ISC XII never until content exists).
 * Output, fill-in-the-blank, debugging, programming, theory and case-based questions are
 * excluded because they are not reliably auto-gradable.
 */

import { getCatalog } from "@/lib/content/staticSource";
import { validateQuestion } from "@/content/validate.mjs";
import { canonicalIdFor } from "@/content/identity.mjs";
import { buildMockTestPool, CONTENT_ID_PREFIX, getMockTestChapterOptions } from "./mocktestAttempts.js";

/** Environment variable listing the categories that may draw content-engine questions. */
export const CONTENT_CATEGORIES_ENV = "MOCKTEST_CE_CATEGORIES";

/** category -> class label recorded on the questions. isc-class-12 is intentionally absent. */
export const CONTENT_CATEGORY_CLASS = Object.freeze({
  "icse-class-9": "ICSE IX",
  "icse-class-10": "ICSE X",
  "isc-class-11": "ISC XI",
});

/**
 * Categories the flag is allowed to turn on. ISC XI (22 candidate questions) needs its own
 * readiness verification before it is added here; ISC XII has no content and is never listed.
 */
export const ENABLEABLE_CONTENT_CATEGORIES = Object.freeze(["icse-class-10", "icse-class-9"]);

const ELIGIBLE_TYPES = new Set(["mcq", "true-false"]);
const TRUE_FALSE_OPTIONS = Object.freeze(["True", "False"]);

/**
 * Categories currently serving content-engine questions. Empty (disabled) unless the
 * environment variable names enableable categories, e.g. MOCKTEST_CE_CATEGORIES=icse-class-10.
 */
export function getEnabledContentCategories(env = process.env) {
  const raw = String(env?.[CONTENT_CATEGORIES_ENV] || "");
  const requested = raw.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
  return ENABLEABLE_CONTENT_CATEGORIES.filter((category) => requested.includes(category));
}

let cachedQuestions = null;

/** Every eligible content-engine question in its server-side form (keys included). */
export function getContentQuestions() {
  if (cachedQuestions) return cachedQuestions;
  const { questions, recordIndex } = getCatalog();
  const eligible = [];
  for (const question of questions) {
    if (!ELIGIBLE_TYPES.has(question.type)) continue;
    // Any validator finding (duplicate options, missing answer, ...) keeps a question out.
    if (validateQuestion(question).length > 0) continue;
    if (!question.class || !question.board || !question.chapterIds.length) continue;
    if (question.type === "true-false" && !TRUE_FALSE_OPTIONS.includes(question.answer)) continue;
    eligible.push({
      id: `${CONTENT_ID_PREFIX}${question.id}`,
      sourceId: question.id,
      source: "content-engine",
      board: question.board,
      class: question.class,
      chapter: question.chapterId,
      chapterIds: question.chapterIds,
      difficulty: String(question.difficulty).toLowerCase(),
      type: question.type,
      question: question.question,
      options: question.type === "true-false" ? [...TRUE_FALSE_OPTIONS] : question.options,
      answer: question.answer,
      explanation: question.explanation,
      marks: question.marks,
      topic: recordIndex.get(question.id)?.topic || "",
    });
  }
  cachedQuestions = Object.freeze(eligible);
  return cachedQuestions;
}

let cachedById = null;

/**
 * Resolve a namespaced attempt id. Deliberately NOT gated by the rollout flag: an attempt
 * started while the flag was on must still resume and grade after it is switched off.
 */
export function resolveContentQuestion(id) {
  cachedById ||= new Map(getContentQuestions().map((question) => [question.id, question]));
  return cachedById.get(String(id));
}

function matchesChapter(question, chapter) {
  if (chapter === "all" || chapter === "all-topics") return true;
  const resolved = canonicalIdFor(chapter) || chapter;
  return question.chapterIds.some((id) => id === chapter || id === resolved || canonicalIdFor(id) === resolved);
}

/** Content-engine questions matching a (normalised) config; empty unless the category is enabled. */
export function buildContentPool(config, env = process.env) {
  if (config.board === "CBSE") return [];
  if (!getEnabledContentCategories(env).includes(config.category)) return [];
  const classLabel = CONTENT_CATEGORY_CLASS[config.category];
  if (!classLabel) return [];
  return getContentQuestions().filter(
    (question) =>
      question.class === classLabel &&
      (config.difficulty === "all" || question.difficulty === config.difficulty) &&
      (config.type === "mixed" || question.type === config.type) &&
      matchesChapter(question, config.chapter),
  );
}

function titleCase(slug) {
  return String(slug).replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

/**
 * Counts for the setup screen, computed on the server so no question text is shipped:
 *   count    questions matching every filter (legacy + content engine)
 *   chapters chapter options with counts (union of legacy and content-engine chapters)
 * When the category is not content-engine enabled this equals the legacy numbers exactly.
 */
export function getAvailability(config, env = process.env) {
  const legacyCount = buildMockTestPool(config).length;
  const contentEnabled = config.board !== "CBSE" && getEnabledContentCategories(env).includes(config.category);
  if (!contentEnabled) {
    return { count: legacyCount, chapters: config.board === "CBSE" ? [] : getMockTestChapterOptions(config.category), contentEnabled: false };
  }

  const { chapters: catalogChapters, aliasIndex } = getCatalog();
  const titles = new Map(catalogChapters.map((chapter) => [chapter.id, chapter.title]));
  const merged = new Map();
  const bump = (rawId, amount = 1) => {
    const id = canonicalIdFor(rawId) || rawId;
    merged.set(id, (merged.get(id) || 0) + amount);
  };
  for (const option of getMockTestChapterOptions(config.category)) bump(option.id, option.count);

  const classLabel = CONTENT_CATEGORY_CLASS[config.category];
  for (const question of getContentQuestions()) {
    if (question.class !== classLabel) continue;
    for (const chapterId of question.chapterIds) bump(chapterId);
  }

  const chapters = [...merged.entries()]
    .map(([id, count]) => ({ id, label: titles.get(aliasIndex.get(id) || id) || titleCase(id), count }))
    .sort((a, b) => a.label.localeCompare(b.label));
  return { count: legacyCount + buildContentPool(config, env).length, chapters, contentEnabled: true };
}
