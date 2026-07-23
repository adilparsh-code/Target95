"use client";

import React from "react";

export default function MessageBubble({ message }) {
  const { role, content, context } = message;

  // System message (context from question page)
  if (role === "system") {
    return (
      <div className="flex justify-center mb-4">
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-700 dark:text-blue-300">
          📚 Context loaded: {context?.subject} - {context?.chapter} | Question loaded from page
        </div>
      </div>
    );
  }

  // User message
  if (role === "user") {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[80%] px-4 py-3 bg-blue-600 text-white rounded-2xl rounded-br-none">
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
      </div>
    );
  }

  // AI assistant message with structured content
  const aiContent = content;
  return (
    <div className="flex justify-start mb-6">
      <div className="max-w-[90%] w-full space-y-4">
        {/* Avatar and header */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Tutor</span>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-none p-5 space-y-6 shadow-sm">
          {/* Explanation */}
          {aiContent?.explanation && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Explanation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{aiContent.explanation}</p>
            </div>
          )}

          {/* Step-by-step */}
          {aiContent?.stepByStep && aiContent.stepByStep.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Step-by-Step Solution
              </h4>
              <ol className="space-y-2">
                {aiContent.stepByStep.map((step, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Example */}
          {aiContent?.example && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Example
              </h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                <code>{aiContent.example}</code>
              </pre>
            </div>
          )}

          {/* Key Points */}
          {aiContent?.keyPoints && aiContent.keyPoints.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Key Points
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {aiContent.keyPoints.map((point, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-lg">
                    <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Topics */}
          {aiContent?.relatedTopics && aiContent.relatedTopics.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                Related Topics
              </h4>
              <div className="flex flex-wrap gap-2">
                {aiContent.relatedTopics.map((topic, index) => (
                  <span key={index} className="px-3 py-1 text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}