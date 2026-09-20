import { adminGuard, serverError, sanitizeQueryParam } from "@/app/api/admin/_helpers";
import {
  validateQuestion,
  normalizeStatus,
  normalizeDifficulty,
  normalizeQuestionType,
  cleanString,
  DIFFICULTIES,
  QUESTION_TYPES,
  STATUSES,
  BOARDS,
  CLASSES,
} from "@/app/lib/admin-validation";

export const dynamic = "force-dynamic";

/**
 * GET  /api/admin/questions  — list questions with server-side filters
 * POST /api/admin/questions  — create a validated question
 * All operations require a verified admin session (requireAdmin).
 */
export async function GET(request) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const { searchParams } = new URL(request.url);
    const search = sanitizeQueryParam(searchParams.get("q") || "", { maxLength: 120 }).toLowerCase();
    const board = sanitizeQueryParam(searchParams.get("board") || "", { maxLength: 8 });
    const cls = sanitizeQueryParam(searchParams.get("class") || "", { maxLength: 4 });
    const subject = sanitizeQueryParam(searchParams.get("subject") || "", { maxLength: 80 });
    const chapter = sanitizeQueryParam(searchParams.get("chapter") || "", { maxLength: 120 });
    const topic = sanitizeQueryParam(searchParams.get("topic") || "", { maxLength: 120 });
    const difficulty = normalizeDifficulty(searchParams.get("difficulty"));
    const type = normalizeQuestionType(searchParams.get("type"));
    const status = normalizeStatus(searchParams.get("status"));
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 500, 1), 1000);

    const snap = await guard.adminDb.collection("questions").limit(1000).get();
    let questions = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    if (search) {
      questions = questions.filter((q) =>
        [q.title, q.question, q.statement, q.topic, q.chapter, q.subject]
          .map((v) => String(v || "").toLowerCase())
          .some((v) => v.includes(search))
      );
    }
    if (board) questions = questions.filter((q) => String(q.board || "").toUpperCase() === board.toUpperCase());
    if (cls) questions = questions.filter((q) => String(q.class ?? q.classLevel ?? "") === cls);
    if (subject) questions = questions.filter((q) => (q.subject || q.subjectId) === subject);
    if (chapter) questions = questions.filter((q) => (q.chapter || q.chapterId) === chapter);
    if (topic) questions = questions.filter((q) => q.topic === topic);
    if (difficulty) questions = questions.filter((q) => String(q.difficulty || "").toLowerCase() === difficulty);
    if (type) questions = questions.filter((q) => normalizeQuestionType(q.type || q.questionType) === type);
    if (status) questions = questions.filter((q) => String(q.status || "draft").toLowerCase() === status);

    // Facet values for the filter dropdowns (computed from the full snapshot).
    const facets = {
      subjects: [...new Set(questions.map((q) => q.subject || q.subjectId).filter(Boolean))].sort(),
      chapters: [...new Set(questions.map((q) => q.chapter || q.chapterId).filter(Boolean))].sort(),
      topics: [...new Set(questions.map((q) => q.topic).filter(Boolean))].sort(),
      difficulties: DIFFICULTIES,
      types: QUESTION_TYPES,
      statuses: STATUSES,
      boards: BOARDS,
      classes: CLASSES,
    };

    return Response.json({
      success: true,
      questions,
      facets,
      total: questions.length,
    });
  } catch (error) {
    console.error("Admin questions list error:", error);
    return serverError();
  }
}

export async function POST(request) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const body = await request.json().catch(() => null);
    const result = validateQuestion(body);
    if (!result.ok) {
      return Response.json({ success: false, errors: result.errors }, { status: 400 });
    }

    const now = new Date().toISOString();
    const doc = await guard.adminDb.collection("questions").add({
      ...result.data,
      createdAt: now,
      updatedAt: now,
      createdBy: guard.admin.uid || "admin",
    });

    return Response.json({ success: true, question: { id: doc.id, ...result.data } }, { status: 201 });
  } catch (error) {
    console.error("Admin question create error:", error);
    return serverError();
  }
}
