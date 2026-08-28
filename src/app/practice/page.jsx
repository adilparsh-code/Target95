"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { usePerformance } from "../hooks/usePerformance";

export default function PracticePage() {
  const router = useRouter();
  const { stats, loading } = usePerformance();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.28),transparent_35%),radial-gradient(circle_at_85%_0%,rgba(139,92,246,0.22),transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
            Personalised practice
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Smart Practice</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Turn weak areas into strengths with focused sessions, clear progress signals, and board-style practice.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <Card className="group border-0 bg-white p-6 shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600 ring-1 ring-blue-100">
                <span className="text-2xl">✦</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">Start New Practice</h2>
                <p className="mt-2 mb-5 text-sm leading-6 text-slate-500">
                  Choose your subject, chapter, difficulty and question mix.
                </p>
                <Button onClick={() => router.push("/practice/setup")} variant="primary">
                  Create Session
                </Button>
              </div>
            </div>
          </Card>

          <Card className="group border-0 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-lg ring-1 ring-indigo-100 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600">
                <span className="text-2xl">✧</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">AI Recommended</h2>
                <p className="mt-2 mb-5 text-sm leading-6 text-slate-500">
                  Build a session around the topics where your performance needs work.
                </p>
                <Button onClick={() => router.push("/practice/setup?ai=true")} variant="secondary">
                  AI Setup
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <section className="mb-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Your progress</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight">Practice statistics</h2>
            </div>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[1,2,3,4].map(i => <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-200" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                ["Total Sessions", stats?.totalSessions || 0],
                ["Questions Solved", stats?.totalQuestions || 0],
                ["Accuracy", `${stats?.accuracy || 0}%`],
                ["Current Streak", `${stats?.streak || 0} days`],
              ].map(([label, value]) => (
                <Card key={label} className="border-0 bg-white p-5 shadow-md ring-1 ring-slate-200">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
                  <p className="mt-2 text-3xl font-black text-slate-900">{value}</p>
                </Card>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">History</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight">Recent Sessions</h2>
          </div>
          <Card className="overflow-hidden border-0 bg-white shadow-md ring-1 ring-slate-200">
            <div className="divide-y divide-slate-100">
              {stats?.recentSessions?.length > 0 ? (
                stats.recentSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between gap-4 p-5 transition hover:bg-slate-50">
                    <div>
                      <p className="font-bold text-slate-900">{session.subject} • {session.chapter}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {session.questionCount} questions • Accuracy: {session.results?.accuracy || 0}%
                      </p>
                    </div>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-xl">?</div>
                  <p className="font-semibold text-slate-700">No practice sessions yet.</p>
                  <p className="mt-1 text-sm text-slate-500">Start your first session and your progress will appear here.</p>
                  <Button onClick={() => router.push("/practice/setup")} variant="primary" className="mt-5">
                    Start First Practice
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </section>
      </div>
      <Footer />
    </main>
  );
}
