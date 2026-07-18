"use client";

import { useCallback, useState } from "react";
import { sanitizeText } from "../../lib/mocktest";

const STORAGE_KEY = "target95-mock-test-history";

function getInitialHistory() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedHistory = window.localStorage.getItem(STORAGE_KEY);

    if (!savedHistory) {
      return [];
    }

    const parsedHistory = JSON.parse(savedHistory);

    return Array.isArray(parsedHistory) ? parsedHistory : [];
  } catch {
    return [];
  }
}

export default function useMockTest() {
  const [history, setHistory] = useState(getInitialHistory);

  const saveResult = useCallback((result) => {
    const safeResult = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString(),
      title: sanitizeText(result?.title || "Mock Test"),
      percentage: Number(result?.percentage) || 0,
      score: Number(result?.score) || 0,
      totalQuestions: Number(result?.totalQuestions) || 0,
      correctCount: Number(result?.correctCount) || 0,
      wrongCount: Number(result?.wrongCount) || 0,
      review: Array.isArray(result?.review) ? result.review.slice(0, 20) : [],
      config: result?.config ?? {},
    };

    const entry = {
      ...safeResult,
      id: safeResult.id,
    };

    setHistory((previousHistory) => {
      const updatedHistory = [entry, ...previousHistory].slice(0, 5);

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
      } catch {
        // Ignore storage failures.
      }

      return updatedHistory;
    });
  }, []);

  return { history, saveResult };
}
