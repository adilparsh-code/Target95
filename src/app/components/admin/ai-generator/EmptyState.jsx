"use client";

import Link from "next/link";
import Button from "../../ui/Button";
import Card from "../../ui/Card";

export default function EmptyState() {
  return (
    <Card className="p-12 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
        <svg
          className="h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="mt-6 text-lg font-medium text-gray-900">No generated questions yet</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
        Get started by generating your first set of AI-powered questions. Create questions for any subject, chapter, and difficulty level following ICSE/ISC patterns.
      </p>
      <div className="mt-8">
        <Link href="/admin/ai-generator">
          <Button>
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Generate Questions
          </Button>
        </Link>
      </div>
    </Card>
  );
}