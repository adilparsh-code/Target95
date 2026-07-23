"use client";

import React from "react";

export default function TypingAnimation() {
  return (
    <div className="flex items-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-none max-w-[80%]">
      <div className="flex space-x-1">
        <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
        <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
        <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
    </div>
  );
}