import Link from "next/link";
import SectionLink from "./SectionLink";

const links = [
  { href: "/", label: "Home", description: "Overview", icon: "🏠" },
  { href: "/dashboard", label: "Dashboard", description: "Progress", icon: "📊" },
  { href: "/java", label: "Practice", description: "Chapters", icon: "📘" },
  { href: "/mock-test", label: "Mock Test", description: "Timed", icon: "📝" },
  { href: "/question-bank", label: "Questions", description: "Bank", icon: "📚" },
  { href: "/study", label: "Study", description: "Resources", icon: "📖" },
  { href: "/teacher", label: "Teacher", description: "Dashboard", icon: "👨‍🏫" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-300">
          🎯 Target95+
        </Link>

        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <SectionLink key={link.href} href={link.href} label={link.label} description={link.description} icon={link.icon} />
          ))}
        </div>

        <button className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800">
          Login
        </button>
      </div>
    </nav>
  );
}