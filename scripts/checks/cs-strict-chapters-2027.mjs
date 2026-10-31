import { validateChapterRecord } from '../../src/lib/boardprepContentSchema.mjs';
import fs from 'node:fs';
import path from 'node:path';

const repo = process.cwd();
const dir = path.join(repo, 'src/app/data/boardprep/content/isc/class-12/computer-science/chapters');
const slugs = ['boolean-algebra', 'computer-hardware', 'java-oop-objects-primitives', 'java-variables-expressions', 'java-statements-scope', 'java-methods', 'java-arrays-strings', 'java-recursion', 'inheritance-interface'];

let allOk = true;
let finishedCount = 0;
let totalQuestions = 0;
for (const slug of slugs) {
  const file = path.join(dir, slug + '.json');
  const ch = JSON.parse(fs.readFileSync(file, 'utf8'));
  const issues = validateChapterRecord(ch, { strictMcq: true, requireLearningOutcomes: true, requireAssessment: false, expectedQuestions: 23 });
  const python = /\bpython\b/i.test(fs.readFileSync(file, 'utf8'));
  const questions = ch.questions?.length ?? 0;
  finishedCount += Number(questions > 0);
  totalQuestions += questions;
  console.log('chapter:', ch.id, '| slug:', ch.slug, '| status:', ch.reviewStatus, '| questions:', questions, '| strict issues:', issues.length, '| python-word:', python);
  if (issues.length || python) allOk = false;
}
console.log('finished chapters checked:', finishedCount, '| total finished questions:', totalQuestions);
console.log('all finished CS2027 chapters strict-clean and python-free:', allOk && finishedCount === 9 && totalQuestions === 207);
process.exit(allOk && finishedCount === 9 && totalQuestions === 207 ? 0 : 1);
