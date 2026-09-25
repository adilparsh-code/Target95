const subjects = [
  {
    id: "java",
    icon: "💻",
    title: "Java Programming",
    description: "Master Java with chapter-wise study materials, practice questions, and AI-powered explanations for ICSE & ISC.",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    href: "/Java",
    // Counts come from src/app/data/javaCurriculum.js and the real question
    // bank (src/lib/javaChapterQuestionBank.js) — never guessed.
    totalChapters: 19,
    totalQuestions: 830,
    estimatedStudyTime: "16 hours",
  },
  {
    id: "boolean-algebra",
    icon: "🔢",
    title: "Boolean Algebra",
    description: "Master ISC Class XII Boolean Algebra, truth tables, logic gates, K-Maps, canonical forms, and exam practice.",
    color: "from-violet-600 to-indigo-700",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    href: "/isc/class-xii/boolean-algebra",
    comingSoon: false,
    // Three topic pages are reachable under this link (overview, canonical
    // forms, word problems). These are reference pages; there is no separate
    // Boolean Algebra practice bank yet, so the question count stays 0.
    totalChapters: 3,
    totalQuestions: 0,
    estimatedStudyTime: "6 hours",
  },
  {
    id: "python",
    icon: "🐍",
    title: "Python Programming",
    description: "Python question-bank practice is available now; chapter-wise lessons and interactive exercises are still being developed.",
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    href: "/python",
    comingSoon: true,
    // Python has no chapter course yet. /python counts the 21 real Python-tagged
    // practice questions that already ship in the CBSE bank and the ICSE
    // Robotics & AI track, so the card and the page agree.
    totalChapters: 0,
    totalQuestions: 21,
    estimatedStudyTime: "8 hours",
  },
];

export default subjects;
