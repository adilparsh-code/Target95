"use client";

import { useState } from "react";
import SettingCard from "./SettingCard";
import SectionHeader from "./SectionHeader";
import ToggleItem from "./ToggleItem";
import SaveBar from "./SaveBar";

const notificationGroups = [
  {
    title: "Delivery Channels",
    icon: "📡",
    items: [
      { key: "emailNotifications", label: "Email Notifications", description: "Receive notifications via email" },
      { key: "pushNotifications", label: "Push Notifications", description: "Receive browser push notifications" },
      { key: "smsNotifications", label: "SMS Notifications", description: "Receive SMS alerts (if configured)" },
    ],
  },
  {
    title: "User Events",
    icon: "👤",
    items: [
      { key: "studentRegistration", label: "Student Registration", description: "When a new student registers" },
      { key: "teacherRegistration", label: "Teacher Registration", description: "When a new teacher registers" },
    ],
  },
  {
    title: "Scheduled Reports",
    icon: "📊",
    items: [
      { key: "examReminder", label: "Exam Reminder", description: "Reminders for upcoming exams" },
      { key: "weeklyReport", label: "Weekly Report", description: "Weekly performance summary" },
      { key: "monthlyReport", label: "Monthly Report", description: "Monthly performance report" },
    ],
  },
  {
    title: "System Alerts",
    icon: "🔔",
    items: [
      { key: "systemAlerts", label: "System Alerts", description: "Critical system notifications" },
    ],
  },
];

const initialData = {
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  studentRegistration: true,
  teacherRegistration: true,
  examReminder: true,
  weeklyReport: false,
  monthlyReport: true,
  systemAlerts: true,
};

export default function NotificationsSettings() {
  const [form, setForm] = useState({ ...initialData });
  const [saved, setSaved] = useState({ ...initialData });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const hasChanges = JSON.stringify(form) !== JSON.stringify(saved);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setSaved({ ...form });
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const handleReset = () => {
    setForm({ ...saved });
  };

  return (
    <div className="space-y-4">
      {showSuccess && (
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 animate-fadeIn">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Notification settings saved successfully.
        </div>
      )}

      {notificationGroups.map((group) => (
        <SettingCard key={group.title}>
          <SectionHeader icon={group.icon} title={group.title} />
          <div className="divide-y divide-gray-50">
            {group.items.map((item) => (
              <ToggleItem
                key={item.key}
                label={item.label}
                description={item.description}
                enabled={form[item.key]}
                onChange={(v) => handleChange(item.key, v)}
              />
            ))}
          </div>
        </SettingCard>
      ))}

      <div className="flex justify-end">
        <SaveBar onSave={handleSave} onReset={handleReset} hasChanges={hasChanges} isSaving={isSaving} />
      </div>
    </div>
  );
}