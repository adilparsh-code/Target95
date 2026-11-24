import test from "node:test";
import assert from "node:assert/strict";
import { readBoundedJson, validateSearchPayload } from "../src/lib/web-engine/searchApi.mjs";
import {
  createSearchRateLimiter,
  SEARCH_RATE_LIMIT,
  SEARCH_RATE_WINDOW_MS,
} from "../src/lib/web-engine/searchRateLimit.mjs";
import { createSearchPostHandler } from "../src/lib/web-engine/searchRouteHandler.mjs";

const requestFor = (body, headers = {}) => new Request("https://target95.invalid/api/search", {
  method: "POST",
  headers: { "content-type": "application/json", ...headers },
  body: typeof body === "string" ? body : JSON.stringify(body),
});

function fakeFirestore() {
  const documents = new Map();
  const reference = (path) => ({
    path,
    collection(name) {
      return reference(path + "/" + name);
    },
    doc(id) {
      return reference(path + "/" + id);
    },
  });

  return {
    documents,
    collection(name) {
      return reference(name);
    },
    async runTransaction(callback) {
      const transaction = {
        async get(ref) {
          const value = documents.get(ref.path);
          return { exists: value !== undefined, data: () => value };
        },
        set(ref, value, options = {}) {
          const current = documents.get(ref.path) || {};
          documents.set(ref.path, options.merge ? { ...current, ...value } : { ...value });
        },
      };
      return callback(transaction);
    },
  };
}

const validBody = {
  query: " Java arrays ",
  filters: {
    board: "CISCE",
    class: "icse-class-10",
    subject: "computer-applications",
  },
};

function makeHandler(overrides = {}) {
  const db = fakeFirestore();
  const calls = { rateLimit: [], search: [] };
  const handler = createSearchPostHandler({
    getSession: async () => ({ uid: "verified-user-1", role: "student" }),
    getDb: () => db,
    search: async (query, filters) => {
      calls.search.push({ query, filters });
      return {
        ok: true,
        internalResults: [{
          id: "chapter-arrays",
          type: "chapter",
          title: "Arrays",
          snippet: "A safe chapter introduction.",
          href: "/study/arrays",
          score: 0.8,
          board: "ICSE",
          class: "ICSE X",
          chapterId: "arrays",
        }],
      };
    },
    logger: { error() {} },
    ...overrides,
  });
  return { handler, db, calls };
}

test("validates and canonicalises supported board, class and subject filters", () => {
  assert.deepEqual(validateSearchPayload(validBody), {
    ok: true,
    query: "Java arrays",
    filters: {
      board: "cisce",
      class: "icse-class-10",
      subject: "computer-applications",
    },
  });

  assert.deepEqual(validateSearchPayload({
    query: "Python",
    filters: { class: "cbse-class-11", subject: "065" },
  }).filters, {
    board: "cbse",
    class: "cbse-class-11",
    subject: "065",
  });

  assert.equal(validateSearchPayload({
    query: "Python",
    filters: { board: "CBSE", class: "cbse-class-11", subject: "402" },
  }).ok, false);

  assert.equal(validateSearchPayload({
    query: "Java",
    filters: { board: "CISCE", class: "isc-class-11", subject: "computer-applications" },
  }).ok, false);

  assert.deepEqual(validateSearchPayload({
    query: "Java",
    filters: { board: "ISC", subject: "computer-science" },
  }).filters, {
    board: "isc",
    subject: "computer-science",
  });
});

test("rejects client identity, role and unknown filter fields", () => {
  assert.equal(validateSearchPayload({ ...validBody, uid: "attacker" }).ok, false);
  assert.equal(validateSearchPayload({ ...validBody, role: "admin" }).ok, false);
  assert.equal(validateSearchPayload({ ...validBody, userId: "attacker" }).ok, false);
  assert.equal(validateSearchPayload({
    query: "Java",
    filters: { board: "CISCE", tenantId: "other" },
  }).ok, false);
});

test("rejects invalid query types, unsupported boards and malformed filters", () => {
  assert.equal(validateSearchPayload({ query: " " }).ok, false);
  assert.equal(validateSearchPayload({ query: "x".repeat(241) }).ok, false);
  assert.equal(validateSearchPayload({ query: 123 }).ok, false);
  assert.equal(validateSearchPayload({ query: "Java", filters: { board: "unknown" } }).ok, false);
  assert.equal(validateSearchPayload({ query: "Java", filters: { board: {} } }).ok, false);
  assert.equal(validateSearchPayload({ query: "Java", filters: { class: "class-13" } }).ok, false);
  assert.equal(validateSearchPayload({ query: "Java", filters: { subject: "083" } }).ok, false);
  assert.equal(validateSearchPayload({ query: "Java", filters: { board: "CBSE" } }).ok, false);
  assert.equal(validateSearchPayload({ query: "Java", filters: { class: {} } }).ok, false);
});

test("reads valid JSON and rejects oversized, non-JSON, malformed and missing bodies", async () => {
  assert.deepEqual((await readBoundedJson(requestFor({ query: "arrays" }))).value, { query: "arrays" });
  assert.equal((await readBoundedJson(requestFor("x".repeat(5000)))).status, 413);
  assert.equal((await readBoundedJson(requestFor(JSON.stringify(validBody), { "content-type": "text/plain" }))).status, 415);
  assert.equal((await readBoundedJson(requestFor("{"))).status, 400);
  assert.equal((await readBoundedJson(new Request("https://target95.invalid/api/search", { method: "POST" }))).status, 415);
});

test("Firestore limiter is atomic, per-user and windowed", async () => {
  const db = fakeFirestore();
  let nowMs = 1_800_000_000_000;
  const consume = createSearchRateLimiter({ db, now: () => nowMs, limit: 2, windowMs: SEARCH_RATE_WINDOW_MS });

  assert.equal(SEARCH_RATE_LIMIT, 30);
  assert.equal(SEARCH_RATE_WINDOW_MS, 60_000);
  assert.equal((await consume("verified-user-a")).limited, false);
  assert.equal((await consume("verified-user-a")).limited, false);
  assert.equal((await consume("verified-user-a")).limited, true);
  assert.equal(db.documents.get("users/verified-user-a/usage/webSearch").count, 2);

  assert.equal((await consume("verified-user-b")).limited, false);
  assert.equal(db.documents.get("users/verified-user-b/usage/webSearch").count, 1);

  nowMs += SEARCH_RATE_WINDOW_MS;
  assert.equal((await consume("verified-user-a")).limited, false);
  assert.equal(db.documents.get("users/verified-user-a/usage/webSearch").count, 1);
});

test("requires a verified active session before reading the body or rate-limiting", async () => {
  const { handler, calls } = makeHandler({
    getSession: async () => null,
    getDb: () => { throw new Error("must not run"); },
  });
  const result = await handler(requestFor(validBody));
  assert.equal(result.status, 401);
  assert.equal((await result.json()).status, "unauthenticated");
  assert.deepEqual(calls.search, []);
});

test("enforces server-side student, teacher and admin role authorization", async () => {
  const { handler: denied } = makeHandler({
    getSession: async () => ({ uid: "verified-parent", role: "parent" }),
  });
  assert.equal((await denied(requestFor(validBody))).status, 403);

  const { handler: adminAllowed } = makeHandler({
    getSession: async () => ({ uid: "verified-admin", admin: true, role: "parent" }),
  });
  assert.equal((await adminAllowed(requestFor(validBody))).status, 200);

  const { handler: teacherAllowed } = makeHandler({
    getSession: async () => ({ uid: "verified-teacher", role: "teacher" }),
  });
  assert.equal((await teacherAllowed(requestFor(validBody))).status, 200);
});

test("derives limiter identity from the verified session and passes only validated search input", async () => {
  const { handler, calls, db } = makeHandler();
  const result = await handler(requestFor(validBody));
  assert.equal(result.status, 200);
  assert.deepEqual(calls.search, [{
    query: "Java arrays",
    filters: {
      board: "cisce",
      class: "icse-class-10",
      subject: "computer-applications",
    },
  }]);
  assert.equal(db.documents.has("users/verified-user-1/usage/webSearch"), true);
  assert.equal(Object.hasOwn(await result.json(), "uid"), false);
});

test("returns 429 without searching when the verified user's rate limit is exhausted", async () => {
  const db = fakeFirestore();
  db.documents.set("users/verified-user-1/usage/webSearch", {
    count: SEARCH_RATE_LIMIT,
    windowStart: Date.now(),
  });
  let searched = false;
  const { handler } = makeHandler({
    getDb: () => db,
    search: async () => { searched = true; return { ok: true, internalResults: [] }; },
  });
  const result = await handler(requestFor(validBody));
  assert.equal(result.status, 429);
  assert.equal(result.headers.get("retry-after") !== null, true);
  assert.equal(searched, false);
});

test("fails closed when session verification or the Firestore limiter is unavailable", async () => {
  const { handler: authFailure } = makeHandler({
    getSession: async () => { throw Object.assign(new Error("private auth detail"), { code: "auth/unavailable" }); },
  });
  const authResult = await authFailure(requestFor(validBody));
  assert.equal(authResult.status, 503);
  assert.equal((await authResult.text()).includes("private auth detail"), false);

  const { handler: dbFailure } = makeHandler({
    getDb: () => ({ collection() { throw Object.assign(new Error("private database detail"), { code: "unavailable" }); } }),
  });
  const dbResult = await dbFailure(requestFor(validBody));
  assert.equal(dbResult.status, 503);
  assert.equal((await dbResult.text()).includes("private database detail"), false);
});

test("returns only allow-listed internal DTO fields and never answer, explanation or private source data", async () => {
  const { handler } = makeHandler({
    search: async () => ({
      ok: true,
      internalResults: [{
        id: "chapter-safe",
        type: "chapter",
        title: "Arrays",
        snippet: "Safe intro",
        href: "/study/arrays",
        score: 0.7,
        board: "ICSE",
        class: "ICSE X",
        chapterId: "arrays",
        answer: "PRIVATE_ANSWER",
        answerKey: "PRIVATE_ANSWER_KEY",
        explanation: "PRIVATE_EXPLANATION",
        studentId: "PRIVATE_STUDENT_ID",
        uid: "PRIVATE_UID",
        email: "PRIVATE_EMAIL",
        secret: "PRIVATE_SECRET",
      }],
      webResults: [{ title: "Ignored external result", url: "https://outside.example/" }],
    }),
  });

  const response = await handler(requestFor(validBody));
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.deepEqual(Object.keys(body.internalResults[0]).sort(), [
    "board", "chapterId", "class", "href", "id", "retrievedAt", "score", "snippet", "source", "title", "type",
  ]);
  const serialized = JSON.stringify(body);
  for (const privateValue of [
    "PRIVATE_ANSWER",
    "PRIVATE_ANSWER_KEY",
    "PRIVATE_EXPLANATION",
    "PRIVATE_STUDENT_ID",
    "PRIVATE_UID",
    "PRIVATE_EMAIL",
    "PRIVATE_SECRET",
    "Ignored external result",
  ]) {
    assert.equal(serialized.includes(privateValue), false);
  }
  assert.deepEqual(body.webResults, []);
  assert.equal(body.status, "internal_only");
});

test("returns a generic unavailable response when internal search fails", async () => {
  const { handler } = makeHandler({
    search: async () => { throw Object.assign(new Error("private source detail"), { code: "internal" }); },
  });
  const response = await handler(requestFor(validBody));
  assert.equal(response.status, 503);
  assert.equal((await response.text()).includes("private source detail"), false);
});
