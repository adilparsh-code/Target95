// Example inside your parent ClientHome.jsx or page.jsx
"use client";

import { useState } from "react";
import Navbar from "../components/Navbar"; // <-- Make sure your Navbar is imported here!
import RedesignedHero from "../components/RedesignedHero";

export default function ClientHome() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showClasses, setShowClasses] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);

  // 1. Board Select Handler
  const handleBoardSelect = (boardId) => {
    setSelectedBoard(boardId);
    setShowClasses(true);
  };

  // 2. Class Select Handler
  const handleClassSelect = (classObj) => {
    setSelectedClass(classObj);
    setShowClasses(false);
    setShowSubjects(true);
  };

  // 3. Back Handlers
  const handleBackToBoards = () => {
    setShowClasses(false);
    setSelectedBoard(null);
  };

  const handleBackToClasses = () => {
    setShowSubjects(false);
    setShowClasses(true);
  };

  return (
    <main className="min-h-screen bg-slate-950">
      {/* LOGIN & SEARCH BELONG HERE IN THE NAVBAR, NOT IN THE HERO */}
      <Navbar />

      {/* HERO SECTION WITH CORRECT HANDLERS PASSED */}
      <RedesignedHero
        selectedBoard={selectedBoard}
        selectedClass={selectedClass}
        showClasses={showClasses}
        showSubjects={showSubjects}
        onBoardSelect={handleBoardSelect}
        onClassSelect={handleClassSelect}
        onBackToBoards={handleBackToBoards}
        onBackToClasses={handleBackToClasses}
      />
    </main>
  );
}