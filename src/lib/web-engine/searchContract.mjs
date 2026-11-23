/**
 * Pure Web Engine search contracts.
 *
 * This module deliberately has no Next.js, Firebase, provider or browser imports.
 * It is the shared trust boundary for normalising first-party and external search
 * results before they reach the UI.
 */

export const SEARCH_LIMITS = Object.freeze({
  queryChars: 240,
  titleChars: 180,
  snippetChars: 600,
  resultCount: 20,
});

const RESULT_TYPES = new Set(["chapter", "topic", "question", "subject", "document", "web"]);
const SOURCE_TYPES = new Set(["target95", "web"]);

const cleanText = (value, max) => String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);

export function normalizeSearchQuery(value) {
  if (typeof value !== "string") {
    return { ok: false, status: "invalid_query", query: "", reason: "Query must be text." };
  }
  const query = value.replace(/\s+/g, " ").trim();
  if (!query) {
    return { ok: false, status: "invalid_query", query: "", reason: "Enter a search query." };
  }
  if (query.length > SEARCH_LIMITS.queryChars) {
    return { ok: false, status: "invalid_query", query: "", reason: `Query must be ${SEARCH_LIMITS.queryChars} characters or fewer.` };
  }
  return { ok: true, status: "ok", query };
}

function safeInternalHref(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return null;
  try {
    const parsed = new URL(value, "https://target95.invalid");
    if (parsed.origin !== "https://target95.invalid") return null;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return null;
  }
}

export function normalizeInternalResult(input) {
  if (!input || typeof input !== "object") return null;
  const id = cleanText(input.id, 160);
  const title = cleanText(input.title, SEARCH_LIMITS.titleChars);
  const type = RESULT_TYPES.has(input.type) && input.type !== "web" ? input.type : null;
  const href = safeInternalHref(input.href);
  if (!id || !title || !type || !href) return null;

  const score = Number(input.score);
  return {
    id,
    source: "target95",
    type,
    title,
    snippet: cleanText(input.snippet ?? input.description, SEARCH_LIMITS.snippetChars),
    href,
    score: Number.isFinite(score) ? Math.max(0, Math.min(1, score)) : 0,
    board: cleanText(input.board, 40) || null,
    class: cleanText(input.class, 40) || null,
    chapterId: cleanText(input.chapterId, 120) || null,
    retrievedAt: null,
  };
}

function safeExternalUrl(value) {
  if (typeof value !== "string" || value.length > 2048) return null;
  try {
    const parsed = new URL(value);
    if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password) return null;
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return null;
  }
}

export function normalizeExternalResult(input, { provider = "web-search", retrievedAt = null } = {}) {
  if (!input || typeof input !== "object") return null;
  const title = cleanText(input.title, SEARCH_LIMITS.titleChars);
  const url = safeExternalUrl(input.url ?? input.link);
  if (!title || !url) return null;

  const parsed = new URL(url);
  const timestamp = retrievedAt instanceof Date ? retrievedAt.toISOString() : cleanText(retrievedAt, 40) || null;
  return {
    id: cleanText(input.id, 160) || url,
    source: "web",
    type: "web",
    title,
    snippet: cleanText(input.snippet ?? input.description, SEARCH_LIMITS.snippetChars),
    url,
    domain: parsed.hostname.toLowerCase(),
    provider: cleanText(provider, 80) || "web-search",
    score: Number.isFinite(Number(input.score)) ? Math.max(0, Math.min(1, Number(input.score))) : 0,
    retrievedAt: timestamp,
  };
}

function uniqueBy(items, keyFor) {
  const seen = new Set();
  return items.filter((item) => {
    const key = keyFor(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildSearchResponse({ query, internalResults = [], webResults = [], status = "ok" }) {
  const normalizedQuery = normalizeSearchQuery(query);
  if (!normalizedQuery.ok) {
    return {
      ok: false,
      status: normalizedQuery.status,
      error: normalizedQuery.reason,
      query: "",
      internalResults: [],
      webResults: [],
    };
  }

  const internal = uniqueBy(
    internalResults.map(normalizeInternalResult).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, SEARCH_LIMITS.resultCount),
    (item) => item.id,
  );
  const external = uniqueBy(
    webResults.map((item) => normalizeExternalResult(item)).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, SEARCH_LIMITS.resultCount),
    (item) => item.url,
  );

  return {
    ok: true,
    status: SOURCE_TYPES.has(status) ? status : "ok",
    query: normalizedQuery.query,
    internalResults: internal,
    webResults: external,
  };
}
