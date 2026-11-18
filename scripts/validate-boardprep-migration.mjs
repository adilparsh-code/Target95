import fs from 'node:fs';
import path from 'node:path';
import {
  getBoards,
  getSubjects,
  getAllChapterMetadata,
  getChapterRecord,
  getBoardPrepCounts,
} from '../src/lib/boardprepCurriculum.mjs';
import { validateChapterRecord } from '../src/lib/boardprepContentSchema.mjs';

const expected = { boards: 3, classes: 6, subjects: 75, chapters: 94, questions: 1380 };
const counts = getBoardPrepCounts();
const errors = [];
for (const [key, value] of Object.entries(expected)) if (counts[key] !== value) errors.push(`${key}: expected ${value}, found ${counts[key]}`);

const CONTENT_ROOT = path.join(process.cwd(), 'src/app/data/boardprep/content');
const METADATA_FILES = new Set(['board.json', 'class.json', 'subject.json']);
// Stems shorter than this are blanks or bare formulae that may legitimately repeat.
const MIN_PROMPT_KEY = 12;
// Leading articles are dropped so "The SI unit…" and "SI unit…" count as one prompt.
// \p{L} keeps non-Latin prompts distinct: an ASCII-only filter flattened every
// Devanagari prompt to an empty string, so Hindi duplicates were never checked.
const promptKey = (prompt) => String(prompt ?? '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim().replace(/^(the|a|an) /, '');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const chapterFiles = walk(CONTENT_ROOT).filter((file) => file.endsWith('.json') && !METADATA_FILES.has(path.basename(file)));
const referencedFiles = new Set();
const questionIds = new Map();
const promptMaps = new Map();
const summaries = { published: 0, planned: 0 };

// Every file-backed chapter goes through the shared schema, whatever its status.
// Planned banks used to escape this check because the read model filtered them out.
function checkChapter(chapter, where, promptScope) {
  for (const issue of validateChapterRecord(chapter)) errors.push(`${where}: ${issue.message}`);
  const seenPrompts = promptMaps.get(promptScope) ?? new Map();
  promptMaps.set(promptScope, seenPrompts);
  for (const question of chapter.questions || []) {
    if (!question.id) errors.push(`Missing question ID in ${where}`);
    else if (questionIds.has(question.id)) errors.push(`Duplicate question ID ${question.id} (${questionIds.get(question.id)} and ${where})`);
    else questionIds.set(question.id, where);
    if (!question.answer) errors.push(`Missing answer: ${question.id} (${where})`);
    if (question.year !== undefined && (!Number.isInteger(question.year) || question.year < 1900 || question.year > 2100)) errors.push(`Invalid year: ${question.id} (${where})`);
    const key = promptKey(question.prompt);
    if (key.length >= MIN_PROMPT_KEY) {
      if (seenPrompts.has(key)) errors.push(`Duplicate prompt in ${promptScope}: ${seenPrompts.get(key)} and ${question.id}`);
      else seenPrompts.set(key, question.id);
    }
  }
}

for (const board of getBoards()) for (const classInfo of board.classes || []) for (const subject of getSubjects(board.slug, classInfo.slug)) {
  const subjectKey = `${board.slug}/${classInfo.slug}/${subject.slug}`;
  for (const meta of getAllChapterMetadata(board.slug, classInfo.slug, subject.slug)) {
    // Registry entries without a file are served from the separate chapter-content
    // store, not from BoardPrep JSON, so there is nothing to validate here.
    if (!meta.file) continue;
    referencedFiles.add(path.resolve(CONTENT_ROOT, board.slug, classInfo.slug, subject.slug, ...meta.file.split('/')));
    const chapter = getChapterRecord(board.slug, classInfo.slug, subject.slug, meta.slug);
    if (!chapter) { errors.push(`Missing chapter file for ${subjectKey}/${meta.slug} (${meta.file})`); continue; }
    if (chapter.id !== meta.id) errors.push(`Chapter id mismatch for ${subjectKey}/${meta.slug}: registry ${meta.id}, file ${chapter.id}`);
    summaries[meta.status === 'published' ? 'published' : 'planned'] += 1;
    checkChapter(chapter, `${subjectKey}/${meta.slug}`, subjectKey);
    if (['mathematics', 'physics'].includes(subject.slug)) {
      for (const question of chapter.questions || []) if (question.origin !== 'practice') errors.push(`Non-practice origin for ${question.id} (${subjectKey}/${meta.slug})`);
    }
  }
}

// Chapter files that no registry points at still ship in the repository, so they are
// validated too instead of silently escaping every check.
const unregistered = chapterFiles.filter((file) => !referencedFiles.has(path.resolve(file)));
for (const file of unregistered) {
  const where = `unregistered ${path.relative(CONTENT_ROOT, file)}`;
  checkChapter(JSON.parse(fs.readFileSync(file, 'utf8')), where, where);
}

if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`BoardPrep migration valid: ${JSON.stringify(counts)}`);
console.log(`Validated ${summaries.published} published + ${summaries.planned} planned file-backed chapters and ${unregistered.length} unregistered chapter files.`);
