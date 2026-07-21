"use client";

import { useState } from "react";
import SettingCard from "./SettingCard";
import SectionHeader from "./SectionHeader";
import SaveBar from "./SaveBar";

const initialData = {
  board: "ICSE",
  class: "10",
  academicSession: "2026-2027",
  passingMarks: 40,
  examPattern: "Board Pattern",
  defaultDifficulty: "Medium",
  questionLanguage: "English",
  subjectsEnabled: ["Computer Science", "Mathematics", "Physics", "Chemistry"],
};

const boards = ["ICSE", "ISC", "CBSE", "State Board"];
const classes = ["9", "10", "11", "12"];
const sessions = ["2025-2026", "2026-2027", "2027-2028"];
const examPatterns = ["Board Pattern", "Chapter-wise", "Topic-wise", "Mixed"];
const difficulties = ["Easy", "Medium", "Hard", "Adaptive"];
const languages = ["English", "Hindi", "English & Hindi"];
const allSubjects = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
];

export default function AcademicSettings() {
  const [form, setForm] = useState({ ...initialData });
  const [saved, setSaved] = useState({ ...initialData });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const hasChanges = JSON.stringify(form) !== JSON.stringify(saved);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSubject = (subject) => {
    setForm((prev) => ({
      ...prev,
      subjectsEnabled: prev.subjectsEnabled.includes(subject)
        ? prev.subjectsEnabled.filter((s) => s !== subject)
        : [...prev.subjectsEnabled, subject],
    }));
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
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 animate-fade-in">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Academic settings saved successfully.
        </div>
      )}

      <SettingCard>
        <SectionHeader icon="📚" title="Academic Settings" description="Configure academic year and curriculum" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Board</label>
            <select
              value={form.board}
              onChange={(e) => handleChange("board", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {boards.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              value={form.class}
              onChange={(e) => handleChange("class", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {classes.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Academic Session</label>
            <select
              value={form.academicSession}
              onChange={(e) => handleChange("academicSession", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {sessions.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Passing Marks (%)</label>
            <input
              type="number"
              value={form.passingMarks}
              onChange={(e) => handleChange("passingMarks", Number(e.target.value))}
              min={0}
              max={100}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exam Pattern</label>
            <select
              value={form.examPattern}
              onChange={(e) => handleChange("examPattern", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {examPatterns.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Default Difficulty</label>
            <select
              value={form.defaultDifficulty}
              onChange={(e) => handleChange("defaultDifficulty", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {difficulties.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question Language</label>
            <select
              value={form.questionLanguage}
              onChange={(e) => handleChange("questionLanguage", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {languages.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </SettingCard>

      {/* Subjects */}
      <SettingCard>
        <SectionHeader icon="📖" title="Subjects Enabled" description="Select which subjects are active for the platform" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {allSubjects.map((subject) => {
            const enabled = form.subjectsEnabled.includes(subject);
            return (
              <button
                key={subject}
                onClick={() => toggleSubject(subject)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  enabled
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${enabled ? "text-blue-700" : "text-gray-700"}`}>
                    {subject}
                  </span>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    enabled ? "bg-blue-600 border-blue-600" : "border-gray-300"
                  }`}>
                    {enabled && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </SettingCard>

      <div className="flex justify-end">
        <SaveBar onSave={handleSave} onReset={handleReset} hasChanges={hasChanges} isSaving={isSaving} />
      </div>
    </div>
  );
}