import { normalizeSearchQuery } from "./searchContract.mjs";

export const SEARCH_API_LIMITS = Object.freeze({
  bodyBytes: 4096,
  requestsPerWindow: 30,
  windowMs: 60_000,
});

const TOP_KEYS = new Set(["query", "filters"]);
const FILTER_KEYS = new Set(["board", "class", "subject"]);

const CLASS_FILTERS = Object.freeze({
  "cbse-class-9": { board: "CBSE", classNumber: 9, group: "cbse" },
  "cbse-class-10": { board: "CBSE", classNumber: 10, group: "cbse" },
  "cbse-class-11": { board: "CBSE", classNumber: 11, group: "cbse" },
  "cbse-class-12": { board: "CBSE", classNumber: 12, group: "cbse" },
  "icse-class-9": { board: "ICSE", classNumber: 9, group: "icse" },
  "icse-class-10": { board: "ICSE", classNumber: 10, group: "icse" },
  "isc-class-11": { board: "ISC", classNumber: 11, group: "isc" },
  "isc-class-12": { board: "ISC", classNumber: 12, group: "isc" },
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

const invalid = (error, status = "invalid_request") => ({ ok: false, status, error });

function hasOnlyKeys(value, allowed) {
  return Object.keys(value).every((key) => allowed.has(key));
}

function normalizeBoard(board, classInfo) {
  if (board === "CBSE" || classInfo?.group === "cbse") return "cbse";
  if (board === "ICSE") return "icse";
  if (board === "ISC") return "isc";
  if (board === "CISCE" || classInfo?.group === "icse" || classInfo?.group === "isc") return "cisce";
  return undefined;
}

/**
 * Validate the public request shape and canonicalise Target95 identifiers.
 * Identity, role, tenant and entitlement fields are deliberately not accepted.
 */
export function validateSearchPayload(value) {
  if (!value || typeof value !== "object" || Array.isArray(value) || !hasOnlyKeys(value, TOP_KEYS)) {
    return invalid("Request body must contain only query and filters.");
  }

  const query = normalizeSearchQuery(value.query);
  if (!query.ok) return invalid(query.reason, query.status);

  const raw = value.filters === undefined ? {} : value.filters;
  if (!raw || typeof raw !== "object" || Array.isArray(raw) || !hasOnlyKeys(raw, FILTER_KEYS)) {
    return invalid("Filters must contain only board, class and subject.", "invalid_filters");
  }

  let board;
  let classId;
  let subject;
  let classInfo = null;

  if (Object.hasOwn(raw, "board")) {
    if (typeof raw.board !== "string" || !raw.board.trim()) {
      return invalid("Board must be CBSE, CISCE, ICSE or ISC.", "invalid_filters");
    }
    board = raw.board.trim().toUpperCase();
    if (!["CBSE", "CISCE", "ICSE", "ISC"].includes(board)) {
      return invalid("Board must be CBSE, CISCE, ICSE or ISC.", "invalid_filters");
    }
  }

  if (Object.hasOwn(raw, "class")) {
    if (typeof raw.class !== "string" || !raw.class.trim()) {
      return invalid("Class filter is not supported.", "invalid_filters");
    }
    classId = raw.class.trim().toLowerCase();
    classInfo = CLASS_FILTERS[classId] || null;
    if (!classInfo) return invalid("Class filter is not supported.", "invalid_filters");

    if (board) {
      const compatible =
        board === classInfo.board ||
        (board === "CISCE" && classInfo.group !== "cbse");
      if (!compatible) return invalid("Board and class filters do not match.", "invalid_filters");
    } else {
      board = classInfo.board;
    }
  }

  if (Object.hasOwn(raw, "subject")) {
    if (typeof raw.subject !== "string" || !raw.subject.trim()) {
      return invalid("Subject filter is not supported.", "invalid_filters");
    }
    subject = raw.subject.trim().toLowerCase();
  }

  if (board === "CBSE" && !classInfo) {
    return invalid("Select a CBSE class before searching CBSE content.", "invalid_filters");
  }
  if (subject && !board) {
    return invalid("Select a board or class when filtering by subject.", "invalid_filters");
  }

  if (subject && board === "CBSE") {
    const allowed = CBSE_SUBJECTS_BY_CLASS[classInfo.classNumber] || [];
    if (!allowed.includes(subject)) {
      return invalid("Subject is not available for the selected CBSE class.", "invalid_filters");
    }
  }

  if (subject && board !== "CBSE") {
    const group = classInfo?.group || (board === "ICSE" ? "icse" : board === "ISC" ? "isc" : "all");
    if (!CISCE_SUBJECTS_BY_GROUP[group].includes(subject)) {
      return invalid("Subject is not available for the selected CISCE class.", "invalid_filters");
    }
  }

  const normalizedBoard = normalizeBoard(board, classInfo);
  const filters = {};
  if (normalizedBoard) filters.board = normalizedBoard;
  if (classId) filters.class = classId;
  if (subject) filters.subject = subject;

  return { ok: true, query: query.query, filters };
}

/**
 * Read JSON with a streamed byte cap. Content-Length is an early check only;
 * the actual bytes read from the stream are always counted.
 */
export async function readBoundedJson(request, maxBytes = SEARCH_API_LIMITS.bodyBytes) {
  const contentType = request.headers?.get?.("content-type") || "";
  if (!/^application\/json(?:\s*;|$)/i.test(contentType)) {
    return { ok: false, status: 415, code: "unsupported_media_type", error: "Send a JSON request body." };
  }

  const contentLength = request.headers?.get?.("content-length");
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
          // Cancellation is best effort after rejecting an oversized body.
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
    return { ok: true, value: JSON.parse(source) };
  } catch {
    return { ok: false, status: 400, code: "invalid_request", error: "Invalid JSON request body." };
  }
}
