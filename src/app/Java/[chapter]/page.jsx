import { notFound } from "next/navigation";
import StudyChapter from "../../components/study/StudyChapter";
import { resolveStudyChapter, getStudyChapters } from "@/lib/studyCenter";
import { getMarkdownChapterContent } from "@/lib/markdownContent";
import getQuestionBankChapter from "@/lib/questionBankAdapter";
import { getChapterBySlug as getRichChapterBySlug } from "../../data/chapter-content";
import { javaChapters as canonicalChapters } from "../../data/javaCurriculum";

export function generateStaticParams() {
  const chapters = getStudyChapters() || [];
  // Pre-render every legacy study slug AND every canonical javaCurriculum slug
  // so links emitted from the /Java catalog and the My Learning roadmap build.
  const slugs = new Set();
  chapters.forEach((chapter) => { if (chapter && chapter.slug) slugs.add(String(chapter.slug)); });
  (canonicalChapters || []).forEach((chapter) => { if (chapter && chapter.slug) slugs.add(String(chapter.slug)); });
  return [...slugs].map((chapter) => ({ chapter }));
}

function toJsonString(value) {
  if (value == null) return null;
  try {
    const serialized = JSON.stringify(value);
    return serialized == null ? null : serialized;
  } catch {
    return null;
  }
}

// Map a request slug onto the key used by the rich chapter-content registry.
// The registry still uses the legacy study slugs (e.g. "constructor", not
// "constructors"), so canonical request slugs must be normalised first.
function contentSlugFor(slug) {
  if (slug === "constructors") return "constructor";
  if (slug === "introduction-to-java") return "introduction";
  return slug;
}

function getChapterClientContent(slug) {
  const contentSlug = contentSlugFor(slug);
  const richChapterJson = toJsonString(getRichChapterBySlug(contentSlug));
  if (richChapterJson) return richChapterJson;

  // Introduction-to-Java is authored in Markdown while the rich registry is
  // intentionally reserved for the newer structured chapter records.
  const markdownSlug = contentSlug;
  try {
    const markdownChapter = getMarkdownChapterContent(markdownSlug);
    return toJsonString(markdownChapter?.content ?? null);
  } catch {
    // Never let an optional Markdown source take the whole chapter route down.
    return null;
  }
}

export default async function ChapterPage({ params }) {
  const { chapter: slug } = await params;
  const chapter = resolveStudyChapter(slug);

  if (!chapter) notFound();

  // Canonical slugs (e.g. for-loop) reuse the rich content of the legacy
  // chapter they alias (e.g. loops) instead of rendering empty.
  const clientContent = getChapterClientContent(chapter.contentSlug || slug);

  // Question-bank data is additive; a malformed/optional bank must never blank
  // the complete learning page.
  let questionBankJson = null;
  try {
    if (typeof getQuestionBankChapter === "function") {
      questionBankJson = toJsonString(getQuestionBankChapter(slug));
    }
  } catch {
    questionBankJson = null;
  }

  return (
    <StudyChapter
      slug={String(slug)}
      markdownContent={clientContent}
      questionBank={questionBankJson}
    />
  );
}
