"use client";

import DifficultyBadge from "../DifficultyBadge";
import Link from "next/link";

export default function RecommendedTopics({ topics = [] }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4">🎯 Recommended Topics</h3>
      {topics.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-slate-50 p-6 text-center text-sm text-gray-700">
          Complete more practice to get recommendations.
        </div>
      ) : (
        <div className="space-y-3">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="flex items-center justify-between rounded-2xl border border-gray-200 bg-slate-50 p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {topic.title}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-gray-700">{topic.subject}</span>
                  <DifficultyBadge difficulty={topic.difficulty} size="sm" />
                </div>
                <p className="mt-1 text-xs text-gray-500">{topic.reason}</p>
              </div>
              <Link
                href={`/java`}
                className="ml-3 shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 hover:border-gray-400 transition"
              >
                Practice
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}