// Static content source (P0): assembles the unified catalog by WRAPPING the
// existing systems. It changes no data and no behaviour; every legacy module
// keeps working exactly as before. A Firestore source (P3) will export the same
// getCatalog() contract.

import { javaChapters as canonicalChapters } from "@/app/data/javaCurriculum";
import { getStudyChapters, resolveStudyChapter } from "@/lib/studyCenter";
import { CANONICAL_TO_STUDY_SLUG } from "@/lib/studyChapterIdentity";
import { questionBankQuestions } from "@/lib/questionBank";
import { chapterQuestionBankBySlug } from "@/lib/javaChapterQuestionBank";
import { buildQuestionChapterAssociations, toUnifiedChapter, toUnifiedQuestion } from "@/content/normalize.mjs";

const SUBJECT_ID = "java";
const QUESTION_SOURCE = "question-bank";

function buildChapters() {
  const canonicalSlugs = new Set(canonicalChapters.map((chapter) => chapter.slug));
  const byId = new Map();
  const claimedAliases = new Set();

  // 1. Canonical javaCurriculum chapters own the identity. Their content comes
  //    from the legacy study chapter they are mapped onto (or stub copy).
  for (const canonical of canonicalChapters) {
    const resolved = resolveStudyChapter(canonical.slug);
    const studySlug = CANONICAL_TO_STUDY_SLUG[canonical.slug] || null;
    // Several canonical chapters map onto one legacy study slug. Only the first
    // keeps it as an alias so slug resolution stays unambiguous; the rest expose
    // it as contentSlug and the validator reports the shared content.
    const ownsAlias = studySlug && !canonicalSlugs.has(studySlug) && !claimedAliases.has(studySlug);
    if (ownsAlias) claimedAliases.add(studySlug);
    byId.set(
      canonical.slug,
      toUnifiedChapter(
        { ...canonical, id: canonical.slug },
        resolved?.studyData,
        { aliases: ownsAlias ? [studySlug] : [], contentSlug: studySlug, subject: SUBJECT_ID },
      ),
    );
  }

  // 2. Legacy study chapters that have no canonical twin keep their own identity.
  for (const legacy of getStudyChapters()) {
    const claimed = byId.has(legacy.slug) || claimedAliases.has(legacy.slug);
    if (claimed) continue;
    byId.set(
      legacy.slug,
      toUnifiedChapter({ ...legacy, id: legacy.slug }, legacy.studyData, { contentSlug: legacy.slug, subject: SUBJECT_ID }),
    );
  }

  return [...byId.values()];
}

function buildAliasIndex(chapters) {
  const index = new Map();
  for (const chapter of chapters) {
    index.set(chapter.slug, chapter.id);
    for (const alias of chapter.aliases) if (!index.has(alias)) index.set(alias, chapter.id);
  }
  return index;
}

function buildQuestions(aliasIndex) {
  const chapterIdsByQuestionId = buildQuestionChapterAssociations(chapterQuestionBankBySlug, aliasIndex);

  return questionBankQuestions.map((raw) => {
    const slug = raw.chapterSlug || raw.chapter;
    // Unresolvable slugs are kept as-is so the validator reports them as orphans
    // instead of the engine silently dropping student-visible questions.
    const chapterId = aliasIndex.get(slug) || slug;
    const chapterIds = chapterIdsByQuestionId.get(String(raw.id)) || [chapterId];
    return toUnifiedQuestion(raw, { chapterId, chapterIds, source: QUESTION_SOURCE });
  });
}

let cached = null;

/** @returns {{chapters: import("@/content/schema.mjs").UnifiedChapter[], questions: import("@/content/schema.mjs").UnifiedQuestion[], aliasIndex: Map<string,string>}} */
export function getCatalog() {
  if (cached) return cached;
  const chapters = buildChapters();
  const aliasIndex = buildAliasIndex(chapters);
  const questions = buildQuestions(aliasIndex);
  const counts = new Map();
  for (const question of questions) {
    const chapterIds = question.chapterIds || [question.chapterId];
    for (const chapterId of new Set(chapterIds)) {
      counts.set(chapterId, (counts.get(chapterId) || 0) + 1);
    }
  }
  cached = {
    chapters: chapters.map((chapter) => ({ ...chapter, questionCount: counts.get(chapter.id) || 0 })),
    questions,
    aliasIndex,
  };
  return cached;
}
