"use client";

export default function PermissionTable({ rows, columns, permissions, onToggle }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Module
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <tr key={row.key} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{row.icon}</span>
                  <span>{row.label}</span>
                </div>
              </td>
              {columns.map((col) => {
                const permissionKey = `${row.key}:${col.key}`;
                const checked = permissions[permissionKey] ?? false;
                return (
                  <td key={col.key} className="px-4 py-3 text-center">
                    <label className="inline-flex items-center cursor-pointer" aria-label={`${row.label} - ${col.label}`}>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onToggle?.(permissionKey, row.key, col.key)}
                          className="sr-only peer"
                        />
                        <div className={`w-5 h-5 rounded border-2 transition-all ${
                          checked
                            ? "bg-blue-600 border-blue-600"
                            : "bg-white border-gray-300 hover:border-gray-400"
                        }`}>
                          {checked && (
                            <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </label>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}