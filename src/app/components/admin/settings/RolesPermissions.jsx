"use client";

import { useState } from "react";
import SettingCard from "./SettingCard";
import SectionHeader from "./SectionHeader";
import PermissionTable from "./PermissionTable";
import SaveBar from "./SaveBar";

const permissionRows = [
  { key: "dashboard", label: "Dashboard", icon: "📊" },
  { key: "questions", label: "Questions", icon: "❓" },
  { key: "teachers", label: "Teachers", icon: "👨‍🏫" },
  { key: "students", label: "Students", icon: "👨‍🎓" },
  { key: "analytics", label: "Analytics", icon: "📈" },
  { key: "settings", label: "Settings", icon: "⚙️" },
  { key: "notes", label: "Notes", icon: "📄" },
  { key: "mockTests", label: "Mock Tests", icon: "📝" },
];

const permissionColumns = [
  { key: "admin", label: "Admin" },
  { key: "teacher", label: "Teacher" },
  { key: "moderator", label: "Moderator" },
  { key: "student", label: "Student" },
  { key: "viewer", label: "Viewer" },
];

const defaultPermissions = {
  "dashboard:admin": true, "dashboard:teacher": true, "dashboard:moderator": true, "dashboard:student": true, "dashboard:viewer": true,
  "questions:admin": true, "questions:teacher": true, "questions:moderator": true, "questions:student": false, "questions:viewer": false,
  "teachers:admin": true, "teachers:teacher": false, "teachers:moderator": false, "teachers:student": false, "teachers:viewer": false,
  "students:admin": true, "students:teacher": true, "students:moderator": false, "students:student": false, "students:viewer": false,
  "analytics:admin": true, "analytics:teacher": true, "analytics:moderator": true, "analytics:student": true, "analytics:viewer": true,
  "settings:admin": true, "settings:teacher": false, "settings:moderator": false, "settings:student": false, "settings:viewer": false,
  "notes:admin": true, "notes:teacher": true, "notes:moderator": true, "notes:student": true, "notes:viewer": true,
  "mockTests:admin": true, "mockTests:teacher": true, "mockTests:moderator": true, "mockTests:student": true, "mockTests:viewer": false,
};

const roleDetails = {
  admin: { name: "Admin", description: "Full access to all platform features and settings", members: 3, color: "blue" },
  teacher: { name: "Teacher", description: "Can manage content and view student performance", members: 12, color: "emerald" },
  moderator: { name: "Moderator", description: "Can review content and manage user reports", members: 5, color: "violet" },
  student: { name: "Student", description: "Can access learning content and take tests", members: 342, color: "amber" },
  viewer: { name: "Viewer", description: "Read-only access to dashboard and analytics", members: 8, color: "gray" },
};

export default function RolesPermissions() {
  const [permissions, setPermissions] = useState({ ...defaultPermissions });
  const [saved, setSaved] = useState({ ...defaultPermissions });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  const hasChanges = JSON.stringify(permissions) !== JSON.stringify(saved);

  const handleToggle = (permissionKey) => {
    setPermissions((prev) => ({
      ...prev,
      [permissionKey]: !prev[permissionKey],
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setSaved({ ...permissions });
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const handleReset = () => {
    setPermissions({ ...saved });
  };

  const filteredRows = permissionRows.filter((row) =>
    row.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Role Detail Drawer */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSelectedRole(null)} />
          <div className="relative w-full max-w-md bg-white shadow-2xl animate-fade-in overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-lg">
                  🛡️
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{roleDetails[selectedRole]?.name || selectedRole}</h3>
                  <p className="text-xs text-gray-500">Role Details</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close drawer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <p className="text-sm text-gray-600">{roleDetails[selectedRole]?.description}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-gray-900">{roleDetails[selectedRole]?.members || 0}</p>
                  <p className="text-xs text-gray-500 mt-1">Members</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-gray-900">
                    {permissionColumns.filter((col) => col.key === selectedRole).length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Modules</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-emerald-600">
                    {permissionRows.filter((row) => permissions[`${row.key}:${selectedRole}`]).length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Permissions</p>
                </div>
              </div>

              {/* Permissions Summary */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Permissions Summary</h4>
                <div className="space-y-2">
                  {permissionRows.map((row) => {
                    const hasAccess = permissions[`${row.key}:${selectedRole}`];
                    return (
                      <div
                        key={row.key}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          hasAccess ? "bg-emerald-50" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{row.icon}</span>
                          <span className="text-sm text-gray-700">{row.label}</span>
                        </div>
                        <span className={`text-xs font-medium ${hasAccess ? "text-emerald-600" : "text-gray-400"}`}>
                          {hasAccess ? "✓ Access Granted" : "○ No Access"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Last Modified */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Last Modified</span>
                  <span className="text-gray-900 font-medium">July 15, 2026</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-500">Created</span>
                  <span className="text-gray-900 font-medium">June 1, 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 animate-fade-in">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Permissions saved successfully.
        </div>
      )}

      <SettingCard>
        <SectionHeader
          icon="🔐"
          title="Role Permissions"
          description="Configure access permissions for each role"
          action={
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48"
                aria-label="Search permission modules"
              />
            </div>
          }
        />

        {/* Role badges that open the drawer */}
        <div className="flex flex-wrap gap-2 mb-4">
          {permissionColumns.map((col) => {
            const detail = roleDetails[col.key];
            const colorMap = {
              blue: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
              emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
              violet: "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100",
              amber: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
              gray: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100",
            };
            return (
              <button
                key={col.key}
                onClick={() => setSelectedRole(col.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  colorMap[detail?.color] || colorMap.gray
                }`}
              >
                {col.label} ({detail?.members || 0})
              </button>
            );
          })}
        </div>

        <PermissionTable
          rows={filteredRows}
          columns={permissionColumns}
          permissions={permissions}
          onToggle={handleToggle}
        />

        {filteredRows.length === 0 && (
          <div className="text-center py-8 text-sm text-gray-500">
            No modules found matching &ldquo;{searchQuery}&rdquo;
          </div>
        )}
      </SettingCard>

      <div className="flex justify-end">
        <SaveBar onSave={handleSave} onReset={handleReset} hasChanges={hasChanges} isSaving={isSaving} />
      </div>
    </div>
  );
}