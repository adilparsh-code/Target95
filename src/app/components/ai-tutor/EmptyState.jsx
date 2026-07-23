"use client";

import React from "react";

export default function EmptyState({ onSuggestionClick }) {
  const suggestions = [
    "Explain the concept of variables in Java",
    "How do loops work in programming?",
    "What is the difference between arrays and strings?",
    "Can you explain object-oriented programming?",
    "What are methods and how do I use them?"
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-12 text-center">
      <div className="w-20 h-20 mb-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-blue-600 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Welcome to AI Tutor
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        I'm here to help you understand Computer Science concepts. Ask me anything about your studies, and I'll break it down for you with clear explanations, examples, and key points.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="p-4 text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200"
          >
            <span className="text-sm text-gray-700 dark:text-gray-300">{suggestion}</span>
          </button>
        ))}
      </div>
    </div>
  );
}