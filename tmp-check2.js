// Use CommonJS to avoid ESM/backtick issues; read files and run node --check
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const qbDir = path.join('src', 'app', 'data', 'question-bank');
const files = fs.readdirSync(qbDir).filter(f => f.endsWith('.js') && f !== 'index.js');

console.log('=== node --check on each question-bank file ===');
const backtick = String.fromCharCode(96);
for (const f of files) {
  const fp = path.join(qbDir, f);
  try {
    execFileSync(process.execPath, ['--check', fp], { stdio: 'pipe' });
    console.log('OK     ' + f);
  } catch (e) {
    const buf = (e.stderr || e.stdout || String(e)).toString();
    const msg = buf.split(/\r?\n/).filter(Boolean).slice(0, 2).join(' | ');
    console.log('FAIL   ' + f + '  ->  ' + msg);
  }
}

console.log('\n=== Validator regex extraction on chapter-content files ===');
// Reproduce validator firstValue regex: /(field)\s*:\s*['"\`]([^'"`]+)/m
function firstValue(text, field) {
  const re = new RegExp(field + '\\s*:\\s*[\\\'"\\x60]([^\\\'"\\x60]+)', 'm');
  const m = text.match(re);
  return m ? m[1] : null;
}
for (const f of ['01-if.js', '08-arrays-1d.js', '09-arrays-2d.js', '09-two-dimensional-arrays.js']) {
  const fp = path.join('src', 'app', 'data', 'chapter-content', f);
  const text = fs.readFileSync(fp, 'utf8');
  console.log('--- ' + f + ' ---');
  console.log('  id   = ' + firstValue(text, 'id'));
  const t = firstValue(text, 'title');
  console.log('  title= ' + (t ? t.slice(0, 45) : null));
  console.log('  slug = ' + firstValue(text, 'slug'));
  const line2 = text.split(/\r?\n/)[1];
  console.log('  line2: ' + JSON.stringify(line2.slice(0, 60)));
}
