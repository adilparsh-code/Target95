import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import {
  answerMatchesOption,
  countQuestions,
  countQuestionsByType,
  isPlaceholderText,
  validateChapterRecord,
} from '../src/lib/boardprepContentSchema.mjs';
import { getChapter, getPublishedChapters, getSubject } from '../src/lib/boardprepCurriculum.mjs';
import {
  getChapterBreadcrumbs,
  getChapterNeighbours,
  getSubjectChapterSequence,
  getSubjectStats,
} from '../src/lib/boardprepChapterNav.mjs';

const BOARD = 'icse';
const CLASS_SLUG = 'class-9';
const SUBJECT_SLUG = 'biology';
const KIND = 'biology';
const ROUTE_PREFIX = `/learn/${BOARD}/${CLASS_SLUG}/${SUBJECT_SLUG}`;

const EXPECTED_CHAPTER_SLUGS = [
  'the-cell',
  'tissues',
  'flower',
  'pollination-and-fertilisation',
  'seeds-and-germination',
  'respiration-in-plants',
  'absorption-by-roots',
  'transpiration',
  'diversity-in-animal-kingdom',
  'economic-importance-of-bacteria-and-fungi',
  'nutrition',
];

// Every chapter carries eleven questions in the same reviewed mix: four mcq,
// two fill-blank, two short, one long and two analytical.
const CHAPTER_QUESTION_COUNT = 11;
const EXPECTED_MIX = { mcq: 44, 'fill-blank': 22, short: 22, long: 11, analytical: 22 };

// The published counts of the subjects that were already complete before this
// subject was written. They are asserted here so that work on Biology cannot
// silently remove or alter them.
const PRESERVED_SUBJECTS = [
  { classSlug: 'class-9', subjectSlug: 'geography', chapters: 11, questions: 131 },
  { classSlug: 'class-9', subjectSlug: 'physics', chapters: 9, questions: 234 },
  { classSlug: 'class-9', subjectSlug: 'mathematics', chapters: 14, questions: 372 },
  { classSlug: 'class-9', subjectSlug: 'chemistry', chapters: 6, questions: 84 },
  { classSlug: 'class-9', subjectSlug: 'history-civics', chapters: 14, questions: 168 },
  { classSlug: 'class-9', subjectSlug: 'english', chapters: 21, questions: 233 },
  { classSlug: 'class-10', subjectSlug: 'biology', chapters: 14, questions: 145 },
];

const published = getPublishedChapters(BOARD, CLASS_SLUG, SUBJECT_SLUG);

const loadChapter = (slug) => getChapter(BOARD, CLASS_SLUG, SUBJECT_SLUG, slug);

test('Biology publishes its eleven chapters in syllabus order', () => {
  assert.equal(published.length, 11);
  assert.deepEqual(
    published.map((chapter) => chapter.slug),
    EXPECTED_CHAPTER_SLUGS,
  );
  assert.ok(
    published.every((chapter) => chapter.status === 'published' && chapter.file),
    'every published Biology chapter must carry a status and a file reference',
  );
  assert.ok(
    published.every((chapter) => chapter.kind === KIND && chapter.syllabusStatus === 'listed'),
    'every Biology chapter must be of kind biology and listed in the syllabus',
  );
});

test('every Biology chapter is registered against a file that exists on disk', () => {
  const subjectDir = path.join(
    process.cwd(),
    'src/app/data/boardprep/content',
    BOARD,
    CLASS_SLUG,
    SUBJECT_SLUG,
  );
  for (const meta of published) {
    assert.ok(meta.file, `${meta.slug} must reference a chapter file`);
    assert.ok(
      fs.existsSync(path.join(subjectDir, meta.file)),
      `${meta.slug} references a file that does not exist: ${meta.file}`,
    );
  }
  // No chapter file may sit in the folder without being registered.
  const files = fs
    .readdirSync(path.join(subjectDir, 'chapters'))
    .filter((file) => file.endsWith('.json'));
  assert.equal(files.length, published.length);
  for (const file of files) {
    assert.ok(
      published.some((chapter) => chapter.slug === file.replace(/\.json$/, '')),
      `chapter file ${file} is not registered in the Biology subject registry`,
    );
  }
});

test('the Biology subject registry and chapter files agree', () => {
  const subject = getSubject(BOARD, CLASS_SLUG, SUBJECT_SLUG);
  assert.ok(subject, 'the Biology subject must be readable');
  for (const meta of published) {
    const chapter = loadChapter(meta.slug);
    assert.equal(chapter.id, meta.id, `${meta.slug} id must match the registry`);
    assert.equal(chapter.title, meta.title, `${meta.slug} title must match the registry`);
    assert.equal(chapter.kind, KIND);
  }
});

test('every Biology chapter satisfies the shared schema', () => {
  for (const meta of published) {
    const chapter = loadChapter(meta.slug);
    assert.ok(chapter, `chapter ${meta.slug} must load`);
    const issues = validateChapterRecord(chapter, {
      strictMcq: true,
      requireLearningOutcomes: true,
    });
    assert.deepEqual(
      issues.map((issue) => issue.message),
      [],
      `chapter ${meta.slug} must satisfy the shared schema`,
    );
    assert.equal(chapter.kind, KIND);
    assert.ok(chapter.learningOutcomes.length >= 4);
    assert.equal(typeof chapter.sourceNote.thirdParty, 'string');
    assert.ok(chapter.sourceNote.boardprep.includes('2027'));
  }
});

test('Biology question ids are unique across the whole subject', () => {
  const ids = new Set();
  for (const meta of published) {
    const chapter = loadChapter(meta.slug);
    for (const question of chapter.questions) {
      assert.ok(!ids.has(question.id), `duplicate question id ${question.id}`);
      assert.ok(question.id.startsWith('bio-'), `${question.id} must use the bio- prefix`);
      ids.add(question.id);
    }
  }
  assert.equal(ids.size, 11 * CHAPTER_QUESTION_COUNT);
});

test('every Biology MCQ answers its own option exactly', () => {
  for (const meta of published) {
    const chapter = loadChapter(meta.slug);
    for (const question of chapter.questions) {
      if (question.type !== 'mcq') {
        assert.equal(question.options, undefined, `${question.id} must not carry options`);
        continue;
      }
      assert.ok(question.options.length >= 4, `${question.id} must offer four options`);
      assert.equal(
        new Set(question.options.map((option) => option.trim().toLowerCase())).size,
        question.options.length,
        `${question.id} must not repeat an option`,
      );
      const keyed = question.options[question.correctIndex];
      assert.ok(keyed !== undefined, `${question.id} correctIndex must be in range`);
      assert.ok(
        answerMatchesOption(question.answer, keyed, { strict: true }),
        `${question.id} must answer the option at correctIndex exactly`,
      );
      assert.equal(String(question.answer).trim(), String(keyed).trim());
    }
  }
});

test('no Biology answer or explanation is a placeholder', () => {
  for (const meta of published) {
    const chapter = loadChapter(meta.slug);
    for (const question of chapter.questions) {
      assert.ok(!isPlaceholderText(question.answer), `${question.id} must have a real answer`);
      assert.ok(!isPlaceholderText(question.explanation), `${question.id} must have a real explanation`);
      assert.ok(question.explanation.trim().length >= 20, `${question.id} explanation too short`);
      assert.equal(question.origin, 'practice', `${question.id} must be original practice`);
      assert.ok(Number.isInteger(question.marks) && question.marks >= 1);
    }
  }
});

test('no two Biology questions repeat a prompt or an answer', () => {
  const prompts = new Map();
  const answers = new Map();
  for (const meta of published) {
    const chapter = loadChapter(meta.slug);
    for (const question of chapter.questions) {
      const promptKey = question.prompt.trim().toLowerCase().replace(/\s+/g, ' ');
      const answerKey = String(question.answer ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
      assert.ok(
        !prompts.has(promptKey),
        `${question.id} repeats the prompt of ${prompts.get(promptKey)}`,
      );
      assert.ok(
        !answers.has(answerKey),
        `${question.id} repeats the answer of ${answers.get(answerKey)}`,
      );
      prompts.set(promptKey, question.id);
      answers.set(answerKey, question.id);
    }
  }
});

test('every Biology chapter carries teaching material of a reviewed depth', () => {
  for (const meta of published) {
    const chapter = loadChapter(meta.slug);
    assert.ok(chapter.learn.length >= 4, `${meta.slug} needs at least four lesson sections`);
    assert.ok(chapter.figures.length >= 2, `${meta.slug} needs at least two figures`);
    assert.ok(chapter.keyPoints.length >= 8, `${meta.slug} needs at least eight key points`);
    assert.ok(chapter.examFocus.length >= 3, `${meta.slug} needs at least three exam focus notes`);
    assert.ok(chapter.vocabulary.length >= 6, `${meta.slug} needs at least six vocabulary entries`);
    assert.ok(chapter.overview.intro.length > 200, `${meta.slug} needs a substantive overview`);

    const blocks = chapter.learn.flatMap((lesson) => lesson.blocks);
    assert.ok(
      blocks.some((block) => block.type === 'table'),
      `${meta.slug} must carry a table`,
    );
    assert.ok(
      blocks.some((block) => block.type === 'examples'),
      `${meta.slug} must carry a worked examples block`,
    );
    for (const lesson of chapter.learn) {
      assert.ok(lesson.blocks.length >= 2, `${meta.slug} lesson ${lesson.id} is too thin`);
      for (const block of lesson.blocks) {
        if (block.type === 'paragraph') {
          assert.ok(
            block.text.trim().split(/\s+/).length >= 40,
            `${meta.slug} lesson ${lesson.id} has a paragraph under forty words`,
          );
        }
      }
    }
    assert.ok(countQuestions(chapter) >= CHAPTER_QUESTION_COUNT);
  }
});

test('the Biology question mix is the reviewed mix', () => {
  const totals = {};
  for (const meta of published) {
    const chapter = loadChapter(meta.slug);
    assert.equal(
      countQuestions(chapter),
      CHAPTER_QUESTION_COUNT,
      `${meta.slug} must hold eleven questions`,
    );
    const perChapter = countQuestionsByType(chapter);
    for (const [type, count] of Object.entries(perChapter)) {
      totals[type] = (totals[type] || 0) + count;
    }
    // Every chapter must exercise every answer type, so no chapter is a list of
    // multiple choice alone.
    for (const type of ['mcq', 'fill-blank', 'short', 'long', 'analytical']) {
      assert.ok(perChapter[type] >= 1, `${meta.slug} has no ${type} question`);
    }
  }
  assert.deepEqual(totals, EXPECTED_MIX);
});

test('the subject page counts agree with the published Biology content', () => {
  const stats = getSubjectStats(BOARD, CLASS_SLUG, SUBJECT_SLUG);
  assert.equal(stats.chapters, 11);
  assert.equal(stats.questions, 121);
});

test('the Biology navigation moves correctly through the sequence', () => {
  const sequence = getSubjectChapterSequence(BOARD, CLASS_SLUG, SUBJECT_SLUG);
  assert.deepEqual(
    sequence.map((chapter) => chapter.slug),
    EXPECTED_CHAPTER_SLUGS,
  );
  published.forEach((meta, index) => {
    const neighbours = getChapterNeighbours(BOARD, CLASS_SLUG, SUBJECT_SLUG, meta.slug);
    assert.equal(neighbours.position, index + 1);
    assert.equal(neighbours.total, 11);
    assert.equal(
      neighbours.previous?.slug ?? null,
      index === 0 ? null : EXPECTED_CHAPTER_SLUGS[index - 1],
    );
    assert.equal(
      neighbours.next?.slug ?? null,
      index === 10 ? null : EXPECTED_CHAPTER_SLUGS[index + 1],
    );
  });
});

test('the Biology breadcrumbs point at the subject and the chapter', () => {
  for (const meta of published) {
    const trail = getChapterBreadcrumbs(BOARD, CLASS_SLUG, SUBJECT_SLUG, meta.slug);
    assert.equal(trail.length, 4);
    assert.equal(trail[0].href, `/learn/${BOARD}`);
    assert.equal(trail[1].href, `/learn/${BOARD}/${CLASS_SLUG}`);
    assert.equal(trail[2].href, ROUTE_PREFIX);
    assert.equal(trail[3].href, `${ROUTE_PREFIX}/${meta.slug}`);
    assert.equal(trail[3].label, meta.title);
  }
});

test('a Biology chapter that is not registered does not resolve', () => {
  // A slug inside the subject's route space but absent from the registry must
  // not produce a chapter record, which is what protects the route from
  // serving invented content.
  assert.equal(
    loadChapter('photosynthesis'),
    null,
    'an unregistered slug must not resolve to a chapter',
  );
  assert.equal(getChapter(BOARD, CLASS_SLUG, SUBJECT_SLUG, 'not-a-chapter'), null);
});

test('previously completed subjects keep their published content', () => {
  for (const entry of PRESERVED_SUBJECTS) {
    const chapters = getPublishedChapters(BOARD, entry.classSlug, entry.subjectSlug);
    assert.equal(
      chapters.length,
      entry.chapters,
      `${entry.classSlug}/${entry.subjectSlug} must still publish ${entry.chapters} chapters`,
    );
    let questions = 0;
    for (const meta of chapters) {
      const chapter = getChapter(BOARD, entry.classSlug, entry.subjectSlug, meta.slug);
      assert.ok(chapter, `${entry.subjectSlug}/${meta.slug} must still load`);
      questions += countQuestions(chapter);
    }
    assert.equal(
      questions,
      entry.questions,
      `${entry.classSlug}/${entry.subjectSlug} must still hold ${entry.questions} questions`,
    );
  }
});
