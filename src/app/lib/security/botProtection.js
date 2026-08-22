// Server-bound abuse controls for admin/auth flows.
// Client checks are convenience UX only; do not treat them as a security boundary.

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 60_000;

export function createRateLimitKey(scope, identifier = "anonymous") {
  return `${scope}:${String(identifier).trim().toLowerCase().slice(0, 200)}`;
}

export function getServerRateLimitConfig({ limit = DEFAULT_LIMIT, windowMs = DEFAULT_WINDOW_MS } = {}) {
  return {
    limit: Number.isInteger(limit) && limit > 0 ? limit : DEFAULT_LIMIT,
    windowMs: Number.isInteger(windowMs) && windowMs > 0 ? windowMs : DEFAULT_WINDOW_MS,
  };
}

export function assertBotProtectionEnvironment(env = process.env) {
  const appCheckConfigured = Boolean(env.NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY);
  const serverEnforcementExpected = Boolean(env.FIREBASE_ADMIN_PROJECT_ID || env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);

  return {
    appCheckConfigured,
    serverEnforcementExpected,
    readyForProduction: appCheckConfigured && serverEnforcementExpected,
  };
}

export const ADMIN_LOGIN_LIMIT = Object.freeze({
  limit: 5,
  windowMs: 15 * 60 * 1000,
});

export const ADMIN_PASSWORD_RESET_LIMIT = Object.freeze({
  limit: 3,
  windowMs: 15 * 60 * 1000,
});

export const ADMIN_CONTENT_WRITE_LIMIT = Object.freeze({
  limit: 30,
  windowMs: 60 * 1000,
});
