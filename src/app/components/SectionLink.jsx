import Link from "next/link";

export default function SectionLink({ href, label, description, icon }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">{icon}</span>
        <div>
          <p className="font-semibold text-gray-900">{label}</p>
          {description ? <p className="text-sm text-gray-600">{description}</p> : null}
        </div>
      </div>
      <span className="text-xl text-gray-400 transition group-hover:text-blue-600">→</span>
    </Link>
  );
}
