/**
 * Fixes duplicate practiceTest IDs across chapters
 * Run: node src/utils/fixDuplicates.js
 */

const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'app', 'data', 'chapter-content');

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.js') && !f.includes('index') && !f.includes('write') && !f.includes('enrich') && !f.includes('inventory') && !f.includes('audit') && !f.includes('fix') && !f.includes('addNew'));

for (const file of files) {
  const filePath = path.join(DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const chapterId = file.replace('.js', '');
  const prefix = chapterId.replace(/^\d+-/, '').replace(/-/g, '');
  
  // Find practiceTest section and replace generic pt- IDs with chapter-specific IDs
  const practiceTestMatch = content.match(/practiceTest:\s*\{[^}]*"sections":\s*\[([\s\S]*?)\]\s*\}/);
  if (!practiceTestMatch) {
    console.log(file + ': No practiceTest section found');
    continue;
  }
  
  // Replace generic pt- IDs with chapter-specific IDs
  let updated = content;
  let idCounter = 1;
  
  // Replace pt-1, pt-2, etc. with chapter-specific IDs
  updated = updated.replace(/"id":\s*"pt-(\d+)"/g, (match, num) => {
    return `"id": "${prefix}-pt-${num}"`;
  });
  
  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(file + ': ✅ Fixed practiceTest IDs');
  } else {
    console.log(file + ': No generic pt- IDs found');
  }
}

console.log('\n✅ Duplicate ID fix complete.');