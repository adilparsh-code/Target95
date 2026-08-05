import { getSubjectContent } from "@/lib/curriculum";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import ErrorBoundary from "../components/ui/ErrorBoundary";
import Link from "next/link";

export const metadata = {
  title: "Python Programming | Target95+",
  description:
    "Learn Python fundamentals with interactive lessons, coding exercises, and step-by-step tutorials for CBSE Computer Science.",
};

export default function PythonPage() {
  const subject = getSubjectContent("python");

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <ErrorBoundary>
        <Container>
          <div className="py-12">
            <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 rounded-full text-blue-700 text-sm font-semibold border border-blue-200 shadow-sm mb-6">
                <span>🐍</span>
                <span>CBSE Computer Science</span>
              </div>
              <h1 className="text-3xl font-bold text-blue-700 sm:text-4xl md:text-5xl">
                Python Programming
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-600 sm:text-xl">
                {subject && subject.description
                  ? subject.description
                  : "Learn Python fundamentals with interactive lessons, coding exercises, and step-by-step tutorials."}
              </p>
            </section>

            <section className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl">
              <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                <p className="text-2xl font-bold text-blue-700">
                  {subject && subject.totalChapters ? subject.totalChapters : 0}
                </p>
                <p className="mt-1 text-sm text-gray-500">Chapters</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                <p className="text-2xl font-bold text-indigo-700">
                  {subject && subject.totalQuestions ? subject.totalQuestions : 0}
                </p>
                <p className="mt-1 text-sm text-gray-500">Questions</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                <p className="text-2xl font-bold text-purple-700">
                  {subject && subject.estimatedStudyTime ? subject.estimatedStudyTime : "0 hours"}
                </p>
                <p className="mt-1 text-sm text-gray-500">Study Time</p>
              </div>
            </section>

            <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Python Chapters Coming Soon
              </h2>
              <p className="text-gray-600">
                Python chapters and interactive exercises are being developed.
                Browse the Python question bank to start practicing now.
              </p>
              <Link
                href="/question-bank"
                className="mt-4 inline-flex items-center px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Browse Python questions &rarr;
              </Link>
            </section>
          </div>
        </Container>
      </ErrorBoundary>
      <Footer />
    </main>
  );
}
