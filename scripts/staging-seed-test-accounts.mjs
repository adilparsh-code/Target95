#!/usr/bin/env node
/**
 * Creates (or refreshes) the two dedicated STAGING test students.
 *
 *   STAGING_SERVICE_ACCOUNT_FILE=/path/outside/repo/sa.json node scripts/staging-seed-test-accounts.mjs
 *
 * Refuses to run against anything but target95-staging (see scripts/lib/stagingGuard.mjs).
 * Passwords are generated here, stored only in the local credentials file (mode 0600,
 * outside the repo) and are never printed. Accounts get a verified email and an active
 * student profile in users/{uid}, matching what the session API requires.
 */
import fs from "node:fs";
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { assertStagingConfig } from "./lib/stagingGuard.mjs";
import { credentialsPath, generatePassword, readCredentials, writeCredentials } from "./lib/stagingCredentials.mjs";

const ACCOUNTS = [
  { key: "icseX", email: process.env.STAGING_TEST_EMAIL_X || "mocktest.x@target95-staging.example.com", fullName: "Staging Test Student (ICSE X)" },
  { key: "retry", email: process.env.STAGING_TEST_EMAIL_RETRY || "mocktest.retry@target95-staging.example.com", fullName: "Staging Test Student (Retry)" },
];

const raw = process.env.STAGING_SERVICE_ACCOUNT_FILE ? fs.readFileSync(process.env.STAGING_SERVICE_ACCOUNT_FILE, "utf8") : process.env.FIREBASE_SERVICE_ACCOUNT;
const account = assertStagingConfig({ rawServiceAccount: raw, requireClient: false });

const app = initializeApp({ credential: cert(account) }, "staging-seed");
const auth = getAuth(app);
const db = getFirestore(app);

const file = credentialsPath();
const stored = readCredentials(file);

for (const { key, email, fullName } of ACCOUNTS) {
  const password = stored[key]?.password || generatePassword();
  let user;
  try {
    user = await auth.getUserByEmail(email);
    user = await auth.updateUser(user.uid, { password, emailVerified: true, disabled: false, displayName: fullName });
  } catch (error) {
    if (error?.code !== "auth/user-not-found") throw error;
    user = await auth.createUser({ email, password, emailVerified: true, displayName: fullName });
  }
  await db.collection("users").doc(user.uid).set(
    { uid: user.uid, email, fullName, role: "student", status: "active", disabled: false, board: "ICSE", studentClass: "Class 10", emailVerified: true, createdAt: FieldValue.serverTimestamp() },
    { merge: true },
  );
  stored[key] = { email, uid: user.uid, password };
  console.log(`ready: ${key}  ${email}  uid=${user.uid.slice(0, 6)}…`);
}

writeCredentials(file, stored);
console.log(`Passwords stored (not shown) in ${file} (mode 0600). Project: ${account.project_id}`);
