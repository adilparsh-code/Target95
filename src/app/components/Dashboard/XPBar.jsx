"use client";

import useXP from "../../hooks/useXP";

export default function XPBar() {
  const { xp, coins, level, nextLevel, levelProgress } = useXP();

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-3 text-center min-w-[100px]">
        <p className="text-xs font-semibold text-yellow-700">⭐ Level {level.level}</p>
        <p className="text-lg font-bold text-yellow-700">{level.title}</p>
      </div>
      <div className="flex-1 min-w-[150px]">
        <div className="flex items-center justify-between text-xs text-gray-700 mb-1">
          <span>{xp} XP</span>
          {nextLevel && <span>{nextLevel.xpRequired} XP</span>}
        </div>
        <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
        {nextLevel && (
          <p className="mt-0.5 text-xs text-gray-500">
            {nextLevel.xpRequired - xp} XP to {nextLevel.title}
          </p>
        )}
      </div>
      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-2.5 text-center min-w-[80px]">
        <p className="text-lg">🪙</p>
        <p className="text-sm font-bold text-yellow-700">{coins}</p>
      </div>
    </div>
  );
}