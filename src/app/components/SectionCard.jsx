export default function SectionCard({ title, description, icon, children, accent = "bg-white" }) {
  return (
    <article className={`rounded-2xl border border-gray-200 shadow-sm p-8 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl ${accent}`}>
      {icon ? <div className="text-5xl" aria-hidden="true">{icon}</div> : null}
      <h3 className="mt-5 text-2xl font-bold text-gray-900">{title}</h3>
      {description ? <p className="mt-3 text-gray-600">{description}</p> : null}
      {children}
    </article>
  );
}
