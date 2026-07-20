"use client";

import { useState } from "react";
import AdminCard from "../AdminCard";
import StatusBadge from "../StatusBadge";

const roles = [
  { id: 1, name: "Super Admin", users: 1, permissions: ["All Access"], status: "active", description: "Full platform access and control" },
  { id: 2, name: "Admin", users: 3, permissions: ["Manage Content", "Manage Users", "View Analytics"], status: "active", description: "Content and user management" },
  { id: 3, name: "Teacher", users: 12, permissions: ["Create Content", "View Students", "Manage Tests"], status: "active", description: "Teaching and content creation" },
  { id: 4, name: "Moderator", users: 5, permissions: ["Review Content", "Manage Comments"], status: "active", description: "Content moderation" },
  { id: 5, name: "Student", users: 342, permissions: ["Access Content", "Take Tests", "View Progress"], status: "active", description: "Standard student access" },
];

const allPermissions = [
  "All Access",
  "Manage Content",
  "Manage Users",
  "View Analytics",
  "Create Content",
  "View Students",
  "Manage Tests",
  "Review Content",
  "Manage Comments",
  "Access Content",
  "Take Tests",
  "View Progress",
  "Manage Settings",
  "Export Data",
  "Manage Roles",
];

export default function RolesPermissions() {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div className="space-y-6">
      {/* Roles List */}
      <AdminCard padding={false}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Users</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {roles.map((role) => (
                <tr
                  key={role.id}
                  className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedRole?.id === role.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedRole(role)}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{role.name}</td>
                  <td className="px-4 py-3 text-gray-600">{role.users}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{role.description}</td>
                  <td className="px-4 py-3"><StatusBadge status={role.status} size="sm" /></td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" aria-label={`Edit ${role.name} role`}>
                      ✏️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Selected Role Permissions */}
      {selectedRole && (
        <AdminCard>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{selectedRole.name} Permissions</h3>
                <p className="text-xs text-gray-500 mt-0.5">Manage permissions for this role</p>
              </div>
              <StatusBadge status={selectedRole.status} />
            </div>
            <div className="flex flex-wrap gap-2">
              {allPermissions.map((permission) => {
                const hasPermission = selectedRole.permissions.includes(permission) || selectedRole.permissions.includes("All Access");
                return (
                  <button
                    key={permission}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      hasPermission
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {hasPermission ? "✓ " : "○ "}{permission}
                  </button>
                );
              })}
            </div>
          </div>
        </AdminCard>
      )}

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
          + Add Role
        </button>
        <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
}