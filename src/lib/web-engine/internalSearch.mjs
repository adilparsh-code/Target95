import { buildSearchResponse, normalizeSearchQuery } from "./searchContract.mjs";

const textIncludes = (values, term) => values.filter(Boolean).join(" ").toLowerCase().includes(term);
const scoreFor = (title, term, fallback = 0.55) => {
  const value = String(title || "").toLowerCase();
  if (value === term) return 1;
  if (value.startsWith(term)) return 0.9;
  if (value.includes(term)) return 0.8;
  return fallback;
};
const classNumberFrom = (value) => {
  const id = String(value?.id || value || "");
  return Number(id.match(/(?:cbse-class-|class-)?(9|10|11|12)$/)?.[1] || 0);
};
const classIdFrom = (value) => String(value?.id || value || "");

const CISCE_CLASS_FILTERS = Object.freeze({
  "icse-class-9": { board: "ICSE", class: "ICSE IX" },
  "icse-class-10": { board: "ICSE", class: "ICSE X" },
  "isc-class-11": { board: "ISC", class: "ISC XI" },
  "isc-class-12": { board: "ISC", class: "ISC XII" },
});

const CISCE_SUBJECT_FILTERS = Object.freeze({
  java: ["computer applications", "computer science"],
  "computer-applications": ["computer applications"],
  "computer-science": ["computer science"],
});

function matchesCisceMetadata(chapter, filters) {
  if (!chapter || typeof chapter !== "object") return false;
  const chapterBoard = String(chapter.board || "").toUpperCase();
  const selectedBoard = String(filters.board || "").toLowerCase();
  if (selectedBoard === "cisce" && !["ICSE", "ISC"].includes(chapterBoard)) return false;
  if (selectedBoard === "icse" && chapterBoard !== "ICSE") return false;
  if (selectedBoard === "isc" && chapterBoard !== "ISC") return false;

  const classId = classIdFrom(filters.class);
  const expectedClass = CISCE_CLASS_FILTERS[classId];
  if (classId && (!expectedClass || chapterBoard !== expectedClass.board || chapter.class !== expectedClass.class)) return false;

  const subject = String(filters.subject || "").toLowerCase();
  if (subject) {
    const allowedSubjects = CISCE_SUBJECT_FILTERS[subject];
    const actualSubject = String(chapter.subject || "").toLowerCase();
    if (!allowedSubjects || !allowedSubjects.some((allowed) => actualSubject.includes(allowed))) return false;
  }
  return true;
}

function buildStudyMetadataIndex(chapters = []) {
  const bySlug = new Map();
  const byCanonicalId = new Map();
  for (const chapter of chapters) {
    if (chapter?.slug) bySlug.set(String(chapter.slug), chapter);
    if (chapter?.canonicalId) byCanonicalId.set(String(chapter.canonicalId), chapter);
    if (chapter?.canonicalSlug) bySlug.set(String(chapter.canonicalSlug), chapter);
  }
  return { bySlug, byCanonicalId };
}

/**
 * Build the internal Target95 search adapter from existing first-party sources.
 * Dependencies are injected so this module can be tested without importing app data.
 * Only display-safe fields are copied into the result DTO; source records are never returned.
 */
export function createInternalSearchAdapter(sources) {
  const {
    searchOfficeContent,
    searchStudyContent,
    getStudyChapters,
    searchQuestions,
    getCBSEChapters,
    getCBSEPracticeQuestions,
  } = sources;

  return function searchInternalContent(rawQuery, filters = {}) {
    const parsed = normalizeSearchQuery(rawQuery);
    if (!parsed.ok) return buildSearchResponse({ query: rawQuery });
    const term = parsed.query.toLowerCase();
    const board = String(filters.board || "").toLowerCase();
    const isCBSE = board === "cbse";
    const hasAcademicFilters = Boolean(board || filters.class || filters.subject);
    const classNumber = classNumberFrom(filters.class);
    const subjectCode = String(filters.subject || (classNumber <= 10 ? "402" : "083"));

    const results = [];

    // Office content has no board/class/subject metadata. Exclude it when an
    // academic filter is active rather than leaking unrelated results into a
    // board-specific search.
    if (!hasAcademicFilters) {
      for (const item of searchOfficeContent?.(term) || []) {
        results.push({
          id: item.id,
          type: item.type || "chapter",
          title: item.title,
          snippet: item.description,
          href: item.href,
          score: scoreFor(item.title, term),
        });
      }
    }

    if (isCBSE && classNumber && getCBSEChapters && getCBSEPracticeQuestions) {
      const chapters = getCBSEChapters(classNumber, subjectCode) || [];
      for (const chapter of chapters) {
        if (!textIncludes([chapter.title, chapter.unitTitle, ...(chapter.learningObjectives || [])], term)) continue;
        results.push({
          id: `chapter-${chapter.id || chapter.slug}`,
          type: "chapter",
          title: chapter.title,
          snippet: chapter.unitTitle || "",
          href: `/cbse/class/${classNumber}/subject/${encodeURIComponent(subjectCode)}/unit/${encodeURIComponent(chapter.unitId)}`,
          board: "CBSE",
          class: String(classNumber),
          chapterId: chapter.id || chapter.slug,
          score: scoreFor(chapter.title, term),
        });
      }

      for (const [index, question] of (getCBSEPracticeQuestions(classNumber, subjectCode) || []).entries()) {
        if (!textIncludes([question.title, question.question, question.chapter, question.subject, ...(question.tags || [])], term)) continue;
        results.push({
          id: `cbse-question-${question.id || question.slug || index}`,
          type: "question",
          title: question.title || question.question,
          snippet: [question.chapter, question.difficulty, question.type || question.questionType].filter(Boolean).join(" · "),
          href: `/practice/setup?board=CBSE&class=${classNumber}&subjectCode=${encodeURIComponent(subjectCode)}`,
          board: "CBSE",
          class: String(classNumber),
          chapterId: question.chapterId || question.topicId || null,
          score: scoreFor(question.title || question.question, term),
        });
      }
    } else if (!isCBSE) {
      const studyMetadata = getStudyChapters?.({ board: filters.board, class: filters.class }) || [];
      const study = searchStudyContent?.(term, { board: filters.board, class: filters.class }) || { chapters: [] };
      const index = buildStudyMetadataIndex([...studyMetadata, ...(study.chapters || [])]);
      const metadataFor = (chapter) =>
        index.bySlug.get(String(chapter?.slug || "")) ||
        index.byCanonicalId.get(String(chapter?.canonicalId || "")) ||
        chapter;

      for (const item of study.chapters || []) {
        const chapter = metadataFor(item);
        if (!matchesCisceMetadata(chapter, filters)) continue;
        results.push({
          id: `chapter-${chapter.slug}`,
          type: "chapter",
          title: chapter.title,
          snippet: chapter.studyData?.intro || "",
          href: `/study/${encodeURIComponent(chapter.slug)}`,
          board: chapter.board || null,
          class: chapter.class || null,
          chapterId: chapter.canonicalId || chapter.canonicalSlug || chapter.slug,
          score: scoreFor(chapter.title, term),
        });

        for (const [conceptIndex, concept] of (chapter.studyData?.concepts || []).entries()) {
          if (!String(concept).toLowerCase().includes(term)) continue;
          results.push({
            id: `concept-${chapter.slug}-${conceptIndex}`,
            type: "topic",
            title: concept,
            snippet: `Concept in ${chapter.title}`,
            href: `/study/${encodeURIComponent(chapter.slug)}`,
            board: chapter.board || null,
            class: chapter.class || null,
            chapterId: chapter.canonicalId || chapter.canonicalSlug || chapter.slug,
            score: scoreFor(concept, term),
          });
        }
      }

      for (const question of searchQuestions?.(term) || []) {
        const chapter = metadataFor({
          slug: question.chapterSlugResolved || question.chapterSlug,
          canonicalId: question.chapterId,
        });
        if (!matchesCisceMetadata(chapter, filters)) continue;
        if (question.board && chapter.board && String(question.board).toUpperCase() !== String(chapter.board).toUpperCase()) continue;
        results.push({
          id: `question-${question.id}`,
          type: "question",
          title: question.question,
          snippet: [question.chapterTitle || question.chapterSlug, question.difficulty, question.type].filter(Boolean).join(" · "),
          href: question.chapterSlugResolved ? `/Java/${encodeURIComponent(question.chapterSlugResolved)}` : "/question-bank",
          board: question.board || chapter.board || null,
          class: chapter.class || null,
          chapterId: question.chapterId || null,
          score: scoreFor(question.question, term),
        });
      }
    }

    return buildSearchResponse({ query: parsed.query, internalResults: results });
  };
}
