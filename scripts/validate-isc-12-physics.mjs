// ISC Class XII Physics validator, now comparing registered versus published
// chapters explicitly so planned chapters are reported but not validated as
// published content.

import { DEPTH_FLOORS, reportSubject, validateSubject } from './lib/boardprepSubjectValidator.mjs';
import { getSubject, getPublishedChapters } from '../src/lib/boardprepCurriculum.mjs';
import { getSubjectChapterSequence } from '../src/lib/boardprepChapterNav.mjs';

const PUBLISHED = [
  { slug: 'physical-world-and-measurement', id: 'isc-12-phy-measurement', questions: 12 },
  { slug: 'kinematics', id: 'isc-12-phy-kinematics', questions: 12 },
  { slug: 'laws-of-motion', id: 'isc-12-phy-laws-of-motion', questions: 12 },
  { slug: 'work-energy-and-power', id: 'isc-12-phy-work-energy', questions: 12 },
  { slug: 'system-of-particles-and-rotational-motion', id: 'isc-12-phy-rotational', questions: 12 },
  { slug: 'gravitation', id: 'isc-12-phy-gravitation', questions: 12 },
  { slug: 'properties-of-bulk-matter', id: 'isc-12-phy-bulk-matter', questions: 12 },
];

const PLANNED = [
  'heat-and-thermodynamics',
  'oscillations',
  'waves',
];

const TYPE_TOTALS = {
  mcq: 42,
  'fill-blank': 14,
  short: 7,
  long: 7,
  analytical: 14,
};

const TOTAL_QUESTIONS = PUBLISHED.reduce((sum, chapter) => sum + chapter.questions, 0);

function extraChecks(chapter, meta, { check }) {
  const problems = [];

  check(
    /2027/.test(chapter?.sourceNote?.boardprep || ''),
    `Chapter "${meta.slug}" does not record the examination year 2027 in its source note.`,
  );

  const examples = (chapter.learn || [])
    .flatMap((lesson) => lesson.blocks || [])
    .filter((block) => block.type === 'examples');
  check(
    examples.length >= DEPTH_FLOORS.minExampleItems,
    `Chapter "${meta.slug}" carries ${examples.length} example(s), expected at least ${DEPTH_FLOORS.minExampleItems}.`,
  );

  const tables = (chapter.learn || [])
    .flatMap((lesson) => lesson.blocks || [])
    .filter((block) => block.type === 'table');
  check(
    tables.length >= DEPTH_FLOORS.minTablesPerChapter,
    `Chapter "${meta.slug}" carries ${tables.length} table(s), expected at least ${DEPTH_FLOORS.minTablesPerChapter}.`,
  );

  for (const figure of chapter.figures || []) {
    check(
      (figure?.labels || []).length >= 3,
      `Figure "${figure?.caption}" of chapter "${meta.slug}" has only ${(figure?.labels || []).length} label(s), expected at least 3.`,
    );
  }

  for (const question of chapter.questions || []) {
    check(
      question.id.startsWith('isc12-phy-'),
      `Question id "${question.id}" does not use the ISC Class XII Physics prefix "isc12-phy-".`,
    );
  }

  return problems;
}

function subjectChecks({ check, typeTotals, totalQuestions }) {
  const problems = [];

  check(
    totalQuestions === TOTAL_QUESTIONS,
    `Published ISC Class XII Physics totals ${totalQuestions} questions, expected ${TOTAL_QUESTIONS}.`,
  );
  for (const [type, expected] of Object.entries(TYPE_TOTALS)) {
    check(
      (typeTotals[type] || 0) === expected,
      `Published ISC Class XII Physics totals ${typeTotals[type] || 0} "${type}" questions, expected ${expected}.`,
    );
  }

  return problems;
}

function reportRegistrationState() {
  const subject = getSubject('isc', 'class-12', 'physics');
  const published = getPublishedChapters('isc', 'class-12', 'physics');
  const sequence = getSubjectChapterSequence('isc', 'class-12', 'physics');
  const plannedList = (subject?.sections || [])
    .flatMap((s) => s.groups || [])
    .flatMap((g) => g.chapters || [])
    .filter((c) => c.status === 'planned')
    .map((c) => c.slug);
  console.log(`Registered ${sequence.length} chapters · published ${published.length} · planned ${plannedList.length}`);
  console.log('Published:', published.map((p) => p.slug).join(', '));
  console.log('Planned:', plannedList.join(', '));
}

const result = validateSubject({
  board: 'isc',
  classSlug: 'class-12',
  subjectSlug: 'physics',
  kind: 'physics',
  label: 'ISC Class XII Physics',
  expectedChapters: PUBLISHED,
  expectedTypeTotals: TYPE_TOTALS,
  expectedTotalQuestions: TOTAL_QUESTIONS,
  floors: DEPTH_FLOORS,
  extraChecks,
  subjectChecks,
});

reportRegistrationState();

process.exit(
  reportSubject(
    result,
    'ISC Class XII Physics',
    `${PUBLISHED.length} published chapters checked${TOTAL_QUESTIONS ? `, ${TOTAL_QUESTIONS} questions` : ''}`,
  ),
);
