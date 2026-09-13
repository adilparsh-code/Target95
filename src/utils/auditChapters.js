import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "src", "app", "data", "chapter-content");

const SECTION_KEYS = [
  "introduction", "theoryNotes", "syntax", "examples", "dryRun",
  "outputBasedQuestions", "errorFindingQuestions", "fillInTheBlanks",
  "mcqs", "trueFalse", "shortAnswerQuestions", "longAnswerQuestions",
  "programmingQuestions", "challengeProblems", "previousYearQuestions",
  "aiVivaQuestions", "practiceTest", "chapterSummary", "revisionNotes",
  "cheatsheet", "interviewQuestions", "examTricks", "assertionReason",
  "debugTheCode", "caseStudyQuestions", "mixedPracticeSets",
  "rapidRevisionQuestions",
];

const PLACEHOLDER_PATTERNS = [
  /^question\\s*\\d+$/i, /^viva\\s*question\\s*\\d+$/i,
  /^key\\s+point\\s+about\\b/i, /^key\\s+point\\s*\\d+$/i,
  /^generic\\s+(?:skill|note|key point|pitfall|pattern)\\b/i,
  /placeholder/i, /content\\s+for\\s+(?:note|question)/i,
  /^answer$/i, /^explanation$/i, /coming\\s+soon/i,
  /will\\s+be\\s+added/i, /available\\s+soon/i,
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith(".js") ? [full] : [];
  });
}

function isPlaceholder(value) {
  if (typeof value !== "string") return false;
  const text = value.trim();
  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(text));
}

function scanValue(value, location, findings) {
  if (typeof value === "string") {
    if (isPlaceholder(value)) findings.push({ location, value });
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => scanValue(item, `${location}[${index}]`, findings));
    return;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => scanValue(item, `${location}.${key}`, findings));
  }
}

function loadModule(file) {
  const source = fs.readFileSync(file, "utf8");
  // This audit intentionally performs static checks rather than importing chapter
  // modules, so it remains safe to run in CI even when a chapter has UI-only imports.
  return source;
}

const files = walk(CONTENT_ROOT);
const report = {
  generatedAt: new Date().toISOString(),
  totalFiles: files.length,
  sections: SECTION_KEYS,
  chapters: [],
};

for (const file of files) {
  const source = loadModule(file);
  const relative = path.relative(ROOT, file);
  const placeholders = [];
  for (const pattern of PLACEHOLDER_PATTERNS) {
    const matches = source.match(new RegExp(pattern.source, "gim"));
    if (matches) matches.forEach((value) => placeholders.push(value.trim()));
  }

  const sectionPresence = Object.fromEntries(
    SECTION_KEYS.map((key) => [key, new RegExp(`\\b${key}\\s*:`).test(source)])
  );

  const ids = [...source.matchAll(/\\bid\\s*:\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];

  report.chapters.push({
    file: relative,
    lines: source.split(/\\r?\\n/).length,
    ids: ids.length,
    duplicateIds,
    placeholders: [...new Set(placeholders)],
    missingSections: SECTION_KEYS.filter((key) => !sectionPresence[key]),
  });
}

const missing = report.chapters.filter((chapter) => chapter.missingSections.length);
const placeholderFiles = report.chapters.filter((chapter) => chapter.placeholders.length);
const duplicateFiles = report.chapters.filter((chapter) => chapter.duplicateIds.length);

console.log(JSON.stringify({
  ...report,
  summary: {
    totalFiles: report.totalFiles,
    filesWithMissingSections: missing.length,
    filesWithPlaceholders: placeholderFiles.length,
    filesWithDuplicateIds: duplicateFiles.length,
  },
}, null, 2));

if (placeholderFiles.length || duplicateFiles.length) process.exitCode = 1;
