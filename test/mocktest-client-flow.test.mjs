import { test, before } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import { createFakeDb, fakeServerTimestamp } from "./helpers/fakeFirestore.mjs";

let service;
let attempts;
let client;
let session;
let resultLib;

const ENV_X = { MOCKTEST_CE_CATEGORIES: "icse-class-10" };
const ATTEMPT_ID_PATH = /\/api\/mock-tests\/attempts\/([^/]+)(\/submit)?$/;

before(async () => {
  register(pathToFileURL(path.join(process.cwd(), "scripts/lib/alias-loader.mjs")));
  service = await import("../src/lib/mocktestService.js");
  attempts = await import("../src/lib/mocktestAttempts.js");
  client = await import("../src/lib/mocktestClient.js");
  session = await import("../src/lib/mocktestSession.js");
  resultLib = await import("../src/lib/mocktestResult.js");
});

const config = () => ({ board: "ICSE", classNumber: 10, subjectCode: "", subject: "", category: "icse-class-10", chapter: "all", difficulty: "all", type: "mixed", count: 8, mode: "exam", duration: 30 });
const response = (status, body) => ({ ok: status >= 200 && status < 300, status, json: async () => body });

/** fetch double wired to the real service on an in-memory db, with failure injection. */
function makeServer({ uid = "alice", env = ENV_X } = {}) {
  const db = createFakeDb();
  const ctx = { db, uid, serverTimestamp: fakeServerTimestamp };
  const behaviour = { failNext: [], loseResponseOnSubmit: 0, calls: [] };
  const fetchImpl = async (url, options = {}) => {
    const method = options.method || "GET";
    behaviour.calls.push(`${method} ${url}`);
    const injected = behaviour.failNext.shift();
    if (injected === "network") throw new TypeError("network down");
    if (injected) return response(injected, { ok: false, error: `injected ${injected}` });
    if (url === "/api/mock-tests/attempts" && method === "POST") {
      const { status, body } = await service.startAttempt({ ...ctx, rawConfig: JSON.parse(options.body).config, env });
      return response(status, body);
    }
    const match = url.match(ATTEMPT_ID_PATH);
    if (match && match[2] && method === "POST") {
      const { status, body } = await service.submitAttempt({ ...ctx, attemptId: match[1], answers: JSON.parse(options.body).answers });
      if (behaviour.loseResponseOnSubmit > 0) { behaviour.loseResponseOnSubmit -= 1; throw new TypeError("connection reset after the server processed it"); }
      return response(status, body);
    }
    if (match && !match[2]) {
      const { status, body } = await service.getAttemptForResume({ ...ctx, attemptId: match[1] });
      return response(status, body);
    }
    return response(404, { ok: false });
  };
  return { db, ctx, behaviour, fetchImpl };
}

function makeDrafts(initial = null) {
  const state = { draft: initial, cleared: 0 };
  return {
    state,
    api: { get: () => state.draft, clear: () => { state.draft = null; state.cleared += 1; } },
  };
}

const legacyPool = () => attempts.buildMockTestPool(attempts.normalizeAttemptConfig({ ...config(), category: "icse-class-10" }));
const load = ({ server, drafts }) => session.loadAttemptSession({
  uid: "alice",
  config: config(),
  duration: 30,
  count: 8,
  api: {
    start: (cfg) => client.startAttemptRequest(cfg, server.fetchImpl),
    resume: (id) => client.resumeAttemptRequest(id, server.fetchImpl),
  },
  drafts: drafts.api,
  legacyPool,
  describeFailure: client.describeFailure,
});

// ---------- submission failure, retry and recovery ----------

test("submit: network failure is reported, nothing is stored, and a retry succeeds", async () => {
  const server = makeServer();
  const started = await load({ server, drafts: makeDrafts() });
  assert.equal(started.phase, "ready");
  const answers = { [started.questions[0].id]: "x" };

  server.behaviour.failNext.push("network");
  const failed = await client.submitAttemptRequest(started.attemptId, answers, server.fetchImpl);
  assert.equal(failed.ok, false);
  assert.equal(failed.networkError, true);
  assert.match(client.describeFailure(failed, "submit your test"), /could not reach the server/i);
  assert.ok(!server.db.store.has(`results/${started.attemptId}`), "nothing graded yet");

  const retried = await client.submitAttemptRequest(started.attemptId, answers, server.fetchImpl);
  assert.equal(retried.ok, true);
  assert.equal(retried.data.replay, false);
  assert.ok(server.db.store.has(`results/${started.attemptId}`));
});

test("submit: lost response after the server graded is recovered by a retry without regrading", async () => {
  const server = makeServer();
  const started = await load({ server, drafts: makeDrafts() });
  const answers = Object.fromEntries(started.questions.map((q) => [q.id, q.options[0] || "x"]));

  server.behaviour.loseResponseOnSubmit = 1;
  const lost = await client.submitAttemptRequest(started.attemptId, answers, server.fetchImpl);
  assert.equal(lost.networkError, true, "client never saw the response");
  const stored = JSON.stringify(server.db.store.get(`results/${started.attemptId}`));
  assert.ok(stored, "server did grade and store");

  const retried = await client.submitAttemptRequest(started.attemptId, answers, server.fetchImpl);
  assert.equal(retried.ok, true);
  assert.equal(retried.data.replay, true);
  assert.equal(retried.data.reveal.length, started.questions.length, "retry still delivers the reveal");
  assert.equal(JSON.stringify(server.db.store.get(`results/${started.attemptId}`)), stored, "stored result untouched");
});

test("submit: 401, 503 and 5xx map to clear student-facing messages", () => {
  assert.match(client.describeFailure({ status: 401, data: {} }), /session has expired/i);
  assert.match(client.describeFailure({ status: 503, data: {} }), /temporarily unavailable/i);
  assert.match(client.describeFailure({ status: 500, data: { error: "Unable to save the result right now." } }), /unable to save/i);
  assert.match(client.describeFailure({ status: 500, data: {} }, "submit your test"), /submit your test/i);
});

// ---------- authoritative results ----------

test("result page data: scores come from the server response, not from the browser", async () => {
  const server = makeServer();
  const started = await load({ server, drafts: makeDrafts() });
  const answers = Object.fromEntries(started.questions.map((q) => [q.id, "definitely wrong"]));
  const out = (await client.submitAttemptRequest(started.attemptId, answers, server.fetchImpl)).data;

  // A tampered server response is displayed as is: the browser must not recompute the score.
  const doctored = { ...out.result, score: 5, correctCount: 5, percentage: 62 };
  const result = resultLib.buildServerResult({ serverResult: doctored, reveal: out.reveal, questions: started.questions, bookmarkedCount: 2 });
  assert.equal(result.score, 5);
  assert.equal(result.percentage, 62);
  assert.equal(result.source, "server-graded");
  assert.equal(result.bookmarkedCount, 2);
  assert.equal(result.review.length, started.questions.length);
  for (const item of result.review) {
    assert.ok(item.question.question, "question text joined from what the student saw");
    assert.ok(typeof item.correctAnswer === "string" && item.correctAnswer.length > 0, "correct answer from the reveal");
    assert.equal(item.isCorrect, false);
  }
});

test("local (unsaved) results are marked so the result page can say they were not saved", () => {
  const questions = legacyPool().slice(0, 2);
  const result = resultLib.buildLocalResult({ questions, answers: {}, config: config(), timeTaken: 10 });
  assert.equal(result.source, "local");
  assert.equal(result.unansweredCount, 2);
  assert.equal(result.totalTime, 30 * 60);
});

// ---------- drafts and sessions ----------

test("fresh start: server questions are used, no draft, no notice", async () => {
  const server = makeServer();
  const started = await load({ server, drafts: makeDrafts() });
  assert.equal(started.mode, "server");
  assert.equal(started.questions.length, 8);
  assert.equal(started.initial, null);
  assert.equal(started.notice, null);
  assert.ok(started.questions.some((q) => q.id.startsWith("ce:")), "content-engine questions arrive from the server");
});

test("resume: a draft for a live attempt restores answers on the SAME questions in the SAME order", async () => {
  const server = makeServer();
  const first = await load({ server, drafts: makeDrafts() });
  const ids = first.questions.map((q) => q.id);
  const drafts = makeDrafts({ attemptId: first.attemptId, questionIds: ids, answers: { [ids[2]]: "kept", "ce:NOT-IN-ATTEMPT": "dropped" }, bookmarked: { [ids[1]]: true }, currentIndex: 3, timeLeft: 900 });
  const resumed = await load({ server, drafts });
  assert.equal(resumed.attemptId, first.attemptId);
  assert.deepEqual(resumed.questions.map((q) => q.id), ids);
  assert.deepEqual(resumed.initial.answers, { [ids[2]]: "kept" });
  assert.equal(resumed.initial.currentIndex, 3);
  assert.equal(resumed.initial.timeLeft, 900);
  assert.equal(drafts.state.cleared, 0);
});

test("resume: server clock wins when the draft claims more time than is left", async () => {
  const server = makeServer();
  const first = await load({ server, drafts: makeDrafts() });
  const key = `users/alice/mockAttempts/${first.attemptId}`;
  server.db.store.set(key, { ...server.db.store.get(key), startedAtMs: Date.now() - 25 * 60 * 1000 });
  const drafts = makeDrafts({ attemptId: first.attemptId, questionIds: first.questions.map((q) => q.id), answers: {}, timeLeft: 1700 });
  const resumed = await load({ server, drafts });
  assert.ok(resumed.initial.timeLeft <= 5 * 60 && resumed.initial.timeLeft >= 5 * 60 - 5);
});

for (const [label, mutate, expected] of [
  ["attempt already submitted (409)", async (server, id) => service.submitAttempt({ ...server.ctx, attemptId: id, answers: {} }), /already submitted/],
  ["attempt missing (404)", async (server, id) => server.db.store.delete(`users/alice/mockAttempts/${id}`), /could not be resumed/],
  ["questions no longer resolve (410)", async (server, id) => { const key = `users/alice/mockAttempts/${id}`; const doc = server.db.store.get(key); server.db.store.set(key, { ...doc, questionIds: ["ce:GONE-001", ...doc.questionIds.slice(1)] }); }, /could not be resumed/],
]) {
  test(`stale draft: ${label} is discarded visibly and a NEW attempt starts (no silent reshuffle)`, async () => {
    const server = makeServer();
    const first = await load({ server, drafts: makeDrafts() });
    await mutate(server, first.attemptId);
    const drafts = makeDrafts({ attemptId: first.attemptId, questionIds: first.questions.map((q) => q.id), answers: { [first.questions[0].id]: "old answer" }, timeLeft: 100 });
    const next = await load({ server, drafts });
    assert.equal(next.phase, "ready");
    assert.notEqual(next.attemptId, first.attemptId);
    assert.match(next.notice, expected, "student is told");
    assert.equal(next.initial, null, "old answers are not carried onto the new questions");
    assert.equal(drafts.state.cleared, 1);
  });
}

test("resume failure (network) keeps the draft untouched and offers retry, never a new attempt", async () => {
  const server = makeServer();
  const first = await load({ server, drafts: makeDrafts() });
  const draft = { attemptId: first.attemptId, questionIds: first.questions.map((q) => q.id), answers: { [first.questions[0].id]: "mine" }, timeLeft: 600 };
  const drafts = makeDrafts(draft);
  const before = server.db.store.size;
  server.behaviour.failNext.push("network");
  const failed = await load({ server, drafts });
  assert.equal(failed.phase, "error");
  assert.equal(failed.stage, "resume");
  assert.equal(failed.canGoOffline, false);
  assert.deepEqual(drafts.state.draft, draft, "draft preserved");
  assert.equal(drafts.state.cleared, 0);
  assert.equal(server.db.store.size, before, "no new attempt was created");

  const retried = await load({ server, drafts });
  assert.equal(retried.phase, "ready");
  assert.equal(retried.attemptId, first.attemptId);
});

test("resume 401/503/500 are retryable errors, not stale drafts", async () => {
  for (const code of [401, 503, 500]) {
    const server = makeServer();
    const first = await load({ server, drafts: makeDrafts() });
    const drafts = makeDrafts({ attemptId: first.attemptId, questionIds: first.questions.map((q) => q.id), answers: {} });
    server.behaviour.failNext.push(code);
    const failed = await load({ server, drafts });
    assert.equal(failed.phase, "error", String(code));
    assert.equal(drafts.state.cleared, 0, String(code));
  }
});

test("start failure: visible error with retry; offline choice offered only when legacy questions exist", async () => {
  const server = makeServer();
  server.behaviour.failNext.push("network");
  const failed = await load({ server, drafts: makeDrafts() });
  assert.equal(failed.phase, "error");
  assert.equal(failed.stage, "start");
  assert.equal(failed.canGoOffline, true);
  assert.match(failed.message, /could not reach the server/i);
  const again = await load({ server, drafts: makeDrafts() });
  assert.equal(again.phase, "ready", "retry works");

  const emptyLegacy = await session.loadAttemptSession({
    uid: "alice", config: config(), duration: 30, count: 8,
    api: { start: async () => ({ ok: false, status: 500, data: {}, networkError: false }), resume: async () => ({}) },
    drafts: makeDrafts().api, legacyPool: () => [], describeFailure: client.describeFailure,
  });
  assert.equal(emptyLegacy.canGoOffline, false);
});

test("offline draft: legacy ids resolve all-or-nothing; unresolvable draft is cleared with a notice", async () => {
  const server = makeServer();
  const pool = legacyPool();
  const good = makeDrafts({ attemptId: null, questionIds: pool.slice(0, 3).map((q) => String(q.id)), answers: {}, timeLeft: 500 });
  const resumed = await load({ server, drafts: good });
  assert.equal(resumed.mode, "local");
  assert.deepEqual(resumed.questions.map((q) => String(q.id)), pool.slice(0, 3).map((q) => String(q.id)));
  assert.equal(good.state.cleared, 0);

  const bad = makeDrafts({ attemptId: null, questionIds: [String(pool[0].id), "ce:CH01-MCQ-001"], answers: {} });
  const next = await load({ server, drafts: bad });
  assert.equal(next.phase, "ready");
  assert.equal(next.mode, "server");
  assert.match(next.notice, /no longer available/);
  assert.equal(bad.state.cleared, 1);
});

test("an older server that sends ids only: legacy ids resolve locally, ce: ids are an error (never guessed)", async () => {
  const pool = legacyPool();
  const legacyOnly = await session.loadAttemptSession({
    uid: "alice", config: config(), duration: 30, count: 8,
    api: { start: async () => ({ ok: true, status: 200, data: { attemptId: "abc1234567", questionIds: pool.slice(0, 2).map((q) => String(q.id)) } }), resume: async () => ({}) },
    drafts: makeDrafts().api, legacyPool, describeFailure: client.describeFailure,
  });
  assert.equal(legacyOnly.phase, "ready");
  const withCe = await session.loadAttemptSession({
    uid: "alice", config: config(), duration: 30, count: 8,
    api: { start: async () => ({ ok: true, status: 200, data: { attemptId: "abc1234567", questionIds: ["ce:CH01-MCQ-001"] } }), resume: async () => ({}) },
    drafts: makeDrafts().api, legacyPool, describeFailure: client.describeFailure,
  });
  assert.equal(withCe.phase, "error");
});

test("signed-out sessions are local, legacy only, and say so (attemptId null)", () => {
  const local = session.loadLocalSession({ config: config(), count: 8, legacyPool });
  assert.equal(local.mode, "local");
  assert.equal(local.attemptId, null);
  assert.ok(local.questions.every((q) => !String(q.id).startsWith("ce:")));
});

test("availability request carries only filter fields and returns counts", async () => {
  const seen = [];
  const out = await client.availabilityRequest(attempts.normalizeAttemptConfig({ category: "icse-class-10", difficulty: "hard", type: "mcq", chapter: "operators" }), async (url) => { seen.push(url); return response(200, { ok: true, count: 3, chapters: [] }); });
  assert.equal(out.data.count, 3);
  assert.match(seen[0], /category=icse-class-10/);
  assert.match(seen[0], /difficulty=hard/);
  assert.doesNotMatch(seen[0], /answer|explanation/);
});

test("setup screen: no 'no questions' flash while the server count loads; stale same-category count kept", () => {
  const base = { enabled: true, configKey: "k2", category: "icse-class-10", localCount: 0, localChapters: ["local"] };
  // First load: nothing from the server yet -> pending, never presented as a confirmed number.
  assert.equal(session.resolveAvailability({ ...base, remote: null }).pending, true);
  // Filter changed: previous server count for the same category is kept as a hint while pending.
  const stale = session.resolveAvailability({ ...base, remote: { key: "k1", category: "icse-class-10", count: 120, chapters: ["srv"] } });
  assert.deepEqual([stale.count, stale.pending, stale.chapters], [120, true, ["srv"]]);
  // Different category: server data for another category must not leak in.
  const other = session.resolveAvailability({ ...base, remote: { key: "k1", category: "icse-class-9", count: 99, chapters: ["x"] } });
  assert.deepEqual([other.count, other.pending, other.chapters], [0, true, ["local"]]);
  // Current answer arrives.
  const fresh = session.resolveAvailability({ ...base, remote: { key: "k2", category: "icse-class-10", count: 7, chapters: ["srv"] } });
  assert.deepEqual([fresh.count, fresh.pending], [7, false]);
  // No server (disabled/CBSE/signed out): local numbers are the truth, never pending.
  assert.deepEqual(session.resolveAvailability({ ...base, enabled: false, remote: null, localCount: 5 }), { count: 5, chapters: ["local"], pending: false });
});

test("player error state: message shown, Retry always offered, offline only when allowed", () => {
  const network = session.buildPlayerErrorView({ message: "Network problem.", canGoOffline: true });
  assert.equal(network.message, "Network problem.");
  assert.deepEqual(network.actions.map((a) => a.id), ["retry", "offline", "back"]);
  const auth = session.buildPlayerErrorView({ message: "Please sign in again.", canGoOffline: false });
  assert.deepEqual(auth.actions.map((a) => a.id), ["retry", "back"]);
  assert.ok(session.buildPlayerErrorView(undefined).message.length > 10, "falls back to a readable message");
});
