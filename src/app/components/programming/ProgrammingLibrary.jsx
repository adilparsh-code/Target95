"use client";

import useProgrammingLibrary from "../../../hooks/useProgrammingLibrary";
import ProgrammingCategoryCard from "./ProgrammingCategoryCard";
import ProgrammingLibraryFilters from "./ProgrammingLibraryFilters";
import { SearchInput } from "../ui/FilterBar";

/**
 * ProgrammingLibrary — Main catalog for the Programming Library.
 * Renders header stats, search, filters, and a responsive card grid.
 * All data and filtering logic come from the hook; no hardcoded categories.
 */
export default function ProgrammingLibrary() {
  const {
    categories,
    totalCategories,
    totalPrograms,
    filterOptions,
    filters,
    setBoard,
    setClassLevel,
    setDifficulty,
    setSearch,
    resetFilters,
  } = useProgrammingLibrary();

  const handleFilterChange = (field, value) => {
    if (field === "board") setBoard(value);
    if (field === "classLevel") setClassLevel(value);
    if (field === "difficulty") setDifficulty(value);
  };

  const hasActiveFilters =
    filters.board !== "all" ||
    filters.classLevel !== "all" ||
    filters.difficulty !== "all" ||
    filters.search.trim() !== "";

  return (
    <div className="py-8 sm:py-12">
      {/* Header */}
      <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-10 dark:border-gray-700 dark:bg-gray-800">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700 dark:text-blue-400">
          Target95 Programming Library
        </p>
        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-blue-700 sm:text-4xl md:text-5xl dark:text-blue-400">
              Programming Library
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-lg dark:text-gray-400">
              A structured collection of programming categories for ICSE & ISC
              Computer Science. Master each topic with focused, exam-ready programs.
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat value={totalCategories} label="Categories" />
          <Stat value={totalPrograms} label="Programs" />
          <Stat value={filterOptions.boards.length} label="Boards" />
          <Stat value={filterOptions.difficulties.length} label="Difficulty Levels" />
        </div>
      </section>

      {/* Filters */}
      <section className="mt-6 rounded-2xl border border-gray-200 bg-slate-50 p-5 sm:p-6 dark:border-gray-700 dark:bg-gray-800/50">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Browse Categories
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Filter by board, class, and difficulty.
              </p>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Reset Filters
              </button>
            )}
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            <div className="md:col-span-1">
              <SearchInput
                value={filters.search}
                onChange={setSearch}
                placeholder="Search categories..."
              />
            </div>
            <div className="md:col-span-3">
              <ProgrammingLibraryFilters
                filters={filters}
                options={filterOptions}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
            All Categories
          </h2>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            {categories.length} of {totalCategories} categories
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <ProgrammingCategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-600 dark:bg-gray-800">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              No categories match your filters
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Try adjusting your board, class, or difficulty selection.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 text-center dark:border-gray-700 dark:bg-gray-800">
      <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{value}</p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  );
}