"use client";

import { useRouter } from "next/navigation";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { usePerformance } from "../hooks/usePerformance";

export default function PracticePage() {
  const router = useRouter();
  const { stats, loading } = usePerformance();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Smart Practice
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Improve your skills with personalized practice sessions
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Start New Practice
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Create a customized practice session with your preferred settings
              </p>
              <Button 
                onClick={() => router.push("/practice/setup")} 
                variant="primary"
              >
                Create Session
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                AI Recommended
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Let AI create a personalized practice session based on your weaknesses
              </p>
              <Button 
                onClick={() => router.push("/practice/setup?ai=true")} 
                variant="secondary"
              >
                AI Setup
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Statistics Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Your Statistics
        </h2>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-24 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.totalSessions || 0}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Questions Solved</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.totalQuestions || 0}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.accuracy || 0}%
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.streak || 0} days
              </p>
            </Card>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Sessions
        </h2>
        <Card className="overflow-hidden">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {stats?.recentSessions?.length > 0 ? (
              stats.recentSessions.map((session, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {session.subject} • {session.chapter}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {session.questionCount} questions • Accuracy: {session.results?.accuracy || 0}%
                    </p>
                  </div>
                  <Button size="sm" variant="ghost">View</Button>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No practice sessions yet. Start your first session to track your progress!</p>
                <Button 
                  onClick={() => router.push("/practice/setup")} 
                  variant="primary"
                  className="mt-4"
                >
                  Start First Practice
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}