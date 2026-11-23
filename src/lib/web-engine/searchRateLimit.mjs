export const SEARCH_RATE_LIMIT = 30;
export const SEARCH_RATE_WINDOW_MS = 60_000;

/**
 * Firestore transaction-backed per-user limiter. The caller must supply a uid
 * from getVerifiedSession; this module never reads identity from request data.
 */
export function createSearchRateLimiter({
  db,
  now = () => Date.now(),
  limit = SEARCH_RATE_LIMIT,
  windowMs = SEARCH_RATE_WINDOW_MS,
} = {}) {
  if (!db || typeof db.collection !== "function" || typeof db.runTransaction !== "function") {
    throw new TypeError("A Firestore Admin database is required.");
  }
  if (!Number.isSafeInteger(limit) || limit < 1 || !Number.isSafeInteger(windowMs) || windowMs < 1) {
    throw new TypeError("Rate-limit settings must be positive integers.");
  }

  return async function consumeSearchRateLimit(uid) {
    if (typeof uid !== "string" || !uid.trim()) {
      throw new TypeError("A verified user id is required.");
    }

    const ref = db.collection("users").doc(uid).collection("usage").doc("webSearch");

    return db.runTransaction(async (transaction) => {
      const nowMs = Number(now());
      if (!Number.isFinite(nowMs) || nowMs < 0) {
        throw new TypeError("Rate-limit clock returned an invalid timestamp.");
      }

      const snapshot = await transaction.get(ref);
      const data = snapshot?.exists ? snapshot.data() : null;
      const windowStart = Number(data?.windowStart);
      const count = Number(data?.count);
      const activeWindow =
        Number.isFinite(windowStart) &&
        windowStart <= nowMs &&
        nowMs - windowStart < windowMs &&
        Number.isSafeInteger(count) &&
        count >= 0;

      if (!activeWindow) {
        transaction.set(ref, { count: 1, windowStart: nowMs });
        return { limited: false, remaining: limit - 1, resetAt: nowMs + windowMs };
      }

      if (count >= limit) {
        return { limited: true, remaining: 0, resetAt: windowStart + windowMs };
      }

      transaction.set(ref, { count: count + 1, windowStart }, { merge: true });
      return {
        limited: false,
        remaining: Math.max(0, limit - count - 1),
        resetAt: windowStart + windowMs,
      };
    });
  };
}
