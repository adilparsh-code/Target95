import { getSubjectContent } from "@/lib/curriculum";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import ErrorBoundary from "../components/ui/ErrorBoundary";
import Link from "next/link";

export const metadata = {
  title: "CBSE Python Learning Paths — Computer Science 083 & Informatics Practices 065 | Target95+",
  description:
    "Choose CBSE Computer Science (083) for core Python or Informatics Practices (065) for Python data handling with Pandas, Matplotlib and SQL.",
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
                <span>CBSE Python Learning Paths</span>
              </div>
              <h1 className="text-3xl font-bold text-blue-700 sm:text-4xl md:text-5xl">
                Python Programming
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-600 sm:text-xl">
                CBSE Computer Science (083) develops core Python programming and computational thinking. Informatics Practices (065) is a separate pathway for Python-based data handling, Pandas, Matplotlib and SQL.
              </p>
            </section>

            <section className="mt-8 grid gap-4 md:grid-cols-2" aria-label="CBSE Python subjects">
              <article className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Computer Science · 083</p>
                <h2 className="mt-2 text-xl font-bold text-gray-900">Core Python programming</h2>
                <p className="mt-2 text-gray-600">Computational thinking, Python data types and control flow, collections and functions, followed by files, stacks, networks, databases, SQL and Python-SQL connectivity.</p>
                <div className="mt-4 flex gap-3"><Link className="font-semibold text-blue-700 hover:underline" href="/cbse/class/11/subject/083">Class XI</Link><Link className="font-semibold text-blue-700 hover:underline" href="/cbse/class/12/subject/083">Class XII</Link></div>
              </article>
              <article className="rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">Informatics Practices · 065</p>
                <h2 className="mt-2 text-xl font-bold text-gray-900">Python and data handling</h2>
                <p className="mt-2 text-gray-600">A distinct Informatics Practices route covering Python and SQL foundations, then Pandas, Matplotlib, data visualisation, networks and societal impacts.</p>
                <div className="mt-4 flex gap-3"><Link className="font-semibold text-indigo-700 hover:underline" href="/cbse/class/11/subject/065">Class XI</Link><Link className="font-semibold text-indigo-700 hover:underline" href="/cbse/class/12/subject/065">Class XII</Link></div>
              </article>
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
                href="/question-bank?board=CBSE&class=11&subjectCode=083"
                className="mt-4 inline-flex items-center px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Browse CBSE 083 Python questions &rarr;
              </Link>
            </section>
          </div>
        </Container>
      </ErrorBoundary>
      <Footer />
    </main>
  );
}
