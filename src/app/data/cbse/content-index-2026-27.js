import { getCBSEPracticeQuestions } from './question-bank-2026-27';

export const getCBSEContentSummary = (classNumber, subjectCode) => {
  const questions = getCBSEPracticeQuestions(classNumber, subjectCode);
  const types = questions.reduce((acc, item) => {
    acc[item.questionType] = (acc[item.questionType] || 0) + 1;
    return acc;
  }, {});

  return {
    board: 'CBSE',
    session: '2026-27',
    classNumber: Number(classNumber),
    subjectCode: String(subjectCode),
    practiceQuestionCount: questions.length,
    questionTypes: types,
    hasPractice: questions.length > 0,
  };
};

export default getCBSEContentSummary;
