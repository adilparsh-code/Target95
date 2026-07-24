"use client";

import { useState, useEffect } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

const SUBJECTS = ["Computer Science", "Physics", "Chemistry", "Mathematics", "Biology", "English"];
const CLASSES = ["9", "10", "11", "12"];
const DURATION_UNITS = ["min", "hour"];

const initialState = {
  title: "",
  description: "",
  subject: "Computer Science",
  class: "10",
  questions: 10,
  duration: 30,
  durationUnit: "min",
  passingScore: 40,
  maxMarks: 100,
  status: "draft",
  scheduledDate: "",
  instructions: "",
};

export default function TestForm({ isOpen, onClose, onSave, test }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (test) {
      setForm({
        title: test.title || "",
        description: test.description || "",
        subject: test.subject || "Computer Science",
        class: test.class || "10",
        questions: test.questions || 10,
        duration: test.duration || 30,
        durationUnit: test.durationUnit || "min",
        passingScore: test.passingScore || 40,
        maxMarks: test.maxMarks || 100,
        status: test.status || "draft",
        scheduledDate: test.scheduledDate || "",
        instructions: test.instructions || "",
      });
    } else {
      setForm(initialState);
    }
    setErrors({});
  }, [test, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Test title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (form.questions < 1) newErrors.questions = "At least 1 question required";
    if (form.duration < 1) newErrors.duration = "Duration must be at least 1";
    if (form.passingScore < 0) newErrors.passingScore = "Passing score must be 0 or more";
    if (form.maxMarks < 1) newErrors.maxMarks = "Max marks must be at least 1";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...form,
      id: test?.id || `MT${Date.now()}`,
      attempts: test?.attempts || 0,
      avgScore: test?.avgScore || 0,
      highestScore: test?.highestScore || 0,
      lowestScore: test?.lowestScore || 0,
      author: "Admin",
      created: test?.created || new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
    });
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={test ? "Edit Mock Test" : "Create New Mock Test"} size="2xl">
      <form onSubmit={handleSubmit} className="space-y-5 max-h-[70vh] overflow-y-auto pr-2">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Test Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="e.g. Java Basics — Full Syllabus"
            className={`w-full rounded-lg border ${errors.title ? "border-red-400 ring-2 ring-red-200" : "border-gray-300"} px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
          />
          {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Brief description of the test..."
            rows={2}
            className={`w-full rounded-lg border ${errors.description ? "border-red-400 ring-2 ring-red-200" : "border-gray-300"} px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
          />
          {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
        </div>

        {/* Subject & Class */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <select
              value={form.subject}
              onChange={(e) => updateField("subject", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Class</label>
            <select
              value={form.class}
              onChange={(e) => updateField("class", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {CLASSES.map((c) => (
                <option key={c} value={c}>Class {c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Questions & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Number of Questions</label>
            <input
              type="number"
              value={form.questions}
              onChange={(e) => updateField("questions", Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              className={`w-full rounded-lg border ${errors.questions ? "border-red-400 ring-2 ring-red-200" : "border-gray-300"} px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
            />
            {errors.questions && <p className="text-xs text-red-500">{errors.questions}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={form.duration}
                onChange={(e) => updateField("duration", Math.max(1, parseInt(e.target.value) || 1))}
                min={1}
                className={`w-full rounded-lg border ${errors.duration ? "border-red-400 ring-2 ring-red-200" : "border-gray-300"} px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
              />
              <select
                value={form.durationUnit}
                onChange={(e) => updateField("durationUnit", e.target.value)}
                className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                {DURATION_UNITS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            {errors.duration && <p className="text-xs text-red-500">{errors.duration}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Max Marks</label>
            <input
              type="number"
              value={form.maxMarks}
              onChange={(e) => updateField("maxMarks", Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              className={`w-full rounded-lg border ${errors.maxMarks ? "border-red-400 ring-2 ring-red-200" : "border-gray-300"} px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
            />
            {errors.maxMarks && <p className="text-xs text-red-500">{errors.maxMarks}</p>}
          </div>
        </div>

        {/* Passing Score & Scheduled Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Passing Score</label>
            <input
              type="number"
              value={form.passingScore}
              onChange={(e) => updateField("passingScore", Math.max(0, parseInt(e.target.value) || 0))}
              min={0}
              className={`w-full rounded-lg border ${errors.passingScore ? "border-red-400 ring-2 ring-red-200" : "border-gray-300"} px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
            />
            {errors.passingScore && <p className="text-xs text-red-500">{errors.passingScore}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Scheduled Date</label>
            <input
              type="date"
              value={form.scheduledDate}
              onChange={(e) => updateField("scheduledDate", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Instructions for Students</label>
          <textarea
            value={form.instructions}
            onChange={(e) => updateField("instructions", e.target.value)}
            placeholder="Provide instructions for students taking this test..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Status */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="published"
                checked={form.status === "published"}
                onChange={(e) => updateField("status", e.target.value)}
                className="text-emerald-600"
              />
              <span className="text-sm text-gray-700">Published</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="draft"
                checked={form.status === "draft"}
                onChange={(e) => updateField("status", e.target.value)}
                className="text-amber-600"
              />
              <span className="text-sm text-gray-700">Draft</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="pending"
                checked={form.status === "pending"}
                onChange={(e) => updateField("status", e.target.value)}
                className="text-violet-600"
              />
              <span className="text-sm text-gray-700">Pending Review</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">{test ? "Save Changes" : "Create Test"}</Button>
        </div>
      </form>
    </Modal>
  );
}