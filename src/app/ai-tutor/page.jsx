"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ChatSidebar from "../components/ai-tutor/ChatSidebar";
import ChatWindow from "../components/ai-tutor/ChatWindow";
import PromptInput from "../components/ai-tutor/PromptInput";
import { useAITutor } from "../hooks/useAITutor";
import { usePersonalization } from "../hooks/usePersonalization";
import ProtectedRoute from "../components/ProtectedRoute";

function AITutorContent() {
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mode, setMode] = useState("Explain");
  const { board, class: selectedClass, subject } = usePersonalization();

  const questionContext = {
    board,
    class: selectedClass,
    subject: subject || searchParams.get("subject") || "Computer Science",
    chapter: searchParams.get("chapter") || "",
    question: searchParams.get("question") || "",
    difficulty: searchParams.get("difficulty") || "",
    questionType: searchParams.get("questionType") || "",
  };

  const {
    messages,
    loading,
    error,
    history,
    historyLoading,
    currentChatId,
    sendMessage,
    deleteChat,
    loadChat,
    startNewChat,
    clearCurrentChat,
    regenerateResponse,
    clearError,
  } = useAITutor(questionContext);

  const handleSend = (prompt) => {
    clearError();
    const prefix = mode === "Hint" ? "Give me a hint first. " : mode === "Practice" ? "Give me a practice question at my level. " : "";
    sendMessage(`${prefix}${prompt}`);
  };

  const handleSelectChat = (chat) => {
    loadChat(chat);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="flex h-screen overflow-hidden">
        <ChatSidebar
          history={history}
          currentChatId={currentChatId}
          onSelectChat={handleSelectChat}
          onNewChat={() => { startNewChat(); setSidebarOpen(false); }}
          onDeleteChat={deleteChat}
          historyLoading={historyLoading}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          messages={messages}
          onClearChat={clearCurrentChat}
        />

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 md:px-8">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <button type="button" onClick={() => setSidebarOpen(true)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold md:hidden dark:border-slate-700">☰</button>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl text-white shadow-sm">✦</div>
                <div className="min-w-0">
                  <p className="truncate text-lg font-bold">Target95 AI Tutor</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">{questionContext.board || "Board"} · Class {questionContext.class || "—"} · {questionContext.subject}</p>
                </div>
              </div>
              <div className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 md:block dark:bg-slate-900 dark:text-slate-300">{questionContext.chapter || "Choose a chapter to focus"}</div>
            </div>
          </header>

          <section className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
            <div className="mx-auto max-w-5xl">
              {messages.length === 0 && !loading ? (
                <div className="flex min-h-[70vh] items-center justify-center">
                  <div className="w-full max-w-3xl text-center">
                    <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-300">Personal study companion</span>
                    <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">Learn it. Understand it. <span className="text-indigo-600 dark:text-indigo-400">Score it.</span></h1>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">Ask about a chapter, paste a question, or tell me where you're stuck. I’ll guide you instead of dumping the answer.</p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      {["Explain a concept", "Trace this code", "Give me practice"].map((label) => (
                        <button key={label} type="button" onClick={() => handleSend(label)} className="rounded-2xl border border-slate-200 bg-white p-4 text-left text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">{label}<span className="mt-1 block text-xs font-normal text-slate-500 dark:text-slate-400">Start a guided session</span></button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <ChatWindow messages={messages} loading={loading} onSend={handleSend} onOpenSidebar={() => setSidebarOpen(true)} context={questionContext} onRegenerate={regenerateResponse} />
              )}

              {error && <div className="mx-auto mt-4 max-w-3xl rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300" role="alert">{error}</div>}
            </div>
          </section>

          <div className="border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
            <div className="mx-auto max-w-5xl">
              <div className="mb-3 flex flex-wrap gap-2">
                {["Explain", "Hint", "Practice"].map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${mode === item ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300"}`}>{item}</button>
                ))}
              </div>
              <PromptInput onSend={handleSend} disabled={loading} />
              <p className="mt-2 text-center text-[11px] text-slate-400">Use your course material as the final authority for exam wording and marking.</p>
            </div>
          </div>

          {currentChatId && <span className="sr-only">Current chat saved</span>}
          {historyLoading && <span className="sr-only">Loading chat history</span>}
        </main>
      </div>
    </div>
  );
}

export default function AITutorPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950"><div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-indigo-600" /></div>}>
        <AITutorContent />
      </Suspense>
    </ProtectedRoute>
  );
}
