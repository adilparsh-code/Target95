"use client";

import { useState } from "react";
import SettingCard from "./SettingCard";
import SectionHeader from "./SectionHeader";

const techStack = [
  { name: "Next.js 15", description: "React framework with App Router" },
  { name: "React 19", description: "UI component library" },
  { name: "Tailwind CSS v4", description: "Utility-first CSS framework" },
  { name: "Geist Font", description: "Typography system by Vercel" },
];

const contributors = [
  { name: "Adil Parshionikar", role: "Lead Developer", avatar: "AP" },
  { name: "Target95 Team", role: "Product Design", avatar: "T95" },
];

const releaseNotes = [
  { version: "v2.5.1", date: "July 15, 2026", notes: ["Complete admin settings UI with 11 tabs", "Enhanced security dashboard", "Role-based permission matrix", "Backup management system"] },
  { version: "v2.5.0", date: "July 10, 2026", notes: ["Teacher management module", "Student management system", "Action menu component"] },
  { version: "v2.4.0", date: "June 28, 2026", notes: ["Analytics dashboard with KPIs", "Performance charts", "Data export functionality"] },
  { version: "v2.3.0", date: "June 15, 2026", notes: ["Student CRUD operations", "Student filters and search", "Student detail pages"] },
  { version: "v2.2.0", date: "June 1, 2026", notes: ["Initial admin panel", "Dashboard layout", "Sidebar navigation"] },
];

const roadmap = [
  { quarter: "Q3 2026", items: ["Firebase integration", "Real-time data sync", "Email notification system"] },
  { quarter: "Q4 2026", items: ["Payment gateway", "Subscription plans", "Advanced reporting"] },
  { quarter: "Q1 2027", items: ["Mobile app", "Offline mode", "AI-powered recommendations"] },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "About" },
    { id: "releases", label: "Release Notes" },
    { id: "roadmap", label: "Roadmap" },
    { id: "legal", label: "Legal" },
  ];

  return (
    <div className="space-y-4">
      {/* Sub tabs */}
      <div className="flex gap-1 bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "about" && (
        <>
          {/* Brand Info */}
          <SettingCard>
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold text-white">T95</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Target95+</h2>
              <p className="text-sm text-gray-500 mt-1">AI-Powered Learning Platform for ICSE & ISC Computer Science</p>
              <p className="text-xs text-gray-400 mt-1">Version 2.5.1</p>
            </div>
          </SettingCard>

          {/* Description */}
          <SettingCard>
            <SectionHeader icon="📖" title="About the Platform" />
            <p className="text-sm text-gray-600 leading-relaxed">
              Target95+ is a comprehensive learning platform designed specifically for ICSE and ISC Computer Science students.
              It provides interactive question banks, mock tests, study notes, and performance analytics to help students
              achieve a 95%+ score in their board examinations.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mt-3">
              The platform features an AI-powered tutor, personalized learning paths, detailed progress tracking,
              and a collaborative environment where teachers can create content and monitor student performance.
            </p>
          </SettingCard>

          {/* Tech Stack */}
          <SettingCard>
            <SectionHeader icon="⚙️" title="Technology Stack" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {techStack.map((tech) => (
                <div key={tech.name} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-3 h-3 mt-1 bg-blue-500 rounded-full shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{tech.name}</p>
                    <p className="text-xs text-gray-500">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </SettingCard>

          {/* Contributors */}
          <SettingCard>
            <SectionHeader icon="👥" title="Contributors" />
            <div className="flex flex-wrap gap-4">
              {contributors.map((person) => (
                <div key={person.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {person.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{person.name}</p>
                    <p className="text-xs text-gray-500">{person.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </SettingCard>

          {/* Links */}
          <SettingCard>
            <SectionHeader icon="🔗" title="Official Links" />
            <div className="space-y-2">
              {[
                { label: "Documentation", icon: "📄" },
                { label: "Report a Bug", icon: "🐛" },
                { label: "Request a Feature", icon: "💡" },
                { label: "Contact Support", icon: "📧" },
                { label: "GitHub Repository", icon: "🐙" },
              ].map((link) => (
                <a
                  key={link.label}
                  href="#"
                  className="flex items-center gap-2 p-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <span>{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </SettingCard>
        </>
      )}

      {activeTab === "releases" && (
        <SettingCard>
          <SectionHeader icon="📋" title="Release Notes" description="Version history and changelog" />
          <div className="space-y-6">
            {releaseNotes.map((release) => (
              <div key={release.version} className="border-b border-gray-100 last:border-0 pb-5 last:pb-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-600 text-white rounded-full">{release.version}</span>
                  <span className="text-xs text-gray-500">{release.date}</span>
                </div>
                <ul className="space-y-1.5">
                  {release.notes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SettingCard>
      )}

      {activeTab === "roadmap" && (
        <SettingCard>
          <SectionHeader icon="🗺️" title="Roadmap" description="Planned features and improvements" />
          <div className="space-y-6">
            {roadmap.map((quarter) => (
              <div key={quarter.quarter} className="relative pl-6 border-l-2 border-blue-200">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-2 border-white" />
                <h4 className="text-sm font-semibold text-gray-900 mb-2">{quarter.quarter}</h4>
                <ul className="space-y-1.5">
                  {quarter.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SettingCard>
      )}

      {activeTab === "legal" && (
        <>
          <SettingCard>
            <SectionHeader icon="📜" title="License" description="MIT License" />
            <p className="text-sm text-gray-600 leading-relaxed">
              MIT License
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mt-2">
              Copyright &copy; {new Date().getFullYear()} Target95+. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mt-2">
              Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files...
            </p>
          </SettingCard>

          <SettingCard>
            <SectionHeader icon="🙏" title="Credits" />
            <div className="space-y-3">
              {[
                { name: "Vercel", role: "Next.js framework & hosting" },
                { name: "Tailwind Labs", role: "CSS framework" },
                { name: "React Team", role: "UI library" },
                { name: "Open Source Community", role: "Various packages & tools" },
              ].map((credit) => (
                <div key={credit.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">{credit.name}</span>
                  <span className="text-xs text-gray-500">{credit.role}</span>
                </div>
              ))}
            </div>
          </SettingCard>
        </>
      )}

      <p className="text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Target95+. All rights reserved.
      </p>
    </div>
  );
}