
"use client";

import { useState } from "react";
import ChapterSection from "../../ChapterSection";
import { BeakerIcon } from "@heroicons/react/24/outline";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

export default function ExamplesSection({
  items = [],
  isCompleted = false,
}) {
  const [copiedCode, setCopiedCode] = useState(null);

  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const copyCode = async (code, id) => {
    if (!code || typeof code !== "string") {
      return;
    }

    try {
      if (!navigator?.clipboard?.writeText) {
        console.error("Clipboard API is not available.");
        return;
      }

      await navigator.clipboard.writeText(code);
      setCopiedCode(id);

      window.setTimeout(() => {
        setCopiedCode(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
      setCopiedCode(null);
    }
  };

  return (
    <ChapterSection
      id="examples"
      title="Examples"
      icon={<BeakerIcon className="h-5 w-5" />}
      estimatedTime={20}
      isCompleted={isCompleted}
    >
      <div className="space-y-4">
        {items.map((example, idx) => {
          if (!example || typeof example !== "object") {
            return null;
          }

          const exampleId =
            example.id ?? example.slug ?? `example-${idx}`;

          const explanationSteps = Array.isArray(example.explanation)
            ? example.explanation.filter(
                (step) =>
                  typeof step === "string" && step.trim().length > 0,
              )
            : typeof example.explanation === "string" &&
                example.explanation.trim().length > 0
              ? [example.explanation]
              : [];

          const hasCode =
            typeof example.code === "string" &&
            example.code.trim().length > 0;

          const hasOutput =
            example.output !== undefined &&
            example.output !== null &&
            String(example.output).trim().length > 0;

          return (
            <div
              key={exampleId}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {example.title || `Example ${idx + 1}`}
                </h3>

                {example.level && (
                  <span className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                    {example.level}
                  </span>
                )}
              </div>

              {hasCode && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => copyCode(example.code, exampleId)}
                    className="absolute right-3 top-3 z-10 rounded-lg bg-gray-800/50 p-2 transition-colors hover:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title={
                      copiedCode === exampleId
                        ? "Code copied"
                        : "Copy code"
                    }
                    aria-label={
                      copiedCode === exampleId
                        ? "Code copied"
                        : "Copy code"
                    }
                  >
                    {copiedCode === exampleId ? (
                      <Check
                        className="h-4 w-4 text-green-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <Copy
                        className="h-4 w-4 text-gray-400"
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  <SyntaxHighlighter
                    language="java"
                    style={a11yDark}
                    showLineNumbers
                    customStyle={{
                      margin: 0,
                      fontSize: "0.8rem",
                    }}
                  >
                    {example.code}
                  </SyntaxHighlighter>
                </div>
              )}

              {hasOutput && (
                <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/50">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Output:
                  </span>

                  <pre className="mt-1 rounded bg-green-50 px-3 py-2 font-mono text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
                    {String(example.output)}
                  </pre>
                </div>
              )}

              {explanationSteps.length > 0 && (
                <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/50">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Explanation:
                  </h4>

                  <ol className="space-y-1.5">
                    {explanationSteps.map((step, stepIdx) => (
                      <li
                        key={`${exampleId}-step-${stepIdx}`}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span className="text-gray-400 dark:text-gray-500">
                          {stepIdx + 1}.
                        </span>

                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ChapterSection>
  );
}

