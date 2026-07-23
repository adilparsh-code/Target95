import Link from "next/link";

export default function SectionLink({ href, label, description, icon }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        <span className="text-2xl" aria-hidden="true">{icon}</span>
        <div>
          <p className="font-semibold text-foreground">{label}</p>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
      </div>
      <span className="text-xl text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true">→</span>
    </Link>
  );
}