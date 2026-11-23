import { buildSearchResponse, normalizeSearchQuery } from "./searchContract.mjs";

const textIncludes = (values, term) => values.filter(Boolean).join(" ").toLowerCase().includes(term);
const scoreFor = (title, term, fallback = 0.55) => {
  const value = String(title || "").toLowerCase();
  if (value === term) return 1;
  if (value.startsWith(term)) return 0.9;
  if (value.includes(term)) return 0.8;
  return fallback;
};
const toBoardId = (board) => (String(board || "").toUpperCase() === "CBSE" ? "cbse" : "cisce");
const classNumberFrom = (value) => Number(String(value?.id || value || "").match(/(9|10|11|12)$/)?.[1] || 0);

/**
 * Build the internal Target95 search adapter from existing first-party sources.
 * Dependencies are injected so this module can be tested without importing app data.
 * Only display-safe fields are copied into the result DTO; source records are never returned.
 */
export function createInternalSearchAdapter(sources) {
  const {
    searchOfficeContent,
    searchStudyContent,
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
    const classNumber = classNumberFrom(filters.class);
    const subjectCode = String(filters.subject || (classNumber <= 10 ? "402" : "083"));

    const results = [];

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
    } else {
      const study = searchStudyContent?.(term, { board: filters.board, class: filters.class }) || { chapters: [] };
      for (const chapter of study.chapters || []) {
        results.push({
          id: `chapter-${chapter.slug}`,
          type: "chapter",
          title: chapter.title,
          snippet: chapter.studyData?.intro || "",
          href: `/study/${encodeURIComponent(chapter.slug)}`,
          board: filters.board || null,
          class: filters.class?.id || filters.class || null,
          chapterId: chapter.canonicalId || chapter.slug,
          score: scoreFor(chapter.title, term),
        });

        for (const [index, concept] of (chapter.studyData?.concepts || []).entries()) {
          if (!String(concept).toLowerCase().includes(term)) continue;
          results.push({
            id: `concept-${chapter.slug}-${index}`,
            type: "topic",
            title: concept,
            snippet: `Concept in ${chapter.title}`,
            href: `/study/${encodeURIComponent(chapter.slug)}`,
            board: filters.board || null,
            class: filters.class?.id || filters.class || null,
            chapterId: chapter.canonicalId || chapter.slug,
            score: scoreFor(concept, term),
          });
        }
      }

      for (const question of searchQuestions?.(term) || []) {
        if (filters.board && toBoardId(question.board) !== board) continue;
        results.push({
          id: `question-${question.id}`,
          type: "question",
          title: question.question,
          snippet: [question.chapterTitle || question.chapterSlug, question.difficulty, question.type].filter(Boolean).join(" · "),
          href: question.chapterSlugResolved ? `/Java/${encodeURIComponent(question.chapterSlugResolved)}` : "/question-bank",
          board: question.board || null,
          chapterId: question.chapterId || null,
          score: scoreFor(question.question, term),
        });
      }
    }

    return buildSearchResponse({ query: parsed.query, internalResults: results });
  };
}
