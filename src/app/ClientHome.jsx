"use client";

import React, { useEffect, useMemo, useState } from "react";

import Navbar from "./components/Navbar";
import RedesignedHero from "./components/RedesignedHero";
import SpotlightLearningCard from "./components/SpotlightLearningCard";
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
  loading: () => <div className="py-12 animate-pulse bg-gray-50 rounded-2xl" />,
});

const Newsletter = dynamic(() => import("./components/Newsletter"), {
  ssr: true,
  loading: () => <div className="py-12 animate-pulse bg-gray-50 rounded-2xl" />,
});

export const boardClassSubjectMap = {
  cisce: {
    title: "CISCE",
    classes: [
      { id: "icse-class-9", title: "ICSE Class 9", subjects: ["java", "ai"] },
      { id: "icse-class-10", title: "ICSE Class 10", subjects: ["java", "ai"] },
      { id: "isc-class-11", title: "ISC Class 11", subjects: ["java", "ai"] },
      { id: "isc-class-12", title: "ISC Class 12", subjects: ["java", "ai"] },
    ],
  },
  cbse: {
    title: "CBSE",
    classes: [
      { id: "class-9", title: "CBSE Class 9", subjects: ["402"] },
      { id: "class-10", title: "CBSE Class 10", subjects: ["402"] },
      { id: "class-11", title: "CBSE Class 11", subjects: ["083", "065", "802"] },
      { id: "class-12", title: "CBSE Class 12", subjects: ["083", "065", "802"] },
    ],
  },
};

function getStartLearningHref(board, selectedClass) {
  if (!selectedClass?.id) return "/study";
  const subject = selectedClass.subjects?.[0];
  if (board === "cisce") {
    if (selectedClass.id === "icse-class-9") return "/icse/class-ix";
    if (selectedClass.id === "icse-class-10") return "/icse/class-x";
    if (subject === "ai") return "/isc/robotics-ai/class-x";
    if (selectedClass.id === "isc-class-11") return "/isc/class-xi";
    if (selectedClass.id === "isc-class-12") return "/isc/class-xii";
    return "/Java";
  }
  return `/cbse/class/${selectedClass.id.replace("class-", "")}/subject/${subject || "402"}`;
}

export default function ClientHome() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showClasses, setShowClasses] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const [showStartLearning, setShowStartLearning] = useState(false);

  const { board, class: selectedClassData, subject, setBoard, setClass, setSubject, clearPersonalization, isHydrated } = usePersonalization();
  const personalization = useMemo(() => ({ board, class: selectedClassData, subject }), [board, selectedClassData, subject]);

  useEffect(() => {
    if (!isHydrated) return;
    if (board && selectedClassData && subject) {
      setSelectedBoard(board);
      setSelectedClass({ ...selectedClassData, subjects: [subject] });
      setShowClasses(false);
      setShowSubjects(false);
      setShowStartLearning(true);
    } else if (board && !selectedClassData) {
      setSelectedBoard(board);
      setSelectedClass(null);
      setShowClasses(true);
      setShowSubjects(false);
      setShowStartLearning(false);
    }
  }, [isHydrated, board, selectedClassData, subject]);

  const handleBoardSelect = (boardId) => {
    setSelectedBoard(boardId);
    setBoard(boardId);
    setSelectedClass(null);
    setClass(null);
    setSubject(null);
    setShowClasses(false);
    setShowSubjects(false);
    setShowStartLearning(false);
  };

  const handleClassSelect = (classData) => {
    setSelectedClass(classData);
    setClass(classData);
    if (classData?.subjects?.length === 1) {
      setSubject(classData.subjects[0]);
      setShowStartLearning(true);
      setShowSubjects(false);
    } else {
      setSubject(null);
      setShowStartLearning(false);
      setShowSubjects(true);
    }
    setShowClasses(false);
  };

  const handleSubjectSelect = (subjectId) => {
    if (!subjectId || !selectedBoard) return;
    setSubject(subjectId);
    setSelectedClass((current) => current ? { ...current, subjects: [subjectId] } : current);
    setShowSubjects(false);
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
    setSubject(null);
    setShowClasses(true);
    setShowSubjects(false);
    setShowStartLearning(false);
  };

  const startLearningHref = getStartLearningHref(board || selectedBoard, selectedClassData || selectedClass);

  return (
    <main id="main-content" className="site-body min-h-screen">
      <Navbar />
      <div className="home-workspace mx-auto w-full max-w-[1480px] px-3 pb-8 pt-3 sm:px-5 lg:px-6">
        <div className="home-panel overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white/95 shadow-[0_24px_70px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-900/95">
          <ErrorBoundary>
            <div className="home-primary">
              <RedesignedHero
                onBoardSelect={handleBoardSelect}
                onBackToBoards={handleBackToBoards}
                onBackToClasses={handleBackToClasses}
                onClassSelect={handleClassSelect}
                onSubjectSelect={handleSubjectSelect}
                showSubjects={showSubjects}
                showClasses={showClasses}
                selectedBoard={selectedBoard}
                selectedClass={selectedClass}
                showStartLearning={showStartLearning}
                onStartLearning={() => window.location.assign(startLearningHref)}
                personalization={personalization}
              />
              <div className="grid gap-4 border-t border-slate-100 p-4 sm:p-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,.65fr)] lg:p-6 dark:border-slate-800">
                <SpotlightLearningCard />
                <Stats />
              </div>
            </div>

            <div className="home-secondary border-t border-slate-100 dark:border-slate-800">
              <div className="grid gap-0 lg:grid-cols-2">
                <WhyTarget95 />
                <AIWorkflow />
              </div>
              <BoardSupport />
              <Features />
              <div className="grid gap-0 border-t border-slate-100 lg:grid-cols-2 dark:border-slate-800">
                <FAQ />
                <Newsletter />
              </div>
            </div>
          </ErrorBoundary>
        </div>
      </div>
      <Footer />
    </main>
  );
}
