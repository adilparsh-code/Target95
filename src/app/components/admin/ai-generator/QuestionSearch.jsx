"use client";

import SearchInput from "../SearchInput";

export default function QuestionSearch({ searchQuery, onSearchChange }) {
  return (
    <div className="w-full">
      <SearchInput
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by keyword, subject, or chapter..."
        className="w-full"
      />
    </div>
  );
}