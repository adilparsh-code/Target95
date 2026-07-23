"use client";

export default function ProgressBar({ progress, current, total, className = "" }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
        <span>Question {current} of {total}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 transition-all duration-300 ease-in-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}