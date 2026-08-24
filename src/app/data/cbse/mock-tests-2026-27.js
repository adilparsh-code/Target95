/**
 * CBSE mock-test blueprints for session 2026-27.
 * These are configuration blueprints; generated questions are selected from the question bank.
 */

export const CBSE_MOCK_TEST_BLUEPRINTS = {
  '402': {
    9: { mode: 'practice', durationMinutes: 120, theoryMarks: 50, sections: ['employability', 'subject-specific'] },
    10: { mode: 'board-practice', durationMinutes: 120, theoryMarks: 50, sections: ['employability', 'subject-specific'] },
  },
  '083': {
    11: { mode: 'board-practice', durationMinutes: 180, theoryMarks: 70, sections: ['computer-systems', 'programming', 'society-law-ethics'] },
    12: { mode: 'board-practice', durationMinutes: 180, theoryMarks: 70, sections: ['programming', 'database', 'networks', 'society-law-ethics'] },
  },
  '065': {
    11: { mode: 'board-practice', durationMinutes: 180, theoryMarks: 70, sections: ['computer-system', 'python', 'sql', 'emerging-trends'] },
    12: { mode: 'board-practice', durationMinutes: 180, theoryMarks: 70, sections: ['data-handling', 'sql', 'networking', 'social-impacts'] },
  },
  '802': {
    11: { mode: 'board-practice', durationMinutes: 180, theoryMarks: 60, sections: ['employability', 'subject-specific'] },
    12: { mode: 'board-practice', durationMinutes: 180, theoryMarks: 60, sections: ['employability', 'subject-specific'] },
  },
};

export const getCBSEMockBlueprint = (subjectCode, classNumber) =>
  CBSE_MOCK_TEST_BLUEPRINTS[String(subjectCode)]?.[Number(classNumber)] ?? null;

export default CBSE_MOCK_TEST_BLUEPRINTS;
