import Link from "next/link";

export default function ShimmerButton({ href, children, className = "" }) {
  return (
    <Link href={href} className={`group relative inline-flex overflow-hidden rounded-xl p-px shadow-lg shadow-blue-950/10 transition-transform duration-200 hover:-translate-y-0.5 ${className}`}>
      <span className="absolute inset-[-120%] animate-spin bg-[conic-gradient(from_0deg,transparent_0deg,transparent_250deg,#60a5fa_285deg,#a78bfa_315deg,transparent_345deg)]" />
      <span className="relative inline-flex items-center justify-center rounded-[11px] bg-slate-950 px-5 py-3 text-sm font-extrabold text-white dark:bg-white dark:text-slate-950">{children}</span>
    </Link>
  );
}
