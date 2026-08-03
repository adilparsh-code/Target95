import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StudyHome from "../components/study/StudyHome";
import ErrorBoundary from "../components/ui/ErrorBoundary";

export const metadata = {
  title: "Study Center | Target95+",
  description: "A structured chapter-based study experience for Java learners.",
};

export default function StudyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="h-20 sm:h-24 lg:h-28"></div>
      <ErrorBoundary>
        <StudyHome />
      </ErrorBoundary>
      <Footer />
    </main>
  );
}
