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
  ProgrammingSection,
  PyqSection,
  RevisionNotesSection,
} from "./sections";

/**
 * ChapterContentEngine
 * Reusable content renderer that automatically renders all chapter sections
 * from structured data. Future chapters work without creating new components.
 *
 * @param {Object} chapter - Chapter object with studyData
 * @param {Object} content - Optional rich content from chapter-content
 * @param {Object} questions - Optional question bank data
 * @param {Array} completedSections - Array of completed section IDs
 */
export default function ChapterContentEngine({
  chapter,
  content = null,
  questions = null,
  completedSections = [],
}) {
  const sections = useMemo(
    () => getChapterContent(chapter, content, questions),
    [chapter, content, questions]
  );

  const isCompleted = (id) => completedSections.includes(`section-${id}`);

  return (
    <div className="space-y-12">
      {hasSectionContent(sections.learningObjectives) && (
        <LearningObjectivesSection
          items={sections.learningObjectives}
          isCompleted={isCompleted("learning-objectives")}
        />
      )}

      {hasSectionContent(sections.theory) && (
        <TheorySection
          sections={sections.theory}
          isCompleted={isCompleted("theory")}
        />
      )}

      {hasSectionContent(sections.definitions) && (
        <DefinitionsSection
          items={sections.definitions}
          isCompleted={isCompleted("definitions")}
        />
      )}

      {hasSectionContent(sections.keyTerms) && (
        <KeyTermsSection
          items={sections.keyTerms}
          isCompleted={isCompleted("key-terms")}
        />
      )}

      {hasSectionContent(sections.examples) && (
        <ExamplesSection
          items={sections.examples}
          isCompleted={isCompleted("examples")}
        />
      )}

      {hasSectionContent(sections.diagrams) && (
        <DiagramsSection
          items={sections.diagrams}
          isCompleted={isCompleted("diagrams")}
        />
      )}

      {hasSectionContent(sections.practice) && (
        <PracticeSection
          practice={sections.practice}
          isCompleted={isCompleted("practice")}
        />
      )}

      {hasSectionContent(sections.mcqs) && (
        <McqSection
          items={sections.mcqs}
          isCompleted={isCompleted("mcqs")}
        />
      )}

      {hasSectionContent(sections.programming) && (
        <ProgrammingSection
          items={sections.programming}
          isCompleted={isCompleted("programming")}
        />
      )}

      {hasSectionContent(sections.pyqs) && (
        <PyqSection
          items={sections.pyqs}
          isCompleted={isCompleted("previous-year-questions")}
        />
      )}

      {hasSectionContent(sections.revisionNotes) && (
        <RevisionNotesSection
          items={sections.revisionNotes}
          isCompleted={isCompleted("revision-notes")}
        />
      )}
    </div>
  );
}