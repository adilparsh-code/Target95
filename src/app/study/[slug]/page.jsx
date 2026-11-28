import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StudyChapter from "../../components/study/StudyChapter";
import { notFound } from "next/navigation";
import { getStudyChapters } from "../../../lib/studyCenter";
import { getChapterPageData } from "../../../lib/content";

export async function generateStaticParams() {
  const chapters = getStudyChapters() || [];
  return chapters
    .filter((chapter) => chapter && chapter.slug)
    .map((chapter) => ({ slug: String(chapter.slug) }));
}

export default async function StudyChapterPage({ params }) {
  const { slug } = await params;
  const pageData = getChapterPageData(slug);
  if (!pageData) notFound();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="h-20 sm:h-24 lg:h-28" />
      <StudyChapter
        slug={slug}
        markdownContent={pageData.content}
        questionBank={pageData.questions}
      />
      <Footer />
    </main>
  );
}
