"use client";

import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MockTestHome from "../components/mocktest/MockTestHome";
import MockTestPlayer from "../components/mocktest/MockTestPlayer";
import MockTestResults from "../components/mocktest/MockTestResults";
import useMockTest from "../hooks/useMockTest";
import { generateMockTestQuestions } from "../../lib/mocktest";

export default function MockTestPage() {
  const { history, saveResult } = useMockTest();
  const [stage, setStage] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [config, setConfig] = useState(null);
  const [result, setResult] = useState(null);

  const handleStart = ({ chapter, difficulty, questionCount, type }) => {
    const generatedQuestions = generateMockTestQuestions({
      chapter,
      difficulty,
      type,
      count: questionCount,
    });

    setConfig({ chapter, difficulty, questionCount, type });
    setQuestions(generatedQuestions);
    setStage("player");
    setResult(null);
  };

  const handleSubmit = (submittedResult) => {
    saveResult(submittedResult);
    setResult(submittedResult);
    setStage("results");
  };

  const handleRetry = () => {
    setStage("home");
    setQuestions([]);
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      {stage === "home" ? (
        <MockTestHome onStart={handleStart} history={history} />
      ) : stage === "player" ? (
        <MockTestPlayer questions={questions} config={config} onSubmit={handleSubmit} />
      ) : (
        <MockTestResults result={result} onRetry={handleRetry} />
      )}
      <Footer />
    </main>
  );
}
