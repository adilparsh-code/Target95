"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import PersonalizedLearning from "../components/learning/PersonalizedLearning";

export default function MyLearningPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.25),transparent_35%),radial-gradient(circle_at_90%_0%,rgba(139,92,246,0.2),transparent_30%)]" />
          <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 lg:px-8">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
              Your learning journey
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">My Learning</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Pick up where you left off, track progress, and keep moving toward your target score.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <PersonalizedLearning />
        </div>
        <Footer />
      </main>
    </ProtectedRoute>
  );
}
