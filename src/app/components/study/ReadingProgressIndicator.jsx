"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { BookOpen, Sparkles, Flame, Trophy, RotateCcw, X, ArrowDownCircle, Check } from "lucide-react";

const STORAGE_KEY = "target95_reading_progress";

function getStoredProgress(slug) {
  if (typeof window === "undefined" || !slug) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed[slug] || null;
  } catch {
    return null;
  }
}

function setStoredProgress(slug, data) {
  if (typeof window === "undefined" || !slug) return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    parsed[slug] = {
      ...parsed[slug],
      ...data,
      updatedAt: Date.now(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // Graceful degradation if localStorage is full or blocked
  }
}

function clearStoredProgress(slug) {
  if (typeof window === "undefined" || !slug) return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    delete parsed[slug];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Visual progress indicator & state tracking inside .reading-panel.
 * Persists the user's scroll percentage in browser localStorage to allow
 * resuming from their previous position in the chapter.
 */
export default function ReadingProgressIndicator({
  chapterTitle = "",
  chapterSlug = "",
  readingProgress: fallbackProgress = 0,
}) {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [savedPosition, setSavedPosition] = useState(null);
  const [showResumeBanner, setShowResumeBanner] = useState(false);
  const [justResumed, setJustResumed] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null);

  const containerRef = useRef(null);
  const rafId = useRef(null);
  const saveTimeoutRef = useRef(null);

  // Check localStorage on mount for prior reading progress
  useEffect(() => {
    if (!chapterSlug) return;
    const stored = getStoredProgress(chapterSlug);
    if (stored && typeof stored.percent === "number") {
      setSavedPosition(stored);
      // Only show resume prompt if they made meaningful progress and hadn't completed it
      if (stored.percent >= 5 && stored.percent <= 95) {
        setShowResumeBanner(true);
      }
    }
  }, [chapterSlug]);

  // Calculate current scroll percentage relative to .reading-panel
  const calculateProgress = useCallback(() => {
    const panel = containerRef.current?.closest(".reading-panel");
    if (!panel) {
      if (typeof window !== "undefined") {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const total = scrollHeight - clientHeight;
        const pct = total > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / total) * 100))) : 0;
        setScrollPercent(pct);
      }
      return;
    }

    const rect = panel.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalDistance = rect.height - windowHeight;

    if (totalDistance <= 0) {
      setScrollPercent(100);
      return;
    }

    const scrolledPast = -rect.top;
    const rawPercent = (scrolledPast / totalDistance) * 100;
    const clamped = Math.min(100, Math.max(0, Math.round(rawPercent)));
    setScrollPercent(clamped);

    // Save to localStorage with debounce
    if (chapterSlug && clamped >= 3) {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        setStoredProgress(chapterSlug, { percent: clamped, chapterTitle });
        setLastSavedTime(Date.now());
      }, 500);
    }
  }, [chapterSlug, chapterTitle]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(calculateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [calculateProgress]);

  // Resume reading from saved position in localStorage
  const handleResume = useCallback(() => {
    if (!savedPosition || typeof savedPosition.percent !== "number") return;
    const panel = containerRef.current?.closest(".reading-panel");

    if (panel && typeof window !== "undefined") {
      const rect = panel.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const panelTop = rect.top + currentScrollY;
      const totalDistance = panel.scrollHeight - window.innerHeight;

      if (totalDistance > 0) {
        const targetScroll = panelTop + (totalDistance * (savedPosition.percent / 100));
        window.scrollTo({
          top: Math.max(0, Math.round(targetScroll)),
          behavior: "smooth",
        });
      }
    }

    setShowResumeBanner(false);
    setJustResumed(true);
    setTimeout(() => setJustResumed(false), 3000);
  }, [savedPosition]);

  const handleDismissResume = () => {
    setShowResumeBanner(false);
  };

  const handleStartOver = () => {
    setShowResumeBanner(false);
    clearStoredProgress(chapterSlug);
    setSavedPosition(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentPercent = Math.max(scrollPercent, Math.round(fallbackProgress || 0));

  // Determine milestone label and visual styling
  const getMilestone = (pct) => {
    if (pct >= 100) {
      return {
        label: "Chapter completed! Outstanding effort 🎉",
        color: "text-emerald-700 dark:text-emerald-300",
        badgeBg: "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800",
        icon: <Trophy className="h-3.5 w-3.5 text-emerald-500 animate-bounce" />,
      };
    }
    if (pct >= 75) {
      return {
        label: "Final stretch · Almost finished",
        color: "text-indigo-700 dark:text-indigo-300",
        badgeBg: "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800",
        icon: <Flame className="h-3.5 w-3.5 text-indigo-500" />,
      };
    }
    if (pct >= 50) {
      return {
        label: "Halfway point · Solid momentum",
        color: "text-blue-700 dark:text-blue-300",
        badgeBg: "bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800",
        icon: <Sparkles className="h-3.5 w-3.5 text-blue-500" />,
      };
    }
    if (pct >= 25) {
      return {
        label: "Quarter milestone · Keep going",
        color: "text-amber-700 dark:text-amber-300",
        badgeBg: "bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800",
        icon: <Sparkles className="h-3.5 w-3.5 text-amber-500" />,
      };
    }
    return {
      label: "Reading chapter · Focus mode active",
      color: "text-slate-700 dark:text-slate-300",
      badgeBg: "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800",
      icon: <BookOpen className="h-3.5 w-3.5 text-slate-500" />,
    };
  };

  const milestone = getMilestone(currentPercent);

  const checkpoints = [
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ];

  return (
    <div
      ref={containerRef}
      className="reading-progress-indicator mb-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 shadow-sm backdrop-blur-md transition-all dark:border-slate-800/90 dark:bg-slate-950/90"
      role="region"
      aria-label={`Reading progress for ${chapterTitle || "chapter"}`}
    >
      {/* Resume from Previous Position Prompt Banner */}
      {showResumeBanner && savedPosition && (
        <div className="mb-3.5 flex flex-col gap-2 rounded-xl border border-blue-200 bg-blue-50/90 p-3 sm:flex-row sm:items-center sm:justify-between dark:border-blue-900/60 dark:bg-blue-950/40">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white dark:bg-blue-500">
              <RotateCcw className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                Resume from your saved position?
              </p>
              <p className="truncate text-[11px] text-slate-600 dark:text-slate-400">
                You previously reached <strong className="text-blue-600 dark:text-blue-400">{savedPosition.percent}%</strong> of this chapter.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              type="button"
              onClick={handleResume}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <ArrowDownCircle className="h-3.5 w-3.5" />
              Resume ({savedPosition.percent}%)
            </button>
            <button
              type="button"
              onClick={handleStartOver}
              className="rounded-lg px-2 py-1.5 text-xs font-medium text-slate-600 hover:bg-blue-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-blue-900/40 dark:hover:text-slate-200"
              title="Start reading from the top"
            >
              Start Over
            </button>
            <button
              type="button"
              onClick={handleDismissResume}
              aria-label="Dismiss resume prompt"
              className="rounded-lg p-1 text-slate-400 hover:bg-blue-100 hover:text-slate-600 dark:hover:bg-blue-900/40 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Just Resumed Confirmation Badge */}
      {justResumed && (
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300">
          <Check className="h-3.5 w-3.5" />
          <span>Resumed at previous scroll position!</span>
        </div>
      )}

      {/* Top Header Row: Milestone & Percent */}
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${milestone.badgeBg} ${milestone.color}`}>
          {milestone.icon}
          <span className="truncate">{milestone.label}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100">
          {lastSavedTime && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-normal text-slate-400 dark:text-slate-500">
              <Check className="h-3 w-3 text-emerald-500" /> Saved
            </span>
          )}
          <span className="text-slate-400 dark:text-slate-500 font-normal">Progress:</span>
          <span className="font-mono text-sm tracking-tight text-blue-600 dark:text-blue-400">
            {currentPercent}%
          </span>
        </div>
      </div>

      {/* Progress Track with Fill and Milestones */}
      <div
        className="relative"
        role="progressbar"
        aria-valuenow={currentPercent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 transition-all duration-150 ease-out"
            style={{ width: `${currentPercent}%` }}
          />
        </div>

        {/* Milestone Tick Marks */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-2 items-center justify-between px-0.5">
          {checkpoints.map((cp) => {
            const isReached = currentPercent >= cp.value;
            return (
              <span
                key={cp.value}
                className={`relative flex h-2 w-2 items-center justify-center rounded-full transition-colors ${
                  isReached
                    ? "bg-white ring-2 ring-blue-600 dark:ring-blue-400"
                    : "bg-slate-300 dark:bg-slate-700"
                }`}
                style={{ left: `${cp.value === 100 ? -2 : 0}px` }}
                title={`${cp.label} milestone`}
              />
            );
          })}
        </div>
      </div>

      {/* Micro Checkpoint Labels */}
      <div className="mt-1.5 flex justify-between px-0.5 text-[10px] font-medium text-slate-400 dark:text-slate-500">
        <span>Start</span>
        {checkpoints.map((cp) => (
          <span
            key={cp.value}
            className={`transition-colors ${
              currentPercent >= cp.value
                ? "font-semibold text-blue-600 dark:text-blue-400"
                : ""
            }`}
          >
            {cp.label}
          </span>
        ))}
      </div>
    </div>
  );
}
