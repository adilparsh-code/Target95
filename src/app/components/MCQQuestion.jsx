"use client";

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
            onClick={() => setSelected(option)}
            className={`w-full text-left p-4 rounded-xl border transition

            ${
              selected === option
                ? option === question.answer
                  ? "bg-green-100 border-green-500"
                  : "bg-red-100 border-red-500"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {option}
          </button>

        ))}

      </div>

    </div>

  );

}