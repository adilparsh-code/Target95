/**
 * CBSE Academic Data - Main Entry Point
 * 2026-27 source-of-truth data is exported separately from legacy data.
 */

import cbseCurriculum2026_27, {
  getCBSECurriculum as getBaseCBSECurriculum,
  CBSE_CURRICULUM_SESSION,
} from './curriculum-2026-27';
import CBSE_843_AI_2026_27 from './cbse843-ai-2026-27';

export { cbseCurriculum2026_27, CBSE_CURRICULUM_SESSION };

/** AI 843 is kept as a dedicated XI/XII theory + projects contract. */
export const getCBSECurriculum = (classNumber, subjectCode) => {
  if (String(subjectCode) === '843') {
    const ai = CBSE_843_AI_2026_27.classes[Number(classNumber)];
    if (!ai) return null;
    return {
      code: '843',
      id: `cbse-843-class-${classNumber}`,
      name: 'Artificial Intelligence',
      category: 'skill-subject',
      syllabusSource: `CBSE Artificial Intelligence (843) Class ${classNumber} 2026-27`,
      sourceUrl: 'https://cbseacademic.nic.in/skill-education-curriculum.html',
      pythonRole: 'ai-programming-and-data',
      assessment: { theoryMarks: 50, practicalMarks: 50, totalMarks: 100 },
      parts: {
        partA: { name: 'Employability Skills', units: [] },
        partB: { name: 'AI Subject Specific Theory', units: ai.theoryUnits },
      },
      projects: ai.projects,
    };
  }
  return getBaseCBSECurriculum(classNumber, subjectCode);
};

export { CBSE_843_AI_2026_27 };
export { default as CBSE_402_CLASS9_2026_27 } from './class9-402-2026-27-sources';
export { cbseSubjectTracks, getCBSESubjectTrack } from './subjects-2026-27';
export { default as cbseQuestionSchema2026_27, validateCBSEQuestion } from './question-schema-2026-27';
export { default as CBSE_SUBJECT_MOCK_CONFIG, getCBSEQuestionConfig } from './question-config-2026-27';
export { default as CBSE_MOCK_TEST_BLUEPRINTS, getCBSEMockBlueprint } from './mock-test-blueprints-2026-27';
export { default as CBSE_MOCK_TESTS_2026_27 } from './mock-tests-2026-27';
export { default as CBSE_SUBJECT_CONTENT_2026_27, getCBSESubjectContent } from './ui-content-2026-27';

/** Legacy exports retained under explicit legacy names. */
export { default as legacyCBSEClass10 } from './classes/class10';
export { default as legacyCBSEClass11 } from './classes/class11';
export { default as legacyCBSEClass12 } from './classes/class12';
export { cbseSubjects as legacyCBSESubjects } from './subjects';
export { cbseUnits as legacyCBSEUnits } from './units';
export { learningOutcomes as legacyCBSELearningOutcomes } from './learning-outcomes';
export { competencyLevels as legacyCBSECompetencyLevels } from './competency-levels';

export const getAllCBSE2026_27Classes = () =>
  Object.entries(cbseCurriculum2026_27.classes).map(([classNumber, data]) => ({
    classNumber: Number(classNumber),
    ...data,
  }));

export const getCBSE2026_27Subject = (classNumber, subjectCode) =>
  getCBSECurriculum(classNumber, subjectCode);

export default {
  getAllCBSE2026_27Classes,
  getCBSE2026_27Subject,
  getCBSECurriculum,
};
