/**
 * CBSE 2026-27 learning-content index.
 * Keeps unit -> learning outcomes/theory/practical navigation reusable.
 * Missing academic content stays empty and is hidden by consumers; generic
 * filler text must never be presented as syllabus-specific teaching content.
 */
import { getCBSECurriculum } from './curriculum-2026-27';

const normalizeUnit = (unit) => ({
  id: unit.id,
  code: unit.code,
  name: String(unit?.name || '').trim(),
  learningOutcomes: Array.isArray(unit?.learningOutcomes) ? unit.learningOutcomes : [],
  theory: Array.isArray(unit?.theory) ? unit.theory : [],
  practicalActivities: Array.isArray(unit?.practicalActivities) ? unit.practicalActivities : [],
  chapters: Array.isArray(unit?.chapters) ? unit.chapters : [],
});

export const getCBSELearningContent = (classNumber, subjectCode) => {
  const subject = getCBSECurriculum(Number(classNumber), String(subjectCode));
  if (!subject) return null;

  const units = [
    ...(subject.parts?.partA?.units || []),
    ...(subject.parts?.partB?.units || []),
  ];

  return units.map(normalizeUnit);
};

export default getCBSELearningContent;
