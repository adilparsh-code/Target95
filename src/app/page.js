"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Subjects from "./components/Subjects";

export default function Home() {
  const [showSubjects, setShowSubjects] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero onExplore={() => setShowSubjects(true)} />
      <Subjects isVisible={showSubjects} />
      <Stats />
      <Features />
      <Footer />
    </main>
  );
}