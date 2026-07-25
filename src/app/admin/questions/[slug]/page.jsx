"use client";
import { mockQuestions } from "../../../data/mockQuestions";
import AdminLayout from "../../../components/admin/AdminLayout";
import { notFound } from "next/navigation";
import DifficultyBadge from "@/app/components/DifficultyBadge";
import Button from "@/app/components/ui/Button";
import { Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function QuestionDetailsPage({ params }) {
  const question = mockQuestions.find((q) => q.slug === params.slug);

  if (!question) {
    notFound();
  }

  const currentIndex = mockQuestions.findIndex((q) => q.slug === params.slug);
  const previousQuestion = currentIndex > 0 ? mockQuestions[currentIndex - 1] : null;
  const nextQuestion = currentIndex < mockQuestions.length - 1 ? mockQuestions[currentIndex + 1] : null;

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link href="/admin/questions">
              <a className="text-blue-600 hover:underline flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Questions
              </a>
            </Link>
            <div className="flex gap-2">
              {previousQuestion && (
                <Link href={`/admin/questions/${previousQuestion.slug}`} passHref>
                  <Button variant="outline" size="sm" asChild>
                    <a>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </a>
                  </Button>
                </Link>
              )}
              {nextQuestion && (
                <Link href={`/admin/questions/${nextQuestion.slug}`} passHref>
                  <Button variant="outline" size="sm" asChild>
                    <a>
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{question.title}</h1>
              <DifficultyBadge difficulty={question.difficulty} />
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 mb-6">
              <span>{question.subject}</span>
              <span>&bull;</span>
              <span>{question.chapter}</span>
              <span>&bull;</span>
              <span>{question.questionType}</span>
              <span>&bull;</span>
              <span>Est. {question.estimatedTime} min</span>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-2">Question</h2>
              <p>{question.question}</p>

              <h2 className="text-xl font-semibold mt-6 mb-2">Solution</h2>
              <p>{question.solution}</p>

              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Lightbulb className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      This is a placeholder for a hint.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Related Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Placeholder for related questions */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold">Related Question 1</h3>
                <p className="text-sm text-gray-500">A brief description...</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold">Related Question 2</h3>
                <p className="text-sm text-gray-500">A brief description...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}