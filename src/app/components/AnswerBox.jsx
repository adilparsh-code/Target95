"use client";

import { useState } from "react";

export default function AnswerBox({ answer }) {

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

          <p className="mt-4 text-gray-700">
            {answer}
          </p>

        </div>

      )}

    </div>

  );
}