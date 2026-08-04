"use client";

import { useState } from "react";
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

export default function ClientHome() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showSubjects, setShowSubjects] = useState(false);
  const [showStartLearning, setShowStartLearning] = useState(false);

  const handleBoardSelect = (board) => {
    setSelectedBoard(board);
    setShowSubjects(true);
    setShowStartLearning(true);
  };

  const handleBackToBoards = () => {
    setSelectedBoard(null);
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
          showSubjects={showSubjects} 
          selectedBoard={selectedBoard}
          showStartLearning={showStartLearning}
          onStartLearning={handleStartLearning}
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