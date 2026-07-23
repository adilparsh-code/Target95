"use client";

export default function WelcomeCard({ user, stats }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Good to see you, {user?.name?.split(" ")[0] || "Student"}!
          </h2>
          <p className="text-gray-500 mt-1">
            You've made great progress this week. Keep it up!
          </p>
        </div>
        <div className="text-4xl">🚀</div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-medium">Daily Goal</p>
          <p className="text-2xl font-bold text-blue-700">
            {stats.questionsSolvedToday}/10
          </p>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4">
          <p className="text-sm text-emerald-600 font-medium">Current Streak</p>
          <p className="text-2xl font-bold text-emerald-700">{stats.currentStreak} days</p>
        </div>
      </div>
    </div>
  );
}