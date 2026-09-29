"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function EyeIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <path d="m3 3 18 18" />
      <path d="M10.6 6.2A10.9 10.9 0 0 1 12 6c6 0 9.5 6 9.5 6a18.2 18.2 0 0 1-3.1 3.7" />
      <path d="M6.3 6.3C3.9 8 2.5 12 2.5 12s3.5 6 9.5 6a9.7 9.7 0 0 0 3-.5" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#4285F4" d="M21.35 12.2c0-.7-.06-1.4-.18-2.05H12v3.88h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.7 2.92-4.2 2.92-7.19Z" />
      <path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.51A9.74 9.74 0 0 0 12 21.5Z" />
      <path fill="#FBBC05" d="M6.53 13.61A5.86 5.86 0 0 1 6.22 12c0-.56.11-1.11.31-1.61V7.88H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.12l3.24-2.51Z" />
      <path fill="#EA4335" d="M12 6.36c1.44 0 2.73.49 3.75 1.46l2.8-2.8C16.84 3.47 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.71 5.38l3.24 2.51C7.3 8.08 9.46 6.36 12 6.36Z" />
    </svg>
  );
}

// Only allow same-origin relative paths coming from the proxy's ?next= param.
function readSafeNextParam() {
  if (typeof window === "undefined") return null;
  const next = new URLSearchParams(window.location.search).get("next");
  if (!next || !next.startsWith("/") || next.startsWith("//")) return null;
  return next;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login, loginWithGoogle, error, clearError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    clearError();
  }, [clearError]);

  const redirectAfterLogin = (signedInUser) => {
    const nextPath = readSafeNextParam();
    if (nextPath) {
      router.push(nextPath);
      return;
    }
    router.push(signedInUser?.role === "admin" ? "/admin" : "/dashboard");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const result = await login(email, password);
      if (result.success) redirectAfterLogin(result.user);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const result = await loginWithGoogle();
      if (result.success) redirectAfterLogin(result.user);
    } finally {
      setSubmitting(false);
    }
  };

  const busy = submitting;

  return (
    <main className="stitch-page min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-xl px-2 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
            aria-label="Target95+ home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-blue-100 bg-blue-50 text-xl shadow-sm transition-transform duration-200 group-hover:-rotate-3 dark:border-blue-900/60 dark:bg-blue-950/60">
              🎯
            </span>
            <span className="text-lg font-black tracking-[-0.04em] text-slate-950 dark:text-white">
              Target95<span className="text-blue-600 dark:text-blue-400">+</span>
            </span>
          </Link>

          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-white/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900/70 dark:hover:text-white"
          >
            Back to home
          </Link>
        </header>

        <section className="flex flex-1 items-center justify-center py-10 sm:py-14">
          <div className="grid w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-[0_24px_80px_rgba(0,0,0,0.32)] lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/25 blur-3xl" />
              <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

              <div className="relative">
                <span className="stitch-eyebrow">WELCOME BACK</span>
                <h1 className="mt-5 max-w-md text-4xl font-black leading-[1.08] tracking-[-0.04em] text-white">
                  Keep learning.
                  <br />
                  Keep moving toward 95+.
                </h1>
                <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
                  Continue your preparation, practice smarter, and keep your progress in one place.
                </p>
              </div>

              <div className="relative mt-12 space-y-3">
                {[
                  ["01", "Pick up where you left off", "Your learning journey stays connected."],
                  ["02", "Practice with purpose", "Questions, mock tests and challenges are ready."],
                  ["03", "Track your progress", "See your preparation become measurable."],
                ].map(([number, title, description]) => (
                  <div key={number} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-500/15 text-xs font-extrabold text-blue-300">
                      {number}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">{title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-9 lg:p-12">
              <div className="mx-auto max-w-md">
                <div>
                  <span className="stitch-eyebrow">SIGN IN</span>
                  <h2 className="stitch-heading mt-3 text-3xl sm:text-[2.15rem]">
                    Welcome back
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Sign in to continue your Target95 journey.
                  </p>
                </div>

                {error && (
                  <div
                    className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <label htmlFor="password" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                        Password
                      </label>
                      <Link
                        href="/forgot-password"
                        className="text-xs font-bold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-slate-200"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        <EyeIcon open={showPassword} />
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={busy}
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_14px_28px_rgba(37,99,235,0.25)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {busy ? "Signing in…" : "Sign in to Target95"}
                  </button>

                  <div className="relative py-1">
                    <div className="absolute inset-x-0 top-1/2 border-t border-slate-200 dark:border-slate-800" />
                    <div className="relative flex justify-center">
                      <span className="bg-white px-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:bg-slate-900">
                        or continue with
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={busy}
                    onClick={handleGoogleLogin}
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-800 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-900"
                  >
                    <GoogleIcon />
                    Continue with Google
                  </button>
                </form>

                <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    Create one
                  </Link>
                </p>

                <p className="mt-5 text-center text-[11px] leading-5 text-slate-400 dark:text-slate-500">
                  By continuing, you agree to use Target95 responsibly for your learning and preparation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
