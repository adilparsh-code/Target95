import { test } from "node:test";
import assert from "node:assert/strict";
import { assertStagingConfig, clientConfigProblems, serviceAccountProblems, parseServiceAccount, STAGING_PROJECT_ID } from "../scripts/lib/stagingGuard.mjs";

const goodAccount = {
  type: "service_account",
  project_id: STAGING_PROJECT_ID,
  client_email: `firebase-adminsdk-x@${STAGING_PROJECT_ID}.iam.gserviceaccount.com`,
  private_key: "-----BEGIN PRIVATE KEY-----\nSECRET-DO-NOT-LEAK\n-----END PRIVATE KEY-----\n",
};
const goodEnv = {
  NEXT_PUBLIC_FIREBASE_API_KEY: "k",
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: `${STAGING_PROJECT_ID}.firebaseapp.com`,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: STAGING_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: `${STAGING_PROJECT_ID}.firebasestorage.app`,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "1",
  NEXT_PUBLIC_FIREBASE_APP_ID: "1:1:web:1",
};

test("accepts a complete staging configuration", () => {
  assert.doesNotThrow(() => assertStagingConfig({ env: goodEnv, rawServiceAccount: JSON.stringify(goodAccount) }));
});

test("rejects a service account from another project (production) without leaking the key", () => {
  const prod = { ...goodAccount, project_id: "target95-prod", client_email: "a@target95-prod.iam.gserviceaccount.com" };
  assert.throws(() => assertStagingConfig({ env: goodEnv, rawServiceAccount: JSON.stringify(prod) }), (error) => {
    assert.match(error.message, /Refusing to run/);
    assert.doesNotMatch(error.message, /SECRET-DO-NOT-LEAK/);
    return true;
  });
});

test("rejects client config that points at another project, field by field", () => {
  for (const key of ["NEXT_PUBLIC_FIREBASE_PROJECT_ID", "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"]) {
    const problems = clientConfigProblems({ ...goodEnv, [key]: "something-else" });
    assert.ok(problems.some((line) => line.startsWith(key)), key);
  }
});

test("rejects missing client keys and malformed or mismatched service accounts", () => {
  assert.ok(clientConfigProblems({}).length >= 6);
  assert.throws(() => parseServiceAccount("{not json"), /not valid JSON/);
  assert.throws(() => parseServiceAccount(""), /missing/);
  assert.ok(serviceAccountProblems({ ...goodAccount, type: "authorized_user" }).length > 0);
  assert.ok(serviceAccountProblems({ ...goodAccount, private_key: "" }).length > 0);
});
