"use client";


import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Subjects from "./components/Subjects";
import WhyTarget95 from "./components/WhyTarget95";
import AIWorkflow from "./components/AIWorkflow";
import BoardSupport from "./components/BoardSupport";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Pricing from "./components/Pricing";
import Newsletter from "./components/Newsletter";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { usePersonalization } from "./hooks/usePersonalization";

// Board → Class → Subjects mapping based on requirement
export const boardClassSubjectMap = {
  cisce: {
    title: "CISCE",
    classes: [
      {
        id: "icse-class-9",
        title: "ICSE Class 9",
        subjects: ["java"]
      },
      {
        id: "icse-class-10",
        title: "ICSE Class 10",
        subjects: ["java"] // Computer Applications
      },
      {
        id: "isc-class-11",
        title: "ISC Class 11",
        subjects: ["java"]
      },
      {
        id: "isc-class-12",
        title: "ISC Class 12",
        subjects: ["java"] // Computer Science
      }
    ]
  },
  cbse: {
    title: "CBSE",
    classes: [
      {
        id: "class-9",
        title: "Class 9",
        subjects: ["python"]
      },
      {
        id: "class-10",
        title: "Class 10",
        subjects: ["python"]
      },
      {
        id: "class-11",
        title: "Class 11",
        subjects: ["python"] // Computer Science (Python)
      },
      {
        id: "class-12",
        title: "Class 12",
        subjects: ["python"]
      }
    ]
  }
};

export default function ClientHome() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showClasses, setShowClasses] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const [showStartLearning, setShowStartLearning] = useState(false);

  const { board, class: selectedClassData, subject, setBoard, setClass, setSubject, isHydrated } = usePersonalization();

  // Auto-select from personalization on mount
  useEffect(() => {
    if (isHydrated && board && selectedClassData && subject) {
      setSelectedBoard(board);
      setSelectedClass(selectedClassData);
      setShowSubjects(true);
      setShowStartLearning(true);
    } else if (isHydrated && board && !selectedClassData) {
      setSelectedBoard(board);
      setShowClasses(true);
    }
  }, [isHydrated, board, selectedClassData, subject]);

  const handleBoardSelect = (boardId) => {
    setSelectedBoard(boardId);
    setBoard(boardId);
    setShowClasses(true);
    setShowSubjects(false);
    setShowStartLearning(false);
  };

  const handleClassSelect = (classData) => {
    setSelectedClass(classData);
    setClass(classData);
    setShowClasses(false);
    setShowSubjects(true);
    setShowStartLearning(true);
  };

  const handleBackToBoards = () => {
    setSelectedBoard(null);
    setSelectedClass(null);
    setShowClasses(false);
    setShowSubjects(false);
    setShowStartLearning(false);
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
    setClass(null);
    setShowClasses(true);
    setShowSubjects(false);
    setShowStartLearning(false);
  };

  const handleStartLearning = () => {
    const subjectsSection = document.getElementById('subjects-heading');
    if (subjectsSection) {
      subjectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <ErrorBoundary>
        <Hero 
          onBoardSelect={handleBoardSelect} 
          onBackToBoards={handleBackToBoards}
          onBackToClasses={handleBackToClasses}
          showSubjects={showSubjects}
          showClasses={showClasses}
          selectedBoard={selectedBoard}
          selectedClass={selectedClass}
          showStartLearning={showStartLearning}
          onStartLearning={handleStartLearning}
          personalization={{ board, class: selectedClassData, subject }}
        />
        <Subjects isVisible={showSubjects} />
        <Stats />
        <WhyTarget95 />
        <AIWorkflow />
        <BoardSupport />
        <Features />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </ErrorBoundary>
      <Footer />
    </main>
  );
}