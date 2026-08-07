/**
 * useProgrammingLibrary — Business logic for the Programming Library.
 *
 * Handles Board → Class → Difficulty filtering plus keyword search.
 * Filter options are derived from the data, never hardcoded.
 */
"use client";

import { useMemo, useState } from "react";
import { programmingCategories } from "@/app/data/programmingLibrary";

const normalizeValue = (value = "") => String(value).trim().toLowerCase();

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export function useProgrammingLibrary() {
  const [board, setBoard] = useState("all");
  const [classLevel, setClassLevel] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [search, setSearch] = useState("");

  const filterOptions = useMemo(
    () => ({
      boards: uniqueSorted(programmingCategories.map((category) => category.board)),
      classes: uniqueSorted(programmingCategories.map((category) => category.class)),
      difficulties: uniqueSorted(programmingCategories.map((category) => category.difficulty)),
    }),
    []
  );

  const filteredCategories = useMemo(() => {
    const keyword = normalizeValue(search);

    return programmingCategories.filter((category) => {
      if (board !== "all" && category.board !== board) return false;
      if (classLevel !== "all" && category.class !== classLevel) return false;
      if (difficulty !== "all" && category.difficulty !== difficulty) return false;

      if (keyword) {
        const searchableText = [
          category.name,
          category.description,
          category.learningOutcome,
          category.board,
          category.class,
          category.difficulty,
        ]
          .filter(Boolean)
          .join(" ");

        if (!normalizeValue(searchableText).includes(keyword)) return false;
      }

      return true;
    });
  }, [board, classLevel, difficulty, search]);

  const totalPrograms = useMemo(
    () => programmingCategories.reduce((total, category) => total + category.estimatedPrograms, 0),
    []
  );

  const resetFilters = () => {
    setBoard("all");
    setClassLevel("all");
    setDifficulty("all");
    setSearch("");
  };

  return {
    categories: filteredCategories,
    totalCategories: programmingCategories.length,
    totalPrograms,
    filterOptions,
    filters: { board, classLevel, difficulty, search },
    setBoard,
    setClassLevel,
    setDifficulty,
    setSearch,
    resetFilters,
  };
}

export default useProgrammingLibrary;