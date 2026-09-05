"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "target95_personalization";

const SUBJECTS_BY_BOARD_CLASS = {
  cisce: {
    "icse-class-9": ["java", "ai"],
    "icse-class-10": ["java", "ai"],
    "isc-class-11": ["java", "ai"],
    "isc-class-12": ["java", "ai"],
  },
  cbse: {
    "class-9": ["402"],
    "class-10": ["402"],
    "class-11": ["083", "065", "802"],
    "class-12": ["083", "065", "802"],
  },
};

const defaultState = { board: null, class: null, subject: null };

function normalizeStoredState(parsed) {
  const board = parsed?.board && SUBJECTS_BY_BOARD_CLASS[parsed.board] ? parsed.board : null;
  const classData = board && parsed?.class?.id && SUBJECTS_BY_BOARD_CLASS[board][parsed.class.id]
    ? parsed.class
    : null;
  const allowedSubjects = classData ? SUBJECTS_BY_BOARD_CLASS[board][classData.id] : [];
  const subject = allowedSubjects.includes(String(parsed?.subject || "")) ? String(parsed.subject) : null;
  return { board, class: classData, subject };
}

export function usePersonalization() {
  const [state, setState] = useState(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const normalized = normalizeStoredState(JSON.parse(stored));
        setState(normalized);
        if (JSON.stringify(normalized) !== stored) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
        }
      }
    } catch (error) {
      console.error("Failed to hydrate personalization state:", error);
      setState(defaultState);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    let timeoutId;
    try {
      timeoutId = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }, 100);
    } catch (error) {
      console.error("Failed to persist personalization state:", error);
    }
    return () => clearTimeout(timeoutId);
  }, [state, isHydrated]);

  const setBoard = (board) => {
    setState(prev => ({ ...prev, board, class: null, subject: null }));
  };

  const setClass = (classData) => {
    setState(prev => ({ ...prev, class: classData, subject: null }));
  };

  const setSubject = (subject) => {
    setState(prev => {
      const allowed = prev.board && prev.class?.id ? SUBJECTS_BY_BOARD_CLASS[prev.board]?.[prev.class.id] || [] : [];
      return { ...prev, subject: allowed.includes(String(subject)) ? String(subject) : null };
    });
  };

  const clearPersonalization = () => {
    setState(defaultState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear personalization state:", error);
    }
  };

  return { ...state, isHydrated, setBoard, setClass, setSubject, clearPersonalization };
}
