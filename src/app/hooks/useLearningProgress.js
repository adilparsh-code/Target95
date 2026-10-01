"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const STORAGE_KEY = "target95-learning-content-progress";

function readProgress(storageKey) {
  try { return JSON.parse(window.localStorage.getItem(storageKey)) || { attempts: {}, completedTopics: {} }; } catch { return { attempts: {}, completedTopics: {} }; }
}

export default function useLearningProgress() {
  const { user } = useAuth();
  const storageKey = user?.uid ? `${STORAGE_KEY}:${user.uid}` : STORAGE_KEY;
  const [state, setState] = useState(() => typeof window === "undefined" ? { attempts: {}, completedTopics: {} } : readProgress(storageKey));
  useEffect(() => setState(readProgress(storageKey)), [storageKey]);
  const persist = useCallback((next) => { setState(next); window.localStorage.setItem(storageKey, JSON.stringify(next)); }, [storageKey]);
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
