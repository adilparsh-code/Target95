/**
 * Board-aware integration helpers for the shared QuestionPlayer/MockTest stack.
 * Does not change existing UI contracts; callers can opt into these helpers.
 */

export const normalizeBoardContext = ({
  board = 'ICSE',
  classId = null,
  subjectCode = null,
  subjectId = null,
  chapterId = null,
  chapter = null,
} = {}) => ({
  board: String(board || 'ICSE').toUpperCase(),
  classId: classId ?? null,
  subjectCode: subjectCode != null ? String(subjectCode) : null,
  subjectId: subjectId ?? null,
  chapterId: chapterId ?? chapter ?? null,
});

export const getQuestionRouteContext = (context = {}) => {
  const normalized = normalizeBoardContext(context);
  if (normalized.board === 'CBSE') {
    return {
      ...normalized,
      basePath: '/cbse',
      subjectPath: normalized.subjectCode ? `/subject/${normalized.subjectCode}` : '',
    };
  }

  return {
    ...normalized,
    basePath: '/Java',
    subjectPath: '',
  };
};

export const getAnswerValue = (question = {}) => (
  question.modelAnswer ??
  question.answer ??
  question.solution ??
  question.javaSolution ??
  ''
);

export const getQuestionNavigationPath = ({ board, chapter, questionId, subjectCode, classId } = {}) => {
  const context = normalizeBoardContext({ board, classId, subjectCode, chapter });
  if (context.board === 'CBSE') {
    const subjectSegment = context.subjectCode ? `/subject/${encodeURIComponent(context.subjectCode)}` : '';
    return `/cbse${subjectSegment}/${encodeURIComponent(context.chapterId || 'all')}/question/${encodeURIComponent(questionId)}`;
  }
  return `/Java/${encodeURIComponent(context.chapterId || chapter || 'all')}/question/${encodeURIComponent(questionId)}`;
};

export const getMockFilterCategories = (board = 'ICSE') => {
  if (String(board).toUpperCase() === 'CBSE') {
    return [
      { id: 'cbse-class-9', label: 'CBSE Class 9', board: 'CBSE', class: 9 },
      { id: 'cbse-class-10', label: 'CBSE Class 10', board: 'CBSE', class: 10 },
      { id: 'cbse-class-11', label: 'CBSE Class 11', board: 'CBSE', class: 11 },
      { id: 'cbse-class-12', label: 'CBSE Class 12', board: 'CBSE', class: 12 },
    ];
  }
  return [
    { id: 'icse-class-9', label: 'ICSE Class 9', board: 'ICSE', class: 9 },
    { id: 'icse-class-10', label: 'ICSE Class 10', board: 'ICSE', class: 10 },
    { id: 'isc-class-11', label: 'ISC Class 11', board: 'ISC', class: 11 },
    { id: 'isc-class-12', label: 'ISC Class 12', board: 'ISC', class: 12 },
  ];
};

export default {
  normalizeBoardContext,
  getQuestionRouteContext,
  getAnswerValue,
  getQuestionNavigationPath,
  getMockFilterCategories,
};
