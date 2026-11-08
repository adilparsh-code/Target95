import AceMascot from "./AceMascot";

// Shared empty / error state fronted by Ace. Presentational only: callers pass copy and actions.
// The badge keeps Ace's dark outline legible on both light and dark surfaces.
const VARIANT_CLASS = {
  card: "rounded-xl border border-dashed border-slate-200 p-8 dark:border-slate-700",
  plain: "px-4 py-16",
};

export default function AceEmptyState({
  title,
  message,
  children,
  headingAs: Heading = "h2",
  variant = "card",
  mascotSize = 56,
  className = "",
  titleClassName = "text-lg font-semibold text-slate-900 dark:text-slate-100",
  messageClassName = "text-sm text-slate-500 dark:text-slate-400",
}) {
  return (
    <div className={`flex flex-col items-center text-center ${VARIANT_CLASS[variant] || VARIANT_CLASS.card} ${className}`.trim()}>
      <span className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 dark:bg-slate-200">
        <AceMascot size={mascotSize} />
      </span>
      {title ? <Heading className={titleClassName}>{title}</Heading> : null}
      {message ? <p className={`${title ? "mt-2" : ""} max-w-md ${messageClassName}`.trim()}>{message}</p> : null}
      {children ? <div className="mt-4 flex flex-wrap items-center justify-center gap-3">{children}</div> : null}
    </div>
  );
}
