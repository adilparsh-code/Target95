const ACTIONS = ["HELP", "SUBJECTS", "CHAPTERS", "PRACTICE", "MY PROGRESS", "REVISION"];

export default function QuickActions({ onPick, disabled, extra = [] }) {
  const items = [...new Set([...extra, ...ACTIONS])].slice(0, 8);
  return (
    <div className="flex gap-2 overflow-x-auto px-3 py-2" role="group" aria-label="Quick actions">
      {items.map((label) => (
        <button
          key={label}
          type="button"
          disabled={disabled}
          onClick={() => onPick(label)}
          className="shrink-0 rounded-full border border-emerald-600 px-3 py-1.5 text-xs font-medium text-emerald-800 transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700 disabled:opacity-50 dark:border-emerald-400 dark:text-emerald-200 dark:hover:bg-emerald-950"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
