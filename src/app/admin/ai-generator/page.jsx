"use client";

import { useState } from "react";
import GeneratorForm from "../../components/admin/ai-generator/GeneratorForm";
import QuestionPreview from "../../components/admin/ai-generator/QuestionPreview";
import LoadingState from "../../components/admin/ai-generator/LoadingState";
import { useQuestionGenerator } from "../../hooks/useQuestionGenerator";

export default function AIGeneratorPage() {
  const { generatedQuestions, isLoading, error, generateQuestions, resetQuestions } = useQuestionGenerator();

  return (
    <div className="space-y-6">
      <GeneratorForm onGenerate={generateQuestions} isLoading={isLoading} />
      
      {isLoading && <LoadingState />}
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      
      {generatedQuestions.length > 0 && (
        <QuestionPreview 
          questions={generatedQuestions}
          onReset={resetQuestions}
        />
      )}
    </div>
  );
}