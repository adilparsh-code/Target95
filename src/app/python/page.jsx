import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import ErrorBoundary from "../components/ui/ErrorBoundary";
import { CBSE_PRACTICE_QUESTIONS_2026_27 } from "../data/cbse/question-bank-2026-27";
import { ICSE_ROBOTICS_AI } from "../data/icseRoboticsAI";
import ICSE_ROBOTICS_AI_CLASS_X from "../data/icseRoboticsAIClassX";
import { PROJECT_GROUPS } from "../data/projects";

export const metadata = {
  title: "CBSE Python Learning Paths — Computer Science 083 & Informatics Practices 065 | Target95+",
  description:
    "Choose CBSE Computer Science (083) for core Python or Informatics Practices (065) for Python data handling with Pandas, Matplotlib and SQL.",
    "Practise Python for CBSE Computer Science (083), Artificial Intelligence (843), ISC AI (883) and the ICSE Robotics & AI track, with real project packages and sample output.",
};

const PYTHON_TOPIC = /python|sql|pandas|matplotlib|csv/i;
// ICSE Robotics & AI tags its Python questions with a "PY" id segment instead of
// a topic label, so both signals are checked.
const isPythonQuestion = (question) =>
  PYTHON_TOPIC.test([question.topic, question.topicId].filter(Boolean).join(" ")) ||
  /-PY-Q/i.test(String(question.id || ""));

function countPythonQuestions(value) {
  let total = 0;
  const walk = (node) => {
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (!node || typeof node !== "object") return;
    if (typeof node.question === "string" && isPythonQuestion(node)) {
      total += 1;
      return;
    }
    Object.values(node).forEach(walk);
  };
  walk(value);
  return total;
}

const practiceQuestions =
  countPythonQuestions(CBSE_PRACTICE_QUESTIONS_2026_27) +
  countPythonQuestions(ICSE_ROBOTICS_AI) +
  countPythonQuestions(ICSE_ROBOTICS_AI_CLASS_X);

const allProjects = Object.values(PROJECT_GROUPS).flatMap((group) => group.projects);
const pythonProjects = allProjects.filter((project) => project.code?.language === "Python");
const researchProjects = allProjects.length - pythonProjects.length;

const destinations = [
  {
    board: "CBSE 083",
    title: "Computer Science (Python) — Class XI",
    text: "Functions, exceptions, CSV handling, output tracing and SQL basics with practice questions.",
    href: "/cbse/class/11/subject/083",
  },
  {
    board: "CBSE 083",
    title: "Computer Science (Python) — Class XII",
    text: "Pandas, Matplotlib, SQL queries and Python programs aligned to the 2026-27 syllabus.",
    href: "/cbse/class/12/subject/083",
  },
  {
    board: "CBSE 843",
    title: "Artificial Intelligence (Python) — Class XI & XII",
    text: "Python-based AI units with practice sets and research or coding project packages.",
    href: "/cbse/class/11/subject/843",
  },
  {
    board: "ISC AI 883",
    title: "Artificial Intelligence — Class XI project lab",
    text: "Python project packages with runnable code, sample output, test cases and viva questions.",
    href: "/isc/artificial-intelligence/11/project",
  },
  {
    board: "ICSE",
    title: "Robotics & AI — Class IX and X",
    text: "Python fundamentals, output tracing and debugging questions inside the ICSE AI track.",
    href: "/icse/robotics-ai",
  },
  {
    board: "ICSE",
    title: "Class X written project",
    text: "Disruptive Technologies project guide covering AI, ML, cloud, IoT, big data and cybersecurity.",
    href: "/icse/class-x/projects",
  },
];

const stats = [
  { value: practiceQuestions, label: "Python practice questions" },
  { value: pythonProjects.length, label: "Python coding projects" },
  { value: researchProjects, label: "Research / design projects" },
  { value: Object.keys(PROJECT_GROUPS).length, label: "Project labs" },
];

export default function PythonPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <ErrorBoundary>
        <Container>
          <div className="py-12">
            <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/80 px-4 py-2 text-sm font-semibold text-blue-700">
                <span>🐍</span>
                <span>CBSE 083 &amp; 843 · ISC AI 883 · ICSE Robotics &amp; AI</span>
              </div>
              <h1 className="text-3xl font-bold text-blue-700 sm:text-4xl md:text-5xl">
                Python Programming
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl">
                Python is taught through the board sections that actually use it. Practise real
                questions and full project packages with sample input, sample output, test cases and
                viva preparation.
              </p>
            </section>

            <section className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                  <p className="text-2xl font-bold text-blue-700">{stat.value}</p>
                  <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900">Where to practise Python now</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                Every card below opens a board section that contains real Python questions or project
                work. There is no dead link and no placeholder chapter here.
              </p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {destinations.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      {item.board}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{item.text}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-blue-700">Open →</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
              <h2 className="mb-2 text-xl font-bold text-gray-900">Chapter-wise Python lessons — coming soon</h2>
              <p className="mx-auto max-w-3xl text-gray-600">
                A standalone chapter-by-chapter Python course is still in development. Until it ships,
                the board sections above contain the complete practice and project material that is
                ready today.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <Link
                  href="/question-bank"
                  className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Java question bank
                </Link>
                <Link
                  href="/cbse/class/12/subject/083"
                  className="inline-flex items-center rounded-xl border border-blue-300 bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                >
                  CBSE 083 Python practice
                </Link>
              </div>
            </section>
          </div>
        </Container>
      </ErrorBoundary>
      <Footer />
    </main>
  );
}
