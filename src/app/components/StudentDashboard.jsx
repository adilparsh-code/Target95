"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Flame, 
  Star, 
  TrendingUp, 
  CheckCircle, 
  Target, 
  Clock, 
  Trophy, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  Bot, 
  Bookmark, 
  PlayCircle, 
  Gift, 
  Calendar, 
  Award,
  ArrowRight
} from "lucide-react";
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

const dailyMotivations = [
  "Every expert was once a beginner. Keep going! 🚀",
  "Small progress is still progress. You're doing amazing! 💪",
  "Your future self will thank you for today's effort. 🎯",
  "Consistency is the key to mastery. Stay focused! ⭐",
  "You're building something incredible—one question at a time. 🏆"
];

const continueLearningData = [
  { id: "control-flow", title: "Control Flow", progress: 45, icon: "🔄", color: "from-purple-500 to-indigo-600", href: "/study/control-flow" },
  { id: "methods", title: "Java Methods", progress: 55, icon: "⚙️", color: "from-orange-500 to-red-600", href: "/study/methods" },
  { id: "arrays", title: "Arrays Deep Dive", progress: 40, icon: "📊", color: "from-teal-500 to-emerald-600", href: "/study/arrays" },
  { id: "strings", title: "String Manipulation", progress: 50, icon: "📝", color: "from-indigo-500 to-blue-600", href: "/study/strings" },
];

const upcomingMockTests = [
  { id: 1, title: "Java Basics Mock Test", date: "Tomorrow, 10:00 AM", duration: "60 min", questions: 30 },
  { id: 2, title: "Control Flow Assessment", date: "Aug 5, 2:00 PM", duration: "45 min", questions: 25 },
  { id: 3, title: "Full Syllabus Mock", date: "Aug 8, 9:00 AM", duration: "120 min", questions: 60 },
];

export default function StudentDashboard() {
  const [dailyGoal, setDailyGoal] = useState(10);
  const [questionsDoneToday, setQuestionsDoneToday] = useState(4);
  const [motivation, setMotivation] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const todayProgress = Math.min(100, Math.round((questionsDoneToday / dailyGoal) * 100));

  useEffect(() => {
    setIsLoaded(true);
    const randomMotivation = dailyMotivations[Math.floor(Math.random() * dailyMotivations.length)];
    setMotivation(randomMotivation);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Container className="py-6 md:py-8 px-4 md:px-6">
      {/* Welcome Hero Section */}
      <Card className="p-6 md:p-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white border-0 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.5))]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {getGreeting()}, Student! 👋
              </h1>
              <p className="text-blue-100 text-lg md:text-xl max-w-2xl">
                {motivation}
              </p>
              
              {/* Key Metrics Row */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-6">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Flame className="w-6 h-6 text-orange-300" />
                  <div>
                    <p className="text-xs text-blue-100">Current Streak</p>
                    <p className="font-bold text-lg">{userStatistics.dailyStreak} days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Star className="w-6 h-6 text-yellow-300" />
                  <div>
                    <p className="text-xs text-blue-100">Total XP</p>
                    <p className="font-bold text-lg">{userStatistics.totalXP.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <TrendingUp className="w-6 h-6 text-green-300" />
                  <div>
                    <p className="text-xs text-blue-100">Overall Progress</p>
                    <p className="font-bold text-lg">{Math.round((userStatistics.chaptersCompleted / userStatistics.totalChapters) * 100)}%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-80">
              <XPBar />
            </div>
          </div>
        </div>
      </Card>

      {/* Statistics Cards Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Card className="p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" hover={true}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Questions Solved</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{userStatistics.questionsSolved}</p>
              <p className="text-xs text-emerald-600 mt-2 font-medium">↑ 12 this week</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>
        
        <Card className="p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" hover={true}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Accuracy</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{userStatistics.accuracy}%</p>
              <p className="text-xs text-emerald-600 mt-2 font-medium">↑ 3% from last month</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center">
              <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </Card>
        
        <Card className="p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" hover={true}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Study Time</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{userStatistics.studyTimeHours}h</p>
              <p className="text-xs text-emerald-600 mt-2 font-medium">↑ 5h this week</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </Card>
        
        <Card className="p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" hover={true}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Current Rank</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">#42</p>
              <p className="text-xs text-emerald-600 mt-2 font-medium">↑ 15 positions</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions Bar */}
      <Card className="mt-6 p-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/study">
            <Button variant="default" className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
              <BookOpen className="w-4 h-4" /> Resume Learning
            </Button>
          </Link>
          <Link href="/Java">
            <Button variant="outline" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" /> Practice Questions
            </Button>
          </Link>
          <Link href="/mock-test">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" /> Mock Test
            </Button>
          </Link>
          <Link href="/ai-tutor">
            <Button variant="outline" className="flex items-center gap-2">
              <Bot className="w-4 h-4" /> AI Tutor
            </Button>
          </Link>
          <Link href="/bookmarks">
            <Button variant="outline" className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" /> Bookmarks ({userStatistics.bookmarksCount})
            </Button>
          </Link>
        </div>
      </Card>

      {/* Continue Learning Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Continue Learning</h2>
          <Link href="/study" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">View all →</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {continueLearningData.map((course) => (
            <Link 
              key={course.id} 
              href={course.href}
              className="min-w-[280px] md:min-w-[320px] snap-start group"
            >
              <Card className="p-6 h-full bg-gradient-to-br group-hover:shadow-xl transition-all duration-500 transform group-hover:-translate-y-2 overflow-hidden relative" hover={true}>
                <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-5`}></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{course.icon}</span>
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{course.progress}%</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{course.title}</h3>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                    <div 
                      className={`h-2.5 rounded-full bg-gradient-to-r ${course.color} transition-all duration-1000`}
                      style={{ width: isLoaded ? `${course.progress}%` : '0%' }}
                    ></div>
                  </div>
                  <span className="inline-flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:gap-2 transition-all">
                    Continue <span className="ml-1">→</span>
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Daily Challenge Section */}
      <div className="mt-8">
        <Card className="p-6 md:p-8 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 border-0 overflow-hidden relative text-white">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-4xl md:text-5xl animate-bounce">
                🎁
              </div>
              <div>
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold mb-2">DAILY CHALLENGE</span>
                <h3 className="text-2xl md:text-3xl font-bold">Solve 5 Questions & Earn 50 XP</h3>
                <p className="text-white/80 mt-2">Complete today's challenge to maintain your streak and unlock bonus rewards!</p>
              </div>
            </div>
            <Link href="/practice">
              <Button className="bg-white text-orange-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all px-8 py-3 text-lg font-bold">
                Start Challenge →
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Two Column Layout: Upcoming Mock Tests + Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2 mt-8">
        {/* Upcoming Mock Tests - Timeline Style */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Mock Tests</h2>
            <Link href="/mock-test" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">View all</Link>
          </div>
          <div className="space-y-4">
            {upcomingMockTests.map((test, index) => (
              <div key={test.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900"></div>
                  {index < upcomingMockTests.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-gray-900 dark:text-white">{test.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">📅 {test.date}</span>
                      <span className="flex items-center gap-1">⏱️ {test.duration}</span>
                      <span className="flex items-center gap-1">❓ {test.questions} questions</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity - Timeline */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
            <Link href="/analytics" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">View all</Link>
          </div>
          <ActivityTimeline activities={recentActivity.slice(0, 5)} />
        </Card>
      </div>

      {/* Achievements Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Achievements</h2>
          <Link href="/rewards" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {achievements.slice(0, 5).map((achievement, index) => (
            <div 
              key={achievement.id}
              className="transform transition-all duration-500 hover:scale-105"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className="p-4 text-center h-full hover:shadow-xl" hover={true}>
                <span className="text-4xl block mb-2">{achievement.icon}</span>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{achievement.title}</h3>
                <p className="text-xs text-amber-600 font-semibold mt-1">+{achievement.xp} XP</p>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Heatmap - GitHub Style */}
      <div className="mt-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Activity</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Your study activity over the past year</p>
            </div>
          </div>
          <Heatmap data={heatmapData} />
        </Card>
      </div>

      {/* Original preserved sections - maintained for functionality */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mt-8">
        <Card className="p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Subject Progress</h2>
          <SubjectCards subjects={subjectCards} />
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h2>
            <SmartSuggestions suggestions={smartSuggestions} />
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        <TopicStrengthCard topics={weakTopics} type="weak" />
        <TopicStrengthCard topics={strongTopics} type="strong" />
      </div>

      <div className="mt-6">
        <Card className="p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Recommended Topics</h2>
          <RecommendedTopics topics={recommendedTopics} />
        </Card>
      </div>
    </Container>
  );
}