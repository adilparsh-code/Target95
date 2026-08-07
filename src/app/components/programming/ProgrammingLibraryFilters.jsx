import FilterBar from "../ui/FilterBar";

/**
 * ProgrammingLibraryFilters — Reusable filter bar for the Programming Library.
 * Renders Board, Class, and Difficulty dropdowns driven by data-derived options.
 *
 * @param {Object} filters - Current filter values { board, classLevel, difficulty }
 * @param {Object} options - Available options { boards, classes, difficulties }
 * @param {Function} onChange - Callback with { field, value }
 */
export default function ProgrammingLibraryFilters({ filters, options, onChange }) {
  const filterConfig = [
    {
      id: "board",
      label: "Board",
      value: filters.board,
      options: [
        { value: "all", label: "All Boards" },
        ...options.boards.map((board) => ({ value: board, label: board })),
      ],
      onChange: (value) => onChange("board", value),
    },
    {
      id: "class",
      label: "Class",
      value: filters.classLevel,
      options: [
        { value: "all", label: "All Classes" },
        ...options.classes.map((classLevel) => ({ value: classLevel, label: `Class ${classLevel}` })),
      ],
      onChange: (value) => onChange("classLevel", value),
    },
    {
      id: "difficulty",
      label: "Difficulty",
      value: filters.difficulty,
      options: [
        { value: "all", label: "All Difficulties" },
        ...options.difficulties.map((difficulty) => ({ value: difficulty, label: difficulty })),
      ],
      onChange: (value) => onChange("difficulty", value),
    },
  ];

  return <FilterBar filters={filterConfig} />;
}