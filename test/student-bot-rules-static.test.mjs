/**
 * STATIC guard over firestore.rules for the student-bot collections.
 * This reads the rules text only; it does NOT evaluate rules. Real behaviour is
 * covered by test/firestore-rules-student-bot.test.mjs (Firestore emulator,
 * `npm run test:rules`). This file exists so a regression is caught even where
 * the emulator cannot run.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const rules = fs.readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8');

function block(source, header) {
  const start = source.indexOf(header);
  assert.ok(start >= 0, `missing ${header}`);
  let depth = 0;
  for (let i = source.indexOf('{', start); i < source.length; i += 1) {
    if (source[i] === '{') depth += 1;
    if (source[i] === '}') { depth -= 1; if (depth === 0) return source.slice(start, i + 1); }
  }
  throw new Error('unbalanced braces');
}

test('braces in firestore.rules are balanced', () => {
  assert.equal((rules.match(/{/g) || []).length, (rules.match(/}/g) || []).length);
});

for (const name of ['botQuizAttempts', 'botUsage']) {
  test(`${name} is nested under users/{userId} and is deny-all for clients`, () => {
    const users = block(rules, 'match /users/{userId}');
    const inner = block(users, `match /${name}/`);
    const allows = inner.match(/allow [^;]+;/g) || [];
    assert.deepEqual(allows, ['allow read, write: if false;']);
  });
}

test('no wildcard rule grants access to the bot collections', () => {
  assert.ok(!/\{document=\*\*\}/.test(rules));
});
