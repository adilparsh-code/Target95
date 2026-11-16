"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import QuizCard from "./QuizCard";
import TypingIndicator from "./TypingIndicator";

const EXAMPLES = ["SET icse class 10 hindi", "CHAPTERS", "QUIZ <chapter>", "PRACTICE loops"];

export default function ChatWindow({ messages, sending, submitted, onSubmitQuiz, onPick }) {
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView?.({ block: "end" });
  }, [messages.length, sending]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#efeae2] px-3 py-4 dark:bg-slate-950" role="log" aria-live="polite" aria-label="Conversation">
      {messages.length === 0 && !sending && (
        <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-white/90 p-5 text-center shadow-sm dark:bg-slate-800">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Ask me about your syllabus</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">I use only published Target95 content. Try one of these:</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {EXAMPLES.map((example) => (
              <button key={example} type="button" onClick={() => onPick(example)} className="rounded-full border border-emerald-600 px-3 py-1.5 text-xs text-emerald-800 hover:bg-emerald-50 dark:text-emerald-200 dark:hover:bg-emerald-950">
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m}>
            {m.card?.type === "quiz" && (
              <QuizCard card={m.card} submitted={Boolean(submitted[m.card.attemptId])} onSubmit={onSubmitQuiz} />
            )}
            {m.card?.type === "quiz_archived" && <p className="mt-2 text-xs italic text-slate-500">This quiz has ended. Send QUIZ to start a new one.</p>}
          </MessageBubble>
        ))}
        {sending && <TypingIndicator />}
        <div ref={endRef} />
      </div>
    </div>
  );
}
