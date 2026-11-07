import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  clearMockTestDraft,
  clearMockTestResultFromSession,
  getMockTestDraft,
  readMockTestResultFromSession,
  saveMockTestDraft,
  storeMockTestResultForSession,
} from "../src/lib/mocktest.js";

function fakeStorage() {
  const data = new Map();
  return { getItem: (key) => (data.has(key) ? data.get(key) : null), setItem: (key, value) => data.set(key, String(value)), removeItem: (key) => data.delete(key) };
}

beforeEach(() => {
  globalThis.sessionStorage = fakeStorage();
  globalThis.localStorage = fakeStorage();
});

test("a result stored by the player is readable by the result page for the same user", () => {
  const result = { userId: "student-a", score: 3, totalQuestions: 5 };
  assert.equal(storeMockTestResultForSession(result, "student-a"), true);
  assert.deepEqual(readMockTestResultFromSession("student-a"), result);
});

test("a result is never readable by a different user or when signed out", () => {
  storeMockTestResultForSession({ userId: "student-a", score: 3 }, "student-a");
  assert.equal(readMockTestResultFromSession("student-b"), null);
  assert.equal(readMockTestResultFromSession(null), null);
});

test("clearing the stored result removes it", () => {
  storeMockTestResultForSession({ userId: "student-a", score: 3 }, "student-a");
  clearMockTestResultFromSession("student-a");
  assert.equal(readMockTestResultFromSession("student-a"), null);
});

test("a draft saved for a signed-in user is only cleared when the same user id is passed", () => {
  const config = { board: "ICSE", category: "icse-class-10", chapter: "all", difficulty: "medium", type: "mixed", count: 10, mode: "exam", duration: 30 };
  saveMockTestDraft(config, { attemptId: "attempt-1", answers: { q1: "x" } }, "student-a");
  clearMockTestDraft(config); // omitting the user id targets the anonymous key and must not clear it
  assert.ok(getMockTestDraft(config, "student-a"));
  clearMockTestDraft(config, "student-a");
  assert.equal(getMockTestDraft(config, "student-a"), null);
});

test("storage failures never throw", () => {
  globalThis.sessionStorage = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); }, removeItem() { throw new Error("blocked"); } };
  assert.equal(storeMockTestResultForSession({ userId: "a" }, "a"), false);
  assert.deepEqual(readMockTestResultFromSession("a"), { userId: "a" }); // in-memory fallback
  assert.doesNotThrow(() => clearMockTestResultFromSession("a"));
  assert.equal(readMockTestResultFromSession("a"), null);
});

test("result survives a failing sessionStorage via the in-memory fallback", () => {
  globalThis.sessionStorage = { setItem() { throw new Error("quota"); }, getItem() { throw new Error("blocked"); }, removeItem() { throw new Error("blocked"); } };
  const result = { userId: "u1", score: 3 };
  assert.equal(storeMockTestResultForSession(result, "u1"), false);
  assert.deepEqual(readMockTestResultFromSession("u1"), result);
  assert.equal(readMockTestResultFromSession("u2"), null);
  clearMockTestResultFromSession("u1");
  assert.equal(readMockTestResultFromSession("u1"), null);
});
