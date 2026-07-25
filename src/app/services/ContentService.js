"use client";

import { ChapterService, QuestionService, SubjectService, TopicService } from "../../lib/firestore/database";

// One content gateway keeps the admin UI independent of Firestore collection details.
export const CONTENT_SERVICES = {
  subjects: SubjectService,
  chapters: ChapterService,
  topics: TopicService,
  questions: QuestionService,
};

export async function listContent(entity, pageSize = 100) {
  return CONTENT_SERVICES[entity].getAll(pageSize);
}

export async function saveContent(entity, item) {
  const service = CONTENT_SERVICES[entity];
  const payload = { ...item, updatedAt: new Date().toISOString() };
  if (item.id) return service.update(item.id, payload);
  return service.create({ ...payload, createdAt: new Date().toISOString() });
}

export async function deleteContent(entity, id) {
  return CONTENT_SERVICES[entity].delete(id);
}
