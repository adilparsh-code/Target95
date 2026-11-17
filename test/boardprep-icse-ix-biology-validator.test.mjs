import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const VALIDATOR = fileURLToPath(new URL('../scripts/validate-icse-ix-biology.mjs', import.meta.url));

// The validator used to resolve its content from an absolute authoring-workspace
// path, which failed on CI. Run it from an unrelated directory to keep that fixed.
test('the ICSE IX Biology validator runs from a working directory outside the repository', () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'boardprep-biology-validator-'));
  try {
    const result = spawnSync(process.execPath, [VALIDATOR], { cwd, encoding: 'utf8' });

    assert.equal(result.status, 0, `validator exited with ${result.status}\n${result.stderr || result.stdout}`);
    assert.match(result.stdout, /Chapters validated: 11/);
    assert.match(result.stdout, /Total questions:\s+132/);
    assert.doesNotMatch(result.stderr, /Cannot find|not found/i);
  } finally {
    fs.rmSync(cwd, { recursive: true, force: true });
  }
});

test('the ICSE IX Biology validator carries no hardcoded workspace path', () => {
  const source = fs.readFileSync(VALIDATOR, 'utf8');
  assert.doesNotMatch(source, /\/workspace\//, 'the validator must not depend on an authoring-machine path');
});
