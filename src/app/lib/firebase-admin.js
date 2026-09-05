import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

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
  return getApps()[0] || initializeApp({
    credential: cert(getServiceAccount()),
  });
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}
