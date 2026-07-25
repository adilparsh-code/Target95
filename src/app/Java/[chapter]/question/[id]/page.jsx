import { notFound } from "next/navigation";
import questions from "../../../../data/questions";
import QuestionPlayer from "../../../../components/QuestionPlayer";

export default async function QuestionPage({ params }) {
  const { chapter, id } = await params;

  const question = questions.find(
    (item) =>
      item.chapter === chapter &&
      item.id === Number(id)
  );

  if (!question) {
    notFound();
  }

  const chapterQuestions = questions.filter(
    (item) => item.chapter === chapter
  );

  const currentIndex = chapterQuestions.findIndex(
    (item) => item.id === Number(id)
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