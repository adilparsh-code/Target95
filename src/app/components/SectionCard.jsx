export default function SectionCard({ title, description, icon, children, accent = "bg-white" }) {
  return (
    <article
      className={`rounded-2xl border border-gray-100 shadow-md p-8 text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-blue-200 ${accent}`}
    >
      {icon ? <div className="text-5xl" aria-hidden="true">{icon}</div> : null}
      <h3 className="mt-5 text-2xl font-bold text-gray-900">{title}</h3>
      {description ? <p className="mt-3 text-gray-600 leading-relaxed">{description}</p> : null}
      {children}
    </article>
  );
}