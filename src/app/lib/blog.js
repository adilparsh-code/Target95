```ts
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
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  "ai-technology": "AI & Technology",
  "education-board-updates": "Education & Board Updates",
  "school-subjects": "School Subjects",
  "school-coding": "School Coding",
  development: "Development",
  programming: "Programming",
  opportunities: "Scholarships / Competitions / Opportunities",
  "trending-explainers": "Trending Explainers",
};

export interface BlogTopic {
  title: string;
  slug?: string;
  status?: string;
  [key: string]: unknown;
}

export interface BlogArticle {
  title: string;
  slug?: string;
  status?: string;
  category?: BlogCategory;
  [key: string]: unknown;
}

export function slugify(value: unknown): string {
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

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function listPublishedArticlesByCategory(
  category: string,
  limit = 30,
) {
  if (!BLOG_CATEGORIES.includes(category as BlogCategory)) {
    return [];
  }

  const snapshot = await getAdminDb()
    .collection("blog_articles")
    .where("status", "==", "published")
    .where("category", "==", category)
    .orderBy("publishedAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function upsertTopic(topic: BlogTopic) {
  const db = getAdminDb();
  const slug = topic.slug || slugify(topic.title);
  const ref = db.collection("blog_topics").doc(slug);

  const existing = await ref.get();

  await ref.set(
    {
      ...topic,
      slug,
      status: topic.status || "idea",
      updatedAt: FieldValue.serverTimestamp(),
      ...(existing.exists
        ? {}
        : { createdAt: FieldValue.serverTimestamp() }),
    },
    { merge: true },
  );

  return ref.id;
}

export async function createArticle(article: BlogArticle) {
  const db = getAdminDb();
  const slug = article.slug || slugify(article.title);
  const ref = db.collection("blog_articles").doc(slug);

  const existing = await ref.get();

  await ref.set(
    {
      ...article,
      slug,
      status: article.status || "draft",
      updatedAt: FieldValue.serverTimestamp(),
      ...(existing.exists
        ? {}
        : { createdAt: FieldValue.serverTimestamp() }),
    },
    { merge: true },
  );

  return ref.id;
}
```
