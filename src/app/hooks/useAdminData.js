"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Shared fetch hook for admin dashboard APIs.
 * - Injects credentials (session cookie) automatically.
 * - Normalizes loading / error / data states for dashboard sections.
 * - Aborts in-flight requests on unmount or url change.
 * - State updates happen only after awaits (compiler-lint safe).
 */
export default function useAdminData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function run() {
      try {
        const response = await fetch(url, { credentials: "same-origin", signal: controller.signal });
        const payload = await response.json().catch(() => ({}));
        if (cancelled) return;
        if (!response.ok || payload.success === false) {
          throw new Error(payload.error || `Request failed (${response.status})`);
        }
        setData(payload);
        setError(null);
      } catch (err) {
        if (!cancelled && err?.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [url, nonce]);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    setNonce((n) => n + 1);
  }, []);

  return { data, loading, error, refresh };
}
