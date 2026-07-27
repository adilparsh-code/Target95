import Link from "next/link";
import javaChapters from "../data/javaChapters";
import questions from "../data/questions";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import ProtectedRoute from "../components/ProtectedRoute";
import SubjectProgress from "../components/SubjectProgress";

function getChapterQuestionCount(slug) {
  return questions.filter((q) => q.chapter === slug).length;
}

function getTotalQuestions() {
  return questions.length;
}

export default function JavaPage() {
  const totalQuestions = getTotalQuestions();
  const totalChapters = javaChapters.length;
  const totalEstimatedTime = javaChapters.reduce((sum, ch) => sum + (ch.estimatedTime || 0), 0);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <div className="h-20 sm:h-24 lg:h-28"></div>
        <Container>
          <div className="py-8 sm:py-12">
            {/* Subject Header */}
            <div className="text-center">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
                ICSE & ISC Computer Science
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700">
                Java Programming
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Master Java with chapter-wise practice questions, progress tracking, and AI-powered explanations. Covers ICSE and ISC syllabus.
              </p>
            </div>

            {/* Subject Stats */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="rounded-xl bg-white border border-gray-200 p-3 sm:p-4 text-center shadow-sm">
                <p className="text-2xl sm:text-3xl font-bold text-blue-700">{totalChapters}</p>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">Total Chapters</p>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-3 sm:p-4 text-center shadow-sm">
                <p className="text-2xl sm:text-3xl font-bold text-green-700">{totalQuestions}</p>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">Practice Questions</p>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-3 sm:p-4 text-center shadow-sm">
                <p className="text-2xl sm:text-3xl font-bold text-purple-700">{totalEstimatedTime}+</p>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">Est. Minutes</p>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-3 sm:p-4 text-center shadow-sm">
                <SubjectProgress chapters={javaChapters} questions={questions} />
              </div>
            </div>

            {/* Chapter Grid */}
            <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
              {javaChapters.map((chapter) => {
                const chapterQuestionCount = getChapterQuestionCount(chapter.slug);
                return (
                  <article
                    key={chapter.id}
                    className="group rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Chapter Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                          {chapter.title}
                        </h2>
                        <p className="mt-1.5 text-xs sm:text-sm text-gray-500 line-clamp-2">
                          {chapter.description}
                        </p>
                      </div>
                      <span className="text-3xl sm:text-4xl flex-shrink-0" aria-hidden="true">
                        📘
                      </span>
                    </div>

                    {/* Chapter Meta */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                        {chapter.difficulty}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                        {chapterQuestionCount} Questions
                      </span>
                      <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
                        {chapter.estimatedTime} min
                      </span>
                    </div>

                    {/* Topics */}
                    {chapter.topics && chapter.topics.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {chapter.topics.map((topic) => (
                          <span
                            key={topic}
                            className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action */}
                    <div className="mt-5 sm:mt-6">
                      <Link
                        href={`/java/${chapter.slug}`}
                        className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-blue-600 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
                      >
                        Start Learning →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
        <Footer />
      </main>
    </ProtectedRoute>
  );
}