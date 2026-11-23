/**
 * Single MCQ answer contract for student-facing chapter content.
 *
 * Stored contract : `answer` is the zero-based index of the correct option.
 * Legacy tolerance: a string that equals exactly one option's text is resolved
 *                   to that option's index (some authored chapters stored the
 *                   option text instead of an index).
 * Anything else is INVALID. It is never silently turned into option A.
 */

export function resolveMcqAnswer(answer, options) {
  const list = Array.isArray(options) ? options : [];
  if (list.length < 2) return { valid: false, index: null, reason: "fewer than 2 options" };

  if (typeof answer === "number") {
    if (Number.isInteger(answer) && answer >= 0 && answer < list.length) {
      return { valid: true, index: answer, reason: null };
    }
    return { valid: false, index: null, reason: `answer index ${answer} is outside 0..${list.length - 1}` };
  }

  if (typeof answer === "string" && answer.trim() !== "") {
    const wanted = answer.trim();
    const matches = [];
    list.forEach((option, index) => {
      if (String(option).trim() === wanted) matches.push(index);
    });
    if (matches.length === 1) return { valid: true, index: matches[0], reason: null };
    if (matches.length > 1) return { valid: false, index: null, reason: "answer text matches more than one option" };
    return { valid: false, index: null, reason: "answer text matches no option" };
  }

  return { valid: false, index: null, reason: "missing answer key" };
}

/** True only when a selection was made and equals the stored correct index. */
export function isMcqSelectionCorrect(selectedIndex, answerIndex) {
  return Number.isInteger(selectedIndex) && Number.isInteger(answerIndex) && selectedIndex === answerIndex;
}

const isBlank = (value) => value === null || value === undefined || (typeof value === "string" && value.trim() === "");

/**
 * Question-bank key contract: `correctAnswer` is a single option letter (A, B,
 * ...) or `answer` is a zero-based option index. Returns { valid, index, reason }.
 * An unresolvable key is NEVER turned into option A; callers must drop and
 * report the question.
 */
export function resolveBankMcqAnswer(raw, optionCount) {
  const hasProperty =
    !!raw && (Object.prototype.hasOwnProperty.call(raw, "correctAnswer") || Object.prototype.hasOwnProperty.call(raw, "answer"));
  if (!hasProperty) {
    return { valid: false, index: null, reason: "missing answer key (no answer or correctAnswer property)" };
  }
  const key = isBlank(raw.correctAnswer) ? raw.answer : raw.correctAnswer;
  if (isBlank(key)) return { valid: false, index: null, reason: "empty answer key (null, undefined or blank)" };

  if (typeof key === "string") {
    const letter = key.trim();
    if (!/^[A-Za-z]$/.test(letter)) {
      return { valid: false, index: null, reason: `invalid answer key "${letter.slice(0, 30)}": expected a single option letter` };
    }
    const index = letter.toUpperCase().charCodeAt(0) - 65;
    return index < optionCount
      ? { valid: true, index, reason: null }
      : { valid: false, index: null, reason: `answer letter ${letter.toUpperCase()} is outside the ${optionCount} options` };
  }
  if (typeof key === "number") {
    return Number.isInteger(key) && key >= 0 && key < optionCount
      ? { valid: true, index: key, reason: null }
      : { valid: false, index: null, reason: `answer index ${key} is outside 0..${optionCount - 1}` };
  }
  return { valid: false, index: null, reason: `invalid answer key type (${typeof key})` };
}
