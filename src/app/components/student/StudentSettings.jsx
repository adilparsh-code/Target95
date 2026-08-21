"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import useStudentSettings from "@/app/hooks/useStudentSettings";
import useDarkMode from "@/app/hooks/useDarkMode";
import Button from "../ui/Button";
import Card from "../ui/Card";
import ToggleItem from "../admin/settings/ToggleItem";
import LoadingSkeleton from "../admin/settings/LoadingSkeleton";

export default function StudentSettings() {
  const { settings, ready, updateSetting } = useStudentSettings();
  const { logout } = useAuth();
  const { setTheme } = useDarkMode();

  const handleThemeChange = (theme) => {
    updateSetting("theme", theme);
    setTheme(theme);
  };

  const fontSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xlarge: "text-xl",
  };

  if (!ready) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Card className="p-6 sm:p-8 mb-6">
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
          <div className="h-8 bg-gray-200 rounded w-2/3 mt-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2 mt-2" />
        </Card>
        <LoadingSkeleton rows={8} type="card" />
      </div>
    );
  }

  return (
    <div className={`mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 ${fontSizes[settings.fontSize] || "text-base"}`}>
      <Card className="p-6 sm:p-8 rounded-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">Settings</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Personalise your learning space</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Your preferences are stored locally and synced to your profile.</p>
      </Card>

      <div className="mt-6 grid gap-6">
        <Card className="p-6 rounded-3xl">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your name, board, class, and avatar.</p>
          <Link href="/profile" className="mt-4 inline-flex rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Open profile
          </Link>
        </Card>

        <Card className="p-6 rounded-3xl">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Appearance</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Theme
                <select
                  value={settings.theme || "system"}
                  disabled={!ready}
                  onChange={(event) => handleThemeChange(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 font-normal text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none"
                >
                  <option value="system">System default</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </label>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Font Size
                <select
                  value={settings.fontSize || "medium"}
                  disabled={!ready}
                  onChange={(event) => updateSetting("fontSize", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 font-normal text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="xlarge">Extra Large</option>
                </select>
              </label>
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-3xl">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Language</h2>
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Interface Language
              <select value={settings.language || "en"} disabled={!ready} onChange={(event) => updateSetting("language", event.target.value)} className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 font-normal text-gray-900 dark:text-white sm:max-w-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none">
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </label>
          </div>
        </Card>

        <Card className="p-6 rounded-3xl">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
          <div className="mt-4 space-y-2">
            <ToggleItem label="Learning Reminders" description="Get reminders to study daily and maintain your streak" enabled={settings.learningReminders ?? true} onChange={(value) => updateSetting("learningReminders", value)} color="blue" />
            <ToggleItem label="Mock Test Alerts" description="Receive notifications about upcoming and new mock tests" enabled={settings.mockTestAlerts ?? true} onChange={(value) => updateSetting("mockTestAlerts", value)} color="blue" />
            <ToggleItem label="Achievement Updates" description="Get notified when you unlock new achievements and badges" enabled={settings.achievementUpdates ?? true} onChange={(value) => updateSetting("achievementUpdates", value)} color="blue" />
            <ToggleItem label="Weekly Reports" description="Receive a weekly summary of your learning progress" enabled={settings.weeklyReports ?? true} onChange={(value) => updateSetting("weeklyReports", value)} color="blue" />
          </div>
        </Card>

        <Card className="p-6 rounded-3xl">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Study Goals</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Set your daily learning goals to stay on track</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Daily Study Time (hours)
                <select value={settings.dailyStudyGoal || 2} disabled={!ready} onChange={(event) => updateSetting("dailyStudyGoal", parseInt(event.target.value, 10))} className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 font-normal text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none">
                  <option value="1">1 hour</option>
                  <option value="2">2 hours</option>
                  <option value="3">3 hours</option>
                  <option value="4">4+ hours</option>
                </select>
              </label>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Daily Questions Goal
                <select value={settings.dailyQuestionsGoal || 20} disabled={!ready} onChange={(event) => updateSetting("dailyQuestionsGoal", parseInt(event.target.value, 10))} className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 font-normal text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none">
                  <option value="10">10 questions</option>
                  <option value="20">20 questions</option>
                  <option value="30">30 questions</option>
                  <option value="50">50+ questions</option>
                </select>
              </label>
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-3xl">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Privacy</h2>
          <div className="mt-4 space-y-2">
            <ToggleItem label="Private Profile" description="Keep your profile details private from other students" enabled={settings.privateProfile ?? true} onChange={(value) => updateSetting("privateProfile", value)} color="blue" />
            <ToggleItem label="Show Activity Status" description="Let teachers see when you were last active" enabled={settings.showActivityStatus ?? false} onChange={(value) => updateSetting("showActivityStatus", value)} color="blue" />
            <ToggleItem label="Share Progress Reports" description="Allow your progress reports to be shared with parents/guardians" enabled={settings.shareProgressReports ?? false} onChange={(value) => updateSetting("shareProgressReports", value)} color="blue" />
          </div>
        </Card>

        <Card className="p-6 rounded-3xl">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI preferences</h2>
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Tutor explanation style
              <select value={settings.aiDetail} disabled={!ready} onChange={(event) => updateSetting("aiDetail", event.target.value)} className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 font-normal text-gray-900 dark:text-white sm:max-w-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none">
                <option value="guided">Guided steps</option>
                <option value="concise">Concise</option>
                <option value="detailed">Detailed</option>
              </select>
            </label>
          </div>
        </Card>

        <Card className="p-6 rounded-3xl border-red-200 dark:border-red-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Account</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Sign out securely on this device.</p>
          <Button variant="outline" onClick={logout} className="mt-4 border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">Log out</Button>
        </Card>
      </div>
    </div>
  );
}
