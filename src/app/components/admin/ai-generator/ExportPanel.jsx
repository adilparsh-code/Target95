"use client";

import { useState } from "react";
import Button from "../../ui/Button";
import { QuestionGeneratorService } from "../../../services/QuestionGeneratorService";

export default function ExportPanel({ questions }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format) => {
    if (questions.length === 0) {
      alert("No questions to export");
      return;
    }

    setIsExporting(true);
    try {
      await QuestionGeneratorService.exportQuestions(questions, format);
    } catch (error) {
      console.error(`Error exporting as ${format}:`, error);
      alert(`Failed to export as ${format}. Please try again.`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex gap-3">
      <Button
        variant="secondary"
        onClick={() => handleExport("json")}
        disabled={isExporting || questions.length === 0}
        className="flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export JSON
      </Button>
      <Button
        variant="secondary"
        onClick={() => handleExport("csv")}
        disabled={isExporting || questions.length === 0}
        className="flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export CSV
      </Button>
      <Button
        variant="secondary"
        onClick={() => handleExport("pdf")}
        disabled={isExporting || questions.length === 0}
        className="flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export PDF
      </Button>
    </div>
  );
}