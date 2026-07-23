"use client";

import ProgressRing from "../ui/ProgressRing";

export default function ProgressOverview({ stats }) {
  if (!stats) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-24 bg-gray-200 rounded-full mx-auto w-24"></div>
          <div className="h-24 bg-gray-200 rounded-full mx-auto w-24"></div>
          <div className="h-24 bg-gray-200 rounded-full mx-auto w-24"></div>
        </div>
      </div>
    );
  }

  const { chapterCompletion, dailyGoal, weeklyGoal } = stats;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Progress Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <ProgressRing
            progress={chapterCompletion}
            size={120}
            strokeWidth={8}
            color="stroke-blue-600"
            label={`${chapterCompletion}%`}
          />
          <p className="mt-3 font-medium text-gray-900">Chapter Completion</p>
          <p className="text-sm text-gray-500">{chapterCompletion}% complete</p>
        </div>
        <div className="text-center">
          <ProgressRing
            progress={dailyGoal.progress}
            size={120}
            strokeWidth={8}
            color="stroke-emerald-600"
            label={`${dailyGoal.progress}%`}
          />
          <p className="mt-3 font-medium text-gray-900">Daily Goal</p>
          <p className="text-sm text-gray-500">
            {dailyGoal.current}/{dailyGoal.target} questions
          </p>
        </div>
        <div className="text-center">
          <ProgressRing
            progress={weeklyGoal.progress}
            size={120}
            strokeWidth={8}
            color="stroke-purple-600"
            label={`${weeklyGoal.progress}%`}
          />
          <p className="mt-3 font-medium text-gray-900">Weekly Goal</p>
          <p className="text-sm text-gray-500">
            {weeklyGoal.current}/{weeklyGoal.target} days
          </p>
        </div>
      </div>
    </div>
  );
}