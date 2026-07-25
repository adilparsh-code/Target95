"use client";

import React from "react";

export default function SuggestionCards({ onSuggestionClick, context }) {
  const defaultSuggestions = [
    "Explain this in simpler terms",
    "Give me more examples",
    "What are common mistakes to avoid?",
    "How can I practice this concept?"
  ];

  const contextAwareSuggestions = context?.subject ? [
    `Explain more about ${context.chapter || 'this topic'}`,
    `What are the key exam questions on ${context.chapter || 'this subject'}?`,
    "Can you summarize the key points?",
    "Show me a practical implementation"
  ] : defaultSuggestions;

  return (
    <div className="flex flex-wrap gap-2 mt-4 px-4">
      {contextAwareSuggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion)}
          className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}