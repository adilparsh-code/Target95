"use client";

export default function AchievementCard({ icon, title, description, xp, earned = false }) {
  return (
    <div
      className={`rounded-2xl border p-4 text-center transition ${
        earned
          ? "border-blue-200 bg-blue-50"
          : "border-gray-200 bg-gray-50 opacity-50"
      }`}
    >
      <p className="text-3xl">{icon}</p>
      <p className={`mt-2 text-sm font-bold ${earned ? "text-gray-900" : "text-gray-500"}`}>
        {title}
      </p>
      <p className={`mt-1 text-xs ${earned ? "text-gray-700" : "text-gray-400"}`}>
        {description}
      </p>
      {xp && (
        <p className={`mt-1 text-xs font-semibold ${earned ? "text-blue-600" : "text-gray-400"}`}>
          +{xp} XP
        </p>
      )}
    </div>
  );
}