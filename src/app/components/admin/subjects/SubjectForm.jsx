"use client";

import { useState, useEffect } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

const GRADES = ["ICSE", "ISC"];
const CLASSES = ["9", "10", "11", "12"];
const COLORS = [
  { value: "blue", label: "Blue" },
  { value: "emerald", label: "Emerald" },
  { value: "violet", label: "Violet" },
  { value: "amber", label: "Amber" },
  { value: "rose", label: "Rose" },
  { value: "cyan", label: "Cyan" },
  { value: "indigo", label: "Indigo" },
  { value: "orange", label: "Orange" },
];
const ICONS = [
  { value: "💻", label: "Computer" },
  { value: "⚛️", label: "Atom" },
  { value: "🧪", label: "Lab" },
  { value: "📐", label: "Math" },
  { value: "🧬", label: "DNA" },
  { value: "📖", label: "Book" },
  { value: "🖥️", label: "Desktop" },
  { value: "📊", label: "Chart" },
];

const initialState = {
  name: "",
  code: "",
  grade: "ICSE",
  class: "10",
  color: "blue",
  icon: "💻",
  status: "active",
};

export default function SubjectForm({ isOpen, onClose, onSave, subject }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (subject) {
      setForm({
        name: subject.name || "",
        code: subject.code || "",
        grade: subject.grade || "ICSE",
        class: subject.class || "10",
        color: subject.color || "blue",
        icon: subject.icon || "💻",
        status: subject.status || "active",
      });
    } else {
      setForm(initialState);
    }
    setErrors({});
  }, [subject, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Subject name is required";
    if (!form.code.trim()) newErrors.code = "Subject code is required";
    if (form.code.length > 6) newErrors.code = "Code must be 6 characters or less";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...form,
      id: subject?.id || Date.now(),
      chapters: subject?.chapters || 0,
      questions: subject?.questions || 0,
      students: subject?.students || 0,
      createdAt: subject?.createdAt || new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    });
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={subject ? "Edit Subject" : "Add New Subject"}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name & Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Subject Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g. Computer Science"
              className={`w-full rounded-lg border ${errors.name ? "border-red-400 ring-2 ring-red-200" : "border-gray-300"} px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Subject Code</label>
            <input
              type="text"
              value={form.code}
              onChange={(e) => updateField("code", e.target.value.toUpperCase())}
              placeholder="e.g. CS"
              className={`w-full rounded-lg border ${errors.code ? "border-red-400 ring-2 ring-red-200" : "border-gray-300"} px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
            />
            {errors.code && <p className="text-xs text-red-500">{errors.code}</p>}
          </div>
        </div>

        {/* Grade & Class */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Grade</label>
            <select
              value={form.grade}
              onChange={(e) => updateField("grade", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {GRADES.map((g) => (
                <option key={g} value={g}>{g}</option>
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

        {/* Color & Icon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Color Theme</label>
            <select
              value={form.color}
              onChange={(e) => updateField("color", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {COLORS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Icon</label>
            <select
              value={form.icon}
              onChange={(e) => updateField("icon", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {ICONS.map((i) => (
                <option key={i.value} value={i.value}>{i.value} {i.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="active"
                checked={form.status === "active"}
                onChange={(e) => updateField("status", e.target.value)}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700">Active</span>
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
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {subject ? "Save Changes" : "Create Subject"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}