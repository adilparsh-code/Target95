"use client";

import Card from "../../ui/Card";

export default function FilterPanel({ filters, onFilterChange, questions }) {
  // Extract unique values from questions for filter options
  const uniqueSubjects = [...new Set(questions.map(q => q.subject).filter(Boolean))];
  const uniqueChapters = [...new Set(questions.map(q => q.chapter).filter(Boolean))];
  const uniqueDifficulties = [...new Set(questions.map(q => q.difficulty).filter(Boolean))];
  const uniqueTypes = [...new Set(questions.map(q => q.type).filter(Boolean))];
  const uniqueBoards = [...new Set(questions.map(q => q.board).filter(Boolean))];

  const handleFilterChange = (name, value) => {
    onFilterChange({
      ...filters,
      [name]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      subject: "",
      chapter: "",
      difficulty: "",
      type: "",
      board: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "");

  return (
    <Card className="p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
        {/* Subject filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <select
            value={filters.subject}
            onChange={(e) => handleFilterChange("subject", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">All Subjects</option>
            {uniqueSubjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {/* Chapter filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chapter</label>
          <select
            value={filters.chapter}
            onChange={(e) => handleFilterChange("chapter", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">All Chapters</option>
            {uniqueChapters.map(chapter => (
              <option key={chapter} value={chapter}>{chapter}</option>
            ))}
          </select>
        </div>

        {/* Difficulty filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
          <select
            value={filters.difficulty}
            onChange={(e) => handleFilterChange("difficulty", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">All Difficulties</option>
            {uniqueDifficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>

        {/* Question Type filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">All Types</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Board filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Board</label>
          <select
            value={filters.board}
            onChange={(e) => handleFilterChange("board", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">All Boards</option>
            {uniqueBoards.map(board => (
              <option key={board} value={board}>{board}</option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
}