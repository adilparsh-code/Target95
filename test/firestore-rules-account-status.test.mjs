/**
 * Firestore rules regression tests: trusted account status (active,
 * deactivated, missing/malformed status, missing profile, cross-user, admin).
 *
 * Runs against the local Firestore emulator only (never production):
 *   npm run test:rules
 * which wraps: firebase emulators:exec --only firestore --project demo-target95 "node --test --test-concurrency=1 test/firestore-rules-account-status.test.mjs test/firestore-listener-account-status.test.mjs"
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

const DAN = "dan";       // deactivated student
const LENA = "lena";     // legacy profile without status
const MAL = "mal";       // malformed status / disabled values
const GHOST = "ghost";   // signed in, no profile yet
const EXADMIN = "exadmin"; // deactivated admin
const EXTEACHER = "exteacher"; // deactivated teacher

describe("firestore.rules: account status", { skip }, () => {
  before(async () => {
    await fetch(`http://${HOST}/emulator/v1/projects/${PROJECT}/databases/(default)/documents`, { method: "DELETE" });
    const profile = (uid, extra) => set(OWNER, `users/${uid}`, { uid, email: `${uid}@example.com`, fullName: uid, role: "student", ...extra });
    await profile(ALICE, { status: "active", disabled: false });
    await profile(BOB, { status: "active", disabled: false });
    await profile(DAN, { status: "inactive", disabled: true });
    await profile(LENA, {});
    // States a partial status transition can leave behind.
    await profile("halfdeact", { status: "inactive", disabled: true, statusSync: { target: "inactive", auth: "failed" } });
    await profile("halfreact", { status: "inactive", disabled: true, statusSync: { target: "active", auth: "failed" } });
    await profile(MAL, { status: true, disabled: "no" });
    await profile(ADMIN, { role: "admin", status: "active", disabled: false });
    await profile(EXADMIN, { role: "admin", status: "inactive", disabled: true });
    await profile(TEACHER, { role: "teacher", status: "active", disabled: false });
    await profile(EXTEACHER, { role: "teacher", status: "inactive", disabled: true });
    await set(OWNER, "questions/q1", { question: "What is a loop?" });
    await set(OWNER, "progress/bobMarker", { userId: BOB, chapter: "loops", questionId: "q1" });
    await set(OWNER, `users/${BOB}/practiceSessions/s1`, { score: 1 });
  });

  describe("active student", () => {
    test("reads and edits own profile fields", async () => {
      allowed(await get(token(ALICE), `users/${ALICE}`));
      allowed(await patch(token(ALICE), `users/${ALICE}`, { fullName: "Alice A", board: "ICSE", studentClass: "Class 10" }));
    });
    test("normal student writes still work", async () => {
      allowed(await create(token(ALICE), `users/${ALICE}/practiceSessions`, "p1", { startedAt: "now" }));
      allowed(await create(token(ALICE), `users/${ALICE}/aiChats`, "c1", { text: "hi" }));
      allowed(await create(token(ALICE), "progress", "a1", { userId: ALICE, chapter: "loops", questionId: "q2" }));
      allowed(await create(token(ALICE), "bookmarks", "b1", { userId: ALICE, questionId: "q2" }));
    });
    test("reads learning content", async () => {
      allowed(await get(token(ALICE), "questions/q1"));
    });
    test("cannot change own status, disabled or role", async () => {
      denied(await patch(token(ALICE), `users/${ALICE}`, { status: "inactive" }));
      denied(await patch(token(ALICE), `users/${ALICE}`, { disabled: true }));
      denied(await patch(token(ALICE), `users/${ALICE}`, { role: "admin" }));
    });
    test("unverified email is denied", async () => {
      denied(await get(token(ALICE, { verified: false }), `users/${ALICE}`));
    });
  });

  describe("deactivated student (existing ID token still valid)", () => {
    test("cannot read or edit own profile", async () => {
      denied(await get(token(DAN), `users/${DAN}`));
      denied(await patch(token(DAN), `users/${DAN}`, { fullName: "Dan" }));
    });
    test("cannot reactivate themselves", async () => {
      denied(await patch(token(DAN), `users/${DAN}`, { status: "active", disabled: false }));
    });
    test("cannot write practice, chats, progress or bookmarks", async () => {
      denied(await create(token(DAN), `users/${DAN}/practiceSessions`, "p1", { startedAt: "now" }));
      denied(await create(token(DAN), `users/${DAN}/aiChats`, "c1", { text: "hi" }));
      denied(await create(token(DAN), "progress", "d1", { userId: DAN, chapter: "loops", questionId: "q2" }));
      denied(await create(token(DAN), "bookmarks", "d1", { userId: DAN, questionId: "q2" }));
    });
    test("cannot read learning content", async () => {
      denied(await get(token(DAN), "questions/q1"));
    });
  });

  describe("partial status transitions", () => {
    test("deactivation with Auth failure: profile denies access with a valid token", async () => {
      denied(await get(token("halfdeact"), "users/halfdeact"));
      denied(await create(token("halfdeact"), "users/halfdeact/practiceSessions", "p1", { startedAt: "now" }));
      denied(await get(token("halfdeact"), "questions/q1"));
    });
    test("reactivation with Firestore failure: Auth enabled but still denied", async () => {
      denied(await get(token("halfreact"), "users/halfreact"));
      denied(await create(token("halfreact"), "progress", "h1", { userId: "halfreact", chapter: "loops", questionId: "q9" }));
    });
    test("students cannot write status, disabled or sync fields", async () => {
      denied(await patch(token(ALICE), `users/${ALICE}`, { statusSync: { target: "active", auth: "synced" } }));
      denied(await patch(token(ALICE), `users/${ALICE}`, { statusUpdatedBy: ALICE }));
      // A half-reactivated student cannot finish the reactivation themselves.
      denied(await patch(token("halfreact"), "users/halfreact", { status: "active", disabled: false }));
      denied(await patch(token("halfdeact"), "users/halfdeact", { statusSync: { target: "inactive", auth: "synced" } }));
    });
    test("admin can complete a reconciliation", async () => {
      allowed(await patch(token(ADMIN), "users/halfreact", { status: "active", disabled: false, statusSync: { target: "active", auth: "synced" } }));
      allowed(await get(token("halfreact"), "users/halfreact"));
    });
  });

  describe("token issued before deactivation", () => {
    // Firestore rules never consult live Firebase Auth state: they see only the
    // token's frozen claims plus the profile document. These cases pin down
    // what that means for each deactivation outcome.
    test("same token is denied once the profile is inactive (successful deactivation)", async () => {
      const uid = "flip1";
      await set(OWNER, `users/${uid}`, { uid, role: "student", status: "active", disabled: false });
      await set(OWNER, `users/${uid}/practiceSessions/s1`, { score: 1 });
      const oldToken = token(uid);
      allowed(await get(oldToken, `users/${uid}/practiceSessions/s1`));
      allowed(await get(oldToken, "questions/q1"));
      await patch(OWNER, `users/${uid}`, { status: "inactive", disabled: true });
      denied(await get(oldToken, `users/${uid}/practiceSessions/s1`));
      denied(await get(oldToken, "questions/q1"));
      denied(await create(oldToken, `users/${uid}/practiceSessions`, "s2", { startedAt: "now" }));
      denied(await patch(oldToken, `users/${uid}`, { status: "active", disabled: false }));
    });
    test("RESIDUAL: if the profile write failed, the same token is still accepted (Auth disable is invisible to rules)", async () => {
      const uid = "flip2";
      await set(OWNER, `users/${uid}`, { uid, role: "student", status: "active", disabled: false });
      const oldToken = token(uid);
      // Simulates partial_auth_only: Auth disabled + revoked, profile still active.
      // Nothing in Firestore changed, so the unexpired token still passes.
      allowed(await get(oldToken, "questions/q1"));
      allowed(await create(oldToken, `users/${uid}/practiceSessions`, "s1", { startedAt: "now" }));
    });
    // Token expiry (<= 1h) is enforced by production Firebase; the emulator
    // accepts unsigned test tokens, so expiry is not asserted here.
  });

  describe("missing or malformed status fails closed", () => {
    test("legacy profile without status is denied", async () => {
      denied(await get(token(LENA), `users/${LENA}`));
      denied(await create(token(LENA), `users/${LENA}/practiceSessions`, "p1", { startedAt: "now" }));
    });
    test("malformed status/disabled values are denied", async () => {
      denied(await get(token(MAL), `users/${MAL}`));
      denied(await get(token(MAL), "questions/q1"));
    });
  });

  describe("missing profile", () => {
    test("may check that its own profile does not exist", async () => {
      // Rules allowed the read; the emulator answers 404 because the
      // document does not exist. A rules denial would be 403.
      assert.equal(await get(token(GHOST), `users/${GHOST}`), 404);
      denied(await get(token(GHOST), "users/nobody"));
    });
    test("gets no other access", async () => {
      denied(await create(token(GHOST), `users/${GHOST}/practiceSessions`, "p1", { startedAt: "now" }));
      denied(await get(token(GHOST), "questions/q1"));
    });
    test("cannot create a profile without active status or with extra fields", async () => {
      denied(await create(token(GHOST), "users", GHOST, { uid: GHOST, email: "g@example.com", role: "student" }));
      denied(await create(token(GHOST), "users", GHOST, { uid: GHOST, role: "student", status: "inactive" }));
      denied(await create(token(GHOST), "users", GHOST, { uid: GHOST, role: "student", status: "active", disabled: false }));
      denied(await create(token(GHOST), "users", GHOST, { uid: GHOST, role: "admin", status: "active" }));
      denied(await create(token(ALICE), "users", GHOST, { uid: GHOST, role: "student", status: "active" }));
    });
    test("sign-up creates an active student profile (email and Google flows)", async () => {
      allowed(await create(token(GHOST, { verified: false }), "users", GHOST, {
        uid: GHOST, email: "ghost@example.com", fullName: "Ghost", role: "student", board: "ICSE",
        studentClass: "Class 10", emailVerified: false, createdAt: "2026-10-28T00:00:00Z", status: "active",
      }));
      allowed(await create(token("gina"), "users", "gina", {
        uid: "gina", email: "gina@example.com", fullName: "Gina", avatarUrl: "", role: "student", board: "ICSE",
        studentClass: "Class 10", emailVerified: true, createdAt: "2026-10-28T00:00:00Z", status: "active",
      }));
      allowed(await get(token("gina"), "questions/q1"));
    });
  });

  describe("cross-user access", () => {
    test("active student cannot read or write another student's data", async () => {
      denied(await get(token(ALICE), `users/${BOB}`));
      denied(await patch(token(ALICE), `users/${BOB}`, { fullName: "Hacked" }));
      denied(await get(token(ALICE), `users/${BOB}/practiceSessions/s1`));
      denied(await create(token(ALICE), `users/${BOB}/practiceSessions`, "x", { score: 0 }));
      denied(await get(token(ALICE), "progress/bobMarker"));
      denied(await create(token(ALICE), "progress", "x1", { userId: BOB, chapter: "loops", questionId: "q3" }));
    });
  });

  describe("admin and teacher", () => {
    test("active admin can read profiles and manage status and content", async () => {
      allowed(await get(token(ADMIN), `users/${BOB}`));
      allowed(await patch(token(ADMIN), `users/${LENA}`, { status: "active", disabled: false }));
      allowed(await create(token(ADMIN), "mockTests", "m1", { title: "Test" }));
      allowed(await del(token(ADMIN), "progress/bobMarker"));
    });
    test("deactivated admin loses admin access", async () => {
      denied(await get(token(EXADMIN), `users/${BOB}`));
      denied(await create(token(EXADMIN), "mockTests", "m2", { title: "Test" }));
      denied(await patch(token(EXADMIN), `users/${DAN}`, { status: "active" }));
    });
    test("active teacher can write content; deactivated teacher cannot", async () => {
      allowed(await create(token(TEACHER), "questions", "t1", { question: "Q" }));
      denied(await create(token(EXTEACHER), "questions", "t2", { question: "Q" }));
    });
    test("student cannot write content", async () => {
      denied(await create(token(ALICE), "questions", "s1", { question: "Q" }));
    });
  });

  describe("account status leases (server-only coordination)", () => {
    test("no client, not even an active admin, can read or write accountStatusLeases", async () => {
      allowed(await set(OWNER, `accountStatusLeases/${ALICE}`, { uid: ALICE, holder: "admin-route:op", expiresAtMs: Date.now() + 60000 }));
      for (const who of [ALICE, ADMIN, DAN]) {
        denied(await get(token(who), `accountStatusLeases/${ALICE}`));
        denied(await set(token(who), `accountStatusLeases/${ALICE}`, { uid: ALICE, holder: who, expiresAtMs: 0 }));
        denied(await del(token(who), `accountStatusLeases/${ALICE}`));
        denied(await create(token(who), "accountStatusLeases", `${who}-new`, { uid: who, holder: who, expiresAtMs: 0 }));
      }
    });
  });
});
