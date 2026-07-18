import Link from "next/link";
import { notFound } from "next/navigation";
import javaChapters from "../../data/javaChapters";
import questions from "../../data/questions";
import ChapterQuestions from "../../components/ChapterQuestions";
import ChapterStats from "../../components/ChapterStats";

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
    <main className="min-h-screen bg-slate-100 py-16">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10">

        <div className="text-6xl text-center">📘</div>

        <h1 className="text-5xl font-bold text-center text-blue-700 mt-6">
          {chapterData.title}
        </h1>

        <div className="flex justify-center gap-4 mt-8">
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
            {chapterData.difficulty}
          </span>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
            {chapterQuestions.length} Questions
          </span>
        </div>

        <div className="text-center mt-10">
          {chapterQuestions.length > 0 ? (
            <Link
              href={`/java/${chapter}/question/${chapterQuestions[0].id}`}
            className="inline-block bg-blue-700 text-white px-8 py-4 rounded-xl hover:bg-blue-800 transition"
          >
            Start Practice →
            </Link>
          ) : (
            <p className="text-gray-500">Questions coming soon.</p>
          )}
        </div>

        <ChapterStats questions={chapterQuestions} />

        <ChapterQuestions
          chapter={chapter}
          questions={chapterQuestions}
        />
      </div>
    </main>
  );
}
