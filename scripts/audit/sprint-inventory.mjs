#!/usr/bin/env node
/**
 * Target95 sprint inventory.
 *
 * Derives the board/class/subject content census directly from the BoardPrep
 * registries and chapter JSON on disk. It never trusts README counts.
 *
 * Output: docs/audits/target95-board-subject-inventory.json
 *
 * Counts that cannot be derived from repository data (official syllabus topic
 * totals, academic review dates, production visibility) are reported as
 * "UNKNOWN" rather than guessed.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..", "..");
const contentRoot = path.join(repoRoot, "src/app/data/boardprep/content");
const outFile = path.join(repoRoot, "docs/audits/target95-board-subject-inventory.json");

const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const dirs = (folder) =>
  fs
    .readdirSync(folder, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

function allChapters(subject) {
  return (subject?.sections || [])
    .flatMap((section) => section.groups || [])
    .flatMap((group) => group.chapters || []);
}

function resolveChapterFile(subjectDir, chapter) {
  if (!chapter.file) return null;
  const primary = path.join(subjectDir, ...chapter.file.split("/"));
  if (fs.existsSync(primary)) return primary;
  const sibling = path.join(subjectDir, "..", "chapters", path.basename(chapter.file));
  if (fs.existsSync(sibling)) return sibling;
  const alt = path.join(subjectDir, chapter.file);
  if (fs.existsSync(alt)) return alt;
  return null;
}

/** Answer-key presence, tolerant of both flat and nested answer schemas. */
function questionFieldCensus(questions) {
  let withAnswer = 0;
  let withExplanation = 0;
  let mcq = 0;
  let mcqMissingAnswerIndex = 0;
  const ids = new Set();
  const duplicateIds = [];
  const missingAnswerIds = [];

  for (const question of questions) {
    const nested = question.answer && typeof question.answer === "object" ? question.answer : null;
    const hasAnswer =
      (typeof question.answer === "string" && question.answer.trim() !== "") ||
      (nested && (nested.text !== undefined || nested.correctIndex !== undefined));

    if (!question.id || ids.has(question.id)) duplicateIds.push(question.id || "(missing)");
    if (question.id) ids.add(question.id);
    if (hasAnswer) withAnswer += 1;
    else missingAnswerIds.push(question.id);

    const explanation =
      (typeof question.explanation === "string" && question.explanation.trim() !== "") ||
      (nested && typeof nested.explanation === "string" && nested.explanation.trim() !== "");
    if (explanation) withExplanation += 1;

    const isMcq =
      question.type === "mcq" ||
      Array.isArray(question.options) ||
      (nested && nested.type === "correctIndex");
    if (isMcq) {
      mcq += 1;
      const index = nested ? nested.correctIndex : question.correctIndex;
      if (!Number.isInteger(index)) mcqMissingAnswerIndex += 1;
    }
  }

  return {
    questions: questions.length,
    questionsWithAnswer: withAnswer,
    questionsWithExplanation: withExplanation,
    mcqQuestions: mcq,
    mcqMissingAnswerIndex,
    duplicateQuestionIds: duplicateIds,
    missingAnswerIds,
  };
}

const boards = [];
const subjects = [];
const computerTracks = [];
const COMPUTER_SLUGS = new Set([
  "computer-applications",
  "computer-science",
  "computer",
  "informatics-practices",
  "artificial-intelligence",
  "ai",
  "java",
  "python",
]);

for (const boardSlug of dirs(contentRoot)) {
  const boardFile = path.join(contentRoot, boardSlug, "board.json");
  if (!fs.existsSync(boardFile)) continue;
  const board = read(boardFile);
  const boardEntry = { slug: boardSlug, title: board.title || board.name || boardSlug, classes: [] };

  for (const classSlug of dirs(path.join(contentRoot, boardSlug))) {
    const classFile = path.join(contentRoot, boardSlug, classSlug, "class.json");
    if (!fs.existsSync(classFile)) continue;
    const classData = read(classFile);
    const classEntry = { slug: classSlug, title: classData.title || classSlug, subjects: 0, chapters: 0, questions: 0 };

    for (const subjectMeta of classData.subjects || []) {
      const subjectDir = path.join(contentRoot, boardSlug, classSlug, subjectMeta.slug);
      const subjectFile = path.join(subjectDir, "subject.json");
      if (!fs.existsSync(subjectFile)) {
        subjects.push({
          board: boardSlug,
          class: classSlug,
          subject: subjectMeta.slug,
          registered: true,
          registryFilePresent: false,
          notes: ["subject.json missing for a subject listed in class.json"],
        });
        continue;
      }
      const subject = read(subjectFile);
      const chapters = allChapters(subject);
      const byStatus = { published: 0, draft: 0, planned: 0, other: 0 };
      const missingFiles = [];
      const publishedSlugs = [];

      for (const chapter of chapters) {
        const status = chapter.status || "other";
        if (byStatus[status] === undefined) byStatus.other += 1;
        else byStatus[status] += 1;
        if (status === "published") {
          publishedSlugs.push(chapter.slug);
          if (!resolveChapterFile(subjectDir, chapter)) missingFiles.push(chapter.id || chapter.slug);
        }
      }

      let publishedQuestions = 0;
      let publishedWithAnswer = 0;
      let publishedWithExplanation = 0;
      let publishedMcq = 0;
      let publishedMcqMissingIndex = 0;
      const duplicateQuestionIds = [];
      const missingAnswerIds = [];

      for (const slug of publishedSlugs) {
        const chapter = chapters.find((item) => item.slug === slug);
        const file = resolveChapterFile(subjectDir, chapter);
        if (!file) continue;
        let data;
        try {
          data = read(file);
        } catch (error) {
          missingFiles.push(`${chapter.id || slug} (unparseable: ${error.message})`);
          continue;
        }
        const census = questionFieldCensus(data.questions || []);
        publishedQuestions += census.questions;
        publishedWithAnswer += census.questionsWithAnswer;
        publishedWithExplanation += census.questionsWithExplanation;
        publishedMcq += census.mcqQuestions;
        publishedMcqMissingIndex += census.mcqMissingAnswerIndex;
        duplicateQuestionIds.push(...census.duplicateQuestionIds);
        missingAnswerIds.push(...census.missingAnswerIds);
      }

      const entry = {
        board: boardSlug,
        class: classSlug,
        subject: subjectMeta.slug,
        title: subject.title || subjectMeta.title || subjectMeta.slug,
        registered: true,
        registryFilePresent: true,
        registeredChapters: chapters.length,
        published: byStatus.published,
        draft: byStatus.draft,
        planned: byStatus.planned,
        otherStatus: byStatus.other,
        publishedFilesResolved: publishedSlugs.length - missingFiles.length,
        missingChapterFiles: missingFiles,
        publishedQuestions,
        publishedQuestionsWithAnswer: publishedWithAnswer,
        publishedQuestionsWithExplanation: publishedWithExplanation,
        publishedMcqQuestions: publishedMcq,
        publishedMcqMissingAnswerIndex: publishedMcqMissingIndex,
        duplicateQuestionIds,
        missingAnswerIds,
        syllabusTopics: "UNKNOWN",
        syllabusTopicsMapped: "UNKNOWN",
        academicReview: "UNKNOWN",
        originalityReview: "ORIGINALITY_UNREVIEWED",
        productionVisibility:
          byStatus.published > 0 ? "published chapters are student-visible" : "no published chapters",
      };

      subjects.push(entry);
      classEntry.subjects += 1;
      classEntry.chapters += entry.published;
      classEntry.questions += entry.publishedQuestions;

      if (COMPUTER_SLUGS.has(subjectMeta.slug)) {
        computerTracks.push({
          board: boardSlug,
          class: classSlug,
          subject: subjectMeta.slug,
          title: entry.title,
          registeredChapters: entry.registeredChapters,
          published: entry.published,
          draft: entry.draft,
          planned: entry.planned,
          missingChapterFiles: entry.missingChapterFiles,
          publishedQuestions: entry.publishedQuestions,
          publishedQuestionsWithExplanation: entry.publishedQuestionsWithExplanation,
          publishedMcqMissingAnswerIndex: entry.publishedMcqMissingAnswerIndex,
          duplicateQuestionIds: entry.duplicateQuestionIds,
        });
      }
    }

    boardEntry.classes.push(classEntry);
  }
  boards.push(boardEntry);
}

const totals = {
  boards: boards.length,
  classes: boards.reduce((sum, board) => sum + board.classes.length, 0),
  subjects: subjects.filter((subject) => subject.registryFilePresent).length,
  registeredChapters: subjects.reduce((sum, subject) => sum + (subject.registeredChapters || 0), 0),
  publishedChapters: subjects.reduce((sum, subject) => sum + (subject.published || 0), 0),
  draftChapters: subjects.reduce((sum, subject) => sum + (subject.draft || 0), 0),
  plannedChapters: subjects.reduce((sum, subject) => sum + (subject.planned || 0), 0),
  publishedQuestions: subjects.reduce((sum, subject) => sum + (subject.publishedQuestions || 0), 0),
  publishedQuestionsWithAnswer: subjects.reduce(
    (sum, subject) => sum + (subject.publishedQuestionsWithAnswer || 0),
    0,
  ),
  publishedQuestionsWithExplanation: subjects.reduce(
    (sum, subject) => sum + (subject.publishedQuestionsWithExplanation || 0),
    0,
  ),
  publishedMcqQuestions: subjects.reduce((sum, subject) => sum + (subject.publishedMcqQuestions || 0), 0),
  publishedMcqMissingAnswerIndex: subjects.reduce(
    (sum, subject) => sum + (subject.publishedMcqMissingAnswerIndex || 0),
    0,
  ),
  duplicateQuestionIds: subjects.reduce((sum, subject) => sum + (subject.duplicateQuestionIds?.length || 0), 0),
  missingAnswerIds: subjects.reduce((sum, subject) => sum + (subject.missingAnswerIds?.length || 0), 0),
  subjectsWithMissingChapterFiles: subjects.filter((subject) => subject.missingChapterFiles?.length).length,
};

const report = {
  generatedAt: new Date().toISOString(),
  generatedBy: "scripts/audit/sprint-inventory.mjs",
  source: "src/app/data/boardprep/content (registries + chapter JSON)",
  totals,
  boards,
  subjects,
  computerTracks,
};

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log(`Wrote ${path.relative(repoRoot, outFile)}`);
console.log(JSON.stringify(totals, null, 2));
