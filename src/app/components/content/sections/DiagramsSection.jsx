"use client";

import ChapterSection from "../../ChapterSection";
import { FileText } from "lucide-react";
import Image from "next/image";
import icseJavaVisualRegistry from "../../../data/icseJavaVisualRegistry";

function MemoryModelVisual() {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-4" aria-label="Java 2D array memory model diagram">
      <div className="min-w-[560px]">
        <div className="mb-4 text-center text-sm font-semibold text-slate-700">Java 2D Array = outer array of row references</div>
        <div className="flex items-center justify-center gap-6">
          <div className="rounded-xl border-2 border-slate-300 bg-white px-5 py-4 text-center shadow-sm">
            <div className="font-mono text-lg font-bold text-slate-900">a</div>
            <div className="text-xs text-slate-500">reference</div>
          </div>
          <div className="text-2xl font-bold text-slate-500" aria-hidden="true">→</div>
          <div className="rounded-xl border-2 border-blue-300 bg-blue-50 px-5 py-4 text-center shadow-sm">
            <div className="font-mono font-bold text-slate-900">outer array</div>
            <div className="mt-2 flex gap-2">
              <span className="rounded-lg bg-white px-3 py-2 font-mono text-sm shadow-sm">ref0</span>
              <span className="rounded-lg bg-white px-3 py-2 font-mono text-sm shadow-sm">ref1</span>
            </div>
          </div>
        </div>
        <div className="my-4 grid grid-cols-2 gap-6 text-center">
          <div className="text-sm font-semibold text-slate-600">↓ row 0</div>
          <div className="text-sm font-semibold text-slate-600">↓ row 1</div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-xl border-2 border-emerald-300 bg-white p-3 shadow-sm">
            <div className="mb-2 text-center text-xs font-semibold text-slate-500">row 0</div>
            <div className="grid grid-cols-3 gap-1">
              {[10, 20, 30].map((value) => <span key={value} className="rounded-lg bg-emerald-50 px-2 py-3 text-center font-mono font-bold text-slate-800">{value}</span>)}
            </div>
          </div>
          <div className="rounded-xl border-2 border-emerald-300 bg-white p-3 shadow-sm">
            <div className="mb-2 text-center text-xs font-semibold text-slate-500">row 1</div>
            <div className="grid grid-cols-3 gap-1">
              {[40, 50, 60].map((value) => <span key={value} className={`rounded-lg px-2 py-3 text-center font-mono font-bold ${value === 60 ? "bg-amber-100 ring-2 ring-amber-400" : "bg-emerald-50"}`}>{value}</span>)}
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-white p-3 text-center font-mono text-sm text-slate-700 shadow-sm">
          a[1][2] → row 1 → column 2 → <strong className="text-slate-900">60</strong>
        </div>
      </div>
    </div>
  );
}

export default function DiagramsSection({ items, chapterSlug, isCompleted }) {
  const registered = icseJavaVisualRegistry[chapterSlug] || [];
  const existingImageSources = new Set(
    (items || [])
      .filter((item) => typeof item === "object" && item !== null && item.type === "image")
      .map((item) => item.src)
      .filter(Boolean)
  );
  const registryItems = registered.filter((item) => !existingImageSources.has(item.src));
  const allItems = [...(items || []), ...registryItems];

  if (allItems.length === 0) return null;

  return (
    <ChapterSection
      id="diagrams"
      title="Diagrams & Visuals"
      icon={<FileText className="w-5 h-5" />}
      estimatedTime={10}
      isCompleted={isCompleted}
    >
      <div className="grid gap-4">
        {allItems.map((diagram, idx) => {
          const isObject = typeof diagram === "object" && diagram !== null;
          const isMemoryModel = isObject && diagram.type === "memory-model";
          const isImage = isObject && diagram.type === "image" && diagram.src;
          const title = isObject ? diagram.title || "Visual note" : "Visual note";
          return (
            <article
              key={diagram.id || idx}
              className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm">
                  {idx + 1}
                </span>
                <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
              </div>

              {isImage ? (
                <>
                  <p className="text-sm leading-6 text-slate-700">{diagram.explanation}</p>
                  <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                    <Image
                      src={diagram.src}
                      alt={diagram.alt || title}
                      width={1200}
                      height={700}
                      className="h-auto w-full"
                      sizes="(max-width: 768px) 100vw, 1200px"
                    />
                  </div>
                  {diagram.caption && (
                    <p className="mt-3 text-sm leading-6 text-slate-600"><strong>Caption:</strong> {diagram.caption}</p>
                  )}
                </>
              ) : isMemoryModel ? (
                <>
                  <p className="text-sm leading-6 text-slate-700">{diagram.explanation}</p>
                  <MemoryModelVisual />
                  {diagram.examNote && (
                    <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-slate-700">
                      <strong>Exam note:</strong> {diagram.examNote}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm leading-6 text-slate-700 whitespace-pre-line">
                  {isObject ? diagram.explanation || diagram.caption || "" : diagram}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </ChapterSection>
  );
}
