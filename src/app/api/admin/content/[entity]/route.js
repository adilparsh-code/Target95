import { adminGuard, serverError, sanitizeQueryParam } from "@/app/api/admin/_helpers";
import { validateContentEntity } from "@/app/lib/admin-validation";

export const dynamic = "force-dynamic";

/** Whitelisted content entities — anything else is rejected. */
const ENTITIES = new Set(["subjects", "chapters", "topics"]);

/**
 * GET  /api/admin/content/[entity] — list subjects/chapters/topics
 * POST /api/admin/content/[entity] — create a validated content document
 * All operations require a verified admin session (requireAdmin).
 */
export async function GET(request, { params }) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const { entity } = await params;
    if (!ENTITIES.has(entity)) {
      return Response.json({ success: false, error: "Unknown content entity." }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const search = sanitizeQueryParam(searchParams.get("q") || "", { maxLength: 120 }).toLowerCase();
    const status = sanitizeQueryParam(searchParams.get("status") || "", { maxLength: 16 });

    const snap = await guard.adminDb.collection(entity).limit(1000).get();
    let items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    // Server-side counts: subjects get chapter/question totals, chapters get
    // per-chapter question composition. One request, no client aggregation.
    if (entity === "subjects" || entity === "chapters") {
      const questionsSnap = await guard.adminDb.collection("questions").limit(1000).get();
      const chaptersSnap = entity === "subjects" ? await guard.adminDb.collection("chapters").limit(1000).get() : null;

      if (entity === "subjects") {
        const chaptersBySubject = new Map();
        chaptersSnap.docs.forEach((d) => {
          const key = d.data().subject || d.data().subjectId || "Unknown";
          chaptersBySubject.set(key, (chaptersBySubject.get(key) || 0) + 1);
        });
        const questionsBySubject = new Map();
        questionsSnap.docs.forEach((d) => {
          const key = d.data().subject || "Unknown";
          questionsBySubject.set(key, (questionsBySubject.get(key) || 0) + 1);
        });
        items = items.map((item) => ({
          ...item,
          counts: {
            chapters: chaptersBySubject.get(item.name) || 0,
            questions: questionsBySubject.get(item.name) || 0,
          },
        }));
      } else {
        const statsByChapter = new Map();
        questionsSnap.docs.forEach((d) => {
          const q = d.data();
          const key = q.chapter || q.chapterId || "Unknown";
          const entry = statsByChapter.get(key) || { total: 0, theory: 0, mcq: 0, programming: 0 };
          entry.total += 1;
          const type = String(q.type || "").toLowerCase();
          if (["theory", "short-answer", "long-answer"].includes(type)) entry.theory += 1;
          else if (["mcq", "true-false", "assertion-reason"].includes(type)) entry.mcq += 1;
          else if (["programming", "output", "case-study"].includes(type)) entry.programming += 1;
          statsByChapter.set(key, entry);
        });
        items = items.map((item) => ({
          ...item,
          counts: statsByChapter.get(item.name) || statsByChapter.get(item.id) || { total: 0, theory: 0, mcq: 0, programming: 0 },
        }));
      }
    }

    if (search) {
      items = items.filter((item) =>
        [item.name, item.title, item.slug, item.description, item.subject, item.chapter]
          .map((v) => String(v || "").toLowerCase())
          .some((v) => v.includes(search))
      );
    }
    if (status) items = items.filter((item) => String(item.status || "draft").toLowerCase() === status);

    return Response.json({ success: true, items, total: items.length });
  } catch (error) {
    console.error("Admin content list error:", error);
    return serverError();
  }
}

export async function POST(request, { params }) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  try {
    const { entity } = await params;
    if (!ENTITIES.has(entity)) {
      return Response.json({ success: false, error: "Unknown content entity." }, { status: 400 });
    }

    const body = await request.json().catch(() => null);
    const result = validateContentEntity(body);
    if (!result.ok) {
      return Response.json({ success: false, errors: result.errors }, { status: 400 });
    }

    const now = new Date().toISOString();
    const doc = await guard.adminDb.collection(entity).add({
      ...result.data,
      createdAt: now,
      updatedAt: now,
      createdBy: guard.admin.uid || "admin",
    });

    return Response.json({ success: true, item: { id: doc.id, ...result.data } }, { status: 201 });
  } catch (error) {
    console.error("Admin content create error:", error);
    return serverError();
  }
}
