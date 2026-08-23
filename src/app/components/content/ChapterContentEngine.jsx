"use client";

import { useMemo } from "react";
import { getChapterContent, hasSectionContent } from "../../../lib/chapterContent";
import {
  LearningObjectivesSection,
  TheorySection,
  DefinitionsSection,
  KeyTermsSection,
  ExamplesSection,
  DiagramsSection,
  PracticeSection,
  McqSection,
  OutputSection,
  ProgrammingSection,
  PyqSection,
  RevisionNotesSection,
} from "./sections";

function hasMeaningfulContent(value) {
  if (!value) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return Boolean(String(value).trim());
}

export default function ChapterContentEngine({ chapter, content = null, questions = null, completedSections = [] }) {
  const sections = useMemo(
    () => getChapterContent(chapter, content, questions),
    [chapter, content, questions]
  );

  const isCompleted = (id) => completedSections.includes(`section-${id}`);

  return (
    <div className="space-y-10">
      {hasSectionContent(sections.learningObjectives) && <LearningObjectivesSection items={sections.learningObjectives} isCompleted={isCompleted("learning-objectives")} />}
      {hasSectionContent(sections.theory) && <TheorySection sections={sections.theory} isCompleted={isCompleted("theory")} />}
      {hasSectionContent(sections.definitions) && <DefinitionsSection items={sections.definitions} isCompleted={isCompleted("definitions")} />}
      {hasSectionContent(sections.keyTerms) && <KeyTermsSection items={sections.keyTerms} isCompleted={isCompleted("key-terms")} />}
      {hasSectionContent(sections.examples) && <ExamplesSection items={sections.examples} isCompleted={isCompleted("examples")} />}
      {hasSectionContent(sections.diagrams) && <DiagramsSection items={sections.diagrams} isCompleted={isCompleted("diagrams")} />}
      {hasSectionContent(sections.practice) && <PracticeSection practice={sections.practice} isCompleted={isCompleted("practice")} />}
      {hasSectionContent(sections.mcqs) && <McqSection items={sections.mcqs} isCompleted={isCompleted("mcqs")} />}
      {hasSectionContent(sections.output) && <OutputSection items={sections.output} isCompleted={isCompleted("output")} />}
      {hasSectionContent(sections.programming) && <ProgrammingSection items={sections.programming} isCompleted={isCompleted("programming")} />}
      {hasSectionContent(sections.pyqs) && <PyqSection items={sections.pyqs} isCompleted={isCompleted("previous-year-questions")} />}
      {hasSectionContent(sections.revisionNotes) && <RevisionNotesSection items={sections.revisionNotes} isCompleted={isCompleted("revision-notes")} />}
    </div>
  );
}
