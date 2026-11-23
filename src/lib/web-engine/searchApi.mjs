import {
  buildSearchResponse,
  normalizeSearchQuery,
} from "./searchContract.mjs";

export const SEARCH_API_LIMITS = Object.freeze({
  maxBodyBytes: 4096,
  rateLimit: 60,
  rateWindowMs: 60_000,
});

const ALLOWED_ROLES = new Set(["student", "teacher", "admin"]);
const BODY_KEYS = new Set(["query", "filters"]);
const FILTER_KEYS = new Set(["board", "class", "subject"]);

const CLASS_FILTERS = Object.freeze({
  "cbse-class-9": { board: "cbse", classNumber: 9, group: "cbse" },
  "cbse-class-10": { board: "cbse", classNumber: 10, group: "cbse" },
  "cbse-class-11": { board: "cbse", classNumber: 11, group: "cbse" },
  "cbse-class-12": { board: "cbse", classNumber: 12, group: "cbse" },
  "icse-class-9": { board: "cisce", classNumber: 9, group: "icse" },
  "icse-class-10": { board: "cisce", classNumber: 10, group: "icse" },
  "isc-class-11": { board: "cisce", classNumber: 11, group: "isc" },
  "isc-class-12": { board: "cisce", classNumber: 12, group: "isc" },
});

const CBSE_SUBJECTS_BY_CLASS = Object.freeze({
  9: ["402"],
  10: ["402"],
  11: ["083", "065", "802"],
  12: ["083", "065", "802"],
});

const CISCE_SUBJECTS_BY_GROUP = Object.freeze({
  all: ["java", "computer-applications", "computer-science"],
  icse: ["java", "computer-applications"],
  isc: ["java", "computer-science"],
});

function failure(status, code, error) {
  return {
    ok: false,
    status,
    body: { ok: false, status: code, error },
  };
}

function hasOnlyKeys(value, allowedKeys) {
  return Object.keys(value).every((key) => allowedKeys.has(key));
}

/**
 * Read a JSON request without buffering an unbounded body. Content-Length is
 * an early rejection only; the streamed byte count is always authoritative.
 */
export async function readBoundedJson(request, maxBytes = SEARCH_API_LIMITS.maxBodyBytes) {
  const contentType = request.headers?.get("content-type") || "";
  if (!/^application\/json(?:\s*;|$)/i.test(contentType)) {
    return { ok: false, status: 415, code: "unsupported_media_type", error: "Send a JSON request body." };
  }

  const contentLength = request.headers?.get("content-length");
  if (contentLength !== null && contentLength !== undefined) {
    if (!/^\d+$/.test(contentLength)) {
      return { ok: false, status: 400, code: "invalid_request", error: "Invalid Content-Length header." };
    }
    if (Number(contentLength) > maxBytes) {
      return { ok: false, status: 413, code: "payload_too_large", error: "Search request body is too large." };
    }
  }

  if (!request.body || typeof request.body.getReader !== "function") {
    return { ok: false, status: 400, code: "invalid_request", error: "A JSON request body is required." };
  }

  const reader = request.body.getReader();
  const chunks = [];
  let totalBytes = 0;

  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      const chunk = part.value instanceof Uint8Array ? part.value : new Uint8Array(part.value);
      totalBytes += chunk.byteLength;
      if (totalBytes > maxBytes) {
        try {
          await reader.cancel();
        } catch {
          // The request is already rejected; cancellation is best effort.
        }
        return { ok: false, status: 413, code: "payload_too_large", error: "Search request body is too large." };
      }
      chunks.push(chunk);
    }
  } catch {
    return { ok: false, status: 400, code: "invalid_request", error: "Could not read the JSON request body." };
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // A cancelled stream may already have released its reader.
    }
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  let source;
  try {
    source = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return { ok: false, status: 400, code: "invalid_request", error: "Request body must be valid UTF-8 JSON." };
  }

  try {
    return { ok: true, body: JSON.parse(source) };
  } catch {
    return { ok: false, status: 400, code: "invalid_request", error: "Invalid JSON request body." };
  }
}

/**
 * Validate the public request shape and canonicalise the existing Target95
 * board/class/subject identifiers. Identity and role fields are intentionally
 * not accepted in the body.
 */
export function validateSearchRequestBody(body) {
  if (!body || typeof body !== "object" || Array.isArray(body) || !hasOnlyKeys(body, BODY_KEYS)) {
    return { ok: false, code: "invalid_request", error: "Request must contain only query and filters." };
  }

  const queryResult = normalizeSearchQuery(body.query);
  if (!queryResult.ok) {
    return { ok: false, code: queryResult.status, error: queryResult.reason };
  }

  const rawFilters = body.filters === undefined ? {} : body.filters;
  if (!rawFilters || typeof rawFilters !== "object" || Array.isArray(rawFilters) || !hasOnlyKeys(rawFilters, FILTER_KEYS)) {
    return { ok: false, code: "invalid_filters", error: "Filters must contain only board, class and subject." };
  }

  let board;
  let classId;
  let subject;

  if (Object.hasOwn(rawFilters, "board")) {
    if (typeof rawFilters.board !== "string" || !rawFilters.board.trim()) {
      return { ok: false, code: "invalid_filters", error: "Board must be cisce or cbse." };
    }
    board = rawFilters.board.trim().toLowerCase();
    if (board !== "cisce" && board !== "cbse") {
      return { ok: false, code: "invalid_filters", error: "Board must be cisce or cbse." };
    }
  }

  let classInfo = null;
  if (Object.hasOwn(rawFilters, "class")) {
    if (typeof rawFilters.class !== "string" || !rawFilters.class.trim()) {
      return { ok: false, code: "invalid_filters", error: "Class must be a supported Target95 class id." };
    }
    classId = rawFilters.class.trim().toLowerCase();
    classInfo = CLASS_FILTERS[classId] || null;
    if (!classInfo) {
      return { ok: false, code: "invalid_filters", error: "Class must be a supported Target95 class id." };
    }
    if (board && board !== classInfo.board) {
      return { ok: false, code: "invalid_filters", error: "Board and class do not match." };
    }
    board = board || classInfo.board;
  }

  if (Object.hasOwn(rawFilters, "subject")) {
    if (typeof rawFilters.subject !== "string" || !rawFilters.subject.trim()) {
      return { ok: false, code: "invalid_filters", error: "Subject must be a supported subject id or CBSE subject code." };
    }
    subject = rawFilters.subject.trim().toLowerCase();
  }

  if (board === "cbse" && !classInfo) {
    return { ok: false, code: "invalid_filters", error: "Select a CBSE class before searching CBSE content." };
  }
  if (subject && !board) {
    return { ok: false, code: "invalid_filters", error: "Select a board or class when filtering by subject." };
  }

  if (subject && board === "cbse") {
    const allowed = CBSE_SUBJECTS_BY_CLASS[classInfo.classNumber] || [];
    if (!allowed.includes(subject)) {
      return { ok: false, code: "invalid_filters", error: "Subject is not available for the selected CBSE class." };
    }
  }

  if (subject && board === "cisce") {
    const group = classInfo?.group || "all";
    if (!CISCE_SUBJECTS_BY_GROUP[group].includes(subject)) {
      return { ok: false, code: "invalid_filters", error: "Subject is not available for the selected CISCE class." };
    }
  }

  const filters = {};
  if (board) filters.board = board;
  if (classId) filters.class = classId;
  if (subject) filters.subject = subject;

  return { ok: true, query: queryResult.query, filters };
}

/**
 * Framework-neutral POST handler. Dependencies are injected so auth, validation,
 * rate limiting and privacy boundaries can be tested without Firebase or Next.js.
 */
export function createSearchPostHandler({ getSession, isRateLimited, search, logger = console }) {
  if (typeof getSession !== "function" || typeof isRateLimited !== "function" || typeof search !== "function") {
    throw new TypeError("Search handler dependencies are required.");
  }

  return async function handleSearchPost(request) {
    let session;
    try {
      session = await getSession(request);
    } catch (error) {
      logger.error("[web-engine] session validation failed", { code: error?.code || "unknown" });
      return failure(503, "unavailable", "Session validation is temporarily unavailable.");
    }

    if (!session || typeof session.uid !== "string" || !session.uid.trim()) {
      return failure(401, "unauthenticated", "Sign in to search Target95 content.");
    }

    const role = session.admin === true ? "admin" : (session.role || "student");
    if (!ALLOWED_ROLES.has(role)) {
      return failure(403, "forbidden", "Your account is not allowed to search Target95 content.");
    }

    const parsedBody = await readBoundedJson(request);
    if (!parsedBody.ok) {
      return failure(parsedBody.status, parsedBody.code, parsedBody.error);
    }

    const validated = validateSearchRequestBody(parsedBody.body);
    if (!validated.ok) {
      return failure(400, validated.code, validated.error);
    }

    let limited;
    try {
      limited = await isRateLimited(session.uid);
    } catch (error) {
      logger.error("[web-engine] rate-limit check failed", { code: error?.code || "unknown" });
      return failure(503, "unavailable", "Search is temporarily unavailable. Please try again.");
    }
    if (limited) {
      return failure(429, "rate_limited", "You are searching too frequently. Please try again shortly.");
    }

    try {
      const sourceResult = await search(validated.query, validated.filters);
      if (!sourceResult || sourceResult.ok !== true || !Array.isArray(sourceResult.internalResults)) {
        throw new Error("Internal search returned an invalid result.");
      }

      // Re-normalise at the API boundary. Only the contract's allow-listed DTO
      // fields can leave the server; answer keys, explanations and extra source
      // properties are discarded, and the external lane remains empty.
      const safeResponse = buildSearchResponse({
        query: validated.query,
        internalResults: sourceResult.internalResults,
        webResults: [],
        status: "internal_only",
      });

      return {
        status: 200,
        body: {
          ok: true,
          status: "internal_only",
          query: safeResponse.query,
          internalResults: safeResponse.internalResults,
          webResults: [],
        },
      };
    } catch (error) {
      logger.error("[web-engine] internal search failed", { code: error?.code || "unknown" });
      return failure(503, "unavailable", "Internal search is temporarily unavailable.");
    }
  };
}
