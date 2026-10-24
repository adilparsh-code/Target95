// Chapter navigation for BoardPrep subjects.
//
// A subject lists its chapters inside groups, and the groups inside sections.
// The renderer needs one flat, ordered list so that the previous/next pager and
// the breadcrumb trail always agree with what the subject page shows.

import { getChapterQuestionCounts, getClass, getPublishedChapters, getSubject } from './boardprepCurriculum.mjs';

/**
 * Flatten a subject's published chapters in reading order.
 *
 * Each entry keeps the group and section it belongs to, so a page can show
 * where the chapter sits in the syllabus without walking the registry again.
 */
export function getSubjectChapterSequence(board, classSlug, subjectSlug) {
  const subject = getSubject(board, classSlug, subjectSlug);
  if (!subject) return [];

  const sequence = [];
  for (const section of subject.sections || []) {
    for (const group of section.groups || []) {
      for (const chapter of group.chapters || []) {
        if (chapter.status !== 'published') continue;
        sequence.push({
          ...chapter,
          sectionId: section.id,
          sectionSlug: section.slug,
          sectionTitle: section.title,
          groupId: group.id,
          groupTitle: group.title,
        });
      }
    }
  }
  return sequence;
}

export function getChapterNeighbours(board, classSlug, subjectSlug, chapterSlug) {
  const sequence = getSubjectChapterSequence(board, classSlug, subjectSlug);
  const index = sequence.findIndex((chapter) => chapter.slug === chapterSlug);
  if (index === -1) {
    return { previous: null, next: null, position: 0, total: sequence.length };
  }
  return {
    previous: index > 0 ? sequence[index - 1] : null,
    next: index < sequence.length - 1 ? sequence[index + 1] : null,
    position: index + 1,
    total: sequence.length,
  };
}

/**
 * Breadcrumb trail: board, class, subject and the chapter itself.
 * The final crumb is the current page and is rendered as plain text.
 */
export function getChapterBreadcrumbs(board, classSlug, subjectSlug, chapterSlug) {
  const trail = [{ label: 'Learn', href: `/learn/${board}` }];

  const classInfo = getClass(board, classSlug);
  const subject = getSubject(board, classSlug, subjectSlug);
  const sequence = getSubjectChapterSequence(board, classSlug, subjectSlug);
  const current = sequence.find((chapter) => chapter.slug === chapterSlug);

  trail.push({
    label: classInfo?.label || classSlug,
    href: `/learn/${board}/${classSlug}`,
  });
  trail.push({
    label: subject?.title || subjectSlug,
    href: `/learn/${board}/${classSlug}/${subjectSlug}`,
  });

  if (current) {
    trail.push({
      label: current.title,
      href: `/learn/${board}/${classSlug}/${subjectSlug}/${current.slug}`,
    });
  }

  return trail;
}

/**
 * Published chapter count and question count for one subject.
 * The counts come from the chapter files themselves, so the subject page and
 * the validator can never drift apart.
 */
export function getSubjectStats(board, classSlug, subjectSlug) {
  const chapters = getPublishedChapters(board, classSlug, subjectSlug);
  const counts = getChapterQuestionCounts(board, classSlug, subjectSlug);
  const questions = chapters.reduce((total, chapter) => total + (counts.get(chapter.slug) || 0), 0);
  return { chapters: chapters.length, questions };
}
