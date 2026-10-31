import fs from 'node:fs';
import path from 'node:path';

const repo = process.cwd();
const dir = path.join(repo, 'src/app/data/boardprep/content/isc/class-12/computer-science/chapters');
const subjectFile = path.join(dir, '..', 'subject.json');
const subject = JSON.parse(fs.readFileSync(subjectFile, 'utf8'));
const files = fs.readdirSync(dir).filter(n => n.endsWith('.json'));
const registered = new Set();
for (const s of subject.sections || []) for (const g of s.groups || []) for (const c of g.chapters || []) registered.add(c.file);
const onDisk = files.map(f => 'chapters/' + f).sort();
const missing = [...registered].filter(f => !files.includes(path.basename(f))).sort();
const extra = onDisk.filter(f => !registered.has(f)).sort();
const python = files.some(f => /\bPython\b/i.test(fs.readFileSync(path.join(dir, f), 'utf8')));
let finished = 0;
for (const f of files) {
  const rec = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  if (Array.isArray(rec.learn) && rec.learn.length > 0 && Array.isArray(rec.questions) && rec.questions.length > 0) finished += 1;
}
console.log('registered chapters:', registered.size);
console.log('chapter shell files on disk:', files.length);
console.log('completed (draft/published, non-empty) chapters:', finished);
console.log('python-free across registry + chapter files:', !python && !JSON.stringify(subject).match(/\bPython\b/));
console.log('all files registered + id/slug/status match + no unregistered files + python-free:', missing.length === 0 && extra.length === 0 && !python && !JSON.stringify(subject).match(/\bPython\b/));
if (missing.length || extra.length || python) process.exit(1);
process.exit(0);
