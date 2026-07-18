import Link from "next/link";
import SectionLink from "./SectionLink";

const links = [
  { href: "/", label: "Home", description: "Overview", icon: "🏠" },
  { href: "/dashboard", label: "Dashboard", description: "Progress", icon: "📊" },
  { href: "/java", label: "Practice", description: "Chapters", icon: "📘" },
  { href: "/mock-test", label: "Mock Test", description: "Timed", icon: "📝" },
  { href: "/study", label: "Study", description: "Resources", icon: "📚" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="text-3xl font-bold text-blue-600">
          🎯 Target95+
        </Link>

        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <SectionLink key={link.href} href={link.href} label={link.label} description={link.description} icon={link.icon} />
          ))}
        </div>

        <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
          Login
        </button>
      </div>
    </nav>
  );
}