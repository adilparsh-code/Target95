import AdminDashboard from "../page";

export const metadata = {
  title: "Admin Dashboard | Target95+",
  description: "Admin overview of students, content and platform analytics.",
};

/**
 * /admin/dashboard is a stable alias of /admin so both URLs render the same
 * authenticated admin experience.
 */
export default function AdminDashboardAliasPage() {
  return <AdminDashboard />;
}
