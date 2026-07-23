"use client";

import { BookOpen, Target, Clock, Flame, Award } from "lucide-react";

const stats = [
  {
    label: "Questions Solved",
    value: "1,234",
    change: "+12 this week",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Accuracy",
    value: "87%",
    change: "+2% from last month",
    icon: Target,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "Study Time",
    value: "48h",
    change: "12h this week",
    icon: Clock,
    color: "bg-purple-100 text-purple-600",
  },
  {
    label: "Current Streak",
    value: "15",
    change: "days",
    icon: Flame,
    color: "bg-orange-100 text-orange-600",
  },
  {
    label: "Longest Streak",
    value: "28",
    change: "days",
    icon: Award,
    color: "bg-amber-100 text-amber-600",
  },
];

export default function StatsCards() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Statistics</h3>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="text-center p-4 bg-gray-50 rounded-lg"
            >
              <div className={`inline-flex p-2 rounded-lg ${stat.color} mb-2`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              <p className="text-xs text-gray-400">{stat.change}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}