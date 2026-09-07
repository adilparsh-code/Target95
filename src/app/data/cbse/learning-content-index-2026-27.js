/**
 * CBSE 2026-27 learning-content index.
 *
 * Keeps unit -> learning outcomes/theory/practical navigation reusable.
 *
 * Missing academic content stays empty and is hidden by consumers.
 * Generic filler text must never be presented as syllabus-specific
 * teaching content.
 */

import { getCBSECurriculum } from "./curriculum-2026-27";

/**
 * Safely normalize an array field.
 *
 * This prevents malformed or missing curriculum data from causing
 * runtime errors in consuming components.
 */
const normalizeArray = (value) => {
  return Array.isArray(value) ? value : [];
};

/**
 * Normalize a single curriculum unit into the shape expected
 * by learning-content consumers.
 */
const normalizeUnit = (unit) => {
  if (!unit || typeof unit !== "object") {
    return null;
  }

  return {
    id: unit.id ?? "",
    code: unit.code ?? "",
    name: String(unit.name ?? "").trim(),

    learningOutcomes: normalizeArray(unit.learningOutcomes),
    theory: normalizeArray(unit.theory),
    practicalActivities: normalizeArray(unit.practicalActivities),
    chapters: normalizeArray(unit.chapters),
  };
};

/**
 * Return reusable CBSE learning content for a class and subject.
 *
 * @param {number|string} classNumber
 * @param {string} subjectCode
 * @returns {Array<object>}
 */
export const getCBSELearningContent = (classNumber, subjectCode) => {
  const normalizedClassNumber = Number(classNumber);
  const normalizedSubjectCode = String(subjectCode ?? "").trim();

  // Invalid input should never reach the curriculum lookup.
  if (
    !Number.isFinite(normalizedClassNumber) ||
    !normalizedSubjectCode
  ) {
    return [];
  }

  const subject = getCBSECurriculum(
    normalizedClassNumber,
    normalizedSubjectCode,
  );

  if (!subject || typeof subject !== "object") {
    return [];
  }

  const partAUnits = normalizeArray(
    subject.parts?.partA?.units,
  );

  const partBUnits = normalizeArray(
    subject.parts?.partB?.units,
  );

  const units = [...partAUnits, ...partBUnits];

  return units
    .map(normalizeUnit)
    .filter(Boolean);
};

export default getCBSELearningContent;

