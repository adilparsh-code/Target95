"use client";

import { useState } from "react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const subjects = ["Computer Science", "Physics", "Chemistry", "Mathematics", "Biology"];
const classes = ["9", "10", "11", "12"];
const boards = ["ICSE", "ISC"];
const languages = ["English", "Hindi"];
const chapters = {
  "Computer Science": ["Introduction to Java", "Object-Oriented Programming", "Arrays", "Strings", "Methods", "Inheritance", "Polymorphism", "Exception Handling"],
  "Physics": ["Force and Motion", "Work Energy Power", "Gravitation", "Thermodynamics", "Waves", "Electricity", "Magnetism", "Modern Physics"],
  "Chemistry": ["Mole Concept", "Atomic Structure", "Chemical Bonding", "States of Matter", "Thermodynamics", "Equilibrium", "Redox Reactions", "Organic Chemistry"],
  "Mathematics": ["Sets", "Relations and Functions", "Trigonometry", "Limits and Derivatives", "Statistics", "Probability", "Calculus", "Algebra"],
  "Biology": ["Cell Biology", "Genetics", "Ecology", "Human Physiology", "Plant Physiology", "Biotechnology", "Microbiology", "Evolution"]
};
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
const difficulties = ["Easy", "Medium", "Hard"];

export default function GeneratorForm({ onGenerate, isLoading }) {
  const initialFormData = {
    subject: "",
    class: "",
    board: "",
    chapter: "",
    questionType: "",
    difficulty: "",
    language: "",
    numberOfQuestions: 5
  };
  
  const [formData, setFormData] = useState(initialFormData);
  
  const handleReset = () => {
    setFormData(initialFormData);
  };

  const availableChapters = formData.subject ? chapters[formData.subject] || [] : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "subject" ? { chapter: "" } : {})
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const isFormValid = formData.subject && formData.class && formData.board && 
                     formData.chapter && formData.questionType && formData.difficulty &&
                     formData.language;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Generate AI Questions</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* Chapter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chapter *
            </label>
            <select
              name="chapter"
              value={formData.chapter}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
              disabled={!formData.subject}
            >
              <option value="">Select Chapter</option>
              {availableChapters.map(chapter => (
                <option key={chapter} value={chapter}>{chapter}</option>
              ))}
            </select>
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Type *
            </label>
            <select
              name="questionType"
              value={formData.questionType}
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

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language *
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            >
              <option value="">Select Language</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Number of Questions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Questions
            </label>
            <Input
              type="number"
              name="numberOfQuestions"
              value={formData.numberOfQuestions}
              onChange={handleChange}
              min={1}
              max={20}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            onClick={handleReset}
            variant="secondary"
            className="px-8"
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="px-8"
          >
            {isLoading ? "Generating..." : "Generate Questions"}
          </Button>
        </div>
      </form>
    </Card>
  );
}