import fs from 'node:fs';
import path from 'node:path';
import { getBoards, getSubjects, getSubject, getPublishedChapters, getChapter, getBoardPrepCounts } from '../src/lib/boardprepCurriculum.mjs';

const expected = { boards: 3, classes: 6, subjects: 81, chapters: 381, questions: 4551 };
const counts = getBoardPrepCounts();
const errors = [];
for (const [key, value] of Object.entries(expected)) if (counts[key] !== value) errors.push(`${key}: expected ${value}, found ${counts[key]}`);

const contentRoot = path.join(process.cwd(), 'src/app/data/boardprep/content');
const chaptersOf = (manifest) => (manifest.sections || []).flatMap((section) => section.groups || []).flatMap((group) => group.chapters || []);
const ids = new Set();
for (const board of getBoards()) for (const classInfo of board.classes || []) for (const subject of getSubjects(board.slug, classInfo.slug)) {
  const manifest = getSubject(board.slug, classInfo.slug, subject.slug);
  if (!manifest) { errors.push(`Missing manifest for ${board.slug}/${classInfo.slug}/${subject.slug}`); continue; }
  // Every chapter file the manifest references must exist and parse, whatever
  // its status. Only opening published files let malformed draft chapters ship
  // unnoticed; a broken draft must fail loudly long before it is published.
  for (const meta of chaptersOf(manifest)) {
    const label = `${board.slug}/${classInfo.slug}/${subject.slug}/${meta.file || '(no file)'} [${meta.status}]`;
    // A manifest may list syllabus entries with no file yet (planned listings);
    // those must never carry published status, and anything with a file must
    // exist and parse whatever its status.
    if (!meta.file) {
      if (meta.status === 'published') errors.push(`Published chapter without a file reference: ${meta.id}`);
      continue;
    }
    const file = path.join(contentRoot, board.slug, classInfo.slug, subject.slug, ...meta.file.split('/'));
    if (!fs.existsSync(file)) { errors.push(`Missing chapter file ${label}`); continue; }
    try { JSON.parse(fs.readFileSync(file, 'utf8')); } catch (error) { errors.push(`Unparseable chapter file ${label}: ${error.message}`); }
  }
  for (const meta of getPublishedChapters(board.slug, classInfo.slug, subject.slug)) {
    const chapter = getChapter(board.slug, classInfo.slug, subject.slug, meta.slug);
    if (!chapter) { errors.push(`Missing chapter ${meta.id}`); continue; }
    if ((chapter.questions || []).length < 8) errors.push(`Published chapter ${meta.id} has fewer than 8 questions`);
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
