const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "src", "app", "data", "chapter-content");

const CORE_SECTIONS = [
  "introduction",
  "theoryNotes",
  "examples",
  "chapterSummary",
  "revisionNotes",
];

const ACADEMIC_SECTIONS = [
  ...CORE_SECTIONS,
  "syntax", "dryRun", "outputBasedQuestions", "errorFindingQuestions",
  "fillInTheBlanks", "mcqs", "trueFalse", "shortAnswerQuestions",
  "longAnswerQuestions", "programmingQuestions", "challengeProblems",
  "previousYearQuestions", "aiVivaQuestions", "practiceTest", "cheatsheet",
  "interviewQuestions", "examTricks", "assertionReason", "debugTheCode",
  "caseStudyQuestions", "mixedPracticeSets", "rapidRevisionQuestions",
];

const PLACEHOLDER_PATTERNS = [
  /\bquestion\s*\d+\b/i,
  /\bviva\s*question\s*\d+\b/i,
  /^key\s+point\s+about\b/i,
  /^key\s+point\s*\d+$/i,
  /^generic\s+(?:skill|note|key point|pitfall|pattern)\b/i,
  /\bplaceholder\b/i,
  /\bcontent\s+for\s+(?:note|question)\b/i,
  /^answer$/i,
  /^explanation$/i,
  /\bcoming\s+soon\b/i,
  /\bwill\s+be\s+added\b/i,
  /\bavailable\s+soon\b/i,
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith(".js") ? [full] : [];
  });
}

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|\s)\/\/.*$/gm, "$1");
}

function propertyRegex(key) {
  return new RegExp(`(?:^|[,{\\n])\\s*(?:["']${key}["']|${key})\\s*:`);
}

function declaredSections(source) {
  return Object.fromEntries(
    ACADEMIC_SECTIONS.map((key) => [key, propertyRegex(key).test(source)])
  );
}

function looksEmptySection(source, key) {
  const match = source.match(new RegExp(`(?:["']${key}["']|\\b${key})\\s*:\\s*([\\[\\{])`));
  if (!match) return false;
  const open = match[1];
  const close = open === "[" ? "]" : "}";
  const start = match.index + match[0].length;
  const tail = source.slice(start, start + 500);
  return new RegExp(`^\\s*${close}`).test(tail);
}

function findPlaceholders(source) {
  const findings = [];
  const lines = source.split(/\r?\n/);
  lines.forEach((line, index) => {
    const text = line.trim();
    if (!text || text.startsWith("//") || text.startsWith("/*") || text.startsWith("*") || text.startsWith("*/")) return;
    if (PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(text))) {
      findings.push({ line: index + 1, value: text.slice(0, 240) });
    }
  });
  return findings;
}

const files = walk(CONTENT_ROOT);
const report = {
  generatedAt: new Date().toISOString(),
  totalFiles: files.length,
  chapters: [],
};

const allIds = new Map();

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const cleanSource = stripComments(source);
  const relative = path.relative(ROOT, file);
  const sections = declaredSections(cleanSource);
  const ids = [...cleanSource.matchAll(/\bid\s*:\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);

  ids.forEach((id) => {
    if (!allIds.has(id)) allIds.set(id, []);
    allIds.get(id).push(relative);
  });

  report.chapters.push({
    file: relative,
    lines: source.split(/\r?\n/).length,
    ids: ids.length,
    placeholders: findPlaceholders(source),
    missingCoreSections: CORE_SECTIONS.filter((key) => !sections[key]),
    emptyCoreSections: CORE_SECTIONS.filter((key) => looksEmptySection(cleanSource, key)),
    missingOptionalSections: ACADEMIC_SECTIONS.filter((key) => !CORE_SECTIONS.includes(key) && !sections[key]),
  });
}

const duplicateIds = [...allIds.entries()]
  .filter(([, locations]) => locations.length > 1)
  .map(([id, locations]) => ({ id, locations }));

report.summary = {
  totalFiles: report.totalFiles,
  filesWithMissingCoreSections: report.chapters.filter((c) => c.missingCoreSections.length).length,
  filesWithEmptyCoreSections: report.chapters.filter((c) => c.emptyCoreSections.length).length,
  filesWithPlaceholders: report.chapters.filter((c) => c.placeholders.length).length,
  duplicateIdCount: duplicateIds.length,
};
report.duplicateIds = duplicateIds;

console.log(JSON.stringify(report, null, 2));

if (
  report.summary.filesWithMissingCoreSections ||
  report.summary.filesWithEmptyCoreSections ||
  report.summary.filesWithPlaceholders ||
  report.summary.duplicateIdCount
) {
  process.exitCode = 1;
}
