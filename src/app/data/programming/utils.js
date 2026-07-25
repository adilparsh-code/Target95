export const createProgrammingQuestion = (overrides = {}) => ({
  id: 1,
  title: '',
  slug: '',
  board: 'ICSE',
  class: '10',
  subject: 'Computer Science',
  language: 'Java',
  chapter: 'Programming Basics',
  topic: '',
  difficulty: 'Easy',
  marks: 2,
  question: '',
  constraints: '',
  sampleInput: '',
  sampleOutput: '',
  algorithm: '',
  explanation: '',
  code: '',
  complexity: 'O(1)',
  tags: [],
  ...overrides,
});

export const normalizeProgrammingQuestion = (question, language = 'Java') =>
  createProgrammingQuestion({
    ...question,
    language: question.language || language,
    tags: Array.isArray(question.tags) ? question.tags : [],
  });

export const buildProgrammingQuestionBank = (questions = [], language = 'Java') =>
  questions.map((question) => normalizeProgrammingQuestion(question, language));
