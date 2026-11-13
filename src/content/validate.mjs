// Pure validation for the unified content catalog (P0).
//
// Returns findings instead of throwing so callers (tests, a build script, an
// admin report) decide what is fatal. Severity ERROR means a student would hit
// a broken page or a wrong answer; WARNING means weak or placeholder content.

import {
  CONTENT_STATUS,
  DIFFICULTIES,
  QUESTION_TYPES,
  SECTION_IDS,
  STUB_MARKERS,
} from './schema.mjs';

const finding = (severity, code, message, ref = null) => ({ severity, code, message, ref });

const isText = (value) => typeof value === 'string' && value.trim().length > 0;

/** Count of non-empty section values: arrays by length, strings by presence. */
export function countSectionContent(sections = {}) {
  return SECTION_IDS.reduce((total, id) => {
    const value = sections[id];
    if (Array.isArray(value)) return total + value.length;
    return total + (isText(value) ? 1 : 0);
  }, 0);
}

/** True when a string or list of strings is only generated fallback copy. */
export function isStubText(value) {
  const list = Array.isArray(value) ? value : [value];
  const texts = list.filter(isText).map((item) => item.trim());
  return texts.length > 0 && texts.every((text) => STUB_MARKERS.some((marker) => text.startsWith(marker)));
}

/** Sections whose presence proves real study material, not curriculum metadata. */
const DEPTH_SECTIONS = ['theory', 'definitions', 'syntax', 'examples', 'faqs', 'importantPoints', 'quickRevision', 'commonMistakes', 'tips'];

/**
 * Classify chapter content.
 *  authored: at least one depth section holds non-placeholder material
 *  stub:     only intro/concepts/objectives (curriculum description) or placeholder copy
 *  missing:  nothing at all
 */
export function classifyContentStatus(sections = {}) {
  if (countSectionContent(sections) === 0) return CONTENT_STATUS.MISSING;
  const hasRealDepth = DEPTH_SECTIONS.some((id) => {
    const value = sections[id];
    if (Array.isArray(value)) return value.length > 0 && !isStubText(value);
    return isText(value) && !isStubText(value);
  });
  return hasRealDepth ? CONTENT_STATUS.AUTHORED : CONTENT_STATUS.STUB;
}

/** @param {import('./schema.mjs').UnifiedQuestion} question */
export function validateQuestion(question) {
  const findings = [];
  const ref = question?.id ?? '(no id)';
  if (!question || typeof question !== 'object') {
    return [finding('ERROR', 'question.shape', 'Question is not an object', ref)];
  }
  if (!isText(question.id)) findings.push(finding('ERROR', 'question.id', 'Missing id', ref));
  if (!isText(question.chapterId)) findings.push(finding('ERROR', 'question.chapter', 'Missing chapterId', ref));
  if (!isText(question.question)) findings.push(finding('ERROR', 'question.text', 'Empty question text', ref));
  if (!QUESTION_TYPES.includes(question.type)) {
    findings.push(finding('ERROR', 'question.type', `Unknown type "${question.type}"`, ref));
  }
  if (!DIFFICULTIES.includes(question.difficulty)) {
    findings.push(finding('WARNING', 'question.difficulty', `Non-standard difficulty "${question.difficulty}"`, ref));
  }
  if (question.type === 'mcq') {
    const options = Array.isArray(question.options) ? question.options : [];
    if (options.length < 2) {
      findings.push(finding('ERROR', 'mcq.options', 'MCQ needs at least 2 options', ref));
    } else if (!Number.isInteger(question.answerIndex) || question.answerIndex < 0 || question.answerIndex >= options.length) {
      findings.push(finding('ERROR', 'mcq.answer', 'MCQ answerIndex does not point at an option', ref));
    } else if (new Set(options.map((option) => String(option).trim().toLowerCase())).size !== options.length) {
      findings.push(finding('WARNING', 'mcq.duplicate-options', 'MCQ has duplicate options', ref));
    }
  } else if (!isText(question.answer)) {
    findings.push(finding('WARNING', 'question.answer', 'No answer text', ref));
  }
  return findings;
}

/**
 * Validate a whole catalog.
 * @param {{chapters: import('./schema.mjs').UnifiedChapter[], questions: import('./schema.mjs').UnifiedQuestion[], quarantined?: {question: import('./schema.mjs').UnifiedQuestion, reason: string}[]}} catalog
 */
export function validateCatalog({ chapters = [], questions = [], quarantined = [] } = {}) {
  const findings = [];
  for (const entry of quarantined) {
    findings.push(finding('WARNING', 'question.quarantined', `Held out of chapter selectors: ${entry.reason}`, entry.question?.id));
  }
  const slugOwner = new Map();

  for (const chapter of chapters) {
    if (!isText(chapter.id) || !isText(chapter.title)) {
      findings.push(finding('ERROR', 'chapter.identity', 'Chapter missing id or title', chapter.id));
      continue;
    }
    for (const slug of new Set([chapter.slug, ...(chapter.aliases || [])].filter(Boolean))) {
      const owner = slugOwner.get(slug);
      if (owner && owner !== chapter.id) {
        findings.push(finding('ERROR', 'chapter.slug-collision', `Slug "${slug}" is claimed by "${owner}" and "${chapter.id}"`, chapter.id));
      } else {
        slugOwner.set(slug, chapter.id);
      }
    }
    if (chapter.contentStatus === CONTENT_STATUS.MISSING) {
      findings.push(finding('WARNING', 'chapter.no-content', 'Chapter has no study content', chapter.id));
    } else if (chapter.contentStatus === CONTENT_STATUS.STUB) {
      findings.push(finding('WARNING', 'chapter.stub-content', 'Chapter only has generated placeholder copy', chapter.id));
    }
  }

  const byContent = new Map();
  for (const chapter of chapters) {
    if (!chapter.contentSlug) continue;
    byContent.set(chapter.contentSlug, [...(byContent.get(chapter.contentSlug) || []), chapter.id]);
  }
  for (const [contentSlug, owners] of byContent) {
    if (owners.length > 1) {
      findings.push(finding('WARNING', 'chapter.shared-content', `${owners.length} chapters render the same "${contentSlug}" content: ${owners.join(', ')}`, contentSlug));
    }
  }

  const questionCounts = new Map();
  for (const question of questions) {
    for (const id of question?.chapterIds || [question?.chapterId]) questionCounts.set(id, (questionCounts.get(id) || 0) + 1);
  }
  for (const chapter of chapters) {
    if (!questionCounts.get(chapter.id)) findings.push(finding('WARNING', 'chapter.no-questions', 'Chapter has no questions', chapter.id));
  }

  const chapterIds = new Set(chapters.map((chapter) => chapter.id));
  const seenIds = new Map();
  for (const question of questions) {
    findings.push(...validateQuestion(question));
    for (const id of question?.chapterIds || [question?.chapterId]) {
      if (id && !chapterIds.has(id)) {
        findings.push(finding('ERROR', 'question.orphan', `Question points at unknown chapter "${id}"`, question.id));
      }
    }
    const key = String(question?.id);
    seenIds.set(key, (seenIds.get(key) || 0) + 1);
  }
  for (const [id, count] of seenIds) {
    if (count > 1) findings.push(finding('ERROR', 'question.duplicate-id', `Question id used ${count} times`, id));
  }

  return findings;
}

export const hasErrors = (findings) => findings.some((item) => item.severity === 'ERROR');

export function summarizeFindings(findings) {
  const byCode = {};
  for (const item of findings) byCode[item.code] = (byCode[item.code] || 0) + 1;
  return {
    errors: findings.filter((item) => item.severity === 'ERROR').length,
    warnings: findings.filter((item) => item.severity === 'WARNING').length,
    byCode,
  };
}
