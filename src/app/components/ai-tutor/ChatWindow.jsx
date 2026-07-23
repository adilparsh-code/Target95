"use client";

import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import TypingAnimation from "./TypingAnimation";
import EmptyState from "./EmptyState";
import SuggestionCards from "./SuggestionCards";

export default function ChatWindow({ messages, loading, onSend, onOpenSidebar, context }) {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-950">
      {/* Chat header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 mr-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">AI Tutor</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Your personal study assistant</p>
        </div>
      </div>

      {/* Messages container */}
      <div ref={containerRef} className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          <EmptyState onSuggestionClick={onSend} />
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-6">
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
            
            {loading && <TypingAnimation />}
            
            {/* Show suggestions after AI response */}
            {!loading && messages.length > 0 && messages[messages.length - 1]?.role === "assistant" && (
              <SuggestionCards onSuggestionClick={onSend} context={context} />
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}