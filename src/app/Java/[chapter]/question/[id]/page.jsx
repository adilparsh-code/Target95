import { notFound } from "next/navigation";
import { getChapterQuestions, getChapterSlugs, getQuestionContent } from "@/lib/curriculum";
import QuestionPlayer from "../../../../components/QuestionPlayer";

// Questions are rendered on demand instead of pre-rendering the entire question bank.
// This keeps production builds within CI memory limits while preserving every route.
export default async function QuestionPage({ params }) {
  const { chapter, id } = await params;

  const question = getQuestionContent("java", chapter, id);

  if (!question) {
    notFound();
  }

  const chapterQuestions = getChapterQuestions("java", chapter);

  const currentIndex = chapterQuestions.findIndex(
    (item) => String(item.id) === String(id)
  );

  const previousQuestion =
    currentIndex > 0
      ? chapterQuestions[currentIndex - 1]
      : null;

  const nextQuestion =
    currentIndex < chapterQuestions.length - 1
      ? chapterQuestions[currentIndex + 1]
      : null;

  return (
    <QuestionPlayer
      question={question}
      chapter={chapter}
      chapterQuestions={chapterQuestions}
      currentIndex={currentIndex}
      previousQuestion={previousQuestion}
      nextQuestion={nextQuestion}
    />
  );
}
