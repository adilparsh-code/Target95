/**
 * Minimal, privacy-conscious learning-event foundation.
 *
 * Canonical event names for the student learning funnel. Events carry only
 * content identifiers and aggregate counters — never names, emails, tokens
 * or free-form user input. The sink is pluggable: today it no-ops (dev
 * console only) until a real analytics destination is configured; wire a
 * sink via registerEventSink without touching call sites.
 */

export const LEARNING_EVENTS = {
  SIGNUP: "signup",
  CHAPTER_OPENED: "chapter_opened",
  CHAPTER_COMPLETED: "chapter_completed",
  QUESTION_ATTEMPTED: "question_attempted",
  PRACTICE_COMPLETED: "practice_completed",
  MOCK_TEST_COMPLETED: "mock_test_completed",
  AI_TUTOR_USED: "ai_tutor_used",
};

const ALLOWED_EVENTS = new Set(Object.values(LEARNING_EVENTS));

const MAX_PARAMS = 8;
const MAX_STRING_LENGTH = 120;

// Belt-and-braces: even though callers should only pass content identifiers,
// sensitive keys are dropped defensively. Exact-match (case-insensitive) so
// content identifiers like chapterId/questionId still pass through.
const SENSITIVE_KEYS = new Set([
  "password", "passwd", "token", "secret", "email", "phone", "address",
  "auth", "apikey", "api_key", "accesstoken", "uid", "userid", "user_id",
  "username", "firstname", "lastname", "fullname",
]);

const eventSinks = [];

/** Register a sink: (eventName, params) => void. Returns an unregister fn. */
export function registerEventSink(sink) {
  if (typeof sink !== "function") return () => {};
  eventSinks.push(sink);
  return () => {
    const index = eventSinks.indexOf(sink);
    if (index !== -1) eventSinks.splice(index, 1);
  };
}

function sanitizeParams(params) {
  if (!params || typeof params !== "object") return {};
  const clean = {};
  for (const [key, value] of Object.entries(params)) {
    if (Object.keys(clean).length >= MAX_PARAMS) break;
    if (value == null) continue;
    if (SENSITIVE_KEYS.has(key.toLowerCase())) continue;
    if (typeof value === "string") {
      clean[key] = value.slice(0, MAX_STRING_LENGTH);
    } else if (typeof value === "number" && Number.isFinite(value)) {
      clean[key] = value;
    } else if (typeof value === "boolean") {
      clean[key] = value;
    }
    // Objects/arrays/functions are dropped: no accidental PII or payloads.
  }
  return clean;
}

/**
 * Track a learning event. Safe to call anywhere on the client; no-ops on
 * the server and for unknown event names.
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;
  if (!ALLOWED_EVENTS.has(eventName)) return;

  const cleanParams = sanitizeParams(params);

  if (process.env.NODE_ENV !== "production") {
    // Dev visibility without adding a tracking dependency.
    console.debug("[event]", eventName, cleanParams);
  }

  for (const sink of eventSinks) {
    try {
      sink(eventName, cleanParams);
    } catch {
      // A broken sink must never break the learning flow.
    }
  }
}
