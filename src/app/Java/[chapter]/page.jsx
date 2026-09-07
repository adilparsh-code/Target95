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

function toSerializable(value) {
  if (value == null) return null;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return null;
  }
}

export default async function ChapterPage({ params }) {
  const { chapter: slug } = await params;
  const chapter = getStudyChapterBySlug(slug);

  if (!chapter) notFound();

  // Some legacy /Java routes use singular slugs while the rich registry uses
  // canonical slugs (for example `constructor` -> `constructors`).
  const richSlug = slug === "constructor" ? "constructors" : slug;
  const richChapter = toSerializable(getRichChapterBySlug(richSlug));

  // Only use Markdown when the loader has a real file. Pass the parsed content
  // itself (not the loader wrapper) and sanitize it before crossing the
  // Server -> Client Component boundary.
  const markdownSlug = slug === "introduction-to-java" ? "introduction" : slug;
  const markdownChapter = getMarkdownChapterContent(markdownSlug);
  const markdownContent = toSerializable(markdownChapter?.content ?? null);
  const questionBankChapter = typeof getQuestionBankChapter === "function"
    ? toSerializable(getQuestionBankChapter(slug))
    : null;

  return (
    <StudyChapter
      slug={slug}
      markdownContent={richChapter ?? markdownContent}
      questionBank={questionBankChapter}
    />
  );
}
