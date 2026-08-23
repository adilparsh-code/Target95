"use client";

import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import TypingAnimation from "./TypingAnimation";
import EmptyState from "./EmptyState";
import SuggestionCards from "./SuggestionCards";
import ScrollToBottomButton from "./ScrollToBottomButton";

const TUTOR_MODES = {
  explain: "Explain this topic step by step in simple language suitable for my board exam.",
  hint: "Give me a hint only. Do not reveal the final answer yet.",
  practice: "Give me one board-style practice question on this topic. Wait for my answer before evaluating it.",
};

export default function ChatWindow({ messages = [], loading = false, onSend, onOpenSidebar, context = {}, onRegenerate }) {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!loading) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const hasMessages = messages.length > 0;
  const lastMessageIndex = messages.length - 1;
  const hasContext = Boolean(context?.board || context?.class || context?.subject || context?.chapter);

  const sendTutorMode = (mode) => {
    const prompt = TUTOR_MODES[mode];
    if (!prompt || loading || typeof onSend !== "function") return;

    const contextParts = [
      context?.board && `Board: ${context.board}`,
      context?.class && `Class: ${context.class}`,
      context?.subject && `Subject: ${context.subject}`,
      context?.chapter && `Chapter: ${context.chapter}`,
    ].filter(Boolean);

    const contextInstruction = contextParts.length
      ? `\n\nStudy context:\n${contextParts.join("\n")}\nUse this context to keep your response aligned with my syllabus.`
      : "";

    onSend(`${prompt}${contextInstruction}`);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-950 relative">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center min-w-0">
          <button type="button" onClick={onOpenSidebar} aria-label="Open chat history" className="lg:hidden p-2 mr-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">AI Tutor</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Your personal study assistant</p>
          </div>
        </div>
        {hasContext && (
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
            {context.board && <span className="px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30">{context.board}</span>}
            {context.class && <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">Class {context.class}</span>}
            {context.subject && <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 max-w-[160px] truncate">{context.subject}</span>}
          </div>
        )}
      </div>

      <div ref={containerRef} className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          <div className="max-w-4xl mx-auto w-full">
            <EmptyState onSuggestionClick={onSend} />
            <div className="px-4 pb-6">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Tutor modes</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  ["explain", "Explain", "Understand the concept step by step"],
                  ["hint", "Hint", "Get guidance without the final answer"],
                  ["practice", "Practice", "Try a board-style question"],
                ].map(([mode, title, description]) => (
                  <button key={mode} type="button" disabled={loading} onClick={() => sendTutorMode(mode)} className="text-left p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 disabled:opacity-50 transition-colors">
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
                    <span className="block mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-6">
            {messages.map((message, index) => (
              <MessageBubble key={message.id || index} message={message} onRegenerate={index === lastMessageIndex && message.role === "assistant" ? onRegenerate : null} isLastMessage={index === lastMessageIndex} />
            ))}
            {loading && <TypingAnimation />}
            {!loading && messages[messages.length - 1]?.role === "assistant" && <SuggestionCards onSuggestionClick={onSend} context={context} />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <ScrollToBottomButton containerRef={containerRef} messagesEndRef={messagesEndRef} />
    </div>
  );
}
