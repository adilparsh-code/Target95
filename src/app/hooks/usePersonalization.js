"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "target95_personalization";

const defaultState = {
  board: null,
  class: null,
  subject: null,
};

export function usePersonalization() {
  const [state, setState] = useState(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setState({
          board: parsed.board || null,
          class: parsed.class || null,
          subject: parsed.subject || null,
        });
      }
    } catch (error) {
      console.error("Failed to hydrate personalization state:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist to localStorage whenever state changes (debounced)
  useEffect(() => {
    if (!isHydrated) return;
    
    let timeoutId;
    try {
      timeoutId = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }, 100); // Debounce localStorage writes
    } catch (error) {
      console.error("Failed to persist personalization state:", error);
    }
    
    return () => clearTimeout(timeoutId);
  }, [state, isHydrated]);

  const setBoard = (board) => {
    setState(prev => ({
      ...prev,
      board,
      // Reset class and subject when board changes
      class: null,
      subject: null,
    }));
  };

  const setClass = (classData) => {
    setState(prev => ({
      ...prev,
      class: classData,
      // Reset subject when class changes
      subject: null,
    }));
  };

  const setSubject = (subject) => {
    setState(prev => ({
      ...prev,
      subject,
    }));
  };

  const clearPersonalization = () => {
    setState(defaultState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear personalization state:", error);
    }
  };

  return {
    ...state,
    isHydrated,
    setBoard,
    setClass,
    setSubject,
    clearPersonalization,
  };
}