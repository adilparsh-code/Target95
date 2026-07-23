"use client";

import { useState, useCallback, useEffect } from "react";
import { SessionService } from "../services/SessionService";

export function useSession(initialSession = null) {
  const [session, setSession] = useState(initialSession);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState(null);

  const sessionService = new SessionService();

  // Initialize timer if session has timer enabled
  useEffect(() => {
    if (session?.hasTimer && session?.duration && !timeRemaining) {
      // Convert minutes to milliseconds
      setTimeRemaining(session.duration * 60 * 1000);
    }
  }, [session, timeRemaining]);

  // Timer countdown effect
  useEffect(() => {
    if (!timeRemaining || isComplete) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1000) {
          // Time's up - auto complete the session
          completeSession();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isComplete]);

  // Current question getter
  const currentQuestion = session?.questions?.[currentIndex];
  
  // Progress calculation
  const progress = session?.questions?.length 
    ? ((currentIndex + 1) / session.questions.length) * 100 
    : 0;

  // Go to next question
  const nextQuestion = useCallback(() => {
    if (session && currentIndex < session.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [session, currentIndex]);

  // Go to previous question
  const previousQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  // Jump to specific question
  const jumpToQuestion = useCallback((index) => {
    if (session && index >= 0 && index < session.questions.length) {
      setCurrentIndex(index);
    }
  }, [session]);

  // Submit an answer
  const submitAnswer = useCallback(async (questionId, answer, isCorrect) => {
    setLoading(true);
    setError(null);

    try {
      // Update local state
      const newAnswer = { questionId, answer, isCorrect };
      setAnswers(prev => [...prev, newAnswer]);
      
      // Save to backend
      if (session?.id) {
        await sessionService.saveAnswer(session.id, questionId, answer, isCorrect);
      }

      return newAnswer;
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError("Failed to save answer. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [session, sessionService]);

  // Toggle flag on current question
  const toggleFlag = useCallback(async () => {
    if (!currentQuestion?.id || !session?.id) return;

    try {
      const isCurrentlyFlagged = flaggedQuestions.includes(currentQuestion.id);
      
      if (isCurrentlyFlagged) {
        setFlaggedQuestions(prev => prev.filter(id => id !== currentQuestion.id));
      } else {
        setFlaggedQuestions(prev => [...prev, currentQuestion.id]);
      }

      await sessionService.toggleFlag(session.id, currentQuestion.id);
    } catch (err) {
      console.error("Error toggling flag:", err);
      setError("Failed to update flag. Please try again.");
    }
  }, [currentQuestion, session, flaggedQuestions, sessionService]);

  // Complete the session
  const completeSession = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (!session?.id) throw new Error("No active session found");
      
      // Complete session on backend
      const sessionResults = await sessionService.completeSession(session.id);
      setResults(sessionResults);
      setIsComplete(true);
      
      return sessionResults;
    } catch (err) {
      console.error("Error completing session:", err);
      setError("Failed to complete session. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [session, sessionService]);

  // Format time remaining for display
  const formatTimeRemaining = () => {
    if (!timeRemaining) return "00:00";
    
    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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