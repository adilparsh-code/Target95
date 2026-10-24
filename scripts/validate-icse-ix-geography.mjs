#!/usr/bin/env node
// Focused validator for the ICSE Class IX Geography chapters.
//
// The general migration validator checks the totals of the whole BoardPrep
// library. This script checks the Geography subject in depth: that every
// published chapter is registered and reachable, that every chapter record
// satisfies the shared schema, that the questions are sound, that the map work
// assessment carries an answer key, and that the navigation agrees with the
// registry. The expected counts below are the reviewed counts of this subject,
// so that a chapter that loses or duplicates a question is caught.

import fs from 'node:fs';
import path from 'node:path';

import {
  BLOCK_TYPES,
  DIFFICULTIES,
  MIN_ANSWER_LENGTH,
  MIN_EXPLANATION_LENGTH,
  QUESTION_TYPES,
  answerMatchesOption,
  countQuestions,
  countQuestionsByType,
  isPlaceholderText,
  validateBlock,
  validateChapterRecord,
} from '../src/lib/boardprepContentSchema.mjs';
import {
  getChapter,
  getPublishedChapters,
  getSubject,
} from '../src/lib/boardprepCurriculum.mjs';
import {
  getChapterBreadcrumbs,
  getChapterNeighbours,
  getSubjectChapterSequence,
  getSubjectStats,
} from '../src/lib/boardprepChapterNav.mjs';

const BOARD = 'icse';
const CLASS_SLUG = 'class-9';
const SUBJECT_SLUG = 'geography';
const ROUTE_PREFIX = `/learn/${BOARD}/${CLASS_SLUG}/${SUBJECT_SLUG}`;

// The reviewed chapter list of this subject, in reading order.
const EXPECTED_CHAPTERS = [
  { slug: 'earth-as-a-planet', id: 'icse-9-geo-earth-planet', questions: 11 },
  { slug: 'geographic-grid', id: 'icse-9-geo-grid', questions: 11 },
  { slug: 'maps-and-their-uses', id: 'icse-9-geo-maps', questions: 11 },
  { slug: 'interior-of-the-earth-and-rocks', id: 'icse-9-geo-interior-rocks', questions: 11 },
  { slug: 'weathering-and-denudation', id: 'icse-9-geo-weathering', questions: 11 },
  { slug: 'earthquakes-and-volcanoes', id: 'icse-9-geo-earthquakes-volcanoes', questions: 14 },
  { slug: 'hydrosphere-oceans', id: 'icse-9-geo-hydrosphere-unit', questions: 11 },
  { slug: 'atmosphere', id: 'icse-9-geo-atmosphere-unit', questions: 12 },
  { slug: 'pollution', id: 'icse-9-geo-pollution-unit', questions: 13 },
  { slug: 'natural-regions-of-the-world', id: 'icse-9-geo-natural-regions-unit', questions: 13 },
  { slug: 'map-reading', id: 'icse-9-geo-map-reading-unit', questions: 13 },
];

// The reviewed question mix of this subject.
const EXPECTED_TYPE_TOTALS = {
  mcq: 48,
  'fill-blank': 22,
  short: 34,
  long: 15,
  analytical: 12,
};

const EXPECTED_TOTAL_QUESTIONS = 131;
const MAP_WORK_SLUG = 'map-reading';

// A chapter must carry real teaching material, not a stub. The floors below are
// set well under the measured depth of every chapter, so that a chapter which
// loses its lessons, its tables or its prose is caught without the check
// becoming a trap for a future rewrite.
const MIN_LESSON_SECTIONS = 4;
const MIN_BLOCKS_PER_LESSON = 2;
const MIN_PARAGRAPH_WORDS = 40;
const MIN_BULLET_ITEMS = 3;
const MIN_TERM_ITEMS = 3;
const MIN_EXAMPLE_ITEMS = 2;
const MIN_TABLES_PER_CHAPTER = 1;
const MIN_FIGURES = 2;
const MIN_KEY_POINTS = 8;
const MIN_VOCABULARY = 6;
const MIN_LEARNING_OUTCOMES = 4;
const MIN_TEACHING_WORDS = 800;

const errors = [];
let assertions = 0;

const wordCount = (value) =>
  String(value ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

// The teaching words of a chapter: its prose, its lists, its tables and its
// revision material, but not the practice questions.
function teachingWords(chapter) {
  let total = 0;
  const add = (value) => {
    total += wordCount(value);
  };
  add(chapter.tagline);
  add(chapter.overview?.intro);
  for (const fact of chapter.overview?.facts || []) {
    add(fact?.label);
    add(fact?.value);
  }
  for (const outcome of chapter.learningOutcomes || []) add(outcome);
  for (const lesson of chapter.learn || []) {
    for (const block of lesson.blocks || []) {
      add(block.text);
      for (const item of block.items || []) {
        add(item?.text);
        add(item?.note);
        add(item?.term);
        add(item?.meaning);
      }
      for (const row of block.rows || []) for (const cell of row) add(cell);
    }
  }
  for (const point of chapter.keyPoints || []) add(point);
  for (const point of chapter.examFocus || []) add(point);
  for (const item of chapter.vocabulary || []) {
    add(item?.word);
    add(item?.meaning);
  }
  for (const figure of chapter.figures || []) {
    add(figure?.caption);
    add(figure?.description);
  }
  return total;
}

function check(condition, message) {
  assertions += 1;
  if (!condition) errors.push(message);
}

const subject = getSubject(BOARD, CLASS_SLUG, SUBJECT_SLUG);
check(Boolean(subject), 'The Geography subject registry could not be read.');

if (!subject) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const subjectDir = path.join(process.cwd(), 'src/app/data/boardprep/content', BOARD, CLASS_SLUG, SUBJECT_SLUG);
const published = getPublishedChapters(BOARD, CLASS_SLUG, SUBJECT_SLUG);
const sequence = getSubjectChapterSequence(BOARD, CLASS_SLUG, SUBJECT_SLUG);

// ---------------------------------------------------------------------------
// The registry
// ---------------------------------------------------------------------------

check(
  published.length === EXPECTED_CHAPTERS.length,
  `Geography publishes ${published.length} chapters, expected ${EXPECTED_CHAPTERS.length}.`,
);
check(
  sequence.length === published.length,
  `The navigation sequence holds ${sequence.length} chapters but the registry publishes ${published.length}.`,
);

const registeredSlugs = published.map((chapter) => chapter.slug);
const registeredIds = published.map((chapter) => chapter.id);

for (const [index, expected] of EXPECTED_CHAPTERS.entries()) {
  const actual = sequence[index];
  check(Boolean(actual), `Chapter ${expected.slug} is missing from the navigation sequence.`);
  if (!actual) continue;
  check(actual.slug === expected.slug, `Chapter ${index} is "${actual.slug}", expected "${expected.slug}".`);
  check(actual.id === expected.id, `Chapter "${actual.slug}" has the id "${actual.id}", expected "${expected.id}".`);
  check(actual.status === 'published', `Chapter "${actual.slug}" is not published.`);
  check(actual.kind === 'geography', `Chapter "${actual.slug}" does not carry the kind "geography".`);
  check(actual.syllabusStatus === 'listed', `Chapter "${actual.slug}" is not marked as listed in the syllabus.`);
  check(
    Array.isArray(actual.examYears) && actual.examYears.includes(2027),
    `Chapter "${actual.slug}" is not linked to the examination year 2027.`,
  );
  check(Boolean(actual.blurb), `Chapter "${actual.slug}" has no blurb.`);
  check(Boolean(actual.file), `Chapter "${actual.slug}" has no file reference.`);
  check(
    typeof actual.file === 'string' && actual.file.startsWith('chapters/') && actual.file.endsWith('.json'),
    `Chapter "${actual.slug}" has a file reference outside the chapters folder.`,
  );
  check(
    typeof actual.file === 'string' && fs.existsSync(path.join(subjectDir, actual.file)),
    `Chapter "${actual.slug}" points at a file that does not exist: ${actual.file}.`,
  );
  check(
    `${ROUTE_PREFIX}/${actual.slug}` === `${ROUTE_PREFIX}/${expected.slug}`,
    `Chapter "${actual.slug}" does not resolve to its expected route.`,
  );
}

check(new Set(registeredSlugs).size === registeredSlugs.length, 'Two published Geography chapters share a slug.');
check(new Set(registeredIds).size === registeredIds.length, 'Two published Geography chapters share an id.');

// No chapter file may sit in the folder without being registered.
const chapterFolder = path.join(subjectDir, 'chapters');
if (fs.existsSync(chapterFolder)) {
  const files = fs.readdirSync(chapterFolder).filter((file) => file.endsWith('.json'));
  for (const file of files) {
    check(
      registeredSlugs.includes(file.replace(/\.json$/, '')),
      `Chapter file ${file} is not registered in the subject registry.`,
    );
  }
  check(
    files.length === registeredSlugs.length,
    `The chapters folder holds ${files.length} files but ${registeredSlugs.length} chapters are published.`,
  );
}

// ---------------------------------------------------------------------------
// The chapter records and their questions
// ---------------------------------------------------------------------------

const questionIds = new Set();
// A prompt or an answer repeated in another chapter is a copy-and-paste
// defect, so both sets span the whole subject rather than one chapter.
const subjectPrompts = new Map();
const subjectAnswers = new Map();
const typeTotals = {};
let totalQuestions = 0;

for (const meta of published) {
  const chapter = getChapter(BOARD, CLASS_SLUG, SUBJECT_SLUG, meta.slug);
  check(Boolean(chapter), `Chapter "${meta.slug}" could not be loaded.`);
  if (!chapter) continue;

  check(chapter.id === meta.id, `Chapter "${meta.slug}" has the id "${chapter.id}" but the registry has "${meta.id}".`);
  check(chapter.title === meta.title, `Chapter "${meta.slug}" has the title "${chapter.title}" but the registry has "${meta.title}".`);
  check(chapter.kind === 'geography', `Chapter "${meta.slug}" does not carry the kind "geography".`);
  check(Boolean(chapter.tagline), `Chapter "${meta.slug}" has no tagline.`);
  check(Boolean(chapter.reviewStatus), `Chapter "${meta.slug}" has no reviewStatus.`);
  check(
    typeof chapter.sourceNote?.boardprep === 'string' && chapter.sourceNote.boardprep.trim().length > 0,
    `Chapter "${meta.slug}" has no boardprep source note.`,
  );
  check(
    typeof chapter.sourceNote?.thirdParty === 'string',
    `Chapter "${meta.slug}" has no thirdParty source note field.`,
  );

  // The shared schema, with the strict answer matching that Geography uses.
  for (const issue of validateChapterRecord(chapter, { strictMcq: true, requireLearningOutcomes: true })) {
    errors.push(`[${meta.slug}] ${issue.message}`);
  }
  assertions += 1;

  // Learning outcomes are required for this subject.
  check(
    Array.isArray(chapter.learningOutcomes) && chapter.learningOutcomes.length >= MIN_LEARNING_OUTCOMES,
    `Chapter "${meta.slug}" does not carry at least ${MIN_LEARNING_OUTCOMES} learning outcomes.`,
  );

  // Blocks must use the vocabulary the renderer knows.
  for (const lesson of chapter.learn || []) {
    for (const block of lesson.blocks || []) {
      check(BLOCK_TYPES.includes(block.type), `Chapter "${meta.slug}" uses the unknown block type "${block.type}".`);
    }
  }

  // A chapter must carry real teaching material.
  const lessons = chapter.learn || [];
  check(
    lessons.length >= MIN_LESSON_SECTIONS,
    `Chapter "${meta.slug}" has only ${lessons.length} lesson sections, expected at least ${MIN_LESSON_SECTIONS}.`,
  );
  const tables = lessons.flatMap((lesson) => lesson.blocks || []).filter((block) => block.type === 'table');
  check(
    tables.length >= MIN_TABLES_PER_CHAPTER,
    `Chapter "${meta.slug}" carries ${tables.length} table(s), expected at least ${MIN_TABLES_PER_CHAPTER}.`,
  );
  const words = teachingWords(chapter);
  check(
    words >= MIN_TEACHING_WORDS,
    `Chapter "${meta.slug}" carries only ${words} teaching words, expected at least ${MIN_TEACHING_WORDS}.`,
  );

  // Every lesson must be a lesson and not a single line of heading, and every
  // block must carry enough material to be worth reading.
  for (const lesson of lessons) {
    const blocks = lesson.blocks || [];
    check(
      blocks.length >= MIN_BLOCKS_PER_LESSON,
      `Chapter "${meta.slug}" lesson "${lesson.id}" has only ${blocks.length} block(s), expected at least ${MIN_BLOCKS_PER_LESSON}.`,
    );
    for (const block of blocks) {
      const where = `Chapter "${meta.slug}" lesson "${lesson.id}"`;
      if (block.type === 'paragraph') {
        check(
          wordCount(block.text) >= MIN_PARAGRAPH_WORDS,
          `${where} has a paragraph of only ${wordCount(block.text)} words, expected at least ${MIN_PARAGRAPH_WORDS}.`,
        );
      } else if (block.type === 'bullets') {
        check(
          (block.items || []).length >= MIN_BULLET_ITEMS,
          `${where} has a bullets block of only ${(block.items || []).length} items, expected at least ${MIN_BULLET_ITEMS}.`,
        );
      } else if (block.type === 'terms') {
        check(
          (block.items || []).length >= MIN_TERM_ITEMS,
          `${where} has a terms block of only ${(block.items || []).length} items, expected at least ${MIN_TERM_ITEMS}.`,
        );
      } else if (block.type === 'examples') {
        check(
          (block.items || []).length >= MIN_EXAMPLE_ITEMS,
          `${where} has an examples block of only ${(block.items || []).length} items, expected at least ${MIN_EXAMPLE_ITEMS}.`,
        );
      }
    }
  }

  // The revision material of a chapter must be there as well.
  check(
    (chapter.keyPoints || []).length >= MIN_KEY_POINTS,
    `Chapter "${meta.slug}" carries ${(chapter.keyPoints || []).length} key points, expected at least ${MIN_KEY_POINTS}.`,
  );
  check(
    (chapter.vocabulary || []).length >= MIN_VOCABULARY,
    `Chapter "${meta.slug}" carries ${(chapter.vocabulary || []).length} vocabulary entries, expected at least ${MIN_VOCABULARY}.`,
  );
  check(
    (chapter.figures || []).length >= MIN_FIGURES,
    `Chapter "${meta.slug}" carries ${(chapter.figures || []).length} figures, expected at least ${MIN_FIGURES}.`,
  );

  // Every figure must be labelled well enough to be drawn from memory.
  for (const figure of chapter.figures || []) {
    check(Boolean(figure?.caption), `Chapter "${meta.slug}" has a figure without a caption.`);
    check(
      Array.isArray(figure?.labels) && figure.labels.length > 0,
      `Chapter "${meta.slug}" has a figure without any labels.`,
    );
  }

  // Questions.
  const questions = chapter.questions || [];
  const expected = EXPECTED_CHAPTERS.find((entry) => entry.slug === meta.slug);
  check(
    countQuestions(chapter) === expected.questions,
    `Chapter "${meta.slug}" holds ${countQuestions(chapter)} questions, expected ${expected.questions}.`,
  );
  totalQuestions += questions.length;

  const prompts = new Set();
  for (const question of questions) {
    check(!questionIds.has(question.id), `Question id "${question.id}" is used more than once.`);
    questionIds.add(question.id);
    check(QUESTION_TYPES.includes(question.type), `Question "${question.id}" has the unsupported type "${question.type}".`);
    check(DIFFICULTIES.includes(question.difficulty), `Question "${question.id}" has the unsupported difficulty "${question.difficulty}".`);
    check(Number.isInteger(question.marks) && question.marks >= 1, `Question "${question.id}" has no positive whole-number mark value.`);
    check(question.origin === 'practice', `Question "${question.id}" is not marked as practice.`);
    check(!prompts.has(question.prompt), `Question "${question.id}" repeats a prompt used elsewhere in the chapter.`);
    prompts.add(question.prompt);
    const promptKey = question.prompt.trim().toLowerCase().replace(/\s+/g, ' ');
    check(
      !subjectPrompts.has(promptKey),
      `Question "${question.id}" repeats a prompt already used in chapter "${subjectPrompts.get(promptKey)}".`,
    );
    subjectPrompts.set(promptKey, meta.slug);
    const answerKey = String(question.answer ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
    check(
      !subjectAnswers.has(answerKey),
      `Question "${question.id}" repeats an answer already used in chapter "${subjectAnswers.get(answerKey)}".`,
    );
    subjectAnswers.set(answerKey, meta.slug);
    check(!isPlaceholderText(question.answer), `Question "${question.id}" has a blank or placeholder answer.`);
    check(
      String(question.answer ?? '').trim().length >= MIN_ANSWER_LENGTH,
      `Question "${question.id}" has an answer that is too short to be meaningful.`,
    );
    check(!isPlaceholderText(question.explanation), `Question "${question.id}" has a blank or placeholder explanation.`);
    check(
      String(question.explanation ?? '').trim().length >= MIN_EXPLANATION_LENGTH,
      `Question "${question.id}" has an explanation that is too short to be meaningful.`,
    );
    if (question.commonMistake !== undefined) {
      check(
        String(question.commonMistake ?? '').trim().length > 0,
        `Question "${question.id}" has an empty common mistake note.`,
      );
    }

    typeTotals[question.type] = (typeTotals[question.type] || 0) + 1;

    if (question.type === 'mcq') {
      check(Array.isArray(question.options) && question.options.length >= 4, `Question "${question.id}" does not offer at least four options.`);
      check(
        Array.isArray(question.options) && new Set(question.options.map((option) => option.trim().toLowerCase())).size === question.options.length,
        `Question "${question.id}" has duplicate options.`,
      );
      check(
        Number.isInteger(question.correctIndex) && question.correctIndex >= 0 && question.correctIndex < (question.options?.length ?? 0),
        `Question "${question.id}" has a correctIndex outside the option list.`,
      );
      const keyed = question.options?.[question.correctIndex];
      check(
        answerMatchesOption(question.answer, keyed, { strict: true }),
        `Question "${question.id}" does not answer the option at correctIndex exactly.`,
      );
      check(
        String(question.answer).trim() === String(keyed).trim(),
        `Question "${question.id}" prints an answer that differs from the keyed option.`,
      );
    } else {
      check(question.options === undefined, `Question "${question.id}" is not an MCQ but carries options.`);
    }
  }

  // The counts printed by the subject page must agree with the chapter files.
  const perType = countQuestionsByType(chapter);
  const perTypeTotal = Object.values(perType).reduce((sum, value) => sum + value, 0);
  check(perTypeTotal === countQuestions(chapter), `Chapter "${meta.slug}" type counts do not add up to its question count.`);
}

// ---------------------------------------------------------------------------
// Totals and the question mix
// ---------------------------------------------------------------------------

check(
  totalQuestions === EXPECTED_TOTAL_QUESTIONS,
  `Geography holds ${totalQuestions} questions, expected ${EXPECTED_TOTAL_QUESTIONS}.`,
);
for (const [type, expected] of Object.entries(EXPECTED_TYPE_TOTALS)) {
  check(
    (typeTotals[type] || 0) === expected,
    `Geography holds ${typeTotals[type] || 0} "${type}" questions, expected ${expected}.`,
  );
}
for (const type of Object.keys(typeTotals)) {
  check(EXPECTED_TYPE_TOTALS[type] !== undefined, `Geography holds questions of the unexpected type "${type}".`);
}

// ---------------------------------------------------------------------------
// The map work assessment
// ---------------------------------------------------------------------------

const mapWork = getChapter(BOARD, CLASS_SLUG, SUBJECT_SLUG, MAP_WORK_SLUG);
check(Boolean(mapWork?.assessment), 'The Map Reading chapter has no assessment section.');
if (mapWork?.assessment) {
  const assessment = mapWork.assessment;
  check(Boolean(assessment.id), 'The map work assessment has no id.');
  check(Boolean(assessment.title), 'The map work assessment has no title.');
  check(
    Array.isArray(assessment.instructions) && assessment.instructions.length >= 3,
    'The map work assessment does not carry at least three instructions.',
  );
  check(
    Array.isArray(assessment.exercises) && assessment.exercises.length >= 6,
    'The map work assessment does not carry at least six exercises.',
  );
  const exerciseIds = new Set();
  let exerciseMarks = 0;
  for (const exercise of assessment.exercises || []) {
    check(!exerciseIds.has(exercise.id), `The map work assessment repeats the exercise id "${exercise.id}".`);
    exerciseIds.add(exercise.id);
    check(Boolean(exercise.prompt), `The map work exercise "${exercise.id}" has no prompt.`);
    check(!isPlaceholderText(exercise.answer), `The map work exercise "${exercise.id}" has a blank or placeholder answer.`);
    check(!isPlaceholderText(exercise.explanation), `The map work exercise "${exercise.id}" has a blank or placeholder explanation.`);
    check(
      String(exercise.answer ?? '').trim().length >= MIN_ANSWER_LENGTH,
      `The map work exercise "${exercise.id}" has an answer that is too short to be meaningful.`,
    );
    check(
      String(exercise.explanation ?? '').trim().length >= MIN_EXPLANATION_LENGTH,
      `The map work exercise "${exercise.id}" has an explanation that is too short to be meaningful.`,
    );
    check(
      Number.isInteger(exercise.marks) && exercise.marks >= 1,
      `The map work exercise "${exercise.id}" has no positive whole-number mark value.`,
    );
    exerciseMarks += exercise.marks || 0;
    // Every exercise must be answerable from the data printed with it. There is
    // no exemption: an exercise that depends on a map or a key that is not
    // shown alongside it cannot be answered from the page.
    const carriesData = Boolean(exercise.table) || (Array.isArray(exercise.data) && exercise.data.length > 0);
    check(carriesData, `The map work exercise "${exercise.id}" carries no data of its own.`);
    // A table that carries the data of an exercise must be a sound table.
    if (exercise.table) {
      for (const issue of validateBlock(exercise.table, MAP_WORK_SLUG, exercise.id)) {
        errors.push(`[${MAP_WORK_SLUG}] ${issue.message}`);
      }
      assertions += 1;
    }
    for (const item of exercise.data || []) {
      check(
        Boolean(item?.label) && Boolean(String(item?.value ?? '').trim()),
        `The map work exercise "${exercise.id}" has an incomplete data row.`,
      );
    }
  }
  check(
    exerciseMarks === assessment.marks,
    `The map work exercises carry ${exerciseMarks} marks but the assessment claims ${assessment.marks}.`,
  );
}

// Only the map work chapter carries an assessment section.
for (const meta of published) {
  if (meta.slug === MAP_WORK_SLUG) continue;
  const chapter = getChapter(BOARD, CLASS_SLUG, SUBJECT_SLUG, meta.slug);
  check(!chapter?.assessment, `Chapter "${meta.slug}" carries an assessment section that does not belong to it.`);
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

const stats = getSubjectStats(BOARD, CLASS_SLUG, SUBJECT_SLUG);
check(stats.chapters === EXPECTED_CHAPTERS.length, `The subject reports ${stats.chapters} chapters, expected ${EXPECTED_CHAPTERS.length}.`);
check(
  stats.questions === EXPECTED_TOTAL_QUESTIONS,
  `The subject reports ${stats.questions} questions, expected ${EXPECTED_TOTAL_QUESTIONS}.`,
);

for (const [index, meta] of published.entries()) {
  const neighbours = getChapterNeighbours(BOARD, CLASS_SLUG, SUBJECT_SLUG, meta.slug);
  check(neighbours.position === index + 1, `Chapter "${meta.slug}" reports the position ${neighbours.position}, expected ${index + 1}.`);
  check(neighbours.total === EXPECTED_CHAPTERS.length, `Chapter "${meta.slug}" reports ${neighbours.total} chapters in the sequence.`);
  check(
    index === 0 ? neighbours.previous === null : neighbours.previous?.slug === published[index - 1].slug,
    `The previous chapter of "${meta.slug}" is wrong.`,
  );
  check(
    index === published.length - 1 ? neighbours.next === null : neighbours.next?.slug === published[index + 1].slug,
    `The next chapter of "${meta.slug}" is wrong.`,
  );

  const trail = getChapterBreadcrumbs(BOARD, CLASS_SLUG, SUBJECT_SLUG, meta.slug);
  check(trail.length === 4, `The breadcrumb trail of "${meta.slug}" holds ${trail.length} crumbs, expected 4.`);
  check(trail[0]?.href === `/learn/${BOARD}`, `The first breadcrumb of "${meta.slug}" does not point at the board.`);
  check(trail[1]?.href === `/learn/${BOARD}/${CLASS_SLUG}`, `The class breadcrumb of "${meta.slug}" is wrong.`);
  check(trail[2]?.href === ROUTE_PREFIX, `The subject breadcrumb of "${meta.slug}" is wrong.`);
  check(trail[3]?.href === `${ROUTE_PREFIX}/${meta.slug}`, `The chapter breadcrumb of "${meta.slug}" is wrong.`);
  check(trail[3]?.label === meta.title, `The last breadcrumb of "${meta.slug}" does not carry the chapter title.`);
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

if (errors.length) {
  console.error(`ICSE Class IX Geography validation failed with ${errors.length} problem(s):`);
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(
  `ICSE Class IX Geography valid: ${EXPECTED_CHAPTERS.length} chapters, ${totalQuestions} questions, ` +
    `${Object.entries(EXPECTED_TYPE_TOTALS).map(([type, count]) => `${count} ${type}`).join(', ')}, ` +
    `${mapWork?.assessment?.exercises?.length || 0} map work exercises, ${assertions} assertions passed.`,
);
