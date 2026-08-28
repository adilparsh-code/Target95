/**
 * CBSE Academic Data - Main Entry Point
 * 2026-27 source-of-truth data is exported separately from legacy data.
 */

import cbseCurriculum2026_27, {
  getCBSECurriculum,
  CBSE_CURRICULUM_SESSION,
} from './curriculum-2026-27';

export { cbseCurriculum2026_27, getCBSECurriculum, CBSE_CURRICULUM_SESSION };
export { default as CBSE_402_CLASS9_2026_27 } from './class9-402-2026-27-sources';
export { cbseSubjectTracks, getCBSESubjectTrack } from './subjects-2026-27';
export { default as cbseQuestionSchema2026_27, validateCBSEQuestion } from './question-schema-2026-27';
export { default as CBSE_SUBJECT_MOCK_CONFIG, getCBSEQuestionConfig } from './question-config-2026-27';
export { default as CBSE_MOCK_TEST_BLUEPRINTS, getCBSEMockBlueprint } from './mock-test-blueprints-2026-27';
export { default as CBSE_MOCK_TESTS_2026_27 } from './mock-tests-2026-27';

/**
 * Legacy exports retained under explicit legacy names so old consumers do not
 * silently receive them as the current 2026-27 source of truth.
 */
export { default as legacyCBSEClass10 } from './classes/class10';
export { default as legacyCBSEClass11 } from './classes/class11';
export { default as legacyCBSEClass12 } from './classes/class12';
export { cbseSubjects as legacyCBSESubjects } from './subjects';
export { cbseUnits as legacyCBSEUnits } from './units';
export { learningOutcomes as legacyCBSELearningOutcomes } from './learning-outcomes';
export { competencyLevels as legacyCBSECompetencyLevels } from './competency-levels';

/**
 * Get all current 2026-27 CBSE class entries.
 */
export const getAllCBSE2026_27Classes = () =>
  Object.entries(cbseCurriculum2026_27.classes).map(([classNumber, data]) => ({
    classNumber: Number(classNumber),
    ...data,
  }));

/**
 * Get the current 2026-27 class/subject record.
 */
export const getCBSE2026_27Subject = (classNumber, subjectCode) =>
  getCBSECurriculum(classNumber, subjectCode);

export default {
  getAllCBSE2026_27Classes,
  getCBSE2026_27Subject,
  getCBSECurriculum,
};