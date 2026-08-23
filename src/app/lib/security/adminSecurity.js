const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const SQL_META = /(?:--|\/\*|\*\/|;\s*(?:select|insert|update|delete|drop|alter|create|truncate)\b|\bunion\s+(?:all\s+)?select\b|\b(?:select|insert|update|delete|drop|alter|truncate)\s+[^\n]*\bfrom\b)/i;

export function sanitizeText(value, maxLength = 500) {
  return String(value ?? "")
    .replace(CONTROL_CHARS, "")
    .trim()
    .slice(0, maxLength);
}

export function validateEmail(value) {
  const email = sanitizeText(value, 254).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

export function validateAdminText(value, maxLength = 500) {
  const text = sanitizeText(value, maxLength);
  return text && !SQL_META.test(text) ? text : null;
}

export function looksLikeSqlInjection(value) {
  return SQL_META.test(String(value ?? ""));
}

export function getClientRateLimitState(key, limit = 5, windowMs = 60_000) {
  if (typeof window === "undefined") return { allowed: true, remaining: limit, retryAfterMs: 0 };

  const storageKey = `target95:rate:${key}`;
  const now = Date.now();
  let state = null;

  try {
    state = JSON.parse(localStorage.getItem(storageKey) || "null");
  } catch {
    state = null;
  }

  if (!state || now - state.startedAt >= windowMs) {
    state = { startedAt: now, count: 0 };
  }

  if (state.count >= limit) {
    return { allowed: false, remaining: 0, retryAfterMs: Math.max(0, windowMs - (now - state.startedAt)) };
  }

  state.count += 1;
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // Storage may be unavailable; server-side enforcement must still be used.
  }

  return { allowed: true, remaining: Math.max(0, limit - state.count), retryAfterMs: 0 };
}

export function isBotChallengeValid(value) {
  return typeof value === "string" && value.trim().length >= 1 && value.trim().length <= 200;
}
