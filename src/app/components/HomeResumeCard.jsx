"use client";

import Link from "next/link";
import { useHomeResumeProgress } from "@/app/hooks/useHomeResumeProgress";
import { formatResumeQuestion } from "@/lib/progress/homeResume.mjs";

export default function HomeResumeCard() {
  const { progress, loading } = useHomeResumeProgress();

  if (loading || !progress) return null;

  const questionLabel = formatResumeQuestion(progress.questionId);
  const chapterName = progress.chapterName || progress.chapterId;
  const questionDetail = progress.questionTitle
    ? `${questionLabel ? `${questionLabel}: ` : ""}${progress.questionTitle}`
    : questionLabel;
  const completion = Number(progress.chapterProgress?.progress);
  const hasCompletion = Number.isFinite(completion) && completion > 0;
  const resumeHref = progress.chapterId
    ? `/Java/${encodeURIComponent(progress.chapterId)}`
    : "/practice";

  return (
    <section className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 sm:p-5" aria-label="Continue learning">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-blue-700 text-white" aria-hidden="true">▶</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Continue where you left off</p>
            <h1 className="mt-1 text-base font-bold sm:text-lg">{chapterName}</h1>
            {(questionDetail || hasCompletion) && (
              <p className="text-xs text-slate-500">
                {[questionDetail, hasCompletion ? `${Math.min(100, Math.max(0, Math.round(completion)))}% chapter completed` : null]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
            )}
          </div>
        </div>
        <Link href={resumeHref} className="stitch-btn stitch-btn-primary shrink-0">
          Resume Practice{questionLabel ? ` (${questionLabel})` : ""} →
        </Link>
      </div>
    </section>
  );
}
