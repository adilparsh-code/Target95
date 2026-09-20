"use client";

// One content gateway keeps the admin UI independent of the underlying API
// routes. All operations run through requireAdmin-protected server APIs —
// the admin client never touches Firestore directly, so authorization is
// enforced server-side on every read and write.

const CONTENT_PATHS = {
  subjects: "subjects",
  chapters: "chapters",
  topics: "topics",
};

function endpointFor(entity, id = null) {
  if (entity === "questions") return `/api/admin/questions${id ? `/${id}` : ""}`;
  if (entity === "generatedQuestions") return `/api/admin/generated-questions${id ? `/${id}` : ""}`;
  if (entity === "mockTests") return `/api/admin/mock-tests${id ? `/${id}` : ""}`;
  if (CONTENT_PATHS[entity]) return `/api/admin/content/${CONTENT_PATHS[entity]}${id ? `/${id}` : ""}`;
  throw new Error(`Unknown content entity: ${entity}`);
}

async function parseResponse(response, fallbackMessage) {
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload?.success) {
    const detail = Array.isArray(payload?.errors) ? payload.errors.join(" ") : payload?.error;
    throw new Error(detail || fallbackMessage);
  }
  return payload;
}

export async function listContent(entity) {
  const payload = await parseResponse(
    await fetch(endpointFor(entity), { cache: "no-store" }),
    `Unable to load ${entity}.`
  );
  return payload.questions || payload.items || [];
}

export async function saveContent(entity, item) {
  const isUpdate = Boolean(item?.id);
  const response = await fetch(endpointFor(entity, isUpdate ? item.id : null), {
    method: isUpdate ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  const payload = await parseResponse(response, "Unable to save content.");
  return payload.question || payload.test || payload.item || payload;
}

export async function deleteContent(entity, id) {
  const response = await fetch(endpointFor(entity, id), { method: "DELETE" });
  await parseResponse(response, "Unable to delete content.");
  return true;
}
