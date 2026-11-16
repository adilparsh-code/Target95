"use client";

import { useState } from "react";

// Only prompts and options arrive here — the server never sends the answer key.
export default function QuizCard({ card, onSubmit, submitted }) {
  const [answers, setAnswers] = useState({});
  const answered = Object.keys(answers).length;
  const total = card.questions.length;
  return (
    <form
      className="mt-2 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!submitted) onSubmit(card.attemptId, answers);
      }}
    >
      {card.questions.map((q, qi) => (
        <fieldset key={q.id} className="rounded-lg bg-emerald-50 p-2 dark:bg-slate-900" disabled={submitted}>
          <legend className="px-1 text-sm font-medium">{qi + 1}. {q.prompt}</legend>
          {q.options.map((option, oi) => (
            <label key={oi} className="flex cursor-pointer items-start gap-2 rounded p-1.5 text-sm hover:bg-emerald-100 dark:hover:bg-slate-800">
              <input
                type="radio"
                name={`${card.attemptId}-${q.id}`}
                checked={answers[q.id] === oi}
                onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                className="mt-1"
              />
              <span>{option}</span>
            </label>
          ))}
        </fieldset>
      ))}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-slate-600 dark:text-slate-300">{answered}/{total} answered</span>
        <button
          type="submit"
          disabled={submitted || answered === 0}
          className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-50"
        >
          {submitted ? "Submitted" : "Submit quiz"}
        </button>
      </div>
    </form>
  );
}
