"use client";

import { useState, useCallback } from "react";
import { PracticeService } from "../services/PracticeService";
import { SessionService } from "../services/SessionService";

export function usePractice() {
  const [settings, setSettings] = useState({
    subject: "",
    chapter: "",
    difficulty: "",
    questionCount: 20,
    hasTimer: false,
    duration: 30 // minutes
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);

  const practiceService = new PracticeService();
  const sessionService = new SessionService();

  // Update settings
  const updateSettings = useCallback((updates) => {
    setSettings(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  // Reset settings
  const resetSettings = useCallback(() => {
    setSettings({
      subject: "",
      chapter: "",
      difficulty: "",
      questionCount: 20,
      hasTimer: false,
      duration: 30
    });
    setError(null);
    setSession(null);
  }, []);

  // Start practice session
  const startPractice = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Validate settings
      if (!settings.subject) throw new Error("Please select a subject");
      if (!settings.difficulty && settings.chapter) throw new Error("Please select a difficulty");
      if (settings.questionCount < 1 || settings.questionCount > 50) {
        throw new Error("Please select a valid number of questions (1-50)");
      }

      // Start the session
      const newSession = await sessionService.startSession(settings);
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

  // Get session history
  const getHistory = useCallback(async () => {
    try {
      const history = await practiceService.getSessionHistory(10);
      return history;
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