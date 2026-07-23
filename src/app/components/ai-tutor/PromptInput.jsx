"use client";

import React, { useState } from "react";

export default function PromptInput({ onSend, disabled }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto flex items-end space-x-4">
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your doubt here..."
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            style={{ minHeight: "56px", maxHeight: "200px" }}
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim() || disabled}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors duration-200 flex items-center space-x-2"
        >
          <span>Send</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </form>
  );
}