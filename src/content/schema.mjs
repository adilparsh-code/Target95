// Unified content schema for Target95 (P0).
//
// One vocabulary for chapters and questions across the legacy study centre,
// the rich chapter-content files and the Java question bank. This module has
// no imports so it runs in Next.js and in plain `node --test`.
//
// Identity model
//   id        stable, unique key of a chapter (the canonical javaCurriculum slug
//             when one exists, otherwise the legacy study slug)
//   aliases   every other slug that must keep resolving to this chapter
//             (legacy study slugs, question-bank slugs, route aliases)

export const SUBJECT_IDS = ['java', 'boolean-algebra', 'python'];

export const BOARDS = ['ICSE', 'ISC', 'CBSE'];

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

// Superset of every type the three existing question systems emit.
export const QUESTION_TYPES = [
  'mcq',
  'true-false',
  'fill-blank',
  'output',
  'programming',
  'debugging',
  'case-based',
  'theory',
];

// Ordered sections a chapter page may render. Order is the display order.
export const SECTION_IDS = [
  'objectives',
  'intro',
  'theory',
  'definitions',
  'concepts',
  'syntax',
  'examples',
  'diagrams',
  'importantPoints',
  'commonMistakes',
  'tips',
  'quickRevision',
  'faqs',
  'related',
];

// Placeholder copy that studyCenter.js falls back to when a chapter has no
// authored content. Content that matches is "stub" content, not real content.
export const STUB_MARKERS = [
  'Definition 1',
  'Definition 2',
  'Core concepts',
  'Skipping the basics',
  'Avoiding repeated revision',
  'Keep reviewing the material until it feels familiar.',
];

export const CONTENT_STATUS = Object.freeze({
  AUTHORED: 'authored', // real authored study content exists
  STUB: 'stub', // only generated fallback copy exists
  MISSING: 'missing', // chapter is listed but has no study content at all
});

/**
 * @typedef {Object} UnifiedQuestion
 * @property {string} id
 * @property {string} chapterId        primary unified chapter id (see identity model)
 * @property {string[]} chapterIds     every chapter that lists the question, primary first
 * @property {string} chapterSlug      slug the question was authored under
 * @property {string} type             one of QUESTION_TYPES
 * @property {string} difficulty       one of DIFFICULTIES
 * @property {string} question
 * @property {string[]} options        empty unless type === 'mcq'
 * @property {number|null} answerIndex index into options for mcq, else null
 * @property {string} answer           display answer text
 * @property {string} explanation
 * @property {number} marks
 * @property {number} estimatedTime    minutes
 * @property {string[]} tags
 * @property {string|null} board       ICSE / ISC / CBSE when the source records it
 * @property {string} subject
 * @property {string} source           name of the system the record came from
 */

/**
 * @typedef {Object} UnifiedChapter
 * @property {string} id
 * @property {string} slug
 * @property {string[]} aliases
 * @property {string|null} contentSlug  legacy study slug the content was read from; several chapters may share one
 * @property {string} subject
 * @property {string} title
 * @property {string|null} board
 * @property {string|null} class
 * @property {string} difficulty
 * @property {number} estimatedTime
 * @property {string} contentStatus    one of CONTENT_STATUS
 * @property {Object<string, *>} sections keyed by SECTION_IDS entries
 * @property {number} questionCount
 */
