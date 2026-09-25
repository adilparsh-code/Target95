/**
 * CBSE Academic Data - Main Entry Point
 * 2026-27 source-of-truth data is exported separately from legacy data.
 */

import cbseCurriculum2026_27, {
  getCBSECurriculum as getBaseCBSECurriculum,
  CBSE_CURRICULUM_SESSION,
} from './curriculum-2026-27';
import CBSE_843_AI_2026_27 from './cbse843-ai-2026-27';
import CBSE_402_CLASS9_DETAILED_VERIFICATION_2026_27 from './class9-402-detailed-verification-2026-27';
import { CBSE_UNIT_ENRICHMENT } from './syllabus-gap-content-2026-27';

/**
 * Fill empty theory / learning-outcome / practical arrays on CBSE units with the
 * authored gap-fill content. Existing content always wins; enrichment is only
 * applied when the source field is missing or empty.
 */
const applyUnitEnrichment = (subject) => {
  if (!subject || !subject.parts) return subject;

  const enrichUnits = (units = []) => units.map((unit) => {
    const extra = CBSE_UNIT_ENRICHMENT[unit.id];
    if (!extra) return unit;
    return {
      ...unit,
      learningOutcomes: (Array.isArray(unit.learningOutcomes) && unit.learningOutcomes.length) ? unit.learningOutcomes : (extra.learningOutcomes || []),
      theory: (Array.isArray(unit.theory) && unit.theory.length) ? unit.theory : (extra.theory || []),
      practicalActivities: (Array.isArray(unit.practicalActivities) && unit.practicalActivities.length) ? unit.practicalActivities : (extra.practicalActivities || []),
    };
  });

  return {
    ...subject,
    parts: {
      ...subject.parts,
      partA: subject.parts.partA ? { ...subject.parts.partA, units: enrichUnits(subject.parts.partA.units) } : subject.parts.partA,
      partB: subject.parts.partB ? { ...subject.parts.partB, units: enrichUnits(subject.parts.partB.units) } : subject.parts.partB,
    },
  };
};

export { cbseCurriculum2026_27, CBSE_CURRICULUM_SESSION };

const withCBSE402Class9DetailedContent = (subject) => {
  if (!subject) return subject;

  const detailedUnits = CBSE_402_CLASS9_DETAILED_VERIFICATION_2026_27.units;
  const enrichUnits = (units = []) => units.map((unit) => {
    const detailed = detailedUnits?.[`B${unit.code}`];
    if (!detailed) return unit;

    return {
      ...unit,
      learningOutcomes: detailed.learningOutcomes || unit.learningOutcomes || [],
      theory: detailed.theory || unit.theory || [],
      practicalActivities: detailed.practicalActivities || unit.practicalActivities || [],
      chapters: Array.isArray(unit.chapters) && unit.chapters.length ? unit.chapters : [],
      contentVerification: detailed.verification,
      contentSourceUrl: CBSE_402_CLASS9_DETAILED_VERIFICATION_2026_27.sourceUrl,
    };
  });

  return {
    ...subject,
    parts: {
      ...subject.parts,
      partB: {
        ...subject.parts?.partB,
        units: enrichUnits(subject.parts?.partB?.units),
      },
    },
  };
};

/** AI 843 is kept as a dedicated XI/XII theory + projects contract. */
export const getCBSECurriculum = (classNumber, subjectCode) => {
  if (String(subjectCode) === '843') {
    const ai = CBSE_843_AI_2026_27.classes[Number(classNumber)];
    if (!ai) return null;
    return applyUnitEnrichment({
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
    });
  }

  const subject = getBaseCBSECurriculum(classNumber, subjectCode);
  if (Number(classNumber) === 9 && String(subjectCode) === '402') {
    return applyUnitEnrichment(withCBSE402Class9DetailedContent(subject));
  }

  return applyUnitEnrichment(subject);
};

export { CBSE_843_AI_2026_27 };
export { default as CBSE_402_CLASS9_2026_27 } from './class9-402-2026-27-sources';
export { default as CBSE_402_CLASS9_DETAILED_VERIFICATION_2026_27 } from './class9-402-detailed-verification-2026-27';
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

const cbseIntegration = {
  getAllCBSE2026_27Classes,
  getCBSE2026_27Subject,
  getCBSECurriculum,
};

export default cbseIntegration;
