/**
 * CBSE Academic Data - Main Entry Point
 * Centralized export for all CBSE curriculum data
 */

export { default as cbseClasses } from './classes/class10';
export { default as cbseClass11 } from './classes/class11';
export { default as cbseClass12 } from './classes/class12';

export { cbseSubjects } from './subjects';
export { cbseUnits } from './units';
export { learningOutcomes } from './learning-outcomes';
export { competencyLevels } from './competency-levels';
export { default as cbseCurriculum2026_27, getCBSECurriculum, CBSE_CURRICULUM_SESSION } from './curriculum-2026-27';
export { default as CBSE_402_CLASS9_2026_27 } from './class9-402-2026-27-sources';

export { validateCBSEStructure } from './validation-report';
export { curriculumInconsistencies } from './inconsistencies';

/**
 * Get all legacy CBSE class objects.
 */
export const getAllCBSEClasses = () => {
  return [
    require('./classes/class10').default,
    require('./classes/class11').default,
    require('./classes/class12').default,
  ];
};

/**
 * Get CBSE class by ID.
 */
export const getCBSEClassById = (classId) => {
  const classes = getAllCBSEClasses();
  return classes.find((cls) => cls.id === classId);
};

/**
 * Get subject by class and subject ID.
 */
export const getCBSESubject = (classId, subjectId) => {
  const cls = getCBSEClassById(classId);
  if (!cls) return null;
  return cls.subjects.find((sub) => sub.id === subjectId);
};

/**
 * Get chapter by class, subject, and chapter ID.
 */
export const getCBSEChapter = (classId, subjectId, chapterId) => {
  const subject = getCBSESubject(classId, subjectId);
  if (!subject) return null;
  return subject.chapters?.find((ch) => ch.id === chapterId) ?? null;
};

export default {
  getAllCBSEClasses,
  getCBSEClassById,
  getCBSESubject,
  getCBSEChapter,
};