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
import { getChapter, getPublishedChapters } from '../src/lib/boardprepCurriculum.mjs';
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

const EXPECTED_CHAPTER_SLUGS = [
  'earth-as-a-planet',
  'geographic-grid',
  'maps-and-their-uses',
  'interior-of-the-earth-and-rocks',
  'weathering-and-denudation',
  'earthquakes-and-volcanoes',
  'hydrosphere-oceans',
  'atmosphere',
  'pollution',
  'natural-regions-of-the-world',
  'map-reading',
];

const published = getPublishedChapters(BOARD, CLASS_SLUG, SUBJECT_SLUG);
const read = (relative) =>
  fs.readFileSync(path.join(process.cwd(), relative), 'utf8');

test('Geography publishes its eleven chapters in syllabus order', () => {
  assert.equal(published.length, 11);
  assert.deepEqual(
    published.map((chapter) => chapter.slug),
    EXPECTED_CHAPTER_SLUGS,
  );
  assert.ok(
    published.every((chapter) => chapter.status === 'published' && chapter.file),
    'every published Geography chapter must carry a status and a file reference',
  );
});

test('every Geography chapter satisfies the shared schema', () => {
  for (const meta of published) {
    const chapter = getChapter(BOARD, CLASS_SLUG, SUBJECT_SLUG, meta.slug);
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
    assert.equal(chapter.kind, 'geography');
    assert.ok(chapter.learningOutcomes.length >= 3);
  }
});

test('Geography question ids are unique across the whole subject', () => {
  const ids = new Set();
  for (const meta of published) {
    const chapter = getChapter(BOARD, CLASS_SLUG, SUBJECT_SLUG, meta.slug);
    for (const question of chapter.questions) {
      assert.ok(!ids.has(question.id), `duplicate question id ${question.id}`);
      ids.add(question.id);
    }
  }
});

test('every Geography MCQ answers its own option exactly', () => {
  for (const meta of published) {
    const chapter = getChapter(BOARD, CLASS_SLUG, SUBJECT_SLUG, meta.slug);
    for (const question of chapter.questions) {
      if (question.type !== 'mcq') {
        assert.equal(question.options, undefined, `${question.id} must not carry options`);
        continue;
      }
      assert.ok(question.options.length >= 4, `${question.id} must offer at least four options`);
      const keyed = question.options[question.correctIndex];
      assert.ok(
        answerMatchesOption(question.answer, keyed, { strict: true }),
        `${question.id} must answer the option at correctIndex exactly`,
      );
    }
  }
});

test('no Geography answer or explanation is a placeholder', () => {
  for (const meta of published) {
    const chapter = getChapter(BOARD, CLASS_SLUG, SUBJECT_SLUG, meta.slug);
    for (const question of chapter.questions) {
      assert.ok(!isPlaceholderText(question.answer), `${question.id} answer`);
      assert.ok(!isPlaceholderText(question.explanation), `${question.id} explanation`);
      assert.ok(String(question.explanation).trim().length >= 20, `${question.id} explanation length`);
    }
  }
});

test('the Map Reading chapter carries a complete map work assessment', () => {
  const chapter = getChapter(BOARD, CLASS_SLUG, SUBJECT_SLUG, 'map-reading');
  assert.ok(chapter.assessment, 'the map work assessment must exist');
  assert.ok(chapter.assessment.instructions.length >= 3);
  assert.ok(chapter.assessment.exercises.length >= 6);

  const marks = chapter.assessment.exercises.reduce((total, exercise) => total + exercise.marks, 0);
  assert.equal(marks, chapter.assessment.marks, 'the exercise marks must add up to the assessment total');

  for (const exercise of chapter.assessment.exercises) {
    assert.ok(exercise.prompt, `${exercise.id} must have a prompt`);
    assert.ok(!isPlaceholderText(exercise.answer), `${exercise.id} answer`);
    assert.ok(!isPlaceholderText(exercise.explanation), `${exercise.id} explanation`);
    assert.ok(
      exercise.table || (Array.isArray(exercise.data) && exercise.data.length > 0),
      `${exercise.id} must carry the data its questions depend on`,
    );
    // The data printed with an exercise must be complete, because the answer
    // is worked out from it and from nothing else.
    for (const row of exercise.data || []) {
      assert.ok(row?.label, `${exercise.id} has a data row without a label`);
      assert.ok(String(row?.value ?? '').trim(), `${exercise.id} has a data row without a value`);
    }
    if (exercise.table) {
      assert.ok(exercise.table.columns.length > 0, `${exercise.id} has a table without columns`);
      for (const row of exercise.table.rows || []) {
        assert.equal(row.length, exercise.table.columns.length, `${exercise.id} has a ragged table row`);
      }
    }
  }
});

test('every Geography chapter carries teaching material of a reviewed depth', () => {
  for (const meta of published) {
    const chapter = getChapter(BOARD, CLASS_SLUG, SUBJECT_SLUG, meta.slug);
    const lessons = chapter.learn || [];

    assert.ok(lessons.length >= 4, `${meta.slug} must carry at least four lesson sections`);
    assert.ok((chapter.learningOutcomes || []).length >= 4, `${meta.slug} must carry at least four learning outcomes`);
    assert.ok((chapter.keyPoints || []).length >= 8, `${meta.slug} must carry at least eight key points`);
    assert.ok((chapter.vocabulary || []).length >= 6, `${meta.slug} must carry at least six vocabulary entries`);
    assert.ok((chapter.figures || []).length >= 2, `${meta.slug} must carry at least two figures`);

    for (const lesson of lessons) {
      assert.ok((lesson.blocks || []).length >= 2, `${meta.slug} lesson ${lesson.id} must carry at least two blocks`);
      for (const block of lesson.blocks || []) {
        if (block.type === 'paragraph') {
          const words = String(block.text || '').trim().split(/\s+/).filter(Boolean).length;
          assert.ok(words >= 40, `${meta.slug} lesson ${lesson.id} has a paragraph of only ${words} words`);
        } else if (block.type === 'bullets') {
          assert.ok((block.items || []).length >= 3, `${meta.slug} lesson ${lesson.id} needs at least three bullets`);
        } else if (block.type === 'terms') {
          assert.ok((block.items || []).length >= 3, `${meta.slug} lesson ${lesson.id} needs at least three terms`);
        } else if (block.type === 'examples') {
          assert.ok((block.items || []).length >= 2, `${meta.slug} lesson ${lesson.id} needs at least two worked examples`);
        }
      }
    }
  }
});

test('the Natural Regions chapter records that the board prints no list of regions', () => {
  const chapter = getChapter(BOARD, CLASS_SLUG, SUBJECT_SLUG, 'natural-regions-of-the-world');
  const note = String(chapter.sourceNote?.boardprep || '');
  assert.match(
    note,
    /does not print a numbered list of regions/i,
    'the chapter must state that the CISCE unit prints no region list',
  );
  assert.match(
    note,
    /does not present them as an official enumeration/i,
    'the chapter must not present its region set as an official enumeration',
  );
  assert.equal(chapter.sourceNote.thirdParty, '', 'no third-party source is claimed for this chapter');
});

test('the subject page counts agree with the published Geography content', () => {
  const stats = getSubjectStats(BOARD, CLASS_SLUG, SUBJECT_SLUG);
  assert.equal(stats.chapters, 11);

  const counted = published.reduce((total, meta) => {
    const chapter = getChapter(BOARD, CLASS_SLUG, SUBJECT_SLUG, meta.slug);
    return total + countQuestions(chapter);
  }, 0);
  assert.equal(stats.questions, counted);
  assert.equal(counted, 131);
});

test('the Geography navigation moves correctly through the sequence', () => {
  const sequence = getSubjectChapterSequence(BOARD, CLASS_SLUG, SUBJECT_SLUG);
  assert.equal(sequence.length, 11);

  const first = getChapterNeighbours(BOARD, CLASS_SLUG, SUBJECT_SLUG, sequence[0].slug);
  assert.equal(first.previous, null, 'the first chapter has no previous chapter');
  assert.equal(first.next.slug, sequence[1].slug);
  assert.equal(first.position, 1);
  assert.equal(first.total, 11);

  const middle = getChapterNeighbours(BOARD, CLASS_SLUG, SUBJECT_SLUG, sequence[5].slug);
  assert.equal(middle.previous.slug, sequence[4].slug);
  assert.equal(middle.next.slug, sequence[6].slug);
  assert.equal(middle.position, 6);

  const last = getChapterNeighbours(BOARD, CLASS_SLUG, SUBJECT_SLUG, sequence[10].slug);
  assert.equal(last.next, null, 'the last chapter has no next chapter');
  assert.equal(last.previous.slug, sequence[9].slug);
  assert.equal(last.position, 11);
});

test('the Geography breadcrumbs point at the subject and the chapter', () => {
  const trail = getChapterBreadcrumbs(BOARD, CLASS_SLUG, SUBJECT_SLUG, 'pollution');
  assert.deepEqual(
    trail.map((crumb) => crumb.href),
    [
      `/learn/${BOARD}`,
      `/learn/${BOARD}/${CLASS_SLUG}`,
      ROUTE_PREFIX,
      `${ROUTE_PREFIX}/pollution`,
    ],
  );
  assert.equal(trail[3].label, 'Pollution');
});

test('the chapter renderer renders every block type and falls back on unknown ones', () => {
  const source = read('src/app/components/boardprep/ChapterBlock.jsx');
  for (const type of ['paragraph', 'bullets', 'examples', 'terms', 'table']) {
    assert.ok(source.includes(`block.type === '${type}'`), `the renderer must handle ${type}`);
  }
  assert.ok(source.includes('Unknown block type'), 'the renderer must keep a text fallback');
});

test('the chapter page renders the assessment panel and the practice cards', () => {
  const source = read('src/app/learn/[board]/[classSlug]/[subjectSlug]/[chapterSlug]/page.jsx');
  assert.ok(source.includes('AssessmentPanel'), 'the chapter page must render the assessment panel');
  assert.ok(source.includes('ChapterBreadcrumbs'), 'the chapter page must render the breadcrumbs');
  assert.ok(source.includes('ChapterPager'), 'the chapter page must render the pager');
  assert.ok(source.includes('PracticeCard'), 'the chapter page must render the practice cards');
  assert.ok(source.includes('chapter.questions?.map'), 'the chapter page must render every question');
});

test('the map work assessment is shown apart from the ordinary practice questions', () => {
  const source = read('src/app/components/boardprep/AssessmentPanel.jsx');
  assert.ok(source.includes('Assessment'), 'the assessment panel must be labelled');
  assert.ok(source.includes('Show answer key'), 'the assessment panel must carry an answer key');
  assert.ok(source.includes('exercise.data'), 'the assessment panel must render the data of an exercise');
  assert.ok(source.includes('exercise.table'), 'the assessment panel must render the table of an exercise');
});

test('the Geography question mix is the reviewed mix', () => {
  const totals = {};
  for (const meta of published) {
    const chapter = getChapter(BOARD, CLASS_SLUG, SUBJECT_SLUG, meta.slug);
    for (const [type, count] of Object.entries(countQuestionsByType(chapter))) {
      totals[type] = (totals[type] || 0) + count;
    }
  }
  assert.deepEqual(totals, {
    mcq: 48,
    'fill-blank': 22,
    short: 34,
    long: 15,
    analytical: 12,
  });
});
