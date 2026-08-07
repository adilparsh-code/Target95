import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import ProgrammingLibrary from "../components/programming/ProgrammingLibrary";
import ErrorBoundary from "../components/ui/ErrorBoundary";

export const metadata = {
  title: "Programming Library | Target95+",
  description:
    "Explore structured programming categories for ICSE and ISC Computer Science — numbers, patterns, arrays, strings, methods, recursion, searching, sorting, matrices, and objects.",
};

export default function ProgrammingLibraryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <ErrorBoundary>
        <Container>
          <ProgrammingLibrary />
        </Container>
      </ErrorBoundary>
      <Footer />
    </main>
  );
}