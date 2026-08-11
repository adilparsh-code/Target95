import assert from 'node:assert/strict';
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

console.log('Academic data validator smoke test passed');
