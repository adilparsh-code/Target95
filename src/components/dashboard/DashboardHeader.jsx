"use client";

export default function DashboardHeader({ user, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
      <h1 className="text-3xl font-bold">
        Welcome back, {user?.name || "Student"}! 👋
      </h1>
      <p className="text-blue-100 mt-2">
        Continue your learning journey and master computer science.
      </p>
    </div>
  );
}