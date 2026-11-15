import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as curriculum from '../src/lib/boardprepCurriculum.mjs';
import { createBoardprepAdapter } from '../src/lib/student-bot/adapters/boardprep.mjs';

const adapter = createBoardprepAdapter();
const ctx = { board: 'icse', classSlug: 'class-10', subjectSlug: 'hindi' };

function firstPlanned() {
  for (const b of curriculum.getBoards()) for (const c of b.classes) for (const s of curriculum.getSubjects(b.slug, c.slug)) {
    const subject = curriculum.getSubject(b.slug, c.slug, s.slug);
    for (const sec of subject?.sections || []) for (const g of sec.groups || []) for (const ch of g.chapters || []) {
      if (ch.status !== 'published') return { ctx: { board: b.slug, classSlug: c.slug, subjectSlug: s.slug }, slug: ch.slug };
    }
  }
  return null;
}

test('resolveContext understands board, class and subject phrases', () => {
  assert.deepEqual(adapter.resolveContext('icse class 10 history civics').context, { board: 'icse', classSlug: 'class-10', subjectSlug: 'history-civics' });
  assert.deepEqual(adapter.resolveContext('ICSE class X hindi').context, ctx);
  assert.equal(adapter.resolveContext('icse class 10 astrology').code, 'subject_not_found');
  assert.equal(adapter.resolveContext('icse class 3 hindi').code, 'class_not_found');
  assert.equal(adapter.resolveContext('hogwarts class 10 hindi').code, 'board_not_found');
});

test('verifyContext rejects traversal, unknown boards and unknown subjects', () => {
  assert.equal(adapter.verifyContext({ board: '../etc', classSlug: 'class-10' }).code, 'board_not_found');
  assert.equal(adapter.verifyContext({ board: 'icse', classSlug: '../..' }).code, 'class_not_found');
  assert.equal(adapter.verifyContext({ ...ctx, subjectSlug: '..' }).code, 'subject_not_found');
  assert.equal(adapter.verifyContext({}).code, 'context_missing');
  assert.equal(adapter.verifyContext(ctx).ok, true);
});

test('listChapters returns only published chapters', () => {
  const listed = adapter.listChapters(ctx).map((c) => c.slug);
  const published = curriculum.getPublishedChapters(ctx.board, ctx.classSlug, ctx.subjectSlug).map((c) => c.slug);
  assert.deepEqual(listed, published);
  assert.ok(listed.length > 0);
});

test('an unpublished (planned) chapter can be neither found nor loaded', () => {
  const planned = firstPlanned();
  assert.ok(planned, 'fixture: repo should contain at least one planned chapter');
  assert.equal(adapter.loadChapter(planned.ctx, planned.slug).code, 'chapter_not_published');
  assert.equal(adapter.findChapter(planned.ctx, planned.slug).status, 'none');
});

test('loadChapter rejects unknown slugs and path traversal', () => {
  for (const slug of ['nope', '../../hindi/subject', '..', '']) {
    assert.equal(adapter.loadChapter(ctx, slug).ok, false, slug);
  }
});

test('findChapter matches by slug and title, reports ambiguity and misses', () => {
  const [first] = adapter.listChapters(ctx);
  assert.equal(adapter.findChapter(ctx, first.slug).status, 'found');
  assert.equal(adapter.findChapter(ctx, first.title).matches[0].slug, first.slug);
  assert.equal(adapter.findChapter(ctx, 'zzzz-not-a-chapter').status, 'none');
  assert.equal(adapter.findChapter(ctx, '   ').status, 'none');
});

test('getMcqs serves only well-formed MCQs and never non-MCQ types', () => {
  const [first] = adapter.listChapters(ctx);
  const { chapter } = adapter.loadChapter(ctx, first.slug);
  const mcqs = adapter.getMcqs(chapter);
  assert.ok(mcqs.length > 0);
  for (const q of mcqs) {
    assert.equal(q.type, 'mcq');
    assert.ok(Number.isInteger(q.correctIndex) && q.correctIndex < q.options.length);
  }
  const broken = { id: 'x', questions: [{ id: 'bad', type: 'mcq', prompt: 'p', options: ['a', 'b'], correctIndex: 9, answer: 'a' }, { id: 'sh', type: 'short', prompt: 'p', answer: 'a' }] };
  assert.equal(adapter.getMcqs(broken).length, 0);
});

test('every published chapter in the repo loads (adapter does not hide study content)', () => {
  let total = 0;
  for (const b of curriculum.getBoards()) for (const c of b.classes) for (const s of adapter.listSubjects({ board: b.slug, classSlug: c.slug })) {
    const sctx = { board: b.slug, classSlug: c.slug, subjectSlug: s.slug };
    for (const ch of adapter.listChapters(sctx)) { total += 1; assert.equal(adapter.loadChapter(sctx, ch.slug).ok, true, `${b.slug}/${c.slug}/${s.slug}/${ch.slug}`); }
  }
  assert.ok(total >= 90);
});
