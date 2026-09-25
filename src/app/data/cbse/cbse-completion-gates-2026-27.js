/**
 * CBSE 2026-27 completion gates.
 * Runtime-oriented checks used to prevent a class/subject from being
 * presented as complete when curriculum or practice coverage is missing.
 */

import { cbseCurriculum2026_27 } from './curriculum-2026-27.js';
import { CBSE_UNIT_ENRICHMENT } from './syllabus-gap-content-2026-27.js';
import CBSE_402_CLASS9_DETAILED_VERIFICATION_2026_27 from './class9-402-detailed-verification-2026-27.js';
import { getCBSEPracticeQuestions } from './question-bank-2026-27.js';
import { getCBSESubjectTrack } from './subjects-2026-27.js';

export const getCBSECompletionAudit = () => {
  const classes = Object.entries(cbseCurriculum2026_27.classes).flatMap(([classNumber, classData]) =>
    classData.subjects.map((subject) => {
      const questions = getCBSEPracticeQuestions(Number(classNumber), subject.code);
      const track = getCBSESubjectTrack(subject.code);
      const units = [
        ...(subject.parts?.partA?.units || []),
        ...(subject.parts?.partB?.units || []),
      ].map((unit) => {
        const detailed = Number(classNumber) === 9 && subject.code === '402' && unit.id.startsWith('402-ix-b')
          ? CBSE_402_CLASS9_DETAILED_VERIFICATION_2026_27.units?.[`B${unit.code}`]
          : null;
        return { ...unit, ...(CBSE_UNIT_ENRICHMENT[unit.id] || {}), ...(detailed || {}) };
      });

      return {
        classNumber: Number(classNumber),
        subjectCode: subject.code,
        subjectName: subject.name,
        supported: Boolean(track?.classLevels?.includes(Number(classNumber))),
        unitCount: units.length,
        learningContentCount: units.reduce(
          (count, unit) => count + (unit.theory?.length || 0) + (unit.practicalActivities?.length || 0),
          0,
        ),
        practiceQuestionCount: questions.length,
        curriculumReady: units.length > 0,
        practiceReady: questions.length > 0,
        ready: Boolean(track?.classLevels?.includes(Number(classNumber))) && units.length > 0 && questions.length > 0 && units.every((unit) => (unit.theory?.length || 0) + (unit.practicalActivities?.length || 0) + (unit.learningOutcomes?.length || 0) > 0),
      };
    }),
  );

  return {
    board: 'CBSE',
    session: '2026-27',
    classes,
    readyCount: classes.filter((item) => item.ready).length,
    totalCount: classes.length,
    allReady: classes.length > 0 && classes.every((item) => item.ready),
  };
};

export default getCBSECompletionAudit;
