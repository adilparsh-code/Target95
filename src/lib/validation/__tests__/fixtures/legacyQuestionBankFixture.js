const legacyQuestionBankFixture = {
  id: 1,
  title: 'Fixture Chapter',
  slug: 'fixture-chapter',
  className: 'IX',
  board: 'ICSE',
  mcqs: [
    {
      id: 'CH01-MCQ-001',
      difficulty: 'easy',
      chapter: 'Fixture Chapter',
      chapterId: 1,
      question: 'Which keyword is used to create a class instance?',
      options: ['A) class', 'B) new', 'C) static', 'D) object'],
      correctAnswer: 'B',
      explanation: 'The new operator allocates an object.',
      marks: 1,
    },
  ],
  outputQuestions: [
    {
      id: 'CH01-OUT-001',
      difficulty: 'medium',
      chapter: 'Fixture Chapter',
      chapterId: 1,
      question: 'What is the output of System.out.println("Hi")?',
      answer: 'Hi',
      explanation: 'println writes a line to stdout.',
      marks: 1,
    },
  ],
  programmingQuestions: [
    {
      id: 'CH01-PRQ-001',
      difficulty: 'hard',
      chapter: 'Fixture Chapter',
      chapterId: 1,
      problemStatement: 'Write a program to add two integers.',
      input: '10 20',
      output: '30',
      constraints: 'Numbers are small integers.',
      solution: 'int sum = a + b;',
      estimatedTime: 30,
      marks: 2,
    },
  ],
};

export default legacyQuestionBankFixture;
