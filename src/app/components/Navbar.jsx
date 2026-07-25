"use client";

import Link from "next/link";
import SectionLink from "./SectionLink";
import Button from "./ui/Button";
import Container from "./ui/Container";
import { useAuth } from "@/context/AuthContext";

const links = [
  { href: "/", label: "Home", description: "Overview", icon: "🏠" },
  { href: "/dashboard", label: "Dashboard", description: "Progress", icon: "📊" },
  { href: "/study", label: "Study", description: "Chapters", icon: "📖" },
  { href: "/java", label: "Practice", description: "Questions", icon: "📘" },
  { href: "/mock-test", label: "Mock Tests", description: "Timed", icon: "📝" },
  { href: "/question-bank", label: "Questions", description: "Bank", icon: "📚" },
  { href: "/analytics", label: "Analytics", description: "Stats", icon: "📈" },
  { href: "/ai-tutor", label: "AI Tutor", description: "Help", icon: "🤖" },
];

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

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

          <div className="flex items-center gap-3">
            {loading ? (
              <div className="h-10 w-20 bg-gray-200 animate-pulse rounded-md"></div>
            ) : user ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {user.fullName || user.email}
                  </span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {user.role}
                  </span>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}
