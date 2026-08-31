import subjects from "@/app/data/subjects";
import { javaQuestions, javaSubject } from "@/app/data/javaCurriculum";
import { chapterQuestionBankBySlug } from "@/lib/javaChapterQuestionBank";

// The single read model for the learning journey: subject → chapter → question.
// A future content API can provide this shape without changing consuming pages.
export const curriculum = subjects.map((subject) => {
  if (subject.id !== "java") return { ...subject, chapters: [] };

  return {
    ...subject,
    chapters: javaSubject.chapters.map((chapter) => {
      // Prefer the real, academically-authored question bank for any java
      // chapter it covers, so the student chapter flow never shows the
      // generated placeholder questions. Only fall back to the legacy
      // generated set for chapters without a real mapping.
      const realQuestions = chapterQuestionBankBySlug[chapter.slug];
      const questions =
        realQuestions && realQuestions.length
          ? realQuestions
          : chapter.questions;

      return { ...chapter, questions, questionCount: questions.length };
    }),
  };
});

export function getSubjectContent(subjectId) {
  return curriculum.find((subject) => subject.id === subjectId);
}

export function getChapterSlugs(subjectId) {
  const subject = getSubjectContent(subjectId);
  return subject?.chapters.map((chapter) => ({ chapter: chapter.slug })) ?? [];
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
