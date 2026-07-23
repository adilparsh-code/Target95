"use client";

import { BookOpen, FileQuestion, Bookmark, Bot, Trophy } from "lucide-react";
import Link from "next/link";

const quickActions = [
  {
    id: 1,
    title: "Practice Questions",
    description: "Solve practice problems",
    icon: FileQuestion,
    href: "/question-bank",
    color: "bg-blue-100 text-blue-600",
    comingSoon: false,
  },
  {
    id: 2,
    title: "Mock Tests",
    description: "Take full-length exams",
    icon: BookOpen,
    href: "/mock-test",
    color: "bg-emerald-100 text-emerald-600",
    comingSoon: false,
  },
  {
    id: 3,
    title: "Bookmarks",
    description: "View saved questions",
    icon: Bookmark,
    href: "/bookmarks",
    color: "bg-purple-100 text-purple-600",
    comingSoon: false,
  },
  {
    id: 4,
    title: "AI Tutor",
    description: "Get personalized help",
    icon: Bot,
    href: "#",
    color: "bg-amber-100 text-amber-600",
    comingSoon: true,
  },
  {
    id: 5,
    title: "Leaderboard",
    description: "See your rankings",
    icon: Trophy,
    href: "#",
    color: "bg-pink-100 text-pink-600",
    comingSoon: true,
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.id}
              href={action.href}
              className={`flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all ${
                action.comingSoon ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <div className={`p-2 rounded-lg ${action.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{action.title}</p>
                <p className="text-xs text-gray-500">
                  {action.description}
                  {action.comingSoon && " - Coming Soon"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}