import { getSubject } from '../src/lib/boardprepCurriculum.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { countQuestions } from '../src/lib/boardprepContentSchema.mjs';

const BOARD = 'isc';
const CLASS_SLUG = 'class-12';
const SUBJECT_SLUG = 'computer-science';
const SUBJECT_DIR = path.join(process.cwd(), 'src/app/data/boardprep/content', BOARD, CLASS_SLUG, SUBJECT_SLUG);
const CHAPTERS_DIR = path.join(SUBJECT_DIR, 'chapters');

const errors = [];
const checked = [];
const unresolved = [];
const idMismatches = [];
const extraFiles = [];

const subject = getSubject(BOARD, CLASS_SLUG, SUBJECT_SLUG);
if (!subject) {
  errors.push(`Missing subject registry: ${BOARD}/${CLASS_SLUG}/${SUBJECT_SLUG}`);
  console.error('ERRORS:');
  for (const e of errors) console.error(e);
  process.exit(1);
}

const examYears = new Set(subject.syllabusBaselines?.map((b) => b.examYear) || []);
if (!examYears.has(2027)) {
  errors.push(`Subject ${SUBJECT_SLUG} has no 2027 syllabus baseline; expected examYears includes 2027.`);
}

const pythonInRegistry = JSON.stringify(subject).match(/\bPython\b/) != null;
if (pythonInRegistry) {
  errors.push(`Subject ${SUBJECT_SLUG} registry mentions Python; 2027 Computer Science is Java-only.`);
}

const registered = [];
for (const section of subject.sections || []) {
  for (const group of section.groups || []) {
    for (const chapter of group.chapters || []) {
      registered.push({ board: BOARD, classSlug: CLASS_SLUG, subjectSlug: SUBJECT_SLUG, chapter });
    }
  }
}

const registeredFileNames = new Set();
for (const { chapter } of registered) {
  const chapterId = chapter.id;
  const chapterSlug = chapter.slug;
  const relativeFile = chapter.file;

  checked.push({ board: BOARD, classSlug: CLASS_SLUG, subjectSlug: SUBJECT_SLUG, chapterId, chapterSlug, relativeFile });

  if (!relativeFile || typeof relativeFile !== 'string') {
    errors.push(`${BOARD}/${CLASS_SLUG}/${SUBJECT_SLUG}: chapter ${chapterId ?? '(no id)'} has no file field`);
    continue;
  }

  const expectedPath = path.join(SUBJECT_DIR, ...relativeFile.split('/'));
  const exists = fs.existsSync(expectedPath);

  if (!exists) {
    unresolved.push({ board: BOARD, classSlug: CLASS_SLUG, subjectSlug: SUBJECT_SLUG, chapterId, chapterSlug, relativeFile, expectedPath });
    continue;
  }

  registeredFileNames.add(path.basename(relativeFile));

  let resolvedChapter = null;
  let fileRecord = null;
  if (exists) {
    try {
      fileRecord = JSON.parse(fs.readFileSync(expectedPath, 'utf8'));
    } catch (err) {
      errors.push(`${BOARD}/${CLASS_SLUG}/${SUBJECT_SLUG}: chapter ${chapterId ?? '(no id)'} file exists but does not parse: ${err.message}`);
      continue;
    }
  }

  if (!fileRecord) {
    unresolved.push({ board: BOARD, classSlug: CLASS_SLUG, subjectSlug: SUBJECT_SLUG, chapterId, chapterSlug, relativeFile, expectedPath, note: 'No readable file record' });
    continue;
  }

  const resolvedId = fileRecord?.id;
  const resolvedSlug = fileRecord?.slug;

  if (String(resolvedId) !== String(chapterId)) {
    idMismatches.push({ board: BOARD, classSlug: CLASS_SLUG, subjectSlug: SUBJECT_SLUG, registryId: chapterId, fileId: resolvedId, slug: chapterSlug });
  }
  if (String(resolvedSlug) !== String(chapterSlug)) {
    idMismatches.push({ board: BOARD, classSlug: CLASS_SLUG, subjectSlug: SUBJECT_SLUG, registrySlug: chapterSlug, fileSlug: resolvedSlug, id: chapterId });
  }

  const status = fileRecord?.reviewStatus;
  const hasContent = Array.isArray(fileRecord.learn) && fileRecord.learn.length > 0;
  const questionCount = countQuestions(fileRecord);
  const placeholder = !hasContent && questionCount === 0;

  if (placeholder) {
    console.log(`PLACEHOLDER ${BOARD}/${CLASS_SLUG}/${SUBJECT_SLUG} :: ${chapterId} (${chapterSlug}) :: file ${relativeFile} :: questions ${questionCount} :: status ${status} :: not published, no content yet`);
  } else {
    console.log(`OK ${BOARD}/${CLASS_SLUG}/${SUBJECT_SLUG} :: ${chapterId} (${chapterSlug}) :: file ${relativeFile} :: questions ${questionCount} :: status ${status} :: content ${hasContent ? 'yes' : 'no learn'}`);
  }
}

const diskFiles = fs.readdirSync(CHAPTERS_DIR).filter((name) => name.endsWith('.json'));
for (const name of diskFiles) {
  if (!registeredFileNames.has(name)) {
    extraFiles.push(path.join(CHAPTERS_DIR, name));
  }
}

let pythonOnDisk = false;
for (const name of diskFiles) {
  const text = fs.readFileSync(path.join(CHAPTERS_DIR, name), 'utf8');
  if (/\bPython\b/i.test(text)) {
    pythonOnDisk = true;
    errors.push(`Chapter file ${name} mentions Python; 2027 Computer Science is Java-only.`);
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

if (extraFiles.length) {
  console.error('\n--- EXTRA CHAPTER FILES NOT IN REGISTRY ---');
  for (const f of extraFiles) console.error(f);
}

const finishedChapters = registered.filter(({ chapter }) => {
  const f = chapter.file;
  if (!f || typeof f !== 'string') return false;
  const p = path.join(SUBJECT_DIR, ...f.split('/'));
  if (!fs.existsSync(p)) return false;
  try {
    const rec = JSON.parse(fs.readFileSync(p, 'utf8'));
    return Array.isArray(rec.learn) && rec.learn.length > 0 && countQuestions(rec) > 0;
  } catch {
    return false;
  }
});

const finishedTotalQuestions = finishedChapters.reduce((sum, { chapter }) => {
  const p = path.join(SUBJECT_DIR, ...chapter.file.split('/'));
  try {
    return sum + countQuestions(JSON.parse(fs.readFileSync(p, 'utf8')));
  } catch {
    return sum;
  }
}, 0);

console.log('\n--- SUMMARY ---');
console.log(`registered chapters: ${registered.length}`);
console.log(`chapter shell files on disk: ${diskFiles.length}`);
console.log(`finished (non-empty, with questions) chapters: ${finishedChapters.length}`);
console.log(`finished-chapter question total: ${finishedTotalQuestions}`);
console.log(`python in registry: ${pythonInRegistry}`);
console.log(`python on disk: ${pythonOnDisk}`);

if (errors.length || unresolved.length || idMismatches.length || extraFiles.length) {
  process.exit(1);
}

console.log('\nISC Class XII Computer Science 2027 registry integrity check passed.');
