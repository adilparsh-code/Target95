// Single source of truth for chapter section identity, navigation and automatic
// reading-progress rules. Pure functions only (no React / DOM globals) so they
// can be unit-tested with `node --test`.
//
// CANONICAL SECTION ID = the bare id rendered on the <section id="..."> element
// (e.g. "theory", "examples"). Older code looked elements up as
// "section-theory"; that form is still accepted by normalizeSectionId() so legacy
// deep links (#section-theory) keep working.

export const SECTION_ID_PREFIX = "section-";

// Order of the pre-existing 16 entries is unchanged. "output" and
// "revision-notes" are real rendered sections that previously could be neither
// navigated to nor observed; they are inserted next to their siblings.
export const SECTION_DEFINITIONS = [
  { id: "overview", label: "Overview", defaultTime: 5 },
  { id: "learning-objectives", label: "Learning Objectives", defaultTime: 3 },
  { id: "prerequisites", label: "Prerequisites", defaultTime: 2 },
  { id: "theory", label: "Theory", defaultTime: 15 },
  { id: "definitions", label: "Definitions", defaultTime: 5 },
  { id: "key-terms", label: "Key Terms", defaultTime: 5 },
  { id: "examples", label: "Examples", defaultTime: 20 },
  { id: "diagrams", label: "Diagrams", defaultTime: 10 },
  { id: "important-notes", label: "Important Notes", defaultTime: 8 },
  { id: "common-mistakes", label: "Common Mistakes", defaultTime: 7 },
  { id: "practice", label: "Practice", defaultTime: 20 },
  { id: "mcqs", label: "MCQs", defaultTime: 15 },
  { id: "output", label: "Output Questions", defaultTime: 10 },
  { id: "programming", label: "Programming", defaultTime: 25 },
  { id: "previous-year-questions", label: "Board-Style Practice", defaultTime: 20 },
  { id: "revision-notes", label: "Revision Notes", defaultTime: 5 },
  { id: "mock-test", label: "Mock Test", defaultTime: 30 },
  { id: "ai-tutor", label: "AI Tutor", defaultTime: 15 },
];

export function normalizeSectionId(id) {
  const value = String(id ?? "").trim().replace(/^#/, "");
  return value.startsWith(SECTION_ID_PREFIX) ? value.slice(SECTION_ID_PREFIX.length) : value;
}

export function isSectionCompleted(completedSections, id) {
  const canonical = normalizeSectionId(id);
  return (completedSections || []).some((item) => normalizeSectionId(item) === canonical);
}

/**
 * Sections that actually exist in the rendered page, in on-screen order.
 * `getElementById` is injected (document.getElementById in the browser). When
 * the elements support compareDocumentPosition the result follows DOM order,
 * otherwise the declared definition order is kept.
 */
export function findRenderedSections(getElementById, definitions = SECTION_DEFINITIONS) {
  const seen = new Set();
  const found = [];
  definitions.forEach((definition, index) => {
    if (seen.has(definition.id)) return;
    const element = getElementById(definition.id);
    if (!element) return;
    seen.add(definition.id);
    found.push({ ...definition, element, index });
  });

  const canCompare = found.every((item) => typeof item.element.compareDocumentPosition === "function");
  if (canCompare && found.length > 1) {
    found.sort((a, b) => {
      if (a.element === b.element) return a.index - b.index;
      const position = a.element.compareDocumentPosition(b.element);
      if (position & 4) return -1; // b follows a
      if (position & 2) return 1; // b precedes a
      return a.index - b.index;
    });
  }
  return found;
}

/** Previous / next section id relative to the active one; null at the ends. */
export function getAdjacentSectionId(orderedIds, activeId, direction) {
  if (!Array.isArray(orderedIds) || orderedIds.length === 0) return null;
  const index = orderedIds.indexOf(normalizeSectionId(activeId));
  if (direction === "next") {
    if (index === -1) return orderedIds[0];
    return index < orderedIds.length - 1 ? orderedIds[index + 1] : null;
  }
  if (index === -1) return null;
  return index > 0 ? orderedIds[index - 1] : null;
}

/** Active section = last section whose top has passed `offset` px from the viewport top. */
export function pickActiveSectionId(entries, offset = 180) {
  let active = null;
  for (const { id, top } of entries) {
    if (top <= offset) active = id;
  }
  return active ?? (entries[0]?.id ?? null);
}

// ---- Reading progress -----------------------------------------------------

export const VIEW_RATIO_THRESHOLD = 0.3;
export const OBSERVER_THRESHOLDS = [0, 0.1, VIEW_RATIO_THRESHOLD, 0.5, 1];

/**
 * A section counts as "viewed" when 30% of it is visible OR when it fills at
 * least 30% of the viewport. The second clause matters for tall sections: a
 * section 5x the viewport height can never reach a 0.3 intersection *ratio*.
 */
export function isSectionViewed(entry) {
  if (!entry || !entry.isIntersecting) return false;
  if (entry.intersectionRatio >= VIEW_RATIO_THRESHOLD) return true;
  const viewportHeight = entry.rootBounds?.height ?? (typeof window !== "undefined" ? window.innerHeight : 0);
  const visibleHeight = entry.intersectionRect?.height ?? 0;
  return viewportHeight > 0 && visibleHeight >= viewportHeight * VIEW_RATIO_THRESHOLD;
}

/**
 * IntersectionObserver only calls back when a threshold is crossed. A section
 * many screens tall (e.g. a 39,000px Examples block) enters with a few pixels
 * visible and never crosses another threshold, so the observer alone can miss
 * it. This position check is the complement: a section counts as viewed once
 * it covers the middle band (35%-65% of the viewport height) of the screen.
 * entries: [{ id, top, bottom }] in viewport pixels.
 */
export function sectionsAtReadingLine(entries, viewportHeight, band = [0.35, 0.65]) {
  if (!Array.isArray(entries) || !(viewportHeight > 0)) return [];
  const upper = viewportHeight * band[0];
  const lower = viewportHeight * band[1];
  return entries.filter(({ top, bottom }) => top < lower && bottom > upper).map(({ id }) => normalizeSectionId(id));
}

const STATUS_RANK = { "Not Started": 0, Studying: 1, Completed: 2 };
export const statusRank = (status) => STATUS_RANK[status] ?? 0;

export const MIN_SECTIONS_FOR_STUDYING = 4;
export const MIN_SECTIONS_FOR_COMPLETION = 4;

/**
 * Decide whether reading alone should advance the stored study status.
 * Returns "Studying", "Completed" or null (do nothing).
 *
 * - Only sections that are really rendered count; a missing section can never
 *   help or block completion.
 * - "Completed" needs every rendered section viewed AND a chapter with at least
 *   MIN_SECTIONS_FOR_COMPLETION sections, so a near-empty chapter is never
 *   completed just by being opened.
 * - Never downgrades and never repeats a status already submitted by auto
 *   tracking (appliedRank).
 * - manualOverride (set once the student clicks a Study Status button during
 *   this chapter visit) disables automatic changes entirely.
 */
export function decideAutoProgress({ renderedIds, viewedIds, currentStatus, appliedRank = 0, manualOverride = false }) {
  // A manual Study Status choice made during this chapter visit always wins.
  if (manualOverride) return null;
  const rendered = [...new Set((renderedIds || []).map(normalizeSectionId))];
  if (rendered.length === 0) return null;
  const viewed = new Set((viewedIds || []).map(normalizeSectionId));
  const viewedCount = rendered.filter((id) => viewed.has(id)).length;

  let target = null;
  if (
    rendered.length >= MIN_SECTIONS_FOR_COMPLETION &&
    viewedCount === rendered.length
  ) {
    target = "Completed";
  } else if (viewedCount >= Math.min(MIN_SECTIONS_FOR_STUDYING, rendered.length) && rendered.length >= 2) {
    target = "Studying";
  }
  if (!target) return null;

  const rank = statusRank(target);
  if (rank <= statusRank(currentStatus ?? "Not Started")) return null;
  if (rank <= appliedRank) return null;
  return target;
}

/**
 * Per-chapter-visit state for automatic progress: what auto tracking already
 * applied, and whether the student has taken manual control. It lives only in
 * memory (no storage / schema change), so it is cleared by reset() when the
 * chapter changes and by a page reload.
 */
export function createAutoProgressTracker() {
  let appliedRank = 0;
  let manualOverride = false;
  return {
    reset() {
      appliedRank = 0;
      manualOverride = false;
    },
    markManual() {
      manualOverride = true;
    },
    get hasManualOverride() {
      return manualOverride;
    },
    /** Returns the status to submit, or null; records what was applied. */
    evaluate({ renderedIds, viewedIds, currentStatus }) {
      const next = decideAutoProgress({ renderedIds, viewedIds, currentStatus, appliedRank, manualOverride });
      if (next) appliedRank = statusRank(next);
      return next;
    },
  };
}

// ---- Question list ("View all") --------------------------------------------

export const QUESTION_PREVIEW_LIMIT = 10;

/** Order-preserving slice. `showAll` exposes the complete list. */
export function getVisibleQuestions(questions, showAll = false, limit = QUESTION_PREVIEW_LIMIT) {
  const list = Array.isArray(questions) ? questions : [];
  return showAll ? list : list.slice(0, limit);
}

/**
 * Solve link for a chapter-list question. Every catalog question, including the
 * supplemental ICSE records, opens in the chapter question player (the player resolves
 * them through the content catalog). `practiceHref` is intentionally not used: for
 * ICSE records it is only the generic /question-bank page, not the question itself.
 */
export function getQuestionHref(question, chapter) {
  if (!question) return `/Java/${chapter}`;
  return `/Java/${chapter}/question/${question.id}`;
}
