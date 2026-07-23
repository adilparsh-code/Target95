"use client";

import { CheckCircle, XCircle, Clock } from "lucide-react";

const recentActivity = [
  {
    id: 1,
    question: "What is the output of the following Java code?",
    subject: "Java Programming",
    timestamp: "2 hours ago",
    correct: true,
  },
  {
    id: 2,
    question: "Which data structure uses LIFO principle?",
    subject: "Data Structures",
    timestamp: "3 hours ago",
    correct: true,
  },
  {
    id: 3,
    question: "Solve this boolean algebra expression",
    subject: "Boolean Algebra",
    timestamp: "5 hours ago",
    correct: false,
  },
  {
    id: 4,
    question: "What is the time complexity of bubble sort?",
    subject: "Algorithms",
    timestamp: "Yesterday",
    correct: true,
  },
];

export default function RecentActivity() {
  if (recentActivity.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="text-center py-8 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No recent activity. Start solving questions!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {recentActivity.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
          >
            {activity.correct ? (
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {activity.question}
              </p>
              <p className="text-xs text-gray-500">{activity.subject}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}