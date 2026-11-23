import test from "node:test";
import assert from "node:assert/strict";
import { consumeSearchRateLimit, readBoundedJson, validateSearchPayload } from "../src/lib/web-engine/searchApi.mjs";
import { createSearchPostHandler } from "../src/lib/web-engine/searchRouteHandler.mjs";

const req = (body) => new Request("https://target95.invalid/api/search", {
  method: "POST", headers: { "content-type": "application/json" },
  body: typeof body === "string" ? body : JSON.stringify(body),
});
function fakeDb({ count = 0, windowStart = 1000 } = {}) {
  const state = { count, windowStart, exists: count > 0 };
  const db = {
    collection: () => db, doc: () => db,
    runTransaction: async (callback) => callback({
      get: async () => ({ exists: state.exists, data: () => ({ count: state.count, windowStart: state.windowStart }) }),
      set: (_ref, next) => Object.assign(state, next, { exists: true }),
    }),
  };
  return { db, state };
}

test("validates bounded query and supported board/class/subject combinations", () => {
  assert.deepEqual(validateSearchPayload({ query: " Java arrays ", filters: { board: "ICSE", class: "icse-class-10", subject: "computer-applications" } }), {
    ok: true, query: "Java arrays", filters: { board: "cisce", class: "icse-class-10", subject: "computer-applications" },
  });
  assert.deepEqual(validateSearchPayload({ query: "data", filters: { board: "CBSE", class: "cbse-class-10", subject: "402" } }).filters, { board: "cbse", class: "cbse-class-10", subject: "402" });
  assert.equal(validateSearchPayload({ query: "data", filters: { board: "ISC", class: "icse-class-10" } }).ok, false);
  assert.equal(validateSearchPayload({ query: "data", filters: { board: "CBSE", class: "cbse-class-10", subject: "083" } }).ok, false);
  assert.equal(validateSearchPayload({ query: "data", uid: "attacker" }).ok, false);
  assert.equal(validateSearchPayload({ query: "data", role: "admin" }).ok, false);
  assert.equal(validateSearchPayload({ query: "x".repeat(241) }).ok, false);
  assert.equal(validateSearchPayload({ query: "data", filters: { tenantId: "other" } }).ok, false);
});

test("reads valid JSON and rejects oversized, malformed and missing bodies", async () => {
  assert.deepEqual((await readBoundedJson(req({ query: "arrays" }))).value, { query: "arrays" });
  assert.equal((await readBoundedJson(req("x".repeat(5000)))).ok, false);
  assert.equal((await readBoundedJson(req("{bad json"))).ok, false);
  assert.equal((await readBoundedJson(new Request("https://target95.invalid/api/search", { method: "POST" }))).ok, false);
});

test("Firestore transaction rate limit is atomic and windowed", async () => {
  const { db, state } = fakeDb({ count: 1, windowStart: 10000 });
  assert.equal((await consumeSearchRateLimit(db, "verified-uid", { now: 10100, limit: 2, windowMs: 60000 })).limited, false);
  assert.equal(state.count, 2);
  assert.equal((await consumeSearchRateLimit(db, "verified-uid", { now: 10200, limit: 2, windowMs: 60000 })).limited, true);
  assert.equal((await consumeSearchRateLimit(db, "verified-uid", { now: 80000, limit: 2, windowMs: 60000 })).limited, false);
  assert.equal(state.count, 1);
});

test("route rejects unauthenticated users before reading or searching", async () => {
  let searched = false;
  const handler = createSearchPostHandler({
    getSession: async () => null, getDb: () => { throw new Error("must not run"); },
    search: () => { searched = true; },
  });
  assert.equal((await handler(req({ query: "arrays" }))).status, 401);
  assert.equal(searched, false);
});

test("route uses verified session identity and returns only safe search DTOs", async () => {
  const { db } = fakeDb();
  let received;
  const handler = createSearchPostHandler({
    getSession: async () => ({ uid: "verified-user", role: "student" }), getDb: () => db,
    search: (query, filters) => {
      received = { query, filters };
      return { ok: true, status: "ok", query, internalResults: [{
        id: "chapter-arrays", source: "target95", type: "chapter", title: "Arrays", snippet: "Array basics",
        href: "/Java/arrays", score: 0.9, board: "ICSE", class: "ICSE X", chapterId: "arrays-1d", retrievedAt: null,
      }], webResults: [] };
    },
  });
  const response = await handler(req({ query: "arrays", filters: { board: "ICSE", class: "icse-class-10" } }));
  assert.equal(response.status, 200);
  assert.deepEqual(received, { query: "arrays", filters: { board: "cisce", class: "icse-class-10" } });
  const body = await response.json();
  assert.equal(body.internalResults[0].title, "Arrays");
  assert.equal(JSON.stringify(body).includes("answer"), false);
  assert.equal(JSON.stringify(body).includes("explanation"), false);
  assert.equal(JSON.stringify(body).includes("verified-user"), false);
});

test("route fails closed when session verification or Firestore is unavailable", async () => {
  const authFailure = createSearchPostHandler({ getSession: async () => { throw new Error("auth down"); }, getDb: () => ({}), search: () => ({}), logger: { error() {} } });
  assert.equal((await authFailure(req({ query: "arrays" }))).status, 503);
  const dbFailure = createSearchPostHandler({ getSession: async () => ({ uid: "verified-user" }), getDb: () => ({ collection() { throw new Error("db down"); } }), search: () => ({}), logger: { error() {} } });
  assert.equal((await dbFailure(req({ query: "arrays" }))).status, 503);
});

test("rate-limited route returns 429 without executing search", async () => {
  const { db } = fakeDb({ count: 30, windowStart: Date.now() });
  let searched = false;
  const handler = createSearchPostHandler({ getSession: async () => ({ uid: "verified-user" }), getDb: () => db, search: () => { searched = true; return {}; }, logger: { error() {} } });
  assert.equal((await handler(req({ query: "arrays" }))).status, 429);
  assert.equal(searched, false);
});
