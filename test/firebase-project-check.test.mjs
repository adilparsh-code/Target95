import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { FirebaseProjectMismatchError, STAGING_FIREBASE_PROJECT_ID, assertFirebaseProjectConsistency as check } from "../src/lib/firebaseProjectCheck.mjs";

const throwsMismatch = (args, pattern) =>
  assert.throws(() => check(args), (e) => e instanceof FirebaseProjectMismatchError && pattern.test(e.message));

test("matching client and service-account projects pass", () => {
  assert.deepEqual(check({ clientProjectId: "target95-staging", serviceAccountProjectId: "target95-staging", appEnv: "staging" }), { projectId: "target95-staging" });
  assert.deepEqual(check({ clientProjectId: "some-prod", serviceAccountProjectId: "some-prod" }), { projectId: "some-prod" });
  assert.deepEqual(check({ clientProjectId: " p1 ", serviceAccountProjectId: "p1" }), { projectId: "p1" });
});

test("mismatch fails clearly, naming both project ids", () => {
  throwsMismatch({ clientProjectId: "target95-staging", serviceAccountProjectId: "target95-prod" }, /target95-staging.*target95-prod/);
});

test("missing client project id or service-account project_id fails closed", () => {
  for (const client of [undefined, null, "", "  ", 42]) throwsMismatch({ clientProjectId: client, serviceAccountProjectId: "p" }, /NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set/);
  for (const server of [undefined, null, "", "  ", {}]) throwsMismatch({ clientProjectId: "p", serviceAccountProjectId: server }, /no project_id/);
  throwsMismatch(undefined, /NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set/);
});

test("a staging deployment is locked to target95-staging even when client and server agree", () => {
  assert.equal(STAGING_FIREBASE_PROJECT_ID, "target95-staging");
  for (const appEnv of ["staging", " STAGING "]) {
    throwsMismatch({ clientProjectId: "target95-prod", serviceAccountProjectId: "target95-prod", appEnv }, /staging deployment must use "target95-staging"/);
  }
  // Production (or unset) is not locked to the staging id.
  assert.doesNotThrow(() => check({ clientProjectId: "target95-prod", serviceAccountProjectId: "target95-prod", appEnv: "production" }));
});

test("errors never contain key material", () => {
  try {
    check({ clientProjectId: "a", serviceAccountProjectId: "b", appEnv: "staging" });
    assert.fail("should throw");
  } catch (e) {
    assert.doesNotMatch(e.message, /private_key|BEGIN|client_email|@/);
  }
});

test("firebase-admin.js runs the check before initialising and passes only project ids + env name (static guard)", () => {
  const src = fs.readFileSync(new URL("../src/app/lib/firebase-admin.js", import.meta.url), "utf8");
  const checkAt = src.indexOf("assertFirebaseProjectConsistency({");
  const initAt = src.indexOf("initializeApp({ credential");
  assert.ok(checkAt > 0 && initAt > checkAt, "check must precede initializeApp");
  assert.match(src, /serviceAccountProjectId: serviceAccount\.project_id/);
  assert.match(src, /clientProjectId: process\.env\.NEXT_PUBLIC_FIREBASE_PROJECT_ID/);
});
