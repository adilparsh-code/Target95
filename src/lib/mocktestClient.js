/**
 * Browser-side client for the mock-test API. Pure functions with an injectable `fetch`, so
 * the failure and retry paths are unit-testable. Every call resolves (never throws) to
 *   { ok, status, data, networkError }
 * where status 0 + networkError means the request never reached the server.
 */

const JSON_HEADERS = { "Content-Type": "application/json" };

async function request(path, options, fetchImpl) {
  try {
    const response = await fetchImpl(path, { credentials: "same-origin", ...options });
    const data = await response.json().catch(() => ({}));
    return { ok: response.ok, status: response.status, data: data || {}, networkError: false };
  } catch {
    return { ok: false, status: 0, data: {}, networkError: true };
  }
}

const defaultFetch = (...args) => globalThis.fetch(...args);

export const startAttemptRequest = (config, fetchImpl = defaultFetch) =>
  request("/api/mock-tests/attempts", { method: "POST", headers: JSON_HEADERS, body: JSON.stringify({ config }) }, fetchImpl);

export const resumeAttemptRequest = (attemptId, fetchImpl = defaultFetch) =>
  request(`/api/mock-tests/attempts/${encodeURIComponent(attemptId)}`, { method: "GET", cache: "no-store" }, fetchImpl);

// No `keepalive`: the player now waits for this response (it carries the graded result), and
// keepalive requests are capped at 64 KB, which a 100-question text test can exceed.
export const submitAttemptRequest = (attemptId, answers, fetchImpl = defaultFetch) =>
  request(`/api/mock-tests/attempts/${encodeURIComponent(attemptId)}/submit`, { method: "POST", headers: JSON_HEADERS, body: JSON.stringify({ answers }) }, fetchImpl);

export function availabilityRequest(config, fetchImpl = defaultFetch) {
  const params = new URLSearchParams({
    category: config.category,
    difficulty: config.difficulty,
    type: config.type,
    chapter: config.chapter,
  });
  return request(`/api/mock-tests/availability?${params.toString()}`, { method: "GET", cache: "no-store" }, fetchImpl);
}

/** Student-facing text for a failed call. */
export function describeFailure(response, action = "complete this step") {
  if (response.networkError) return `We could not reach the server to ${action}. Check your connection and try again.`;
  if (response.status === 401) return "Your session has expired. Sign in again, then retry; your answers are kept on this device.";
  if (response.status === 503) return "The service is temporarily unavailable. Please retry in a moment.";
  return response.data?.error || `Something went wrong while trying to ${action}. Please retry.`;
}
