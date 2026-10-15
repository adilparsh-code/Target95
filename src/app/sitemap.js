import { BLOG_CATEGORIES, articlePath, listPublishedArticles, toIsoDate } from "./lib/blog";
import { getStudyChapters } from "@/lib/studyCenter";
import { javaChapters as canonicalChapters } from "@/app/data/javaCurriculum";
import { getBoards, getPublishedChapters, getSubjects } from "@/lib/boardprepCurriculum.mjs";

import { officeApps } from "@/data/office";

const siteUrl = "https://target95.web.app";
const lastModified = "2026-10-15";

// Every routable /Java/[chapter] page (same slugs the route pre-renders),
// so chapter pages are discoverable instead of only 9 hardcoded ones.
function collectChapterSlugs() {
  const slugs = new Set();
  try {
    (getStudyChapters() || []).forEach((chapter) => {
      if (chapter && chapter.slug) slugs.add(String(chapter.slug));
    });
  } catch {
    // Registry unavailable at build time; canonical list below still applies.
  }
  (canonicalChapters || []).forEach((chapter) => {
    if (chapter && chapter.slug) slugs.add(String(chapter.slug));
  });
  return slugs;
}

// Kept as a fallback for environments where the registries fail to load.
const legacyStudyChapters = [
  "introduction",
  "variables-data-types",
  "operators",
  "if-else",
  "loops",
  "methods",
  "arrays",
  "strings",
  "constructor",
];

// Include only BoardPrep subjects with published chapters. Registered-but-empty
// subjects remain reachable in the product but are not advertised as ready for
// search indexing.
function collectBoardPrepRoutes() {
  const routes = new Set();
  for (const board of getBoards()) {
    routes.add(`/learn/${board.slug}`);
    for (const classInfo of board.classes || []) {
      routes.add(`/learn/${board.slug}/${classInfo.slug}`);
      for (const subject of getSubjects(board.slug, classInfo.slug)) {
        const chapters = getPublishedChapters(board.slug, classInfo.slug, subject.slug);
        if (!chapters.length) continue;
        routes.add(`/learn/${board.slug}/${classInfo.slug}/${subject.slug}`);
        chapters.forEach((chapter) => routes.add(`/learn/${board.slug}/${classInfo.slug}/${subject.slug}/${chapter.slug}`));
      }
    }
  }
  return [...routes];
}

function uniqueEntries(entries) {
  const urls = new Set();
  return entries.filter((entry) => {
    if (urls.has(entry.url)) return false;
    urls.add(entry.url);
    return true;
  });
}

// Blog entries come from Firestore (never throws: falls back to the demo article).
export const revalidate = 3600;

function newestDate(articles) {
  return articles
    .map((article) => toIsoDate(article.updatedAt || article.publishedAt))
    .filter(Boolean)
    .sort()
    .pop();
}

export default async function sitemap() {
  const articles = await listPublishedArticles(200);
  const blogEntries = [
    {
      url: `${siteUrl}/blog`,
      lastModified: newestDate(articles) || lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Only categories that have articles, so empty pages are not advertised.
    ...BLOG_CATEGORIES.map((category) => ({ category, inCategory: articles.filter((item) => item.category === category) }))
      .filter(({ inCategory }) => inCategory.length > 0)
      .map(({ category, inCategory }) => ({
        url: `${siteUrl}/blog/${category}`,
        lastModified: newestDate(inCategory) || lastModified,
        changeFrequency: "weekly",
        priority: 0.5,
      })),
    ...articles.map((article) => ({
      url: `${siteUrl}${articlePath(article)}`,
      lastModified: toIsoDate(article.updatedAt || article.publishedAt) || lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];

  const routes = [
    "/icse",
    "/icse/class-ix",
    "/icse/class-x",
    "/isc",
    "/isc/class-xi",
    "/isc/class-xii",
    "/cbse",
    "/cbse/class/9",
    "/cbse/class/10",
    "/cbse/class/11",
    "/cbse/class/12",
    "/office",
    ...officeApps.flatMap((app) => [`/office/${app.id}`, ...app.chapters.map((chapter) => `/office/${app.id}/${chapter.id}`)]),
    "",
    "/Java",
    "/study",
    "/roadmap",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/copyright",
    "/faq",
    "/feedback",
    "/report-bug",
    "/feature-request",
  ];

  return uniqueEntries([
    ...routes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
    })),
    ...[...collectChapterSlugs()].map((slug) => ({
      url: `${siteUrl}/Java/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...legacyStudyChapters.map((slug) => ({
      url: `${siteUrl}/study/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...collectBoardPrepRoutes().map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified,
      changeFrequency: "monthly",
      priority: route.split("/").length > 4 ? 0.6 : 0.7,
    })),
    ...blogEntries,
  ]);
}
