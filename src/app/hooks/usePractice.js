"use client";

import { useState, useCallback, useMemo } from "react";
import { PracticeService } from "../services/PracticeService";
import { SessionService } from "../services/SessionService";

const DEFAULT_SETTINGS = {
  board: "ICSE",
  classNumber: 10,
  subjectCode: "",
  subject: "",
  subjectName: "",
  chapter: "",
  difficulty: "",
  questionCount: 20,
  hasTimer: false,
  duration: 30
};

export function usePractice() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);

  const practiceService = useMemo(() => new PracticeService(), []);
  const sessionService = useMemo(() => new SessionService(), []);

  const updateSettings = useCallback((updates) => {
    setSettings(prev => ({ ...prev, ...updates }));
    setError(null);
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    setError(null);
    setSession(null);
  }, []);

  const startPractice = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const questionCount = Number(settings.questionCount);
      const duration = Number(settings.duration);
      const board = String(settings.board || "ICSE").toUpperCase();

      if (!settings.subject) throw new Error("Please select a subject");
      if (!settings.difficulty) throw new Error("Please select a difficulty");
      if (!Number.isInteger(questionCount) || questionCount < 1 || questionCount > 50) {
        throw new Error("Please select a valid number of questions (1-50)");
      }
      if (settings.hasTimer && (!Number.isFinite(duration) || duration < 5 || duration > 180)) {
        throw new Error("Please select a valid timer duration (5-180 minutes)");
      }
      if (board === "CBSE" && (!settings.classNumber || !settings.subjectCode)) {
        throw new Error("CBSE practice requires a valid class and subject code");
      }

      const newSession = await sessionService.startSession({
        ...settings,
        board,
        questionCount,
        duration
      });
      setSession(newSession);
      return newSession;
    } catch (err) {
      console.error("Error starting practice:", err);
      setError(err.message || "Failed to start practice session. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [settings, sessionService]);

  const getHistory = useCallback(async () => {
    try {
      return await practiceService.getSessionHistory(10);
    } catch (err) {
      console.error("Error getting history:", err);
      setError("Failed to load practice history.");
      return [];
    }
  }, [practiceService]);

  return {
    settings,
    updateSettings,
    resetSettings,
    startPractice,
    getHistory,
    loading,
    error,
    session
  };
}
