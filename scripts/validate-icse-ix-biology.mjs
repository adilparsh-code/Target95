// Focused validator for ICSE Class IX Biology.
//
// The registry, the chapter files, the questions, the depth floors and the
// navigation are all checked by the shared subject validator in
// scripts/lib/boardprepSubjectValidator.mjs. This file supplies only the
// expectations that belong to this subject: its chapters in reading order, its
// question totals, and the checks that are genuinely about biology content
// rather than about the schema in general.

import { DEPTH_FLOORS, reportSubject, validateSubject } from './lib/boardprepSubjectValidator.mjs';

const CHAPTERS = [
  { slug: 'the-cell', id: 'icse-9-bio-cell', questions: 11 },
  { slug: 'tissues', id: 'icse-9-bio-tissues', questions: 11 },
  { slug: 'flower', id: 'icse-9-bio-flower', questions: 11 },
  { slug: 'pollination-and-fertilisation', id: 'icse-9-bio-pollination-fertilisation', questions: 11 },
  { slug: 'seeds-and-germination', id: 'icse-9-bio-seeds-germination', questions: 11 },
  { slug: 'respiration-in-plants', id: 'icse-9-bio-respiration-plants', questions: 11 },
  { slug: 'absorption-by-roots', id: 'icse-9-bio-absorption-roots', questions: 11 },
  { slug: 'transpiration', id: 'icse-9-bio-transpiration', questions: 11 },
  { slug: 'diversity-in-animal-kingdom', id: 'icse-9-bio-animal-kingdom', questions: 11 },
  { slug: 'economic-importance-of-bacteria-and-fungi', id: 'icse-9-bio-bacteria-fungi', questions: 11 },
  { slug: 'nutrition', id: 'icse-9-bio-nutrition', questions: 11 },
];

const TYPE_TOTALS = {
  mcq: 44,
  fill: 22,
  'fill-blank': 22,
  short: 22,
  long: 11,
  analytical: 22,
};

// Only the types this subject actually uses are declared, so an unexpected
// type still fails the shared check for an unknown type.
delete TYPE_TOTALS.fill;

const TOTAL_QUESTIONS = CHAPTERS.reduce((sum, chapter) => sum + chapter.questions, 0);

/**
 * Checks that are about biology content rather than about the schema.
 */
function extraChecks(chapter, meta, { check }) {
  const problems = [];

  // Provenance: every chapter must say which examination year its baseline is
  // for, so a future reader can tell what the material was written against.
  check(
    /2027/.test(chapter?.sourceNote?.boardprep || ''),
    `Chapter "${meta.slug}" does not record the examination year 2027 in its source note.`,
  );

  // This subject teaches through worked illustrations: a biology chapter with
  // no examples block is a description rather than a lesson.
  const examples = (chapter.learn || [])
    .flatMap((lesson) => lesson.blocks || [])
    .filter((block) => block.type === 'examples');
  check(
    examples.length >= 1,
    `Chapter "${meta.slug}" carries no examples block, so it gives no worked illustration.`,
  );

  // Every figure must be specific enough to be drawn from its description, and
  // a two-label figure is not. Biology figures are tested on their labels.
  for (const figure of chapter.figures || []) {
    check(
      (figure?.labels || []).length >= 3,
      `Figure "${figure?.caption}" of chapter "${meta.slug}" has only ${(figure?.labels || []).length} label(s), expected at least 3.`,
    );
  }

  // Question ids in this subject are prefixed bio- so they cannot collide with
  // another subject's ids in a combined list.
  for (const question of chapter.questions || []) {
    check(
      question.id.startsWith('bio-'),
      `Question id "${question.id}" does not use the biology prefix "bio-".`,
    );
  }

  return problems;
}

/**
 * Subject-level checks: the registry as a whole must record the scope this
 * content was written against.
 */
function subjectChecks({ check, typeTotals, totalQuestions }) {
  const problems = [];

  // The mix must not drift towards one type, because a subject of multiple
  // choice alone does not exercise written answers.
  check(
    typeTotals.long >= 1,
    `Biology holds ${typeTotals.long || 0} long-answer questions, expected at least 1.`,
  );
  check(
    typeTotals.analytical >= 1,
    `Biology holds ${typeTotals.analytical || 0} analytical questions, expected at least 1.`,
  );
  check(
    totalQuestions === TOTAL_QUESTIONS,
    `Biology holds ${totalQuestions} questions, expected ${TOTAL_QUESTIONS}.`,
  );

  return problems;
}

const result = validateSubject({
  board: 'icse',
  classSlug: 'class-9',
  subjectSlug: 'biology',
  kind: 'biology',
  label: 'ICSE Class IX Biology',
  expectedChapters: CHAPTERS,
  expectedTypeTotals: TYPE_TOTALS,
  expectedTotalQuestions: TOTAL_QUESTIONS,
  floors: DEPTH_FLOORS,
  extraChecks,
  subjectChecks,
});

process.exit(
  reportSubject(
    result,
    'ICSE Class IX Biology',
    `${CHAPTERS.length} registered chapters in reading order`,
  ),
);
