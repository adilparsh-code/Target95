"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const PROGRESS_STORAGE_KEY = "target95-completed-questions";
const PROGRESS_UPDATED_EVENT = "target95-progress-updated";

function getQuestionKey({ chapter, questionId }) {
  return `${chapter}:${questionId}`;
}

function readCompletedQuestions() {
  try {
    const savedProgress = window.localStorage.getItem(PROGRESS_STORAGE_KEY);

    if (!savedProgress) {
      return [];
    }

    const parsedProgress = JSON.parse(savedProgress);

    return Array.isArray(parsedProgress)
      ? parsedProgress.filter(
          (item) =>
            typeof item?.chapter === "string" &&
            Number.isFinite(item?.questionId)
        )
      : [];
  } catch {
    return [];
  }
}

function saveCompletedQuestions(completedQuestions) {
  try {
    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify(completedQuestions)
    );
    window.dispatchEvent(new Event(PROGRESS_UPDATED_EVENT));
  } catch {
    // Keep the current session usable if browser storage is unavailable.
  }
}

export default function useProgress() {
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const completedQuestionsRef = useRef([]);

  const syncProgress = useCallback(() => {
    const savedProgress = readCompletedQuestions();

    completedQuestionsRef.current = savedProgress;
    setCompletedQuestions(savedProgress);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === PROGRESS_STORAGE_KEY) {
        syncProgress();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(PROGRESS_UPDATED_EVENT, syncProgress);
    const syncTimeout = window.setTimeout(syncProgress, 0);

    return () => {
      window.clearTimeout(syncTimeout);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(PROGRESS_UPDATED_EVENT, syncProgress);
    };
  }, [syncProgress]);

  const isCompleted = useCallback(
    (question) =>
      completedQuestions.some(
        (completedQuestion) =>
          getQuestionKey(completedQuestion) === getQuestionKey(question)
      ),
    [completedQuestions]
  );

  const markCompleted = useCallback((question) => {
    const questionKey = getQuestionKey(question);

    if (
      completedQuestionsRef.current.some(
        (completedQuestion) => getQuestionKey(completedQuestion) === questionKey
      )
    ) {
      return;
    }

    const nextProgress = [...completedQuestionsRef.current, question];

    completedQuestionsRef.current = nextProgress;
    saveCompletedQuestions(nextProgress);
    setCompletedQuestions(nextProgress);
  }, []);

  const resetProgress = useCallback((chapter) => {
    const nextProgress = completedQuestionsRef.current.filter(
      (completedQuestion) => completedQuestion.chapter !== chapter
    );

    completedQuestionsRef.current = nextProgress;
    saveCompletedQuestions(nextProgress);
    setCompletedQuestions(nextProgress);
  }, []);

  return {
    completedQuestions,
    isCompleted,
    markCompleted,
    resetProgress,
  };
}
