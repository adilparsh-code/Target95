import { AcademicDataValidator } from './src/lib/validation/academicDataValidator.mjs';

const validator = new AcademicDataValidator(process.cwd());
const result = await validator.validate();

const finds = result.findings.filter((f) => f.severity === 'WARNING');
console.log('TOTAL WARNINGS:', finds.length);
console.log('ERRORS:', result.totals.ERROR);
console.log('INFO:', result.totals.INFO);

const map = {};
const byCategory = {};
for (const w of finds) {
  const cat = w.category;
  byCategory[cat] = (byCategory[cat] || 0) + 1;
  let norm = w.message;
  norm = norm.replace(/CH\d{2}-[A-Z]{2,4}-\d{3}/g, 'CH<N>-<TYPE>-<N>');
  norm = norm.replace(/CH\d{2}-[A-Z]{2,4}/g, 'CH<N>-<TYPE>');
  norm = norm.replace(/\bCH\d{2}\b/g, 'CH<N>');
  norm = norm.replace(/\d+/g, '<N>');
  norm = norm.replace(/Unexpected identifier '[^']+'/g, "Unexpected identifier '<name>'");
  norm = norm.replace(/Unexpected token '[^']+'/g, "Unexpected token '<tok>'");
  // Normalize specific chapter-name references
  const key = cat + ' :: ' + norm;
  map[key] = (map[key] || 0) + 1;
}

console.log('\n=== By Category (count) ===');
for (const k of Object.keys(byCategory).sort((a, b) => byCategory[b] - byCategory[a])) {
  console.log(byCategory[k] + '  ' + k);
}

console.log('\n=== Distinct Normalized Messages (count) ===');
for (const k of Object.keys(map).sort((a, b) => map[b] - map[a])) {
  console.log(map[k] + '  ' + k);
}
console.log('\n=== Sum of sub-counts:', Object.values(map).reduce((a, b) => a + b, 0));
