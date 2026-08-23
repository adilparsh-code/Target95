import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StudyChapter from "../../components/study/StudyChapter";
import { notFound } from "next/navigation";
import { getStudyChapterBySlug, getStudyChapters } from "../../../lib/studyCenter";
import { getMarkdownChapterContent } from "../../../lib/markdownContent";
import { getQuestionBankChapter } from "../../../lib/questionBankAdapter";

export async function generateStaticParams() {
  const chapters = getStudyChapters();
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

export default async function StudyChapterPage({ params }) {
  const { slug } = await params;
  const chapter = getStudyChapterBySlug(slug);

  if (!chapter) notFound();

  // The canonical Introduction to Java academic source currently lives under
  // the legacy `introduction` registry entry. Reuse it for the new study slug
  // so students receive the full academic content instead of placeholder data.
  const markdownSlug = slug === "introduction-to-java" ? "introduction" : slug;
  const markdownChapter = getMarkdownChapterContent(markdownSlug);
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
