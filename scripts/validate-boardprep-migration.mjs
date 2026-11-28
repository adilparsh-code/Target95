import { getBoards, getSubjects, getPublishedChapters, getChapter, getBoardPrepCounts } from '../src/lib/boardprepCurriculum.mjs';

const counts = getBoardPrepCounts();

const errors = [];

// Structural invariants over the authoritative counts object.
const countFields = { boards: counts.boards, classes: counts.classes, subjects: counts.subjects, chapters: counts.chapters, questions: counts.questions };
for (const key of Object.keys(countFields)) {
  if (typeof countFields[key] !== 'number' || !Number.isInteger(countFields[key]) || countFields[key] < 0) {
    errors.push(`counts.${key} is not a valid non-negative integer: ${JSON.stringify(counts[key])}`);
  }
}

if (!counts.boards && counts.boards !== 0) errors.push('counts.boards is falsy but not 0');
if (!counts.classes && counts.classes !== 0) errors.push('counts.classes is falsy but not 0');
if (!counts.subjects && counts.subjects !== 0) errors.push('counts.subjects is falsy but not 0');
if (!counts.chapters && counts.chapters !== 0) errors.push('counts.chapters is falsy but not 0');
if (!counts.questions && counts.questions !== 0) errors.push('counts.questions is falsy but not 0');

// Cross-check: re-derive chapter and question totals by visiting every published
// chapter through getChapter, and compare with the read model's own counts. This
// catches discrepancies where a chapter is listed as published but cannot be loaded,
// or where the totals in getBoardPrepCounts do not match the live published set.
// Chapter slugs are unique within a subject registry, not globally (for example
// a Biology chapter and an ICSE Biology chapter may both be 'photosynthesis'),
// so key each published chapter by its full board/class/subject/slug path.
let visitedChapterKeys = new Set();
let visitedQuestions = new Set();
let derivedQuestions = 0;

for (const board of getBoards()) {
  for (const classInfo of board.classes || []) {
    for (const subject of getSubjects(board.slug, classInfo.slug)) {
      for (const meta of getPublishedChapters(board.slug, classInfo.slug, subject.slug)) {
        const chapterKey = [board.slug, classInfo.slug, subject.slug, meta.slug].join('/');
        if (visitedChapterKeys.has(chapterKey)) {
          errors.push(`Duplicate published chapter entry: ${chapterKey}`);
          continue;
        }
        visitedChapterKeys.add(chapterKey);

        const chapter = getChapter(board.slug, classInfo.slug, subject.slug, meta.slug);
        if (!chapter) {
          errors.push(`Missing chapter file for published chapter: ${meta.id} (${meta.slug})`);
          continue;
        }

        if (!chapter.questions || !Array.isArray(chapter.questions)) {
          errors.push(`Chapter has no question array: ${chapter.id}`);
          continue;
        }

        for (const question of chapter.questions) {
          derivedQuestions += 1;

          if (!question.id) {
            errors.push(`Missing question id in ${chapter.id}`);
            continue;
          }
          if (visitedQuestions.has(question.id)) {
            errors.push(`Duplicate question id: ${question.id}`);
            continue;
          }
          visitedQuestions.add(question.id);

          if (!question.answer) {
            errors.push(`Missing answer: ${question.id}`);
          }
          if (['mathematics', 'physics'].includes(subject.slug) && question.origin !== 'practice') {
            errors.push(`Non-practice origin for ${question.id}`);
          }
          if (question.year !== undefined && (!Number.isInteger(question.year) || question.year < 1900 || question.year > 2100)) {
            errors.push(`Invalid year: ${question.id}`);
          }
        }
      }
    }
  }
}

if (counts.chapters !== visitedChapterKeys.size) {
  errors.push(`chapter count mismatch: getBoardPrepCounts says ${counts.chapters}, but published registry chapters loaded are ${visitedChapterKeys.size}`);
}
if (counts.questions !== derivedQuestions) {
  errors.push(`question count mismatch: getBoardPrepCounts says ${counts.questions}, but questions counted through getChapter are ${derivedQuestions}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const summary = { ...counts, visitedPublishedChapters: visitedChapterKeys.size, questionsThroughGetChapter: derivedQuestions };
console.log(`BoardPrep migration valid: ${JSON.stringify(summary)}`);
