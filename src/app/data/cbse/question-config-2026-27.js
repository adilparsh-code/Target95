/**
 * CBSE question and mock-test configuration for session 2026-27.
 * This file contains configuration only; question content stays separate.
 * 083 and 065 are Python-based; 802 Information Technology is Java-based
 * in the official 2026-27 senior-secondary curriculum.
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
    note: 'Core Python programming. Do not inherit Pandas/Matplotlib from subject 065 and never use Java content.',
  },
  '065': {
    classes: [11, 12],
    python: true,
    pythonLibraries: ['Pandas', 'Matplotlib'],
    questionTypes: CBSE_QUESTION_TYPES,
    note: 'Track Python data-handling libraries separately from subject 083. Never use Java content.',
  },
  '402': {
    classes: [9, 10],
    python: false,
    questionTypes: CBSE_QUESTION_TYPES,
    note: 'CBSE Information Technology. Do not inherit Java programming content.',
  },
  '802': {
    classes: [11, 12],
    python: false,
    pythonLibraries: [],
    java: true,
    questionTypes: CBSE_QUESTION_TYPES,
    note: 'CBSE Information Technology senior-secondary track; Java programming content follows the official 2026-27 curriculum and must remain separate from CISCE Java content.',
  },
};

export const getCBSEQuestionConfig = (subjectCode) =>
  CBSE_SUBJECT_MOCK_CONFIG[String(subjectCode)] ?? null;

export const getCBSESubjectClassConfig = (subjectCode, classNumber) => {
  const config = getCBSEQuestionConfig(subjectCode);
  if (!config || !config.classes.includes(Number(classNumber))) return null;
  return config;
};

export const isCBSESubjectClassSupported = (subjectCode, classNumber) =>
  Boolean(getCBSESubjectClassConfig(subjectCode, classNumber));

export default CBSE_SUBJECT_MOCK_CONFIG;
