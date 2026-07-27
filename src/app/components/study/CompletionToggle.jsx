"use client";

import { useState, useCallback } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon as CheckCircleOutline } from "@heroicons/react/24/outline";

const COMPLETED_STORAGE_KEY = "target95-completed-questions";

function getSavedCompleted() {
  try {
    const saved = window.localStorage.getItem(COMPLETED_STORAGE_KEY);
    if (!saved) return [];
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

function saveCompleted(completedIds) {
  try {
    window.localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completedIds));
  } catch {
    // Ignore storage failures
  }
}

export default function CompletionToggle({ questionId }) {
  const [isCompleted, setIsCompleted] = useState(() => {
    return getSavedCompleted().includes(questionId);
  });

  const toggleCompleted = useCallback(() => {
    const completed = getSavedCompleted();
    if (isCompleted) {
      const updated = completed.filter((id) => id !== questionId);
      saveCompleted(updated);
      setIsCompleted(false);
    } else {
      const updated = [...completed, questionId];
      saveCompleted(updated);
      setIsCompleted(true);
    }
  }, [questionId, isCompleted]);

  return (
    <button
      type="button"
      onClick={toggleCompleted}
      className={`rounded-xl p-2 transition ${
        isCompleted
          ? "bg-green-100 text-green-600 hover:bg-green-200"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
      }`}
      aria-label={isCompleted ? "Mark as incomplete" : "Mark as completed"}
      title={isCompleted ? "Mark as incomplete" : "Mark as completed"}
    >
      {isCompleted ? (
        <CheckCircleIcon className="h-5 w-5" />
      ) : (
        <CheckCircleOutline className="h-5 w-5" />
      )}
    </button>
  );
}