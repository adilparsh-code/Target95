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

export const DEMO_ARTICLE = {
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

## 2. Use AI to practise

Once you understand a topic, ask for questions at your level. Try solving them without looking at the solution. Then compare your approach and ask AI to explain only the part where your reasoning went wrong.

## 3. Make revision active

AI can turn your notes into flashcards, quick quizzes, short-answer questions or a chapter checklist. But do not simply read the generated material again and again. Close the notes and try to recall the ideas yourself.

## 4. Be careful with facts

AI systems can sometimes produce incorrect information with confidence. For board notices, dates, deadlines, eligibility rules, fees and other current information, verify important claims against the relevant official source.

## 5. For coding, understand every line

If AI writes a Java or Python program for you, do not submit it immediately. Read the code and make sure you can explain the variables, loops, inputs and logic yourself.

## A simple rule to remember

**Use AI to reduce confusion, increase practice and get feedback — not to remove the thinking from your study.**
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

const FIRESTORE_TIMEOUT_MS = 5000;

function withTimeout(promise, ms = FIRESTORE_TIMEOUT_MS) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Firestore request timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function readPublished(buildQuery, fallback, limit) {
  try {
    const snapshot = await withTimeout(buildQuery(getAdminDb().collection("blog_articles")).limit(limit).get());
    const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    if (articles.length) return articles;
  } catch (error) {
    console.error("[blog] Firestore read failed, using fallback:", error?.message || error);
  }
  return fallback.slice(0, limit);
}

export async function listPublishedArticles(limit = 30) {
  return readPublished(
    (col) => col.where("status", "==", "published").orderBy("publishedAt", "desc"),
    [DEMO_ARTICLE],
    limit
  );
}

export async function listPublishedArticlesByCategory(category, limit = 30) {
  if (!BLOG_CATEGORIES.includes(category)) return [];
  return readPublished(
    (col) => col.where("status", "==", "published").where("category", "==", category).orderBy("publishedAt", "desc"),
    category === DEMO_ARTICLE.category ? [DEMO_ARTICLE] : [],
    limit
  );
}

// Mirrors metadataBase in src/app/layout.js and siteUrl in src/app/sitemap.js.
export const BLOG_SITE_URL = "https://target95.vercel.app";

export function articlePath(article) {
  return `/blog/${article.category}/${article.slug}`;
}

// Firestore Timestamp, JS Date, or ISO string -> Date (or null).
function toDateOrNull(value) {
  const date = value?.toDate ? value.toDate() : value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date : null;
}

// -> "8 Sep 2026" (or null).
export function formatArticleDate(value) {
  const date = toDateOrNull(value);
  if (!date) return null;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

// -> "2026-09-08T00:00:00.000Z" (or null). For <time dateTime> and structured data.
export function toIsoDate(value) {
  return toDateOrNull(value)?.toISOString() || null;
}

// ~200 words per minute; never less than 1.
export function estimateReadingMinutes(content) {
  const words = String(content || "").replace(/[#*_`>~]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// `articles` is newest-first (as returned by the list functions).
// newer/older are the neighbours inside the same category.
export function getAdjacentArticles(articles, current) {
  const sameCategory = articles.filter((item) => item.category === current.category);
  const index = sameCategory.findIndex((item) => item.slug === current.slug);
  if (index === -1) return { newer: null, older: null };
  return { newer: sameCategory[index - 1] || null, older: sameCategory[index + 1] || null };
}

// Same-category articles first, then the rest. `exclude` is a list of slugs to skip.
export function getRelatedArticles(articles, current, { limit = 3, exclude = [] } = {}) {
  const others = articles.filter((item) => item.slug !== current.slug && !exclude.includes(item.slug));
  const sameCategory = others.filter((item) => item.category === current.category);
  const rest = others.filter((item) => item.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

// Only routes that exist in src/app. Routes gated by src/proxy.js are labelled "(sign-in required)".
// Add a category key below to give it its own set.
const LEARNING_LINK = {
  study: { href: "/study", label: "Study Center", description: "Structured, chapter-based study material." },
  practice: { href: "/practice", label: "Practice", description: "Practise what you have learned." },
  javaPractice: { href: "/practice/java", label: "Java Practice Lab", description: "Progressive, syllabus-aligned Java coding practice." },
  python: { href: "/python", label: "Python Programming", description: "Learn Python on Target95+." },
  library: { href: "/programming-library", label: "Programming Library", description: "Explore the programming library." },
  questionBank: { href: "/question-bank", label: "Question Bank", description: "Browse the question bank." },
  mockTest: { href: "/mock-test", label: "Mock Tests", description: "Take a mock test (sign-in required)." },
  aiTutor: { href: "/ai-tutor", label: "AI Tutor", description: "Get help from the AI Tutor (sign-in required)." },
  roadmap: { href: "/roadmap", label: "Study Roadmap", description: "ICSE Class 9/10 and ISC Class 11/12 Computer Science." },
  icseX: { href: "/icse/class-x", label: "ICSE Class X", description: "Computer Applications for ICSE Class X." },
  iscXii: { href: "/isc/class-xii", label: "ISC Class XII", description: "Computer Science for ISC Class XII." },
  cbse: { href: "/cbse", label: "CBSE", description: "CBSE curriculum 2026–27." },
};

const CATEGORY_LEARNING_LINKS = {
  "ai-technology": ["aiTutor", "practice", "study"],
  "education-board-updates": ["icseX", "iscXii", "cbse"],
  "school-subjects": ["study", "practice", "questionBank"],
  "school-coding": ["study", "javaPractice", "python"],
  development: ["library", "roadmap", "study"],
  programming: ["library", "practice", "study"],
  opportunities: ["roadmap", "mockTest", "practice"],
  "trending-explainers": ["study", "aiTutor", "roadmap"],
};

export function getLearningLinks(category) {
  return (CATEGORY_LEARNING_LINKS[category] || ["study", "practice", "mockTest"]).map((key) => LEARNING_LINK[key]);
}

export async function getTopic(topicId) {
  if (!topicId) return null;
  const doc = await getAdminDb().collection("blog_topics").doc(topicId).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

export async function upsertTopic(topic) {
  const db = getAdminDb();
  const ref = db.collection("blog_topics").doc(slugify(topic.title));
  const existing = await ref.get();
  const payload = {
    ...topic,
    slug: slugify(topic.title),
    status: topic.status || "idea",
    updatedAt: FieldValue.serverTimestamp(),
  };
  if (!existing.exists) payload.createdAt = FieldValue.serverTimestamp();
  await ref.set(payload, { merge: true });
  return ref.id;
}

export async function createArticle(article) {
  const db = getAdminDb();
  const ref = db.collection("blog_articles").doc(article.slug || slugify(article.title));
  const existing = await ref.get();
  const payload = {
    ...article,
    slug: article.slug || slugify(article.title),
    status: article.status || "draft",
    updatedAt: FieldValue.serverTimestamp(),
  };
  if (!existing.exists) payload.createdAt = FieldValue.serverTimestamp();
  await ref.set(payload, { merge: true });
  return ref.id;
}
