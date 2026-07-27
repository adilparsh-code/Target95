"use client";

import { useState } from "react";

export default function AnswerBox({ answer, explanation }) {

  const [showAnswer, setShowAnswer] = useState(false);

  return (

    <div className="mt-10">

      {!showAnswer ? (

        <button
          onClick={() => setShowAnswer(true)}
          className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
        >
          👁 Show Answer
        </button>

      ) : (

        <div className="bg-green-50 border border-green-300 rounded-xl p-6">

          <h2 className="text-xl font-bold text-green-700">
            Answer
          </h2>

          <p className="mt-4 whitespace-pre-wrap text-gray-700">
            {answer}
          </p>
          {explanation ? (
            <div className="mt-5 border-t border-green-200 pt-4">
              <h3 className="font-semibold text-green-800">Explanation</h3>
              <p className="mt-2 text-gray-700">{explanation}</p>
            </div>
          ) : null}

        </div>

      )}

    </div>

  );
}
