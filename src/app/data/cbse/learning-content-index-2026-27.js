/**
 * CBSE 2026-27 learning-content index.
 * Keeps unit -> learning outcomes/theory/practical navigation reusable.
 */
import { getCBSECurriculum } from './curriculum-2026-27';

export const getCBSELearningContent = (classNumber, subjectCode) => {
  const subject = getCBSECurriculum(Number(classNumber), String(subjectCode));
  if (!subject) return null;

  const units = [
    ...(subject.parts?.partA?.units || []),
    ...(subject.parts?.partB?.units || []),
  ];

  return units.map((unit) => ({
    id: unit.id,
    code: unit.code,
    name: unit.name,
    learningOutcomes: unit.learningOutcomes || [],
    theory: unit.theory || [],
    practicalActivities: unit.practicalActivities || [],
    chapters: unit.chapters || [],
  }));
};

export default getCBSELearningContent;
