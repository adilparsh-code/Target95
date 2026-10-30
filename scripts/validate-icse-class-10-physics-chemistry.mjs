import { getSubject, getPublishedChapters, getChapter, getBoardPrepCounts } from '../src/lib/boardprepCurriculum.mjs';
import fs from 'node:fs';
import path from 'node:path';

const SUBJECTS = [
  { board: 'icse', classSlug: 'class-10', subjectSlug: 'physics' },
  { board: 'icse', classSlug: 'class-10', subjectSlug: 'chemistry' },
];

const errors = [];
const checked = [];
const unresolved = [];
const idMismatches = [];

for (const { board, classSlug, subjectSlug } of SUBJECTS) {
  const subject = getSubject(board, classSlug, subjectSlug);
  if (!subject) {
    errors.push(`Missing subject registry: ${board}/${classSlug}/${subjectSlug}`);
    continue;
  }

  for (const section of subject.sections || []) {
    for (const group of section.groups || []) {
      for (const chapter of group.chapters || []) {
        const chapterId = chapter.id;
        const chapterSlug = chapter.slug;
        const relativeFile = chapter.file;

        checked.push({ board, classSlug, subjectSlug, chapterId, chapterSlug, relativeFile });

        if (!relativeFile || typeof relativeFile !== 'string') {
          errors.push(`${board}/${classSlug}/${subjectSlug}: chapter ${chapterId ?? '(no id)'} has no file field`);
          continue;
        }

        const subjectDir = path.join(
          process.cwd(),
          'src/app/data/boardprep/content',
          board,
          classSlug,
          subjectSlug,
        );
        const expectedPath = path.join(subjectDir, ...relativeFile.split('/'));
        const exists = fs.existsSync(expectedPath);

        if (!exists) {
          unresolved.push({ board, classSlug, subjectSlug, chapterId, chapterSlug, relativeFile, expectedPath });
          continue;
        }

        // The resolver only returns published chapters, so a planned chapter can
        // exist on disk and still make getChapter return null. Read the file
        // directly for the integrity check, and report the publish status.
        let resolvedChapter = null;
        let resolvedFromAdapter = false;
        try {
          resolvedChapter = getChapter(board, classSlug, subjectSlug, chapterSlug);
          if (resolvedChapter) resolvedFromAdapter = true;
        } catch (err) {
          errors.push(`${board}/${classSlug}/${subjectSlug}: chapter ${chapterId ?? '(no id)'} failed to resolve via adapter: ${err.message}`);
        }

        let fileRecord = resolvedChapter;
        if (!fileRecord && exists) {
          try {
            fileRecord = JSON.parse(fs.readFileSync(expectedPath, 'utf8'));
          } catch (err) {
            errors.push(`${board}/${classSlug}/${subjectSlug}: chapter ${chapterId ?? '(no id)'} file exists but does not parse: ${err.message}`);
            continue;
          }
        }

        if (!fileRecord) {
          unresolved.push({ board, classSlug, subjectSlug, chapterId, chapterSlug, relativeFile, expectedPath, note: 'No readable file record' });
          continue;
        }

        const resolvedId = fileRecord?.id;
        const resolvedSlug = fileRecord?.slug;

        if (String(resolvedId) !== String(chapterId)) {
          idMismatches.push({
            board, classSlug, subjectSlug,
            registryId: chapterId,
            fileId: resolvedId,
            slug: chapterSlug,
            status: resolvedFromAdapter ? 'published-via-adapter' : 'file-read',
          });
        }
        if (String(resolvedSlug) !== String(chapterSlug)) {
          idMismatches.push({
            board, classSlug, subjectSlug,
            registrySlug: chapterSlug,
            fileSlug: resolvedSlug,
            id: chapterId,
            status: resolvedFromAdapter ? 'published-via-adapter' : 'file-read',
          });
        }

        const questionCount = Array.isArray(fileRecord.questions) ? fileRecord.questions.length : 0;
        const hasContent = Array.isArray(fileRecord.learn) && fileRecord.learn.length > 0;
        const placeholder = !hasContent && questionCount === 0;
        const source = resolvedFromAdapter ? 'adapter' : 'file-read';

        if (placeholder) {
          console.log(`PLACEHOLDER ${board}/${classSlug}/${subjectSlug} :: ${chapterId} (${chapterSlug}) :: file ${relativeFile} :: questions ${questionCount} :: not published, no content yet`);
        } else {
          console.log(`OK ${board}/${classSlug}/${subjectSlug} :: ${chapterId} (${chapterSlug}) :: file ${relativeFile} :: questions ${questionCount} :: resolved ${source}`);
        }
      }
    }
  }
}

if (errors.length) {
  console.error('\n--- ERRORS ---');
  for (const e of errors) console.error(e);
}

if (unresolved.length) {
  console.error('\n--- UNRESOLVED CHAPTER FILES ---');
  for (const u of unresolved) console.error(JSON.stringify(u));
}

if (idMismatches.length) {
  console.error('\n--- CHAPTER ID / SLUG MISMATCHES ---');
  for (const m of idMismatches) console.error(JSON.stringify(m));
}

const counts = getBoardPrepCounts();
console.log('\n--- BOARD PREP COUNTS ---');
console.log(JSON.stringify(counts));

if (errors.length || unresolved.length || idMismatches.length) {
  process.exit(1);
}

console.log('\nICSE Class X Physics + Chemistry registry integrity check passed.');
