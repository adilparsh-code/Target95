import {
  filterQuestionBank,
  getQuestionBankFilters,
  normalizeQuestion,
  questionBankQuestions,
} from "@/lib/questionBankAdapter";

export { filterQuestionBank, getQuestionBankFilters, normalizeQuestion };
export { questionBankQuestions };

/**
 * Backward-compatible question-bank facade.
 * Keep one source of truth for student-facing normalization and filtering.
 */
export const getQuestionBankQuestions = () => questionBankQuestions;
