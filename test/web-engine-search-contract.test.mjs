import test from "node:test";
import assert from "node:assert/strict";
import {
  buildSearchResponse,
  normalizeExternalResult,
  normalizeInternalResult,
  normalizeSearchQuery,
} from "../src/lib/web-engine/searchContract.mjs";

test("normalizes and bounds search queries", () => {
  assert.deepEqual(normalizeSearchQuery("  Java   arrays  "), { ok: true, status: "ok", query: "Java arrays" });
  assert.equal(normalizeSearchQuery("  ").status, "invalid_query");
  assert.equal(normalizeSearchQuery("x".repeat(241)).ok, false);
  assert.equal(normalizeSearchQuery(null).ok, false);
});

test("internal results accept only safe same-app paths and known types", () => {
  const valid = normalizeInternalResult({ id: "q-1", type: "question", title: "Array traversal", href: "/Java/arrays?from=search", score: 4 });
  assert.equal(valid.source, "target95");
  assert.equal(valid.score, 1);
  assert.equal(valid.href, "/Java/arrays?from=search");
  assert.equal(normalizeInternalResult({ id: "x", type: "question", title: "Bad", href: "//evil.example" }), null);
  assert.equal(normalizeInternalResult({ id: "x", type: "question", title: "Bad", href: "javascript:alert(1)" }), null);
  assert.equal(normalizeInternalResult({ id: "x", type: "web", title: "Bad", href: "/search" }), null);
});

test("external results require credential-free HTTP(S) URLs and strip fragments", () => {
  const valid = normalizeExternalResult({ title: "Java arrays", url: "https://example.com/arrays#section", snippet: "Guide" }, { provider: "test", retrievedAt: new Date("2026-11-23T00:00:00.000Z") });
  assert.equal(valid.url, "https://example.com/arrays");
  assert.equal(valid.domain, "example.com");
  assert.equal(valid.provider, "test");
  assert.equal(valid.retrievedAt, "2026-11-23T00:00:00.000Z");
  assert.equal(normalizeExternalResult({ title: "bad", url: "javascript:alert(1)" }), null);
  assert.equal(normalizeExternalResult({ title: "bad", url: "https://user:pass@example.com" }), null);
});

test("response keeps internal and external lanes separate, ranked and deduplicated", () => {
  const response = buildSearchResponse({
    query: "  Java arrays ",
    internalResults: [
      { id: "q-1", type: "question", title: "Question", href: "/question-bank", score: 0.4 },
      { id: "q-1", type: "question", title: "Duplicate", href: "/question-bank", score: 0.9 },
      { id: "chapter-1", type: "chapter", title: "Arrays", href: "/Java/arrays", score: 0.8 },
    ],
    webResults: [
      { title: "Arrays guide", url: "https://example.com/arrays", score: 0.6 },
      { title: "Duplicate URL", url: "https://example.com/arrays#top", score: 0.9 },
    ],
  });
  assert.equal(response.query, "Java arrays");
  // The duplicate question keeps its highest score (0.9), so it ranks ahead of the chapter (0.8).
  assert.deepEqual(response.internalResults.map((item) => item.id), ["q-1", "chapter-1"]);
  assert.equal(response.webResults.length, 1);
  assert.equal(response.internalResults[0].source, "target95");
  assert.equal(response.webResults[0].source, "web");
});

test("invalid queries fail closed with no results", () => {
  const response = buildSearchResponse({ query: "", internalResults: [{ id: "x", type: "chapter", title: "X", href: "/x" }] });
  assert.equal(response.ok, false);
  assert.deepEqual(response.internalResults, []);
  assert.deepEqual(response.webResults, []);
});
