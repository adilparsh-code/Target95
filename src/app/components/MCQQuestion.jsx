"use client";

import { useState } from "react";
export default function MCQQuestion({ question, onSubmit, onExplainWithAI }) {
//export default function MCQQuestion({ question }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const correctAnswer = typeof question.answer === "number"
    ? question.options[question.answer]
    : question.answer;

  const handleExplainWithAI = () => {
    if (onExplainWithAI) {
      onExplainWithAI({
        question: question.question || question.prompt,
        studentAnswer: selected,
        correctAnswer,
        chapter: question.chapter,
        questionType: question.type
      });
    }
  };

  return (
    <div className="mt-8">

      <div className="bg-slate-50 rounded-2xl border p-8">
        <h2 className="text-3xl font-bold text-slate-900 leading-relaxed">
          {question.question}
        </h2>
      </div>

      <div className="mt-8 space-y-4">

        {question.options.map((option, index) => (

          <button
            key={index}
            disabled={submitted}
            onClick={() => setSelected(option)}
            className={`w-full text-left p-4 rounded-xl border transition font-semibold text-gray-800
              ${
  submitted
    ? option === correctAnswer
      ? "bg-green-100 border-green-500 text-green-800"
      : option === selected
      ? "bg-red-100 border-red-500 text-red-800"
      : "bg-white text-gray-700"
    : selected === option
    ? "bg-blue-100 border-blue-500 text-blue-900"
    : "bg-white hover:bg-gray-100 text-gray-800"
}`}
          >
            {option}
          </button>

        ))}

      </div>

      <div className="mt-8">

        {!submitted ? (

          <button
           onClick={() => {
  setSubmitted(true);
  onSubmit?.(selected === correctAnswer);
}}
            disabled={!selected}
            className="bg-blue-700 text-white px-6 py-3 rounded-xl disabled:opacity-50"
          >
            Submit Answer
          </button>

        ) : (

          <div
            className={`text-lg font-bold ${
              selected === correctAnswer
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {selected === correctAnswer
              ? "✅ Correct Answer!"
              : (
                <div className="space-y-4">
                  <div>❌ Wrong Answer! Correct Answer: {correctAnswer}</div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Need help?</p>
                    <button
                      onClick={handleExplainWithAI}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Explain with AI
                    </button>
                  </div>
                </div>
              )}
          </div>

        )}

      </div>

    </div>
  );
}