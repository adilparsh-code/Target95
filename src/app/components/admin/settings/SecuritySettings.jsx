"use client";

import { useState } from "react";
import SettingCard from "./SettingCard";
import SectionHeader from "./SectionHeader";
import ToggleItem from "./ToggleItem";
import SaveBar from "./SaveBar";

const initialData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  sessionTimeout: "30",
  twoFactorEnabled: false,
  rememberLogin: true,
};

const recentActivity = [
  { action: "Login from Chrome on Windows", location: "Mumbai, India", ip: "203.0.113.42", time: "2 hours ago", status: "success" },
  { action: "Password changed", location: "Mumbai, India", ip: "203.0.113.42", time: "3 days ago", status: "success" },
  { action: "Login from Safari on macOS", location: "Pune, India", ip: "198.51.100.23", time: "1 week ago", status: "success" },
  { action: "Failed login attempt", location: "Unknown", ip: "192.0.2.99", time: "2 weeks ago", status: "error" },
  { action: "2FA settings updated", location: "Mumbai, India", ip: "203.0.113.42", time: "1 month ago", status: "success" },
];

const trustedDevices = [
  { name: "Windows PC - Chrome", lastUsed: "2 hours ago", current: true },
  { name: "MacBook Pro - Safari", lastUsed: "1 week ago", current: false },
  { name: "iPhone 15 - Safari", lastUsed: "3 days ago", current: false },
];

export default function SecuritySettings() {
  const [form, setForm] = useState({ ...initialData });
  const [saved, setSaved] = useState({ ...initialData });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });

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

  const passwordStrength = () => {
    const pwd = form.newPassword;
    if (!pwd) return { score: 0, label: "None", color: "bg-gray-200", textColor: "text-gray-500" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 2) return { score: 25, label: "Weak", color: "bg-red-500", textColor: "text-red-600" };
    if (score <= 4) return { score: 50, label: "Fair", color: "bg-amber-500", textColor: "text-amber-600" };
    if (score <= 5) return { score: 75, label: "Good", color: "bg-blue-500", textColor: "text-blue-600" };
    return { score: 100, label: "Strong", color: "bg-emerald-500", textColor: "text-emerald-600" };
  };

  const strength = passwordStrength();
  const passwordsMatch = form.newPassword === form.confirmPassword;
  const passwordError = form.confirmPassword && !passwordsMatch;

  return (
    <div className="space-y-4">
      {showSuccess && (
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 animate-fade-in">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Security settings saved successfully.
        </div>
      )}

      {/* Security Score Card */}
      <SettingCard>
        <SectionHeader icon="🛡️" title="Security Score" description="Your account security overview" />
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#2563eb" strokeWidth="8" strokeDasharray={`${(75 / 100) * 264} 264`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">75</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-gray-600">Two-factor authentication: <strong className="text-gray-900">Off</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-gray-600">Password strength: <strong className="text-gray-900">Good</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-amber-500 rounded-full" />
              <span className="text-gray-600">Active sessions: <strong className="text-gray-900">3 devices</strong></span>
            </div>
          </div>
        </div>
      </SettingCard>

      {/* Change Password */}
      <SettingCard>
        <SectionHeader icon="🔑" title="Change Password" description="Update your account password" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <div className="relative">
              <input
                type={showPassword.current ? "text" : "password"}
                value={form.currentPassword}
                onChange={(e) => handleChange("currentPassword", e.target.value)}
                className="w-full px-3 py-2 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => ({ ...p, current: !p.current }))}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Toggle password visibility"
              >
                {showPassword.current ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                value={form.newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
                className="w-full px-3 py-2 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => ({ ...p, new: !p.new }))}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Toggle password visibility"
              >
                {showPassword.new ? "🙈" : "👁️"}
              </button>
            </div>
            {form.newPassword && (
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color} rounded-full transition-all`} style={{ width: `${strength.score}%` }} />
                  </div>
                  <span className={`text-xs font-medium ${strength.textColor}`}>{strength.label}</span>
                </div>
                <ul className="mt-2 space-y-1">
                  <li className={`text-xs flex items-center gap-1 ${form.newPassword.length >= 8 ? "text-emerald-600" : "text-gray-400"}`}>
                    <span>{form.newPassword.length >= 8 ? "✓" : "○"}</span> At least 8 characters
                  </li>
                  <li className={`text-xs flex items-center gap-1 ${/[A-Z]/.test(form.newPassword) ? "text-emerald-600" : "text-gray-400"}`}>
                    <span>{/[A-Z]/.test(form.newPassword) ? "✓" : "○"}</span> One uppercase letter
                  </li>
                  <li className={`text-xs flex items-center gap-1 ${/[0-9]/.test(form.newPassword) ? "text-emerald-600" : "text-gray-400"}`}>
                    <span>{/[0-9]/.test(form.newPassword) ? "✓" : "○"}</span> One number
                  </li>
                  <li className={`text-xs flex items-center gap-1 ${/[^A-Za-z0-9]/.test(form.newPassword) ? "text-emerald-600" : "text-gray-400"}`}>
                    <span>{/[^A-Za-z0-9]/.test(form.newPassword) ? "✓" : "○"}</span> One special character
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                className={`w-full px-3 py-2 pr-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  passwordError ? "border-red-300 bg-red-50" : "border-gray-200"
                }`}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => ({ ...p, confirm: !p.confirm }))}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Toggle password visibility"
              >
                {showPassword.confirm ? "🙈" : "👁️"}
              </button>
            </div>
            {passwordError && <p className="mt-1 text-xs text-red-500">Passwords do not match</p>}
            {form.confirmPassword && passwordsMatch && <p className="mt-1 text-xs text-emerald-600">Passwords match ✓</p>}
          </div>
        </div>
      </SettingCard>

      {/* Two-Factor + Session */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SettingCard>
          <ToggleItem
            label="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
            enabled={form.twoFactorEnabled}
            onChange={(v) => handleChange("twoFactorEnabled", v)}
            color="blue"
          />
          {form.twoFactorEnabled && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                Two-factor authentication is enabled. You will need to enter a verification code from your authenticator app when signing in.
              </p>
            </div>
          )}
        </SettingCard>

        <SettingCard>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
              <select
                value={form.sessionTimeout}
                onChange={(e) => handleChange("sessionTimeout", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="240">4 hours</option>
              </select>
            </div>
            <ToggleItem
              label="Remember Login"
              description="Stay signed in across sessions"
              enabled={form.rememberLogin}
              onChange={(v) => handleChange("rememberLogin", v)}
            />
          </div>
        </SettingCard>
      </div>

      {/* Trusted Devices */}
      <SettingCard>
        <SectionHeader icon="💻" title="Trusted Devices" description="Devices that have access to your account" />
        <div className="space-y-3">
          {trustedDevices.map((device, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-sm">
                  💻
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {device.name}
                    {device.current && <span className="ml-2 text-xs text-emerald-600 font-medium">(Current)</span>}
                  </p>
                  <p className="text-xs text-gray-500">Last used: {device.lastUsed}</p>
                </div>
              </div>
              {!device.current && (
                <button className="text-xs text-red-600 hover:text-red-700 font-medium">Revoke</button>
              )}
            </div>
          ))}
        </div>
      </SettingCard>

      {/* Recent Login Activity */}
      <SettingCard padding={false}>
        <div className="p-5 border-b border-gray-100">
          <SectionHeader icon="📋" title="Recent Login Activity" description="Recent account activity and login attempts" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Location</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">IP Address</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Time</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentActivity.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-gray-900">{item.action}</td>
                  <td className="px-5 py-3 text-gray-600">{item.location}</td>
                  <td className="px-5 py-3 text-gray-500 font-mono text-xs">{item.ip}</td>
                  <td className="px-5 py-3 text-gray-500">{item.time}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                      item.status === "success" ? "text-emerald-600" : "text-red-600"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        item.status === "success" ? "bg-emerald-500" : "bg-red-500"
                      }`} />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SettingCard>

      {/* Privacy Settings */}
      <SettingCard>
        <SectionHeader icon="🔒" title="Privacy Settings" description="Control your account visibility and data preferences" />
        <div className="space-y-4">
          <ToggleItem
            label="Profile Visibility"
            description="Allow other users to see your profile"
            enabled={form.profileVisible ?? true}
            onChange={(v) => handleChange("profileVisible", v)}
          />
          <ToggleItem
            label="Search Engine Indexing"
            description="Allow search engines to index your public profile"
            enabled={form.searchIndexing ?? false}
            onChange={(v) => handleChange("searchIndexing", v)}
          />
          <div className="border-t border-gray-100 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Activity Status</label>
              <select
                value={form.activityVisibility ?? "public"}
                onChange={(e) => handleChange("activityVisibility", e.target.value)}
                className="w-full max-w-xs px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="public">Visible to everyone</option>
                <option value="teachers">Visible to teachers only</option>
                <option value="admins">Visible to admins only</option>
                <option value="hidden">Hidden from everyone</option>
              </select>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cookie Preferences</label>
              <p className="text-xs text-gray-500 mb-3">Choose how cookies are used on the platform</p>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.essentialCookies ?? true}
                    onChange={(e) => handleChange("essentialCookies", e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Essential Cookies</p>
                    <p className="text-xs text-gray-500">Required for basic platform functionality</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.analyticsCookies ?? true}
                    onChange={(e) => handleChange("analyticsCookies", e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Analytics Cookies</p>
                    <p className="text-xs text-gray-500">Help us understand how the platform is used</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.marketingCookies ?? false}
                    onChange={(e) => handleChange("marketingCookies", e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Marketing Cookies</p>
                    <p className="text-xs text-gray-500">Used for personalized content and offers</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <ToggleItem
              label="Data Sharing for Improvement"
              description="Share anonymous usage data to help improve the platform"
              enabled={form.dataSharing ?? true}
              onChange={(v) => handleChange("dataSharing", v)}
            />
          </div>
        </div>
      </SettingCard>

      <div className="flex justify-end">
        <SaveBar onSave={handleSave} onReset={handleReset} hasChanges={hasChanges} isSaving={isSaving} />
      </div>
    </div>
  );
}