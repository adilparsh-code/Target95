// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase web configuration is supplied by the deployment environment.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const requiredConfigKeys = ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"];

export const isFirebaseConfigured = requiredConfigKeys.every(
  (key) => Boolean(firebaseConfig[key]) && !firebaseConfig[key].startsWith("your_")
);

let app;
let auth;
let db;

// Singleton pattern to prevent multiple app initializations
// Only initialize on client-side to avoid SSR issues
export function getFirebaseInstance() {
  // Only initialize on client-side
  if (typeof window !== "undefined" && isFirebaseConfigured && (!app || !auth || !db)) {
    app = getApps()[0] || initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  }
  return { app, auth, db };
}

// Initialize on import if we're on client
if (typeof window !== "undefined") {
  getFirebaseInstance();
}

export { app, auth, db };
// Don't initialize on import - only when actually used on client
