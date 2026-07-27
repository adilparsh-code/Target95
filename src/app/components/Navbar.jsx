"use client";

import { useState } from "react";
import Link from "next/link";
import SectionLink from "./SectionLink";
import Button from "./ui/Button";
import Container from "./ui/Container";
import { useAuth } from "@/context/AuthContext";
import StudentGlobalSearch from "./StudentGlobalSearch";
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-3 py-2 sm:min-h-[72px] sm:py-3">
          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-300 shrink-0">
            🎯 Target95+
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex min-w-0 flex-1 items-center justify-center gap-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-lg px-2 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right section: search + auth */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="rounded-xl border border-gray-300 bg-white p-2 text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
              aria-label="Open search"
            >
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {loading ? (
              <div className="h-10 w-20 bg-gray-200 animate-pulse rounded-md hidden sm:block"></div>
            ) : user ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 truncate max-w-[100px]">
                  {user.fullName || user.email}
                </span>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {user.role}
                </span>
                <Button variant="outline" onClick={handleLogout} className="text-sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <Button className="text-sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" className="text-sm">Register</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden rounded-xl border border-gray-300 bg-white p-2 text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Dropdown */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-[calc(100dvh-64px)] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-gray-100 bg-white px-4 py-4 space-y-1 overscroll-contain">
          {links.map((link) => (
            <div key={link.href} onClick={() => setMobileMenuOpen(false)}>
              <SectionLink href={link.href} label={link.label} description={link.description} icon={link.icon} />
            </div>
          ))}
          <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
            {loading ? (
              <div className="h-10 bg-gray-200 animate-pulse rounded-md"></div>
            ) : user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-2">
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {user.fullName || user.email}
                  </span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {user.role}
                  </span>
                </div>
                <Button variant="outline" onClick={handleLogout} className="w-full">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Login</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <StudentGlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
}
