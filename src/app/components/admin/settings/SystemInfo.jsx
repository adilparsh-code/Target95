"use client";

import { useState } from "react";
import SettingCard from "./SettingCard";
import SectionHeader from "./SectionHeader";

const systemDetails = [
  { label: "Platform Version", value: "v2.5.1", status: "stable" },
  { label: "Last Updated", value: "July 15, 2026", status: "info" },
  { label: "Node.js Version", value: "20.11.0", status: "stable" },
  { label: "Next.js Version", value: "15.0.0", status: "stable" },
  { label: "React Version", value: "19.0.0", status: "stable" },
  { label: "Database", value: "Firebase Firestore (Planned)", status: "pending" },
  { label: "Authentication", value: "Firebase Auth (Planned)", status: "pending" },
  { label: "Hosting", value: "Vercel (Planned)", status: "pending" },
  { label: "Environment", value: "Development", status: "stable" },
  { label: "Build Tool", value: "Turbopack", status: "stable" },
  { label: "CSS Framework", value: "Tailwind CSS v4", status: "stable" },
  { label: "Package Manager", value: "npm", status: "stable" },
];

const dependencies = [
  { name: "next", version: "15.0.0", status: "uptodate" },
  { name: "react", version: "19.0.0", status: "uptodate" },
  { name: "react-dom", version: "19.0.0", status: "uptodate" },
  { name: "tailwindcss", version: "4.0.0", status: "uptodate" },
  { name: "eslint", version: "9.x", status: "uptodate" },
];

const recentUpdates = [
  { date: "2026-07-15", description: "Admin settings UI overhaul", version: "v2.5.1" },
  { date: "2026-07-10", description: "Teacher management module", version: "v2.5.0" },
  { date: "2026-06-28", description: "Analytics dashboard", version: "v2.4.0" },
  { date: "2026-06-15", description: "Student management", version: "v2.3.0" },
  { date: "2026-06-01", description: "Initial admin panel", version: "v2.2.0" },
];

const storageCards = [
  { title: "Total Storage", value: "50 GB", icon: "💾", used: "", color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50" },
  { title: "Used Storage", value: "11.6 GB", icon: "📀", used: "23%", color: "from-amber-500 to-amber-600", bgColor: "bg-amber-50" },
  { title: "Available Storage", value: "38.4 GB", icon: "💿", used: "77%", color: "from-emerald-500 to-emerald-600", bgColor: "bg-emerald-50" },
  { title: "Backup Storage", value: "2.4 GB", icon: "🗄️", used: "Last backup", color: "from-violet-500 to-violet-600", bgColor: "bg-violet-50" },
];

export default function SystemInfo() {
  const [activeTab, setActiveTab] = useState("info");

  const tabs = [
    { id: "info", label: "System Info" },
    { id: "health", label: "Health" },
    { id: "dependencies", label: "Dependencies" },
    { id: "updates", label: "Updates" },
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

      {activeTab === "info" && (
        <>
          {/* Storage Usage Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {storageCards.map((card) => (
              <div
                key={card.title}
                className={`${card.bgColor} rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-lg shadow-sm`}>
                    {card.icon}
                  </div>
                </div>
                {card.used && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${card.color} rounded-full`}
                        style={{ width: card.used }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{card.used}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* System Info Details */}
          <SettingCard>
            <SectionHeader icon="ℹ️" title="System Information" description="Technical details about the platform installation" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
              {systemDetails.map((item) => {
                const statusColors = {
                  stable: "bg-emerald-500",
                  pending: "bg-amber-500",
                  info: "bg-blue-500",
                };
                return (
                  <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-gray-50">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-900">
                      <span className={`w-1.5 h-1.5 rounded-full ${statusColors[item.status] || "bg-gray-400"}`} />
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </SettingCard>
        </>
      )}

      {activeTab === "health" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SettingCard>
            <SectionHeader icon="🖥️" title="Server Health" description="Current server status" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-emerald-700">All Systems Operational</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">CPU Usage</span>
                  <span className="font-medium text-gray-900">23%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "23%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Memory Usage</span>
                  <span className="font-medium text-gray-900">1.2 GB / 4 GB</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "30%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Disk Usage</span>
                  <span className="font-medium text-gray-900">11.6 GB / 50 GB</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "23%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Uptime</span>
                  <span className="font-medium text-gray-900">12d 7h 34m</span>
                </div>
              </div>
            </div>
          </SettingCard>

          <SettingCard>
            <SectionHeader icon="🗄️" title="Database Status" description="Connected services" />
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="text-sm text-gray-700">Firebase Firestore</span>
                </div>
                <span className="text-xs text-amber-600 font-medium">Planned</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="text-sm text-gray-700">Firebase Auth</span>
                </div>
                <span className="text-xs text-amber-600 font-medium">Planned</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-sm text-gray-700">Local Storage</span>
                </div>
                <span className="text-xs text-emerald-600 font-medium">Active</span>
              </div>
            </div>
          </SettingCard>
        </div>
      )}

      {activeTab === "dependencies" && (
        <SettingCard>
          <SectionHeader icon="📦" title="Dependencies" description="Installed packages and versions" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dependencies.map((dep) => (
              <div key={dep.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{dep.name}</p>
                  <p className="text-xs text-gray-500">{dep.version}</p>
                </div>
                <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  {dep.status === "uptodate" ? "✓ Up to date" : dep.status}
                </span>
              </div>
            ))}
          </div>
        </SettingCard>
      )}

      {activeTab === "updates" && (
        <SettingCard>
          <SectionHeader icon="📋" title="Recent Updates" description="Platform update history" />
          <div className="space-y-0">
            {recentUpdates.map((update, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0">
                <div className="w-20 shrink-0">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{update.version}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{update.description}</p>
                </div>
                <span className="text-xs text-gray-500 shrink-0">{update.date}</span>
              </div>
            ))}
          </div>
        </SettingCard>
      )}
    </div>
  );
}