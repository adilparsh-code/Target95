/**
 * ErrorState — Standardized error state component.
 */

export default function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  action,
}) {
  return (
    <div className="rounded-3xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 p-12 text-center shadow-sm">
      <p className="mb-4 text-4xl" aria-hidden="true">⚠️</p>
      <h3 className="text-xl font-bold text-red-800 dark:text-red-300">{title}</h3>
      <p className="mt-2 text-red-700 dark:text-red-400 max-w-md mx-auto">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}