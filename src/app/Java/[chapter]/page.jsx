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

export default async function ChapterPage({ params }) {
  const { chapter: slug } = await params;
  const chapter = getStudyChapterBySlug(slug);

  if (!chapter) notFound();

  // Some legacy /Java routes use singular slugs while the rich registry uses
  // canonical slugs (for example `constructor` -> `constructors`).
  const richSlug = slug === "constructor" ? "constructors" : slug;
  const richChapterJson = toJsonString(getRichChapterBySlug(richSlug));

  // Avoid invoking the Markdown loader when rich content exists. This prevents
  // missing legacy Markdown files from participating in the rich-content path.
  let clientContent = richChapterJson;
  if (!clientContent) {
    const markdownSlug = slug === "introduction-to-java" ? "introduction" : slug;
    const markdownChapter = getMarkdownChapterContent(markdownSlug);
    clientContent = toJsonString(markdownChapter?.content ?? null);
  }

  // Pass only JSON primitives across the Server -> Client boundary.
  const questionBankJson = typeof getQuestionBankChapter === "function"
    ? toJsonString(getQuestionBankChapter(slug))
    : null;

  return (
    <StudyChapter
      slug={String(slug)}
      markdownContent={clientContent}
      questionBank={questionBankJson}
    />
  );
}
