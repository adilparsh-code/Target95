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

export default function ClientHome() {
  const [showSubjects, setShowSubjects] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero onExplore={() => setShowSubjects(true)} />
      <Subjects isVisible={showSubjects} />
      <Stats />
      <WhyTarget95 />
      <AIWorkflow />
      <BoardSupport />
      <Features />
      <Testimonials />
      <FAQ />
      <Pricing />
      <Newsletter />
      <Footer />
    </main>
  );
}