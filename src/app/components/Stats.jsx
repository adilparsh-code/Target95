"use client";

import Container from "./ui/Container";
import AnimatedCounter from "./AnimatedCounter";
import { javaChapters } from "../data/javaCurriculum";
import { allJavaChapterQuestions } from "../../lib/javaChapterQuestionBank";
import { CATEGORIES as mockTestCategories } from "@/lib/mocktest";

const topicCount = javaChapters.reduce((total, chapter) => total + (Array.isArray(chapter.topics) ? chapter.topics.length : 0), 0);
const stats = [
  { end: javaChapters.length, suffix: "", title: "Chapters covered", icon: "01" },
  { end: allJavaChapterQuestions.length, suffix: "+", title: "Questions available", icon: "02" },
  { end: topicCount, suffix: "", title: "Topics to master", icon: "03" },
  { end: mockTestCategories.length, suffix: "", title: "Practice tests", icon: "04" },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20" aria-label="Platform highlights">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-slate-200" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Built for serious preparation</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Everything in one focused platform.</h2>
          <p className="mt-3 text-base leading-7 text-slate-600">A growing library designed to help students learn, practise and measure progress.</p>
        </div>
        <div className="mt-10 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div key={item.title} className="group relative p-6 sm:p-7 lg:p-8">
              {index < stats.length - 1 && <div className="absolute bottom-6 right-0 top-6 hidden w-px bg-slate-100 lg:block" />}
              <div className="flex items-center justify-between"><span className="text-xs font-black tracking-[0.18em] text-slate-300">{item.icon}</span><span className="h-2 w-2 rounded-full bg-blue-500 transition group-hover:scale-125" /></div>
              <div className="mt-8 text-4xl font-black tracking-tight text-slate-950"><AnimatedCounter end={item.end} suffix={item.suffix} /></div>
              <p className="mt-2 text-sm font-semibold text-slate-500">{item.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
