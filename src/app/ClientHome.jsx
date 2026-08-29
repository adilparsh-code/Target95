"use client";

import React, { useState, useEffect, useMemo } from "react";

import Navbar from "./components/Navbar";
import RedesignedHero from "./components/RedesignedHero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import Footer from "./components/Footer";
import WhyTarget95 from "./components/WhyTarget95";
import AIWorkflow from "./components/AIWorkflow";
import BoardSupport from "./components/BoardSupport";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { usePersonalization } from "./hooks/usePersonalization";

import dynamic from "next/dynamic";

const FAQ = dynamic(() => import("./components/FAQ"), {
  ssr: true,
  loading: () => <div className="py-12 animate-pulse bg-gray-50 rounded-2xl" />
});

const Newsletter = dynamic(() => import("./components/Newsletter"), {
  ssr: true,
  loading: () => <div className="py-12 animate-pulse bg-gray-50 rounded-2xl" />
});

export const boardClassSubjectMap = {
  cisce: {
    title: "CISCE",
    classes: [
      { id: "icse-class-9", title: "ICSE Class 9", subjects: ["java"] },
      { id: "icse-class-10", title: "ICSE Class 10", subjects: ["java"] },
      { id: "isc-class-11", title: "ISC Class 11", subjects: ["java"] },
      { id: "isc-class-12", title: "ISC Class 12", subjects: ["boolean-algebra"] }
    ]
  },
  cbse: {
    title: "CBSE",
    classes: [
      { id: "class-9", title: "Class 9", subjects: ["python"] },
      { id: "class-10", title: "Class 10", subjects: ["python"] },
      { id: "class-11", title: "Class 11", subjects: ["python"] },
      { id: "class-12", title: "Class 12", subjects: ["python"] }
    ]
  }
};

export default function ClientHome() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showClasses, setShowClasses] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const [showStartLearning, setShowStartLearning] = useState(false);

  const { board, class: selectedClassData, subject, setBoard, setClass, setSubject, clearPersonalization, isHydrated } = usePersonalization();

  const personalization = useMemo(() => ({
    board,
    class: selectedClassData,
    subject
  }), [board, selectedClassData, subject]);

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
    clearPersonalization();
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
    setClass(null);
    setShowClasses(true);
    setShowSubjects(false);
    setShowStartLearning(false);
  };

  const handleStartLearning = () => {
    if (subject) {
      window.location.href = "/study";
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <ErrorBoundary>
        <RedesignedHero
          onBoardSelect={handleBoardSelect}
          onBackToBoards={handleBackToBoards}
          onBackToClasses={handleBackToClasses}
          onClassSelect={handleClassSelect}
          showSubjects={showSubjects}
          showClasses={showClasses}
          selectedBoard={selectedBoard}
          selectedClass={selectedClass}
          showStartLearning={showStartLearning}
          onStartLearning={handleStartLearning}
          personalization={{ board, class: selectedClassData, subject }}
        />
        <Stats />
        <WhyTarget95 />
        <AIWorkflow />
        <BoardSupport />
        <Features />
        <FAQ />
        <Newsletter />
      </ErrorBoundary>
      <Footer />
    </main>
  );
}
