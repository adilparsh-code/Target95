"use client";

import { useState } from "react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { QuestionGeneratorService } from "../../../services/QuestionGeneratorService";

const subjects = ["Computer Science", "Physics", "Chemistry", "Mathematics", "Biology"];
const classes = ["9", "10", "11", "12"];
const boards = ["ICSE", "ISC"];
const difficulties = ["Easy", "Medium", "Hard"];
const bloomsLevels = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"];
const questionTypes = [
  "MCQ",
  "One Word",
  "Fill in the Blanks",
  "True False",
  "Assertion Reason",
  "Match the Following",
  "Very Short Answer",
  "Short Answer",
  "Long Answer",
  "Programming Questions",
  "Output Based Questions",
  "Debugging Questions",
  "Find the Error",
  "Dry Run Questions",
  "Case Study Questions",
  "Algorithm Writing",
  "Pseudocode Questions"
];

export default function QuestionEditor({ question, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    question: question?.question || "",
    answer: question?.answer || "",
    explanation: question?.explanation || "",
    difficulty: question?.difficulty || "",
    chapter: question?.chapter || "",
    subject: question?.subject || "",
    board: question?.board || "",
    class: question?.class || "",
    type: question?.type || question?.questionType || "",
    marks: question?.estimatedMarks || question?.marks || 1,
    estimatedTime: question?.estimatedTime || 5,
    status: question?.status || "Draft",
    bloomsLevel: question?.bloomsLevel || "",
    tags: question?.tags ? question.tags.join(", ") : ""
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Process tags: convert comma-separated string to array
      const processedTags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      const processedData = {
        ...formData,
        tags: processedTags,
        questionType: formData.type,
        estimatedMarks: formData.marks
      };

      if (question?.id) {
        // Update existing question
        await QuestionGeneratorService.updateQuestion(question.id, {
          ...processedData,
          updatedAt: new Date().toISOString()
        });
      } else {
        // Create new question
        await QuestionGeneratorService.saveQuestions([{
          ...processedData,
          createdAt: new Date().toISOString(),
          createdBy: "admin"
        }]);
      }
      onSave();
    } catch (error) {
      console.error("Error saving question:", error);
      alert("Failed to save question. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">
        {question?.id ? "Edit Question" : "Create New Question"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Board */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Board *
            </label>
            <select
              name="board"
              value={formData.board}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            >
              <option value="">Select Board</option>
              {boards.map(board => (
                <option key={board} value={board}>{board}</option>
              ))}
            </select>
          </div>

          {/* Class */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class *
            </label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            >
              <option value="">Select Class</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            >
              <option value="">Select Subject</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          {/* Chapter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chapter *
            </label>
            <Input
              name="chapter"
              value={formData.chapter}
              onChange={handleChange}
              required
              placeholder="Enter chapter name"
            />
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            >
              <option value="">Select Type</option>
              {questionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty *
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            >
              <option value="">Select Difficulty</option>
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          </div>

          {/* Marks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Marks
            </label>
            <Input
              type="number"
              name="marks"
              value={formData.marks}
              onChange={handleChange}
              min={1}
              max={50}
            />
          </div>

          {/* Estimated Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Time (mins)
            </label>
            <Input
              type="number"
              name="estimatedTime"
              value={formData.estimatedTime}
              onChange={handleChange}
              min={1}
              max={120}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="Draft">Draft</option>
              <option value="Approved">Approved</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          {/* Bloom's Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bloom's Level
            </label>
            <select
              name="bloomsLevel"
              value={formData.bloomsLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="">Select Bloom's Level</option>
              {bloomsLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma separated)
            </label>
            <Input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., physics, mechanics, forces"
            />
          </div>
        </div>

        {/* Question */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question *
          </label>
          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            required
            placeholder="Enter the question text..."
          />
        </div>

        {/* Answer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correct Answer *
          </label>
          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            required
            placeholder="Enter the correct answer..."
          />
        </div>

        {/* Explanation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Explanation *
          </label>
          <textarea
            name="explanation"
            value={formData.explanation}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            required
            placeholder="Enter the detailed explanation..."
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Question"}
          </Button>
        </div>
      </form>
    </Card>
  );
}