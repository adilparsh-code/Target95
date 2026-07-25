"use client";

import Button from "./ui/Button";

export default function PracticeResults({ score, userAnswers, questions, onRestart }) {
  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Score Summary */}
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Practice Results</h2>
        <p className="text-6xl font-extrabold text-blue-600 mt-4">
          {score} / {totalQuestions}
        </p>
        <p className={`text-2xl font-bold mt-2 ${percentage >= 70 ? "text-green-600" : percentage >= 40 ? "text-yellow-600" : "text-red-600"}`}>
          {percentage}% Accuracy
        </p>
        <div className="mt-6 w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${percentage >= 70 ? "bg-green-500" : percentage >= 40 ? "bg-yellow-500" : "bg-red-500"}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Review Your Answers</h3>
        <div className="space-y-4">
          {questions.map((question) => {
            const userAnswer = userAnswers[question.id];
            return (
              <div key={question.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="font-semibold text-gray-900 mb-2">{question.question}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`font-medium ${userAnswer?.isCorrect ? "text-green-600" : "text-red-600"}`}>
                    Your answer: {userAnswer?.answer} {userAnswer?.isCorrect ? "✓" : "✗"}
                  </span>
                </div>
                {!userAnswer?.isCorrect && (
                  <p className="mt-1 text-sm text-gray-600">
                    Correct answer: <span className="font-semibold text-green-700">{question.answer}</span>
                  </p>
                )}
                {question.explanation && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Explanation</p>
                    <p className="mt-1 text-sm text-gray-700">{question.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8 flex justify-center">
        <Button onClick={onRestart}>Practice Again</Button>
      </div>
    </div>
  );
}