import DashboardPage from "../../dashboard/page";

export const metadata = {
  title: "Student Dashboard | Target95+",
  description: "Track your Target95+ learning progress, practice activity and mock tests.",
};

/**
 * /student/dashboard is a stable alias of the main /dashboard route so both
 * URLs render the identical authenticated student experience.
 */
export default function StudentDashboardAliasPage() {
  return <DashboardPage />;
}
