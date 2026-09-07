/**
 * CBSE 2026-27 learning-content index.
 * Keeps unit -> learning outcomes/theory/practical navigation reusable.
 * Never exposes empty content arrays when the unit has a usable title.
 */
import { getCBSECurriculum } from './curriculum-2026-27';

const normalizeUnit = (unit) => {
  const name = String(unit?.name || '').trim();
  const learningOutcomes = Array.isArray(unit?.learningOutcomes) && unit.learningOutcomes.length
    ? unit.learningOutcomes
    : name ? [`Explain and apply the prescribed ${name.toLowerCase()} concepts.`] : [];
  const theory = Array.isArray(unit?.theory) && unit.theory.length
    ? unit.theory
    : name ? [name, 'Core concepts, terminology and applications'] : [];
  const practicalActivities = Array.isArray(unit?.practicalActivities) && unit.practicalActivities.length
    ? unit.practicalActivities
    : name ? [`Complete a guided practical activity on ${name.toLowerCase()}.`] : [];
  const chapters = Array.isArray(unit?.chapters) ? unit.chapters : [];

  return {
    id: unit.id,
    code: unit.code,
    name,
    learningOutcomes,
    theory,
    practicalActivities,
    chapters,
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
