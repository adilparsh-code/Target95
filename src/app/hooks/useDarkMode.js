"use client";

import { useCallback, useEffect, useState } from "react";

const SETTINGS_KEY = "target95-student-settings";
const LEGACY_KEY = "darkMode";

function getSystemDark() {
  return typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : false;
}

function applyTheme(theme) {
  if (typeof document === "undefined") return;
  const dark = theme === "dark" || (theme === "system" && getSystemDark());
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

export default function useDarkMode() {
  const [theme, setThemeState] = useState("system");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY));
      const legacy = localStorage.getItem(LEGACY_KEY);
      const nextTheme = saved?.theme ?? (legacy === null ? "system" : legacy === "true" ? "dark" : "light");
      setThemeState(nextTheme);
      applyTheme(nextTheme);
    } catch {
      applyTheme("system");
    }
  }, []);

  useEffect(() => {
    if (theme !== "system") {
      applyTheme(theme);
      return undefined;
    }

    applyTheme("system");
    if (typeof window === "undefined") return undefined;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme("system");
    media.addEventListener?.("change", handleChange);
    return () => media.removeEventListener?.("change", handleChange);
  }, [theme]);

  const setTheme = useCallback((nextTheme) => {
    const validTheme = ["light", "dark", "system"].includes(nextTheme) ? nextTheme : "system";
    setThemeState(validTheme);
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...saved, theme: validTheme }));
      if (validTheme === "dark") localStorage.setItem(LEGACY_KEY, "true");
      else if (validTheme === "light") localStorage.setItem(LEGACY_KEY, "false");
      else localStorage.removeItem(LEGACY_KEY);
    } catch {
      // Theme still applies for the current session when storage is unavailable.
    }
    applyTheme(validTheme);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  return { theme, setTheme, toggleDarkMode, isDark: theme === "dark" || (theme === "system" && getSystemDark()) };
}
