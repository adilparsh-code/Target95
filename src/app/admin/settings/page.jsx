"use client";

import { useState } from "react";
import SectionTitle from "@/app/components/admin/SectionTitle";
import GeneralSettings from "@/app/components/admin/settings/GeneralSettings";
import ProfileSettings from "@/app/components/admin/settings/ProfileSettings";
import AcademicSettings from "@/app/components/admin/settings/AcademicSettings";
import FeatureSettings from "@/app/components/admin/settings/FeatureSettings";
import NotificationsSettings from "@/app/components/admin/settings/NotificationsSettings";
import AppearanceSettings from "@/app/components/admin/settings/AppearanceSettings";
import SecuritySettings from "@/app/components/admin/settings/SecuritySettings";
import RolesPermissions from "@/app/components/admin/settings/RolesPermissions";
import BackupSettings from "@/app/components/admin/settings/BackupSettings";
import SystemInfo from "@/app/components/admin/settings/SystemInfo";
import AboutPage from "@/app/components/admin/settings/AboutPage";

const tabs = [
  { id: "general", label: "General" },
  { id: "profile", label: "Profile" },
  { id: "academic", label: "Academic" },
  { id: "features", label: "Features" },
  { id: "notifications", label: "Notifications" },
  { id: "appearance", label: "Appearance" },
  { id: "security", label: "Security" },
  { id: "roles", label: "Roles" },
  { id: "backup", label: "Backup" },
  { id: "system", label: "System" },
  { id: "about", label: "About" },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6">
      <SectionTitle title="Settings" subtitle="Configure platform preferences" />

      {/* Tabs Navigation */}
      <div className="overflow-x-auto">
        <div className="flex gap-1 bg-white rounded-xl border border-gray-200 p-1 shadow-sm min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div role="tabpanel">
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "profile" && <ProfileSettings />}
        {activeTab === "academic" && <AcademicSettings />}
        {activeTab === "features" && <FeatureSettings />}
        {activeTab === "notifications" && <NotificationsSettings />}
        {activeTab === "appearance" && <AppearanceSettings />}
        {activeTab === "security" && <SecuritySettings />}
        {activeTab === "roles" && <RolesPermissions />}
        {activeTab === "backup" && <BackupSettings />}
        {activeTab === "system" && <SystemInfo />}
        {activeTab === "about" && <AboutPage />}
      </div>
    </div>
  );
}