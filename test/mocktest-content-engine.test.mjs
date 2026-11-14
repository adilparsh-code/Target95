import { test, before } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import { createFakeDb, fakeServerTimestamp } from "./helpers/fakeFirestore.mjs";

let content;
let service;
let attempts;
let mockTestQuestions;

const ENV_OFF = {};
const ENV_X = { MOCKTEST_CE_CATEGORIES: "icse-class-10" };
const ENV_ALL = { MOCKTEST_CE_CATEGORIES: "icse-class-9,icse-class-10,isc-class-11,isc-class-12" };
const cfg = (overrides) => attempts.normalizeAttemptConfig({ difficulty: "all", type: "mixed", chapter: "all", count: 100, ...overrides });

before(async () => {
  register(pathToFileURL(path.join(process.cwd(), "scripts/lib/alias-loader.mjs")));
  content = await import("../src/lib/mocktestContent.js");
  service = await import("../src/lib/mocktestService.js");
  attempts = await import("../src/lib/mocktestAttempts.js");
  mockTestQuestions = (await import("../src/app/data/mock-test/mockTestQuestions.js")).default;
});

// ---------- pool: eligibility, flag, class and board ----------

test("phase-1 pool is exactly 230 MCQ + 95 true/false = 325", () => {
  const pool = content.getContentQuestions();
  const byType = pool.reduce((acc, q) => ({ ...acc, [q.type]: (acc[q.type] || 0) + 1 }), {});
  assert.deepEqual(byType, { mcq: 230, "true-false": 95 });
  assert.equal(pool.length, 325);
});

test("excluded content stays out: CH13-MCQ-003, output, free text, quarantined Number Systems", () => {
  const ids = new Set(content.getContentQuestions().map((q) => q.sourceId));
  assert.ok(!ids.has("CH13-MCQ-003"), "duplicate-option MCQ");
  assert.ok(!ids.has("icse-x-numbers-program-003") && !ids.has("icse-x-numbers-case-004"));
  for (const q of content.getContentQuestions()) assert.ok(["mcq", "true-false"].includes(q.type));
  assert.equal(content.resolveContentQuestion("ce:CH13-MCQ-003"), undefined);
});

test("ids are namespaced and never collide with the 28 legacy ids", () => {
  const legacy = new Set(mockTestQuestions.map((q) => String(q.id)));
  for (const q of content.getContentQuestions()) {
    assert.ok(q.id.startsWith("ce:"));
    assert.ok(!legacy.has(q.id));
  }
  assert.equal(new Set(content.getContentQuestions().map((q) => q.id)).size, 325);
});

test("true/false questions are delivered with exactly [\"True\", \"False\"] and a server-owned answer", () => {
  for (const q of content.getContentQuestions().filter((item) => item.type === "true-false")) {
    assert.deepEqual(q.options, ["True", "False"]);
    assert.ok(["True", "False"].includes(q.answer));
  }
});

test("the content source is disabled by default", () => {
  assert.deepEqual(content.getEnabledContentCategories({}), []);
  assert.deepEqual(content.getEnabledContentCategories(undefined), []);
  for (const category of ["icse-class-9", "icse-class-10", "isc-class-11", "isc-class-12"]) {
    assert.deepEqual(content.buildContentPool(cfg({ category }), ENV_OFF), []);
  }
});

test("flag enables only the named categories; ISC XI and ISC XII can never be enabled by the flag", () => {
  assert.deepEqual(content.getEnabledContentCategories(ENV_X), ["icse-class-10"]);
  assert.deepEqual(content.getEnabledContentCategories(ENV_ALL), ["icse-class-10", "icse-class-9"]);
  assert.equal(content.buildContentPool(cfg({ category: "isc-class-11" }), ENV_ALL).length, 0);
  assert.equal(content.buildContentPool(cfg({ category: "isc-class-12" }), ENV_ALL).length, 0);
  assert.equal(content.buildContentPool(cfg({ category: "icse-class-9" }), ENV_X).length, 0, "IX stays off until enabled");
  assert.equal(content.buildContentPool(cfg({ category: "cbse-class-10", board: "CBSE", subjectCode: "402" }), ENV_ALL).length, 0);
});

test("class and board filtering: ICSE IX gets only IX, ICSE X only X, no cross-class leakage", () => {
  const nine = content.buildContentPool(cfg({ category: "icse-class-9" }), ENV_ALL);
  const ten = content.buildContentPool(cfg({ category: "icse-class-10" }), ENV_ALL);
  assert.ok(nine.length > 0 && ten.length > 0);
  assert.ok(nine.every((q) => q.class === "ICSE IX" && q.board === "ICSE"));
  assert.ok(ten.every((q) => q.class === "ICSE X" && q.board === "ICSE"));
  const nineIds = new Set(nine.map((q) => q.id));
  assert.ok(ten.every((q) => !nineIds.has(q.id)));
});

test("difficulty and type filters are applied (case-insensitive difficulty)", () => {
  const hard = content.buildContentPool(cfg({ category: "icse-class-10", difficulty: "hard" }), ENV_X);
  assert.ok(hard.length > 0 && hard.every((q) => q.difficulty === "hard"));
  const tf = content.buildContentPool(cfg({ category: "icse-class-10", type: "true-false" }), ENV_X);
  assert.ok(tf.length > 0 && tf.every((q) => q.type === "true-false"));
  assert.equal(content.buildContentPool(cfg({ category: "icse-class-10", type: "output" }), ENV_X).length, 0);
  assert.equal(content.buildContentPool(cfg({ category: "icse-class-10", type: "theory" }), ENV_X).length, 0);
});

test("chapter filter works through aliases and membership (for-loop / loops)", () => {
  const forLoop = content.buildContentPool(cfg({ category: "icse-class-9", chapter: "for-loop" }), ENV_ALL);
  const loops = content.buildContentPool(cfg({ category: "icse-class-9", chapter: "loops" }), ENV_ALL);
  assert.ok(forLoop.length > 0);
  assert.deepEqual(loops.map((q) => q.id), forLoop.map((q) => q.id));
});

test("category pool never mixes classes on shared chapters (for-loop holds IX and X)", () => {
  const nineLoop = content.buildContentPool(cfg({ category: "icse-class-9", chapter: "for-loop" }), ENV_ALL);
  const tenLoop = content.buildContentPool(cfg({ category: "icse-class-10", chapter: "for-loop" }), ENV_ALL);
  assert.ok(nineLoop.every((q) => q.class === "ICSE IX"));
  assert.ok(tenLoop.every((q) => q.class === "ICSE X"));
});

test("availability: flag off equals the legacy numbers; flag on counts match the real pools", () => {
  const off = content.getAvailability(cfg({ category: "icse-class-10" }), ENV_OFF);
  assert.equal(off.contentEnabled, false);
  assert.equal(off.count, attempts.buildMockTestPool(cfg({ category: "icse-class-10" })).length);
  assert.deepEqual(off.chapters, attempts.getMockTestChapterOptions("icse-class-10"));

  for (const category of ["icse-class-9", "icse-class-10"]) {
    const on = content.getAvailability(cfg({ category }), ENV_ALL);
    assert.equal(on.contentEnabled, true);
    assert.ok(on.count > attempts.buildMockTestPool(cfg({ category })).length);
    for (const option of on.chapters) {
      const config = cfg({ category, chapter: option.id });
      const expected = attempts.buildMockTestPool(config).length + content.buildContentPool(config, ENV_ALL).length;
      assert.equal(option.count, expected, `${category}/${option.id}`);
    }
  }
});

// ---------- delivery: no answer keys before submission ----------

const FORBIDDEN_KEYS = ["answer", "answerIndex", "correctAnswer", "explanation", "hint", "tags", "sourceId", "chapterIds"];
const ALLOWED_KEYS = ["chapter", "difficulty", "id", "marks", "options", "question", "topic", "type"];

test("answer-key exposure audit: every eligible question serialises without keys", () => {
  for (const question of content.getContentQuestions()) {
    const payload = attempts.toClientQuestion(question);
    assert.deepEqual(Object.keys(payload).sort(), ALLOWED_KEYS);
    for (const key of FORBIDDEN_KEYS) assert.ok(!(key in payload), `${question.id} leaks ${key}`);
    if (question.explanation) assert.ok(!JSON.stringify(payload).includes(question.explanation), `${question.id} leaks its explanation`);
  }
  // legacy questions use the same whitelist
  for (const question of mockTestQuestions) {
    const payload = attempts.toClientQuestion(question);
    assert.deepEqual(Object.keys(payload).sort(), ALLOWED_KEYS);
  }
});

function newTestContext() {
  const db = createFakeDb();
  return { db, serverTimestamp: fakeServerTimestamp };
}

test("start response and resume response carry no answer keys or explanations (whole pool sampled)", async () => {
  const ctx = newTestContext();
  const seen = new Set();
  for (let i = 0; i < 12; i += 1) {
    const { status, body } = await service.startAttempt({ ...ctx, uid: "u1", rawConfig: { category: "icse-class-10", count: 100 }, env: ENV_X, random: () => i / 12 });
    assert.equal(status, 200);
    const text = JSON.stringify(body);
    for (const q of body.questions) {
      assert.deepEqual(Object.keys(q).sort(), ALLOWED_KEYS);
      seen.add(q.id);
      const full = content.resolveContentQuestion(q.id) || mockTestQuestions.find((l) => String(l.id) === q.id);
      if (full.explanation) assert.ok(!text.includes(full.explanation), `${q.id} explanation in start payload`);
    }
    const resumed = await service.getAttemptForResume({ ...ctx, uid: "u1", attemptId: body.attemptId });
    assert.equal(resumed.status, 200);
    assert.ok(!("answer" in resumed.body) && !JSON.stringify(resumed.body).includes('"correctAnswer"'));
  }
  assert.ok([...seen].some((id) => id.startsWith("ce:")));
});

// ---------- lifecycle on the fake database ----------

async function startCe(ctx, uid = "alice", extra = {}) {
  const { body } = await service.startAttempt({ ...ctx, uid, rawConfig: { category: "icse-class-10", difficulty: "all", type: "mixed", count: 8, ...extra }, env: ENV_X, random: () => 0.4 });
  return body;
}

test("flag off: new attempts contain no ce: ids; legacy path unchanged", async () => {
  const ctx = newTestContext();
  const { body } = await service.startAttempt({ ...ctx, uid: "alice", rawConfig: { category: "icse-class-10", difficulty: "all", count: 20 }, env: ENV_OFF, random: () => 0.3 });
  assert.ok(body.questionIds.length > 0);
  assert.ok(body.questionIds.every((id) => !id.startsWith("ce:")));
});

test("stored attempt document keeps the existing shape (persistence unchanged)", async () => {
  const ctx = newTestContext();
  const body = await startCe(ctx);
  const stored = ctx.db.store.get(`users/alice/mockAttempts/${body.attemptId}`);
  assert.deepEqual(Object.keys(stored).sort(), ["config", "createdAt", "questionIds", "startedAtMs", "status", "userId"]);
  assert.equal(stored.status, "in_progress");
  assert.ok(body.questionIds.some((id) => id.startsWith("ce:")), "content-engine questions were selected");
});

test("server grades content-engine questions; correct, wrong and unanswered are scored on the server", async () => {
  const ctx = newTestContext();
  const body = await startCe(ctx);
  const ids = body.questionIds;
  const answers = {};
  ids.forEach((id, i) => {
    const full = content.resolveContentQuestion(id) || mockTestQuestions.find((l) => String(l.id) === id);
    if (i % 3 === 0) answers[id] = String(full.answer);
    else if (i % 3 === 1) answers[id] = "definitely wrong";
  });
  const expectedCorrect = ids.filter((_, i) => i % 3 === 0).length;
  const { status, body: out } = await service.submitAttempt({ ...ctx, uid: "alice", attemptId: body.attemptId, answers, nowMs: Date.now() });
  assert.equal(status, 200);
  assert.equal(out.result.score, expectedCorrect);
  assert.equal(out.result.source, "server-graded");
  assert.equal(out.reveal.length, ids.length);
  const ce = out.result.review.filter((item) => item.source === "content-engine");
  assert.ok(ce.length > 0);
});

test("forged scores, foreign ids and non-string answers are ignored", async () => {
  const ctx = newTestContext();
  const body = await startCe(ctx);
  const forged = { score: 999, percentage: 100, userId: "bob", role: "admin", "ce:CH01-MCQ-001": "x", [body.questionIds[0]]: { $gt: "" } };
  const { body: out } = await service.submitAttempt({ ...ctx, uid: "alice", attemptId: body.attemptId, answers: forged });
  assert.equal(out.result.score, 0);
  assert.equal(out.result.userId, "alice");
});

test("results document stores no answer keys, no explanations and no reveal", async () => {
  const ctx = newTestContext();
  const body = await startCe(ctx);
  await service.submitAttempt({ ...ctx, uid: "alice", attemptId: body.attemptId, answers: {} });
  const stored = ctx.db.store.get(`results/${body.attemptId}`);
  assert.ok(!("reveal" in stored));
  const text = JSON.stringify(stored);
  for (const id of body.questionIds) {
    const full = content.resolveContentQuestion(id);
    if (full?.explanation) assert.ok(!text.includes(full.explanation));
  }
  for (const item of stored.review) assert.deepEqual(Object.keys(item).filter((k) => ["answer", "correctAnswer", "explanation"].includes(k)), []);
});

test("duplicate submission is idempotent: second call replays the stored result and never regrades", async () => {
  const ctx = newTestContext();
  const body = await startCe(ctx);
  const first = await service.submitAttempt({ ...ctx, uid: "alice", attemptId: body.attemptId, answers: {} });
  const snapshot = JSON.stringify(ctx.db.store.get(`results/${body.attemptId}`));
  // a different (better) answer set on retry must not change the stored score
  const answers = Object.fromEntries(body.questionIds.map((id) => [id, String((content.resolveContentQuestion(id) || mockTestQuestions.find((l) => String(l.id) === id)).answer)]));
  const second = await service.submitAttempt({ ...ctx, uid: "alice", attemptId: body.attemptId, answers });
  assert.equal(second.status, 200);
  assert.equal(second.body.replay, true);
  assert.equal(second.body.result.score, first.body.result.score);
  assert.equal(second.body.reveal.length, body.questionIds.length, "retry still returns the reveal");
  assert.equal(JSON.stringify(ctx.db.store.get(`results/${body.attemptId}`)), snapshot, "stored result untouched");
  assert.ok(!("createdAt" in second.body.result));
});

test("ownership: another student cannot submit, resume or replay an attempt", async () => {
  const ctx = newTestContext();
  const body = await startCe(ctx);
  assert.equal((await service.submitAttempt({ ...ctx, uid: "mallory", attemptId: body.attemptId, answers: {} })).status, 404);
  assert.equal((await service.getAttemptForResume({ ...ctx, uid: "mallory", attemptId: body.attemptId })).status, 404);
  await service.submitAttempt({ ...ctx, uid: "alice", attemptId: body.attemptId, answers: {} });
  assert.equal((await service.submitAttempt({ ...ctx, uid: "mallory", attemptId: body.attemptId, answers: {} })).status, 404);
});

test("resume: in-progress attempt re-delivers the same questions; submitted attempt returns 409 with no questions", async () => {
  const ctx = newTestContext();
  const body = await startCe(ctx);
  const resumed = await service.getAttemptForResume({ ...ctx, uid: "alice", attemptId: body.attemptId });
  assert.equal(resumed.status, 200);
  assert.deepEqual(resumed.body.questionIds, body.questionIds);
  assert.deepEqual(resumed.body.questions, body.questions);
  await service.submitAttempt({ ...ctx, uid: "alice", attemptId: body.attemptId, answers: {} });
  const after = await service.getAttemptForResume({ ...ctx, uid: "alice", attemptId: body.attemptId });
  assert.equal(after.status, 409);
  assert.ok(!("questions" in after.body));
  assert.equal((await service.getAttemptForResume({ ...ctx, uid: "alice", attemptId: "doesnotexist12345" })).status, 404);
});

test("attempt started with the flag on still resumes and grades after the flag is turned off", async () => {
  const ctx = newTestContext();
  const body = await startCe(ctx); // flag on
  // later requests do not consult the flag at all: resolution is flag-independent
  const resumed = await service.getAttemptForResume({ ...ctx, uid: "alice", attemptId: body.attemptId });
  assert.equal(resumed.status, 200);
  const out = await service.submitAttempt({ ...ctx, uid: "alice", attemptId: body.attemptId, answers: {} });
  assert.equal(out.status, 200);
  assert.equal(out.body.result.totalQuestions, body.questionIds.length);
});

test("an attempt whose questions can no longer be resolved is reported (410), never silently replaced", async () => {
  const ctx = newTestContext();
  const body = await startCe(ctx);
  const key = `users/alice/mockAttempts/${body.attemptId}`;
  const doc = ctx.db.store.get(key);
  ctx.db.store.set(key, { ...doc, questionIds: [...doc.questionIds.slice(0, -1), "ce:CH99-GONE-001"] });
  const resumed = await service.getAttemptForResume({ ...ctx, uid: "alice", attemptId: body.attemptId });
  assert.equal(resumed.status, 410);
  assert.equal(resumed.body.code, "unresolvable");
  await assert.rejects(() => service.submitAttempt({ ...ctx, uid: "alice", attemptId: body.attemptId, answers: {} }));
  assert.equal(ctx.db.store.get(key).status, "in_progress", "a failed grade leaves the attempt retryable");
  assert.ok(!ctx.db.store.has(`results/${body.attemptId}`));
});

test("legacy numeric-id attempt created before the change grades through the service", async () => {
  const ctx = newTestContext();
  const config = attempts.normalizeAttemptConfig({ category: "icse-class-9", difficulty: "all", type: "mixed", chapter: "all", count: 5 });
  const questionIds = attempts.selectAttemptQuestionIds(config, () => 0.25);
  ctx.db.store.set("users/alice/mockAttempts/legacyattempt0001", { userId: "alice", config, questionIds, startedAtMs: Date.now() - 5000, status: "in_progress" });
  const answers = Object.fromEntries(questionIds.map((id) => [id, String(mockTestQuestions.find((q) => String(q.id) === id).answer)]));
  const { status, body } = await service.submitAttempt({ ...ctx, uid: "alice", attemptId: "legacyattempt0001", answers });
  assert.equal(status, 200);
  assert.equal(body.result.score, questionIds.length);
  assert.ok(body.result.review.every((item) => !("source" in item)), "legacy review entries keep their old shape");
});

test("late submission is graded and flagged, never rejected; time is capped at the duration", async () => {
  const ctx = newTestContext();
  const body = await startCe(ctx, "alice", { duration: 15 });
  const stored = `users/alice/mockAttempts/${body.attemptId}`;
  const startedAtMs = ctx.db.store.get(stored).startedAtMs;
  const onTime = await service.startAttempt({ ...ctx, uid: "alice", rawConfig: { category: "icse-class-10", count: 4, duration: 15 }, env: ENV_X, random: () => 0.1 });
  const lateNow = startedAtMs + 15 * 60 * 1000 + 600_000;
  const late = await service.submitAttempt({ ...ctx, uid: "alice", attemptId: body.attemptId, answers: {}, nowMs: lateNow });
  assert.equal(late.status, 200);
  assert.equal(late.body.result.lateSubmission, true);
  assert.equal(late.body.result.timeTaken, 15 * 60);
  const within = await service.submitAttempt({ ...ctx, uid: "alice", attemptId: onTime.body.attemptId, answers: {}, nowMs: Date.now() + 15 * 60 * 1000 + 60_000 });
  assert.equal(within.body.result.lateSubmission, false, "inside the 120 s grace period");
});

test("time left is reported from the server clock for timed modes and omitted for practice", async () => {
  const ctx = newTestContext();
  const timed = await startCe(ctx, "alice", { duration: 30, mode: "exam" });
  const practice = await startCe(ctx, "alice", { duration: 30, mode: "practice" });
  const t = await service.getAttemptForResume({ ...ctx, uid: "alice", attemptId: timed.attemptId, nowMs: timed.startedAtMs + 600_000 });
  assert.equal(t.body.timeLeftSeconds, 30 * 60 - 600);
  const p = await service.getAttemptForResume({ ...ctx, uid: "alice", attemptId: practice.attemptId });
  assert.equal(p.body.timeLeftSeconds, null);
});

test("no questions available returns 404 and writes nothing", async () => {
  const ctx = newTestContext();
  const { status } = await service.startAttempt({ ...ctx, uid: "alice", rawConfig: { category: "icse-class-10", type: "match-the-following", difficulty: "all" }, env: ENV_X });
  assert.equal(status, 404);
  assert.equal(ctx.db.store.size, 0);
});

test("the two quarantined Number Systems questions never reach any attempt", async () => {
  const ctx = newTestContext();
  for (let i = 0; i < 20; i += 1) {
    const { body } = await service.startAttempt({ ...ctx, uid: "alice", rawConfig: { category: "icse-class-10", count: 100 }, env: ENV_ALL, random: () => (i + 1) / 21 });
    assert.ok(body.questionIds.every((id) => !id.includes("icse-x-numbers")));
  }
});

test("rollout guardrails: ISC XI and ISC XII are not enableable; default process environment serves no content-engine questions", () => {
  assert.deepEqual([...content.ENABLEABLE_CONTENT_CATEGORIES].sort(), ["icse-class-10", "icse-class-9"]);
  assert.ok(!(content.CONTENT_CATEGORIES_ENV in process.env) || process.env[content.CONTENT_CATEGORIES_ENV] === "", "test environment must not set the flag");
  assert.deepEqual(content.getEnabledContentCategories(), []);
  assert.deepEqual(content.buildContentPool(cfg({ category: "icse-class-10" })), []);
});

test("CBSE attempts are unaffected by the content-engine integration", async () => {
  const ctx = newTestContext();
  const raw = { category: "cbse-class-10", board: "CBSE", classNumber: 10, subjectCode: "402", difficulty: "all", type: "mixed", count: 5 };
  const legacyIds = attempts.selectAttemptQuestionIds(attempts.normalizeAttemptConfig(raw), () => 0.3);
  const { status, body } = await service.startAttempt({ ...ctx, uid: "alice", rawConfig: raw, env: ENV_ALL, random: () => 0.3 });
  assert.equal(status, legacyIds.length ? 200 : 404);
  assert.deepEqual(body.questionIds ?? [], legacyIds);
  assert.ok((body.questionIds ?? []).every((id) => !id.startsWith("ce:")));
});
