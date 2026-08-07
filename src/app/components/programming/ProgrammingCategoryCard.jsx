import Card from "../ui/Card";
import DifficultyBadge from "../DifficultyBadge";

/**
 * ProgrammingCategoryCard — Reusable card for a programming library category.
 * Renders name, description, difficulty, board, class, estimated programs,
 * and learning outcome from a single category object.
 *
 * @param {Object} category - Category object from programmingLibrary data
 */
export default function ProgrammingCategoryCard({ category }) {
  return (
    <Card hover className="flex min-w-0 flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl"
            aria-hidden="true"
          >
            {category.icon}
          </span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {category.name}
          </h3>
        </div>
        <DifficultyBadge difficulty={category.difficulty} />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {category.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
          {category.board}
        </span>
        <span className="rounded-full bg-purple-100 px-2.5 py-1 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
          Class {category.class}
        </span>
        <span className="rounded-full bg-green-100 px-2.5 py-1 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          {category.estimatedPrograms} programs
        </span>
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 p-3 dark:bg-gray-700/40">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Learning Outcome
        </p>
        <p className="mt-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {category.learningOutcome}
        </p>
      </div>
    </Card>
  );
}