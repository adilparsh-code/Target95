const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'app', 'data', 'chapter-content');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.includes('index') && !f.includes('write') && !f.includes('enrich') && !f.includes('inventory'));

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const lines = content.split('\n').length;
  
  const sections = [];
  let matches;
  const re1 = /\/\/ =+ (\d+)\.\s*([^=]+) =+/g;
  while ((matches = re1.exec(content)) !== null) sections.push(matches[1].trim() + '. ' + matches[2].trim());
  const re2 = /\/\/ SECTION (\d+):\s*([^=]+)/g;
  while ((matches = re2.exec(content)) !== null) sections.push(matches[1].trim() + '. ' + matches[2].trim());
  
  const hasAR = content.includes('assertionReason');
  const hasDTC = content.includes('debugTheCode');
  const hasCS = content.includes('caseStudy');
  const hasMPS = content.includes('mixedPractice');
  const hasRR = content.includes('rapidRevision');
  const hasPrevYr = content.includes('previousYear');
  const hasInterview = content.includes('interviewQuestions');
  const hasExamTricks = content.includes('examTricks');
  const hasChapterSummary = content.includes('chapterSummary');
  
  console.log(file + ': ' + lines + ' lines, ' + sections.length + ' sections');
  console.log('  New: AR=' + hasAR + ' DTC=' + hasDTC + ' CS=' + hasCS + ' MPS=' + hasMPS + ' RR=' + hasRR);
  console.log('  Extras: PrevYr=' + hasPrevYr + ' Interview=' + hasInterview + ' ExamTricks=' + hasExamTricks + ' Summary=' + hasChapterSummary);
  console.log('  Sections: ' + sections.join(', '));
  console.log('');
}