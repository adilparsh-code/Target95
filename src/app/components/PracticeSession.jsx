"use client";

import { useState } from "react";

export default function PracticeSession({ questions, onEndSession }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    setIsAnswered(true);
    if (option === currentQuestion.answer) {
      setScore((s) => s + 1);
    }
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of session
      onEndSession(score, userAnswers);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Practice Session</h2>
      <p>
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>
      <p>Score: {score}</p>
      <div className="mt-4">
        <p className="text-lg font-semibold">{currentQuestion.question}</p>
        {currentQuestion.type === "mcq" && (
          <div className="mt-4 space-y-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg border transition ${
                  isAnswered && option === currentQuestion.answer
                    ? "bg-green-100 border-green-300 text-green-800"
                    : isAnswered && option === selectedAnswer
                    ? "bg-red-100 border-red-300 text-red-800"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        {isAnswered && (
          <div className="mt-4 p-4 rounded-lg bg-gray-100">
            <h3 className="font-bold">
              {selectedAnswer === currentQuestion.answer ? "Correct!" : "Incorrect"}
            </h3>
            <p className="text-sm">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>
      <button
        onClick={handleNextQuestion}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
      >
        {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Session"}
      </button>
    </div>
  );
}