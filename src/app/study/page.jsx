import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StudyHome from "../components/study/StudyHome";
import ProtectedRoute from "../components/ProtectedRoute";

export const metadata = {
  title: "Study Center | Target95+",
  description: "A structured chapter-based study experience for Java learners.",
};

export default function StudyPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <StudyHome />
        <Footer />
      </main>
    </ProtectedRoute>
  );
}
