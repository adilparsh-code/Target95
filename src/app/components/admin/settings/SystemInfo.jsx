import AdminCard from "../AdminCard";

const systemDetails = [
  { label: "Platform Version", value: "v2.5.1" },
  { label: "Last Updated", value: "July 15, 2026" },
  { label: "Node.js Version", value: "20.11.0" },
  { label: "Next.js Version", value: "15.0.0" },
  { label: "React Version", value: "19.0.0" },
  { label: "Database", value: "Firebase Firestore (Planned)" },
  { label: "Authentication", value: "Firebase Auth (Planned)" },
  { label: "Hosting", value: "Vercel (Planned)" },
  { label: "Environment", value: "Development" },
  { label: "Build Tool", value: "Turbopack" },
  { label: "CSS Framework", value: "Tailwind CSS v4" },
  { label: "Package Manager", value: "npm" },
];

export default function SystemInfo() {
  return (
    <AdminCard>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">System Information</h3>
          <p className="text-xs text-gray-500 mt-0.5">Technical details about the platform installation</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {systemDetails.map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className="text-sm font-medium text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">
            <strong>Note:</strong> Some services shown as &ldquo;Planned&rdquo; are not yet integrated. They will be available in future updates.
          </p>
        </div>
      </div>
    </AdminCard>
  );
}