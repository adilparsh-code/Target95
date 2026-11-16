"use client";

import { useState } from "react";

const MAX_CHARS = 500;

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const submit = (event) => {
    event.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  };
  return (
    <form onSubmit={submit} className="flex items-end gap-2 border-t border-slate-200 bg-slate-100 p-2 dark:border-slate-700 dark:bg-slate-900">
      <label htmlFor="student-bot-input" className="sr-only">Message the study assistant</label>
      <textarea
        id="student-bot-input"
        rows={1}
        maxLength={MAX_CHARS}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) submit(e);
        }}
        placeholder="Type a message, e.g. HELP"
        className="max-h-32 min-h-[44px] flex-1 resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:outline focus:outline-2 focus:outline-emerald-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="h-11 shrink-0 rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}
