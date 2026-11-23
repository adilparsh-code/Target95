import test from "node:test";
import assert from "node:assert/strict";
import {
  createSearchPostHandler,
  readBoundedJson,
  validateSearchRequestBody,
} from "../src/lib/web-engine/searchApi.mjs";

const validBody = {
  query: "  Java   arrays ",
  filters: {
    board: "cisce",
    class: "icse-class-10",
    subject: "computer-applications",
  },
};

function requestFor(body, headers = {}) {
  return new Request("https://target95.test/api/search", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function makeHandler(overrides = {}) {
  const calls = { rateLimit: [], search: [] };
  const handler = createSearchPostHandler({
    getSession: async () => ({ uid: "verified-user-1", role: "student" }),
    isRateLimited: async (uid) => {
      calls.rateLimit.push(uid);
      return false;
    },
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
  return { handler, calls };
}

test("validates and canonicalises supported board, class and subject filters", () => {
  const result = validateSearchRequestBody(validBody);
  assert.deepEqual(result, {
    ok: true,
    query: "Java arrays",
    filters: {
      board: "cisce",
      class: "icse-class-10",
      subject: "computer-applications",
    },
  });

  assert.equal(validateSearchRequestBody({
    query: "Python",
    filters: { class: "cbse-class-11", subject: "083" },
  }).filters.board, "cbse");

  assert.equal(validateSearchRequestBody({
    query: "Python",
    filters: { board: "cbse", class: "cbse-class-11", subject: "402" },
  }).ok, false);

  assert.equal(validateSearchRequestBody({
    query: "Java",
    filters: { board: "cisce", class: "isc-class-11", subject: "computer-applications" },
  }).ok, false);
});

test("rejects client identity, role and unknown filter fields", () => {
  assert.equal(validateSearchRequestBody({ ...validBody, uid: "attacker" }).ok, false);
  assert.equal(validateSearchRequestBody({ ...validBody, role: "admin" }).ok, false);
  assert.equal(validateSearchRequestBody({
    query: "Java",
    filters: { board: "cisce", uid: "attacker" },
  }).ok, false);
});

test("rejects invalid queries and unsupported filters", () => {
  assert.equal(validateSearchRequestBody({ query: " " }).ok, false);
  assert.equal(validateSearchRequestBody({ query: "x".repeat(241) }).ok, false);
  assert.equal(validateSearchRequestBody({ query: "Java", filters: { board: "unknown" } }).ok, false);
  assert.equal(validateSearchRequestBody({ query: "Java", filters: { class: "class-13" } }).ok, false);
  assert.equal(validateSearchRequestBody({ query: "Java", filters: { subject: "083" } }).ok, false);
  assert.equal(validateSearchRequestBody({ query: "Java", filters: { board: "cbse" } }).ok, false);
});

test("rejects oversized, non-JSON and malformed request bodies", async () => {
  const oversized = await readBoundedJson(requestFor("x".repeat(5000)));
  assert.equal(oversized.status, 413);

  const wrongType = await readBoundedJson(requestFor(JSON.stringify(validBody), { "content-type": "text/plain" }));
  assert.equal(wrongType.status, 415);

  const malformed = await readBoundedJson(requestFor("{"));
  assert.equal(malformed.status, 400);
});

test("requires a verified active session before reading or searching", async () => {
  const { handler, calls } = makeHandler({ getSession: async () => null });
  const result = await handler(requestFor(validBody));
  assert.equal(result.status, 401);
  assert.equal(result.body.status, "unauthenticated");
  assert.deepEqual(calls.rateLimit, []);
  assert.deepEqual(calls.search, []);
});

test("rejects roles outside the server-side allow-list", async () => {
  const { handler, calls } = makeHandler({
    getSession: async () => ({ uid: "verified-user-2", role: "parent" }),
  });
  const result = await handler(requestFor(validBody));
  assert.equal(result.status, 403);
  assert.deepEqual(calls.rateLimit, []);
  assert.deepEqual(calls.search, []);
});

test("derives rate-limit identity from the verified session and passes only validated search input", async () => {
  const { handler, calls } = makeHandler();
  const result = await handler(requestFor(validBody));
  assert.equal(result.status, 200);
  assert.deepEqual(calls.rateLimit, ["verified-user-1"]);
  assert.deepEqual(calls.search, [{
    query: "Java arrays",
    filters: {
      board: "cisce",
      class: "icse-class-10",
      subject: "computer-applications",
    },
  }]);
  assert.equal(Object.hasOwn(result.body, "uid"), false);
  assert.equal(Object.hasOwn(result.body, "role"), false);
});

test("returns 429 without searching when the server-side limiter blocks the verified user", async () => {
  const { handler, calls } = makeHandler({ isRateLimited: async () => true });
  const result = await handler(requestFor(validBody));
  assert.equal(result.status, 429);
  assert.equal(result.body.status, "rate_limited");
  assert.deepEqual(calls.search, []);
});

test("fails closed when the server-side rate-limit store is unavailable", async () => {
  const { handler, calls } = makeHandler({
    isRateLimited: async () => { throw Object.assign(new Error("private database detail"), { code: "unavailable" }); },
  });
  const result = await handler(requestFor(validBody));
  assert.equal(result.status, 503);
  assert.equal(result.body.status, "unavailable");
  assert.equal(JSON.stringify(result.body).includes("private database detail"), false);
  assert.deepEqual(calls.search, []);
});

test("returns only allow-listed internal DTO fields and never answer, explanation or private source fields", async () => {
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

  const result = await handler(requestFor(validBody));
  assert.equal(result.status, 200);
  assert.deepEqual(Object.keys(result.body.internalResults[0]).sort(), [
    "board", "chapterId", "class", "href", "id", "retrievedAt", "score", "snippet", "source", "title", "type",
  ]);
  const serialized = JSON.stringify(result.body);
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
  assert.deepEqual(result.body.webResults, []);
  assert.equal(result.body.status, "internal_only");
});

test("returns a generic unavailable response when the internal adapter fails", async () => {
  const { handler } = makeHandler({
    search: async () => { throw Object.assign(new Error("source record leaked"), { code: "internal" }); },
  });
  const result = await handler(requestFor(validBody));
  assert.equal(result.status, 503);
  assert.equal(JSON.stringify(result.body).includes("source record leaked"), false);
});
