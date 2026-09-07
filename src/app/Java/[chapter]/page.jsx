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

export default async function ChapterPage({ params }) {
  const { chapter: slug } = await params;
  const chapter = getStudyChapterBySlug(slug);

  if (!chapter) notFound();

  // Use the same canonical content pipeline as /study so /Java never falls
  // back to the legacy ChapterReader placeholders. Prefer rich chapter data,
  // then use the academically authored Markdown content when available.
  const markdownSlug = slug === "introduction-to-java" ? "introduction" : slug;
  const markdownChapter = getMarkdownChapterContent(markdownSlug);
  const richChapter = getRichChapterBySlug(slug);
  const questionBankChapter = typeof getQuestionBankChapter === "function"
    ? getQuestionBankChapter(slug)
    : null;

  return (
    <StudyChapter
      slug={slug}
      markdownContent={richChapter ?? markdownChapter?.content ?? null}
      questionBank={questionBankChapter}
    />
  );
}
