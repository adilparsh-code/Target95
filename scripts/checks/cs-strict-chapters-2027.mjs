import { validateChapterRecord } from '../../src/lib/boardprepContentSchema.mjs';
import fs from 'node:fs';
import path from 'node:path';

const repo = process.cwd();
const dir = path.join(repo, 'src/app/data/boardprep/content/isc/class-12/computer-science/chapters');
const slugs = ['boolean-algebra', 'java-methods', 'java-recursion', 'java-arrays-strings', 'inheritance-interface', 'computer-hardware'];

let allOk = true;
for (const slug of slugs) {
  const file = path.join(dir, slug + '.json');
  const ch = JSON.parse(fs.readFileSync(file, 'utf8'));
  const issues = validateChapterRecord(ch, { strictMcq: true, requireLearningOutcomes: true, requireAssessment: false, expectedQuestions: 23 });
  const python = /\bpython\b/i.test(fs.readFileSync(file, 'utf8'));
  console.log('chapter:', ch.id, '| slug:', ch.slug, '| status:', ch.reviewStatus, '| questions:', ch.questions?.length, '| strict issues:', issues.length, '| python-word:', python);
  if (issues.length || python) allOk = false;
}
console.log('all completed chapters strict-clean and python-free:', allOk);
process.exit(allOk ? 0 : 1);
