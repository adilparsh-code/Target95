import { notFound } from "next/navigation";
import { getChapterQuestions, getQuestionContent } from "@/lib/curriculum";
import { chapterQuestionBankBySlug } from "@/lib/javaChapterQuestionBank";
import QuestionPlayer from "../../../../components/QuestionPlayer";

// Questions are rendered on demand instead of pre-rendering the entire question bank.
// This keeps production builds within CI memory limits while preserving every route.
export default async function QuestionPage({ params }) {
  const { chapter, id } = await params;

  // Resolve against the canonical curriculum first (canonical Java slugs), then
  // fall back to the real question bank so legacy aliases such as /Java/arrays
  // or /Java/strings also resolve instead of 404-ing.
  let question = getQuestionContent("java", chapter, id);
  let chapterQuestions = getChapterQuestions("java", chapter);

  if (!question) {
    const bank = chapterQuestionBankBySlug[chapter];
    if (Array.isArray(bank) && bank.length) {
      chapterQuestions = bank;
      question = bank.find((item) => String(item.id) === String(id)) || null;
    }
  }

  if (!question) {
    notFound();
  }

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
