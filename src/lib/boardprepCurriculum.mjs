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

  // The chapter 'file' field in the BoardPrep subject metadata is relative to the
  // subject directory (e.g. "chapters/genetics.json" or "language/grammar/tenses.json").
  // A subset of chapters migrated earlier were stored nested under subject sub-directories
  // (language/grammar/..., literature/poetry/..., etc.). The metadata file field already
  // carries that relative path, so resolve it directly relative to the subject folder.
  const subjectDir = location(board, classSlug, subjectSlug);
  const file = path.join(subjectDir, ...metadata.file.split('/'));

  if (!fs.existsSync(file)) {
    // Defensive fallback for the flat-layout migration case where chapter files sit
    // directly under a "chapters/" folder alongside the subject directory: try the
    // sibling chapters/ folder only when the primary relative-path resolution misses.
    const sibling = path.join(subjectDir, '..', 'chapters', path.basename(metadata.file));
    if (fs.existsSync(sibling)) return { ...metadata, ...read(sibling) };
    return null;
  }
  return { ...metadata, ...read(file) };
}

// Question count per published chapter slug. Reading the chapter files is the
// only reliable way to report a count, because the registry carries metadata
// only and the questions live in the chapter JSON.
export function getChapterQuestionCounts(board, classSlug, subjectSlug) {
  const counts = new Map();
  for (const chapter of getPublishedChapters(board, classSlug, subjectSlug)) {
    counts.set(chapter.slug, getChapter(board, classSlug, subjectSlug, chapter.slug)?.questions?.length || 0);
  }
  return counts;
}

// Published-chapter counts per registered subject, keyed by subject slug. The
// homepage launcher uses this so it can mark registered subjects without
// published content instead of implying a chapter list that does not exist yet.
export function getPublishedChapterCounts(board, classSlug) {
  const counts = {};
  for (const subject of getSubjects(board, classSlug) || []) {
    counts[subject.slug] = getPublishedChapters(board, classSlug, subject.slug).length;
  }
  return counts;
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
