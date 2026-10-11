import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const apps = ['word', 'excel', 'powerpoint'];
const requiredFields = ['id', 'number', 'title', 'description', 'objectives', 'concepts', 'image', 'steps', 'expectedResult', 'guidedPractical', 'independentPractice', 'challenge', 'shortQuestions', 'tips', 'mistakes', 'keyPoints', 'mcqs'];

test('Office lessons are complete, navigable content records', () => {
  let lessonCount = 0;
  for (const app of apps) {
    const lessons = JSON.parse(fs.readFileSync(`src/data/office/${app}.json`, 'utf8'));
    const ids = new Set();
    const numbers = new Set();
    lessonCount += lessons.length;

    for (const lesson of lessons) {
      for (const field of requiredFields) assert.ok(lesson[field], `${app}/${lesson.id} is missing ${field}`);
      assert.ok(!ids.has(lesson.id), `${app}/${lesson.id} duplicates a lesson id`);
      assert.ok(!numbers.has(lesson.number), `${app}/${lesson.id} duplicates a chapter number`);
      ids.add(lesson.id);
      numbers.add(lesson.number);
      assert.equal(lesson.number > 0, true, `${app}/${lesson.id} has an invalid chapter number`);
      assert.equal(fs.existsSync(path.join('public', lesson.image.src.replace(/^\//, ''))), true, `${app}/${lesson.id} image is missing`);
      assert.ok(lesson.guidedPractical.task && lesson.guidedPractical.checklist.length, `${app}/${lesson.id} has no guided practical`);
      assert.doesNotMatch(lesson.independentPractice, /Check that (?:a|an) (?:saved|distinct|readable|four-step|two-column|reviewed|PDF|mixed|editable|workbook|selected|consistent|chart|deduplicated|project|evenly|legible|labelled|focused|tested|working|rehearsed|checked|concise)\b/, `${app}/${lesson.id} has an incomplete verification instruction`);
      for (const question of lesson.mcqs) {
        assert.ok(question.id && question.explanation, `${app}/${lesson.id} has an incomplete MCQ`);
        assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length, `${app}/${lesson.id}/${question.id} has an invalid answer`);
      }
    }
  }
  assert.equal(lessonCount, 66);
});
