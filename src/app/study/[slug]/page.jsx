import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StudyChapter from "../../components/study/StudyChapter";
import { notFound } from "next/navigation";
import { getStudyChapterBySlug } from "../../../lib/studyCenter";
import { getMarkdownChapterContent } from "../../../lib/markdownContent";
import { getQuestionBankChapter } from "../../../lib/questionBankAdapter";

import { getStudyChapters } from "../../../lib/studyCenter";

export async function generateStaticParams() {
  const chapters = getStudyChapters();
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

export default async function StudyChapterPage({ params }) {
  const { slug } = await params;
  const chapter = getStudyChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  // Load rich content from the academic Markdown source when available.
  // Falls back gracefully (null) for chapters without a Markdown file.
  const markdownChapter = getMarkdownChapterContent(slug);

  // Load structured question-bank data for MCQs, output, and programming
  // sections. Falls back gracefully (null) for chapters without a bank.
  const questionBankChapter = getQuestionBankChapter(slug);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="h-20 sm:h-24 lg:h-28"></div>
      <StudyChapter
        slug={slug}
        markdownContent={markdownChapter?.content ?? null}
        questionBank={questionBankChapter}
      />
      <Footer />
    </main>
  );
}
