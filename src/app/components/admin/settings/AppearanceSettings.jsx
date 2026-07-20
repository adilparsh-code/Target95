"use client";

import { useState } from "react";
import AdminCard from "../AdminCard";

const themes = [
  { id: "light", name: "Light", description: "Clean, bright interface", icon: "☀️", preview: "bg-white border-gray-200" },
  { id: "dark", name: "Dark", description: "Easy on the eyes", icon: "🌙", preview: "bg-gray-900 border-gray-700" },
  { id: "system", name: "System", description: "Follows system preference", icon: "💻", preview: "bg-gradient-to-r from-white to-gray-900 border-gray-300" },
];

const accentColors = [
  { name: "Blue", value: "blue", class: "bg-blue-600" },
  { name: "Indigo", value: "indigo", class: "bg-indigo-600" },
  { name: "Emerald", value: "emerald", class: "bg-emerald-600" },
  { name: "Violet", value: "violet", class: "bg-violet-600" },
  { name: "Rose", value: "rose", class: "bg-rose-600" },
  { name: "Amber", value: "amber", class: "bg-amber-600" },
];

export default function AppearanceSettings() {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedAccent, setSelectedAccent] = useState("blue");
  const [fontSize, setFontSize] = useState("medium");

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <AdminCard>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Theme</h3>
            <p className="text-xs text-gray-500 mt-0.5">Choose your preferred color scheme</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  selectedTheme === theme.id
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
                <div className={`h-8 rounded-lg border ${theme.preview}`} />
                {selectedTheme === theme.id && (
                  <span className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </AdminCard>

      {/* Accent Color */}
      <AdminCard>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Accent Color</h3>
            <p className="text-xs text-gray-500 mt-0.5">Customize the primary color used across the interface</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {accentColors.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedAccent(color.value)}
                className={`w-10 h-10 rounded-full ${color.class} ${
                  selectedAccent === color.value ? "ring-2 ring-offset-2 ring-blue-500 scale-110" : ""
                } transition-all`}
                title={color.name}
                aria-label={`Select ${color.name} accent color`}
              />
            ))}
          </div>
        </div>
      </AdminCard>

      {/* Font Size */}
      <AdminCard>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Font Size</h3>
            <p className="text-xs text-gray-500 mt-0.5">Adjust the text size for better readability</p>
          </div>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden max-w-xs">
            {[
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFontSize(opt.value)}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                  fontSize === opt.value
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </AdminCard>

      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          Save Appearance
        </button>
      </div>
    </div>
  );
}