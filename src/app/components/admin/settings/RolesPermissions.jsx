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

export default function RolesPermissions() {
  const [permissions, setPermissions] = useState({ ...defaultPermissions });
  const [saved, setSaved] = useState({ ...defaultPermissions });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  return (
    <div className="space-y-4">
      {showSuccess && (
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 animate-fadeIn">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Permissions saved successfully.
        </div>
      )}

      <SettingCard>
        <SectionHeader icon="🔐" title="Role Permissions" description="Configure access permissions for each role" />
        <PermissionTable
          rows={permissionRows}
          columns={permissionColumns}
          permissions={permissions}
          onToggle={handleToggle}
        />
      </SettingCard>

      <div className="flex justify-end">
        <SaveBar onSave={handleSave} onReset={handleReset} hasChanges={hasChanges} isSaving={isSaving} />
      </div>
    </div>
  );
}