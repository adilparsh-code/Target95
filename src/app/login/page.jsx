"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import { validateHumanForm } from "../lib/security/inputSecurity";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState("email");
  const { login, loginWithGoogle, loading, error, clearError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateHumanForm({ email, password, honeypot });
    if (!validation.ok) return;

    const result = await login(validation.email, password);
    if (result.success) {
      router.push("/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    clearError();
    setAuthMode("google");
    const result = await loginWithGoogle();
    if (result.success) {
      router.push("/dashboard");
    }
    setAuthMode("email");
  };

  const busy = loading || authMode === "google";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                create a new account
              </Link>
            </p>
          </div>
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <label htmlFor="website" className="sr-only">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                aria-hidden="true"
              />

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm" role="alert">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck="false"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <Button type="submit" variant="default" size="lg" className="w-full" disabled={busy}>
                  {authMode === "email" && loading ? "Signing in..." : "Sign in"}
                </Button>

                <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div><div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-gray-500">or</span></div></div>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full"
                  disabled={busy}
                  onClick={handleGoogleLogin}
                  aria-label="Continue with Google"
                >
                  {authMode === "google" ? "Connecting to Google..." : "Continue with Google"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
