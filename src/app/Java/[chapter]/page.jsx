import { notFound } from "next/navigation";
import { getChapterContent, getChapterQuestions, getChapterSlugs, getSubjectContent } from "@/lib/curriculum";
import ChapterReader from "../../components/ChapterReader";

export function generateStaticParams() {
  return getChapterSlugs("java");
}

export default async function ChapterPage({ params }) {
  const { chapter } = await params;

  const chapterData = getChapterContent("java", chapter);

  if (!chapterData) {
    notFound();
  }

  const chapterQuestions = getChapterQuestions("java", chapter);
  
  // Get all java chapters to find previous and next
  const javaSubject = getSubjectContent("java");
  const allChapters = javaSubject?.chapters || [];
  const currentIndex = allChapters.findIndex((ch) => ch.slug === chapter);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  return (
    <ChapterReader 
      chapter={chapter}
      chapterData={chapterData}
      chapterQuestions={chapterQuestions}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
    />
  );
}