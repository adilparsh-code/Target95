"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { usePractice } from "../../hooks/usePractice";
import { getCBSEPracticeQuestions } from "../../data/cbse/question-bank-2026-27";

const CISE_SUBJECTS = [
  { id: "java", name: "Java Programming", board: "ICSE" },
  { id: "java", name: "Computer Science (Java)", board: "ISC" },
];
const ICSE_CHAPTERS = [
  ["introduction", "Introduction to Java"], ["variables", "Variables & Data Types"], ["operators", "Operators"],
  ["control-flow", "Control Flow"], ["methods", "Methods"], ["oops", "Object-Oriented Programming"]
].map(([id, name]) => ({ id, name }));

export default function PracticeSetup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { settings, updateSettings, startPractice, loading, error } = usePractice();

  const queryContext = useMemo(() => {
    const board = (searchParams.get("board") || "ICSE").toUpperCase();
    const classNumber = Number(searchParams.get("class") || (board === "ICSE" ? 10 : board === "ISC" ? 12 : 10));
    const subjectCode = searchParams.get("subjectCode") || "";
    const subjectName = searchParams.get("subject") || "";
    return { board, classNumber, subjectCode, subjectName };
  }, [searchParams]);

  useEffect(() => {
    const { board, classNumber, subjectCode, subjectName } = queryContext;
    if (board === "CBSE") {
      const code = subjectCode || (classNumber <= 10 ? "402" : "083");
      const name = subjectName || ({ "402": "Information Technology", "083": "Computer Science", "065": "Informatics Practices", "802": "Information Technology" }[code] || "CBSE Subject");
      updateSettings({ board, classNumber, subjectCode: code, subject: `cbse-${code}`, subjectName: name, chapter: "" });
    } else {
      updateSettings({ board, classNumber, subjectCode: "", subject: "java", subjectName: board === "ISC" ? "Computer Science (Java)" : "Computer Applications (Java)", chapter: "" });
    }
  }, [queryContext, updateSettings]);

  const cbseQuestions = useMemo(() => {
    if (queryContext.board !== "CBSE" || !queryContext.subjectCode) return [];
    return getCBSEPracticeQuestions(queryContext.classNumber, queryContext.subjectCode);
  }, [queryContext]);

  const subjects = queryContext.board === "CBSE"
    ? [{ id: `cbse-${queryContext.subjectCode}`, name: `${queryContext.subjectName || "CBSE Subject"} (Code ${queryContext.subjectCode})` }]
    : CISE_SUBJECTS.filter((item) => item.board === queryContext.board);

  const chapters = queryContext.board === "CBSE"
    ? Array.from(new Map(cbseQuestions.map((q) => [q.topicId, q.topicId])).keys()).map((topic) => ({ id: topic, name: topic.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) }))
    : ICSE_CHAPTERS;

  const difficulties = [
    { id: "easy", name: "Easy", description: "Foundational concepts" },
    { id: "medium", name: "Medium", description: "Intermediate problems" },
    { id: "hard", name: "Hard", description: "Advanced challenges" },
    { id: "mixed", name: "Mixed", description: "All difficulty levels" }
  ];
  const questionCounts = [5, 10, 15, 20];
  const availableChapters = chapters;

  const handleStartPractice = async () => {
    try {
      const session = await startPractice();
      if (session?.id) router.push(`/practice/session?id=${session.id}`);
    } catch (err) {
      console.error("Failed to start practice:", err);
    }
  };

  const buttonClass = (active) => `w-full rounded-xl border-2 p-3 text-left transition-all ${active ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 hover:border-gray-300 dark:border-gray-700"}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">{settings.board || queryContext.board} • Class {settings.classNumber || queryContext.classNumber}{settings.subjectCode ? ` • Code ${settings.subjectCode}` : ""}</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Start a New Practice Session</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Practice stays locked to the selected board, class and subject.</p>
      </div>

      {error && <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">{error}</div>}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Subject</h3>
          <div className="space-y-2">
            {subjects.map((subject) => <button key={subject.id} type="button" onClick={() => updateSettings({ subject: subject.id, chapter: "" })} className={buttonClass(settings.subject === subject.id)}>{subject.name}</button>)}
          </div>
          {queryContext.board === "CBSE" && <p className="mt-4 text-xs text-gray-500">CBSE programming questions use Python where applicable; CISCE Java is never used here.</p>}
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Chapter / Topic</h3>
          <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
            <button type="button" onClick={() => updateSettings({ chapter: "" })} className={buttonClass(!settings.chapter)}>All Chapters / Topics</button>
            {availableChapters.map((chapter) => <button key={chapter.id} type="button" onClick={() => updateSettings({ chapter: chapter.id })} className={buttonClass(settings.chapter === chapter.id)}>{chapter.name}</button>)}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Difficulty</h3>
          <div className="space-y-2">{difficulties.map((difficulty) => <button key={difficulty.id} type="button" onClick={() => updateSettings({ difficulty: difficulty.id })} className={buttonClass(settings.difficulty === difficulty.id)}><div className="font-medium text-gray-900 dark:text-white">{difficulty.name}</div><div className="text-sm text-gray-500 dark:text-gray-400">{difficulty.description}</div></button>)}</div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Session Settings</h3>
          <label className="mb-4 block text-sm font-medium text-gray-700 dark:text-gray-300">Number of Questions
            <div className="mt-2 grid grid-cols-4 gap-2">{questionCounts.map((count) => <button key={count} type="button" onClick={() => updateSettings({ questionCount: count })} className={`rounded-lg border-2 p-2 ${settings.questionCount === count ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700"}`}>{count}</button>)}</div>
          </label>
          <div className="flex items-center justify-between">
            <div><h4 className="font-medium text-gray-900 dark:text-white">Enable Timer</h4><p className="text-sm text-gray-500 dark:text-gray-400">Simulate exam conditions</p></div>
            <button type="button" aria-label="Toggle practice timer" onClick={() => updateSettings({ hasTimer: !settings.hasTimer })} className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.hasTimer ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`}><span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${settings.hasTimer ? "translate-x-6" : "translate-x-1"}`} /></button>
          </div>
          {settings.hasTimer && <div className="mt-4"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Duration (minutes)</label><Input type="number" min={5} max={180} value={settings.duration} onChange={(e) => updateSettings({ duration: parseInt(e.target.value, 10) || 30 })} className="mt-2 w-full" /></div>}
        </Card>
      </div>

      <div className="mt-8 text-center"><Button onClick={handleStartPractice} disabled={loading || !settings.subject || !settings.difficulty} variant="primary" size="lg" className="px-12">{loading ? "Starting Practice..." : "Start Practice"}</Button></div>
    </div>
  );
}
