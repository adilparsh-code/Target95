"use client";

import { useState } from "react";
import { getTutorResponse } from "@/lib/aiTutor";

const actions = [
  ["hint", "Hint"], ["explanation", "Explain Answer"], ["steps", "Step-by-Step"], ["mistakes", "Common Mistakes"],
  ["concepts", "Key Concepts"], ["similar", "Similar Questions"], ["analysis", "Difficulty & Time"],
];

export default function QuestionTutorPanel({ question, wrongAnswerContext }) {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const askTutor = async (action) => {
    setLoading(true);
    // Pass the wrong answer context to the AI tutor if it exists
    setResponse(await getTutorResponse({ 
      action, 
      question,
      wrongAnswerContext 
    }));
    setLoading(false);
  };

  return <aside className="fixed bottom-4 right-4 z-40 w-[calc(100%-2rem)] max-w-sm" aria-label="AI Tutor panel">
    <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-xl"><button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="flex w-full items-center justify-between bg-blue-600 px-4 py-3 text-left text-sm font-semibold text-white"><span>AI Tutor</span><span>{open ? "Close" : "Ask for help"}</span></button>{open ? <div className="p-4"><p className="text-sm text-gray-600">Get focused help without leaving this question.</p><div className="mt-3 flex flex-wrap gap-2">{actions.map(([action, label]) => <button key={action} type="button" onClick={() => askTutor(action)} className="min-h-[44px] min-w-[44px] rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100">{label}</button>)}</div><div className="mt-4 min-h-20 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-gray-700 whitespace-pre-line">{loading ? "Thinking…" : response || "Choose an option for a contextual explanation."}</div></div> : null}</div>
  </aside>;
}