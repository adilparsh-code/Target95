import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StudyChapter from "../../components/study/StudyChapter";
import { notFound } from "next/navigation";
import { getStudyChapterBySlug, getStudyChapters } from "../../../lib/studyCenter";
import { getMarkdownChapterContent } from "../../../lib/markdownContent";
import getQuestionBankChapter from "../../../lib/questionBankAdapter";

export async function generateStaticParams() {
  const chapters = getStudyChapters() || [];
  return chapters
    .filter((chapter) => chapter && chapter.slug)
    .map((chapter) => ({ slug: String(chapter.slug) }));
}

export default async function StudyChapterPage({ params }) {
  const { slug } = await params;
  const chapter = getStudyChapterBySlug(slug);

  if (!chapter) notFound();

  const markdownSlug = slug === "introduction-to-java" ? "introduction" : slug;
  const markdownChapter = getMarkdownChapterContent(markdownSlug);
  const questionBankChapter = typeof getQuestionBankChapter === "function"
    ? getQuestionBankChapter(slug)
    : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="h-20 sm:h-24 lg:h-28" />
      <StudyChapter
        slug={slug}
        markdownContent={markdownChapter?.content ?? null}
        questionBank={questionBankChapter}
      />
      <Footer />
    </main>
  );
}
