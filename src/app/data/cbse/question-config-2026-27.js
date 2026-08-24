/**
 * CBSE question and mock-test configuration for session 2026-27.
 * This file contains configuration only; question content stays separate.
 */

export const CBSE_QUESTION_TYPES = [
  'mcq',
  'assertion-reason',
  'case-study',
  'short-answer',
  'long-answer',
  'programming',
  'output-based',
  'fill-in-the-blanks',
  'true-false',
  'match-the-following',
];

export const CBSE_MOCK_TEST_CONFIG = {
  session: '2026-27',
  board: 'CBSE',
  mode: 'board-practice',
  questionSelection: 'curriculum-driven',
  competencyAware: true,
  usesQuestionMetadata: true,
  negativeMarking: false,
};

export const CBSE_SUBJECT_MOCK_CONFIG = {
  '083': {
    classes: [11, 12],
    python: true,
    pythonLibraries: [],
    questionTypes: CBSE_QUESTION_TYPES,
  },
  '065': {
    classes: [11, 12],
    python: true,
    pythonLibraries: ['Pandas', 'Matplotlib'],
    questionTypes: CBSE_QUESTION_TYPES,
  },
  '402': {
    classes: [9, 10],
    python: false,
    questionTypes: CBSE_QUESTION_TYPES,
  },
  '802': {
    classes: [11, 12],
    python: false,
    primaryProgrammingLanguage: 'Java',
    questionTypes: CBSE_QUESTION_TYPES,
  },
};

export const getCBSEQuestionConfig = (subjectCode) =>
  CBSE_SUBJECT_MOCK_CONFIG[String(subjectCode)] ?? null;

export default CBSE_SUBJECT_MOCK_CONFIG;
