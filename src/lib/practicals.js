/**
 * Practical / Laboratory Assignment accessors
 * ====================================================================
 * Thin query layer over the practical registry in
 * `src/app/data/practicals.js`, mirroring the accessor pattern used
 * by `curriculum.js` and `studyCenter.js`.
 *
 * NOTE: No student submission tracking is implemented (explicitly out
 * of scope). This layer only exposes the prepared data model.
 */

import practicals, { labAssignmentCount } from "@/app/data/practicals";

/** @returns {PracticalAssignment[]} the complete registry (labs + projects) */
export function getAllPracticals() {
  return practicals;
}

/** @returns {PracticalAssignment[]} lab assignments only (excludes projects) */
export function getLabAssignments() {
  return practicals.filter((p) => p.assignmentType === "lab");
}

/**
 * Query lab assignments / projects by any combination of class, unit,
 * board, assignmentType, difficulty, or topic id.
 */
export function getPracticals(filters = {}) {
  return practicals.filter((p) => {
    const { class: className, syllabusUnit, board, assignmentType, difficulty, topicId } = filters;
    return (!className || p.class === className) &&
      (!syllabusUnit || p.syllabusUnit === syllabusUnit) &&
      (!board || p.board === board) &&
      (!assignmentType || p.assignmentType === assignmentType) &&
      (!difficulty || p.difficulty === difficulty) &&
      (!topicId || p.topicId === topicId);
  });
}

/** @returns {PracticalAssignment[]} the 15 lab assignments required for a class */
export function getLabAssignmentsForClass(className) {
  return getPracticals({ class: className, assignmentType: "lab" });
}

/** @returns {PracticalAssignment[]|null} the assessed project(s) for a class */
export function getProjectsForClass(className) {
  return getPracticals({ class: className, assignmentType: "project" });
}

/** @returns {PracticalAssignment|undefined} a project by class, or its projectId */
export function getProject(classNameOrId) {
  return practicals.find(
    (p) => p.assignmentType === "project" && (p.class === classNameOrId || p.projectId === classNameOrId)
  );
}

/** @returns {PracticalAssignment|undefined} a lab assignment by id or slug */
export function getPractical(idOrSlug) {
  return practicals.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

export const practicalStats = {
  total: practicals.length,
  labs: getLabAssignments().length,
  projects: practicals.filter((p) => p.assignmentType === "project").length,
  perClass: labAssignmentCount,
};

export default practicals;
