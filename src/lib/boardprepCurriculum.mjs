import fs from 'node:fs';
import path from 'node:path';

// BoardPrep's verified JSON is retained verbatim under app data. This adapter is
// the single Target95 read model; it never invents years, PYQ labels, or content.
const root = path.join(process.cwd(), 'src/app/data/boardprep/content');
const read = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const validPart = (part) => /^[a-z0-9.-]+$/.test(part);
const dirs = (folder) => fs.readdirSync(folder, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name);

function location(...parts) {
  if (!parts.every(validPart)) throw new Error('Invalid BoardPrep curriculum path');
  return path.join(root, ...parts);
}

export function getBoards() {
  return dirs(root).filter((board) => fs.existsSync(path.join(root, board, 'board.json'))).map((board) => read(path.join(root, board, 'board.json')));
}

export function getBoard(board) { return getBoards().find((item) => item.slug === board) || null; }
export function getClass(board, classSlug) {
  const file = location(board, classSlug, 'class.json');
  return fs.existsSync(file) ? read(file) : null;
}
export function getSubjects(board, classSlug) {
  const classData = getClass(board, classSlug);
  return classData?.subjects || [];
}
export function getSubject(board, classSlug, subjectSlug) {
  const file = location(board, classSlug, subjectSlug, 'subject.json');
  return fs.existsSync(file) ? read(file) : null;
}
export function getPublishedChapters(board, classSlug, subjectSlug) {
  const subject = getSubject(board, classSlug, subjectSlug);
  return (subject?.sections || []).flatMap((section) => section.groups || []).flatMap((group) => group.chapters || []).filter((chapter) => chapter.status === 'published');
}
export function getChapter(board, classSlug, subjectSlug, chapterSlug) {
  const metadata = getPublishedChapters(board, classSlug, subjectSlug).find((chapter) => chapter.slug === chapterSlug);
  if (!metadata?.file) return null;
  const file = location(board, classSlug, subjectSlug, ...metadata.file.split('/'));
  return fs.existsSync(file) ? { ...metadata, ...read(file) } : null;
}

export function getBoardPrepCounts() {
  let classes = 0; let subjects = 0; let chapters = 0; let questions = 0;
  for (const board of getBoards()) for (const classInfo of board.classes || []) {
    classes += 1;
    for (const subject of getSubjects(board.slug, classInfo.slug)) {
      subjects += 1;
      for (const chapter of getPublishedChapters(board.slug, classInfo.slug, subject.slug)) {
        chapters += 1;
        questions += getChapter(board.slug, classInfo.slug, subject.slug, chapter.slug)?.questions?.length || 0;
      }
    }
  }
  return { boards: getBoards().length, classes, subjects, chapters, questions };
}
