"use client";

export default function PracticeResults({ score, userAnswers, questions, onRestart }) {
  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Practice Results</h2>
      <p className="text-4xl font-bold mt-4">
        {score} / {totalQuestions}
      </p>
      <p className="text-xl font-semibold">{percentage}%</p>

      <div className="mt-8">
        <h3 className="text-lg font-bold">Review Your Answers</h3>
        <div className="space-y-4 mt-4">
          {questions.map((question) => {
            const userAnswer = userAnswers[question.id];
            return (
              <div key={question.id} className="p-4 rounded-lg border">
                <p className="font-semibold">{question.question}</p>
                <p className={`text-sm ${userAnswer?.isCorrect ? "text-green-600" : "text-red-600"}`}>
                  Your answer: {userAnswer?.answer} {userAnswer?.isCorrect ? "✓" : "✗"}
                </p>
                {!userAnswer?.isCorrect && (
                  <p className="text-sm text-gray-600">Correct answer: {question.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="mt-8 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
      >
        Practice Again
      </button>
    </div>
  );
}