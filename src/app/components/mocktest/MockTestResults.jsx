"use client";

export default function MockTestResults({ result, onRetry }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Mock Test Results</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900">You completed your practice test</h1>
        <p className="mt-3 text-base leading-7 text-gray-700">
          Review your score, accuracy, and each answer before starting another round.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700">Score</p>
          <p className="mt-3 text-3xl font-bold text-gray-900">{result.score}/{result.totalQuestions}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700">Percentage</p>
          <p className="mt-3 text-3xl font-bold text-gray-900">{result.percentage}%</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700">Correct</p>
          <p className="mt-3 text-3xl font-bold text-gray-900">{result.correctCount}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700">Wrong</p>
          <p className="mt-3 text-3xl font-bold text-gray-900">{result.wrongCount}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Review Answers</h2>
            <p className="mt-1 text-sm text-gray-700">Green means correct, red means incorrect, and yellow marks questions you flagged.</p>
          </div>
          <button
            type="button"
            onClick={onRetry}
            className="rounded-xl border border-blue-300 bg-blue-100 px-5 py-3 font-semibold text-gray-900 transition hover:border-blue-400 hover:bg-blue-200"
          >
            Retry Test
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {result.review.map((item) => {
            const reviewClass = item.isMarkedForReview
              ? "border-yellow-400 bg-yellow-50"
              : item.isCorrect
                ? "border-green-400 bg-green-50"
                : "border-red-400 bg-red-50";

            return (
              <div key={item.question.id} className={`rounded-2xl border p-4 ${reviewClass}`}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.question.question}</p>
                    <p className="mt-2 text-sm text-gray-700">
                      Your answer: {item.response || "No response provided"}
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      Correct answer: {item.correctAnswer}
                    </p>
                  </div>
                  <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-semibold text-gray-900">
                    {item.isMarkedForReview ? "Review" : item.isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
