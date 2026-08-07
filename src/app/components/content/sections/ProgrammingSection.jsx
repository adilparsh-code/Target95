"use client";

import { useState } from "react";
import ChapterSection from "../../ChapterSection";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

export default function ProgrammingSection({ items, isCompleted }) {
  const [copiedCode, setCopiedCode] = useState(null);
  const [expanded, setExpanded] = useState({});
  if (!items || items.length === 0) return null;

  const copyCode = async (code, id) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ChapterSection
      id="programming"
      title="Programming"
      icon={<SparklesIcon className="w-5 h-5" />}
      estimatedTime={25}
      isCompleted={isCompleted}
    >
      <div className="space-y-4">
        {items.map((q, idx) => {
          const isExpanded = expanded[q.id];
          return (
            <div
              key={q.id || idx}
              className="rounded-2xl border border-gray-200 bg-slate-50 p-4 dark:bg-gray-900/50 dark:border-gray-700"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white whitespace-pre-line">
                  {idx + 1}. {q.question}
                </p>
                {q.difficulty && (
                  <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 uppercase">
                    {q.difficulty}
                  </span>
                )}
              </div>

              {q.input && (
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Input:</span> {q.input}
                </p>
              )}
              {q.output && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Output:</span> {q.output}
                </p>
              )}
              {q.constraints && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Constraints:</span> {q.constraints}
                </p>
              )}

              <button
                type="button"
                onClick={() => toggleExpand(q.id)}
                className="mt-3 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
              >
                {isExpanded ? "Hide Solution" : "View Solution"}
              </button>

              {isExpanded && q.solution && (
                <div className="mt-3 relative">
                  <button
                    onClick={() => copyCode(q.solution, q.id)}
                    className="absolute top-3 right-3 p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors z-10"
                    title="Copy code"
                  >
                    {copiedCode === q.id ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  <SyntaxHighlighter
                    language="java"
                    style={a11yDark}
                    showLineNumbers
                    customStyle={{ margin: 0, fontSize: "0.8rem", borderRadius: "0.75rem" }}
                  >
                    {q.solution}
                  </SyntaxHighlighter>
                </div>
              )}

              {isExpanded && q.explanation && (
                <div className="mt-3 rounded-xl bg-blue-50 p-3 text-sm text-gray-700 dark:bg-blue-900/30 dark:text-gray-300">
                  <span className="font-semibold text-blue-800 dark:text-blue-300">
                    Explanation:{" "}
                  </span>
                  <span className="whitespace-pre-line">{q.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ChapterSection>
  );
}