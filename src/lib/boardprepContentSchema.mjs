// Shared vocabulary and checks for BoardPrep chapter records.
//
// The chapter JSON under src/app/data/boardprep/content is the single source of
// truth for published study material. The validators, the tests and the renderer
// all speak about chapters in the same terms, so the rules live here once.

export const QUESTION_TYPES = [
  'mcq',
  'fill-blank',
  'short',
  'long',
  'analytical',
  'hots',
  'transformation',
  'extract',
];

export const MCQ_QUESTION_TYPE = 'mcq';

export const DIFFICULTIES = ['easy', 'medium', 'hard'];

export const BLOCK_TYPES = ['paragraph', 'terms', 'bullets', 'examples', 'table'];

// Answers written as placeholders never pass a publish check.
const PLACEHOLDER_ANSWER = /^(tbd|tbc|todo|to\s+do|n\/a|na|none|xxx+|placeholder|lorem ipsum|\.\.\.|-\s*)$/i;

// Free-text answers and explanations need real prose, not a fragment.
export const MIN_ANSWER_LENGTH = 2;
export const MIN_EXPLANATION_LENGTH = 20;

export function normalizeAnswer(value) {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

/**
 * Compare a stored answer with a listed option.
 *
 * Older English and Mathematics records were written before the answer had to
 * be identical to the option text, so the tolerant comparison (trimmed,
 * whitespace-collapsed, case-insensitive) is kept for them. Geography uses the
 * strict comparison so that the printed answer and the keyed option are
 * character-for-character the same.
 */
export function answerMatchesOption(answer, option, { strict = false } = {}) {
  if (answer === undefined || answer === null || option === undefined || option === null) return false;
  if (strict) return String(answer) === String(option);
  return normalizeAnswer(answer) === normalizeAnswer(option);
}

export function isMcq(question) {
  return question?.type === MCQ_QUESTION_TYPE;
}

export function countQuestions(chapter) {
  return Array.isArray(chapter?.questions) ? chapter.questions.length : 0;
}

export function countQuestionsByType(chapter) {
  const counts = {};
  for (const question of chapter?.questions || []) {
    const type = question?.type || 'unknown';
    counts[type] = (counts[type] || 0) + 1;
  }
  return counts;
}

export function isPlaceholderText(value) {
  if (typeof value !== 'string') return true;
  const trimmed = value.trim();
  if (!trimmed) return true;
  return PLACEHOLDER_ANSWER.test(trimmed);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isNonEmptyStringArray(value) {
  return Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString);
}

function hasIdShape(value) {
  return typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function pushIssue(issues, code, message) {
  issues.push({ level: 'error', code, message });
}

/**
 * Check one chapter record.
 *
 * Returns a list of issues; an empty list means the record satisfies the
 * schema. Options let a caller tighten a rule for one subject without
 * weakening the rule everywhere else.
 */
export function validateChapterRecord(chapter, options = {}) {
  const {
    strictMcq = false,
    requireLearningOutcomes = false,
    expectedQuestions = null,
    requireAssessment = false,
  } = options;

  const issues = [];

  if (!chapter || typeof chapter !== 'object' || Array.isArray(chapter)) {
    pushIssue(issues, 'chapter.not-an-object', 'Chapter record is not a JSON object.');
    return issues;
  }

  if (!hasIdShape(chapter.id)) {
    pushIssue(issues, 'chapter.id', `Chapter id "${chapter.id ?? ''}" must be a lowercase kebab-case identifier.`);
  }
  if (!isNonEmptyString(chapter.title)) {
    pushIssue(issues, 'chapter.title', `Chapter ${chapter.id ?? '(unknown)'} has no title.`);
  }
  if (!isNonEmptyString(chapter.kind)) {
    pushIssue(issues, 'chapter.kind', `Chapter ${chapter.id ?? '(unknown)'} has no kind.`);
  }
  if (!isNonEmptyString(chapter.tagline)) {
    pushIssue(issues, 'chapter.tagline', `Chapter ${chapter.id ?? '(unknown)'} has no tagline.`);
  }
  if (!isNonEmptyString(chapter.reviewStatus)) {
    pushIssue(issues, 'chapter.reviewStatus', `Chapter ${chapter.id ?? '(unknown)'} has no reviewStatus.`);
  }
  if (!chapter.sourceNote || typeof chapter.sourceNote !== 'object') {
    pushIssue(issues, 'chapter.sourceNote', `Chapter ${chapter.id ?? '(unknown)'} has no sourceNote.`);
  } else {
    // thirdParty names the third-party source the material was taken from. It is
    // legitimately empty for original BoardPrep material, but it must be there.
    if (typeof chapter.sourceNote.thirdParty !== 'string') {
      pushIssue(issues, 'chapter.sourceNote', `Chapter ${chapter.id ?? '(unknown)'} sourceNote.thirdParty is missing.`);
    }
    if (!isNonEmptyString(chapter.sourceNote.boardprep)) {
      pushIssue(issues, 'chapter.sourceNote', `Chapter ${chapter.id ?? '(unknown)'} sourceNote.boardprep is empty.`);
    }
  }

  if (!chapter.overview || typeof chapter.overview !== 'object') {
    pushIssue(issues, 'chapter.overview', `Chapter ${chapter.id ?? '(unknown)'} has no overview.`);
  } else {
    if (!isNonEmptyString(chapter.overview.intro)) {
      pushIssue(issues, 'chapter.overview', `Chapter ${chapter.id ?? '(unknown)'} overview has no intro.`);
    }
    if (!Array.isArray(chapter.overview.facts) || chapter.overview.facts.length === 0) {
      pushIssue(issues, 'chapter.overview', `Chapter ${chapter.id ?? '(unknown)'} overview has no facts.`);
    } else {
      for (const fact of chapter.overview.facts) {
        if (!isNonEmptyString(fact?.label) || !isNonEmptyString(fact?.value)) {
          pushIssue(issues, 'chapter.overview', `Chapter ${chapter.id ?? '(unknown)'} has an incomplete overview fact.`);
          break;
        }
      }
    }
  }

  if (!Array.isArray(chapter.learn) || chapter.learn.length === 0) {
    pushIssue(issues, 'chapter.learn', `Chapter ${chapter.id ?? '(unknown)'} has no learn sections.`);
  } else {
    const lessonIds = new Set();
    for (const lesson of chapter.learn) {
      if (!hasIdShape(lesson?.id)) {
        pushIssue(issues, 'chapter.learn', `Chapter ${chapter.id ?? '(unknown)'} has a lesson with an invalid id.`);
      } else if (lessonIds.has(lesson.id)) {
        pushIssue(issues, 'chapter.learn', `Chapter ${chapter.id ?? '(unknown)'} repeats lesson id "${lesson.id}".`);
      } else {
        lessonIds.add(lesson.id);
      }
      if (!isNonEmptyString(lesson?.title)) {
        pushIssue(issues, 'chapter.learn', `Chapter ${chapter.id ?? '(unknown)'} has a lesson with no title.`);
      }
      if (!Array.isArray(lesson?.blocks) || lesson.blocks.length === 0) {
        pushIssue(issues, 'chapter.learn', `Chapter ${chapter.id ?? '(unknown)'} lesson "${lesson?.id ?? ''}" has no blocks.`);
        continue;
      }
      for (const block of lesson.blocks) {
        for (const issue of validateBlock(block, chapter.id, lesson?.id)) issues.push(issue);
      }
    }
  }

  if (!isNonEmptyStringArray(chapter.keyPoints)) {
    pushIssue(issues, 'chapter.keyPoints', `Chapter ${chapter.id ?? '(unknown)'} has no key points.`);
  }
  if (!isNonEmptyStringArray(chapter.examFocus)) {
    pushIssue(issues, 'chapter.examFocus', `Chapter ${chapter.id ?? '(unknown)'} has no exam focus.`);
  }
  if (!Array.isArray(chapter.vocabulary) || chapter.vocabulary.length === 0) {
    pushIssue(issues, 'chapter.vocabulary', `Chapter ${chapter.id ?? '(unknown)'} has no vocabulary.`);
  } else {
    for (const item of chapter.vocabulary) {
      if (!isNonEmptyString(item?.word) || !isNonEmptyString(item?.meaning)) {
        pushIssue(issues, 'chapter.vocabulary', `Chapter ${chapter.id ?? '(unknown)'} has an incomplete vocabulary entry.`);
        break;
      }
    }
  }

  if (chapter.learningOutcomes !== undefined) {
    if (!isNonEmptyStringArray(chapter.learningOutcomes)) {
      pushIssue(issues, 'chapter.learningOutcomes', `Chapter ${chapter.id ?? '(unknown)'} has empty learning outcomes.`);
    }
  } else if (requireLearningOutcomes) {
    pushIssue(issues, 'chapter.learningOutcomes', `Chapter ${chapter.id ?? '(unknown)'} has no learning outcomes.`);
  }

  if (chapter.assessment !== undefined) {
    for (const issue of validateAssessment(chapter.assessment, chapter.id)) issues.push(issue);
  } else if (requireAssessment) {
    pushIssue(issues, 'chapter.assessment', `Chapter ${chapter.id ?? '(unknown)'} has no assessment section.`);
  }

  if (!Array.isArray(chapter.questions) || chapter.questions.length === 0) {
    pushIssue(issues, 'chapter.questions', `Chapter ${chapter.id ?? '(unknown)'} has no questions.`);
  } else {
    const questionIds = new Set();
    for (const question of chapter.questions) {
      if (!hasIdShape(question?.id)) {
        pushIssue(issues, 'question.id', `Chapter ${chapter.id ?? '(unknown)'} has a question with an invalid id.`);
      } else if (questionIds.has(question.id)) {
        pushIssue(issues, 'question.id', `Chapter ${chapter.id ?? '(unknown)'} repeats question id "${question.id}".`);
      } else {
        questionIds.add(question.id);
      }
      for (const issue of validateQuestion(question, chapter.id, { strictMcq })) issues.push(issue);
    }
  }

  if (typeof expectedQuestions === 'number' && countQuestions(chapter) !== expectedQuestions) {
    pushIssue(
      issues,
      'chapter.question-count',
      `Chapter ${chapter.id ?? '(unknown)'} has ${countQuestions(chapter)} questions, expected ${expectedQuestions}.`,
    );
  }

  return issues;
}

export function validateBlock(block, chapterId = '', lessonId = '') {
  const issues = [];
  const where = `Chapter ${chapterId || '(unknown)'} lesson "${lessonId || '?'}"`;

  if (!block || typeof block !== 'object') {
    pushIssue(issues, 'block.not-an-object', `${where} has a block that is not an object.`);
    return issues;
  }

  switch (block.type) {
    case 'paragraph':
      if (!isNonEmptyString(block.text)) {
        pushIssue(issues, 'block.paragraph', `${where} has a paragraph block with no text.`);
      }
      break;
    case 'bullets':
      if (!isNonEmptyStringArray(block.items)) {
        pushIssue(issues, 'block.bullets', `${where} has a bullets block with no items.`);
      }
      break;
    case 'examples':
      if (!Array.isArray(block.items) || block.items.length === 0) {
        pushIssue(issues, 'block.examples', `${where} has an examples block with no items.`);
        break;
      }
      for (const item of block.items) {
        if (!isNonEmptyString(item?.text) || !isNonEmptyString(item?.note)) {
          pushIssue(issues, 'block.examples', `${where} has an incomplete example.`);
          break;
        }
      }
      break;
    case 'terms':
      if (!Array.isArray(block.items) || block.items.length === 0) {
        pushIssue(issues, 'block.terms', `${where} has a terms block with no items.`);
        break;
      }
      for (const item of block.items) {
        if (!isNonEmptyString(item?.term) || !isNonEmptyString(item?.meaning)) {
          pushIssue(issues, 'block.terms', `${where} has an incomplete term.`);
          break;
        }
      }
      break;
    case 'table':
      if (!isNonEmptyString(block.caption)) {
        pushIssue(issues, 'block.table', `${where} has a table block with no caption.`);
      }
      if (!isNonEmptyStringArray(block.columns)) {
        pushIssue(issues, 'block.table', `${where} has a table block with no columns.`);
      }
      if (!Array.isArray(block.rows) || block.rows.length === 0) {
        pushIssue(issues, 'block.table', `${where} has a table block with no rows.`);
        break;
      }
      for (const row of block.rows) {
        if (!Array.isArray(row) || row.length !== (block.columns?.length ?? 0) || !row.every(isNonEmptyString)) {
          pushIssue(issues, 'block.table', `${where} has a table row that does not match the column count.`);
          break;
        }
      }
      break;
    default:
      // Unknown block types fall back to their text in the renderer, so a text
      // value is enough to keep them readable.
      if (!isNonEmptyString(block.text)) {
        pushIssue(issues, 'block.unknown', `${where} has an unsupported block type "${block.type}" with no text fallback.`);
      }
      break;
  }

  return issues;
}

export function validateQuestion(question, chapterId = '', { strictMcq = false } = {}) {
  const issues = [];
  const where = `Question ${question?.id ?? '(unknown)'} in chapter ${chapterId || '(unknown)'}`;

  if (!question || typeof question !== 'object') {
    pushIssue(issues, 'question.not-an-object', `${where} is not an object.`);
    return issues;
  }

  if (!hasIdShape(question.id)) {
    pushIssue(issues, 'question.id', `${where} has an invalid id.`);
  }
  if (!QUESTION_TYPES.includes(question.type)) {
    pushIssue(issues, 'question.type', `${where} has unsupported type "${question.type}".`);
  }
  if (!DIFFICULTIES.includes(question.difficulty)) {
    pushIssue(issues, 'question.difficulty', `${where} has unsupported difficulty "${question.difficulty}".`);
  }
  if (!Number.isInteger(question.marks) || question.marks < 1) {
    pushIssue(issues, 'question.marks', `${where} must carry a positive whole-number mark value.`);
  }
  if (!isNonEmptyString(question.prompt)) {
    pushIssue(issues, 'question.prompt', `${where} has no prompt.`);
  }
  if (isPlaceholderText(question.answer)) {
    pushIssue(issues, 'question.answer', `${where} has a blank or placeholder answer.`);
  } else if (String(question.answer).trim().length < MIN_ANSWER_LENGTH) {
    pushIssue(issues, 'question.answer', `${where} has an answer that is too short to be meaningful.`);
  }
  if (isPlaceholderText(question.explanation)) {
    pushIssue(issues, 'question.explanation', `${where} has a blank or placeholder explanation.`);
  } else if (String(question.explanation).trim().length < MIN_EXPLANATION_LENGTH) {
    pushIssue(issues, 'question.explanation', `${where} has an explanation that is too short to be meaningful.`);
  }
  if (question.commonMistake !== undefined && !isNonEmptyString(question.commonMistake)) {
    pushIssue(issues, 'question.commonMistake', `${where} has an empty common mistake note.`);
  }

  if (isMcq(question)) {
    if (!Array.isArray(question.options) || question.options.length < 3) {
      pushIssue(issues, 'question.options', `${where} must offer at least three options.`);
    } else {
      if (!question.options.every(isNonEmptyString)) {
        pushIssue(issues, 'question.options', `${where} has an empty option.`);
      }
      if (new Set(question.options.map(normalizeAnswer)).size !== question.options.length) {
        pushIssue(issues, 'question.options', `${where} has duplicate options.`);
      }
    }
    if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0) {
      pushIssue(issues, 'question.correctIndex', `${where} has no valid correctIndex.`);
    } else if (Array.isArray(question.options) && question.correctIndex >= question.options.length) {
      pushIssue(issues, 'question.correctIndex', `${where} correctIndex points outside the option list.`);
    } else if (Array.isArray(question.options)) {
      const keyed = question.options[question.correctIndex];
      if (!answerMatchesOption(question.answer, keyed, { strict: strictMcq })) {
        pushIssue(issues, 'question.answer', `${where} answer does not match the option at correctIndex.`);
      }
    }
  } else if (question.options !== undefined) {
    pushIssue(issues, 'question.options', `${where} is not an MCQ but carries options.`);
  }

  return issues;
}

export function validateAssessment(assessment, chapterId = '') {
  const issues = [];
  const where = `Assessment in chapter ${chapterId || '(unknown)'}`;

  if (!assessment || typeof assessment !== 'object') {
    pushIssue(issues, 'assessment.not-an-object', `${where} is not an object.`);
    return issues;
  }
  if (!hasIdShape(assessment.id)) {
    pushIssue(issues, 'assessment.id', `${where} has an invalid id.`);
  }
  if (!isNonEmptyString(assessment.title)) {
    pushIssue(issues, 'assessment.title', `${where} has no title.`);
  }
  if (!isNonEmptyStringArray(assessment.instructions)) {
    pushIssue(issues, 'assessment.instructions', `${where} has no instructions.`);
  }
  if (!Array.isArray(assessment.exercises) || assessment.exercises.length === 0) {
    pushIssue(issues, 'assessment.exercises', `${where} has no exercises.`);
    return issues;
  }
  const exerciseIds = new Set();
  for (const exercise of assessment.exercises) {
    if (!hasIdShape(exercise?.id)) {
      pushIssue(issues, 'assessment.exercise', `${where} has an exercise with an invalid id.`);
    } else if (exerciseIds.has(exercise.id)) {
      pushIssue(issues, 'assessment.exercise', `${where} repeats exercise id "${exercise.id}".`);
    } else {
      exerciseIds.add(exercise.id);
    }
    if (!isNonEmptyString(exercise?.prompt)) {
      pushIssue(issues, 'assessment.exercise', `${where} has an exercise with no prompt.`);
    }
    if (isPlaceholderText(exercise?.answer)) {
      pushIssue(issues, 'assessment.answer', `${where} has an exercise with a blank or placeholder answer.`);
    }
    if (isPlaceholderText(exercise?.explanation)) {
      pushIssue(issues, 'assessment.explanation', `${where} has an exercise with a blank or placeholder explanation.`);
    }
    if (exercise?.marks !== undefined && (!Number.isInteger(exercise.marks) || exercise.marks < 1)) {
      pushIssue(issues, 'assessment.marks', `${where} has an exercise with an invalid mark value.`);
    }
  }

  return issues;
}
