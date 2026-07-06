import Link from "next/link";
import { notFound } from "next/navigation";

import questions from "../../../../data/questions";

import AnswerBox from "../../../../components/AnswerBox";
import ProgressBar from "../../../../components/ProgressBar";
import DifficultyBadge from "../../../../components/DifficultyBadge";
import QuestionCard from "../../../../components/QuestionCard";

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

    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 py-16">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        {/* Breadcrumb */}

        <p className="text-sm text-gray-500">

          Home / Java / {chapter.replace("-", " ")}

        </p>

        {/* Header */}

        <div className="flex justify-between items-center mt-5">

          <div>

            <h1 className="text-4xl font-bold text-blue-700">

              📘 Question {question.id}

            </h1>

          </div>

          <DifficultyBadge difficulty={question.difficulty} />

        </div>

        {/* Progress */}

        <ProgressBar
          current={currentIndex + 1}
          total={chapterQuestions.length}
        />

        {/* Question */}

        <QuestionCard question={question.question} />

        {/* Answer */}

        <AnswerBox answer={question.answer} />

        {/* Palette */}

        <div className="mt-10">

          <h3 className="text-lg font-semibold text-gray-600 mb-4">

            Jump to Question

          </h3>

          <div className="flex gap-3 flex-wrap">

            {chapterQuestions.map((q) => (

              <Link
                key={q.id}
                href={`/java/${chapter}/question/${q.id}`}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition
                ${
                  q.id === question.id
                    ? "bg-blue-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {q.id}
              </Link>

            ))}

          </div>

        </div>

        {/* Navigation */}

        <div className="flex justify-between mt-12">

          <div>

            {previousQuestion && (

              <Link
                href={`/java/${chapter}/question/${previousQuestion.id}`}
                className="bg-gray-700 text-white px-8 py-3 rounded-xl hover:bg-gray-800"
              >

                ← Previous

              </Link>

            )}

          </div>

          <div>

            {nextQuestion ? (

              <Link
                href={`/java/${chapter}/question/${nextQuestion.id}`}
                className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800"
              >

                Next →

              </Link>

            ) : (

              <Link
                href="/Java"
                className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700"
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