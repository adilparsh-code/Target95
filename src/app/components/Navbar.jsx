import Link from "next/link";
import SectionLink from "./SectionLink";
import Button from "./ui/Button";
import Container from "./ui/Container";

const links = [
  { href: "/", label: "Home", description: "Overview", icon: "🏠" },
  { href: "/dashboard", label: "Dashboard", description: "Progress", icon: "📊" },
  { href: "/roadmap", label: "Roadmap", description: "Classes", icon: "🗺️" },
  { href: "/java", label: "Practice", description: "Chapters", icon: "📘" },
  { href: "/mock-test", label: "Mock Test", description: "Timed", icon: "📝" },
  { href: "/question-bank", label: "Questions", description: "Bank", icon: "📚" },
  { href: "/analytics", label: "Analytics", description: "Stats", icon: "📈" },
  { href: "/study", label: "Study", description: "Resources", icon: "📖" },
  { href: "/teacher", label: "Teacher", description: "Dashboard", icon: "👨‍🏫" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <Container>
        <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-300">
            🎯 Target95+
          </Link>

          <div className="flex flex-wrap gap-3">
            {links.map((link) => (
              <SectionLink key={link.href} href={link.href} label={link.label} description={link.description} icon={link.icon} />
            ))}
          </div>

          <Button>Login</Button>
        </div>
      </Container>
    </nav>
  );
}