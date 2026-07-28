import Link from "next/link";
import { notFound } from "next/navigation";
import { getChapterContent, getChapterQuestions, getChapterSlugs } from "@/lib/curriculum";
import ChapterQuestions from "../../components/ChapterQuestions";
import ChapterStats from "../../components/ChapterStats";
import ChapterProgress from "../../components/ChapterProgress";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Container from "../../components/ui/Container";

export function generateStaticParams() {
  return getChapterSlugs("java");
}

export default async function ChapterPage({ params }) {
  const { chapter } = await params;

  const chapterData = getChapterContent("java", chapter);

  if (!chapterData) {
    notFound();
  }

  const chapterQuestions = getChapterQuestions("java", chapter);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <Container>
        <div className="py-8 sm:py-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
              <li>
                <Link href="/java" className="hover:text-blue-600 transition-colors font-medium">
                  Java Programming
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300">/</li>
              <li className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-none">
                {chapterData.title}
              </li>
            </ol>
          </nav>

          {/* Back Navigation */}
          <Link
            href="/java"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6"
          >
            <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Chapters
          </Link>

          {/* Chapter Header */}
          <div className="text-center">
            <div className="text-5xl sm:text-6xl" aria-hidden="true">📘</div>

            <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700">
              {chapterData.title}
            </h1>

            {chapterData.description && (
              <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                {chapterData.description}
              </p>
            )}

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span className="rounded-full bg-green-100 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-green-700">
                {chapterData.difficulty}
              </span>
              <span className="rounded-full bg-blue-100 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-blue-700">
                {chapterQuestions.length} Questions
              </span>
              {chapterData.estimatedTime && (
                <span className="rounded-full bg-purple-100 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-purple-700">
                  {chapterData.estimatedTime} min
                </span>
              )}
            </div>

            <div className="mt-8 sm:mt-10">
              {chapterQuestions.length > 0 ? (
                <Link
                  href={`/java/${chapter}/question/${chapterQuestions[0].id}`}
                  className="inline-block rounded-xl bg-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
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
