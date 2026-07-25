"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (firebaseUser) {
          // Fetch user profile from Firestore
          try {
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
            const userData = userDoc.exists() ? userDoc.data() : {};

            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              emailVerified: firebaseUser.emailVerified,
              fullName: userData.fullName || firebaseUser.displayName || "",
              role: userData.role || "student",
              ...userData,
            });
          } catch (err) {
            console.error("Error fetching user profile:", err);
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              emailVerified: firebaseUser.emailVerified,
              fullName: firebaseUser.displayName || "",
              role: "student",
            });
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Auth state change error:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const register = async (email, password, fullName) => {
    try {
      setError(null);
      setLoading(true);

      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile with fullName
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      // Create Firestore profile
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email,
        fullName: fullName,
        role: "student", // Default role
        emailVerified: false,
        createdAt: new Date(),
      });

      // Send email verification
      await sendEmailVerification(userCredential.user);

      return {
        success: true,
        message: "Registration successful! Please verify your email.",
        user: userCredential.user,
      };
    } catch (err) {
      const errorMessage = getErrorMessage(err.code);
      setError(errorMessage);
      setLoading(false);
      return { success: false, message: errorMessage };
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        await signOut(auth);
        setLoading(false);
        return {
          success: false,
          message: "Please verify your email before logging in.",
        };
      }

      return { success: true, user: userCredential.user };
    } catch (err) {
      const errorMessage = getErrorMessage(err.code);
      setError(errorMessage);
      setLoading(false);
      return { success: false, message: errorMessage };
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      return { success: true };
    } catch (err) {
      const errorMessage = getErrorMessage(err.code);
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      setLoading(true);

      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      return {
        success: true,
        message: "Password reset email sent! Check your inbox.",
      };
    } catch (err) {
      const errorMessage = getErrorMessage(err.code);
      setError(errorMessage);
      setLoading(false);
      return { success: false, message: errorMessage };
    }
  };

  const resendVerification = async () => {
    try {
      setError(null);
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        return { success: true, message: "Verification email sent!" };
      }
      return { success: false, message: "No user logged in." };
    } catch (err) {
      const errorMessage = getErrorMessage(err.code);
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    forgotPassword,
    resendVerification,
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Helper function to convert Firebase error codes to user-friendly messages
function getErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/invalid-credential":
      return "Invalid email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/operation-not-allowed":
      return "Email/password accounts are not enabled.";
    case "auth/popup-closed-by-user":
      return "Sign-in popup closed.";
    case "auth/cancelled-popup-request":
      return "Sign-in request cancelled.";
    default:
      return "An error occurred. Please try again.";
  }
}