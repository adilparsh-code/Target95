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
  const previousQuestion = chapterQuestions[currentIndex - 1];

  return (
    <main className="min-h-screen bg-slate-100 py-16">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">

        <h1 className="text-4xl font-extrabold text-blue-700">
  Question {question.id}
</h1>

      <p className="mt-4 text-center text-lg font-semibold text-blue-700">
  Progress: {currentIndex + 1} of {chapterQuestions.length} Questions
</p>
<div className="w-full bg-gray-200 rounded-full h-3 mt-6">

  <div
    className="bg-blue-700 h-3 rounded-full transition-all duration-500"
    style={{
      width: `${((currentIndex + 1) / chapterQuestions.length) * 100}%`,
    }}
  ></div>

</div>

       <p className="mt-8 text-3xl font-semibold text-gray-900 leading-relaxed">
  {question.question}
</p>

        <AnswerBox answer={question.answer} />

       <div className="mt-10 flex justify-between">

  <div>
    {previousQuestion && (
      <Link
        href={`/java/${chapter}/question/${previousQuestion.id}`}
        className="bg-gray-700 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
      >
        ← Previous
      </Link>
    )}
  </div>

  <div>
    {nextQuestion ? (
      <Link
        href={`/java/${chapter}/question/${nextQuestion.id}`}
        className="bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
      >
        Next →
      </Link>
    ) : (
      <Link
        href="/java"
        className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
      >
        🎉 Finish Chapter
      </Link>
    )}
  </div>

</div>

      </div>

    </main>
  );
}