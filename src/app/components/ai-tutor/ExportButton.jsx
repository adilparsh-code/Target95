"use client";

import React from "react";

export default function ExportButton({ messages, onClearChat }) {
  const exportConversation = () => {
    if (messages.length === 0) {
      alert("No conversation to export");
      return;
    }

    // Format the conversation for export
    const formattedConversation = messages.map((msg, index) => {
      const role = msg.role === "user" ? "You" : msg.role === "assistant" ? "AI Tutor" : "System";
      const content = typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content, null, 2);
      return `${index + 1}. ${role}:\n${content}\n\n`;
    }).join("");

    // Add metadata
    const exportContent = `# AI Tutor Conversation Export\nGenerated: ${new Date().toLocaleString()}\n\n${formattedConversation}`;

    // Create and download the file
    const blob = new Blob([exportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai-tutor-conversation-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-2">
      <button
        onClick={exportConversation}
        disabled={messages.length === 0}
        className="w-full py-2 px-4 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>Export Conversation</span>
      </button>
      <button
        onClick={onClearChat}
        disabled={messages.length === 0}
        className="w-full py-2 px-4 text-sm bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 disabled:opacity-50 disabled:cursor-not-allowed text-red-600 dark:text-red-400 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <span>Clear Chat</span>
      </button>
    </div>
  );
}