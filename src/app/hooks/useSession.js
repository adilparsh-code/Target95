"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { SessionService } from "../services/SessionService";

export function useSession(initialSession = null) {
  const [session, setSession] = useState(initialSession);
  const [currentIndex, setCurrentIndex] = useState(initialSession?.currentQuestionIndex || 0);
  const [answers, setAnswers] = useState(initialSession?.answers || []);
  const [flaggedQuestions, setFlaggedQuestions] = useState(initialSession?.flaggedQuestions || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(
    initialSession?.hasTimer && initialSession?.duration ? initialSession.duration * 60 * 1000 : null
  );
  const [isComplete, setIsComplete] = useState(initialSession?.status === "completed");
  const [results, setResults] = useState(initialSession?.results || null);
  const sessionServiceRef = useRef(null);
  const completionStartedRef = useRef(false);

  if (!sessionServiceRef.current) {
    sessionServiceRef.current = new SessionService();
  }

  const currentQuestion = session?.questions?.[currentIndex];
  const progress = session?.questions?.length
    ? ((currentIndex + 1) / session.questions.length) * 100
    : 0;

  // Keep local state aligned if a new session is supplied.
  useEffect(() => {
    setSession(initialSession);
    setCurrentIndex(initialSession?.currentQuestionIndex || 0);
    setAnswers(initialSession?.answers || []);
    setFlaggedQuestions(initialSession?.flaggedQuestions || []);
    setResults(initialSession?.results || null);
    setIsComplete(initialSession?.status === "completed");
    setTimeRemaining(
      initialSession?.hasTimer && initialSession?.duration
        ? initialSession.duration * 60 * 1000
        : null
    );
    completionStartedRef.current = false;
  }, [initialSession]);

  const persistIndex = useCallback((nextIndex) => {
    if (!session?.id) return;
    sessionServiceRef.current.updateSession(session.id, {
      currentQuestionIndex: nextIndex
    }).catch(err => console.error("Failed to save practice position:", err));
  }, [session]);

  const nextQuestion = useCallback(() => {
    if (!session || currentIndex >= session.questions.length - 1) return;
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    persistIndex(nextIndex);
  }, [session, currentIndex, persistIndex]);

  const previousQuestion = useCallback(() => {
    if (currentIndex <= 0) return;
    const previousIndex = currentIndex - 1;
    setCurrentIndex(previousIndex);
    persistIndex(previousIndex);
  }, [currentIndex, persistIndex]);

  const jumpToQuestion = useCallback((index) => {
    if (!session || index < 0 || index >= session.questions.length) return;
    setCurrentIndex(index);
    persistIndex(index);
  }, [session, persistIndex]);

  const submitAnswer = useCallback(async (questionId, answer, isCorrect) => {
    setLoading(true);
    setError(null);
    const newAnswer = { questionId, answer, isCorrect: Boolean(isCorrect) };

    try {
      setAnswers(prev => [
        ...prev.filter(item => item.questionId !== questionId),
        newAnswer
      ]);

      if (session?.id) {
        await sessionServiceRef.current.saveAnswer(
          session.id,
          questionId,
          answer,
          isCorrect
        );
      }
      return newAnswer;
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError("Failed to save answer. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [session]);

  const toggleFlag = useCallback(async () => {
    if (!currentQuestion?.id || !session?.id) return;
    const questionId = currentQuestion.id;
    const wasFlagged = flaggedQuestions.includes(questionId);

    setFlaggedQuestions(prev => (
      wasFlagged
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    ));

    try {
      await sessionServiceRef.current.toggleFlag(session.id, questionId);
    } catch (err) {
      // Roll back the optimistic update if persistence fails.
      setFlaggedQuestions(prev => (
        wasFlagged
          ? [...prev, questionId]
          : prev.filter(id => id !== questionId)
      ));
      setError("Failed to update flag. Please try again.");
    }
  }, [currentQuestion, session, flaggedQuestions]);

  const completeSession = useCallback(async () => {
    if (!session?.id || completionStartedRef.current) return null;
    completionStartedRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const sessionResults = await sessionServiceRef.current.completeSession(session.id);
      setResults(sessionResults);
      setIsComplete(true);
      setTimeRemaining(0);
      return sessionResults;
    } catch (err) {
      completionStartedRef.current = false;
      console.error("Error completing session:", err);
      setError("Failed to complete session. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [session]);

  // Timer countdown. A completed session can never be auto-submitted twice.
  useEffect(() => {
    if (!timeRemaining || isComplete) return undefined;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1000) {
          clearInterval(timer);
          completeSession().catch(() => {});
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isComplete, completeSession]);

  const formatTimeRemaining = () => {
    if (!timeRemaining) return "00:00";
    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return {
    session,
    currentQuestion,
    currentIndex,
    answers,
    flaggedQuestions,
    loading,
    error,
    isComplete,
    results,
    progress,
    timeRemaining: formatTimeRemaining(),
    nextQuestion,
    previousQuestion,
    jumpToQuestion,
    submitAnswer,
    toggleFlag,
    completeSession
  };
}
