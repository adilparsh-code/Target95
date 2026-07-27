import subjects from "@/app/data/subjects";
import { javaQuestions, javaSubject } from "@/app/data/javaCurriculum";

// The single read model for the learning journey: subject → chapter → question.
// A future content API can provide this shape without changing consuming pages.
export const curriculum = subjects.map((subject) => {
  if (subject.id !== "java") return { ...subject, chapters: [] };

  return {
    ...subject,
    chapters: javaSubject.chapters,
  };
});

export function getSubjectContent(subjectId) {
  return curriculum.find((subject) => subject.id === subjectId);
}

export function getChapterContent(subjectId, chapterSlug) {
  return getSubjectContent(subjectId)?.chapters.find((chapter) => chapter.slug === chapterSlug);
}

export function getChapterQuestions(subjectId, chapterSlug) {
  return getChapterContent(subjectId, chapterSlug)?.questions ?? [];
}

export function getQuestionContent(subjectId, chapterSlug, questionId) {
  return getChapterQuestions(subjectId, chapterSlug).find((question) => String(question.id) === String(questionId));
}

export const javaLearningQuestions = javaQuestions;
