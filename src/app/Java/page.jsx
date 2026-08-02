import { getSubjectContent } from "@/lib/curriculum";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import JavaChapterCatalog from "../components/JavaChapterCatalog";

export const metadata = {
  title: "Java Practice | Target95+",
  description: "Practice ICSE and ISC Java programming chapters with structured questions and guided preparation.",
};

export default function JavaPage() {
  const subject = getSubjectContent("java");

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <Container>
        <JavaChapterCatalog subject={subject} />
      </Container>
      <Footer />
    </main>
  );
}
