"use client";

import Link from "next/link";

export default function SmartSuggestions({ suggestions = [] }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Smart Suggestions</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="rounded-2xl border border-gray-200 bg-slate-50 p-4 hover:border-blue-200 hover:bg-blue-50 transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{suggestion.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">{suggestion.title}</p>
                <p className="mt-0.5 text-xs text-gray-700">{suggestion.description}</p>
              </div>
            </div>
            <Link
              href="/java"
              className="mt-3 inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              {suggestion.action} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}