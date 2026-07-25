"use client";

import { useState } from "react";
import SettingCard from "./SettingCard";
import SectionHeader from "./SectionHeader";
import ToggleItem from "./ToggleItem";
import SaveBar from "./SaveBar";

const initialData = {
  siteName: "Target95",
  siteDescription: "AI-powered learning platform for ICSE & ISC Computer Science",
  contactEmail: "admin@target95.com",
  maintenanceMode: false,
  enableRegistration: true,
  requireApproval: false,
};

export default function GeneralSettings() {
  const [form, setForm] = useState({ ...initialData });
  const [saved, setSaved] = useState({ ...initialData });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const hasChanges = JSON.stringify(form) !== JSON.stringify(saved);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setSaved({ ...form });
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const handleReset = () => {
    setForm({ ...saved });
  };

  return (
    <div className="space-y-4">
      {showSuccess && (
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 animate-fade-in">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Settings saved successfully.
        </div>
      )}

      <SettingCard>
        <SectionHeader icon="⚙️" title="General Settings" description="Configure basic platform information" />
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
            <input
              type="text"
              value={form.siteName}
              onChange={(e) => handleChange("siteName", e.target.value)}
              className="w-full max-w-md px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              placeholder="Enter site name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
            <textarea
              value={form.siteDescription}
              onChange={(e) => handleChange("siteDescription", e.target.value)}
              rows={2}
              className="w-full max-w-lg px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              placeholder="Enter site description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              className="w-full max-w-md px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              placeholder="admin@example.com"
            />
            {form.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail) && (
              <p className="mt-1 text-xs text-red-500">Please enter a valid email address</p>
            )}
          </div>
          <hr className="border-gray-100" />
          <ToggleItem
            label="Maintenance Mode"
            description="Temporarily disable access for all users"
            enabled={form.maintenanceMode}
            onChange={(v) => handleChange("maintenanceMode", v)}
            color="red"
          />
          <ToggleItem
            label="Enable Registration"
            description="Allow new users to sign up"
            enabled={form.enableRegistration}
            onChange={(v) => handleChange("enableRegistration", v)}
          />
          <ToggleItem
            label="Require Admin Approval"
            description="New accounts need admin approval before accessing the platform"
            enabled={form.requireApproval}
            onChange={(v) => handleChange("requireApproval", v)}
          />
        </div>
      </SettingCard>

      <div className="flex justify-end">
        <SaveBar onSave={handleSave} onReset={handleReset} hasChanges={hasChanges} isSaving={isSaving} />
      </div>
    </div>
  );
}