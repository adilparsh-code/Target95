"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useStudentBotChat } from "./hooks/useStudentBotChat";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import QuickActions from "./components/QuickActions";

const contextLabel = (c) => [c.board?.toUpperCase(), c.classSlug?.replace("class-", "Class "), c.subjectSlug].filter(Boolean).join(" · ");

export default function StudentBotApp() {
  const { user } = useAuth();
  const chat = useStudentBotChat(user?.uid);
  const [confirmClear, setConfirmClear] = useState(false);
  const label = contextLabel(chat.context);
  const lastQuick = [...chat.messages].reverse().find((m) => m.role === "bot")?.quickReplies;

  return (
    <main className="mx-auto flex h-[100dvh] max-w-3xl flex-col overflow-hidden bg-white shadow-xl dark:bg-slate-900 sm:my-0">
      <header className="flex items-center justify-between gap-2 bg-[#075e54] px-4 py-3 text-white">
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold">Target95 Study Assistant</h1>
          <p className="truncate text-xs text-emerald-100">{label || "Choose a board, class and subject to begin"}</p>
        </div>
        {confirmClear ? (
          <div className="flex items-center gap-2 text-xs" role="alertdialog" aria-label="Clear conversation?">
            <span>Clear chat?</span>
            <button type="button" onClick={() => { chat.reset(); setConfirmClear(false); }} className="rounded bg-white px-2 py-1 font-semibold text-emerald-900">Yes</button>
            <button type="button" onClick={() => setConfirmClear(false)} className="rounded border border-white/60 px-2 py-1">Cancel</button>
          </div>
        ) : (
          <div className="flex shrink-0 gap-2 text-xs">
            <button type="button" onClick={() => chat.send("HELP")} disabled={chat.sending} className="rounded border border-white/60 px-2 py-1 disabled:opacity-50">New conversation</button>
            <button type="button" onClick={() => setConfirmClear(true)} disabled={!chat.messages.length} className="rounded border border-white/60 px-2 py-1 disabled:opacity-50">Clear</button>
          </div>
        )}
      </header>
      <ChatWindow messages={chat.messages} sending={chat.sending} submitted={chat.submitted} onSubmitQuiz={chat.submitQuiz} onPick={chat.send} />
      <QuickActions onPick={chat.send} disabled={chat.sending} extra={lastQuick} />
      <ChatInput onSend={chat.send} disabled={chat.sending} />
    </main>
  );
}
