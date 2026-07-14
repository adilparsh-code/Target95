"use client";

const [selected, setSelected] = useState(null);
const [submitted, setSubmitted] = useState(false);


import { useState } from "react";

export default function MCQQuestion({ question }) {

  const [selected, setSelected] = useState(null);

  return (

    <div className="mt-8">

      <div className="bg-slate-50 rounded-2xl border p-8">

        <h2 className="text-3xl font-semibold text-gray-900">
          {question.question}
        </h2>

      </div>

      <div className="mt-8 space-y-4">

        {question.options.map((option, index) => (

         <button
  key={index}
  disabled={submitted}
  onClick={() => setSelected(option)}
  className={`w-full text-left p-4 rounded-xl border transition font-medium

  ${
    submitted
      ? option === question.answer
        ? "bg-green-100 border-green-500 text-green-800"
        : option === selected
        ? "bg-red-100 border-red-500 text-red-800"
        : "bg-white"
      : selected === option
      ? "bg-blue-100 border-blue-500"
      : "bg-white hover:bg-gray-100"
  }`}
>
  {option}
  <div className="mt-8 flex items-center gap-4">

  {!submitted ? (

    <button
      onClick={() => setSubmitted(true)}
      disabled={!selected}
      className="bg-blue-700 text-white px-6 py-3 rounded-xl disabled:bg-gray-400"
    >
      Submit Answer
    </button>

  ) : (

    <div
      className={`font-bold text-lg ${
        selected === question.answer
          ? "text-green-600"
          : "text-red-600"
      }`}
    >
      {selected === question.answer
        ? "✅ Correct Answer"
        : `❌ Wrong Answer (Correct: ${question.answer})`}
    </div>

  )}

</div>
</button>

        ))}

      </div>

    </div>

  );

}