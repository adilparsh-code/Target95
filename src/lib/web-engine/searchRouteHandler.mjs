import { consumeSearchRateLimit, readBoundedJson, validateSearchPayload } from "./searchApi.mjs";

const json = (body, status, headers = {}) => Response.json(body, {
  status, headers: { "Cache-Control": "no-store", ...headers },
});

export function createSearchPostHandler({ getSession, getDb, search, logger = console }) {
  if (typeof getSession !== "function" || typeof getDb !== "function" || typeof search !== "function") {
    throw new TypeError("Search route dependencies are required.");
  }
  return async function POST(request) {
    let session;
    try { session = await getSession(request); }
    catch { return json({ ok: false, status: "unavailable", error: "Authentication is temporarily unavailable." }, 503); }
    if (!session || typeof session.uid !== "string" || !session.uid) {
      return json({ ok: false, status: "unauthenticated", error: "Sign in to search Target95." }, 401);
    }

    const body = await readBoundedJson(request);
    if (!body.ok) return json({ ok: false, status: "invalid_request", error: body.error }, 400);
    const input = validateSearchPayload(body.value);
    if (!input.ok) return json(input, 400);

    let rate;
    try { rate = await consumeSearchRateLimit(getDb(), session.uid); }
    catch (error) {
      logger.error("Web Engine rate-limit check failed.", { code: error?.code || "unknown" });
      return json({ ok: false, status: "unavailable", error: "Search is temporarily unavailable." }, 503);
    }
    if (rate.limited) return json(
      { ok: false, status: "rate_limited", error: "Search limit reached. Try again shortly." },
      429,
      { "Retry-After": String(Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000))) },
    );

    try {
      const result = await search(input.query, input.filters);
      return json(result, 200, { "X-RateLimit-Limit": "30", "X-RateLimit-Remaining": String(rate.remaining) });
    } catch (error) {
      logger.error("Web Engine internal search failed.", { code: error?.code || "unknown" });
      return json({ ok: false, status: "unavailable", error: "Search is temporarily unavailable." }, 503);
    }
  };
}
