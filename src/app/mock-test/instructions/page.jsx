"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function InstructionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "icse-class-10";
  const board = searchParams.get("board") || (category.startsWith("cbse-") ? "CBSE" : category.startsWith("isc-") ? "ISC" : "ICSE");
  const classNumber = searchParams.get("class") || category.split("-").pop() || "10";
  const subjectCode = searchParams.get("subjectCode") || "";
  const subject = searchParams.get("subject") || "";
  const difficulty = searchParams.get("difficulty") || "medium";
  const type = searchParams.get("type") || "mixed";
  const count = Number(searchParams.get("count") || "10");
  const chapter = searchParams.get("chapter") || "all";
  const mode = searchParams.get("mode") || "exam";
  const duration = Number(searchParams.get("duration") || String(count * 1.5));
  const categoryLabel = category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const durationLabel = duration >= 60 ? `${Math.floor(duration / 60)}h ${duration % 60 ? `${duration % 60}m` : ""}`.trim() : `${duration} minutes`;

  const handleStart = () => {
    const params = new URLSearchParams({ board, class: classNumber, category, chapter, difficulty, type, count: String(count), mode, duration: String(duration) });
    if (subjectCode) params.set("subjectCode", subjectCode);
    if (subject) params.set("subject", subject);
    router.push(`/mock-test/player?${params.toString()}`);
  };

  return <main className="min-h-screen bg-gradient-to-b from-white to-blue-50"><Navbar /><div className="h-20 sm:h-24 lg:h-28" /><div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8"><div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">{board} • Class {classNumber}{subjectCode ? ` • Code ${subjectCode}` : ""}</p><h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">{categoryLabel} — {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mock Test</h1>{subject && <p className="mt-2 text-gray-600">{subject}</p>}</div><div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"><h2 className="text-xl font-bold text-gray-900">Please read carefully before starting</h2><ul className="mt-6 space-y-4">{[{ icon: "⏱️", text: `You have ${durationLabel} to complete this test.` },{ icon: "📝", text: type === "mixed" ? "This test includes mixed question types." : `This test contains only ${type} questions.` },{ icon: "📌", text: "You can bookmark questions and navigate freely between them." },{ icon: "✅", text: "Unanswered questions will be marked as incorrect on submission." },{ icon: "📊", text: "Results will show your score, accuracy, and detailed answer review." }].map((item, i) => <li key={i} className="flex items-start gap-3"><span className="mt-0.5 text-lg">{item.icon}</span><span className="text-base text-gray-700">{item.text}</span></li>)}</ul><div className="mt-8 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={handleStart} className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700">Start Test Now</button><button type="button" onClick={() => router.push(`/mock-test?board=${encodeURIComponent(board)}&class=${classNumber}${subjectCode ? `&subjectCode=${encodeURIComponent(subjectCode)}` : ""}${subject ? `&subject=${encodeURIComponent(subject)}` : ""}`)} className="rounded-xl border border-gray-300 bg-white px-8 py-3 font-semibold text-gray-900 transition hover:border-gray-400">Back to Setup</button></div></div></div><Footer /></main>;
}

export default function MockTestInstructionsPage() {
  return <Suspense fallback={<main className="min-h-screen bg-gradient-to-b from-white to-blue-50"><Navbar /><div className="h-20 sm:h-24 lg:h-28" /><div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" /></div><Footer /></main>}><InstructionsContent /></Suspense>;
}
