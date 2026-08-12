import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const qbDir = path.join('src', 'app', 'data', 'question-bank');
const files = fs.readdirSync(qbDir).filter(f => f.endsWith('.js') && f !== 'index.js');

console.log('=== node --check on each question-bank file ===');
for (const f of files) {
  const fp = path.join(qbDir, f);
  try {
    execFileSync('node', ['--check', fp], { stdio: 'pipe' });
    console.log(`OK     ${f}`);
  } catch (e) {
    const msg = (e.stderr || e.stdout || String(e)).toString().split(/\r?\n/).filter(Boolean).slice(0, 2).join(' | ');
    console.log(`FAIL   ${f}  ->  ${msg}`);
  }
}

console.log('\n=== Validator regex extraction on chapter-content files ===');
function firstValue(text, regex) {
  const match = text.match(regex);
  return match?.[1] || null;
}
const regexs = {
  id: /id\s*:\s*['"`]([^'"`]+)/m,
  title: /title\s*:\s*['"`]([^'"`]+)/m,
  slug: /slug\s*:\s*['"`]([^'"`]+)/m,
};
for (const f of ['01-if.js', '08-arrays-1d.js', '09-arrays-2d.js', '09-two-dimensional-arrays.js']) {
  const fp = path.join('src', 'app', 'data', 'chapter-content', f);
  const text = fs.readFileSync(fp, 'utf8');
  console.log(`\n--- ${f} ---`);
  console.log('  id   =', firstValue(text, regexs.id));
  console.log('  title=', firstValue(text, regexs.title) ? firstValue(text, regexs.title).slice(0, 40) : null);
  console.log('  slug =', firstValue(text, regexs.slug));
  // show whether the FIRST occurrence of slug/line1 uses quoted key
  const line2 = text.split(/\r?\n/)[1];
  console.log('  line2:', JSON.stringify(line2.slice(0, 60)));
}
