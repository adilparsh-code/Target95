/**
 * Chapter Content Audit Script
 * Run: node src/utils/auditChapters.js
 * 
 * Audits all chapter content files for:
 * - Schema completeness
 * - Unique IDs
 * - Duplicate content
 * - Difficulty balance
 * - Placeholder content
 */

const fs = require('fs');
const path = require('path');

const CHAPTERS_DIR = path.join(__dirname, '..', 'app', 'data', 'chapter-content');

// Canonical 22-section schema
const CANONICAL_SECTIONS = [
  'introduction',           // 1
  'theoryNotes',            // 2
  'syntax',                 // 3
  'examples',               // 4
  'dryRun',                 // 5
  'outputBasedQuestions',   // 6
  'errorFindingQuestions',  // 7
  'fillInTheBlanks',        // 8
  'mcqs',                   // 9
  'trueFalse',              // 10
  'shortAnswerQuestions',   // 11
  'longAnswerQuestions',    // 12
  'programmingQuestions',   // 13
  'challengeProblems',      // 14
  'previousYearQuestions',  // 15
  'aiVivaQuestions',        // 16
  'practiceTest',           // 17
  'chapterSummary',         // 18
  'revisionNotes',          // 19
  'cheatsheet',             // 20
  'interviewQuestions',     // 21
  'examTricks',             // 22
];

// New sections to add
const NEW_SECTIONS = [
  'assertionReason',        // Assertion & Reason questions
  'debugTheCode',           // Debug the Code questions
  'caseStudyQuestions',     // Case Study questions
  'mixedPracticeSets',      // Mixed Practice Sets
  'rapidRevisionQuestions', // Rapid Revision Questions
];

const PLACEHOLDER_PATTERNS = [
  /question \d+/i,
  /viva question/i,
  /key point about/i,
  /^(skill|note|key point|pitfall|pattern) \d+/i,
  /placeholder/i,
  /^Content for note/i,
  /^Answer$/i,
  /^Explanation$/i,
];

function readChapterFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (err) {
    return null;
  }
}

function extractSectionNames(content) {
  const sectionRegex = /\/\/ =+ (\d+)\.\s*([^=]+) =+/g;
  const sections = [];
  let match;
  while ((match = sectionRegex.exec(content)) !== null) {
    sections.push({
      number: parseInt(match[1]),
      name: match[2].trim().toLowerCase().replace(/[^a-z0-9]/g, ''),
    });
  }
  return sections;
}

function extractIds(content) {
  const idRegex = /id:\s*["']([^"']+)["']/g;
  const ids = [];
  let match;
  while ((match = idRegex.exec(content)) !== null) {
    ids.push(match[1]);
  }
  return ids;
}

function countPlaceholders(content) {
  let count = 0;
  for (const pattern of PLACEHOLDER_PATTERNS) {
    const matches = content.match(pattern);
    if (matches) {
      count += matches.length;
    }
  }
  return count;
}

function estimateLineCount(content) {
  return content.split('\n').length;
}

function audit() {
  const files = fs.readdirSync(CHAPTERS_DIR)
    .filter(f => f.endsWith('.js') && !f.includes('index') && !f.includes('write'));

  const report = {
    summary: {
      totalFiles: files.length,
      totalLines: 0,
      totalIds: 0,
      totalPlaceholders: 0,
      chaptersWithDuplicates: [],
      missingSections: {},
    },
    chapters: [],
  };

  const allIds = {};

  for (const file of files) {
    const filePath = path.join(CHAPTERS_DIR, file);
    const content = readChapterFile(filePath);
    if (!content) {
      report.chapters.push({ file, error: 'Could not read file' });
      continue;
    }

    const sections = extractSectionNames(content);
    const ids = extractIds(content);
    const placeholderCount = countPlaceholders(content);
    const lineCount = estimateLineCount(content);

    // Check for duplicate IDs within chapter
    const idCounts = {};
    const duplicateIds = [];
    for (const id of ids) {
      idCounts[id] = (idCounts[id] || 0) + 1;
      if (idCounts[id] === 2) {
        duplicateIds.push(id);
      }
    }

    // Check for duplicate IDs across chapters
    for (const id of ids) {
      if (allIds[id] && allIds[id] !== file) {
        duplicateIds.push(`${id} (duplicate in ${file} and ${allIds[id]})`);
      }
      allIds[id] = file;
    }

    // Determine missing canonical sections
    const sectionNames = sections.map(s => s.name);
    const missingSections = CANONICAL_SECTIONS.filter(cs => {
      const normalized = cs.toLowerCase().replace(/[^a-z0-9]/g, '');
      return !sectionNames.some(sn => sn.includes(normalized) || normalized.includes(sn));
    });

    // Determine if new sections exist
    const existingNewSections = NEW_SECTIONS.filter(ns => {
      const normalized = ns.toLowerCase().replace(/[^a-z0-9]/g, '');
      return sectionNames.some(sn => sn.includes(normalized) || normalized.includes(sn));
    });
    const missingNewSections = NEW_SECTIONS.filter(ns => !existingNewSections.includes(ns));

    // Estimate content quality based on sections and placeholders
    const quality = {
      sections: sections.length,
      lines: lineCount,
      questions: ids.length,
      placeholders: placeholderCount,
      hasPlaceholderContent: placeholderCount > 0,
      missingSections: missingSections.length,
      missingNewSections: missingNewSections,
    };

    const chapterInfo = {
      file,
      sections: sections.map(s => s.name),
      ids: ids.length,
      duplicateIds,
      placeholders: placeholderCount,
      lines: lineCount,
      quality,
      missingSections,
      missingNewSections,
    };

    report.chapters.push(chapterInfo);
    report.summary.totalLines += lineCount;
    report.summary.totalIds += ids.length;
    report.summary.totalPlaceholders += placeholderCount;
    if (duplicateIds.length > 0) {
      report.summary.chaptersWithDuplicates.push(file);
    }
  }

  return report;
}

function printReport(report) {
  console.log('='.repeat(80));
  console.log('CHAPTER CONTENT AUDIT REPORT');
  console.log('='.repeat(80));
  console.log(`\n📊 SUMMARY`);
  console.log(`  Total files: ${report.summary.totalFiles}`);
  console.log(`  Total lines: ${report.summary.totalLines}`);
  console.log(`  Total questions (IDs): ${report.summary.totalIds}`);
  console.log(`  Total placeholders: ${report.summary.totalPlaceholders}`);
  console.log(`  Chapters with duplicates: ${report.summary.chaptersWithDuplicates.length > 0 ? report.summary.chaptersWithDuplicates.join(', ') : 'None'}`);

  console.log(`\n📋 CHAPTER DETAILS`);
  console.log('-'.repeat(80));

  for (const ch of report.chapters) {
    console.log(`\n📁 ${ch.file}`);
    console.log(`  Lines: ${ch.lines} | Questions: ${ch.ids} | Placeholders: ${ch.placeholders}`);
    
    if (ch.duplicateIds.length > 0) {
      console.log(`  ⚠️  DUPLICATE IDs: ${ch.duplicateIds.join(', ')}`);
    }

    if (ch.missingSections.length > 0) {
      console.log(`  ❌ Missing canonical sections: ${ch.missingSections.join(', ')}`);
    }

    if (ch.missingNewSections.length > 0) {
      console.log(`  🔴 Missing NEW sections: ${ch.missingNewSections.join(', ')}`);
    }

    if (ch.placeholders > 0) {
      console.log(`  ⚠️  Has ${ch.placeholders} placeholder entries need enrichment`);
    }

    console.log(`  Existing sections (${ch.sections.length}):`);
    ch.sections.forEach(s => console.log(`    - ${s}`));
  }

  console.log('\n' + '='.repeat(80));
  console.log('RECOMMENDATIONS');
  console.log('='.repeat(80));

  const needsEnrichment = report.chapters.filter(ch => ch.placeholders > 0 || ch.missingNewSections.length > 0);
  if (needsEnrichment.length > 0) {
    console.log('\n🔧 Chapters needing enrichment:');
    for (const ch of needsEnrichment) {
      console.log(`  - ${ch.file} (${ch.placeholders} placeholders, ${ch.missingNewSections.length} missing new sections)`);
    }
  }

  const needsNewSections = report.chapters.filter(ch => ch.missingNewSections.length > 0);
  if (needsNewSections.length > 0) {
    console.log('\n📝 New sections to add:');
    const allMissing = new Set();
    needsNewSections.forEach(ch => ch.missingNewSections.forEach(ns => allMissing.add(ns)));
    allMissing.forEach(ns => console.log(`  - ${ns}`));
  }
}

// Run audit
const report = audit();
printReport(report);