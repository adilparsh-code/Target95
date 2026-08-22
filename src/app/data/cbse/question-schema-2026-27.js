/**
 * Universal CBSE question schema helpers for session 2026-27.
 * Content is stored separately from rendering components.
 */

export const CBSE_QUESTION_SCHEMA_VERSION = '1.0.0';

export const createCBSEQuestion = ({
  id,
  board = 'CBSE',
  session = '2026-27',
  classNumber,
  subjectCode,
  subjectId,
  chapterId,
  topicId,
  questionType,
  question,
  options = [],
  correctAnswer = null,
  marks = 1,
  difficulty = 'medium',
  competencyLevel = 'Applying',
  explanation = '',
  hints = [],
  tags = [],
  source = 'CBSE',
  previousYear = null,
  year = null,
  language = null,
}) => ({
  id,
  board,
  session,
  classNumber,
  subjectCode: String(subjectCode),
  subjectId,
  chapterId,
  topicId,
  questionType,
  question,
  options,
  correctAnswer,
  marks,
  difficulty,
  competencyLevel,
  explanation,
  hints,
  tags,
  source,
  previousYear,
  year,
  language,
  schemaVersion: CBSE_QUESTION_SCHEMA_VERSION,
});

export const validateCBSEQuestion = (q) => {
  const errors = [];
  if (!q?.id) errors.push('id is required');
  if (q?.board !== 'CBSE') errors.push('board must be CBSE');
  if (!q?.classNumber) errors.push('classNumber is required');
  if (!q?.subjectCode) errors.push('subjectCode is required');
  if (!q?.chapterId) errors.push('chapterId is required');
  if (!q?.questionType) errors.push('questionType is required');
  if (!q?.question) errors.push('question is required');
  if (!(Number(q?.marks) > 0)) errors.push('marks must be positive');
  return { isValid: errors.length === 0, errors };
};

export default createCBSEQuestion;
