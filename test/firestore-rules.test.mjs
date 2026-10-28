/**
 * Firestore security rules regression tests.
 *
 * Runs against the local Firestore emulator only (never production):
 *   npm run test:rules
 * which wraps: firebase emulators:exec --only firestore --project demo-target95 "node --test --test-concurrency=1 test/firestore-rules-account-status.test.mjs test/firestore-rules.test.mjs"
 *
 * Uses the emulator REST API with unsigned test tokens, so no extra npm
 * dependency is needed. Skipped automatically when FIRESTORE_EMULATOR_HOST is
 * not set.
 */
import { test, describe, before } from "node:test";
import assert from "node:assert/strict";

const HOST = process.env.FIRESTORE_EMULATOR_HOST;
const PROJECT = process.env.GCLOUD_PROJECT || "demo-target95";
const BASE = HOST ? `http://${HOST}/v1/projects/${PROJECT}/databases/(default)/documents` : "";
const skip = !HOST && "FIRESTORE_EMULATOR_HOST not set (run via npm run test:rules)";

const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64url");
function token(uid, { verified = true } = {}) {
  const now = Math.floor(Date.now() / 1000);
  return `${b64({ alg: "none", typ: "JWT" })}.${b64({
    iss: `https://securetoken.google.com/${PROJECT}`,
    aud: PROJECT,
    sub: uid,
    user_id: uid,
    email: `${uid}@example.com`,
    email_verified: verified,
    iat: now,
    exp: now + 3600,
    auth_time: now,
    firebase: { sign_in_provider: "password", identities: {} },
  })}.`;
}
const OWNER = "owner"; // emulator admin bypass, stands in for the Admin SDK

function enc(v) {
  if (v === null) return { nullValue: null };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (typeof v === "string") return { stringValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(enc) } };
  return { mapValue: { fields: Object.fromEntries(Object.entries(v).map(([k, x]) => [k, enc(x)])) } };
}
const fields = (obj) => ({ fields: Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, enc(v)])) });

async function call(method, path, auth, body, query = "") {
  const res = await fetch(`${BASE}/${path}${query}`, {
    method,
    headers: { Authorization: `Bearer ${auth}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.status;
}
const create = (auth, col, id, data) => call("POST", col, auth, fields(data), `?documentId=${encodeURIComponent(id)}`);
const patch = (auth, path, data) =>
  call("PATCH", path, auth, fields(data), "?" + Object.keys(data).map((k) => `updateMask.fieldPaths=${encodeURIComponent(k)}`).join("&"));
const set = (auth, path, data) => call("PATCH", path, auth, fields(data));
const get = (auth, path) => call("GET", path, auth);
const del = (auth, path) => call("DELETE", path, auth);

const ALICE = "alice";
const BOB = "bob";
const ADMIN = "admin1";
const TEACHER = "teacher1";
const allowed = (s) => assert.equal(s, 200, `expected allowed, got ${s}`);
const denied = (s) => assert.equal(s, 403, `expected denied, got ${s}`);

describe("firestore.rules", { skip }, () => {
  // Profiles are active because firestore.rules (since #76) requires an
  // active, server-managed profile for every protected operation.
  before(async () => {
    await fetch(`http://${HOST}/emulator/v1/projects/${PROJECT}/databases/(default)/documents`, { method: "DELETE" });
    await set(OWNER, `users/${ALICE}`, { uid: ALICE, email: `${ALICE}@example.com`, role: "student", fullName: "Alice", status: "active", disabled: false });
    await set(OWNER, `users/${BOB}`, { uid: BOB, email: `${BOB}@example.com`, role: "student", fullName: "Bob", status: "active", disabled: false });
    await set(OWNER, `users/${ADMIN}`, { uid: ADMIN, email: `${ADMIN}@example.com`, role: "admin", status: "active", disabled: false });
    await set(OWNER, `users/${TEACHER}`, { uid: TEACHER, email: `${TEACHER}@example.com`, role: "teacher", status: "active", disabled: false });
    await set(OWNER, `results/aliceResult`, { userId: ALICE, score: 3, percentage: 30, source: "server-graded" });
    await set(OWNER, `results/bobResult`, { userId: BOB, score: 5, percentage: 50, source: "server-graded" });
    await set(OWNER, `progress/aliceMarker`, { userId: ALICE, chapter: "loops", questionId: "q1", completedAt: "2026-10-28T00:00:00Z" });
    await set(OWNER, `progress/bobMarker`, { userId: BOB, chapter: "loops", questionId: "q1" });
    await set(OWNER, `users/${ALICE}/mockAttempts/att1`, { userId: ALICE, status: "in_progress", questionIds: ["1001"] });
  });

  describe("results (mock test scores)", () => {
    test("student cannot create their own result", async () => {
      denied(await create(token(ALICE), "results", "forged1", { userId: ALICE, score: 10, percentage: 100 }));
    });
    test("student cannot create a result for another student", async () => {
      denied(await create(token(ALICE), "results", "forged2", { userId: BOB, score: 0 }));
    });
    test("student cannot modify their own score", async () => {
      denied(await patch(token(ALICE), "results/aliceResult", { score: 10, percentage: 100 }));
    });
    test("student cannot modify another student's score", async () => {
      denied(await patch(token(ALICE), "results/bobResult", { score: 0 }));
    });
    test("student cannot delete results", async () => {
      denied(await del(token(ALICE), "results/aliceResult"));
    });
    test("teacher cannot write results", async () => {
      denied(await create(token(TEACHER), "results", "forged3", { userId: ALICE, score: 10 }));
    });
    test("student can read own result but not another's", async () => {
      allowed(await get(token(ALICE), "results/aliceResult"));
      denied(await get(token(ALICE), "results/bobResult"));
    });
    test("admin can read and correct a result", async () => {
      allowed(await get(token(ADMIN), "results/bobResult"));
      allowed(await patch(token(ADMIN), "results/bobResult", { reviewedBy: ADMIN }));
    });
    test("server (Admin SDK) can write graded results", async () => {
      allowed(await create(OWNER, "results", "serverGraded1", { userId: ALICE, score: 7, source: "server-graded" }));
    });
  });

  describe("mock attempts", () => {
    test("student can read own attempt", async () => {
      allowed(await get(token(ALICE), `users/${ALICE}/mockAttempts/att1`));
    });
    test("student cannot create, edit or reopen attempts", async () => {
      denied(await create(token(ALICE), `users/${ALICE}/mockAttempts`, "att2", { userId: ALICE, status: "in_progress" }));
      denied(await patch(token(ALICE), `users/${ALICE}/mockAttempts/att1`, { status: "in_progress", questionIds: ["1"] }));
    });
    test("student cannot read another student's attempt", async () => {
      denied(await get(token(BOB), `users/${ALICE}/mockAttempts/att1`));
    });
  });

  describe("progress (self-study markers)", () => {
    test("student can add a plain completion marker", async () => {
      allowed(await create(token(ALICE), "progress", "aliceNew", { userId: ALICE, chapter: "arrays", questionId: "q7", completedAt: "2026-10-28T10:00:00Z" }));
    });
    test("student cannot write score fields into progress", async () => {
      denied(await create(token(ALICE), "progress", "forgedP1", { userId: ALICE, chapter: "arrays", questionId: "q8", correctAnswers: 500, accuracy: 100 }));
      denied(await create(token(ALICE), "progress", "forgedP2", { userId: ALICE, chapter: "arrays", questionId: "q9", score: 99 }));
    });
    test("student cannot edit an existing progress record", async () => {
      denied(await patch(token(ALICE), "progress/aliceMarker", { questionsSolved: 999 }));
    });
    test("student cannot create or delete another student's progress", async () => {
      denied(await create(token(ALICE), "progress", "forgedP3", { userId: BOB, chapter: "arrays", questionId: "q1" }));
      denied(await del(token(ALICE), "progress/bobMarker"));
    });
    test("student can delete own marker (chapter reset)", async () => {
      allowed(await del(token(ALICE), "progress/aliceNew"));
    });
    test("admin can read and update progress", async () => {
      allowed(await get(token(ADMIN), "progress/bobMarker"));
      allowed(await patch(token(ADMIN), "progress/bobMarker", { reviewed: true }));
    });
  });

  describe("user profile", () => {
    test("student can edit own profile fields", async () => {
      allowed(await patch(token(ALICE), `users/${ALICE}`, { fullName: "Alice A", board: "ICSE", studentClass: "Class 10" }));
    });
    test("student cannot change role, status, disabled or add fields", async () => {
      denied(await patch(token(ALICE), `users/${ALICE}`, { role: "admin" }));
      denied(await patch(token(ALICE), `users/${ALICE}`, { status: "inactive" }));
      denied(await patch(token(ALICE), `users/${ALICE}`, { disabled: true }));
      denied(await patch(token(ALICE), `users/${ALICE}`, { plan: "premium" }));
    });
    test("student cannot edit another student's profile", async () => {
      denied(await patch(token(ALICE), `users/${BOB}`, { fullName: "Hacked" }));
    });
    test("unverified user cannot edit profile", async () => {
      denied(await patch(token(ALICE, { verified: false }), `users/${ALICE}`, { fullName: "X" }));
    });
    test("new user can create own student profile", async () => {
      allowed(await create(token("carol", { verified: false }), "users", "carol", { uid: "carol", email: "carol@example.com", role: "student", fullName: "Carol", status: "active" }));
    });
    test("new user cannot self-create as admin", async () => {
      denied(await create(token("dave"), "users", "dave", { uid: "dave", email: "dave@example.com", role: "admin" }));
    });
    test("admin can manage profiles", async () => {
      allowed(await patch(token(ADMIN), `users/${BOB}`, { status: "inactive", disabled: true }));
    });
  });

  describe("teacher content workflows", () => {
    test("teacher can create questions, student cannot", async () => {
      allowed(await create(token(TEACHER), "questions", "tq1", { question: "What is a loop?" }));
      denied(await create(token(ALICE), "questions", "sq1", { question: "x" }));
    });
  });
});
