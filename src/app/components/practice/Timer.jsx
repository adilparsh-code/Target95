"use client";

export default function Timer({ timeRemaining, isPaused = false, isLow = false }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-semibold
      ${isLow 
        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 animate-pulse' 
        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      }
    `}>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {timeRemaining}
    </div>
  );
}