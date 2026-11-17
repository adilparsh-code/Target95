import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateChapterRecord } from '../src/lib/boardprepContentSchema.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve('/workspace/chats/e416fc825b754c70b52799ac');

const CHAPTER_DIR = join(ROOT, 'src/app/data/boardprep/content/icse/class-9/biology/chapters');
const SUBJECT_PATH = join(ROOT, 'src/app/data/boardprep/content/icse/class-9/biology/subject.json');

const EXPECTED_QUESTIONS_PER_CHAPTER = 12;
const EXPECTED_CHAPTERS = 11;

const CHAPTER_SLUGS = [
  'the-cell',
  'tissues',
  'flower',
  'pollination-and-fertilisation',
  'seeds-and-germination',
  'respiration-in-plants',
  'absorption-by-roots',
  'transpiration',
  'diversity-in-animal-kingdom',
  'economic-importance-of-bacteria-and-fungi',
  'nutrition',
];

const BOARD = 'icse';
const CLASS = 'class-9';
const SUBJECT = 'biology';

function biologyChapterOptions() {
  return {
    expectedQuestions: EXPECTED_QUESTIONS_PER_CHAPTER,
    requireLearningOutcomes: true,
    requireAssessment: true,
    strictMcq: true,
  };
}

function chapterTypeCounts(chapter) {
  const counts = new Map();
  if (!chapter || !Array.isArray(chapter.questions)) return counts;
  for (const question of chapter.questions) {
    const t = question.type || 'unknown';
    counts.set(t, (counts.get(t) || 0) + 1);
  }
  return counts;
}

function finalReport(chapterSlug, meta, chapter, issues) {
  const counts = chapterTypeCounts(chapter);
  return {
    ok: issues.length === 0,
    slug: chapterSlug,
    registry: meta,
    chapterId: chapter?.id,
    title: chapter?.title,
    questions: chapter?.questions?.length ?? 0,
    typeCounts: Object.fromEntries(counts),
    errors: issues,
  };
}

function chapterIsConsistentWithSyllabus(chapter, slug, meta) {
  const issues = [];
  if (!chapter?.overview?.intro) {
    issues.push({
      level: 'warning',
      code: 'biology.overview-missing',
      message: `Chapter ${meta?.id ?? slug} has no overview intro to confirm the syllabus frame.`,
    });
  }
  if (!chapter?.keyPoints || chapter.keyPoints.length === 0) {
    issues.push({
      level: 'warning',
      code: 'biology.key-points-missing',
      message: `Chapter ${meta?.id ?? slug} has no learn summary points.`,
    });
  }
  return issues;
}

function loadSubjectRegistry() {
  if (!existsSync(SUBJECT_PATH)) {
    return null;
  }
  const subject = JSON.parse(readFileSync(SUBJECT_PATH, 'utf8'));
  const registryChapterMap = new Map();
  for (const section of subject.sections || []) {
    for (const group of section.groups || []) {
      for (const chapter of group.chapters || []) {
        registryChapterMap.set(chapter.slug, chapter);
      }
    }
  }
  return registryChapterMap;
}

function chapterBySlugFromRegistry(registry, chapterSlug) {
  if (!registry) return undefined;
  return registry.get(chapterSlug);
}

function loadChapter(chapterSlug) {
  const path = join(CHAPTER_DIR, `${chapterSlug}.json`);
  if (!existsSync(path)) {
    return { error: { level: 'error', code: 'biology.missing-chapter-file', message: `Cannot find ${path}.` } };
  }
  let chapter;
  try {
    chapter = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    return { error: { level: 'error', code: 'biology.bad-chapter-file', message: `Cannot parse ${path}: ${error.message}.` } };
  }
  if (!chapter || typeof chapter !== 'object') {
    return { error: { level: 'error', code: 'biology.missing-chapter-file', message: `${path} is not a JSON object.` } };
  }
  return { chapter };
}

function runChapterChecks(chapterSlug, registry) {
  const meta = chapterBySlugFromRegistry(registry, chapterSlug);

  // When a chapter has not been registered yet, still validate the file against
  // the BoardPrep schema and Biology-specific checks, but report the missing
  // registry entry as a pending-removal item rather than a hard blocker. This
  // keeps Chapter 1 checkable without requiring immediate subject publication.
  if (!meta) {
    const loaded = loadChapter(chapterSlug);
    if (loaded.error) {
      return finalReport(chapterSlug, undefined, undefined, [loaded.error]);
    }
    const chapter = loaded.chapter;
    const issues = [
      ...chapterIsConsistentWithSyllabus(chapter, chapterSlug, undefined),
      {
        level: 'info',
        code: 'biology.registry-entry-pending',
        message: `Registry entry for ${chapterSlug} is not yet published; file validated against the schema only.`,
      },
      ...validateChapterRecord(chapter, biologyChapterOptions()),
    ];
    return finalReport(chapterSlug, meta, chapter, issues);
  }

  const loaded = loadChapter(chapterSlug);
  if (loaded.error) {
    return finalReport(chapterSlug, meta, undefined, [loaded.error]);
  }

  const chapter = loaded.chapter;
  const issues = [
    ...chapterIsConsistentWithSyllabus(chapter, chapterSlug, meta),
    ...validateChapterRecord(chapter, biologyChapterOptions()),
  ];
  return finalReport(chapterSlug, meta, chapter, issues);
}

function main() {
  const registry = loadSubjectRegistry();
  if (!registry) {
    console.error(`Biology subject registry not found at ${SUBJECT_PATH}`);
    process.exit(1);
  }

  const timeStart = Date.now();
  const results = CHAPTER_SLUGS.map((slug) => runChapterChecks(slug, registry));
  const timeEnd = Date.now();

  const totalQuestions = results.reduce((sum, r) => sum + (r.questions || 0), 0);
  const passed = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok).length;

  const blockedByMissingFiles = results.filter((r) =>
    r.errors?.some((e) => e.code === 'biology.missing-chapter-file' || e.code === 'biology.bad-chapter-file'),
  );
  const pendingRegistryEntries = results.filter((r) =>
    r.errors?.some((e) => e.code === 'biology.registry-entry-pending'),
  );

  const comprehensiveChecks = results.filter((r) => r.ok);

  const typePool = new Map();
  for (const r of comprehensiveChecks) {
    for (const [type, count] of Object.entries(r.typeCounts || {})) {
      typePool.set(type, (typePool.get(type) || 0) + count);
    }
  }

  console.log('ICSE Class IX Biology — chapter-level validation');
  console.log('------------------------------------------------');
  console.log(`Chapters validated: ${results.length}`);
  console.log(`Passed:            ${passed}`);
  console.log(`Failed:            ${failed}`);
  console.log(`Total questions:   ${totalQuestions} (target ${EXPECTED_CHAPTERS * EXPECTED_QUESTIONS_PER_CHAPTER})`);
  console.log(`Validated in:      ${timeEnd - timeStart}ms`);
  console.log('');
  console.log('Question type mix across validated chapters:');
  if (typePool.size) {
    for (const [type, count] of typePool) {
      console.log(`  ${type}: ${count}`);
    }
  } else {
    console.log('  (none yet)');
  }
  console.log('');

  console.log('Registry integration status:');
  if (pendingRegistryEntries.length) {
    console.log(`  pending registry entries: ${pendingRegistryEntries.length}`);
    for (const r of pendingRegistryEntries) {
      console.log(`    ${r.slug}`);
    }
  } else {
    console.log('  pending registry entries: 0');
  }
  console.log('');

  if (blockedByMissingFiles.length) {
    console.error('BLOCKED by missing chapter files:');
    for (const r of blockedByMissingFiles) {
      console.error(`  ${r.slug}`);
      for (const issue of r.errors) {
        console.error(`    [${issue.level}] ${issue.code}: ${issue.message}`);
      }
    }
    console.error('');
  }

  for (const r of results) {
    if (!r.ok) {
      console.error(`FAILED: ${r.slug}`);
      for (const issue of r.errors) {
        console.error(`  [${issue.level}] ${issue.code}: ${issue.message}`);
      }
      console.error('');
    }
  }

  if (blockedByMissingFiles.length) {
    console.error(
      `Biology validator: ${blockedByMissingFiles.length} of ${EXPECTED_CHAPTERS} chapters missing files.`,
      'Complete the chapter files before the subject can be published.',
    );
    process.exit(1);
  }

  if (comprehensiveChecks.length === EXPECTED_CHAPTERS && totalQuestions !== EXPECTED_CHAPTERS * EXPECTED_QUESTIONS_PER_CHAPTER) {
    console.error(
      `Biology validator: expected ${EXPECTED_CHAPTERS * EXPECTED_QUESTIONS_PER_CHAPTER} questions`,
      `across all chapters, found ${totalQuestions}.`,
    );
    process.exit(1);
  }

  if (comprehensiveChecks.length < EXPECTED_CHAPTERS) {
    console.log(
      `Biology validator: ${comprehensiveChecks.length}/${EXPECTED_CHAPTERS} chapters are file-valid.`,
      `Questions so far: ${totalQuestions}/${EXPECTED_CHAPTERS * EXPECTED_QUESTIONS_PER_CHAPTER}.`,
    );
    console.log('Biology validator: continuing. Chapters pending file authoring:');
    for (const r of results) {
      if (!r.ok) {
        const isPending = r.errors?.some((e) => e.code === 'biology.registry-entry-pending');
        if (isPending && r.chapterId) {
          console.log(`  ${r.slug} (${r.chapterId}) — file valid, registry pending`);
        }
      }
    }
    process.exit(0);
  }

  // Full-subject gate: every chapter file-valid and every file-valid chapter also
  // published in the registry. This is the real publishable state.
  const allPublishedAndFileValid = results.every((r) =>
    r.ok && r.registry && r.registry.status === 'published',
  );
  if (!allPublishedAndFileValid) {
    console.log(
      'Biology validator: all 11 chapter files are valid, but not all are published in',
      'the subject registry yet. Continue to the next checkpoint without changing the registry.',
    );
    process.exit(0);
  }

  console.log(
    `Biology validator: ALL ${EXPECTED_CHAPTERS} chapters validated and published.`,
    `Total questions ${totalQuestions}.`,
  );

  const jsonReport = {
    board: BOARD,
    class: CLASS,
    subject: SUBJECT,
    totals: {
      chapters: results.length,
      fileValid: comprehensiveChecks.length,
      publishedAndFileValid: allPublishedAndFileValid ? EXPECTED_CHAPTERS : comprehensiveChecks.length,
      questions: totalQuestions,
    },
    typeCounts: Object.fromEntries(typePool),
    chapters: results,
    runtimeMs: timeEnd - timeStart,
  };
  const reportPath = join(ROOT, 'artifacts/biology/chapter-validation-report.json');
  mkdirSync(join(ROOT, 'artifacts/biology'), { recursive: true });
  writeFileSync(reportPath, JSON.stringify(jsonReport, null, 2) + '\n', 'utf8');
  console.log(`Biology chapter report written to ${reportPath}`);
  console.log(`Subject registry chapters: ${registry.size} (expected ${EXPECTED_CHAPTERS})`);
}

main();
