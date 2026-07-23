"use client";

import { PlayCircle } from "lucide-react";
import Button from "../ui/Button";

export default function ContinueLearning({ lastChapter, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (!lastChapter) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Continue Learning</h3>
        <p className="text-gray-500">Start your first chapter to track your progress.</p>
        <Button className="mt-4">Start Learning</Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <PlayCircle className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Continue Learning</h3>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900">{lastChapter.name}</p>
          <p className="text-sm text-gray-500">{lastChapter.subject}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Progress</p>
          <p className="font-semibold text-blue-600">{lastChapter.progress}%</p>
        </div>
      </div>
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${lastChapter.progress}%` }}
        ></div>
      </div>
      <Button className="w-full mt-4">Continue Chapter</Button>
    </div>
  );
}