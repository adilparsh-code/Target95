import { notFound } from "next/navigation";
import StudyChapter from "../../components/study/StudyChapter";
import { getStudyChapterBySlug, getStudyChapters } from "@/lib/studyCenter";
import { getMarkdownChapterContent } from "@/lib/markdownContent";
import getQuestionBankChapter from "@/lib/questionBankAdapter";
import { getChapterBySlug as getRichChapterBySlug } from "../../data/chapter-content";

export function generateStaticParams() {
  const chapters = getStudyChapters() || [];
  return chapters
    .filter((chapter) => chapter && chapter.slug)
    .map((chapter) => ({ chapter: String(chapter.slug) }));
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

function getChapterClientContent(slug) {
  const richChapterJson = toJsonString(getRichChapterBySlug(slug === "constructor" ? "constructors" : slug));
  if (richChapterJson) return richChapterJson;

  // Introduction-to-Java is authored in Markdown while the rich registry is
  // intentionally reserved for the newer structured chapter records.
  const markdownSlug = slug === "introduction-to-java" ? "introduction" : slug;
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
  const chapter = getStudyChapterBySlug(slug);

  if (!chapter) notFound();

  const clientContent = getChapterClientContent(slug);

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
