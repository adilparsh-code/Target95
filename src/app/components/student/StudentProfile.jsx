"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import useStudentProfile from "@/app/hooks/useStudentProfile";
import Button from "../ui/Button";
import AchievementCard from "../Dashboard/AchievementCard";

const mockAchievements = [
  { id: 1, icon: "🔥", title: "First Step", description: "Complete your first question", xp: 50, earned: true },
  { id: 2, icon: "📚", title: "Knowledge Seeker", description: "Complete 10 chapters", xp: 100, earned: true },
  { id: 3, icon: "🎯", title: "Sharpshooter", description: "Maintain 90% accuracy", xp: 150, earned: true },
  { id: 4, icon: "🏆", title: "Test Champion", description: "Take 5 mock tests", xp: 200, earned: true },
  { id: 5, icon: "⚡", title: "Speed Runner", description: "Solve 100 questions", xp: 250, earned: false },
  { id: 6, icon: "🌟", title: "Legend", description: "Reach level 10", xp: 500, earned: false },
  { id: 7, icon: "💎", title: "Diamond Mind", description: "Get a perfect score", xp: 300, earned: false },
  { id: 8, icon: "🚀", title: "Rocket Learner", description: "7 day streak", xp: 175, earned: true },
];

const calculateLevel = (xp) => {
  const baseXP = 100;
  let level = 1;
  let remainingXP = xp;
  while (remainingXP >= baseXP * level) {
    remainingXP -= baseXP * level;
    level++;
  }
  return { level, currentXP: remainingXP, nextLevelXP: baseXP * level, progress: (remainingXP / (baseXP * level)) * 100 };
};

export default function StudentProfile() {
  const { user, joinDate, mockTests, completedQuestions, bookmarks } = useStudentProfile();
  const { updateStudentProfile } = useAuth();
  const [form, setForm] = useState({ fullName: user?.fullName || "", board: user?.board || "ICSE", studentClass: user?.studentClass || "Class 10" });
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Calculate stats with mock data for demonstration
  const totalXP = user?.totalXP || 1250;
  const { level, currentXP, nextLevelXP, progress } = calculateLevel(totalXP);
  const chaptersCompleted = user?.chaptersCompleted || 12;
  const totalStudyTime = user?.totalStudyTime || 47; // hours
  const accuracy = user?.accuracy || 87; // percentage
  const studyStreak = user?.studyStreak || 11;
  const questionsSolved = completedQuestions.length || 234;
  const mockTestsAttempted = mockTests.length || 7;

  const saveProfile = async (event) => {
    event.preventDefault();
    const result = await updateStudentProfile(form);
    setMessage(result.success ? "Profile updated successfully." : result.message);
    setIsEditing(false);
  };

  const initials = (user?.fullName || user?.email || "T").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  const premiumStats = [
    { 
      label: "Current Level", 
      value: level, 
      icon: "🏆", 
      gradient: "from-purple-500 to-indigo-600",
      description: `Keep learning to reach Level ${level + 1}`
    },
    { 
      label: "Total XP", 
      value: totalXP, 
      icon: "⭐", 
      gradient: "from-yellow-400 to-orange-500",
      description: `${currentXP}/${nextLevelXP} XP to next level`
    },
    { 
      label: "Study Streak", 
      value: `${studyStreak}d`, 
      icon: "🔥", 
      gradient: "from-red-500 to-pink-600",
      description: "Consistent learning pays off!"
    },
    { 
      label: "Accuracy", 
      value: `${accuracy}%`, 
      icon: "🎯", 
      gradient: "from-green-500 to-emerald-600",
      description: "Your answer accuracy rate"
    },
  ];

  const secondaryStats = [
    { label: "Chapters Completed", value: chaptersCompleted, icon: "📖" },
    { label: "Questions Solved", value: questionsSolved, icon: "✅" },
    { label: "Mock Tests Attempted", value: mockTestsAttempted, icon: "📝" },
    { label: "Total Study Time", value: `${totalStudyTime}h`, icon: "⏱️" },
  ];

  return <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
    {/* Profile Header Card */}
    <header className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-3xl font-bold text-white shadow-lg">
          {user?.avatarUrl ? <img src={user.avatarUrl} alt="Profile avatar" className="h-full w-full rounded-full object-cover" /> : initials}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">Student Profile</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{user?.fullName || "Your learning profile"}</h1>
          <p className="mt-1 break-all text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
          
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
              {user?.board || "ICSE"}
            </span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
              {user?.studentClass || "Class 10"}
            </span>
          </div>
        </div>
        <Button onClick={() => setIsEditing(true)} className="mt-2 shrink-0">Edit Profile</Button>
      </div>

      {/* Level and XP Progress */}
      <div className="mt-6 rounded-2xl bg-gray-50 p-4 dark:bg-gray-700/50">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Progress to Level {level + 1}</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{currentXP}/{nextLevelXP} XP</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{progress.toFixed(0)}% complete</p>
          </div>
        </div>
        <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-700 ease-in-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label={`${progress.toFixed(0)}% to next level`}
          />
        </div>
      </div>
    </header>

    {/* Premium Statistics Section */}
    <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Key learning statistics">
      {premiumStats.map((stat) => (
        <article 
          key={stat.label} 
          className={`relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br ${stat.gradient} p-6 shadow-lg dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2`}
          tabIndex="0"
          aria-label={`${stat.label}: ${stat.value}. ${stat.description}`}
        >
          <div className="relative z-10">
            <p className="text-4xl mb-2">{stat.icon}</p>
            <p className="text-sm font-medium text-white/90">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold text-white">{stat.value}</p>
            <p className="mt-2 text-xs text-white/80">{stat.description}</p>
          </div>
          <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-white/10"></div>
          <div className="absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-white/10"></div>
        </article>
      ))}
    </section>

    {/* Secondary Statistics */}
    <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Additional learning statistics">
      {secondaryStats.map((stat) => (
        <article key={stat.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-transform hover:scale-[1.02]">
          <p className="text-2xl">{stat.icon}</p>
          <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
          <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
        </article>
      ))}
    </section>

    <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      {/* Achievements Section */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Achievements & Badges</h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Unlock badges as you progress through your learning journey</p>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {mockAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              icon={achievement.icon}
              title={achievement.title}
              description={achievement.description}
              xp={achievement.xp}
              earned={achievement.earned}
            />
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Badge Progress</p>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-sm text-blue-700 dark:text-blue-400">{mockAchievements.filter(a => a.earned).length}/{mockAchievements.length} badges unlocked</p>
            <div className="flex-1 h-2 overflow-hidden rounded-full bg-blue-200 dark:bg-blue-800">
              <div 
                className="h-full rounded-full bg-blue-600 transition-all duration-700"
                style={{ width: `${(mockAchievements.filter(a => a.earned).length / mockAchievements.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Academic Summary Sidebar */}
      <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Academic Summary</h2>
        <dl className="mt-5 space-y-4 text-sm">
          <Info label="Board" value={user?.board || "ICSE"} />
          <Info label="Class" value={user?.studentClass || "Class 10"} />
          <Info label="Current Level" value={`Level ${level}`} />
          <Info label="Total XP" value={`${totalXP} XP`} />
          <Info label="Study Streak" value={`${studyStreak} days`} />
          <Info label="Joined" value={joinDate ? joinDate.toLocaleDateString(undefined, { month: "long", year: "numeric" }) : "Recently"} />
          <Info label="Learning Focus" value="Computer Science" />
        </dl>
      </aside>
    </div>

    {/* Edit Profile Modal/Section */}
    {isEditing && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
            <button 
              onClick={() => setIsEditing(false)}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={saveProfile} className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" value={form.fullName} onChange={(value) => setForm((current) => ({ ...current, fullName: value }))} />
              <Field label="Email" value={user?.email || ""} disabled />
              <Field label="Board" value={form.board} onChange={(value) => setForm((current) => ({ ...current, board: value }))} options={["ICSE", "ISC"]} />
              <Field label="Class" value={form.studentClass} onChange={(value) => setForm((current) => ({ ...current, studentClass: value }))} options={["Class 9", "Class 10", "Class 11", "Class 12"]} />
            </div>
            {message ? <p className="mt-4 text-sm text-blue-700 dark:text-blue-400">{message}</p> : null}
            <div className="mt-6 flex gap-3">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>;
}

function Field({ label, value, onChange, options, disabled = false }) { 
  return <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
    <span className="mb-2 block">{label}</span>
    {options ? (
      <select 
        value={value} 
        onChange={(event) => onChange(event.target.value)} 
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-normal text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        {options.map((option) => <option key={option}>{option}</option>)}
      </select> 
    ) : (
      <input 
        value={value} 
        disabled={disabled} 
        onChange={(event) => onChange?.(event.target.value)} 
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-normal text-gray-900 disabled:bg-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:disabled:bg-gray-600" 
      />
    )}
  </label>; 
}

function Info({ label, value }) { 
  return <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 dark:border-gray-700">
    <dt className="text-gray-600 dark:text-gray-400">{label}</dt>
    <dd className="text-right font-semibold text-gray-900 dark:text-white">{value}</dd>
  </div>; 
}