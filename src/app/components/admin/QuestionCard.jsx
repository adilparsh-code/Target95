import Link from "next/link";
import Button from "@/app/components/ui/Button";
import { Bookmark, Share2, ArrowRight, BrainCircuit } from "lucide-react";
import DifficultyBadge from "@/app/components/DifficultyBadge";

export default function QuestionCard({ question }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <h3 className="text-xl font-semibold mb-2">
              <Link href={`/admin/questions/${question.slug}`}>
                <a className="hover:text-blue-600">{question.title}</a>
              </Link>
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {question.question.substring(0, 150)}...
            </p>
          </div>
          <div className="flex-shrink-0 ml-4">
            <DifficultyBadge difficulty={question.difficulty} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-4">
          <span>{question.subject}</span>
          <span>&bull;</span>
          <span>{question.chapter}</span>
          <span>&bull;</span>
          <span>{question.questionType}</span>
          <span>&bull;</span>
          <span>Est. {question.estimatedTime} min</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4 mr-2" />
              Bookmark
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <BrainCircuit className="h-4 w-4 mr-2" />
              AI Explain
            </Button>
            <Link href={`/admin/questions/${question.slug}`} passHref>
              <Button asChild>
                <a>
                  Solve Question
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}