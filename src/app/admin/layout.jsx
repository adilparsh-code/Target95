import ServerAdminGate from "../components/admin/ServerAdminGate";
import AdminLayout from "../components/admin/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AdminRootLayout({ children }) {
  return (
    <ServerAdminGate>
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout>{children}</AdminLayout>
      </ProtectedRoute>
    </ServerAdminGate>
  );
}
