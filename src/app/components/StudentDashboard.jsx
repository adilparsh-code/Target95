"use client";

import Link from "next/link";
import { useMemo } from "react";
import questions from "../data/questions";
import useBookmarks from "../hooks/useBookmarks";
import useProgress from "../hooks/useProgress";

function formatChapterName(chapter) {
  return chapter.replace(/-/g, " ");
}

function getQuestionById(chapter, questionId) {
  return questions.find(
    (question) => question.chapter === chapter && question.id === questionId
  );
}

export default function StudentDashboard() {
  const { completedQuestions } = useProgress();
  const { bookmarks } = useBookmarks();

  const totalQuestions = questions.length;
  const completedCount = completedQuestions.length;
  const bookmarkedCount = bookmarks.length;
  const progressPercent =
    totalQuestions > 0
      ? Math.round((completedCount / totalQuestions) * 100)
      : 0;

  const continueQuestion = useMemo(() => {
    const nextQuestion = questions.find((question) => {
      return !completedQuestions.some(
        (completedQuestion) =>
          completedQuestion.chapter === question.chapter &&
          completedQuestion.questionId === question.id
      );
    });

    return nextQuestion ?? questions[0];
  }, [completedQuestions]);

  const recentActivity = useMemo(() => {
    const completedItems = completedQuestions
      .slice(-3)
      .map((item) => {
        const question = getQuestionById(item.chapter, item.questionId);

        if (!question) {
          return null;
        }

        return {
          type: "Completed",
          title: `Completed ${question.question}`,
          subtitle: `${formatChapterName(question.chapter)} • Question ${question.id}`,
        };
      })
      .filter(Boolean);

    const bookmarkItems = bookmarks
      .slice(-3)
      .map((item) => {
        const question = getQuestionById(item.chapter, item.questionId);

        if (!question) {
          return null;
        }

        return {
          type: "Bookmarked",
          title: `Bookmarked ${question.question}`,
          subtitle: `${formatChapterName(question.chapter)} • Question ${question.id}`,
        };
      })
      .filter(Boolean);

    return [...completedItems, ...bookmarkItems].slice(0, 4);
  }, [bookmarks, completedQuestions]);

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">
              Student Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Welcome back, learner.
            </h1>
            <p className="mt-3 text-base leading-7 text-gray-700">
              Review your progress, revisit bookmarked questions, and continue your Java practice with a clear path forward.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Overall Progress</p>
            <p className="mt-2 text-4xl font-bold text-gray-900">{progressPercent}%</p>
            <p className="mt-2 text-sm text-gray-700">
              {completedCount} of {totalQuestions} questions completed
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700">Completed Questions</p>
          <p className="mt-3 text-3xl font-bold text-gray-900">{completedCount}</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700">Bookmarks Count</p>
          <p className="mt-3 text-3xl font-bold text-gray-900">{bookmarkedCount}</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700">Next Step</p>
          <p className="mt-3 text-lg font-semibold text-gray-900">
            {continueQuestion ? `Question ${continueQuestion.id}` : "Ready to begin"}
          </p>
          <Link
            href={continueQuestion ? `/java/${continueQuestion.chapter}/question/${continueQuestion.id}` : "/java"}
            className="mt-4 inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400"
          >
            Continue Learning
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <p className="mt-1 text-sm text-gray-700">
                Your latest learning actions appear here.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.map((item, index) => (
                <div
                  key={`${item.type}-${index}`}
                  className="rounded-2xl border border-gray-200 bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                      {item.type}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">{item.subtitle}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-slate-50 p-6 text-center text-sm text-gray-700">
                Start a question and bookmark a topic to build your activity feed.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Practice Focus</h2>
          <p className="mt-3 text-sm leading-7 text-gray-700">
            Keep your momentum going by reviewing the next incomplete question and using bookmarks to return to the concepts you want to revisit.
          </p>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Current target</p>
            <p className="mt-2 text-lg font-bold text-gray-900">
              {continueQuestion ? continueQuestion.question : "No questions available yet"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
