// Pure normalizers: legacy records -> unified schema (P0).
// No imports from app code, so they are unit-testable with `node --test`.

import { DIFFICULTIES, QUESTION_TYPES, SECTION_IDS } from './schema.mjs';
import { classifyContentStatus } from './validate.mjs';

const asList = (value) => (Array.isArray(value) ? value.filter((item) => item !== null && item !== undefined) : []);
const asText = (value) => (typeof value === 'string' ? value : '');

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
export function toUnifiedQuestion(raw, { chapterId, chapterIds, source = 'unknown' } = {}) {
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

  return {
    id: String(raw.id),
    chapterId: primaryChapterId,
    // Every chapter whose page lists this question (primary first, no duplicates).
    chapterIds: [...new Set([primaryChapterId, ...asList(chapterIds)])].filter(Boolean),
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
    board: asText(raw.board) || null,
    // Class as the source records it ("ICSE IX", "ICSE X", "ISC XI"); null when it does not.
    class: asText(raw.class) || null,
    subject: asText(raw.subject),
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

const THEORY_LIKE_TYPES = ['theory', 'case-based', 'debugging'];

/**
 * Convert a legacy question record (questionBankAdapter shape: questionType,
 * correctAnswer, lowercase difficulty) into the shape QuestionPlayer renders
 * (type, prompt, answer, modelAnswer, capitalised difficulty), the same shape
 * javaChapterQuestionBank produces for the authored Java bank. Ids and every
 * other field are preserved; nothing is invented (hint and code stay empty).
 */
export function recordToPlayerQuestion(record) {
  const type = normalizeQuestionType(record.type || record.questionType);
  const isMcq = type === 'mcq';
  const options = isMcq ? asList(record.options).map(String) : [];
  const correct = asText(record.correctAnswer) || (typeof record.answer === 'string' ? record.answer : '');
  const optionIndex = isMcq ? options.findIndex((option) => option.trim() === correct.trim()) : -1;

  return {
    id: String(record.id),
    subject: asText(record.subject),
    board: record.board || null,
    class: record.class || null,
    syllabusUnit: record.syllabusUnit || '',
    chapter: asText(record.chapterSlug) || asText(record.chapter),
    chapterTitle: asText(record.chapter),
    topic: asText(record.topic) || 'General',
    difficulty: normalizeDifficulty(record.difficulty),
    type,
    marks: Number.isFinite(record.marks) ? record.marks : 1,
    estimatedTime: Number.isFinite(record.estimatedTime) ? record.estimatedTime : 1,
    question: asText(record.question) || asText(record.prompt),
    prompt: asText(record.question) || asText(record.prompt),
    options,
    answer: isMcq ? Math.max(optionIndex, 0) : correct,
    correctAnswer: correct,
    modelAnswer: THEORY_LIKE_TYPES.includes(type) ? correct : undefined,
    explanation: asText(record.explanation),
    hint: '',
    tags: asList(record.tags).map(String),
    codeSnippet: asText(record.codeSnippet),
  };
}
