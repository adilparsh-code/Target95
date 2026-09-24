const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "src", "app", "data", "chapter-content");
const REGISTRY_FILE = path.join(CONTENT_ROOT, "index.js");

const CORE_SECTIONS = [
  "introduction",
  "theoryNotes",
  "examples",
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

// The chapter registry (src/app/data/chapter-content/index.js) is the single
// source of truth for "which file is a chapter record": its own header states
// that the slugs it exports must match the routable slugs. Barrels (index.js
// files), the visuals/ asset registry and anything the registry does not import
// are still scanned for placeholders and still listed in the report, but the
// chapter content contract (introduction/theoryNotes/examples plus unique id and
// slug) is enforced for the registered chapter records only. Unregistered
// chapter-like files are reported explicitly so nothing can hide here.
function registeredChapterFiles() {
  if (!fs.existsSync(REGISTRY_FILE)) return [];
  const source = stripComments(fs.readFileSync(REGISTRY_FILE, "utf8"));
  const specifiers = [...source.matchAll(/\bfrom\s+["'](\.[^"']+)["']/g)].map((match) => match[1]);
  const resolved = [];
  for (const specifier of specifiers) {
    const base = path.resolve(path.dirname(REGISTRY_FILE), specifier);
    const candidate = [base, `${base}.js`, path.join(base, "index.js")]
      .find((entry) => fs.existsSync(entry) && fs.statSync(entry).isFile());
    if (candidate) resolved.push(candidate);
  }
  return [...new Set(resolved)];
}

function isInfrastructureFile(file) {
  const relative = path.relative(CONTENT_ROOT, file).replaceAll(path.sep, "/");
  return path.basename(file) === "index.js" || relative.startsWith("visuals/");
}

const registeredFiles = registeredChapterFiles();
const registeredSet = new Set(registeredFiles);

const files = walk(CONTENT_ROOT);
const report = {
  generatedAt: new Date().toISOString(),
  totalFiles: files.length,
  registeredChapters: registeredFiles.map((file) => path.relative(ROOT, file)),
  chapters: [],
};

const registeredIdLocations = new Map();
const registeredSlugLocations = new Map();
const unregisteredChapterLikeFiles = [];

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const cleanSource = stripComments(source);
  const relative = path.relative(ROOT, file);
  const registered = registeredSet.has(file);
  const sections = declaredSections(cleanSource);
  const ids = [...cleanSource.matchAll(/\bid\s*:\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);
  const slugMatch = cleanSource.match(/["']?slug["']?\s*:\s*["'`]([^"'`]+)["'`]/);

  if (registered) {
    ids.forEach((id) => {
      if (!registeredIdLocations.has(id)) registeredIdLocations.set(id, []);
      registeredIdLocations.get(id).push(relative);
    });
    if (slugMatch) {
      const slug = slugMatch[1];
      if (!registeredSlugLocations.has(slug)) registeredSlugLocations.set(slug, []);
      registeredSlugLocations.get(slug).push(relative);
    }
  } else if (!isInfrastructureFile(file)) {
    unregisteredChapterLikeFiles.push(relative);
  }

  report.chapters.push({
    file: relative,
    registered,
    lines: source.split(/\r?\n/).length,
    ids: ids.length,
    placeholders: findPlaceholders(source),
    missingCoreSections: CORE_SECTIONS.filter((key) => !sections[key]),
    emptyCoreSections: CORE_SECTIONS.filter((key) => looksEmptySection(cleanSource, key)),
    missingOptionalSections: ACADEMIC_SECTIONS.filter((key) => !CORE_SECTIONS.includes(key) && !sections[key]),
  });
}

const registeredChapters = report.chapters.filter((chapter) => chapter.registered);
const unregisteredChapters = report.chapters.filter((chapter) => !chapter.registered);

const duplicateIds = [...registeredIdLocations.entries()]
  .filter(([, locations]) => locations.length > 1)
  .map(([id, locations]) => ({ id, locations }));

const duplicateSlugs = [...registeredSlugLocations.entries()]
  .filter(([, locations]) => locations.length > 1)
  .map(([slug, locations]) => ({ slug, locations }));

report.summary = {
  totalFiles: report.totalFiles,
  registeredChapterCount: registeredChapters.length,
  unregisteredFileCount: unregisteredChapters.length,
  filesWithMissingCoreSections: registeredChapters.filter((c) => c.missingCoreSections.length).length,
  filesWithEmptyCoreSections: registeredChapters.filter((c) => c.emptyCoreSections.length).length,
  filesWithPlaceholders: report.chapters.filter((c) => c.placeholders.length).length,
  duplicateIdCount: duplicateIds.length,
  duplicateSlugCount: duplicateSlugs.length,
};
report.duplicateIds = duplicateIds;
report.duplicateSlugs = duplicateSlugs;
report.unregisteredFiles = unregisteredChapters.map((chapter) => chapter.file);
report.unregisteredChapterLikeFiles = unregisteredChapterLikeFiles;

console.log(JSON.stringify(report, null, 2));

if (!registeredFiles.length) {
  console.error("audit-chapters: no chapter record could be resolved from src/app/data/chapter-content/index.js; refusing to report a passing audit.");
  process.exitCode = 1;
}

if (
  report.summary.filesWithMissingCoreSections ||
  report.summary.filesWithEmptyCoreSections ||
  report.summary.filesWithPlaceholders ||
  report.summary.duplicateIdCount ||
  report.summary.duplicateSlugCount
) {
  process.exitCode = 1;
}
