"use client";

import { useState } from "react";
import ChapterSection from "../../ChapterSection";
import { BeakerIcon } from "@heroicons/react/24/outline";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

export default function ExamplesSection({ items, isCompleted }) {
  const [copiedCode, setCopiedCode] = useState(null);
  if (!items || items.length === 0) return null;

  const copyCode = async (code, id) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <ChapterSection
      id="examples"
      title="Examples"
      icon={<BeakerIcon className="w-5 h-5" />}
      estimatedTime={20}
      isCompleted={isCompleted}
    >
      <div className="space-y-4">
        {items.map((example, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-gray-200 bg-white overflow-hidden dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {example.title}
              </h3>
              {example.level && (
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  {example.level}
                </span>
              )}
            </div>
            {example.code && (
              <div className="relative">
                <button
                  onClick={() => copyCode(example.code, idx)}
                  className="absolute top-3 right-3 p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors z-10"
                  title="Copy code"
                >
                  {copiedCode === idx ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                <SyntaxHighlighter
                  language="java"
                  style={a11yDark}
                  showLineNumbers
                  customStyle={{ margin: 0, fontSize: "0.8rem" }}
                >
                  {example.code}
                </SyntaxHighlighter>
              </div>
            )}
            {example.output && (
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Output:
                </span>
                <pre className="mt-1 text-sm text-green-600 dark:text-green-400 font-mono bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded">
                  {example.output}
                </pre>
              </div>
            )}
            {example.explanation && example.explanation.length > 0 && (
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Explanation:
                </h4>
                <ol className="space-y-1.5">
                  {example.explanation.map((step, stepIdx) => (
                    <li
                      key={stepIdx}
                      className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                    >
                      <span className="text-gray-400 dark:text-gray-500">{stepIdx + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </ChapterSection>
  );
}