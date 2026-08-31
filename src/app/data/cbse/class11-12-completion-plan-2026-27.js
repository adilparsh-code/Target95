/**
 * CBSE XI-XII completion gates for 2026-27.
 * This is an executable source-of-truth checklist, not a placeholder syllabus.
 */

export const CBSE_XI_XII_COMPLETION_PLAN_2026_27 = {
  session: '2026-27',
  classes: [11, 12],
  subjects: ['083', '065', '802'],
  gates: [
    'verified-curriculum',
    'learning-outcomes',
    'theory-topics',
    'practical-activities',
    'practice-question-coverage',
    'mock-test-coverage',
    'data-validation',
    'production-build',
    'route-smoke-tests',
  ],
  subjectRules: {
    '083': 'Core Python/Computer Science track. Do not inherit 065-only Pandas/Matplotlib content.',
    '065': 'Informatics Practices track. Keep Pandas and Matplotlib separate from 083 core programming.',
    '802': 'Information Technology skill-subject track. Do not inherit 083/065 topic lists.',
  },
};

export default CBSE_XI_XII_COMPLETION_PLAN_2026_27;
