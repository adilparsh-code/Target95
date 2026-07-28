"use client";

import dynamic from "next/dynamic";

const AuthProvider = dynamic(
  () => import("@/context/AuthContext").then((mod) => mod.AuthProvider),
  { ssr: false }
);

export default function AuthProviderWrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}