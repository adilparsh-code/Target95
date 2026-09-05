"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";

export default function VerifyEmailPage() {
  const { user, loading, resendVerification, refreshVerification, logout, error } = useAuth();
  const [message, setMessage] = useState("");
  const [checking, setChecking] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  const handleResend = async () => {
    const result = await resendVerification();
    setMessage(result.message || "");
  };

  const handleCheck = async () => {
    setChecking(true);
    const result = await refreshVerification();
    setChecking(false);
    if (result.success) {
      router.replace(result.user?.role === "admin" ? "/admin" : "/dashboard");
    } else {
      setMessage(result.message || "Your email is still not verified.");
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">✉️</div>
          <h1 className="text-2xl font-bold text-gray-900">Verify your email</h1>
          <p className="mt-3 text-gray-600">We sent a verification link to:</p>
          <p className="mt-1 font-semibold text-gray-900 break-all">{user.email}</p>
          <p className="mt-4 text-sm text-gray-500">Open the email, click the verification link, then return here and check again.</p>

          {(message || error) && (
            <div className="mt-5 rounded-md bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800" role="status">
              {message || error}
            </div>
          )}

          <div className="mt-6 space-y-3">
            <Button type="button" variant="default" size="lg" className="w-full" onClick={handleCheck} disabled={checking}>
              {checking ? "Checking..." : "I've verified my email"}
            </Button>
            <Button type="button" variant="outline" size="lg" className="w-full" onClick={handleResend}>
              Resend verification email
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-sm">
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Back to login</Link>
            <button type="button" onClick={handleLogout} className="text-gray-600 hover:text-gray-900">Sign out</button>
          </div>
        </div>
      </Container>
    </div>
  );
}
