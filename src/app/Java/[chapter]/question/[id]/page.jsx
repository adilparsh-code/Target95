import questions from "../../../../data/questions";
import { notFound } from "next/navigation";
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

  return (
    <main className="min-h-screen bg-slate-100 py-16">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10">

        <h1 className="text-4xl font-bold text-blue-700">
          Question {question.id}
        </h1>

        <p className="mt-8 text-2xl">
          {question.question}
        </p>

        <AnswerBox answer={question.answer} />

      </div>

    </main>
  );
}