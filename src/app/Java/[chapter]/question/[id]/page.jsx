import { notFound } from "next/navigation";
import { getChapterQuestions, getQuestionContent } from "@/lib/curriculum";
import { getChapterPlayerQuestions } from "@/lib/content";
import QuestionPlayer from "../../../../components/QuestionPlayer";

// Questions are rendered on demand instead of pre-rendering the entire question bank.
// This keeps production builds within CI memory limits while preserving every route.
export default async function QuestionPage({ params, searchParams }) {
  const { chapter, id } = await params;
  const { class: requestedClass } = await searchParams;
  const isClassIX = String(requestedClass || "").toUpperCase() === "IX";

  // Resolve against the canonical curriculum first (canonical Java slugs), then
  // fall back to the real question bank. The content selector resolves legacy and
  // canonical aliases (e.g. /Java/arrays, /Java/data-processing-in-java) the same way
  // the chapter pages do, so a listed question always opens.
  let question = getQuestionContent("java", chapter, id);
  let chapterQuestions = getChapterQuestions("java", chapter);

  if (!question) {
    const bank = getChapterPlayerQuestions(chapter);
    if (bank.length) {
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
      catalogHref={isClassIX ? "/Java?class=IX" : "/Java"}
      questionQuery={isClassIX ? "?class=IX" : ""}
    />
  );
}
