export default function SectionCard({ title, description, icon, children, accent = "bg-card" }) {
  return (
    <article
      className={`rounded-2xl border border-border shadow-md p-8 text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-primary/30 ${accent}`}
    >
      {icon ? <div className="text-5xl" aria-hidden="true">{icon}</div> : null}
      <h3 className="mt-5 text-2xl font-bold text-foreground">{title}</h3>
      {description ? <p className="mt-3 text-muted-foreground leading-relaxed">{description}</p> : null}
      {children}
    </article>
  );
}