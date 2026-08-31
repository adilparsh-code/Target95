/**
 * CBSE 2026-27 completion gates.
 * Runtime-oriented checks used to prevent a class/subject from being
 * presented as complete when curriculum or practice coverage is missing.
 */

import { cbseCurriculum2026_27 } from './curriculum-2026-27';
import { getCBSEPracticeQuestions } from './practice-questions-2026-27';
import { getCBSESubjectTrack } from './subjects-2026-27';

export const getCBSECompletionAudit = () => {
  const classes = Object.entries(cbseCurriculum2026_27.classes).flatMap(([classNumber, classData]) =>
    classData.subjects.map((subject) => {
      const questions = getCBSEPracticeQuestions({ classNumber: Number(classNumber), subjectCode: subject.code });
      const track = getCBSESubjectTrack(subject.code);
      const units = [
        ...(subject.parts?.partA?.units || []),
        ...(subject.parts?.partB?.units || []),
      ];

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
        ready: Boolean(track?.classLevels?.includes(Number(classNumber))) && units.length > 0 && questions.length > 0,
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
