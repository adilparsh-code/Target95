import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoadmapHome from "../components/roadmap/RoadmapHome";

export const metadata = {
  title: "Study Roadmap | Target95+",
  description: "Interactive study roadmap for ICSE Class 9/10 and ISC Class 11/12 Computer Science.",
};

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <RoadmapHome />
      <Footer />
    </main>
  );
}