"use client";

import { useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

const SUBJECTS = ["Computer Science"];
const CLASSES = ["9", "10", "11", "12"];
const BOARDS = ["ICSE", "ISC", "CBSE"];
const DIFFICULTY_OPTIONS = [
  { value: "all", label: "Mixed difficulty" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];
const TYPE_OPTIONS = [
  { value: "mixed", label: "Mixed types" },
  { value: "mcq", label: "MCQ" },
  { value: "theory", label: "Theory" },
  { value: "programming", label: "Programming" },
  { value: "output", label: "Output / Dry Run" },
  { value: "assertion-reason", label: "Assertion-Reason" },
  { value: "case-study", label: "Case Study" },
  { value: "short-answer", label: "Short Answer" },
  { value: "long-answer", label: "Long Answer" },
  { value: "fill-in-the-blanks", label: "Fill in the Blanks" },
  { value: "true-false", label: "True / False" },
  { value: "match-the-following", label: "Match the Following" },
];

const initialState = {
  title: "",
  description: "",
  subject: "Computer Science",
  board: "ICSE",
  class: "10",
  chapter: "all",
  difficulty: "all",
  type: "mixed",
  questionCount: 10,
  duration: 30,
  passingScore: 0,
  maxMarks: 100,
  status: "draft",
  scheduledDate: "",
  instructions: "",
};

/** Build the editable form state from a stored test (or blank). */
function buildFormState(test) {
  if (!test) return initialState;
  return {
    title: test.title || "",
    description: test.description || "",
    subject: test.subject || "Computer Science",
    board: test.board || "ICSE",
    class: String(test.class || "10"),
    chapter: test.chapter || "all",
    difficulty: test.difficulty || "all",
    type: test.type || "mixed",
    questionCount: test.questionCount || test.questions || 10,
    duration: test.duration || 30,
    passingScore: test.passingScore ?? 0,
    maxMarks: test.maxMarks || 100,
    status: test.status || "draft",
    scheduledDate: test.scheduledDate || "",
    instructions: test.instructions || "",
  };
}

export default function TestForm({ isOpen, onClose, onSave, test }) {
  // Initialized once per mount — the parent passes a `key` so the form resets
  // whenever the dialog opens or the edit target changes (no sync effect).
  const [form, setForm] = useState(() => buildFormState(test));
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Test title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (form.questionCount < 1) newErrors.questionCount = "At least 1 question required";
    if (form.duration < 1) newErrors.duration = "Duration must be at least 1 minute";
    if (form.passingScore < 0) newErrors.passingScore = "Passing score must be 0 or more";
    if (form.maxMarks < 1) newErrors.maxMarks = "Max marks must be at least 1";
    if (Number(form.passingScore) >= Number(form.maxMarks)) {
      newErrors.passingScore = "Passing score must be lower than max marks";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await onSave({
        ...form,
        questionCount: Number(form.questionCount),
        duration: Number(form.duration),
        passingScore: Number(form.passingScore),
        maxMarks: Number(form.maxMarks),
      });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = (field) =>
    `w-full rounded-lg border ${
      errors[field] ? "border-red-400 ring-2 ring-red-200" : "border-gray-300"
    } px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200`;

  const fieldError = (field) =>
    errors[field] ? <p className="text-xs text-red-500">{errors[field]}</p> : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={test ? "Edit Mock Test" : "Create New Mock Test"} size="2xl">
      <form onSubmit={handleSubmit} className="space-y-5 max-h-[70vh] overflow-y-auto pr-2">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Test Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="e.g. Java Basics — Full Syllabus"
            className={inputClass("title")}
          />
          {fieldError("title")}
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Brief description of the test..."
            rows={2}
            className={inputClass("description")}
          />
          {fieldError("description")}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Board</label>
            <select value={form.board} onChange={(e) => updateField("board", e.target.value)} className={inputClass("board")}>
              {BOARDS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Class</label>
            <select value={form.class} onChange={(e) => updateField("class", e.target.value)} className={inputClass("class")}>
              {CLASSES.map((c) => (
                <option key={c} value={c}>Class {c}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <select value={form.subject} onChange={(e) => updateField("subject", e.target.value)} className={inputClass("subject")}>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Question source */}
        <fieldset className="space-y-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
          <legend className="px-1 text-sm font-semibold text-blue-900">Question source</legend>
          <p className="text-xs text-blue-800">
            Students receive randomly selected questions matching this blueprint from the live question bank.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-blue-900">Chapter</label>
              <input
                type="text"
                value={form.chapter}
                onChange={(e) => updateField("chapter", e.target.value)}
                placeholder="all"
                className={inputClass("chapter")}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-blue-900">Difficulty</label>
              <select value={form.difficulty} onChange={(e) => updateField("difficulty", e.target.value)} className={inputClass("difficulty")}>
                {DIFFICULTY_OPTIONS.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-blue-900">Question type</label>
              <select value={form.type} onChange={(e) => updateField("type", e.target.value)} className={inputClass("type")}>
                {TYPE_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Number of Questions</label>
            <input
              type="number"
              value={form.questionCount}
              onChange={(e) => updateField("questionCount", Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              max={100}
              className={inputClass("questionCount")}
            />
            {fieldError("questionCount")}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
            <input
              type="number"
              value={form.duration}
              onChange={(e) => updateField("duration", Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              max={720}
              className={inputClass("duration")}
            />
            {fieldError("duration")}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Max Marks</label>
            <input
              type="number"
              value={form.maxMarks}
              onChange={(e) => updateField("maxMarks", Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              className={inputClass("maxMarks")}
            />
            {fieldError("maxMarks")}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Passing Score (marks)</label>
            <input
              type="number"
              value={form.passingScore}
              onChange={(e) => updateField("passingScore", Math.max(0, parseInt(e.target.value) || 0))}
              min={0}
              className={inputClass("passingScore")}
            />
            {fieldError("passingScore")}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Scheduled Date</label>
            <input
              type="date"
              value={form.scheduledDate}
              onChange={(e) => updateField("scheduledDate", e.target.value)}
              className={inputClass("scheduledDate")}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Instructions for Students</label>
          <textarea
            value={form.instructions}
            onChange={(e) => updateField("instructions", e.target.value)}
            placeholder="Provide instructions for students taking this test..."
            rows={3}
            className={inputClass("instructions")}
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <div className="flex flex-wrap gap-4">
            {[
              ["published", "Published", "text-emerald-600"],
              ["draft", "Draft", "text-amber-600"],
              ["archived", "Archived", "text-gray-600"],
            ].map(([value, label, color]) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value={value}
                  checked={form.status === value}
                  onChange={(e) => updateField("status", e.target.value)}
                  className={color}
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : test ? "Save Changes" : "Create Test"}</Button>
        </div>
      </form>
    </Modal>
  );
}
