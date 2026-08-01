import { notFound } from "next/navigation";
import { getChapterQuestions, getChapterSlugs, getQuestionContent } from "@/lib/curriculum";
import QuestionPlayer from "../../../../components/QuestionPlayer";

export async function generateStaticParams() {
  const chapters = getChapterSlugs("java");
  const params = [];
  for (const { chapter } of chapters) {
    const questions = getChapterQuestions("java", chapter);
    for (const q of questions) {
      params.push({ chapter, id: String(q.id) });
    }
  }
  return params;
}

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
