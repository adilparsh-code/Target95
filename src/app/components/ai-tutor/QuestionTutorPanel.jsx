"use client";

import { useState } from "react";
import Link from "next/link";
import { getTutorResponse } from "@/lib/aiTutor";

const actions = [
  ["hint", "Hint"],
  ["explanation", "Explain Answer"],
  ["steps", "Step-by-Step"],
  ["mistakes", "Common Mistakes"],
  ["concepts", "Key Concepts"],
  ["similar", "Similar Questions"],
  ["analysis", "Difficulty & Time"],
];

const STATUS_NOTICE = {
  unconfigured: "The AI Tutor is not configured on this deployment, so nothing was generated. The study guidance below is from the question's own solution notes.",
  ai_error: "The AI Tutor could not answer right now. The study guidance below is from the question's own solution notes.",
  rate_limited: "You have used your AI Tutor limit for this hour. The study guidance below is from the question's own solution notes.",
  offline: "The AI Tutor could not be reached. The study guidance below is from the question's own solution notes.",
  forbidden: "Your plan does not include the AI Tutor. The study guidance below is from the question's own solution notes.",
};

export default function QuestionTutorPanel({ question, wrongAnswerContext, personalization }) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const askTutor = async (action) => {
    setLoading(true);
    setResult(null);
    try {
      const reply = await getTutorResponse({
        action,
        question: { ...question, context: wrongAnswerContext },
        context: {
          board: personalization?.board,
          class: personalization?.class,
          subject: personalization?.subject,
          chapter: question?.chapter || personalization?.chapter,
          questionType: question?.type || personalization?.questionType,
        },
      });
      setResult(reply);
    } finally {
      setLoading(false);
    }
  };

  const isAi = result?.source === "ai";

  return (
    <aside className="fixed bottom-4 right-4 z-40 w-[calc(100%-2rem)] max-w-sm" aria-label="Tutor panel">
      <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-xl">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex w-full items-center justify-between bg-blue-600 px-4 py-3 text-left text-sm font-semibold text-white"
        >
          <span>AI Tutor</span>
          <span>{open ? "Close" : "Ask for help"}</span>
        </button>

        {open ? (
          <div className="p-4">
            <p className="text-sm text-gray-600">
              {isAi
                ? "Answers below come from the Target95 AI Tutor."
                : "Study guidance below comes from this question's own solution notes, not from an AI."}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {actions.map(([action, label]) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => askTutor(action)}
                  disabled={loading}
                  className="min-h-[44px] min-w-[44px] rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 disabled:opacity-60"
                >
                  {label}
                </button>
              ))}
            </div>

            {result?.requiresSignIn ? (
              <div className="mt-4 min-h-20 rounded-xl bg-amber-50 p-3 text-sm leading-relaxed text-amber-900">
                {result.error}{" "}
                <Link href={result.signInHref} className="font-semibold underline">
                  Sign in
                </Link>{" "}
                to ask the AI Tutor about this question.
              </div>
            ) : (
              <div className="mt-4 min-h-20 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed whitespace-pre-line text-gray-700">
                {loading
                  ? "Thinking…"
                  : result
                    ? [
                        result.error ? STATUS_NOTICE[result.status] || result.error : null,
                        result.text,
                      ]
                        .filter(Boolean)
                        .join("\n\n")
                    : "Choose an option for a contextual explanation."}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
