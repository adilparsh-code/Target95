"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, reload, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getFirebaseInstance, isFirebaseConfigured } from "@/app/lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const buildUser = useCallback(async (firebaseUser) => {
    const { db } = getFirebaseInstance();
    const profileSnapshot = await getDoc(doc(db, "users", firebaseUser.uid));
    const profile = profileSnapshot.exists() ? profileSnapshot.data() : {};
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || "",
      fullName: profile.fullName || firebaseUser.displayName || "",
      avatarUrl: profile.avatarUrl || firebaseUser.photoURL || "",
      emailVerified: firebaseUser.emailVerified,
      role: profile.role || "student",
      ...profile,
      emailVerified: firebaseUser.emailVerified,
    };
  }, []);

  useEffect(() => {
    const { auth } = getFirebaseInstance();
    if (!auth) {
      setLoading(false);
      return undefined;
    }
    return onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        setUser(firebaseUser ? await buildUser(firebaseUser) : null);
      } catch {
        setUser(firebaseUser ? { uid: firebaseUser.uid, email: firebaseUser.email || "", fullName: firebaseUser.displayName || "", emailVerified: firebaseUser.emailVerified, role: "student" } : null);
      } finally {
        setLoading(false);
      }
    });
  }, [buildUser]);

  const login = async (email, password) => {
    try {
      setError(null);
      const { auth } = getFirebaseInstance();
      if (!auth) {
        const message = getFirebaseConfigurationMessage();
        setError(message);
        return { success: false, message };
      }
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      if (!credential.user.emailVerified) {
        await signOut(auth);
        const message = "Please verify your email before logging in.";
        setError(message);
        return { success: false, message, requiresVerification: true };
      }
      const profileUser = await buildUser(credential.user);
      setUser(profileUser);
      return { success: true, user: profileUser };
    } catch (authError) {
      const message = getAuthMessage(authError.code);
      setError(message);
      return { success: false, message };
    }
  };

  const register = async (email, password, fullName) => {
    try {
      setError(null);
      const { auth, db } = getFirebaseInstance();
      if (!auth || !db) {
        const message = getFirebaseConfigurationMessage();
        setError(message);
        return { success: false, message };
      }
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedName = String(fullName || "").trim();
      const credential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      await updateProfile(credential.user, { displayName: normalizedName });
      await setDoc(doc(db, "users", credential.user.uid), {
        uid: credential.user.uid,
        email: normalizedEmail,
        fullName: normalizedName,
        role: "student",
        board: "ICSE",
        studentClass: "Class 10",
        emailVerified: false,
        createdAt: serverTimestamp(),
      });
      try {
        await sendEmailVerification(credential.user);
      } catch (verificationError) {
        console.error("Verification email could not be sent:", verificationError);
        return { success: true, user: credential.user, message: "Account created, but we could not send the verification email. Please resend it before logging in." };
      }
      return { success: true, user: credential.user, message: "Account created. Please verify your email before signing in." };
    } catch (authError) {
      const message = getAuthMessage(authError.code);
      setError(message);
      return { success: false, message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      const { auth, db } = getFirebaseInstance();
      if (!auth || !db) {
        const message = getFirebaseConfigurationMessage();
        setError(message);
        return { success: false, message };
      }
      const credential = await signInWithPopup(auth, new GoogleAuthProvider());
      const profileSnapshot = await getDoc(doc(db, "users", credential.user.uid));
      if (!profileSnapshot.exists()) {
        await setDoc(doc(db, "users", credential.user.uid), {
          uid: credential.user.uid,
          email: credential.user.email || "",
          fullName: credential.user.displayName || "",
          avatarUrl: credential.user.photoURL || "",
          role: "student",
          board: "ICSE",
          studentClass: "Class 10",
          emailVerified: credential.user.emailVerified,
          createdAt: serverTimestamp(),
        });
      }
      const profileUser = await buildUser(credential.user);
      setUser(profileUser);
      return { success: true, user: profileUser };
    } catch (authError) {
      const message = getAuthMessage(authError.code);
      setError(message);
      return { success: false, message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      const { auth } = getFirebaseInstance();
      if (!auth) {
        const message = getFirebaseConfigurationMessage();
        setError(message);
        return { success: false, message };
      }
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      return { success: true, message: "Password reset email sent. Check your inbox." };
    } catch (authError) {
      const message = getAuthMessage(authError.code);
      setError(message);
      return { success: false, message };
    }
  };

  const resendVerification = async () => {
    try {
      setError(null);
      const { auth } = getFirebaseInstance();
      if (!auth?.currentUser) {
        const message = "Please sign in first to resend the verification email.";
        setError(message);
        return { success: false, message };
      }
      await sendEmailVerification(auth.currentUser);
      return { success: true, message: "Verification email sent. Check your inbox." };
    } catch (authError) {
      const message = getAuthMessage(authError.code);
      setError(message);
      return { success: false, message };
    }
  };

  const refreshVerification = async () => {
    try {
      const { auth } = getFirebaseInstance();
      if (!auth?.currentUser) return { success: false, message: "No signed-in user." };
      await reload(auth.currentUser);
      if (!auth.currentUser.emailVerified) return { success: false, message: "Your email is still not verified." };
      const profileUser = await buildUser(auth.currentUser);
      setUser(profileUser);
      return { success: true, user: profileUser };
    } catch (authError) {
      const message = getAuthMessage(authError.code);
      setError(message);
      return { success: false, message };
    }
  };

  const updateStudentProfile = async (updates) => {
    if (!user) return { success: false, message: "You must be signed in." };
    try {
      const { auth, db } = getFirebaseInstance();
      if (!auth || !db) {
        const message = getFirebaseConfigurationMessage();
        setError(message);
        return { success: false, message };
      }
      const safeUpdates = { fullName: String(updates.fullName || "").trim(), board: String(updates.board || "ICSE"), studentClass: String(updates.studentClass || "Class 10"), updatedAt: serverTimestamp() };
      await updateProfile(auth.currentUser, { displayName: safeUpdates.fullName });
      await setDoc(doc(db, "users", user.uid), safeUpdates, { merge: true });
      setUser((current) => ({ ...current, ...safeUpdates }));
      return { success: true };
    } catch (authError) {
      const message = getAuthMessage(authError.code);
      setError(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      const { auth } = getFirebaseInstance();
      if (!auth) {
        const message = getFirebaseConfigurationMessage();
        setError(message);
        return { success: false, message };
      }
      await signOut(auth);
      setUser(null);
      return { success: true };
    } catch (authError) {
      const message = getAuthMessage(authError.code);
      setError(message);
      return { success: false, message };
    }
  };

  const value = { user, loading, error, login, register, loginWithGoogle, forgotPassword, resendVerification, refreshVerification, updateStudentProfile, logout, clearError: () => setError(null) };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

function getAuthMessage(code) {
  const messages = {
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/operation-not-allowed": "Email/password sign-in is not enabled for this Firebase project.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/network-request-failed": "Network error. Please try again.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/user-disabled": "This account has been disabled. Please contact support.",
  };
  return messages[code] || "We could not complete that request. Please try again.";
}

function getFirebaseConfigurationMessage() {
  return isFirebaseConfigured ? "Firebase could not be initialized. Please try again." : "Firebase is not configured for this deployment. Please contact support.";
}
