"use client";

import React, { memo } from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import Button from "./ui/Button";
import Container from "./ui/Container";
import { useAuth } from "@/context/AuthContext";
import { usePersonalization } from "../hooks/usePersonalization";
import StudentGlobalSearch from "./StudentGlobalSearch";
import {
  MagnifyingGlassIcon, Bars3Icon, XMarkIcon, SunIcon, MoonIcon,
  ChevronDownIcon, BellIcon, ComputerDesktopIcon
} from "@heroicons/react/24/outline";

const primaryLinks = [
  { href: "/", label: "Home" },
  {
    label: "Learn",
    dropdown: [
      { href: "/study", label: "Subjects" },
      { href: "/Java", label: "Chapters" },
      { href: "/isc", label: "ICSE & ISC" },
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

const mobileLinks = [
  { href: "/", label: "Home", description: "Overview", icon: "🏠" },
  { href: "/dashboard", label: "Dashboard", description: "Progress", icon: "📊" },
  { href: "/study", label: "Study", description: "Chapters", icon: "📖" },
  { href: "/isc", label: "ICSE & ISC", description: "Class IX-XII", icon: "🎓" },
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

export default memo(function Navbar() {
  const { user, logout, loading } = useAuth();
  const { theme, setTheme } = useTheme();
  const { board, class: selectedClassData, isHydrated } = usePersonalization();
  const router = useRouter();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRefs = useRef({});
  const themeDropdownRef = useRef(null);

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

  useEffect(() => {
    if (mobileMenuOpen) {
      const focusableElements = document.querySelectorAll('.xl\\:hidden [href], .xl\\:hidden button, .xl\\:hidden [tabindex]:not([tabindex="-1"])');
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
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/92 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/88 dark:shadow-[0_10px_34px_rgba(0,0,0,0.24)] supports-[backdrop-filter]:bg-white/78 dark:supports-[backdrop-filter]:bg-slate-950/78">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg">
        Skip to main content
      </a>
      <Container>
        <div className="flex h-[72px] items-center gap-4">
          <Link href="/" className="group flex shrink-0 items-center gap-3 rounded-2xl px-1 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60" aria-label="Target95+ home">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-blue-100 bg-blue-50 text-xl shadow-sm transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-105 dark:border-blue-900/60 dark:bg-blue-950/60">🎯</span>
            <span className="hidden text-[17px] font-black tracking-[-0.035em] text-slate-950 sm:block dark:text-white">Target95<span className="text-blue-600 dark:text-blue-400">+</span></span>
            <span className="text-[17px] font-black tracking-[-0.035em] text-slate-950 sm:hidden dark:text-white">T95<span className="text-blue-600 dark:text-blue-400">+</span></span>
          </Link>

          {isHydrated && board && selectedClassData && (
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50/90 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-slate-600 lg:flex dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
              <span className="text-blue-600 dark:text-blue-400">●</span>
              <span>{board.toUpperCase()}</span>
              <span className="text-slate-300 dark:text-slate-600">/</span>
              <span>{selectedClassData.title}</span>
            </div>
          )}

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <div className="flex items-center rounded-2xl border border-slate-200/80 bg-slate-50/80 p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900/55">
              {primaryLinks.map((link) => {
                const isActive = link.href ? isLinkActive(link.href) : link.dropdown?.some(item => isLinkActive(item.href));
                const hasDropdown = !!link.dropdown;
                return (
                  <div key={link.label} className="relative" ref={(el) => { dropdownRefs.current[link.label] = el; }}>
                    {hasDropdown ? (
                      <button
                        onClick={() => toggleDropdown(link.label)}
                        className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${isActive || openDropdown === link.label ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white' : 'text-slate-600 hover:bg-white/80 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/75 dark:hover:text-white'}`}
                        aria-expanded={openDropdown === link.label}
                      >
                        {link.label}
                        <ChevronDownIcon className={`h-3.5 w-3.5 transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <Link href={link.href} className={`block rounded-xl px-3.5 py-2 text-[13px] font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${isActive ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-800 dark:text-blue-300' : 'text-slate-600 hover:bg-white/80 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/75 dark:hover:text-white'}`} aria-current={isActive ? 'page' : undefined}>
                        {link.label}
                      </Link>
                    )}
                    {hasDropdown && openDropdown === link.label && (
                      <div className="absolute left-1/2 top-full z-50 mt-3 w-60 -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_20px_55px_rgba(15,23,42,0.16)] animate-in fade-in slide-in-from-top-1 duration-150 dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_20px_55px_rgba(0,0,0,0.38)]">
                        {link.dropdown.map((item) => (
                          <Link key={item.href} href={item.href} onClick={() => setOpenDropdown(null)} className={`flex items-center rounded-xl px-3.5 py-3 text-sm font-medium transition-colors ${isLinkActive(item.href) ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white'}`}>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button type="button" onClick={() => setSearchOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-transparent text-slate-500 transition-colors hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:border-slate-800 dark:hover:bg-slate-900 dark:hover:text-white" aria-label="Open search">
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="relative" ref={themeDropdownRef}>
              <button type="button" onClick={() => setThemeDropdownOpen(!themeDropdownOpen)} className="grid h-10 w-10 place-items-center rounded-xl border border-transparent text-slate-500 transition-colors hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:border-slate-800 dark:hover:bg-slate-900 dark:hover:text-white" aria-label="Toggle theme" aria-expanded={themeDropdownOpen}>
                {getThemeIcon()}
              </button>
              {themeDropdownOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-40 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_20px_55px_rgba(15,23,42,0.16)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_20px_55px_rgba(0,0,0,0.38)]">
                  {[
                    ['light', 'Light', MoonIcon],
                    ['dark', 'Dark', SunIcon],
                    ['system', 'System', ComputerDesktopIcon],
                  ].map(([value, label, Icon]) => (
                    <button key={value} onClick={() => { setTheme(value); setThemeDropdownOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium ${theme === value ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'}`}>
                      <Icon className="h-4 w-4" />{label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {user && (
              <button type="button" className="relative grid h-10 w-10 place-items-center rounded-xl border border-transparent text-slate-500 transition-colors hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:border-slate-800 dark:hover:bg-slate-900 dark:hover:text-white" aria-label="Notifications">
                <BellIcon className="h-5 w-5" aria-hidden="true" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
              </button>
            )}
            {loading ? (
              <div className="hidden h-10 w-20 animate-pulse rounded-xl bg-slate-100 sm:block dark:bg-slate-800" />
            ) : user ? (
              <Link href="/profile" className="hidden h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm transition-transform hover:scale-105 sm:flex" aria-label="Open profile">
                {(user.fullName || user.email || 'T').slice(0, 1).toUpperCase()}
              </Link>
            ) : (
              <div className="hidden items-center gap-1 sm:flex">
                <Link href="/login"><Button variant="ghost" className="h-10 rounded-xl px-3.5 text-sm font-semibold">Login</Button></Link>
                <Link href="/register"><Button className="h-10 rounded-xl px-4 text-sm font-semibold">Get Started</Button></Link>
              </div>
            )}
            <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 lg:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200/80 py-4 dark:border-slate-800/80">
            <div className="grid gap-1.5 pb-2">
              {mobileLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors ${active ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900'}`}>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-lg dark:bg-slate-800">{link.icon}</span>
                    <span className="min-w-0"><span className="block text-sm font-semibold">{link.label}</span><span className="block text-xs text-slate-500 dark:text-slate-400">{link.description}</span></span>
                  </Link>
                );
              })}
            </div>
            {!user && !loading && <div className="grid grid-cols-2 gap-2 border-t border-slate-200 pt-4 dark:border-slate-800"><Link href="/login" onClick={() => setMobileMenuOpen(false)}><Button variant="outline" className="w-full">Login</Button></Link><Link href="/register" onClick={() => setMobileMenuOpen(false)}><Button className="w-full">Get Started</Button></Link></div>}
          </div>
        )}
      </Container>
      {searchOpen && <StudentGlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />}
    </nav>
  );
});
