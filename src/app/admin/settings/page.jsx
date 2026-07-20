"use client";

import { useState } from "react";
import SectionTitle from "@/app/components/admin/SectionTitle";
import ProfileSettings from "@/app/components/admin/settings/ProfileSettings";
import AppearanceSettings from "@/app/components/admin/settings/AppearanceSettings";
import RolesPermissions from "@/app/components/admin/settings/RolesPermissions";
import SecuritySettings from "@/app/components/admin/settings/SecuritySettings";
import SystemInfo from "@/app/components/admin/settings/SystemInfo";
import BackupSettings from "@/app/components/admin/settings/BackupSettings";
import AboutPage from "@/app/components/admin/settings/AboutPage";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    siteName: "Target95",
    siteDescription: "AI-powered learning platform for ICSE & ISC Computer Science",
    contactEmail: "admin@target95.com",
    maintenanceMode: false,
    enableRegistration: true,
    requireApproval: false,
    defaultGrade: "ICSE",
    maxQuestionsPerTest: 50,
    passingScore: 40,
    timeLimitPerQuestion: 120,
    enableAiTutor: true,
    enableMockTests: true,
    enableAnalytics: true,
    enableLeaderboard: false,
    emailNotifications: true,
    weeklyDigest: true,
    newUserAlert: true,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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

  return (
    <div className="space-y-6">
      <SectionTitle title="Settings" subtitle="Configure platform preferences" />

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
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

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                <input
                  type="text"
                  value={formData.siteName}
                  onChange={(e) => handleChange("siteName", e.target.value)}
                  className="w-full max-w-md px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
                <textarea
                  value={formData.siteDescription}
                  onChange={(e) => handleChange("siteDescription", e.target.value)}
                  rows={2}
                  className="w-full max-w-lg px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                  className="w-full max-w-md px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <hr className="border-gray-100" />
              <div className="flex items-center justify-between max-w-md">
                <div>
                  <p className="text-sm font-medium text-gray-700">Maintenance Mode</p>
                  <p className="text-xs text-gray-500">Temporarily disable access for all users</p>
                </div>
                <button
                  onClick={() => handleChange("maintenanceMode", !formData.maintenanceMode)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    formData.maintenanceMode ? "bg-red-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      formData.maintenanceMode ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between max-w-md">
                <div>
                  <p className="text-sm font-medium text-gray-700">Enable Registration</p>
                  <p className="text-xs text-gray-500">Allow new users to sign up</p>
                </div>
                <button
                  onClick={() => handleChange("enableRegistration", !formData.enableRegistration)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    formData.enableRegistration ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      formData.enableRegistration ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between max-w-md">
                <div>
                  <p className="text-sm font-medium text-gray-700">Require Admin Approval</p>
                  <p className="text-xs text-gray-500">New accounts need admin approval</p>
                </div>
                <button
                  onClick={() => handleChange("requireApproval", !formData.requireApproval)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    formData.requireApproval ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      formData.requireApproval ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Profile Settings */}
      {activeTab === "profile" && <ProfileSettings />}

      {/* Academic Settings */}
      {activeTab === "academic" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Grade</label>
                <select
                  value={formData.defaultGrade}
                  onChange={(e) => handleChange("defaultGrade", e.target.value)}
                  className="w-full max-w-md px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>ICSE</option>
                  <option>ISC</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Questions Per Test</label>
                <input
                  type="number"
                  value={formData.maxQuestionsPerTest}
                  onChange={(e) => handleChange("maxQuestionsPerTest", Number(e.target.value))}
                  className="w-full max-w-xs px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Passing Score (%)</label>
                <input
                  type="number"
                  value={formData.passingScore}
                  onChange={(e) => handleChange("passingScore", Number(e.target.value))}
                  className="w-full max-w-xs px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Limit Per Question (seconds)</label>
                <input
                  type="number"
                  value={formData.timeLimitPerQuestion}
                  onChange={(e) => handleChange("timeLimitPerQuestion", Number(e.target.value))}
                  className="w-full max-w-xs px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              Save Academic Settings
            </button>
          </div>
        </div>
      )}

      {/* Features Settings */}
      {activeTab === "features" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="space-y-5">
              <div className="flex items-center justify-between max-w-md">
                <div>
                  <p className="text-sm font-medium text-gray-700">AI Tutor</p>
                  <p className="text-xs text-gray-500">Enable AI-powered explanations</p>
                </div>
                <button
                  onClick={() => handleChange("enableAiTutor", !formData.enableAiTutor)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    formData.enableAiTutor ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      formData.enableAiTutor ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between max-w-md">
                <div>
                  <p className="text-sm font-medium text-gray-700">Mock Tests</p>
                  <p className="text-xs text-gray-500">Enable mock test functionality</p>
                </div>
                <button
                  onClick={() => handleChange("enableMockTests", !formData.enableMockTests)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    formData.enableMockTests ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      formData.enableMockTests ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between max-w-md">
                <div>
                  <p className="text-sm font-medium text-gray-700">Analytics</p>
                  <p className="text-xs text-gray-500">Enable performance analytics dashboard</p>
                </div>
                <button
                  onClick={() => handleChange("enableAnalytics", !formData.enableAnalytics)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    formData.enableAnalytics ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      formData.enableAnalytics ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between max-w-md">
                <div>
                  <p className="text-sm font-medium text-gray-700">Leaderboard</p>
                  <p className="text-xs text-gray-500">Show student rankings</p>
                </div>
                <button
                  onClick={() => handleChange("enableLeaderboard", !formData.enableLeaderboard)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    formData.enableLeaderboard ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      formData.enableLeaderboard ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              Save Feature Settings
            </button>
          </div>
        </div>
      )}

      {/* Notifications Settings */}
      {activeTab === "notifications" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="space-y-5">
              <div className="flex items-center justify-between max-w-md">
                <div>
                  <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                  <p className="text-xs text-gray-500">Receive email updates about platform activity</p>
                </div>
                <button
                  onClick={() => handleChange("emailNotifications", !formData.emailNotifications)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    formData.emailNotifications ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      formData.emailNotifications ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between max-w-md">
                <div>
                  <p className="text-sm font-medium text-gray-700">Weekly Digest</p>
                  <p className="text-xs text-gray-500">Weekly summary of platform metrics</p>
                </div>
                <button
                  onClick={() => handleChange("weeklyDigest", !formData.weeklyDigest)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    formData.weeklyDigest ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      formData.weeklyDigest ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between max-w-md">
                <div>
                  <p className="text-sm font-medium text-gray-700">New User Alerts</p>
                  <p className="text-xs text-gray-500">Get notified when new users register</p>
                </div>
                <button
                  onClick={() => handleChange("newUserAlert", !formData.newUserAlert)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    formData.newUserAlert ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      formData.newUserAlert ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              Save Notification Settings
            </button>
          </div>
        </div>
      )}

      {/* Appearance Settings */}
      {activeTab === "appearance" && <AppearanceSettings />}

      {/* Security Settings */}
      {activeTab === "security" && <SecuritySettings />}

      {/* Roles & Permissions */}
      {activeTab === "roles" && <RolesPermissions />}

      {/* Backup Settings */}
      {activeTab === "backup" && <BackupSettings />}

      {/* System Information */}
      {activeTab === "system" && <SystemInfo />}

      {/* About Page */}
      {activeTab === "about" && <AboutPage />}
    </div>
  );
}