/**
 * CBSE 2026-27 learning-content index.
 * Keeps unit -> learning outcomes/theory/practical navigation reusable.
 * Learner-facing consumers never receive empty arrays when a unit has a usable title.
 */
import { getCBSECurriculum } from './curriculum-2026-27';

const normalizeUnit = (unit) => {
  const name = String(unit?.name || '').trim();
  return {
    id: unit.id,
    code: unit.code,
    name,
    learningOutcomes: unit.learningOutcomes?.length ? unit.learningOutcomes : (name ? [`Explain and apply the prescribed ${name.toLowerCase()} concepts.`] : []),
    theory: unit.theory?.length ? unit.theory : (name ? [name, 'Core concepts, terminology and applications'] : []),
    practicalActivities: unit.practicalActivities?.length ? unit.practicalActivities : (name ? [`Complete a guided practical activity on ${name.toLowerCase()}.`] : []),
    chapters: unit.chapters?.length ? unit.chapters : [],
  };
};

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
