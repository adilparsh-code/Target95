/**
 * Board-aware CBSE mock-test blueprints.
 * These blueprints are configuration only; question content remains in the question bank.
 */

export const CBSE_MOCK_BLUEPRINTS = {
  '402-9': {
    board: 'CBSE', class: 9, subjectCode: '402',
    durationMinutes: 120, negativeMarking: false,
    selection: { curriculumDriven: true, competencyAware: true },
  },
  '402-10': {
    board: 'CBSE', class: 10, subjectCode: '402',
    durationMinutes: 120, negativeMarking: false,
    selection: { curriculumDriven: true, competencyAware: true },
  },
  '083-11': {
    board: 'CBSE', class: 11, subjectCode: '083',
    durationMinutes: 180, negativeMarking: false,
    selection: { curriculumDriven: true, competencyAware: true },
    programmingLanguage: 'Python', pythonLibraries: [],
  },
  '083-12': {
    board: 'CBSE', class: 12, subjectCode: '083',
    durationMinutes: 180, negativeMarking: false,
    selection: { curriculumDriven: true, competencyAware: true },
    programmingLanguage: 'Python', pythonLibraries: [],
  },
  '065-11': {
    board: 'CBSE', class: 11, subjectCode: '065',
    durationMinutes: 180, negativeMarking: false,
    selection: { curriculumDriven: true, competencyAware: true },
    programmingLanguage: 'Python', pythonLibraries: ['Pandas', 'Matplotlib'],
  },
  '065-12': {
    board: 'CBSE', class: 12, subjectCode: '065',
    durationMinutes: 180, negativeMarking: false,
    selection: { curriculumDriven: true, competencyAware: true },
    programmingLanguage: 'Python', pythonLibraries: ['Pandas', 'Matplotlib'],
  },
  '802-11': {
    board: 'CBSE', class: 11, subjectCode: '802',
    durationMinutes: 180, negativeMarking: false,
    selection: { curriculumDriven: true, competencyAware: true },
    programmingLanguage: 'Java', pythonLibraries: [],
  },
  '802-12': {
    board: 'CBSE', class: 12, subjectCode: '802',
    durationMinutes: 180, negativeMarking: false,
    selection: { curriculumDriven: true, competencyAware: true },
    programmingLanguage: 'Java', pythonLibraries: [],
  },
};

export const getCBSEMockBlueprint = (subjectCode, classNumber) =>
  CBSE_MOCK_BLUEPRINTS[`${String(subjectCode)}-${String(classNumber)}`] ?? null;

export default CBSE_MOCK_BLUEPRINTS;
