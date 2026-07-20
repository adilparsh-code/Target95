"use client";

import { useState } from "react";
import AdminCard from "../AdminCard";

export default function SecuritySettings() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <AdminCard>
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Change Password</h3>
            <p className="text-xs text-gray-500 mt-0.5">Update your account password</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
              className="w-full max-w-md px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
              className="w-full max-w-md px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
              className="w-full max-w-md px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm new password"
            />
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Update Password
            </button>
          </div>
        </div>
      </AdminCard>

      {/* Two-Factor Authentication */}
      <AdminCard>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Two-Factor Authentication</h3>
              <p className="text-xs text-gray-500 mt-0.5">Add an extra layer of security to your account</p>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                twoFactorEnabled ? "bg-emerald-500" : "bg-gray-200"
              }`}
              aria-label="Toggle two-factor authentication"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                  twoFactorEnabled ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
          {twoFactorEnabled && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                Two-factor authentication is enabled. You will need to enter a verification code from your authenticator app when signing in.
              </p>
            </div>
          )}
        </div>
      </AdminCard>

      {/* Session Settings */}
      <AdminCard>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Session Settings</h3>
            <p className="text-xs text-gray-500 mt-0.5">Manage session timeout and security preferences</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="w-full max-w-xs px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="240">4 hours</option>
            </select>
          </div>
          <div className="flex items-center justify-between max-w-md">
            <div>
              <p className="text-sm font-medium text-gray-700">Force Logout on All Devices</p>
              <p className="text-xs text-gray-500">Sign out from all active sessions</p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              Force Logout
            </button>
          </div>
        </div>
      </AdminCard>

      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          Save Security Settings
        </button>
      </div>
    </div>
  );
}