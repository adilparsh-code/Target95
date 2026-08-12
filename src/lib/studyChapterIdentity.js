import { javaChapters as canonicalChapters } from "@/app/data/javaCurriculum";

/**
 * Explicit compatibility aliases for the legacy study-center slugs.
 *
 * The legacy URL is intentionally retained. The value on the right is the
 * canonical identity from javaCurriculum.js, not a redirect or content move.
 */
const LEGACY_TO_CANONICAL_SLUG = Object.freeze({
  introduction: "introduction-to-java",
  "variables-data-types": "data-types-variables",
  operators: "operators",
  "if-else": "conditional-statements",
  loops: "iterative-statements",
  methods: "methods",
  arrays: "arrays",
  strings: "strings",
  constructor: "constructors",
});

const canonicalBySlug = new Map(canonicalChapters.map((chapter) => [chapter.slug, chapter]));

function canonicalSlugFor(legacySlug) {
  const explicitSlug = LEGACY_TO_CANONICAL_SLUG[legacySlug] || legacySlug;
  return canonicalBySlug.has(explicitSlug) ? explicitSlug : null;
}

/**
 * Enrich a study-center chapter with canonical identity and metadata while
 * preserving the legacy slug/title/content fields consumed by /study.
 */
export function adaptStudyChapterIdentity(studyChapter) {
  if (!studyChapter || typeof studyChapter !== "object") return studyChapter;

  const legacySlug = studyChapter.slug || null;
  const canonicalSlug = canonicalSlugFor(legacySlug);
  const canonicalChapter = canonicalSlug ? canonicalBySlug.get(canonicalSlug) : null;

  if (!canonicalChapter) {
    return {
      ...studyChapter,
      legacySlug,
      canonicalSlug: null,
      canonicalChapterId: null,
      canonicalTitle: null,
      canonicalMetadata: null,
      identitySource: "legacy",
    };
  }

  return {
    ...studyChapter,
    legacySlug,
    canonicalSlug: canonicalChapter.slug,
    canonicalChapterId: canonicalChapter.id,
    canonicalTitle: canonicalChapter.title,
    canonicalMetadata: {
      board: canonicalChapter.board,
      class: canonicalChapter.class,
      subject: canonicalChapter.subject,
      syllabusUnit: canonicalChapter.syllabusUnit,
      topics: canonicalChapter.topics,
    },
    identitySource: "javaCurriculum",
  };
}

export function getCanonicalSlugForStudySlug(studySlug) {
  return canonicalSlugFor(studySlug);
}

export function getUnmappedStudySlugs(studyChapters = []) {
  return studyChapters
    .map((chapter) => chapter?.slug)
    .filter((slug) => slug && !canonicalSlugFor(slug));
}

export { LEGACY_TO_CANONICAL_SLUG };
