"use client";

import { useState } from "react";
export default function MCQQuestion({ question, onSubmit }) {
//export default function MCQQuestion({ question }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

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
    ? option === question.answer
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
  onSubmit?.(selected === question.answer);
}}
            disabled={!selected}
            className="bg-blue-700 text-white px-6 py-3 rounded-xl disabled:opacity-50"
          >
            Submit Answer
          </button>

        ) : (

          <div
            className={`text-lg font-bold ${
              selected === question.answer
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {selected === question.answer
              ? "✅ Correct Answer!"
              : `❌ Wrong Answer! Correct Answer: ${question.answer}`}
          </div>

        )}

      </div>

    </div>
  );
}
