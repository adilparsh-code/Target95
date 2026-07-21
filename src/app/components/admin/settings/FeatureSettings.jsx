"use client";

import { useState } from "react";
import SettingCard from "./SettingCard";
import SectionHeader from "./SectionHeader";
import ToggleItem from "./ToggleItem";
import SaveBar from "./SaveBar";

const featuresList = [
  { key: "aiQuestionGenerator", label: "AI Question Generator", description: "Generate questions automatically using AI", icon: "🤖" },
  { key: "mockTests", label: "Mock Tests", description: "Allow students to take mock tests", icon: "📝" },
  { key: "studyNotes", label: "Study Notes", description: "Provide chapter-wise study notes", icon: "📄" },
  { key: "leaderboards", label: "Leaderboards", description: "Show student rankings and performance", icon: "🏆" },
  { key: "achievements", label: "Achievements", description: "Reward students with achievement badges", icon: "🎖️" },
  { key: "revisionMode", label: "Revision Mode", description: "Quick revision mode for exam preparation", icon: "🔄" },
  { key: "codingPractice", label: "Coding Practice", description: "Built-in code editor for practice", icon: "💻" },
  { key: "bookmarks", label: "Bookmarks", description: "Allow students to bookmark questions", icon: "🔖" },
  { key: "certificates", label: "Certificates", description: "Generate completion certificates", icon: "📜" },
  { key: "analytics", label: "Analytics", description: "Detailed performance analytics dashboard", icon: "📊" },
];

const initialData = {
  aiQuestionGenerator: true,
  mockTests: true,
  studyNotes: true,
  leaderboards: false,
  achievements: true,
  revisionMode: false,
  codingPractice: true,
  bookmarks: true,
  certificates: false,
  analytics: true,
};

export default function FeatureSettings() {
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

  const enabledCount = Object.values(form).filter(Boolean).length;
  const totalCount = featuresList.length;

  return (
    <div className="space-y-4">
      {showSuccess && (
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 animate-fade-in">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Feature settings saved successfully.
        </div>
      )}

      {/* Summary */}
      <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
        <span className="text-lg">⚡</span>
        <div>
          <p className="text-sm font-medium text-blue-800">
            {enabledCount} of {totalCount} features enabled
          </p>
          <div className="w-48 h-1.5 bg-blue-200 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${(enabledCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <SettingCard>
        <SectionHeader icon="🚀" title="Platform Features" description="Enable or disable platform features" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {featuresList.map((feature) => (
            <div
              key={feature.key}
              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors -mx-3"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                {feature.icon}
              </div>
              <div className="flex-1 min-w-0">
                <ToggleItem
                  label={feature.label}
                  description={feature.description}
                  enabled={form[feature.key]}
                  onChange={(v) => handleChange(feature.key, v)}
                  id={`feature-${feature.key}`}
                />
              </div>
            </div>
          ))}
        </div>
      </SettingCard>

      <div className="flex justify-end">
        <SaveBar onSave={handleSave} onReset={handleReset} hasChanges={hasChanges} isSaving={isSaving} />
      </div>
    </div>
  );
}