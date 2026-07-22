"use client";

import { useState } from "react";
import Container from "./ui/Container";
import Card from "./ui/Card";
import XPBar from "./Dashboard/XPBar";
import SubjectCards from "./Dashboard/SubjectCards";
import ActivityTimeline from "./Dashboard/ActivityTimeline";
import Heatmap from "./Dashboard/Heatmap";
import AchievementCard from "./Dashboard/AchievementCard";
import SmartSuggestions from "./Dashboard/SmartSuggestions";
import RecommendedTopics from "./Dashboard/RecommendedTopics";
import {
  subjectCards,
  recentActivity,
  achievements,
  smartSuggestions,
  recommendedTopics,
  heatmapData,
} from "../data/dashboardData";

export default function StudentDashboard() {
  const [dailyGoal, setDailyGoal] = useState(10);
  const [questionsDoneToday, setQuestionsDoneToday] = useState(4);
  const todayProgress = Math.min(100, Math.round((questionsDoneToday / dailyGoal) * 100));

  return (
    <Container className="py-8">
      {/* Welcome Header + XP */}
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, Student! 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Keep learning to reach your goals today.
            </p>
          </div>
          <XPBar />
        </div>
      </Card>

      {/* First Row: Today's Goal + Continue Learning + AI Suggestion */}
      <div className="grid gap-6 lg:grid-cols-3 mt-6">
        {/* Today's Goal */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🎯</span>
            <h2 className="font-semibold text-gray-900">Today's Goal</h2>
          </div>
          <div className="mb-3">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{questionsDoneToday} / {dailyGoal} questions</span>
              <span>{todayProgress}%</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${todayProgress}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setQuestionsDoneToday((v) => Math.min(dailyGoal, v + 1))}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Log a Question ✅
          </button>
        </Card>

        {/* Continue Learning */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">📖</span>
            <h2 className="font-semibold text-gray-900">Continue Learning</h2>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Pick up where you left off in <strong>Control Flow</strong>.
          </p>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: "45%" }} />
          </div>
          <button className="w-full px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
            Continue Chapter →
          </button>
        </Card>

        {/* AI Recommendation Card */}
        <Card className="p-5 bg-purple-50 border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🤖</span>
            <h2 className="font-semibold text-gray-900">AI Suggestion</h2>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            You struggled with <strong>Method Overloading</strong> last week. Try 5 practice questions now.
          </p>
          <button className="w-full px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors">
            Practice Now →
          </button>
        </Card>
      </div>

      {/* Second Row: Subjects + Activity + Smart Suggestions */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mt-6">
        {/* Subject Progress */}
        <Card className="p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Subject Progress</h2>
          <SubjectCards subjects={subjectCards} />
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Weekly Activity */}
          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 mb-3">Recent Activity</h2>
            <ActivityTimeline activities={recentActivity.slice(0, 4)} />
          </Card>

          {/* Smart Suggestions */}
          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 mb-3">Quick Actions</h2>
            <SmartSuggestions suggestions={smartSuggestions} />
          </Card>
        </div>
      </div>

      {/* Recommended Topics */}
      <div className="mt-6">
        <Card className="p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Recommended Topics</h2>
          <RecommendedTopics topics={recommendedTopics} />
        </Card>
      </div>

      {/* Activity Heatmap */}
      <div className="mt-6">
        <Card className="p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Learning Activity</h2>
          <Heatmap data={heatmapData} />
        </Card>
      </div>

      {/* Achievements */}
      <div className="mt-6">
        <Card className="p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {achievements.slice(0, 5).map((achievement) => (
              <AchievementCard key={achievement.id} {...achievement} />
            ))}
          </div>
        </Card>
      </div>
    </Container>
  );
}