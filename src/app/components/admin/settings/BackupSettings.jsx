import { useState } from "react";
import AdminCard from "../AdminCard";

const backupHistory = [
  { id: 1, date: "2026-07-19 02:00 AM", size: "2.4 GB", type: "Full", status: "success" },
  { id: 2, date: "2026-07-18 02:00 AM", size: "2.3 GB", type: "Full", status: "success" },
  { id: 3, date: "2026-07-17 02:00 AM", size: "2.3 GB", type: "Full", status: "success" },
  { id: 4, date: "2026-07-16 02:00 AM", size: "2.2 GB", type: "Full", status: "success" },
  { id: 5, date: "2026-07-15 02:00 AM", size: "2.2 GB", type: "Full", status: "success" },
];

export default function BackupSettings() {
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState("daily");

  return (
    <div className="space-y-6">
      {/* Backup Configuration */}
      <AdminCard>
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Backup Configuration</h3>
            <p className="text-xs text-gray-500 mt-0.5">Configure automatic backup settings</p>
          </div>

          <div className="flex items-center justify-between max-w-md">
            <div>
              <p className="text-sm font-medium text-gray-700">Automatic Backups</p>
              <p className="text-xs text-gray-500">Enable scheduled automatic backups</p>
            </div>
            <button
              onClick={() => setAutoBackup(!autoBackup)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                autoBackup ? "bg-emerald-500" : "bg-gray-200"
              }`}
              aria-label="Toggle automatic backups"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                  autoBackup ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

          {autoBackup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Backup Frequency</label>
              <select
                value={backupFrequency}
                onChange={(e) => setBackupFrequency(e.target.value)}
                className="w-full max-w-xs px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="hourly">Every Hour</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Backup Now
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
              Restore
            </button>
          </div>
        </div>
      </AdminCard>

      {/* Backup History */}
      <AdminCard padding={false}>
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Backup History</h3>
          <p className="text-xs text-gray-500 mt-0.5">Recent backup records</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Size</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {backupHistory.map((backup) => (
                <tr key={backup.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{backup.date}</td>
                  <td className="px-4 py-3 text-gray-600">{backup.size}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                      {backup.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
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
      </AdminCard>
    </div>
  );
}