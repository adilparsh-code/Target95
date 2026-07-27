"use client";

export default function LevelProgress({ xp, level, nextLevel, progress }) {
  return <section className="rounded-3xl border border-yellow-200 bg-white p-6 shadow-sm"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-yellow-700">Current level</p><h2 className="mt-1 text-2xl font-bold text-gray-900">{level.title}</h2><p className="mt-1 text-sm text-gray-600">Level {level.level} · {xp} XP earned</p></div><p className="rounded-2xl bg-yellow-50 px-4 py-3 text-sm font-bold text-yellow-800">{nextLevel ? `${nextLevel.xpRequired - xp} XP to ${nextLevel.title}` : "Legend status achieved"}</p></div><div className="mt-5 h-3 overflow-hidden rounded-full bg-yellow-100"><div className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-700" style={{ width: `${progress}%` }} /></div></section>;
}
