/**
 * Utility for generating practice URLs based on subject
 * This abstracts hardcoded paths and makes the app more maintainable
 */

/**
 * Get practice URL for a given subject and chapter
 * @param {string} subject - Subject identifier (e.g., 'java', 'python')
 * @param {string} chapterSlug - Chapter slug (optional)
 * @returns {string} Practice URL
 */
export function getPracticeUrl(subject = 'java', chapterSlug = null) {
  const baseUrl = `/${subject}`;
  return chapterSlug ? `${baseUrl}/${chapterSlug}` : baseUrl;
}

/**
 * Get subject identifier from chapter slug or data
 * @param {Object} chapter - Chapter object
 * @returns {string} Subject identifier
 */
export function getSubjectFromChapter(chapter) {
  // Default to 'java' for now, can be extended when multiple subjects are available
  return 'java';
}

/**
 * Get practice URL from chapter object
 * @param {Object} chapter - Chapter object with slug property
 * @returns {string} Practice URL
 */
export function getChapterPracticeUrl(chapter) {
  const subject = getSubjectFromChapter(chapter);
  return getPracticeUrl(subject, chapter.slug);
}