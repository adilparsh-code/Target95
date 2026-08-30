/**
 * CBSE 2026-27 mock-question selection.
 * Uses the canonical CBSE practice bank and enforces class/subject separation.
 */
import { CBSE_PRACTICE_QUESTIONS_2026_27 } from './question-bank-2026-27';

export const getCBSEMockQuestions = ({ classNumber, subjectCode, limit = 20, types = [] } = {}) => {
  const filtered = CBSE_PRACTICE_QUESTIONS_2026_27.filter((question) => {
    if (classNumber != null && question.classNumber !== Number(classNumber)) return false;
    if (subjectCode != null && question.subjectCode !== String(subjectCode)) return false;
    if (types.length > 0 && !types.includes(question.questionType)) return false;
    return true;
  });

  return filtered.slice(0, Math.max(0, Number(limit) || 0));
};

export const getCBSEMockQuestionCounts = ({ classNumber, subjectCode } = {}) => {
  const questions = getCBSEMockQuestions({ classNumber, subjectCode, limit: Number.MAX_SAFE_INTEGER });
  return questions.reduce((counts, question) => {
    counts[question.questionType] = (counts[question.questionType] || 0) + 1;
    return counts;
  }, {});
};

export default getCBSEMockQuestions;
