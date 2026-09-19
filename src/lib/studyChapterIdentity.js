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

/**
 * Reverse compatibility map: a canonical javaCurriculum slug -> the legacy
 * study-center slug whose rich chapter-content / studyData should be reused.
 *
 * The canonical runtime slugs (javaCurriculum) are the ones the /Java chapter
 * catalog, the /Java/[chapter]/question/[id] route and the "My Learning"
 * roadmap emit. The rich content and study notes are still keyed by the
 * legacy study slugs, so this map keeps every canonical /Java chapter link
 * resolvable instead of 404-ing.
 */
export const CANONICAL_TO_STUDY_SLUG = Object.freeze({
  "introduction-to-java": "introduction",
  "data-types-variables": "variables-data-types",
  operators: "operators",
  "input-in-java": "data-processing-in-java",
  if: "if-else",
  "if-else": "if-else",
  "nested-if": "if-else",
  switch: "if-else",
  "for-loop": "loops",
  "while-loop": "loops",
  "do-while-loop": "loops",
  methods: "methods",
  "arrays-1d": "arrays",
  "arrays-2d": "arrays",
  strings: "strings",
  "classes-objects": "class-as-basis-of-computation",
  encapsulation: "class-as-basis-of-computation",
  constructors: "constructor",
  inheritance: "class-as-basis-of-computation",
});

/** Resolve a canonical javaCurriculum slug to the legacy study slug. */
export function studySlugForCanonical(slug) {
  return CANONICAL_TO_STUDY_SLUG[slug] || slug;
}

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
