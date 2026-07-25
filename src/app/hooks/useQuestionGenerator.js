"use client";

import { useState } from "react";
import { QuestionGeneratorService } from "../services/QuestionGeneratorService";

export function useQuestionGenerator() {
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateQuestions = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const questions = await QuestionGeneratorService.generateQuestions(formData);
      setGeneratedQuestions(questions);
    } catch (err) {
      console.error("Error generating questions:", err);
      setError(err.message || "Failed to generate questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuestions = () => {
    setGeneratedQuestions([]);
    setError(null);
  };

  return {
    generatedQuestions,
    isLoading,
    error,
    generateQuestions,
    resetQuestions,
  };
}