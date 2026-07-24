"use client";

import Card from "../../ui/Card";

const subjects = ["Computer Science", "Physics", "Chemistry", "Mathematics", "Biology"];
const classes = ["9", "10", "11", "12"];
const boards = ["ICSE", "ISC"];
const difficulties = ["Easy", "Medium", "Hard"];
const statuses = ["Draft", "Approved", "Published", "Archived"];
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

export default function QuestionFilters({ filters, onFilterChange, questions }) {
  // Get unique chapters from questions
  const chapters = [...new Set(questions.map(q => q.chapter).filter(Boolean))];

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value
    });
  };

  const handleReset = () => {
    onFilterChange({
      subject: "",
      class: "",
      board: "",
      chapter: "",
      difficulty: "",
      questionType: "",
      status: "",
      createdDate: ""
    });
  };

  return (
    <Card className="p-4 sticky top-4">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <div className="space-y-4">
        {/* Board */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Board
          </label>
          <select
            name="board"
            value={filters.board}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">All Boards</option>
            {boards.map(board => (
              <option key={board} value={board}>{board}</option>
            ))}
          </select>
        </div>

        {/* Class */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Class
          </label>
          <select
            name="class"
            value={filters.class}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">All Classes</option>
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <select
            name="subject"
            value={filters.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {/* Chapter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chapter
          </label>
          <select
            name="chapter"
            value={filters.chapter}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">All Chapters</option>
            {chapters.map(chapter => (
              <option key={chapter} value={chapter}>{chapter}</option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty
          </label>
          <select
            name="difficulty"
            value={filters.difficulty}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">All Difficulties</option>
            {difficulties.map(diff => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>
        </div>

        {/* Question Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question Type
          </label>
          <select
            name="questionType"
            value={filters.questionType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">All Types</option>
            {questionTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleReset}
          className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </Card>
  );
}