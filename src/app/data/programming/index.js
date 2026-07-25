import javaQuestions from './java';
import pythonQuestions from './python';
import { buildProgrammingQuestionBank } from './utils';

export const programmingQuestionBank = {
  java: javaQuestions,
  python: pythonQuestions,
};

export const allProgrammingQuestions = [
  ...buildProgrammingQuestionBank(javaQuestions, 'Java'),
  ...buildProgrammingQuestionBank(pythonQuestions, 'Python'),
];

export default programmingQuestionBank;
