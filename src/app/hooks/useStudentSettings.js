"use client";

import { useEffect, useState } from "react";

const SETTINGS_KEY = "target95-student-settings";
const defaults = { 
  theme: "system", 
  notifications: true, 
  profileVisible: false, 
  aiDetail: "guided",
  // New settings
  fontSize: "medium",
  language: "en",
  learningReminders: true,
  mockTestAlerts: true,
  achievementUpdates: true,
  weeklyReports: true,
  dailyStudyGoal: 2,
  dailyQuestionsGoal: 20,
  privateProfile: true,
  showActivityStatus: false,
  shareProgressReports: false
};

export default function useStudentSettings() {
  const [settings, setSettings] = useState(defaults);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY));
      if (saved && typeof saved === "object") setSettings((current) => ({ ...current, ...saved }));
    } catch {
      // Settings remain available with defaults when storage is unavailable.
    } finally {
      setReady(true);
    }
  }, []);

  const updateSetting = (key, value) => setSettings((current) => {
    const next = { ...current, [key]: value };
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(next)); } catch { /* no-op */ }
    return next;
  });

  return { settings, ready, updateSetting };
}