#!/usr/bin/env node
/**
 * Verifies the staging Firebase project end to end. Prints PASS/FAIL lines only; never
 * prints secrets. Needs the staging NEXT_PUBLIC_FIREBASE_* variables and the staging
 * service account (STAGING_SERVICE_ACCOUNT_FILE), plus the seeded test accounts.
 *
 *   set -a; . ./.env.staging.local; set +a   # outside git; see STAGING_FIREBASE_SETUP.md
 *   STAGING_SERVICE_ACCOUNT_FILE=/path/sa.json node scripts/staging-verify.mjs
 */
import fs from "node:fs";
import { cert, initializeApp as initAdmin } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { getFirestore as getAdminDb } from "firebase-admin/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, getDocs, collection, setDoc, updateDoc } from "firebase/firestore";
import { assertStagingConfig, STAGING_PROJECT_ID } from "./lib/stagingGuard.mjs";
import { credentialsPath, readCredentials } from "./lib/stagingCredentials.mjs";

const raw = process.env.STAGING_SERVICE_ACCOUNT_FILE ? fs.readFileSync(process.env.STAGING_SERVICE_ACCOUNT_FILE, "utf8") : process.env.FIREBASE_SERVICE_ACCOUNT;
const account = assertStagingConfig({ rawServiceAccount: raw, requireClient: true });
const creds = readCredentials(credentialsPath());
if (!creds.icseX || !creds.retry) throw new Error("Run scripts/staging-seed-test-accounts.mjs first (credentials file missing).");

let failures = 0;
const report = (ok, name, detail = "") => {
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
};
const denied = async (promise) => {
  try { await promise; return false; } catch (error) { return /permission-denied|insufficient permissions/i.test(`${error?.code} ${error?.message}`); }
};

// ---- Admin SDK -------------------------------------------------------------------------
const admin = initAdmin({ credential: cert(account) }, "staging-verify");
const adminAuth = getAdminAuth(admin);
const adminDb = getAdminDb(admin);
report(admin.options.credential && account.project_id === STAGING_PROJECT_ID, "Admin SDK initialised for staging project", account.project_id);
const list = await adminAuth.listUsers(5);
report(Array.isArray(list.users), "Admin Auth reachable (listUsers)", `${list.users.length} user(s) in first page`);
const probe = adminDb.collection("_stagingProbe").doc(`probe-${Date.now()}`);
await probe.set({ ok: true });
report((await probe.get()).data()?.ok === true, "Admin Firestore write + read");
await probe.delete();
for (const key of ["icseX", "retry"]) {
  const profile = (await adminDb.collection("users").doc(creds[key].uid).get()).data();
  report(profile?.status === "active" && profile?.role === "student" && profile?.board === "ICSE" && profile?.studentClass === "Class 10", `Profile ${key}: active ICSE Class 10 student`);
  const authUser = await adminAuth.getUser(creds[key].uid);
  report(authUser.emailVerified === true && !authUser.disabled, `Auth user ${key}: email verified, enabled`);
}

// ---- Client SDK + security rules -------------------------------------------------------
const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
const clientAuth = getAuth(app);
const clientDb = (await import("firebase/firestore")).getFirestore(app);

report(await denied(getDoc(doc(clientDb, "users", creds.icseX.uid))), "Rules: signed-out client cannot read a profile");

const cred = await signInWithEmailAndPassword(clientAuth, creds.icseX.email, creds.icseX.password);
report(cred.user.uid === creds.icseX.uid, "Client sign-in with Email/Password (ICSE X student)");
report((await getDoc(doc(clientDb, "users", creds.icseX.uid))).exists(), "Rules: student reads own profile");
report((await getDocs(collection(clientDb, "users", creds.icseX.uid, "mockAttempts"))).size >= 0, "Rules: student lists own mockAttempts");
report(await denied(getDoc(doc(clientDb, "users", creds.retry.uid))), "Rules: student cannot read another student's profile");
report(await denied(getDocs(collection(clientDb, "users", creds.retry.uid, "mockAttempts"))), "Rules: student cannot read another student's attempts");
report(await denied(updateDoc(doc(clientDb, "users", creds.icseX.uid), { status: "inactive" })), "Rules: student cannot change own account status");
report(await denied(updateDoc(doc(clientDb, "users", creds.icseX.uid), { role: "admin" })), "Rules: student cannot promote self to admin");
report(await denied(setDoc(doc(clientDb, "results", "forged-result"), { userId: creds.icseX.uid, score: 100 })), "Rules: student cannot create a result");
report(await denied(setDoc(doc(clientDb, "users", creds.icseX.uid, "mockAttempts", "forged"), { status: "submitted" })), "Rules: student cannot write an attempt");
await signOut(clientAuth);

console.log(failures ? `\n${failures} check(s) FAILED` : `\nAll checks passed for ${STAGING_PROJECT_ID}`);
process.exit(failures ? 1 : 0);
