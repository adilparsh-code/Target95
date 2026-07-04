import Link from "next/link";
import { notFound } from "next/navigation";
import questions from "../../../../data/questions";
import AnswerBox from "../../../../components/AnswerBox";

export default async function QuestionPage({ params }) {

  const { chapter, id } = await params;

  const question = questions.find(
    (item) =>
      item.chapter === chapter &&
      item.id === Number(id)
  );

  if (!question) {
    notFound();
  }

  const chapterQuestions = questions.filter(
    (item) => item.chapter === chapter
  );

  const currentIndex = chapterQuestions.findIndex(
    (item) => item.id === Number(id)
  );

  const nextQuestion = chapterQuestions[currentIndex + 1];

  return (
    <main className="min-h-screen bg-slate-100 py-16">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10">

        <h1 className="text-4xl font-bold text-blue-700">
          Question {question.id}
        </h1>

        <p className="mt-2 text-gray-500">
          {currentIndex + 1} / {chapterQuestions.length}
        </p>

        <p className="mt-8 text-2xl">
          {question.question}
        </p>

        <AnswerBox answer={question.answer} />

        <div className="mt-10 flex justify-end">

          {nextQuestion ? (

            <Link
              href={`/java/${chapter}/question/${nextQuestion.id}`}
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
            >
              Next Question →
            </Link>

          ) : (

            <Link
              href="/java"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              🎉 Chapter Completed
            </Link>

          )}

        </div>

      </div>

    </main>
  );
}