// Focused validator for ICSE Class X Physics.
//
// The registry, the chapter files, the questions, the depth floors and the
// navigation are all checked by the shared subject validator in
// scripts/lib/boardprepSubjectValidator.mjs. This file supplies only the
// expectations that belong to this subject: its chapters in reading order, its
// question totals, and the checks that are genuinely about physics content
// rather than about the schema in general.

import { DEPTH_FLOORS, reportSubject, validateSubject } from './lib/boardprepSubjectValidator.mjs';

const CHAPTERS = [
  { slug: 'force', id: 'icse-10-phy-force', questions: 11 },
  { slug: 'work-power-energy', id: 'icse-10-phy-work-energy', questions: 11 },
  { slug: 'machines', id: 'icse-10-phy-machines', questions: 11 },
  { slug: 'refraction-of-light', id: 'icse-10-phy-refraction-plane', questions: 11 },
  { slug: 'refraction-through-a-lens', id: 'icse-10-phy-refraction-lens', questions: 11 },
  { slug: 'spectrum', id: 'icse-10-phy-spectrum', questions: 11 },
  { slug: 'sound', id: 'icse-10-phy-sound', questions: 11 },
  { slug: 'electricity-and-electromagnetism', id: 'icse-10-phy-electricity', questions: 11 },
];

const TYPE_TOTALS = {
  mcq: 32,
  'fill-blank': 16,
  short: 16,
  long: 8,
  analytical: 16,
};

const TOTAL_QUESTIONS = CHAPTERS.reduce((sum, chapter) => sum + chapter.questions, 0);

/**
 * Checks that are about physics content rather than about the schema.
 */
function extraChecks(chapter, meta, { check }) {
  const problems = [];

  // Provenance: every chapter must record the examination year its baseline
  // covers, so a future reader can tell what the material was written against.
  check(
    /2027/.test(chapter?.sourceNote?.boardprep || ''),
    `Chapter "${meta.slug}" does not record the examination year 2027 in its source note.`,
  );

  // A physics chapter earns its place by working an example: a chapter with no
  // examples block only describes the topic and never applies it.
  const examples = (chapter.learn || [])
    .flatMap((lesson) => lesson.blocks || [])
    .filter((block) => block.type === 'examples');
  check(
    examples.length >= 1,
    `Chapter "${meta.slug}" carries no examples block, so it applies nothing it teaches.`,
  );

  // Physics figures carry values and directions, so a figure with fewer than
  // three labels is not informative enough to be worth drawing.
  for (const figure of chapter.figures || []) {
    check(
      (figure?.labels || []).length >= 3,
      `Figure "${figure?.caption}" of chapter "${meta.slug}" has only ${(figure?.labels || []).length} label(s), expected at least 3.`,
    );
  }

  // Question ids in this subject carry the phy- prefix so that they cannot
  // collide with another subject's ids in a combined list.
  for (const question of chapter.questions || []) {
    check(
      question.id.startsWith('phy-'),
      `Question id "${question.id}" does not use the physics prefix "phy-".`,
    );
  }

  return problems;
}

/**
 * Subject-level checks on the mix of the subject as a whole.
 */
function subjectChecks({ check, typeTotals, totalQuestions }) {
  const problems = [];

  check(
    typeTotals.long >= 1,
    `Physics holds ${typeTotals.long || 0} long-answer questions, expected at least 1.`,
  );
  check(
    typeTotals.analytical >= 1,
    `Physics holds ${typeTotals.analytical || 0} analytical questions, expected at least 1.`,
  );
  check(
    totalQuestions === TOTAL_QUESTIONS,
    `Physics holds ${totalQuestions} questions, expected ${TOTAL_QUESTIONS}.`,
  );

  return problems;
}

const result = validateSubject({
  board: 'icse',
  classSlug: 'class-10',
  subjectSlug: 'physics',
  kind: 'physics',
  label: 'ICSE Class X Physics',
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
    'ICSE Class X Physics',
    `${CHAPTERS.length} registered chapters in reading order`,
  ),
);
