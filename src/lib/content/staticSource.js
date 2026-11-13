// Static content source: assembles the unified catalog by WRAPPING the existing
// systems. It changes no data and no behaviour; every legacy module keeps
// working exactly as before. A Firestore source (P3) will export the same
// getCatalog() contract.
//
// Chapter identity comes from the explicit table in @/content/identity.mjs.

import { javaChapters as canonicalChapters } from "@/app/data/javaCurriculum";
import { getStudyChapters, resolveStudyChapter } from "@/lib/studyCenter";
import { questionBankQuestions } from "@/lib/questionBank";
import { chapterQuestionBankBySlug } from "@/lib/javaChapterQuestionBank";
import { recordToPlayerQuestion, toUnifiedChapter, toUnifiedQuestion } from "@/content/normalize.mjs";
import { canonicalIdFor, identityFor, quarantineReasonFor } from "@/content/identity.mjs";

const SUBJECT_ID = "java";
const QUESTION_SOURCE = "question-bank";

function buildChapters() {
  const byId = new Map();

  // 1. Canonical javaCurriculum chapters own the identity. Their content comes
  //    from the legacy study chapter named by the identity table (or stub copy).
  for (const canonical of canonicalChapters) {
    const identity = identityFor(canonical.slug);
    const resolved = resolveStudyChapter(canonical.slug);
    byId.set(
      canonical.slug,
      toUnifiedChapter(
        { ...canonical, id: canonical.slug },
        resolved?.studyData,
        {
          aliases: identity?.aliases || [],
          contentSlug: identity?.contentSlug || null,
          subject: SUBJECT_ID,
        },
      ),
    );
  }

  // 2. Study chapters with no canonical identity keep their own slug as id.
  for (const legacy of getStudyChapters()) {
    if (byId.has(legacy.slug) || canonicalIdFor(legacy.slug)) continue;
    byId.set(
      legacy.slug,
      toUnifiedChapter({ ...legacy, id: legacy.slug }, legacy.studyData, { contentSlug: legacy.slug, subject: SUBJECT_ID }),
    );
  }

  return [...byId.values()];
}

function buildAliasIndex(chapters) {
  const index = new Map();
  for (const chapter of chapters) {
    index.set(chapter.slug, chapter.id);
    for (const alias of chapter.aliases) if (!index.has(alias)) index.set(alias, chapter.id);
  }
  return index;
}

/**
 * question id -> ids of every chapter whose route lists it. Derived from the
 * existing bank-to-route mapping (chapterQuestionBankBySlug) and resolved through
 * the identity table, so sibling chapters (while-loop, arrays-2d, nested-if...)
 * keep the questions they already expose, with no second alias map to maintain.
 */
function buildMembership(aliasIndex) {
  const membership = new Map();
  for (const [routeSlug, routeQuestions] of Object.entries(chapterQuestionBankBySlug)) {
    const chapterId = aliasIndex.get(routeSlug) || routeSlug;
    for (const question of routeQuestions) {
      const id = String(question.id);
      if (!membership.has(id)) membership.set(id, new Set());
      membership.get(id).add(chapterId);
    }
  }
  return membership;
}

/**
 * Player-shaped questions by id. The authored Java bank already has the player
 * shape (taken as is). Records without one, the supplemental ICSE board bank,
 * are converted so their chapter-page links open instead of 404-ing.
 */
function buildPlayerIndex() {
  const index = new Map();
  for (const routeQuestions of Object.values(chapterQuestionBankBySlug)) {
    for (const question of routeQuestions) if (!index.has(String(question.id))) index.set(String(question.id), question);
  }
  for (const record of questionBankQuestions) {
    if (!index.has(String(record.id))) index.set(String(record.id), recordToPlayerQuestion(record));
  }
  return index;
}

/** Split bank records into live questions and quarantined ones. Nothing is dropped. */
function buildQuestions(aliasIndex) {
  const questions = [];
  const quarantined = [];
  const membership = buildMembership(aliasIndex);

  for (const raw of questionBankQuestions) {
    const slug = raw.chapterSlug || raw.chapter;
    const chapterId = aliasIndex.get(slug) || slug;
    const unified = toUnifiedQuestion(raw, {
      chapterId,
      chapterIds: [...(membership.get(String(raw.id)) || [])],
      source: QUESTION_SOURCE,
    });
    const reason = aliasIndex.has(slug) ? null : quarantineReasonFor(slug);
    if (reason) quarantined.push({ question: unified, reason });
    // Unresolvable and not quarantined: kept so the validator reports an orphan error.
    else questions.push(unified);
  }

  return { questions, quarantined };
}

let cached = null;

/**
 * @returns {{
 *   chapters: import("@/content/schema.mjs").UnifiedChapter[],
 *   questions: import("@/content/schema.mjs").UnifiedQuestion[],
 *   quarantined: {question: import("@/content/schema.mjs").UnifiedQuestion, reason: string}[],
 *   aliasIndex: Map<string, string>,
 *   chapterQuestions: Map<string, import("@/content/schema.mjs").UnifiedQuestion[]>,
 *   recordIndex: Map<string, object>,
 *   playerIndex: Map<string, object>,
 *   questionIndex: Map<string, import("@/content/schema.mjs").UnifiedQuestion>,
 *   quarantinedIndex: Map<string, {question: import("@/content/schema.mjs").UnifiedQuestion, reason: string}>,
 * }}
 */
export function getCatalog() {
  if (cached) return cached;
  const chapters = buildChapters();
  const aliasIndex = buildAliasIndex(chapters);
  const { questions, quarantined } = buildQuestions(aliasIndex);
  // One list per chapter, in bank order, each question once.
  const chapterQuestions = new Map(chapters.map((chapter) => [chapter.id, []]));
  for (const question of questions) {
    for (const chapterId of question.chapterIds) chapterQuestions.get(chapterId)?.push(question);
  }
  cached = {
    chapters: chapters.map((chapter) => ({ ...chapter, questionCount: chapterQuestions.get(chapter.id).length })),
    questions,
    quarantined,
    aliasIndex,
    chapterQuestions,
    // Player-shaped questions (type, options, answer index) by id, taken from the existing bank build.
    playerIndex: buildPlayerIndex(),
    // Legacy-shaped records (questionBank.js) by id, for consumers not yet on the unified shape.
    recordIndex: new Map(questionBankQuestions.map((record) => [String(record.id), record])),
    // Question ids are unique across the catalog (the validator enforces it).
    questionIndex: new Map(questions.map((question) => [question.id, question])),
    quarantinedIndex: new Map(quarantined.map((entry) => [entry.question.id, entry])),
  };
  return cached;
}
