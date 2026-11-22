import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { assertFirebaseProjectConsistency } from "@/lib/firebaseProjectCheck.mjs";

function getServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT is not configured.");
  }

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("FIREBASE_SERVICE_ACCOUNT is not valid JSON.");
  }
}

function getAdminApp() {
  const existing = getApps()[0];
  if (existing) return existing;

  const serviceAccount = getServiceAccount();
  // Throws (and leaves no app initialised) when the client and server Firebase
  // projects differ, so every caller fails closed instead of mixing projects.
  assertFirebaseProjectConsistency({
    clientProjectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    serviceAccountProjectId: serviceAccount.project_id,
    appEnv: process.env.NEXT_PUBLIC_APP_ENV,
  });
  return initializeApp({ credential: cert(serviceAccount) });
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}
