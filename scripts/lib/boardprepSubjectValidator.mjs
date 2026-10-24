// A reusable, configuration-driven validator for one BoardPrep subject.
//
// The ICSE Class IX Geography validator (scripts/validate-icse-ix-geography.mjs)
// proved what a subject-level check must assert. That logic is subject
// independent, so it lives here once and each subject supplies only its own
// reviewed expectations and any extra subject-specific checks.
//
// A validator built on this module must fail loudly and specifically. It
// reports every problem it finds rather than stopping at the first, so one
// run tells the author everything that needs fixing.

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
} from '../../src/lib/boardprepContentSchema.mjs';
import {
  getChapter,
  getPublishedChapters,
  getSubject,
} from '../../src/lib/boardprepCurriculum.mjs';
import {
  getChapterBreadcrumbs,
  getChapterNeighbours,
  getSubjectChapterSequence,
  getSubjectStats,
} from '../../src/lib/boardprepChapterNav.mjs';

// The depth floors a chapter must clear. They are set well under the measured
// depth of the reviewed chapters, so a chapter that loses its lessons, tables
// or prose is caught without the rule becoming a trap for a future rewrite.
export const DEPTH_FLOORS = {
  minLessonSections: 4,
  minBlocksPerLesson: 2,
  minParagraphWords: 40,
  minBulletItems: 3,
  minTermItems: 3,
  minExampleItems: 2,
  minTablesPerChapter: 1,
  minFigures: 2,
  minKeyPoints: 8,
  minExamFocus: 3,
  minVocabulary: 6,
  minLearningOutcomes: 4,
  minTeachingWords: 800,
  minQuestions: 8,
};

const wordCount = (value) =>
  String(value ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

/**
 * The teaching words of a chapter: its prose, its lists, its tables and its
 * revision material, but not the practice questions.
 */
export function teachingWords(chapter) {
  let total = 0;
  const add = (value) => {
    total += wordCount(value);
  };
  add(chapter?.tagline);
  add(chapter?.overview?.intro);
  for (const fact of chapter?.overview?.facts || []) {
    add(fact?.label);
    add(fact?.value);
  }
  for (const outcome of chapter?.learningOutcomes || []) add(outcome);
  for (const lesson of chapter?.learn || []) {
    for (const block of lesson?.blocks || []) {
      add(block?.text);
      for (const item of block?.items || []) {
        add(item?.text);
        add(item?.note);
        add(item?.term);
        add(item?.meaning);
      }
      for (const row of block?.rows || []) for (const cell of row) add(cell);
    }
  }
  for (const point of chapter?.keyPoints || []) add(point);
  for (const point of chapter?.examFocus || []) add(point);
  for (const item of chapter?.vocabulary || []) {
    add(item?.word);
    add(item?.meaning);
  }
  for (const figure of chapter?.figures || []) {
    add(figure?.caption);
    add(figure?.description);
  }
  return total;
}

/**
 * Validate one BoardPrep subject.
 *
 * @param {object} config
 * @param {string} config.board            board slug, e.g. "icse"
 * @param {string} config.classSlug        class slug, e.g. "class-9"
 * @param {string} config.subjectSlug      subject slug, e.g. "biology"
 * @param {string} config.kind             the chapter kind the registry records
 * @param {string} config.label            human name used in messages
 * @param {Array}  config.expectedChapters [{ slug, id, questions }] in reading order
 * @param {object} config.expectedTypeTotals  { mcq: n, short: n, ... }
 * @param {number} config.expectedTotalQuestions
 * @param {object} [config.floors]         overrides for DEPTH_FLOORS
 * @param {Function} [config.extraChecks]  (chapter, meta, ctx) => string[] problems
 * @param {Function} [config.subjectChecks] (ctx) => string[] problems
 */
export function validateSubject(config) {
  const {
    board,
    classSlug,
    subjectSlug,
    kind,
    label,
    expectedChapters,
    expectedTypeTotals,
    expectedTotalQuestions,
    floors: floorOverrides = {},
    extraChecks,
    subjectChecks,
  } = config;

  const floors = { ...DEPTH_FLOORS, ...floorOverrides };
  const errors = [];
  let assertions = 0;

  const check = (condition, message) => {
    assertions += 1;
    if (!condition) errors.push(message);
  };

  const routePrefix = `/learn/${board}/${classSlug}/${subjectSlug}`;
  const subjectDir = path.join(
    process.cwd(),
    'src/app/data/boardprep/content',
    board,
    classSlug,
    subjectSlug,
  );

  const subject = getSubject(board, classSlug, subjectSlug);
  check(Boolean(subject), `The ${label} subject registry could not be read.`);
  if (!subject) {
    return { errors, assertions, totalQuestions: 0, published: [] };
  }

  const published = getPublishedChapters(board, classSlug, subjectSlug);
  const sequence = getSubjectChapterSequence(board, classSlug, subjectSlug);

  // -----------------------------------------------------------------------
  // The registry
  // -----------------------------------------------------------------------

  check(
    published.length === expectedChapters.length,
    `${label} publishes ${published.length} chapters, expected ${expectedChapters.length}.`,
  );
  check(
    sequence.length === published.length,
    `The ${label} navigation sequence holds ${sequence.length} chapters but the registry publishes ${published.length}.`,
  );

  const registeredSlugs = published.map((chapter) => chapter.slug);
  const registeredIds = published.map((chapter) => chapter.id);

  for (const [index, expected] of expectedChapters.entries()) {
    const actual = sequence[index];
    check(Boolean(actual), `Chapter ${expected.slug} is missing from the navigation sequence.`);
    if (!actual) continue;
    check(actual.slug === expected.slug, `Chapter ${index} is "${actual.slug}", expected "${expected.slug}".`);
    check(actual.id === expected.id, `Chapter "${actual.slug}" has the id "${actual.id}", expected "${expected.id}".`);
    check(actual.status === 'published', `Chapter "${actual.slug}" is not published.`);
    check(actual.kind === kind, `Chapter "${actual.slug}" does not carry the kind "${kind}".`);
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
      `${routePrefix}/${actual.slug}` === `${routePrefix}/${expected.slug}`,
      `Chapter "${actual.slug}" does not resolve to its expected route.`,
    );
  }

  check(new Set(registeredSlugs).size === registeredSlugs.length, `Two published ${label} chapters share a slug.`);
  check(new Set(registeredIds).size === registeredIds.length, `Two published ${label} chapters share an id.`);

  // No chapter file may sit in the folder without being registered.
  const chapterFolder = path.join(subjectDir, 'chapters');
  if (fs.existsSync(chapterFolder)) {
    const files = fs.readdirSync(chapterFolder).filter((file) => file.endsWith('.json'));
    for (const file of files) {
      check(
        registeredSlugs.includes(file.replace(/\.json$/, '')),
        `Chapter file ${file} is not registered in the ${label} subject registry.`,
      );
    }
    check(
      files.length === registeredSlugs.length,
      `The ${label} chapters folder holds ${files.length} files but ${registeredSlugs.length} chapters are published.`,
    );
  }

  // -----------------------------------------------------------------------
  // The chapter records and their questions
  // -----------------------------------------------------------------------

  const questionIds = new Set();
  // A prompt or an answer repeated in another chapter is a copy-and-paste
  // defect, so both sets span the whole subject rather than one chapter.
  const subjectPrompts = new Map();
  const subjectAnswers = new Map();
  const typeTotals = {};
  let totalQuestions = 0;

  for (const meta of published) {
    const chapter = getChapter(board, classSlug, subjectSlug, meta.slug);
    check(Boolean(chapter), `Chapter "${meta.slug}" could not be loaded.`);
    if (!chapter) continue;

    check(chapter.id === meta.id, `Chapter "${meta.slug}" has the id "${chapter.id}" but the registry has "${meta.id}".`);
    check(chapter.title === meta.title, `Chapter "${meta.slug}" has the title "${chapter.title}" but the registry has "${meta.title}".`);
    check(chapter.kind === kind, `Chapter "${meta.slug}" does not carry the kind "${kind}".`);
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

    // The shared schema, with the strict answer matching this subject uses.
    for (const issue of validateChapterRecord(chapter, { strictMcq: true, requireLearningOutcomes: true })) {
      errors.push(`[${meta.slug}] ${issue.message}`);
    }
    assertions += 1;

    check(
      Array.isArray(chapter.learningOutcomes) && chapter.learningOutcomes.length >= floors.minLearningOutcomes,
      `Chapter "${meta.slug}" does not carry at least ${floors.minLearningOutcomes} learning outcomes.`,
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
      lessons.length >= floors.minLessonSections,
      `Chapter "${meta.slug}" has only ${lessons.length} lesson sections, expected at least ${floors.minLessonSections}.`,
    );
    const tables = lessons.flatMap((lesson) => lesson.blocks || []).filter((block) => block.type === 'table');
    check(
      tables.length >= floors.minTablesPerChapter,
      `Chapter "${meta.slug}" carries ${tables.length} table(s), expected at least ${floors.minTablesPerChapter}.`,
    );
    const words = teachingWords(chapter);
    check(
      words >= floors.minTeachingWords,
      `Chapter "${meta.slug}" carries only ${words} teaching words, expected at least ${floors.minTeachingWords}.`,
    );

    // Every lesson must be a lesson and not a single line of heading, and every
    // block must carry enough material to be worth reading.
    for (const lesson of lessons) {
      const blocks = lesson.blocks || [];
      check(
        blocks.length >= floors.minBlocksPerLesson,
        `Chapter "${meta.slug}" lesson "${lesson.id}" has only ${blocks.length} block(s), expected at least ${floors.minBlocksPerLesson}.`,
      );
      for (const block of blocks) {
        const where = `Chapter "${meta.slug}" lesson "${lesson.id}"`;
        if (block.type === 'paragraph') {
          check(
            wordCount(block.text) >= floors.minParagraphWords,
            `${where} has a paragraph of only ${wordCount(block.text)} words, expected at least ${floors.minParagraphWords}.`,
          );
        } else if (block.type === 'bullets') {
          check(
            (block.items || []).length >= floors.minBulletItems,
            `${where} has a bullets block of only ${(block.items || []).length} items, expected at least ${floors.minBulletItems}.`,
          );
        } else if (block.type === 'terms') {
          check(
            (block.items || []).length >= floors.minTermItems,
            `${where} has a terms block of only ${(block.items || []).length} items, expected at least ${floors.minTermItems}.`,
          );
        } else if (block.type === 'examples') {
          check(
            (block.items || []).length >= floors.minExampleItems,
            `${where} has an examples block of only ${(block.items || []).length} items, expected at least ${floors.minExampleItems}.`,
          );
        }
      }
    }

    // The revision material of a chapter must be there as well.
    check(
      (chapter.keyPoints || []).length >= floors.minKeyPoints,
      `Chapter "${meta.slug}" carries ${(chapter.keyPoints || []).length} key points, expected at least ${floors.minKeyPoints}.`,
    );
    check(
      (chapter.examFocus || []).length >= floors.minExamFocus,
      `Chapter "${meta.slug}" carries ${(chapter.examFocus || []).length} exam focus notes, expected at least ${floors.minExamFocus}.`,
    );
    check(
      (chapter.vocabulary || []).length >= floors.minVocabulary,
      `Chapter "${meta.slug}" carries ${(chapter.vocabulary || []).length} vocabulary entries, expected at least ${floors.minVocabulary}.`,
    );
    check(
      (chapter.figures || []).length >= floors.minFigures,
      `Chapter "${meta.slug}" carries ${(chapter.figures || []).length} figures, expected at least ${floors.minFigures}.`,
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
    const expected = expectedChapters.find((entry) => entry.slug === meta.slug);
    check(
      countQuestions(chapter) === expected.questions,
      `Chapter "${meta.slug}" holds ${countQuestions(chapter)} questions, expected ${expected.questions}.`,
    );
    check(
      countQuestions(chapter) >= floors.minQuestions,
      `Chapter "${meta.slug}" holds only ${countQuestions(chapter)} questions, expected at least ${floors.minQuestions}.`,
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

    if (extraChecks) {
      for (const problem of extraChecks(chapter, meta, { check, floors }) || []) {
        errors.push(`[${meta.slug}] ${problem}`);
      }
      assertions += 1;
    }
  }

  // -----------------------------------------------------------------------
  // Totals and the question mix
  // -----------------------------------------------------------------------

  check(
    totalQuestions === expectedTotalQuestions,
    `${label} holds ${totalQuestions} questions, expected ${expectedTotalQuestions}.`,
  );
  for (const [type, expected] of Object.entries(expectedTypeTotals)) {
    check(
      (typeTotals[type] || 0) === expected,
      `${label} holds ${typeTotals[type] || 0} "${type}" questions, expected ${expected}.`,
    );
  }
  for (const type of Object.keys(typeTotals)) {
    check(expectedTypeTotals[type] !== undefined, `${label} holds questions of the unexpected type "${type}".`);
  }

  // -----------------------------------------------------------------------
  // Navigation
  // -----------------------------------------------------------------------

  const stats = getSubjectStats(board, classSlug, subjectSlug);
  check(stats.chapters === expectedChapters.length, `The subject reports ${stats.chapters} chapters, expected ${expectedChapters.length}.`);
  check(
    stats.questions === expectedTotalQuestions,
    `The subject reports ${stats.questions} questions, expected ${expectedTotalQuestions}.`,
  );

  for (const [index, meta] of published.entries()) {
    const neighbours = getChapterNeighbours(board, classSlug, subjectSlug, meta.slug);
    check(neighbours.position === index + 1, `Chapter "${meta.slug}" reports the position ${neighbours.position}, expected ${index + 1}.`);
    check(neighbours.total === expectedChapters.length, `Chapter "${meta.slug}" reports ${neighbours.total} chapters in the sequence.`);
    check(
      index === 0 ? neighbours.previous === null : neighbours.previous?.slug === published[index - 1].slug,
      `The previous chapter of "${meta.slug}" is wrong.`,
    );
    check(
      index === published.length - 1 ? neighbours.next === null : neighbours.next?.slug === published[index + 1].slug,
      `The next chapter of "${meta.slug}" is wrong.`,
    );

    const trail = getChapterBreadcrumbs(board, classSlug, subjectSlug, meta.slug);
    check(trail.length === 4, `The breadcrumb trail of "${meta.slug}" holds ${trail.length} crumbs, expected 4.`);
    check(trail[0]?.href === `/learn/${board}`, `The first breadcrumb of "${meta.slug}" does not point at the board.`);
    check(trail[1]?.href === `/learn/${board}/${classSlug}`, `The class breadcrumb of "${meta.slug}" is wrong.`);
    check(trail[2]?.href === routePrefix, `The subject breadcrumb of "${meta.slug}" is wrong.`);
    check(trail[3]?.href === `${routePrefix}/${meta.slug}`, `The chapter breadcrumb of "${meta.slug}" is wrong.`);
    check(trail[3]?.label === meta.title, `The last breadcrumb of "${meta.slug}" does not carry the chapter title.`);
  }

  if (subjectChecks) {
    for (const problem of subjectChecks({ check, errors, published, typeTotals, totalQuestions, floors }) || []) {
      errors.push(problem);
    }
    assertions += 1;
  }

  return { errors, assertions, totalQuestions, published, typeTotals };
}

/**
 * Print a validator outcome and return the process exit code.
 */
export function reportSubject(result, label, detail) {
  if (result.errors.length) {
    console.error(`${label} validation failed with ${result.errors.length} problem(s):`);
    console.error(result.errors.join('\n'));
    return 1;
  }
  console.log(`${label} valid: ${result.published.length} chapters, ${result.totalQuestions} questions, ${detail}, ${result.assertions} assertions passed.`);
  return 0;
}
