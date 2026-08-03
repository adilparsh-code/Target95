"use client";

export default function AchievementCard({ icon, title, description, xp, earned = false }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 text-center transition-all duration-300 transform hover:scale-[1.03] hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ${
        earned
          ? "border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 dark:border-blue-700"
          : "border-gray-200 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 opacity-70"
      }`}
      tabIndex="0"
      aria-label={`${title}: ${description}. ${earned ? `Earned, worth ${xp} XP` : "Locked"}`}
    >
      {/* Decorative elements for earned achievements */}
      {earned && (
        <>
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-200/30 dark:bg-blue-500/20"></div>
          <div className="absolute right-2 top-2">
            <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </>
      )}
      
      {/* Lock icon for locked achievements */}
      {!earned && (
        <div className="absolute right-2 top-2">
          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H8V7a2 2 0 014 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      
      <p className="relative z-10 text-4xl mb-2">{icon}</p>
      <p className={`relative z-10 mt-2 text-sm font-bold ${earned ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
        {title}
      </p>
      <p className={`relative z-10 mt-1 text-xs leading-relaxed ${earned ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}`}>
        {description}
      </p>
      {xp && (
        <p className={`relative z-10 mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${earned ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"}`}>
          +{xp} XP
        </p>
      )}
    </div>
  );
}