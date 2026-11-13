// Pure normalizers: legacy records -> unified schema (P0).
// No imports from app code, so they are unit-testable with `node --test`.

import { DIFFICULTIES, QUESTION_TYPES, SECTION_IDS } from './schema.mjs';
import { classifyContentStatus } from './validate.mjs';

const asList = (value) => (Array.isArray(value) ? value.filter((item) => item !== null && item !== undefined) : []);
const asText = (value) => (typeof value === 'string' ? value : '');

/**
 * Build canonical chapter associations from the question bank's per-route
 * chapter map. One authored question can belong to several granular routes
 * while retaining one stable question ID.
 */
export function buildQuestionChapterAssociations(chapterQuestionBankBySlug = {}, aliasIndex = new Map()) {
  const associations = new Map();

  for (const [chapterSlug, questions] of Object.entries(chapterQuestionBankBySlug)) {
    const chapterId = aliasIndex.get(chapterSlug) || chapterSlug;
    for (const question of Array.isArray(questions) ? questions : []) {
      const questionId = String(question?.id ?? "");
      if (!questionId) continue;
      const chapterIds = associations.get(questionId) || new Set();
      chapterIds.add(chapterId);
      associations.set(questionId, chapterIds);
    }
  }

  return new Map([...associations].map(([id, chapterIds]) => [id, [...chapterIds]]));
}

/** True when a question belongs to its primary or any mapped sibling chapter. */
export function questionBelongsToChapter(question, chapterId) {
  return Boolean(
    chapterId &&
    (question?.chapterId === chapterId ||
      (Array.isArray(question?.chapterIds) && question.chapterIds.includes(chapterId)))
  );
}

/** "easy" / "EASY" / "Beginner" -> one of DIFFICULTIES (unknown values pass through). */
export function normalizeDifficulty(value) {
  const text = String(value ?? '').trim().toLowerCase();
  if (!text) return 'Medium';
  const exact = DIFFICULTIES.find((level) => level.toLowerCase() === text);
  if (exact) return exact;
  if (['beginner', 'basic'].includes(text)) return 'Easy';
  if (['intermediate'].includes(text)) return 'Medium';
  if (['advanced', 'difficult'].includes(text)) return 'Hard';
  return String(value).trim();
}

export function normalizeQuestionType(value) {
  const text = String(value ?? '').trim().toLowerCase();
  if (QUESTION_TYPES.includes(text)) return text;
  const alias = { 'fill-in-the-blanks': 'fill-blank', 'output-tracing': 'output', 'case-study': 'case-based' };
  return alias[text] || text || 'theory';
}

/**
 * Map a question already shaped by javaChapterQuestionBank (or any record with
 * the same field names) to the unified schema.
 * @param {Object} raw
 * @param {{chapterId?: string, chapterIds?: string[], source?: string}} [context]
 * @returns {import('./schema.mjs').UnifiedQuestion}
 */
export function toUnifiedQuestion(raw, { chapterId, chapterIds = [], source = 'unknown' } = {}) {
  const type = normalizeQuestionType(raw.questionType || raw.type);
  const options = type === 'mcq' ? asList(raw.options).map(String) : [];

  let answerIndex = null;
  if (type === 'mcq') {
    if (Number.isInteger(raw.answer)) answerIndex = raw.answer;
    else if (raw.correctAnswer !== undefined) {
      const found = options.findIndex((option) => option.trim() === String(raw.correctAnswer).trim());
      answerIndex = found >= 0 ? found : null;
    }
  }

  const answer = type === 'mcq' && answerIndex !== null && options[answerIndex]
    ? options[answerIndex]
    : asText(raw.correctAnswer) || asText(raw.modelAnswer) || (typeof raw.answer === 'string' ? raw.answer : '');
  const primaryChapterId = chapterId || asText(raw.chapterId) || asText(raw.chapter);
  const associatedChapterIds = [...new Set([primaryChapterId, ...asList(chapterIds).map(String)].filter(Boolean))];

  return {
    id: String(raw.id),
    chapterId: primaryChapterId,
    chapterIds: associatedChapterIds,
    chapterSlug: asText(raw.chapterSlug) || asText(raw.chapter),
    type,
    difficulty: normalizeDifficulty(raw.difficulty),
    question: asText(raw.question) || asText(raw.prompt),
    options,
    answerIndex,
    answer,
    explanation: asText(raw.explanation),
    marks: Number.isFinite(raw.marks) ? raw.marks : 1,
    estimatedTime: Number.isFinite(raw.estimatedTime) ? raw.estimatedTime : 1,
    tags: asList(raw.tags).map(String),
    source,
  };
}

/** Flatten studyData (studyCenter shape) into unified sections. */
export function toUnifiedSections(studyData = {}) {
  const sd = studyData || {};
  const sections = {
    objectives: asList(sd.learningObjectives),
    intro: asText(sd.intro),
    theory: asText(sd.theory),
    definitions: asList(sd.definitions),
    concepts: asList(sd.concepts),
    syntax: asList(sd.syntax),
    examples: asList(sd.examples),
    diagrams: asList(sd.diagrams),
    importantPoints: asList(sd.importantExamPoints),
    commonMistakes: asList(sd.commonMistakes).length ? asList(sd.commonMistakes) : asList(sd.mistakes),
    tips: asList(sd.tips),
    quickRevision: asList(sd.quickRevision),
    faqs: asList(sd.faqs),
    related: asList(sd.relatedTopics),
  };
  // Drop empty sections so renderers can iterate SECTION_IDS and skip absent ones.
  return Object.fromEntries(SECTION_IDS.filter((id) => {
    const value = sections[id];
    return Array.isArray(value) ? value.length > 0 : value.length > 0;
  }).map((id) => [id, sections[id]]));
}

/**
 * @param {Object} base   chapter record (id/slug/title/difficulty/estimatedTime/...)
 * @param {Object} studyData
 * @param {{aliases?: string[], contentSlug?: string|null, questionCount?: number, subject?: string}} [extra]
 * @returns {import('./schema.mjs').UnifiedChapter}
 */
export function toUnifiedChapter(base, studyData, { aliases = [], contentSlug = null, questionCount = 0, subject = 'java' } = {}) {
  const sections = toUnifiedSections(studyData);
  const slug = base.slug || base.id;
  return {
    id: String(base.id && typeof base.id === 'string' ? base.id : slug),
    slug,
    aliases: [...new Set(aliases.filter((alias) => alias && alias !== slug))],
    contentSlug,
    subject,
    title: asText(base.title),
    board: base.board || null,
    class: base.class || null,
    difficulty: normalizeDifficulty(base.difficulty),
    estimatedTime: Number.isFinite(base.estimatedTime) ? base.estimatedTime : 0,
    contentStatus: classifyContentStatus(sections),
    sections,
    questionCount,
  };
}
