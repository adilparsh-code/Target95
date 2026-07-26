import Link from "next/link";

export default function SectionLink({ href, label, description, icon }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2 sm:px-5 sm:py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg min-w-0"
    >
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <span className="text-xl sm:text-2xl flex-shrink-0" aria-hidden="true">{icon}</span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-sm sm:text-base truncate">{label}</p>
          {description ? <p className="text-xs sm:text-sm text-muted-foreground truncate">{description}</p> : null}
        </div>
      </div>
      <span className="text-lg sm:text-xl text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary flex-shrink-0 ml-2" aria-hidden="true">→</span>
    </Link>
  );
}