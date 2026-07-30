"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ChatSidebar from "../components/ai-tutor/ChatSidebar";
import ChatWindow from "../components/ai-tutor/ChatWindow";
import PromptInput from "../components/ai-tutor/PromptInput";
import { useAITutor } from "../hooks/useAITutor";
import ProtectedRoute from "../components/ProtectedRoute";

function AITutorContent() {
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Extract context from URL parameters if coming from a question page
  const questionContext = {
    question: searchParams.get("question") || "",
    chapter: searchParams.get("chapter") || "",
    difficulty: searchParams.get("difficulty") || "",
    subject: searchParams.get("subject") || "Computer Science"
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
    clearError
  } = useAITutor(questionContext);

  // Clear any errors when sending a new message
  const handleSend = (prompt) => {
    clearError();
    sendMessage(prompt);
  };

  const handleSelectChat = (chat) => {
    loadChat(chat);
    setSidebarOpen(false);
  };

  const handleNewChat = () => {
    startNewChat();
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <ChatSidebar
        history={history}
        currentChatId={currentChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={deleteChat}
        historyLoading={historyLoading}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        messages={messages}
        onClearChat={clearCurrentChat}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <ChatWindow
          messages={messages}
          loading={loading}
          onSend={handleSend}
          onOpenSidebar={() => setSidebarOpen(true)}
          context={questionContext}
          onRegenerate={regenerateResponse}
        />
        
        {/* Error message */}
        {error && (
          <div className="px-4 py-2 bg-red-50 dark:bg-red-900/30 border-t border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
          </div>
        )}

        <PromptInput onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}

export default function AITutorPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
        <AITutorContent />
      </Suspense>
    </ProtectedRoute>
  );
}