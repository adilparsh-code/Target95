import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "./firebase-admin";

export const BLOG_CATEGORIES = [
  "ai-technology",
  "education-board-updates",
  "school-subjects",
  "school-coding",
  "development",
  "programming",
  "opportunities",
  "trending-explainers",
];

export const BLOG_CATEGORY_LABELS = {
  "ai-technology": "AI & Technology",
  "education-board-updates": "Education & Board Updates",
  "school-subjects": "School Subjects",
  "school-coding": "School Coding",
  development: "Development",
  programming: "Programming",
  opportunities: "Scholarships / Competitions / Opportunities",
  "trending-explainers": "Trending Explainers",
};

export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 90);
}

export async function listPublishedArticles(limit = 30) {
  const snapshot = await getAdminDb()
    .collection("blog_articles")
    .where("status", "==", "published")
    .orderBy("publishedAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function listPublishedArticlesByCategory(category, limit = 30) {
  if (!BLOG_CATEGORIES.includes(category)) return [];
  const snapshot = await getAdminDb()
    .collection("blog_articles")
    .where("status", "==", "published")
    .where("category", "==", category)
    .orderBy("publishedAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function upsertTopic(topic) {
  const db = getAdminDb();
  const ref = db.collection("blog_topics").doc(slugify(topic.title));
  await ref.set(
    {
      ...topic,
      slug: slugify(topic.title),
      status: topic.status || "idea",
      updatedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
  return ref.id;
}

export async function createArticle(article) {
  const db = getAdminDb();
  const ref = db.collection("blog_articles").doc(article.slug || slugify(article.title));
  await ref.set(
    {
      ...article,
      slug: article.slug || slugify(article.title),
      status: article.status || "draft",
      updatedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
  return ref.id;
}
