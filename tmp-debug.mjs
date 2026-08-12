import fs from 'node:fs';
const t = fs.readFileSync('current-validate-output.txt', 'utf8');
console.log('FILE LENGTH:', t.length);
const lines = t.split(/\r?\n/);
console.log('NUM LINES:', lines.length);
for (let i = 0; i < Math.min(12, lines.length); i++) {
  console.log(i, JSON.stringify(lines[i]));
}
