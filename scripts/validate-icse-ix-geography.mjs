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

const errors = [];
let assertions = 0;

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
    Array.isArray(chapter.learningOutcomes) && chapter.learningOutcomes.length >= 3,
    `Chapter "${meta.slug}" does not carry at least three learning outcomes.`,
  );

  // Blocks must use the vocabulary the renderer knows.
  for (const lesson of chapter.learn || []) {
    for (const block of lesson.blocks || []) {
      check(BLOCK_TYPES.includes(block.type), `Chapter "${meta.slug}" uses the unknown block type "${block.type}".`);
    }
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
    // Every exercise must be answerable from the data printed with it.
    const carriesData = Boolean(exercise.table) || (Array.isArray(exercise.data) && exercise.data.length > 0);
    check(carriesData || exercise.id === 'exercise-directions', `The map work exercise "${exercise.id}" carries no data of its own.`);
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
