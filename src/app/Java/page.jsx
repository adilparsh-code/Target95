import { getSubjectContent } from "@/lib/curriculum";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import ProtectedRoute from "../components/ProtectedRoute";
import JavaChapterCatalog from "../components/JavaChapterCatalog";

export default function JavaPage() {
  const subject = getSubjectContent("java");

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <Container>
          <JavaChapterCatalog subject={subject} />
        </Container>
        <Footer />
      </main>
    </ProtectedRoute>
  );
}
