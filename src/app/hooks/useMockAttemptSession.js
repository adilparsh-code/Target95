"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { clearMockTestDraft, getMockTestDraft } from "@/lib/mocktest";
import { buildMockTestPool } from "@/lib/mocktestAttempts";
import { availabilityRequest, describeFailure, resumeAttemptRequest, startAttemptRequest } from "@/lib/mocktestClient";
import { loadAttemptSession, loadLocalSession } from "@/lib/mocktestSession";

// React StrictMode (dev) runs effects twice; without this the test would be started twice and
// leave an orphaned attempt. In-flight (and just-settled) loads are shared for a moment.
const sharedLoads = new Map();
const SHARE_MS = 2000;

function shareLoad(key, create) {
  if (!sharedLoads.has(key)) {
    const promise = create();
    sharedLoads.set(key, promise);
    promise.finally(() => setTimeout(() => sharedLoads.delete(key), SHARE_MS));
  }
  return sharedLoads.get(key);
}

/**
 * Starts or resumes the attempt for the player.
 * phase: "loading" | "ready" | "error"; session when ready; error when failed.
 */
export default function useMockAttemptSession({ uid, config, duration, count, authLoading = false }) {
  const [state, setState] = useState({ phase: "loading" });
  const [nonce, setNonce] = useState(0);
  const configKey = useMemo(() => JSON.stringify(config), [config]);

  const legacyPool = useCallback(() => buildMockTestPool(config), [config]);

  useEffect(() => {
    // Wait for sign-in to resolve: otherwise a signed-in student would briefly get an unsaved local test.
    if (authLoading) return undefined;
    let cancelled = false;
    setState({ phase: "loading" });
    const run = uid
      ? shareLoad(`${uid}|${configKey}|${nonce}`, () =>
          loadAttemptSession({
            uid,
            config,
            duration,
            count,
            api: { start: startAttemptRequest, resume: resumeAttemptRequest },
            drafts: { get: getMockTestDraft, clear: clearMockTestDraft },
            legacyPool,
            describeFailure,
          }))
      : Promise.resolve(loadLocalSession({ config, count, legacyPool }));
    run.then((result) => {
      if (cancelled) return;
      setState(result.phase === "ready" ? { phase: "ready", session: result } : { phase: "error", error: result });
    });
    return () => { cancelled = true; };
    // `config` is represented by configKey; the other inputs are primitives.
  }, [uid, authLoading, configKey, duration, count, nonce, legacyPool]);

  const retry = useCallback(() => setNonce((value) => value + 1), []);
  // Explicit, visible choice after a failed start: legacy questions only, result not saved.
  const goOffline = useCallback(() => {
    setState({ phase: "ready", session: loadLocalSession({ config, count, legacyPool }) });
  }, [config, count, legacyPool]);

  return { ...state, retry, goOffline };
}

/** Setup-screen availability: local legacy numbers immediately, replaced by the server's when known. */
export function useMockAvailability({ config, localCount, localChapters, enabled }) {
  const [remote, setRemote] = useState(null);
  const configKey = useMemo(() => JSON.stringify(config), [config]);

  useEffect(() => {
    if (!enabled) return undefined;
    let cancelled = false;
    const timer = setTimeout(() => {
      availabilityRequest(config).then((response) => {
        if (cancelled) return;
        if (response.ok && Number.isFinite(response.data.count)) setRemote({ key: configKey, category: config.category, count: response.data.count, chapters: response.data.chapters || [] });
      });
    }, 150);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [enabled, configKey]);

  // The count follows every filter; the chapter list only follows the category, so the
  // dropdown does not flicker back to the local list while a new count is loading.
  const countCurrent = enabled && remote?.key === configKey;
  const chaptersCurrent = enabled && remote?.category === config.category;
  return {
    count: countCurrent ? remote.count : localCount,
    chapters: chaptersCurrent ? remote.chapters : localChapters,
  };
}
