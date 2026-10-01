"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePersonalization } from "../hooks/usePersonalization";
import StudentGlobalSearch from "./StudentGlobalSearch";

const primaryLinks = [
  { href: "/", label: "Home" },
  { label: "Learn", dropdown: [
    { href: "/study", label: "Syllabus" },
    { href: "/office", label: "Microsoft Office" },
    { href: "/Java", label: "Chapters" },
    { href: "/isc", label: "ICSE & ISC" },
  ]},
  { label: "Practice", dropdown: [
    { href: "/question-bank", label: "Chapter MCQs" },
    { href: "/mock-test", label: "Mock Tests" },
    { href: "/question-bank", label: "Question Bank" },
  ]},
  { href: "/question-bank", label: "Question Bank" },
  { href: "/ai-tutor", label: "AI Tutor" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/blog", label: "Blog" },
];

const mobileLinks = [
  { href: "/", label: "Home", description: "Overview", icon: "⌂" },
  { href: "/study", label: "Learn", description: "Syllabus & chapters", icon: "▤" },
  { href: "/question-bank", label: "Question Bank", description: "Practice questions", icon: "▣" },
  { href: "/mock-test", label: "Mock Tests", description: "Exam simulation", icon: "◷" },
  { href: "/dashboard", label: "Dashboard", description: "Your progress", icon: "◌" },
  { href: "/ai-tutor", label: "AI Tutor", description: "Hints & explanations", icon: "✦" },
  { href: "/blog", label: "Blog", description: "News & insights", icon: "•" },
];

function Logo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 240 60" className="h-8 w-auto sm:h-9">
      <rect width="44" height="44" x="8" y="8" rx="12" fill="#2563EB"/>
      <circle cx="30" cy="30" r="14" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.4"/>
      <circle cx="30" cy="30" r="8" stroke="#FFFFFF" strokeWidth="2.5"/>
      <circle cx="30" cy="30" r="3" fill="#60A5FA"/>
      <path d="M30 11V16M30 44V49M11 30H16M44 30H49" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
      <text x="62" y="37" fontFamily="system-ui, -apple-system, sans-serif" fontSize="22" fontWeight="800" fill="#0F172A" letterSpacing="-0.03em">
        Target<tspan fill="#2563EB">95</tspan><tspan fill="#3B82F6" fontWeight="600" fontSize="20">+</tspan>
      </text>
    </svg>
  );
}

export default memo(function Navbar() {
  const { user, logout, loading } = useAuth();
  const { board, class: selectedClassData, isHydrated, setBoard, setClass } = usePersonalization();
  const router = useRouter();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const contextLabel = selectedClassData?.title ? selectedClassData.title : "ICSE • Class 10 (Computer Applications)";
  const boardLabel = board === "cbse" ? "CBSE" : "ICSE / ISC";
  const active = (href) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && (setOpenDropdown(null), setSearchOpen(false), setMenuOpen(false));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (openDropdown && dropdownRefs.current[openDropdown] && !dropdownRefs.current[openDropdown].contains(e.target)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [openDropdown]);

  const contextClassId = selectedClassData?.id || "icse-class-10";
  const classText = selectedClassData?.title
    ? selectedClassData.title.replace(/^ICSE |^ISC |^CBSE /, "")
    : "Class 10 (Computer Applications)";

  const handleContext = () => {
    setBoard?.(board || "cisce");
    setClass?.(selectedClassData || { id: contextClassId, title: "ICSE Class 10" });
    router.push("/");
  };

  const navLink = (item) => (
    <div key={item.href || item.label} className="relative" ref={(el) => item.dropdown && (dropdownRefs.current[item.label] = el)}>
      {item.dropdown ? (
        <>
          <button type="button" onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)} className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${openDropdown === item.label || item.dropdown.some((x) => active(x.href)) ? "bg-slate-100 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`} aria-expanded={openDropdown === item.label}>
            {item.label}<span className="text-[15px]">⌄</span>
          </button>
          {openDropdown === item.label && (
            <div className="absolute left-0 top-full z-50 pt-2">
              <div className="w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                {item.dropdown.map((sub) => <Link key={sub.href + sub.label} href={sub.href} onClick={() => setOpenDropdown(null)} className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">{sub.label}</Link>)}
              </div>
            </div>
          )}
        </>
      ) : (
        <Link href={item.href} className={`block rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${active(item.href) ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`} aria-current={active(item.href) ? "page" : undefined}>{item.label}</Link>
      )}
    </div>
  );

  return (
    <header className="stitch-nav fixed left-0 right-0 top-0 z-50 border-b border-slate-200/90 bg-white/95 shadow-[0_1px_3px_rgba(15,23,42,0.05)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-3 xl:gap-5">
          <Link href="/" className="flex shrink-0 items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50" aria-label="Target95+ Home"><Logo /></Link>
          <nav className="hidden items-center gap-0.5 xl:flex">
            {primaryLinks.map(navLink)}
          </nav>
        </div>

        <div className="hidden min-w-0 flex-1 justify-center xl:flex">
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-0.5">
            <button type="button" onClick={() => router.push("/practice")} className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm">✦ <span>Practice Mode (with AI Hints)</span></button>
            <button type="button" onClick={() => router.push("/mock-test")} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:text-slate-950">◷ <span>Timed Exam Simulation</span></button>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {isHydrated && (
            <button type="button" onClick={handleContext} className="hidden max-w-[300px] items-center gap-2 rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-left text-xs font-semibold text-teal-800 transition hover:bg-teal-100 md:flex" title="Change target academic board and class">
              <span className="h-2 w-2 shrink-0 rounded-full bg-teal-600" />
              <span className="truncate">{boardLabel} • {classText}</span>
              <span className="text-[15px] text-teal-700">⌄</span>
            </button>
          )}
          <button type="button" onClick={() => setSearchOpen(true)} className="hidden h-9 items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-2.5 text-xs font-medium text-slate-600 hover:bg-slate-200 sm:flex" title="Quick Search">⌕ <span className="hidden lg:inline">Quick search...</span><kbd className="hidden lg:inline rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400">⌘K</kbd></button>
          {user && <span className="hidden items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-700 lg:flex">🔥 7D STREAK</span>}
          <span className="hidden items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-800 xl:flex">🎯 TARGET 95+</span>
          {user ? (
            <Link href="/profile" className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white pl-1.5 pr-2.5 py-1 transition hover:bg-slate-50">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white">{(user.fullName || user.email || "R").slice(0,1).toUpperCase()}</span>
              <span className="hidden max-w-[110px] text-left sm:flex sm:flex-col">
                <span className="text-xs font-bold leading-tight text-slate-900">{user.fullName || "Student"}</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">{classText}</span>
              </span>
            </Link>
          ) : !loading ? (
            <div className="hidden items-center gap-1 sm:flex">
              <Link href="/login" className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100">Login</Link>
              <Link href="/register" className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700">Get Started</Link>
            </div>
          ) : null}
          <button type="button" onClick={() => setMenuOpen((v) => !v)} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 lg:hidden" aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? "×" : "☰"}</button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
          <div className="grid gap-1">{mobileLinks.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 ${active(item.href) ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"}`}><span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-sm">{item.icon}</span><span><span className="block text-sm font-semibold">{item.label}</span><span className="block text-xs text-slate-500">{item.description}</span></span></Link>)}</div>
          {!user && !loading && <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-200 pt-3"><Link href="/login" onClick={() => setMenuOpen(false)} className="rounded-lg border px-3 py-2 text-center text-sm font-semibold">Login</Link><Link href="/register" onClick={() => setMenuOpen(false)} className="rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white">Get Started</Link></div>}
        </div>
      )}
      {searchOpen && <StudentGlobalSearch isOpen onClose={() => setSearchOpen(false)} />}
    </header>
  );
});
