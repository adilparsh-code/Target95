"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "./ui/Container";
import Card from "./ui/Card";
import Button from "./ui/Button";
import XPBar from "./Dashboard/XPBar";
import SubjectCards from "./Dashboard/SubjectCards";
import ActivityTimeline from "./Dashboard/ActivityTimeline";
import Heatmap from "./Dashboard/Heatmap";
import AchievementCard from "./Dashboard/AchievementCard";
import SmartSuggestions from "./Dashboard/SmartSuggestions";
import RecommendedTopics from "./Dashboard/RecommendedTopics";
import KpiCard from "./Dashboard/KpiCard";
import TopicStrengthCard from "./Dashboard/TopicStrengthCard";
import {
  subjectCards,
  recentActivity,
  achievements,
  smartSuggestions,
  recommendedTopics,
  heatmapData,
  userStatistics,
  weakTopics,
  strongTopics,
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

      {/* Statistics KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mt-6">
        <KpiCard
          icon="📚"
          title="Chapters Completed"
          value={userStatistics.chaptersCompleted}
          subtitle={`of ${userStatistics.totalChapters}`}
          color="blue"
        />
        <KpiCard
          icon="✅"
          title="Questions Solved"
          value={userStatistics.questionsSolved}
          subtitle={`${userStatistics.totalQuestionsAttempted} total attempts`}
          color="green"
        />
        <KpiCard
          icon="🎯"
          title="Accuracy"
          value={`${userStatistics.accuracy}%`}
          subtitle="Correct answers rate"
          color="purple"
        />
        <KpiCard
          icon="⏱️"
          title="Study Time"
          value={`${userStatistics.studyTimeHours}h`}
          subtitle="Total hours"
          color="orange"
        />
        <KpiCard
          icon="🔥"
          title="Daily Streak"
          value={userStatistics.dailyStreak}
          subtitle={`Best: ${userStatistics.longestStreak} days`}
          color="red"
        />
        <KpiCard
          icon="⭐"
          title="Current Level"
          value={userStatistics.currentLevel}
          subtitle="Achiever"
          color="yellow"
        />
      </div>

      {/* Quick Navigation Bar */}
      <Card className="mt-6 p-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/study">
            <Button variant="default" className="flex items-center gap-2">
              📖 Resume Learning
            </Button>
          </Link>
          <Link href="/java">
            <Button variant="outline" className="flex items-center gap-2">
              ❓ Practice Questions
            </Button>
          </Link>
          <Link href="/mock-test">
            <Button variant="outline" className="flex items-center gap-2">
              📝 Mock Test
            </Button>
          </Link>
          <Link href="/ai-tutor">
            <Button variant="outline" className="flex items-center gap-2">
              🤖 AI Tutor
            </Button>
          </Link>
          <Link href="/bookmarks">
            <Button variant="outline" className="flex items-center gap-2">
              🔖 Bookmarks ({userStatistics.bookmarksCount})
            </Button>
          </Link>
        </div>
      </Card>

      {/* First Row: Today's Goal + Continue Learning + AI Suggestion */}
      <div className="grid gap-6 lg:grid-cols-3 mt-6">
        {/* Today's Goal */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🎯</span>
            <h2 className="font-semibold text-gray-900">Today{'\''}s Goal</h2>
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

      {/* Topic Progress Cards - Weak and Strong Topics */}
      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        <TopicStrengthCard topics={weakTopics} type="weak" />
        <TopicStrengthCard topics={strongTopics} type="strong" />
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