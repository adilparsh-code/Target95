"use client";

import { useCallback, useMemo, useState } from "react";

const STORAGE_KEY = "target95-learning-content-progress";

function readProgress() {
  try { return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || { attempts: {}, completedTopics: {} }; } catch { return { attempts: {}, completedTopics: {} }; }
}

export default function useLearningProgress() {
  const [state, setState] = useState(() => typeof window === "undefined" ? { attempts: {}, completedTopics: {} } : readProgress());
  const persist = useCallback((next) => { setState(next); window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }, []);
  const recordAttempt = useCallback((question, correct = null) => {
    const previous = state.attempts[question.id];
    if (previous?.submitted) return;
    persist({ ...state, attempts: { ...state.attempts, [question.id]: { submitted: true, correct, chapter: question.chapter, attemptedAt: new Date().toISOString() } } });
  }, [persist, state]);
  const toggleTopicComplete = useCallback((slug) => persist({ ...state, completedTopics: { ...state.completedTopics, [slug]: !state.completedTopics[slug] } }), [persist, state]);
  const stats = useMemo(() => {
    const attempts = Object.values(state.attempts); const scored = attempts.filter((item) => typeof item.correct === "boolean"); const solved = scored.filter((item) => item.correct).length;
    return { attempted: attempts.length, solved, accuracy: scored.length ? Math.round((solved / scored.length) * 100) : 0 };
  }, [state]);
  return { attempts: state.attempts, completedTopics: state.completedTopics, stats, recordAttempt, toggleTopicComplete };
}
