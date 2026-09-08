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

const DEMO_ARTICLE = {
  id: "demo-ai-study-guide",
  slug: "how-students-can-use-ai-responsibly-for-learning",
  category: "ai-technology",
  status: "published",
  title: "How Students Can Use AI Responsibly for Learning",
  excerpt: "AI can help you understand difficult topics, practise questions and improve your study process — but only when you stay in control of the learning.",
  seoTitle: "How Students Can Use AI Responsibly for Learning | Target95+",
  metaDescription: "A practical guide for school students on using AI for explanations, practice, revision and coding without becoming dependent on it.",
  keywords: ["AI for students", "AI learning", "responsible AI", "study with AI", "Target95"],
  publishedAt: new Date("2026-09-08T00:00:00.000Z"),
  content: `## AI should be your study partner, not your answer machine

Artificial intelligence can explain a difficult concept in simpler words, give you practice questions, help you find mistakes in code and suggest ways to revise. But there is an important difference between **using AI to learn** and **using AI to avoid learning**.

The best approach is simple: let AI speed up the parts of studying that need guidance while keeping the thinking, practice and final understanding with you.

## 1. Ask for an explanation, not just an answer

If a chapter feels confusing, ask AI to explain the concept step by step. You can also ask for a school-level explanation, an example, and then a short question to test whether you understood it.

For example, instead of asking for the answer to a programming problem, ask:

> Explain the logic first, then give me a similar problem to solve myself.

This turns AI into a tutor rather than a shortcut.

## 2. Use AI to practise

Once you understand a topic, ask for questions at your level. Try solving them without looking at the solution. Then compare your approach and ask AI to explain only the part where your reasoning went wrong.

This is especially useful for programming, mathematics and science because improvement comes from repeated problem solving.

## 3. Make revision active

AI can turn your notes into flashcards, quick quizzes, short-answer questions or a chapter checklist. But do not simply read the generated material again and again. Close the notes and try to recall the ideas yourself.

A good revision loop is:

1. Learn the concept.
2. Explain it in your own words.
3. Solve a few questions.
4. Check mistakes.
5. Revise the weak point.

AI can help with steps 2–5, but your own effort is what builds retention.

## 4. Be careful with facts

AI systems can sometimes produce incorrect information with confidence. This matters even more for board notices, dates, deadlines, eligibility rules, fees and other current information.

For those topics, use AI to help you understand the information, but verify important claims against the relevant official source before acting on them.

## 5. For coding, understand every line

If AI writes a Java or Python program for you, do not submit it immediately. Read the code and ask yourself:

- What does each variable store?
- Why is this loop needed?
- What happens when the input changes?
- Can I explain the program without looking at it?

If you cannot explain the code, you have received a solution but not yet learned the programming concept.

## A simple rule to remember

**Use AI to reduce confusion, increase practice and get feedback — not to remove the thinking from your study.**

That approach makes AI useful without making you dependent on it. And when you eventually face an exam, interview or programming problem without AI, the skill stays with you.
`,
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

  const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return articles.length ? articles : [DEMO_ARTICLE].slice(0, limit);
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

  const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  if (articles.length) return articles;
  return category === DEMO_ARTICLE.category ? [DEMO_ARTICLE].slice(0, limit) : [];
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
