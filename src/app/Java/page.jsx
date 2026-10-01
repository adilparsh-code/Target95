import { getSubjectContent, getSubjectContentForClass } from "@/lib/curriculum";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import JavaChapterCatalog from "../components/JavaChapterCatalog";
import ErrorBoundary from "../components/ui/ErrorBoundary";

export const metadata = {
  title: "Java Practice | Target95+",
  description: "Practice ICSE and ISC Java programming chapters with structured questions and guided preparation.",
};

export default async function JavaPage({ searchParams }) {
  const { class: requestedClass } = await searchParams;
  const isClassIX = String(requestedClass || "").toUpperCase() === "IX";
  const subject = isClassIX
    ? getSubjectContentForClass("java", "ICSE IX")
    : getSubjectContent("java");

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <ErrorBoundary>
        <Container>
          <JavaChapterCatalog subject={subject} className={isClassIX ? "ICSE IX" : null} />
        </Container>
      </ErrorBoundary>
      <Footer />
    </main>
  );
}
