// Focused validator for CBSE Class XI Chemistry.
//
// The registry, the chapter files, the questions, the depth floors and the
// navigation are all checked by the shared subject validator in
// scripts/lib/boardprepSubjectValidator.mjs. This file supplies only the
// expectations that belong to this subject: its twelve registered chapters in
// curriculum order (the nine theory units, the two formative topics and the
// practical unit of the official 2026-27 curriculum for subject code 043),
// its question totals, and the checks that are genuinely about chemistry
// content rather than about the schema in general.

import { DEPTH_FLOORS, reportSubject, validateSubject } from './lib/boardprepSubjectValidator.mjs';

const CHAPTERS = [
  { slug: 'some-basic-concepts-of-chemistry', id: 'cbse-11-chem-basic-concepts', questions: 10 },
  { slug: 'structure-of-atom', id: 'cbse-11-chem-atom', questions: 10 },
  { slug: 'classification-and-periodicity', id: 'cbse-11-chem-periodicity', questions: 10 },
  { slug: 'chemical-bonding-and-molecular-structure', id: 'cbse-11-chem-bonding', questions: 10 },
  { slug: 'chemical-thermodynamics', id: 'cbse-11-chem-thermo', questions: 10 },
  { slug: 'equilibrium', id: 'cbse-11-chem-equilibrium', questions: 10 },
  { slug: 'redox-reactions', id: 'cbse-11-chem-redox', questions: 10 },
  { slug: 'organic-chemistry-basic-principles-and-techniques', id: 'cbse-11-chem-organic-basics', questions: 10 },
  { slug: 'hydrocarbons', id: 'cbse-11-chem-hydrocarbons', questions: 10 },
  { slug: 's-and-p-block-elements', id: 'cbse-11-chem-sp-block', questions: 10 },
  { slug: 'the-gaseous-state', id: 'cbse-11-chem-gaseous-state', questions: 10 },
  { slug: 'practical-work', id: 'cbse-11-chem-practical-work', questions: 10 },
];

const TYPE_TOTALS = {
  mcq: 48,
  'fill-blank': 24,
  short: 24,
  long: 12,
  analytical: 12,
};

const TOTAL_QUESTIONS = CHAPTERS.reduce((sum, chapter) => sum + chapter.questions, 0);

/**
 * Checks that are about chemistry content rather than about the schema.
 */
function extraChecks(chapter, meta, { check }) {
  const problems = [];

  // Provenance: every chapter must record the applicable examination year, so
  // a future reader can tell what the material was written against, and the
  // formative topics must label themselves as formative so that a reader never
  // mistakes them for summatively examined material.
  const note = chapter?.sourceNote?.boardprep || '';
  if (meta.slug === 's-and-p-block-elements' || meta.slug === 'the-gaseous-state') {
    check(
      /formative/.test(note),
      `Formative topic "${meta.slug}" does not label itself as formative in its source note (the official 2026-27 document marks it formative only).`,
    );
  }
  check(
    /2026-27|2027/.test(note),
    `Chapter "${meta.slug}" does not record the applicable examination year (2026-27 / 2027) in its source note.`,
  );

  // Theory chapters teach through worked calculations: a chapter with no
  // examples block is a description rather than a lesson.
  const examples = (chapter.learn || [])
    .flatMap((lesson) => lesson.blocks || [])
    .filter((block) => block.type === 'examples');
  check(
    examples.length >= 1,
    `Chapter "${meta.slug}" carries no examples block, so it gives no worked illustration.`,
  );

  // Every figure must be specific enough to be drawn from its description, and
  // a two-label figure is not. Chemistry figures are tested on their labels.
  for (const figure of chapter.figures || []) {
    check(
      (figure?.labels || []).length >= 3,
      `Figure "${figure?.caption}" of chapter "${meta.slug}" has only ${(figure?.labels || []).length} label(s), expected at least 3.`,
    );
  }

  // Question ids in this subject are prefixed cbse11-chem- so they cannot
  // collide with another subject's ids in a combined list.
  for (const question of chapter.questions || []) {
    check(
      question.id.startsWith('cbse11-chem-'),
      `Question id "${question.id}" does not use the CBSE Class XI Chemistry prefix "cbse11-chem-".`,
    );
  }

  // Worked chemistry must be checked numerically: every example needs a stated
  // result, not just a problem statement.
  for (const block of examples) {
    for (const item of block.items || []) {
      check(
        String(item?.note || '').trim().length >= 10,
        `An example in chapter "${meta.slug}" has no worked result: "${String(item?.text || '').slice(0, 60)}".`,
      );
    }
  }

  return problems;
}

/**
 * Subject-level checks: the registry as a whole must record the scope this
 * content was written against.
 */
function subjectChecks({ check, typeTotals, totalQuestions, published }) {
  const problems = [];

  // The mix must not drift towards one type: a subject of only multiple choice
  // does not exercise written answers. The practical chapter also carries written
  // questions (valumetric arithmetic, procedure, observation), so at least one
  // long answer is expected across the twelve chapters.
  check(
    typeTotals.long >= 1,
    `CBSE Class XI Chemistry holds ${typeTotals.long || 0} long-answer questions, expected at least 1.`,
  );
  check(
    typeTotals.analytical >= 1,
    `CBSE Class XI Chemistry holds ${typeTotals.analytical || 0} analytical questions, expected at least 1.`,
  );
  check(
    totalQuestions === TOTAL_QUESTIONS,
    `CBSE Class XI Chemistry holds ${totalQuestions} questions, expected ${TOTAL_QUESTIONS}.`,
  );

  // Every published chapter must belong to the official 2026-27 chapter list,
  // including the practical and the two formative chapters.
  check(
    published.length === CHAPTERS.length,
    `CBSE Class XI Chemistry has ${published.length} published chapters, expected ${CHAPTERS.length}.`,
  );
  for (const pub of published) {
    check(
      CHAPTERS.some((c) => c.slug === pub.slug),
      `Unregistered published chapter "${pub.slug}" in the registry organisation used by the validator.`,
    );
  }
}

const result = validateSubject({
  board: 'cbse',
  classSlug: 'class-11',
  subjectSlug: 'chemistry',
  kind: 'chemistry',
  label: 'CBSE Class XI Chemistry',
  examYear: 2027,
  expectedChapters: CHAPTERS,
  expectedTypeTotals: TYPE_TOTALS,
  expectedTotalQuestions: TOTAL_QUESTIONS,
  extraChecks,
  subjectChecks,
  floors: CHAPTERS.reduce(
    (acc, c) => {
      if (c.slug === 's-and-p-block-elements' || c.slug === 'the-gaseous-state') {
        acc[c.id] = { minTeachingWords: 0 };
      }
      return acc;
    },
    {},
  ),
});

process.exit(
  reportSubject(
    result,
    'CBSE Class XI Chemistry',
    `${CHAPTERS.length} registered chapters in reading order`,
  ),
);
