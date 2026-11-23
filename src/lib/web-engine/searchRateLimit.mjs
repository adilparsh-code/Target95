export const SEARCH_RATE_LIMIT = 60;
export const SEARCH_RATE_WINDOW_MS = 60_000;

/**
 * Create an atomic, cross-instance per-user limiter backed by Firestore.
 * The caller must supply a uid from a verified server session, never a request
 * body or query parameter. No search terms or student profile fields are stored.
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

  return async function isSearchRateLimited(uid) {
    if (typeof uid !== "string" || !uid.trim()) {
      throw new TypeError("A verified user id is required for search rate limiting.");
    }

    const ref = db.collection("users").doc(uid).collection("usage").doc("internalSearch");

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
        nowMs - windowStart < windowMs;

      if (!activeWindow || !Number.isSafeInteger(count) || count < 0) {
        transaction.set(ref, { count: 1, windowStart: nowMs });
        return false;
      }

      if (count >= limit) return true;

      transaction.set(ref, { count: count + 1, windowStart }, { merge: true });
      return false;
    });
  };
}
