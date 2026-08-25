import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StudyChapter from "@/components/study/StudyChapter";
import { notFound } from "next/navigation";
import { getStudyChapterBySlug, getStudyChapters } from "@/lib/studyCenter";
import { getMarkdownChapterContent } from "@/lib/markdownContent";
import * as questionBankModule from "@/lib/questionBankAdapter";

// Named ya Default dono export ko safely handle karega
const getQuestionBankChapter =
  questionBankModule.getQuestionBankChapter ||
  questionBankModule.default ||
  (() => null);

export async function generateStaticParams() {
  try {
    const chapters = getStudyChapters() || [];
    return chapters
      .filter((chapter) => chapter && chapter.slug)
      .map((chapter) => ({
        slug: String(chapter.slug),
      }));
  } catch (err) {
    console.error("Error in generateStaticParams:", err);
    return [];
  }
}

export default async function StudyChapterPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const chapter = getStudyChapterBySlug(slug);
  if (!chapter) {
    notFound();
  }

  // Canonical Introduction to Java academic source mapping
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
