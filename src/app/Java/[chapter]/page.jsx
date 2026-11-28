import { notFound } from "next/navigation";
import StudyChapter from "../../components/study/StudyChapter";
import { getStudyChapters } from "@/lib/studyCenter";
import { getChapterPageData } from "@/lib/content";
import { javaChapters as canonicalChapters } from "../../data/javaCurriculum";

export function generateStaticParams() {
  const chapters = getStudyChapters() || [];
  // Keep both legacy and canonical URLs routable during the migration.
  const slugs = new Set();
  chapters.forEach((chapter) => { if (chapter && chapter.slug) slugs.add(String(chapter.slug)); });
  (canonicalChapters || []).forEach((chapter) => { if (chapter && chapter.slug) slugs.add(String(chapter.slug)); });
  return [...slugs].map((chapter) => ({ chapter }));
}

export async function generateMetadata({ params }) {
  const { chapter: slug } = await params;
  const pageData = getChapterPageData(slug);
  if (!pageData) return {};

  const title = pageData.chapter.title || "Chapter";
  const description =
    pageData.chapter.description ||
    `Learn ${title} for ICSE & ISC Computer Science with clear notes, solved examples and practice questions on Target95.`;

  return {
    title,
    description,
    alternates: { canonical: `/Java/${slug}` },
  };
}

export default async function ChapterPage({ params, searchParams }) {
  const { chapter: slug } = await params;
  const { class: requestedClass } = await searchParams;
  const pageData = getChapterPageData(slug);
  if (!pageData) notFound();

  return (
    <StudyChapter
      slug={String(slug)}
      markdownContent={pageData.content}
      questionBank={pageData.questions}
      className={String(requestedClass || "").toUpperCase() === "IX" ? "ICSE IX" : null}
    />
  );
}
