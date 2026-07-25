"use client";

import { useState, useEffect } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

const QUESTION_TYPES = [
  { value: "MCQ", label: "Multiple Choice" },
  { value: "Theory", label: "Theory" },
  { value: "Programming", label: "Programming" },
  { value: "Output", label: "Output Prediction" },
  { value: "FillBlanks", label: "Fill in the Blanks" },
  { value: "TrueFalse", label: "True / False" },
];

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const SUBJECTS = ["Computer Science", "Physics", "Chemistry", "Mathematics", "Biology", "English"];

const initialState = {
  title: "",
  question: "",
  solution: "",
  subject: "Computer Science",
  chapter: "",
  difficulty: "Medium",
  questionType: "MCQ",
  estimatedTime: 10,
  tags: [],
  options: ["", "", "", ""],
  correctAnswer: "",
  blanks: [],
  isTrue: true,
  code: "",
  expectedOutput: "",
  status: "draft",
};

export default function QuestionForm({ isOpen, onClose, onSave, question }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (question) {
      setForm({
        title: question.title || "",
        question: question.question || "",
        solution: question.solution || "",
        subject: question.subject || "Computer Science",
        chapter: question.chapter || "",
        difficulty: question.difficulty || "Medium",
        questionType: question.questionType || "MCQ",
        estimatedTime: question.estimatedTime || 10,
        tags: question.tags || [],
        options: question.options || ["", "", "", ""],
        correctAnswer: question.correctAnswer || "",
        blanks: question.blanks || [],
        isTrue: question.isTrue ?? true,
        code: question.code || "",
        expectedOutput: question.expectedOutput || "",
        status: question.status || "draft",
      });
    } else {
      setForm(initialState);
    }
    setErrors({});
    setTagInput("");
  }, [question, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.question.trim()) newErrors.question = "Question content is required";
    if (!form.chapter.trim()) newErrors.chapter = "Chapter is required";
    if (form.questionType === "MCQ" && !form.correctAnswer) newErrors.correctAnswer = "Please select the correct answer";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...form,
      id: question?.id || Date.now(),
      tags: form.tags,
      createdAt: question?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      updateField("tags", [...form.tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    updateField("tags", form.tags.filter((t) => t !== tag));
  };

  const updateOption = (index, value) => {
    const newOptions = [...form.options];
    newOptions[index] = value;
    updateField("options", newOptions);
  };

  const renderTypeSpecificFields = () => {
    switch (form.questionType) {
      case "MCQ":
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Answer Options</label>
            {form.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="correctAnswer"
                  value={opt}
                  checked={form.correctAnswer === opt}
                  onChange={(e) => updateField("correctAnswer", e.target.value)}
                  className="text-blue-600 shrink-0"
                />
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            ))}
            {errors.correctAnswer && (
              <p className="text-xs text-red-500">Please select the correct answer by clicking the radio button next to it.</p>
            )}
          </div>
        );

      case "TrueFalse":
        return (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isTrue"
                  checked={form.isTrue === true}
                  onChange={() => updateField("isTrue", true)}
                  className="text-emerald-600"
                />
                <span className="text-sm text-gray-700">True</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isTrue"
                  checked={form.isTrue === false}
                  onChange={() => updateField("isTrue", false)}
                  className="text-red-600"
                />
                <span className="text-sm text-gray-700">False</span>
              </label>
            </div>
          </div>
        );

      case "Programming":
        return (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Code Template</label>
              <textarea
                value={form.code}
                onChange={(e) => updateField("code", e.target.value)}
                placeholder="Paste code template here..."
                rows={6}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Expected Output</label>
              <textarea
                value={form.expectedOutput}
                onChange={(e) => updateField("expectedOutput", e.target.value)}
                placeholder="Expected output..."
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
        );

      case "Output":
        return (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Code Snippet</label>
              <textarea
                value={form.code}
                onChange={(e) => updateField("code", e.target.value)}
                placeholder="Paste code snippet here..."
                rows={6}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Correct Output</label>
              <input
                type="text"
                value={form.expectedOutput}
                onChange={(e) => updateField("expectedOutput", e.target.value)}
                placeholder="What should this code output?"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
        );

      case "FillBlanks":
        return (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Use <code className="bg-gray-100 px-1 rounded">{`{blank}`}</code> in your question text where blanks should appear
            </label>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Correct Answers (comma separated)</label>
              <input
                type="text"
                value={form.correctAnswer}
                onChange={(e) => updateField("correctAnswer", e.target.value)}
                placeholder="e.g. variable, function, loop"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={question ? "Edit Question" : "Create New Question"} size="2xl">
      <form onSubmit={handleSubmit} className="space-y-5 max-h-[70vh] overflow-y-auto pr-2">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Question Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="e.g. Binary Search Algorithm"
            className={`w-full rounded-lg border ${errors.title ? "border-red-400 ring-2 ring-red-200" : "border-gray-300"} px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
          />
          {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
        </div>

        {/* Question Type & Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Question Type</label>
            <select
              value={form.questionType}
              onChange={(e) => updateField("questionType", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {QUESTION_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
            <select
              value={form.difficulty}
              onChange={(e) => updateField("difficulty", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Subject & Chapter */}
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
            <label className="block text-sm font-medium text-gray-700">Chapter</label>
            <input
              type="text"
              value={form.chapter}
              onChange={(e) => updateField("chapter", e.target.value)}
              placeholder="e.g. Searching Algorithms"
              className={`w-full rounded-lg border ${errors.chapter ? "border-red-400 ring-2 ring-red-200" : "border-gray-300"} px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
            />
            {errors.chapter && <p className="text-xs text-red-500">{errors.chapter}</p>}
          </div>
        </div>

        {/* Question Content */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Question</label>
          <textarea
            value={form.question}
            onChange={(e) => updateField("question", e.target.value)}
            placeholder="Enter the question content..."
            rows={4}
            className={`w-full rounded-lg border ${errors.question ? "border-red-400 ring-2 ring-red-200" : "border-gray-300"} px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
          />
          {errors.question && <p className="text-xs text-red-500">{errors.question}</p>}
        </div>

        {/* Type-specific fields */}
        {renderTypeSpecificFields()}

        {/* Solution */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Solution / Explanation</label>
          <textarea
            value={form.solution}
            onChange={(e) => updateField("solution", e.target.value)}
            placeholder="Provide the solution or explanation..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Estimated Time */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Estimated Time (minutes)</label>
          <input
            type="number"
            value={form.estimatedTime}
            onChange={(e) => updateField("estimatedTime", Math.max(1, parseInt(e.target.value) || 1))}
            min={1}
            max={120}
            className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Tags */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              placeholder="Type a tag and press Enter"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <Button type="button" variant="outline" onClick={addTag}>Add</Button>
          </div>
          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {form.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-blue-400 hover:text-blue-600">&times;</button>
                </span>
              ))}
            </div>
          )}
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
                value="archived"
                checked={form.status === "archived"}
                onChange={(e) => updateField("status", e.target.value)}
                className="text-gray-600"
              />
              <span className="text-sm text-gray-700">Archived</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">{question ? "Save Changes" : "Create Question"}</Button>
        </div>
      </form>
    </Modal>
  );
}