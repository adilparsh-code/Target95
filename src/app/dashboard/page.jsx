import Navbar from "../components/Navbar";
import StudentDashboard from "../components/StudentDashboard";
import Footer from "../components/Footer";

export const metadata = {
  title: "Student Dashboard | Target95+",
  description: "Track your progress, bookmarks, and next learning steps on Target95+.",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <StudentDashboard />
      <Footer />
    </main>
  );
}
