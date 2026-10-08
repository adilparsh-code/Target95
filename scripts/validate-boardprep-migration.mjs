import { getBoards, getSubjects, getPublishedChapters, getChapter, getBoardPrepCounts } from '../src/lib/boardprepCurriculum.mjs';

const expected = { boards: 3, classes: 6, subjects: 75, chapters: 52, questions: 947 };
const counts = getBoardPrepCounts();
const errors = [];
for (const [key, value] of Object.entries(expected)) if (counts[key] !== value) errors.push(`${key}: expected ${value}, found ${counts[key]}`);

const ids = new Set();
for (const board of getBoards()) for (const classInfo of board.classes || []) for (const subject of getSubjects(board.slug, classInfo.slug)) {
  for (const meta of getPublishedChapters(board.slug, classInfo.slug, subject.slug)) {
    const chapter = getChapter(board.slug, classInfo.slug, subject.slug, meta.slug);
    if (!chapter) { errors.push(`Missing chapter ${meta.id}`); continue; }
    for (const question of chapter.questions || []) {
      if (!question.id || ids.has(question.id)) errors.push(`Duplicate or missing question ID: ${question.id || '(missing)'}`);
      ids.add(question.id);
      if (!question.answer) errors.push(`Missing answer: ${question.id}`);
      if (['mathematics', 'physics'].includes(subject.slug) && question.origin !== 'practice') errors.push(`Non-practice origin for ${question.id}`);
      if (question.year !== undefined && (!Number.isInteger(question.year) || question.year < 1900 || question.year > 2100)) errors.push(`Invalid year: ${question.id}`);
    }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`BoardPrep migration valid: ${JSON.stringify(counts)}`);
