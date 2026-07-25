"use client";

import React from "react";

export default function ChatSidebar({ history, currentChatId, onSelectChat, onNewChat, onDeleteChat, historyLoading, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">AI Tutor</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button
            onClick={onNewChat}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat history */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Previous Conversations
          </h3>
          
          {historyLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : history.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
              No previous conversations yet. Start a new chat to begin!
            </p>
          ) : (
            <div className="space-y-2">
              {history.map((chat) => (
                <div
                  key={chat.id}
                  className={`group relative p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                    currentChatId === chat.id
                      ? "bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent"
                  }`}
                  onClick={() => onSelectChat(chat)}
                >
                  <div className="pr-8">
                    <p className={`text-sm font-medium truncate ${currentChatId === chat.id ? "text-blue-700 dark:text-blue-400" : "text-gray-900 dark:text-white"}`}>
                      {chat.question?.substring(0, 50) || "New conversation"}
                      {chat.question?.length > 50 ? "..." : ""}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {chat.subject} • {chat.chapter}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-opacity"
                    title="Delete conversation"
                  >
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}