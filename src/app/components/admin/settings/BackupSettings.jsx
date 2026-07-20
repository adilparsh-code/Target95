"use client";

import { useState } from "react";
import SettingCard from "./SettingCard";
import SectionHeader from "./SectionHeader";
import ToggleItem from "./ToggleItem";
import SaveBar from "./SaveBar";

const backupHistory = [
  { id: 1, date: "2026-07-19 02:00 AM", size: "2.4 GB", type: "Full", status: "success" },
  { id: 2, date: "2026-07-18 02:00 AM", size: "2.3 GB", type: "Full", status: "success" },
  { id: 3, date: "2026-07-17 02:00 AM", size: "2.3 GB", type: "Full", status: "success" },
  { id: 4, date: "2026-07-16 02:00 AM", size: "2.2 GB", type: "Full", status: "success" },
  { id: 5, date: "2026-07-15 02:00 AM", size: "2.2 GB", type: "Full", status: "success" },
];

const initialData = {
  autoBackup: true,
  backupFrequency: "daily",
};

export default function BackupSettings() {
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

  const actionButtons = [
    { label: "Create Backup", icon: "💾", color: "bg-blue-600 hover:bg-blue-700 text-white", description: "Create a full backup now" },
    { label: "Restore Backup", icon: "↩️", color: "bg-amber-600 hover:bg-amber-700 text-white", description: "Restore from a backup" },
    { label: "Export JSON", icon: "📄", color: "bg-gray-100 hover:bg-gray-200 text-gray-700", description: "Export data as JSON" },
    { label: "Export CSV", icon: "📊", color: "bg-gray-100 hover:bg-gray-200 text-gray-700", description: "Export data as CSV" },
    { label: "Download Logs", icon: "📋", color: "bg-gray-100 hover:bg-gray-200 text-gray-700", description: "Download system logs" },
  ];

  return (
    <div className="space-y-4">
      {showSuccess && (
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 animate-fadeIn">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Backup settings saved successfully.
        </div>
      )}

      {/* Storage Used */}
      <SettingCard>
        <SectionHeader icon="💿" title="Storage Overview" description="Current backup storage usage" />
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Storage Used</span>
            <span className="font-medium text-gray-900">11.6 GB / 50 GB</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: "23%" }} />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-500 mt-2">
            <div className="p-2 bg-gray-50 rounded-lg">
              <p className="font-semibold text-gray-900">5</p>
              <p>Full Backups</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <p className="font-semibold text-gray-900">23%</p>
              <p>Storage Used</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <p className="font-semibold text-gray-900">Daily</p>
              <p>Schedule</p>
            </div>
          </div>
        </div>
      </SettingCard>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actionButtons.map((action) => (
          <button
            key={action.label}
            className={`p-4 rounded-xl border border-gray-200 ${action.color} transition-all hover:shadow-md text-left active:scale-[0.98]`}
          >
            <span className="text-2xl block mb-2">{action.icon}</span>
            <p className="text-sm font-semibold">{action.label}</p>
            <p className="text-xs mt-0.5 opacity-80">{action.description}</p>
          </button>
        ))}
      </div>

      {/* Auto Backup Settings */}
      <SettingCard>
        <SectionHeader icon="🔄" title="Automatic Backups" description="Configure automatic backup schedule" />
        <div className="space-y-4">
          <ToggleItem
            label="Enable Automatic Backups"
            description="Schedule regular automated backups"
            enabled={form.autoBackup}
            onChange={(v) => handleChange("autoBackup", v)}
          />
          {form.autoBackup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Backup Schedule</label>
              <select
                value={form.backupFrequency}
                onChange={(e) => handleChange("backupFrequency", e.target.value)}
                className="w-full max-w-xs px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="hourly">Every Hour</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          )}
        </div>
      </SettingCard>

      {/* Backup History */}
      <SettingCard padding={false}>
        <div className="p-5 border-b border-gray-100">
          <SectionHeader icon="📜" title="Backup History" description="Recent backup records" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Size</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {backupHistory.map((backup) => (
                <tr key={backup.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-gray-700">{backup.date}</td>
                  <td className="px-5 py-3 text-gray-600">{backup.size}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">{backup.type}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      {backup.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SettingCard>

      <div className="flex justify-end">
        <SaveBar onSave={handleSave} onReset={handleReset} hasChanges={hasChanges} isSaving={isSaving} />
      </div>
    </div>
  );
}