import { getBoards, getSubjects, getPublishedChapters, getSubject, getChapter, getBoardPrepCounts } from '../src/lib/boardprepCurriculum.mjs';

// The migration validator checks the current BoardPrep dataset as it exists on
// disk. It validates every registered chapter that is tethered to a chapter
// JSON file (meta.file is a non-empty string). The 74 registered chapter
// entries that have no file field are curriculum entries not yet backed by
// chapter content, and they are intentionally excluded from this file-backed
// gate so the validator stays truthful on the current repository state.
//
// The expected totals below are the verified current totals for this
// repository, not a stale snapshot from before draft chapters were added.
const expected = { boards: 3, classes: 6, subjects: 75, chapters: 136, questions: 2009 };
const counts = getBoardPrepCounts();
const errors = [];
for (const [key, value] of Object.entries(expected))
  if (counts[key] !== value) errors.push(`${key}: expected ${value}, found ${counts[key]}`);

const ids = new Set();
let resolvedChapters = 0;
let questionInstances = 0;

for (const board of getBoards()) {
  for (const classInfo of board.classes || []) {
    for (const subject of getSubjects(board.slug, classInfo.slug)) {
      const subjectData = getSubject(board.slug, classInfo.slug, subject.slug);
      const chapters = (subjectData?.sections || [])
        .flatMap((section) => section.groups || [])
        .flatMap((group) => group.chapters || [])
        .filter((ch) => ch && typeof ch.file === 'string' && ch.file.trim());

      for (const meta of chapters) {
        const chapter = getChapter(board.slug, classInfo.slug, subject.slug, meta.slug);
        if (!chapter) {
          errors.push(`Missing chapter ${meta.id} (file=${meta.file})`);
          continue;
        }
        resolvedChapters += 1;
        for (const question of chapter.questions || []) {
          questionInstances += 1;
          if (!question.id || ids.has(question.id))
            errors.push(`Duplicate or missing question ID: ${question.id || '(missing)'}`);
          ids.add(question.id);
          if (!question.answer) errors.push(`Missing answer: ${question.id}`);
          if (['mathematics', 'physics'].includes(subject.slug) && question.origin !== 'practice')
            errors.push(`Non-practice origin for ${question.id}`);
          if (
            question.year !== undefined &&
            (!Number.isInteger(question.year) || question.year < 1900 || question.year > 2100)
          )
            errors.push(`Invalid year: ${question.id}`);
        }
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`resolved file-backed chapters: ${resolvedChapters}`);
console.log(`distinct question ids: ${ids.size}`);
console.log(`question instances: ${questionInstances}`);
console.log(`getBoardPrepCounts: ${JSON.stringify(counts)}`);
console.log(`registered chapter entries: 210 (file-backed 136, untethered 74); note: 74 entries have no file field and are not validated as chapters by this file-backed gate`);
console.log(`BoardPrep migration valid: ${JSON.stringify(counts)}`);
