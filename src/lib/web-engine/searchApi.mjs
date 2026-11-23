import { normalizeSearchQuery } from "./searchContract.mjs";

export const SEARCH_API_LIMITS = Object.freeze({ bodyBytes: 4096, requestsPerWindow: 30, windowMs: 60_000 });
const TOP_KEYS = new Set(["query", "filters"]);
const FILTER_KEYS = new Set(["board", "class", "subject"]);
const CLASS_BOARD = Object.freeze({
  "cbse-class-9": "CBSE", "cbse-class-10": "CBSE", "cbse-class-11": "CBSE", "cbse-class-12": "CBSE",
  "icse-class-9": "ICSE", "icse-class-10": "ICSE", "isc-class-11": "ISC", "isc-class-12": "ISC",
});
const CBSE_SUBJECT = Object.freeze({ "cbse-class-9": "402", "cbse-class-10": "402", "cbse-class-11": "083", "cbse-class-12": "083" });
const CISCE_SUBJECTS = new Set(["java", "computer-applications", "computer-science"]);
const invalid = (error) => ({ ok: false, status: "invalid_request", error });

export function validateSearchPayload(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return invalid("Request body must be a JSON object.");
  if (Object.keys(value).some((key) => !TOP_KEYS.has(key))) return invalid("Request body contains unsupported fields.");
  const query = normalizeSearchQuery(value.query);
  if (!query.ok) return invalid(query.reason);
  const raw = value.filters === undefined ? {} : value.filters;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return invalid("Filters must be an object.");
  if (Object.keys(raw).some((key) => !FILTER_KEYS.has(key))) return invalid("Filters contain unsupported fields.");

  const board = raw.board === undefined ? null : String(raw.board).trim().toUpperCase();
  if (board && !["CBSE", "CISCE", "ICSE", "ISC"].includes(board)) return invalid("Board must be CBSE, CISCE, ICSE or ISC.");
  const classId = raw.class === undefined ? null : String(raw.class).trim().toLowerCase();
  if (classId && !Object.hasOwn(CLASS_BOARD, classId)) return invalid("Class filter is not supported.");
  const classBoard = classId ? CLASS_BOARD[classId] : null;
  if (board && classBoard && board !== classBoard && !(board === "CISCE" && classBoard !== "CBSE")) return invalid("Board and class filters do not match.");
  if ((board === "ICSE" || board === "ISC") && classBoard !== board) return invalid("Select a matching class for the chosen CISCE board.");

  const subject = raw.subject === undefined ? null : String(raw.subject).trim().toLowerCase();
  if (subject) {
    if (classBoard === "CBSE" || board === "CBSE") {
      if (!classId || CBSE_SUBJECT[classId] !== subject) return invalid("CBSE subject must match the selected class.");
    } else if (!CISCE_SUBJECTS.has(subject)) return invalid("CISCE subject filter is not supported.");
  }
  const normalizedBoard = board === "CBSE" || classBoard === "CBSE" ? "cbse" : (board === "ICSE" || board === "ISC" ? board.toLowerCase() : (board || classBoard ? "cisce" : undefined));
  return { ok: true, query: query.query, filters: {
    ...(normalizedBoard ? { board: normalizedBoard } : {}),
    ...(classId ? { class: classId } : {}),
    ...(subject ? { subject } : {}),
  } };
}

export async function readBoundedJson(request, maxBytes = SEARCH_API_LIMITS.bodyBytes) {
  const declared = Number(request.headers?.get?.("content-length") || 0);
  if (declared > maxBytes) return { ok: false, error: "Request body is too large." };
  if (!request.body?.getReader) return { ok: false, error: "Request body is required." };
  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) { await reader.cancel(); return { ok: false, error: "Request body is too large." }; }
      chunks.push(value);
    }
  } catch {
    return { ok: false, error: "Request body could not be read." };
  }
  try {
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return { ok: true, value: JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)) };
  } catch {
    return { ok: false, error: "Request body must contain valid UTF-8 JSON." };
  }
}

export async function consumeSearchRateLimit(db, uid, { now = Date.now(), limit = SEARCH_API_LIMITS.requestsPerWindow, windowMs = SEARCH_API_LIMITS.windowMs } = {}) {
  if (!db || typeof uid !== "string" || !uid) throw new TypeError("A verified user and Firestore database are required.");
  const ref = db.collection("users").doc(uid).collection("usage").doc("webSearch");
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.exists ? snap.data() : null;
    const start = Number(data?.windowStart || 0);
    const count = Number(data?.count || 0);
    if (!snap.exists || !Number.isFinite(start) || now - start >= windowMs || now < start) {
      tx.set(ref, { count: 1, windowStart: now });
      return { limited: false, remaining: Math.max(0, limit - 1), resetAt: now + windowMs };
    }
    if (!Number.isFinite(count) || count >= limit) return { limited: true, remaining: 0, resetAt: start + windowMs };
    tx.set(ref, { count: count + 1, windowStart: start });
    return { limited: false, remaining: Math.max(0, limit - count - 1), resetAt: start + windowMs };
  });
}
