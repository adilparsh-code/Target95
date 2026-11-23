import { buildSearchResponse } from "./searchContract.mjs";
import { readBoundedJson, validateSearchPayload } from "./searchApi.mjs";
import { createSearchRateLimiter } from "./searchRateLimit.mjs";

const ALLOWED_ROLES = new Set(["student", "teacher", "admin"]);

const json = (body, status, headers = {}) => Response.json(body, {
  status,
  headers: {
    "Cache-Control": "private, no-store, max-age=0",
    Vary: "Cookie",
    ...headers,
  },
});

export function createSearchPostHandler({ getSession, getDb, search, logger = console }) {
  if (typeof getSession !== "function" || typeof getDb !== "function" || typeof search !== "function") {
    throw new TypeError("Search route dependencies are required.");
  }

  return async function POST(request) {
    let session;
    try {
      session = await getSession(request);
    } catch (error) {
      logger.error("Web Engine session validation failed.", { code: error?.code || "unknown" });
      return json({ ok: false, status: "unavailable", error: "Authentication is temporarily unavailable." }, 503);
    }

    if (!session || typeof session.uid !== "string" || !session.uid.trim()) {
      return json({ ok: false, status: "unauthenticated", error: "Sign in to search Target95." }, 401);
    }

    const role = session.admin === true ? "admin" : (session.role || "student");
    if (!ALLOWED_ROLES.has(role)) {
      return json({ ok: false, status: "forbidden", error: "Your account is not allowed to search Target95 content." }, 403);
    }

    const body = await readBoundedJson(request);
    if (!body.ok) {
      return json({ ok: false, status: body.code, error: body.error }, body.status);
    }

    const input = validateSearchPayload(body.value);
    if (!input.ok) {
      return json(input, 400);
    }

    let rate;
    try {
      const consume = createSearchRateLimiter({ db: getDb() });
      rate = await consume(session.uid);
    } catch (error) {
      logger.error("Web Engine rate-limit check failed.", { code: error?.code || "unknown" });
      return json({ ok: false, status: "unavailable", error: "Search is temporarily unavailable." }, 503);
    }

    if (rate.limited) {
      return json(
        { ok: false, status: "rate_limited", error: "Search limit reached. Try again shortly." },
        429,
        { "Retry-After": String(Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000))) },
      );
    }

    try {
      const sourceResult = await search(input.query, input.filters);
      if (!sourceResult || sourceResult.ok !== true || !Array.isArray(sourceResult.internalResults)) {
        throw new Error("Internal search returned an invalid result.");
      }

      // Re-normalise at the API boundary so only the contract's allow-listed
      // DTO fields leave the server. The external lane is intentionally empty.
      const safe = buildSearchResponse({
        query: input.query,
        internalResults: sourceResult.internalResults,
        webResults: [],
        status: "internal_only",
      });

      return json({
        ok: true,
        status: "internal_only",
        query: safe.query,
        internalResults: safe.internalResults,
        webResults: [],
      }, 200, {
        "X-RateLimit-Limit": "30",
        "X-RateLimit-Remaining": String(rate.remaining),
      });
    } catch (error) {
      logger.error("Web Engine internal search failed.", { code: error?.code || "unknown" });
      return json({ ok: false, status: "unavailable", error: "Search is temporarily unavailable." }, 503);
    }
  };
}
