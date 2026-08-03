"use client";

import { AuthProvider } from "@/context/AuthContext";

export default function AuthProviderWrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}