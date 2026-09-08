/**
 * CBSE 2026-27 chapter/topic registry.
 *
 * Builds searchable chapter objects from the verified curriculum map so every
 * CBSE unit has stable chapter IDs, board/class/subject metadata and a
 * syllabus-linked topic list. Question mapping is performed by topicId when
 * available; questions without a topicId remain available at unit level.
 */

import { getCBSECurriculum } from '../curriculum-2026-27';
import { getCBSEMockQuestions } from '../mock-tests-2026-27';

const slugify = (value) => String(value || '')
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const makeChapter = ({ board, classNumber, subjectCode, unit, topic, index, part }) => ({
  id: `cbse-${classNumber}-${subjectCode}-${unit.code}-${index + 1}`,
  slug: `${slugify(unit.name)}-${slugify(topic)}`,
  title: topic,
  board,
  class: String(classNumber),
  classNumber,
  subject: String(subjectCode),
  subjectCode: String(subjectCode),
  unitId: unit.id,
  unitCode: String(unit.code),
  unitTitle: unit.name,
  part,
  learningObjectives: Array.isArray(unit.learningOutcomes) ? unit.learningOutcomes : [],
  practicalActivities: Array.isArray(unit.practicalActivities) ? unit.practicalActivities : [],
  questions: [],
});

const getUnitTopics = (unit) => {
  if (Array.isArray(unit.chapters) && unit.chapters.length) {
    return unit.chapters.map((chapter) => ({
      title: chapter.title,
      source: chapter,
    })).filter((item) => item.title);
  }

  if (Array.isArray(unit.theory) && unit.theory.length) {
    return unit.theory.map((topic) => ({
      title: topic,
      source: null,
    }));
  }

  // A unit with no detailed academic topic list is still represented as a
  // searchable chapter rather than silently disappearing from navigation.
  return [{ title: unit.name, source: null }];
};

export const buildCBSEChapters = (classNumber, subjectCode) => {
  const subject = getCBSECurriculum(Number(classNumber), String(subjectCode));
  if (!subject) return [];

  const parts = [
    ['partA', subject.parts?.partA],
    ['partB', subject.parts?.partB],
  ];

  const chapters = [];

  parts.forEach(([part, partData]) => {
    (partData?.units || []).forEach((unit) => {
      getUnitTopics(unit).forEach((topic, index) => {
        const chapter = makeChapter({
          board: 'CBSE',
          classNumber: Number(classNumber),
          subjectCode: String(subjectCode),
          unit,
          topic: topic.title,
          index,
          part,
        });

        if (topic.source) {
          chapter.learningObjectives = topic.source.learningObjectives || chapter.learningObjectives;
          chapter.metadata = topic.source.metadata || {};
        }

        chapters.push(chapter);
      });
    });
  });

  const questions = getCBSEMockQuestions(Number(classNumber), String(subjectCode), 1000);
  const byTopic = new Map();

  questions.forEach((question) => {
    const topicId = question?.topicId || question?.chapter;
    if (!topicId) return;
    const key = String(topicId);
    if (!byTopic.has(key)) byTopic.set(key, []);
    byTopic.get(key).push(question);
  });

  return chapters.map((chapter) => ({
    ...chapter,
    questions: byTopic.get(chapter.id)?.length
      ? byTopic.get(chapter.id)
      : byTopic.get(chapter.slug) || [],
  }));
};

export const getCBSEChapters = (classNumber, subjectCode) =>
  buildCBSEChapters(classNumber, subjectCode);

export const getCBSEChapter = (classNumber, subjectCode, chapterId) =>
  getCBSEChapters(classNumber, subjectCode).find(
    (chapter) => chapter.id === String(chapterId) || chapter.slug === String(chapterId)
  ) || null;

export const getAllCBSEChapters = () => {
  const chapters = [];

  [9, 10].forEach((classNumber) => {
    chapters.push(...buildCBSEChapters(classNumber, '402'));
  });

  [11, 12].forEach((classNumber) => {
    ['083', '065', '802'].forEach((subjectCode) => {
      chapters.push(...buildCBSEChapters(classNumber, subjectCode));
    });
  });

  return chapters;
};

export default getCBSEChapters;
