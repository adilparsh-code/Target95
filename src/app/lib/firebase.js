// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abc123def456"
};

let app;
let auth;
let db;

// Singleton pattern to prevent multiple app initializations
// Only initialize on client-side to avoid SSR issues
export function getFirebaseInstance() {
  // Only initialize on client-side
  if (typeof window === "undefined") {
    return { app: null, auth: null, db: null };
  }
  
  if (!app) {
    app = initializeApp(firebaseConfig);
    // Only initialize auth and db when running on client
    auth = getAuth(app);
    db = getFirestore(app);
  }
  
  return { app, auth, db };
}

// Don't initialize on import - only when actually used on client
export { auth, db };