"use client";

import { useState } from "react";
import SettingCard from "./SettingCard";
import SectionHeader from "./SectionHeader";
import ColorPicker from "./ColorPicker";
import SaveBar from "./SaveBar";

const themes = [
  { id: "light", name: "Light", description: "Clean, bright interface", icon: "☀️" },
  { id: "dark", name: "Dark", description: "Easy on the eyes", icon: "🌙" },
  { id: "system", name: "System", description: "Follows system preference", icon: "💻" },
];

const sidebarStyles = [
  { id: "compact", name: "Compact", description: "Minimal sidebar" },
  { id: "expanded", name: "Expanded", description: "Full width sidebar" },
];

const borderRadiusOptions = [
  { id: "sm", name: "Small", value: "8px" },
  { id: "md", name: "Medium", value: "12px" },
  { id: "lg", name: "Large", value: "16px" },
];

const animationSpeeds = [
  { id: "slow", name: "Slow", description: "0.3s transitions" },
  { id: "normal", name: "Normal", description: "0.2s transitions" },
  { id: "fast", name: "Fast", description: "0.1s transitions" },
];

const fontSizes = [
  { id: "small", name: "Small" },
  { id: "medium", name: "Medium" },
  { id: "large", name: "Large" },
];

const initialData = {
  theme: "light",
  accentColor: "blue",
  sidebarStyle: "expanded",
  borderRadius: "md",
  animationSpeed: "normal",
  fontSize: "medium",
};

export default function AppearanceSettings() {
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

  const accentColorMap = {
    blue: "bg-blue-600 border-blue-600",
    indigo: "bg-indigo-600 border-indigo-600",
    emerald: "bg-emerald-600 border-emerald-600",
    violet: "bg-violet-600 border-violet-600",
    rose: "bg-rose-600 border-rose-600",
    amber: "bg-amber-600 border-amber-600",
    cyan: "bg-cyan-600 border-cyan-600",
    orange: "bg-orange-600 border-orange-600",
  };

  const accentBg = accentColorMap[form.accentColor] || "bg-blue-600 border-blue-600";

  return (
    <div className="space-y-4">
      {showSuccess && (
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 animate-fade-in">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Appearance settings saved successfully.
        </div>
      )}

      {/* Live Preview */}
      <SettingCard>
        <SectionHeader icon="👁️" title="Live Preview" description="See how your changes look" />
        <div
          className={`rounded-xl border-2 overflow-hidden transition-all duration-200 ${
            form.theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          {/* Preview Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: form.theme === "dark" ? "#374151" : "#e5e7eb" }}>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${form.theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`} />
              <span className={`text-xs font-medium ${form.theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Preview</span>
            </div>
            <div className="flex gap-1">
              <div className={`w-2 h-2 rounded-full ${form.theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`} />
              <div className={`w-2 h-2 rounded-full ${form.theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`} />
              <div className={`w-2 h-2 rounded-full ${form.theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`} />
            </div>
          </div>
          {/* Preview Body */}
          <div className="p-4 space-y-3">
            <div className={`h-4 rounded ${accentBg} w-1/3`} />
            <div className={`h-3 rounded ${form.theme === "dark" ? "bg-gray-700" : "bg-gray-100"} w-2/3`} />
            <div className={`h-3 rounded ${form.theme === "dark" ? "bg-gray-700" : "bg-gray-100"} w-1/2`} />
            <div className="flex gap-2 mt-3">
              <div className={`h-6 w-16 rounded ${accentBg} opacity-80`} />
              <div className={`h-6 w-16 rounded ${form.theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`} />
            </div>
          </div>
        </div>
      </SettingCard>

      {/* Theme Selection */}
      <SettingCard>
        <SectionHeader icon="🎨" title="Theme" description="Choose your preferred color scheme" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleChange("theme", theme.id)}
              className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                form.theme === theme.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{theme.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{theme.name}</p>
                  <p className="text-xs text-gray-500">{theme.description}</p>
                </div>
              </div>
              {form.theme === theme.id && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </SettingCard>

      {/* Accent Color */}
      <SettingCard>
        <ColorPicker
          label="Accent Color"
          selected={form.accentColor}
          onChange={(v) => handleChange("accentColor", v)}
        />
      </SettingCard>

      {/* Sidebar Style */}
      <SettingCard>
        <div className="space-y-4">
          <SectionHeader icon="📋" title="Sidebar Style" description="Choose how the sidebar appears" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sidebarStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => handleChange("sidebarStyle", style.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  form.sidebarStyle === style.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <p className="text-sm font-semibold text-gray-900">{style.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{style.description}</p>
              </button>
            ))}
          </div>
        </div>
      </SettingCard>

      {/* Border Radius + Animation Speed + Font Size in grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SettingCard>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">Card Radius</p>
              <p className="text-xs text-gray-500 mt-0.5">UI element roundness</p>
            </div>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {borderRadiusOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleChange("borderRadius", opt.id)}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                    form.borderRadius === opt.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {opt.name}
                </button>
              ))}
            </div>
          </div>
        </SettingCard>

        <SettingCard>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">Animation Speed</p>
              <p className="text-xs text-gray-500 mt-0.5">UI motion speed</p>
            </div>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {animationSpeeds.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleChange("animationSpeed", opt.id)}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                    form.animationSpeed === opt.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {opt.name}
                </button>
              ))}
            </div>
          </div>
        </SettingCard>

        <SettingCard>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">Font Size</p>
              <p className="text-xs text-gray-500 mt-0.5">Text size across UI</p>
            </div>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {fontSizes.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleChange("fontSize", opt.id)}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                    form.fontSize === opt.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {opt.name}
                </button>
              ))}
            </div>
          </div>
        </SettingCard>
      </div>

      <div className="flex justify-end">
        <SaveBar onSave={handleSave} onReset={handleReset} hasChanges={hasChanges} isSaving={isSaving} />
      </div>
    </div>
  );
}