"use client";

import { useState, useMemo, useCallback } from "react";
import Button from "./ui/Button";

export default function PracticeSession({ questions, onEndSession }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = useCallback((option) => {
    setSelectedAnswer(option);
    setIsAnswered(true);
    if (option === currentQuestion.answer) {
      setScore((s) => s + 1);
    }
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
  }, [currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      onEndSession(score, userAnswers);
    }
  }, [currentQuestionIndex, questions.length, score, userAnswers, onEndSession]);

  const progress = useMemo(() => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  }, [currentQuestionIndex, questions.length]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Header with Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-blue-600">
            Score: {score}/{currentQuestionIndex}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {currentQuestion.question}
        </h2>

        {currentQuestion.type === "mcq" && currentQuestion.options && (
          <div className="mt-4 space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
                className={`w-full text-left rounded-xl border p-4 transition-all duration-200 ${
                  isAnswered && option === currentQuestion.answer
                    ? "border-green-300 bg-green-50 text-green-800"
                    : isAnswered && option === selectedAnswer
                    ? "border-red-300 bg-red-50 text-red-800"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                } ${isAnswered ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <span className="font-medium">{option}</span>
                {isAnswered && option === currentQuestion.answer && (
                  <span className="ml-2 text-green-600">✓ Correct</span>
                )}
                {isAnswered && option === selectedAnswer && option !== currentQuestion.answer && (
                  <span className="ml-2 text-red-600">✗ Incorrect</span>
                )}
              </button>
            ))}
          </div>
        )}

        {currentQuestion.type !== "mcq" && (
          <textarea
            className="w-full rounded-xl border border-gray-300 p-4 text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            placeholder="Type your answer here..."
            rows={4}
            disabled={isAnswered}
            onChange={(e) => handleAnswer(e.target.value)}
          />
        )}

        {isAnswered && (
          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-xs font-semibold uppercase text-blue-700 mb-1">
              Explanation
            </p>
            <p className="text-sm text-gray-800">{currentQuestion.explanation}</p>
            {currentQuestion.hint && (
              <div className="mt-3">
                <p className="text-xs font-semibold uppercase text-blue-700 mb-1">Hint</p>
                <p className="text-sm text-gray-700">{currentQuestion.hint}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="mt-6 flex justify-end">
        {isAnswered && (
          <Button onClick={handleNextQuestion}>
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Session"}
          </Button>
        )}
        {!isAnswered && (
          <Button disabled>Submit Answer</Button>
        )}
      </div>
    </div>
  );
}