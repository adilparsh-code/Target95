import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { AcademicDataValidator, validateAcademicData } from '../academicDataValidator.mjs';

const validator = new AcademicDataValidator(process.cwd());
const result = await validateAcademicData(process.cwd());

assert.equal(typeof result, 'object');
assert.equal(typeof result.report, 'string');
assert.equal(typeof result.exitCode, 'number');

const records = await validator.readQuestionBankRecords();
const mcq = records.find((r) => r.id === 'CH01-MCQ-001');
const output = records.find((r) => r.id === 'CH01-OUT-001');
const programming = records.find((r) => r.id === 'CH01-PRQ-001');

assert.ok(mcq, 'MCQ chapter record was not loaded from the real bank');
assert.equal(mcq.family, 'mcqs');
assert.equal(mcq.type, 'mcq');
assert.ok(output, 'Output family record was not loaded from the real bank');
assert.equal(output.family, 'outputQuestions');
assert.equal(output.type, 'output');
assert.ok(programming, 'Programming family record was not loaded from the real bank');
assert.equal(programming.family, 'programmingQuestions');
assert.equal(programming.type, 'programming');

const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'target95-validator-'));
const fixtureDataDir = path.join(fixtureRoot, 'src', 'app', 'data');
const fixtureChapterDir = path.join(fixtureDataDir, 'chapter-content');
const fixtureQuestionDir = path.join(fixtureDataDir, 'question-bank');
fs.mkdirSync(fixtureChapterDir, { recursive: true });
fs.mkdirSync(fixtureQuestionDir, { recursive: true });

fs.writeFileSync(path.join(fixtureChapterDir, 'quoted.js'), 'const chapter = { "id": "1", "title": "Quoted", "slug": "quoted" }; export default chapter;');
fs.writeFileSync(path.join(fixtureChapterDir, 'duplicate.js'), 'const chapter = { id: "1", title: "Duplicate", slug: "quoted" }; export default chapter;');
fs.writeFileSync(path.join(fixtureChapterDir, 'missing.js'), 'const chapter = { id: "3", title: "Missing slug" }; export default chapter;');
fs.writeFileSync(path.join(fixtureQuestionDir, 'legacy.js'), `
  const chapter = {
    id: 1, title: "Legacy Chapter", slug: "legacy-chapter",
    mcqs: [
      { id: "CH01-MCQ-001", difficulty: "easy", chapter: "Legacy Chapter", question: "Valid legacy question" },
      { id: "CH01-MCQ-001", difficulty: "invalid", chapter: "Unknown Chapter", question: "Invalid reference and difficulty" },
    ],
    programmingQuestions: [
      { id: "CH01-PRQ-001", difficulty: "medium", chapter: "Legacy Chapter", problemStatement: "Optional metadata is absent" },
    ],
  }; export default chapter;
`);
fs.writeFileSync(path.join(fixtureQuestionDir, 'malformed.js'), 'const broken = {');
fs.writeFileSync(path.join(fixtureDataDir, 'javaCurriculum.js'), 'export const javaChapters = [];');

const fixtureResult = await validateAcademicData(fixtureRoot);
const fixtureFindings = fixtureResult.result.findings;
assert.ok(fixtureFindings.some((finding) => finding.message.includes('Duplicate chapter ID detected: 1')));
assert.ok(fixtureFindings.some((finding) => finding.message.includes('Duplicate chapter slug detected: quoted')));
assert.ok(fixtureFindings.some((finding) => finding.message === 'Missing chapter slug'));
assert.ok(!fixtureFindings.some((finding) => finding.file?.endsWith('quoted.js') && finding.message === 'Missing chapter slug'));
assert.ok(fixtureFindings.some((finding) => finding.message.includes('Duplicate question ID detected: CH01-MCQ-001')));
assert.ok(fixtureFindings.some((finding) => finding.message.includes('references chapter not in registries: Unknown Chapter')));
assert.ok(fixtureFindings.some((finding) => finding.message.includes('Invalid or missing difficulty value: invalid')));
assert.ok(fixtureFindings.some((finding) => finding.category === 'SOURCE' && finding.file?.endsWith('malformed.js')));
assert.ok(!fixtureFindings.some((finding) => finding.message.includes('Programming question missing optional metadata')));
assert.ok(!fixtureFindings.some((finding) => finding.message.includes('references chapter not in registries: Legacy Chapter')));

fs.rmSync(fixtureRoot, { recursive: true, force: true });

console.log('Academic data validator smoke test passed');
