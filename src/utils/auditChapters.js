const fs = require('fs');
const path = require('path');

const CHAPTERS_DIR = path.join(__dirname, '..', 'app', 'data', 'chapter-content');
const CANONICAL_SECTIONS = [
  'introduction','theoryNotes','syntax','examples','dryRun','outputBasedQuestions',
  'errorFindingQuestions','fillInTheBlanks','mcqs','trueFalse','shortAnswerQuestions',
  'longAnswerQuestions','programmingQuestions','challengeProblems','previousYearQuestions',
  'aiVivaQuestions','practiceTest','chapterSummary','revisionNotes','cheatsheet',
  'interviewQuestions','examTricks','assertionReason','debugTheCode','caseStudyQuestions',
  'mixedPracticeSets','rapidRevisionQuestions',
];

const PLACEHOLDER_PATTERNS = [
  /question\s+\d+/i,
  /viva\s+question/i,
  /key\s+point\s+about/i,
  /^(skill|note|key point|pitfall|pattern)\s+\d+/i,
  /placeholder/i,
  /^content\s+for\s+note/i,
  /^answer$/i,
  /^explanation$/i,
  /coming\s+soon/i,
  /will\s+be\s+added/i,
  /available\s+soon/i,
];

function read(file) {
  try { return fs.readFileSync(file, 'utf8'); } catch { return null; }
}

function sectionNames(content) {
  const names = [];
  const re = /\/\/\s*=+\s*(\d+)\.\s*([^=]+?)\s*=+/g;
  let match;
  while ((match = re.exec(content))) {
    names.push(match[2].trim().toLowerCase().replace(/[^a-z0-9]/g, ''));
  }
  return names;
}

function ids(content) {
  return [...content.matchAll(/id:\s*["']([^"']+)["']/g)].map((m) => m[1]);
}

function placeholderMatches(content) {
  const hits = [];
  for (const pattern of PLACEHOLDER_PATTERNS) {
    const matches = content.match(new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`));
    if (matches) hits.push(...matches);
  }
  return [...new Set(hits.map((x) => x.trim()))];
}

function audit() {
  if (!fs.existsSync(CHAPTERS_DIR)) return { chapters: [], summary: {} };
  const files = fs.readdirSync(CHAPTERS_DIR)
    .filter((f) => f.endsWith('.js') && !['index.js'].includes(f) && !f.includes('write-'));
  const allIds = new Map();
  const chapters = [];

  for (const file of files) {
    const filePath = path.join(CHAPTERS_DIR, file);
    const content = read(filePath);
    if (!content) continue;
    const sections = sectionNames(content);
    const chapterIds = ids(content);
    const placeholders = placeholderMatches(content);
    const missing = CANONICAL_SECTIONS.filter((section) => {
      const n = section.replace(/[^a-z0-9]/g, '').toLowerCase();
      return !sections.some((s) => s.includes(n) || n.includes(s));
    });
    const duplicateIds = chapterIds.filter((id, i) => chapterIds.indexOf(id) !== i);
    for (const id of chapterIds) {
      if (allIds.has(id)) duplicateIds.push(`${id} (also in ${allIds.get(id)})`);
      else allIds.set(id, file);
    }
    chapters.push({ file, sections, missing, placeholders, duplicateIds, lines: content.split('\n').length, ids: chapterIds.length });
  }

  return {
    chapters,
    summary: {
      totalFiles: chapters.length,
      totalLines: chapters.reduce((n, c) => n + c.lines, 0),
      totalIds: chapters.reduce((n, c) => n + c.ids, 0),
      totalPlaceholders: chapters.reduce((n, c) => n + c.placeholders.length, 0),
      chaptersWithMissingSections: chapters.filter((c) => c.missing.length).length,
      chaptersWithPlaceholders: chapters.filter((c) => c.placeholders.length).length,
      chaptersWithDuplicateIds: chapters.filter((c) => c.duplicateIds.length).length,
    },
  };
}

function print(report) {
  console.log('='.repeat(80));
  console.log('TARGET95 CHAPTER-BY-CHAPTER CONTENT AUDIT');
  console.log('='.repeat(80));
  console.log(JSON.stringify(report.summary, null, 2));
  for (const chapter of report.chapters) {
    const status = chapter.missing.length || chapter.placeholders.length || chapter.duplicateIds.length ? 'NEEDS WORK' : 'OK';
    console.log(`\n[${status}] ${chapter.file}`);
    if (chapter.missing.length) console.log(`  Missing sections: ${chapter.missing.join(', ')}`);
    if (chapter.placeholders.length) console.log(`  Placeholder content: ${chapter.placeholders.join(' | ')}`);
    if (chapter.duplicateIds.length) console.log(`  Duplicate IDs: ${chapter.duplicateIds.join(', ')}`);
  }
}

print(audit());
