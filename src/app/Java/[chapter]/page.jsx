import Link from "next/link";
import { notFound } from "next/navigation";
import javaChapters from "../../data/javaChapters";
import questions from "../../data/questions";

export default async function ChapterPage({ params }) {

  const { chapter } = await params;
  console.log(chapter);

  const chapterData = javaChapters.find(
    (item) => item.slug === chapter
  );

  const chapterQuestions = questions.filter(
  (item) => item.chapter === chapter
);
  if (!chapterData) {
    notFound();
  }


  return (
    <main className="min-h-screen bg-slate-100 py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10">

        <div className="text-6xl text-center">📘</div>

        <h1 className="text-5xl font-bold text-center text-blue-700 mt-6">
          {chapterData.title}
        </h1>

        <div className="flex justify-center gap-4 mt-8">

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
            {chapterData.difficulty}
          </span>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
            {chapterData.questions} Questions
          </span>

        </div>

        <div className="text-center mt-10">
          <Link
            href={`/java/${chapter}/question/1`}
            className="inline-block bg-blue-700 text-white px-8 py-4 rounded-xl hover:bg-blue-800 transition"
          >
            Start Practice →
          </Link>


        </div>

        <div className="mt-12">

  <h2 className="text-2xl font-bold text-gray-800 mb-6">
    Practice Questions
  </h2>

  <div className="space-y-4">

    {chapterQuestions.map((q) => (

      <Link
        key={q.id}
        href={`/java/${chapter}/question/${q.id}`}
        className="block p-5 bg-slate-50 rounded-xl border hover:border-blue-500 hover:shadow-md transition"
      >

        <div className="flex justify-between items-center">

          <div>

            <p className="font-bold text-lg text-gray-800">
              Question {q.id}
            </p>

            <p className="text-gray-600 mt-1">
              {q.question}
            </p>

          </div>

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {q.type}
          </span>

        </div>

      </Link>

    ))}

  </div>

</div>

      </div>
    </main>
  );
}