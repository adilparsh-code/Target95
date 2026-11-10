// Static content source: assembles the unified catalog by WRAPPING the existing
// systems. It changes no data and no behaviour; every legacy module keeps
// working exactly as before. A Firestore source (P3) will export the same
// getCatalog() contract.
//
// Chapter identity comes from the explicit table in @/content/identity.mjs.

import { javaChapters as canonicalChapters } from "@/app/data/javaCurriculum";
import { getStudyChapters, resolveStudyChapter } from "@/lib/studyCenter";
import { questionBankQuestions } from "@/lib/questionBank";
import { toUnifiedChapter, toUnifiedQuestion } from "@/content/normalize.mjs";
import { canonicalIdFor, identityFor, quarantineReasonFor } from "@/content/identity.mjs";

const SUBJECT_ID = "java";
const QUESTION_SOURCE = "question-bank";

function buildChapters() {
  const byId = new Map();

  // 1. Canonical javaCurriculum chapters own the identity. Their content comes
  //    from the legacy study chapter named by the identity table (or stub copy).
  for (const canonical of canonicalChapters) {
    const identity = identityFor(canonical.slug);
    const resolved = resolveStudyChapter(canonical.slug);
    byId.set(
      canonical.slug,
      toUnifiedChapter(
        { ...canonical, id: canonical.slug },
        resolved?.studyData,
        {
          aliases: identity?.aliases || [],
          contentSlug: identity?.contentSlug || null,
          subject: SUBJECT_ID,
        },
      ),
    );
  }

  // 2. Study chapters with no canonical identity keep their own slug as id.
  for (const legacy of getStudyChapters()) {
    if (byId.has(legacy.slug) || canonicalIdFor(legacy.slug)) continue;
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

/** Split bank records into live questions and quarantined ones. Nothing is dropped. */
function buildQuestions(aliasIndex) {
  const questions = [];
  const quarantined = [];

  for (const raw of questionBankQuestions) {
    const slug = raw.chapterSlug || raw.chapter;
    const chapterId = aliasIndex.get(slug) || slug;
    const unified = toUnifiedQuestion(raw, { chapterId, source: QUESTION_SOURCE });
    const reason = aliasIndex.has(slug) ? null : quarantineReasonFor(slug);
    if (reason) quarantined.push({ question: unified, reason });
    // Unresolvable and not quarantined: kept so the validator reports an orphan error.
    else questions.push(unified);
  }

  return { questions, quarantined };
}

let cached = null;

/**
 * @returns {{
 *   chapters: import("@/content/schema.mjs").UnifiedChapter[],
 *   questions: import("@/content/schema.mjs").UnifiedQuestion[],
 *   quarantined: {question: import("@/content/schema.mjs").UnifiedQuestion, reason: string}[],
 *   aliasIndex: Map<string, string>,
 * }}
 */
export function getCatalog() {
  if (cached) return cached;
  const chapters = buildChapters();
  const aliasIndex = buildAliasIndex(chapters);
  const { questions, quarantined } = buildQuestions(aliasIndex);
  const counts = questions.reduce((map, question) => map.set(question.chapterId, (map.get(question.chapterId) || 0) + 1), new Map());
  cached = {
    chapters: chapters.map((chapter) => ({ ...chapter, questionCount: counts.get(chapter.id) || 0 })),
    questions,
    quarantined,
    aliasIndex,
  };
  return cached;
}
