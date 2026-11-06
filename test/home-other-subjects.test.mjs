import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { getChapter, getOtherSubjectGroups, getPublishedChapters, getPublishedSubjectCards } from '../src/lib/boardprepCurriculum.mjs';

const cards = getPublishedSubjectCards();

test('other-subjects cards only list subjects with published chapters', () => {
  assert.ok(cards.length > 0);
  for (const card of cards) {
    assert.ok(card.publishedChapters > 0, `${card.key} has no published chapters`);
    const [, , board, classSlug, subjectSlug] = card.href.split('/');
    assert.equal(card.href, `/learn/${board}/${classSlug}/${subjectSlug}`);
    assert.equal(getPublishedChapters(board, classSlug, subjectSlug).length, card.publishedChapters);
  }
});

test('other-subjects cards exclude computer subjects and are unique', () => {
  assert.ok(cards.every((card) => !/computer-(applications|science)/.test(card.href)));
  assert.equal(new Set(cards.map((card) => card.key)).size, cards.length);
});

test('every card links to a subject page that exists and has a readable first chapter', () => {
  for (const card of cards) {
    const [, , board, classSlug, subjectSlug] = card.href.split('/');
    assert.ok(fs.existsSync(path.join('src/app/data/boardprep/content', board, classSlug, subjectSlug, 'subject.json')));
    const [first] = getPublishedChapters(board, classSlug, subjectSlug);
    assert.ok(getChapter(board, classSlug, subjectSlug, first.slug), `${card.key} first chapter unreadable`);
  }
});

test('subject groups cover CISCE and CBSE and never place a card under the wrong board', () => {
  const groups = getOtherSubjectGroups();
  assert.deepEqual(groups.map((group) => group.id), ['cisce', 'cbse']);
  const [cisce, cbse] = groups;
  assert.ok(cisce.subjects.length > 0);
  assert.ok(cisce.subjects.every((card) => ['icse', 'isc'].includes(card.boardSlug)));
  assert.ok(cbse.subjects.every((card) => card.boardSlug === 'cbse'));
  assert.equal(cisce.subjects.length + cbse.subjects.length, cards.length);
});
