"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import Button from "./ui/Button";
import Container from "./ui/Container";
import { useAuth } from "@/context/AuthContext";
import StudentGlobalSearch from "./StudentGlobalSearch";
import { 
  MagnifyingGlassIcon, Bars3Icon, XMarkIcon, SunIcon, MoonIcon, 
  ChevronDownIcon, BellIcon, ComputerDesktopIcon
} from "@heroicons/react/24/outline";

// Primary navigation items (max 6-7 visible)
const primaryLinks = [
  { href: "/", label: "Home" },
  { 
    label: "Learn", 
    dropdown: [
      { href: "/study", label: "Subjects" },
      { href: "/Java", label: "Chapters" },
    ]
  },
  { 
    label: "Practice", 
    dropdown: [
      { href: "/question-bank", label: "Practice Questions" },
      { href: "/mock-test", label: "Mock Tests" },
    ]
  },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/ai-tutor", label: "AI Tutor" },
  { href: "/analytics", label: "Analytics" },
  { 
    label: "More", 
    dropdown: [
      { href: "/rewards", label: "Rewards" },
      { href: "/daily-challenge", label: "Daily Challenge" },
      { href: "/my-learning", label: "My Learning" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ]
  },
];

// Mobile links (preserve all functionality)
const mobileLinks = [
  { href: "/", label: "Home", description: "Overview", icon: "🏠" },
  { href: "/dashboard", label: "Dashboard", description: "Progress", icon: "📊" },
  { href: "/study", label: "Study", description: "Chapters", icon: "📖" },
  { href: "/question-bank", label: "Practice", description: "Questions", icon: "📘" },
  { href: "/mock-test", label: "Mock Tests", description: "Timed", icon: "📝" },
  { href: "/analytics", label: "Analytics", description: "Stats", icon: "📈" },
  { href: "/ai-tutor", label: "AI Tutor", description: "Help", icon: "🤖" },
  { href: "/rewards", label: "Rewards", description: "Badges", icon: "🏆" },
  { href: "/daily-challenge", label: "Daily Challenge", description: "Earn XP", icon: "⚡" },
  { href: "/my-learning", label: "My Learning", description: "Roadmap", icon: "🧭" },
  { href: "/about", label: "About", description: "Our mission", icon: "ℹ️" },
  { href: "/contact", label: "Contact", description: "Get in touch", icon: "✉️" },
];

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRefs = useRef({});
  const themeDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && dropdownRefs.current[openDropdown] && !dropdownRefs.current[openDropdown].contains(event.target)) {
        setOpenDropdown(null);
      }
      if (themeDropdownOpen && themeDropdownRef.current && !themeDropdownRef.current.contains(event.target)) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown, themeDropdownOpen]);

  // Close dropdown when pressing escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (searchOpen) setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen, searchOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen, searchOpen]);

  // Trap focus inside mobile menu when open
  useEffect(() => {
    if (mobileMenuOpen) {
      const focusableElements = document.querySelectorAll(
        '.xl\\:hidden [href], .xl\\:hidden button, .xl\\:hidden [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      const handleTab = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTab);
      firstFocusable?.focus();
      
      return () => document.removeEventListener('keydown', handleTab);
    }
  }, [mobileMenuOpen]);

  const getThemeIcon = () => {
    if (!mounted) return <MoonIcon className="h-5 w-5" aria-hidden="true" />;
    if (theme === 'dark') return <SunIcon className="h-5 w-5" aria-hidden="true" />;
    if (theme === 'light') return <MoonIcon className="h-5 w-5" aria-hidden="true" />;
    return <ComputerDesktopIcon className="h-5 w-5" aria-hidden="true" />;
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) router.push("/");
  };

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const isLinkActive = (href) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full h-[68px] border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 shadow-lg backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/70 transition-all duration-300">
      {/* Skip link for keyboard navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>
      
      <Container>
        <div className="flex h-[68px] items-center justify-between gap-4">
          {/* Logo - Compact width */}
          <Link href="/" className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 shrink-0 flex items-center gap-1">
            <span className="text-2xl">🎯</span>
            <span className="hidden sm:inline">Target95+</span>
            <span className="sm:hidden">T95+</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center gap-1">
            {primaryLinks.map((link) => {
              const isActive = link.href ? isLinkActive(link.href) : link.dropdown?.some(item => isLinkActive(item.href));
              const hasDropdown = !!link.dropdown;
              
              return (
                <div 
                  key={link.label} 
                  className="relative"
                  ref={(el) => { dropdownRefs.current[link.label] = el; }}
                >
                  {hasDropdown ? (
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                        isActive 
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" 
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                      }`}
                      aria-expanded={openDropdown === link.label}
                    >
                      {link.label}
                      <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`block px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                        isActive 
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" 
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  )}
                  
                  {/* Dropdown Menu */}
                  {hasDropdown && openDropdown === link.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-gray-800 border-l border-t border-gray-100 dark:border-gray-700 rotate-45"></div>
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className={`block px-4 py-3 text-sm transition-colors duration-150 mx-2 rounded-xl ${
                            isLinkActive(item.href)
                              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right section: search + dark mode + notifications + auth */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              aria-label="Open search"
            >
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            
            {/* Theme selector dropdown */}
            <div className="relative" ref={themeDropdownRef}>
              <button
                type="button"
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label="Toggle theme"
                aria-expanded={themeDropdownOpen}
              >
                {getThemeIcon()}
              </button>
              
              {/* Theme dropdown menu */}
              {themeDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="absolute -top-1 right-4 w-2 h-2 bg-white dark:bg-gray-800 border-l border-t border-gray-100 dark:border-gray-700 rotate-45"></div>
                  <button
                    onClick={() => { setTheme('light'); setThemeDropdownOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 mx-2 rounded-xl ${
                      theme === 'light' 
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" 
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <MoonIcon className="h-4 w-4" />
                    Light
                  </button>
                  <button
                    onClick={() => { setTheme('dark'); setThemeDropdownOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 mx-2 rounded-xl ${
                      theme === 'dark' 
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" 
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <SunIcon className="h-4 w-4" />
                    Dark
                  </button>
                  <button
                    onClick={() => { setTheme('system'); setThemeDropdownOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 mx-2 rounded-xl ${
                      theme === 'system' 
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" 
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <ComputerDesktopIcon className="h-4 w-4" />
                    System
                  </button>
                </div>
              )}
            </div>

            {/* Notifications - only show if user is logged in */}
            {user && (
              <button
                type="button"
                className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label="Notifications"
              >
                <BellIcon className="h-5 w-5" aria-hidden="true" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            )}

            {/* Auth section - refined design */}
            {loading ? (
              <div className="h-9 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full hidden sm:block"></div>
            ) : user ? (
              <div className="hidden sm:flex items-center gap-2 ml-2">
                <Link href="/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white shadow-md hover:shadow-lg transition-shadow duration-200" aria-label="Open profile">
                  {(user.fullName || user.email || "T").slice(0, 1).toUpperCase()}
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 ml-2">
                <Link href="/login">
                  <Button variant="ghost" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="text-sm font-medium px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
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

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 top-[68px] bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[68px] z-50 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-[calc(100dvh-68px)] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-gray-100/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl px-4 py-4 space-y-2 overscroll-contain">
          {mobileLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/') || (link.href !== '/' && pathname.includes(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-4 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isActive 
                    ? "border-blue-500/50 bg-blue-50 dark:bg-blue-900/30 shadow-md" 
                    : "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:-translate-y-0.5 hover:border-blue-400/50 hover:shadow-sm"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{link.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className={`font-semibold text-base ${isActive ? "text-blue-700 dark:text-blue-400" : "text-gray-900 dark:text-gray-100"}`}>{link.label}</p>
                  {link.description && <p className="text-sm text-gray-500 dark:text-gray-400">{link.description}</p>}
                </div>
                <span className={`text-xl transition-all duration-300 ${isActive ? "text-blue-500 translate-x-1" : "text-gray-400"}`} aria-hidden="true">→</span>
              </Link>
            );
          })}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-6 mt-4 space-y-3">
            {loading ? (
              <div className="h-12 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-2xl"></div>
            ) : user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white">
                    {(user.fullName || user.email || "T").slice(0, 1).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">{user.fullName || user.email}</p>
                    <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-full">
                      {user.role}
                    </span>
                  </div>
                </div>
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  View Profile
                </Link>
                <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  Settings
                </Link>
                <Button variant="outline" onClick={handleLogout} className="w-full rounded-2xl py-3">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-2xl py-3 text-base">Login</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full rounded-2xl py-3 text-base">Get Started</Button>
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

// Add id to main content areas for skip link
// This is used in pages that use this Navbar
export const NavbarSkipLinkId = 'main-content';