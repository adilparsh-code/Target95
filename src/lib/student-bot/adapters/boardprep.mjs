import * as realCurriculum from '../../boardprepCurriculum.mjs';
import { validateChapterRecord, validateQuestion, isMcq } from '../../boardprepContentSchema.mjs';

// Published-only read model over the BoardPrep curriculum. It never invents
// chapters, answers or exam years: anything not present in the JSON is absent.

const norm = (text) => String(text ?? '').normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const ROMAN = { ix: '9', x: '10', xi: '11', xii: '12' };

function safe(fn, fallback) {
  try {
    return fn() ?? fallback;
  } catch {
    return fallback;
  }
}

// Question-level problems are handled per question (an invalid MCQ is simply
// never served), and a missing vocabulary list does not make study text unsafe.
// Any other validator error blocks the chapter.
const NON_BLOCKING = (issue) => issue.code === 'chapter.vocabulary' || String(issue.code).startsWith('question.');
const blockingIssues = (chapter) =>
  validateChapterRecord(chapter).filter((issue) => issue.level === 'error' && !NON_BLOCKING(issue));

export function createBoardprepAdapter(curriculum = realCurriculum) {
  const boards = () => safe(() => curriculum.getBoards(), []);
  const classesOf = (board) => safe(() => curriculum.getBoard(board)?.classes, []);
  const subjectsOf = (board, classSlug) => safe(() => curriculum.getSubjects(board, classSlug), []);
  const published = (ctx) => safe(() => curriculum.getPublishedChapters(ctx.board, ctx.classSlug, ctx.subjectSlug), []);

  function resolveContext(text) {
    const words = norm(text).split(' ').filter(Boolean);
    const board = boards().find((b) => words.includes(norm(b.slug)));
    if (!board) return { ok: false, code: 'board_not_found' };
    let classSlug = null;
    const numeric = norm(text).match(/(?:class|std|grade)?\s*(\d{1,2})\b/);
    const roman = words.find((w) => ROMAN[w]);
    const wanted = numeric ? numeric[1] : roman ? ROMAN[roman] : null;
    if (wanted) classSlug = classesOf(board.slug).find((c) => String(c.numeral) === wanted)?.slug ?? null;
    if (!classSlug) return { ok: false, code: 'class_not_found', board: board.slug };
    const joined = ` ${words.join(' ')} `;
    const subject = subjectsOf(board.slug, classSlug)
      .filter((s) => joined.includes(` ${norm(s.slug)} `) || joined.includes(` ${norm(s.title)} `))
      .sort((a, b) => norm(b.title).length - norm(a.title).length)[0];
    if (!subject) return { ok: false, code: 'subject_not_found', board: board.slug, classSlug };
    return { ok: true, context: { board: board.slug, classSlug, subjectSlug: subject.slug }, subject };
  }

  // Re-validates a client-supplied context against the real curriculum.
  function verifyContext(ctx = {}) {
    if (!ctx.board || !ctx.classSlug) return { ok: false, code: 'context_missing' };
    if (!boards().some((b) => b.slug === ctx.board)) return { ok: false, code: 'board_not_found' };
    if (!classesOf(ctx.board).some((c) => c.slug === ctx.classSlug)) return { ok: false, code: 'class_not_found' };
    if (!ctx.subjectSlug) return { ok: true, context: { board: ctx.board, classSlug: ctx.classSlug } };
    const subject = subjectsOf(ctx.board, ctx.classSlug).find((s) => s.slug === ctx.subjectSlug);
    if (!subject) return { ok: false, code: 'subject_not_found' };
    return { ok: true, context: { board: ctx.board, classSlug: ctx.classSlug, subjectSlug: ctx.subjectSlug }, subject };
  }

  const listSubjects = (ctx) => subjectsOf(ctx.board, ctx.classSlug);

  function listChapters(ctx) {
    return published(ctx).map((c) => ({
      slug: c.slug,
      title: c.title,
      examYears: Array.isArray(c.examYears) ? c.examYears : [],
      syllabusStatus: c.syllabusStatus ?? null,
    }));
  }

  // Exact slug first, then unique normalised title/slug match. Unpublished
  // chapters are never in the candidate list, so they can never match.
  function findChapter(ctx, query) {
    const q = norm(query);
    if (!q) return { status: 'none', matches: [] };
    const all = listChapters(ctx);
    const exact = all.filter((c) => c.slug === String(query).trim().toLowerCase() || norm(c.title) === q);
    if (exact.length === 1) return { status: 'found', matches: exact };
    const partial = all.filter((c) => norm(c.title).includes(q) || norm(c.slug).includes(q));
    if (partial.length === 1) return { status: 'found', matches: partial };
    return { status: partial.length ? 'ambiguous' : 'none', matches: partial.slice(0, 8) };
  }

  // Returns a validated, published chapter or a typed failure.
  function loadChapter(ctx, slug) {
    if (!published(ctx).some((c) => c.slug === slug)) return { ok: false, code: 'chapter_not_published' };
    const chapter = safe(() => curriculum.getChapter(ctx.board, ctx.classSlug, ctx.subjectSlug, slug), null);
    if (!chapter) return { ok: false, code: 'chapter_unavailable' };
    if (blockingIssues(chapter).length) return { ok: false, code: 'chapter_invalid' };
    return { ok: true, chapter };
  }

  // Only MCQs that pass the project validator are ever served.
  function getMcqs(chapter) {
    return (chapter.questions || []).filter(
      (q) => isMcq(q) && validateQuestion(q, chapter.id).length === 0 && q.id,
    );
  }

  return { resolveContext, verifyContext, listSubjects, listChapters, findChapter, loadChapter, getMcqs };
}
