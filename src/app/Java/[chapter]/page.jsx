import Link from "next/link";
import { notFound } from "next/navigation";
import javaChapters from "../../data/javaChapters";
import questions from "../../data/questions";
import ChapterQuestions from "../../components/ChapterQuestions";
import ChapterStats from "../../components/ChapterStats";
import ChapterProgress from "../../components/ChapterProgress";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Container from "../../components/ui/Container";

export default async function ChapterPage({ params }) {
  const { chapter } = await params;

  const chapterData = javaChapters.find(
    (item) => item.slug === chapter
  );

  if (!chapterData) {
    notFound();
  }

  const chapterQuestions = questions.filter(
    (item) => item.chapter === chapter
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <Container>
        <div className="py-12">

          <div className="text-center">
            <div className="text-6xl" aria-hidden="true">📘</div>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold text-blue-700">
              {chapterData.title}
            </h1>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                {chapterData.difficulty}
              </span>

              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                {chapterQuestions.length} Questions
              </span>
            </div>

            <div className="mt-10">
              {chapterQuestions.length > 0 ? (
                <Link
                  href={`/java/${chapter}/question/${chapterQuestions[0].id}`}
                  className="inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
                >
                  Start Practice →
                </Link>
              ) : (
                <p className="text-gray-500">Questions coming soon.</p>
              )}
            </div>
          </div>

          <ChapterProgress chapter={chapter} questions={chapterQuestions} />

          <ChapterStats questions={chapterQuestions} />

          <ChapterQuestions
            chapter={chapter}
            questions={chapterQuestions}
          />
        </div>
      </Container>
      <Footer />
    </main>
  );
}