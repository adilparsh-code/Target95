import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StudyChapter from "../../components/study/StudyChapter";
import { notFound } from "next/navigation";
import { getStudyChapterBySlug } from "../../../lib/studyCenter";

export async function generateStaticParams() {
  return ["introduction", "variables-data-types", "operators", "if-else", "loops", "methods", "arrays", "strings", "constructor"].map((slug) => ({ slug }));
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
      <StudyChapter slug={slug} />
      <Footer />
    </main>
  );
}
