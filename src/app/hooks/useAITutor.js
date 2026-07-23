"use client";

import { useState, useCallback, useEffect } from "react";
import { aiService } from "../services/AIService";

export function useAITutor(initialContext = {}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);

  // Load chat history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  // If there's initial context (from question page), send it automatically
  useEffect(() => {
    if (initialContext.question && messages.length === 0) {
      const contextMessage = {
        role: "system",
        content: "Context loaded from question page",
        context: initialContext
      };
      setMessages([contextMessage]);
    }
  }, [initialContext]);

  // Load chat history from Firestore
  const loadHistory = useCallback(async () => {
    setHistoryLoading(true);
    setError(null);
    try {
      const chats = await aiService.getHistory();
      setHistory(chats);
    } catch (err) {
      setError(err.message);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  // Send a message to AI
  const sendMessage = useCallback(async (prompt) => {
    if (!prompt || prompt.trim() === "") {
      setError("Please enter a valid question");
      return;
    }

    setLoading(true);
    setError(null);

    // Add user message to chat
    const userMessage = {
      role: "user",
      content: prompt,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Get AI response
      const aiResponse = await aiService.sendPrompt(prompt, initialContext);
      
      // Add AI response to chat
      const aiMessage = {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

      // Save the chat to Firestore
      const savedChat = await aiService.saveChat({
        question: prompt,
        response: aiResponse,
        subject: initialContext.subject || "General",
        chapter: initialContext.chapter || "General",
        ...initialContext
      });
      
      setCurrentChatId(savedChat.id);
      // Refresh history
      await loadHistory();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [initialContext, loadHistory]);

  // Delete a conversation
  const deleteChat = useCallback(async (chatId) => {
    setError(null);
    try {
      await aiService.deleteConversation(chatId);
      if (currentChatId === chatId) {
        setCurrentChatId(null);
        setMessages([]);
      }
      await loadHistory();
    } catch (err) {
      setError(err.message);
    }
  }, [currentChatId, loadHistory]);

  // Load a specific chat from history
  const loadChat = useCallback((chat) => {
    const loadedMessages = [
      {
        role: "user",
        content: chat.question,
        timestamp: chat.createdAt?.toDate() || new Date()
      },
      {
        role: "assistant",
        content: chat.response,
        timestamp: chat.createdAt?.toDate() || new Date()
      }
    ];
    setMessages(loadedMessages);
    setCurrentChatId(chat.id);
  }, []);

  // Start a new chat
  const startNewChat = useCallback(() => {
    setMessages([]);
    setCurrentChatId(null);
    setError(null);
    
    // If there's initial context, add it to the new chat
    if (initialContext.question) {
      const contextMessage = {
        role: "system",
        content: "Context loaded from question page",
        context: initialContext
      };
      setMessages([contextMessage]);
    }
  }, [initialContext]);

  return {
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
    clearError: () => setError(null)
  };
}