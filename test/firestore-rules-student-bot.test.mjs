/**
 * Firestore rules tests for the student study-assistant collections:
 *   users/{uid}/botQuizAttempts/{id}  and  users/{uid}/botUsage/{id}
 * Both are Admin-SDK-only: every client read/write must be denied, for owners,
 * other students, teachers, admins, unverified and inactive users.
 *
 * Emulator only (never production). Run: npm run test:rules
 * Skipped automatically when FIRESTORE_EMULATOR_HOST is not set.
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
    iss: `https://securetoken.google.com/${PROJECT}`, aud: PROJECT, sub: uid, user_id: uid,
    email: `${uid}@example.com`, email_verified: verified, iat: now, exp: now + 3600, auth_time: now,
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
const set = (auth, path, data) => call("PATCH", path, auth, fields(data));
const create = (auth, col, id, data) => call("POST", col, auth, fields(data), `?documentId=${encodeURIComponent(id)}`);
const get = (auth, path) => call("GET", path, auth);
const del = (auth, path) => call("DELETE", path, auth);
const allowed = (s) => assert.equal(s, 200, `expected allowed, got ${s}`);
const denied = (s) => assert.equal(s, 403, `expected denied, got ${s}`);

const ALICE = "alice";
const BOB = "bob";
const ADMIN = "admin1";
const TEACHER = "teacher1";
const INACTIVE = "inactive1";
const COLLECTIONS = ["botQuizAttempts", "botUsage"];

describe("firestore.rules — student bot collections", { skip }, () => {
  before(async () => {
    await fetch(`http://${HOST}/emulator/v1/projects/${PROJECT}/databases/(default)/documents`, { method: "DELETE" });
    for (const [uid, role, status] of [[ALICE, "student", "active"], [BOB, "student", "active"], [ADMIN, "admin", "active"], [TEACHER, "teacher", "active"], [INACTIVE, "student", "suspended"]]) {
      await set(OWNER, `users/${uid}`, { uid, email: `${uid}@example.com`, role, fullName: uid, status, disabled: false });
    }
    for (const c of COLLECTIONS) await set(OWNER, `users/${ALICE}/${c}/d1`, { userId: ALICE, status: "in_progress", questionIds: ["q1"] });
  });

  for (const c of COLLECTIONS) {
    describe(c, () => {
      test("server (Admin SDK) can write and read", async () => {
        allowed(await set(OWNER, `users/${ALICE}/${c}/server1`, { userId: ALICE, n: 1 }));
        allowed(await get(OWNER, `users/${ALICE}/${c}/server1`));
      });
      test("owner cannot read, create, edit or delete", async () => {
        denied(await get(token(ALICE), `users/${ALICE}/${c}/d1`));
        denied(await create(token(ALICE), `users/${ALICE}/${c}`, "mine", { userId: ALICE, status: "submitted", percentage: 100 }));
        denied(await set(token(ALICE), `users/${ALICE}/${c}/d1`, { userId: ALICE, status: "submitted", percentage: 100 }));
        denied(await del(token(ALICE), `users/${ALICE}/${c}/d1`));
      });
      test("another student cannot read or write someone else's documents", async () => {
        denied(await get(token(BOB), `users/${ALICE}/${c}/d1`));
        denied(await set(token(BOB), `users/${ALICE}/${c}/d1`, { userId: ALICE, status: "submitted" }));
        denied(await create(token(BOB), `users/${ALICE}/${c}`, "bobwrote", { userId: ALICE }));
      });
      test("teacher and admin clients are denied too", async () => {
        for (const who of [TEACHER, ADMIN]) {
          denied(await get(token(who), `users/${ALICE}/${c}/d1`));
          denied(await set(token(who), `users/${ALICE}/${c}/d1`, { userId: ALICE }));
        }
      });
      test("inactive, unverified and anonymous callers are denied", async () => {
        denied(await get(token(INACTIVE), `users/${INACTIVE}/${c}/x`));
        denied(await set(token(INACTIVE), `users/${INACTIVE}/${c}/x`, { userId: INACTIVE }));
        denied(await get(token(ALICE, { verified: false }), `users/${ALICE}/${c}/d1`));
        denied(await get("", `users/${ALICE}/${c}/d1`));
      });
    });
  }
});
