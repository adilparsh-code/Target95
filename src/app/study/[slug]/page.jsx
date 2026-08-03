import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StudyChapter from "../../components/study/StudyChapter";
import { notFound } from "next/navigation";
import { getStudyChapterBySlug } from "../../../lib/studyCenter";

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="h-20 sm:h-24 lg:h-28"></div>
      <StudyChapter slug={slug} />
      <Footer />
    </main>
  );
}
