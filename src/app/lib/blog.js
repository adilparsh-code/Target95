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

export const BLOG_EDITORIAL_PILLARS = [
  {
    id: "curriculum",
    label: "Curriculum & Learning",
    description: "Useful concept explainers that can naturally lead students to Target95 learning and practice.",
  },
  {
    id: "building-target95",
    label: "Building Target95",
    description: "Original build notes, mistakes, decisions, experiments and lessons from creating Target95.",
  },
  {
    id: "student-problems",
    label: "Student Problems",
    description: "Real learning confusion, coding errors, FAQs and practical fixes students can act on.",
  },
];

export const EDITORIAL_TOPIC_POOL = [
  { pillar: "curriculum", category: "school-coding", title: "Why beginners get confused by Java loops — and how to fix the logic first" },
  { pillar: "curriculum", category: "programming", title: "How to approach a programming problem before writing code" },
  { pillar: "curriculum", category: "school-subjects", title: "How to revise a difficult chapter without simply rereading it" },
  { pillar: "curriculum", category: "ai-technology", title: "How students can use AI as a study partner without becoming dependent on it" },
  { pillar: "student-problems", category: "school-coding", title: "The Java errors school students make most often — and what they actually mean" },
  { pillar: "student-problems", category: "programming", title: "Why your program works for one input but fails for another" },
  { pillar: "student-problems", category: "school-subjects", title: "What to do when you understand a chapter but still cannot solve questions" },
  { pillar: "student-problems", category: "education-board-updates", title: "How students should verify an important board notice before acting on it" },
  { pillar: "building-target95", category: "development", title: "What building Target95 taught me about solving problems before adding features" },
  { pillar: "building-target95", category: "development", title: "A mistake I made while building Target95 — and what I changed afterwards" },
  { pillar: "building-target95", category: "ai-technology", title: "Where AI helps me build Target95 — and where I still need to make the decision" },
  { pillar: "building-target95", category: "development", title: "Why I am choosing quality over publishing a new Target95 article every day" },
];

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
  content: `## AI should be your study partner, not your answer machine\n\nArtificial intelligence can explain a difficult concept in simpler words, give you practice questions, help you find mistakes in code and suggest ways to revise. But there is an important difference between **using AI to learn** and **using AI to avoid learning**.\n\nThe best approach is simple: let AI speed up the parts of studying that need guidance while keeping the thinking, practice and final understanding with you.\n\n## 1. Ask for an explanation, not just an answer\n\nIf a chapter feels confusing, ask AI to explain the concept step by step. You can also ask for a school-level explanation, an example, and then a short question to test whether you understood it.\n\n## 2. Use AI to practise\n\nOnce you understand a topic, ask for questions at your level. Try solving them without looking at the solution. Then compare your approach and ask AI to explain only the part where your reasoning went wrong.\n\n## 3. Make revision active\n\nAI can turn your notes into flashcards, quick quizzes, short-answer questions or a chapter checklist. But do not simply read the generated material again and again. Close the notes and try to recall the ideas yourself.\n\n## 4. Be careful with facts\n\nAI systems can sometimes produce incorrect information with confidence. For board notices, dates, deadlines, eligibility rules, fees and other current information, verify important claims against the relevant official source.\n\n## 5. For coding, understand every line\n\nIf AI writes a Java or Python program for you, do not submit it immediately. Read the code and make sure you can explain the variables, loops, inputs and logic yourself.\n\n## A simple rule to remember\n\n**Use AI to reduce confusion, increase practice and get feedback — not to remove the thinking from your study.**\n`,
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
  const snapshot = await getAdminDb().collection("blog_articles").where("status", "==", "published").orderBy("publishedAt", "desc").limit(limit).get();
  const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return articles.length ? articles : [DEMO_ARTICLE].slice(0, limit);
}

export async function listPublishedArticlesByCategory(category, limit = 30) {
  if (!BLOG_CATEGORIES.includes(category)) return [];
  const snapshot = await getAdminDb().collection("blog_articles").where("status", "==", "published").where("category", "==", category).orderBy("publishedAt", "desc").limit(limit).get();
  const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  if (articles.length) return articles;
  return category === DEMO_ARTICLE.category ? [DEMO_ARTICLE].slice(0, limit) : [];
}

export async function getTopic(topicId) {
  if (!topicId) return null;
  const doc = await getAdminDb().collection("blog_topics").doc(topicId).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

export async function upsertTopic(topic) {
  const db = getAdminDb();
  const ref = db.collection("blog_topics").doc(slugify(topic.title));
  await ref.set({ ...topic, slug: slugify(topic.title), status: topic.status || "idea", updatedAt: FieldValue.serverTimestamp(), createdAt: FieldValue.serverTimestamp() }, { merge: true });
  return ref.id;
}

export async function createArticle(article) {
  const db = getAdminDb();
  const ref = db.collection("blog_articles").doc(article.slug || slugify(article.title));
  await ref.set({ ...article, slug: article.slug || slugify(article.title), status: article.status || "draft", updatedAt: FieldValue.serverTimestamp(), createdAt: FieldValue.serverTimestamp() }, { merge: true });
  return ref.id;
}
