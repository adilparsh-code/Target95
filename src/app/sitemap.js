import { BLOG_CATEGORIES, articlePath, listPublishedArticles, toIsoDate } from "./lib/blog";

const siteUrl = "https://target95.vercel.app";
const lastModified = "2026-08-03";

const studyChapters = [
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
    "",
    "/Java",
    "/study",
    "/roadmap",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/faq",
    "/feedback",
    "/report-bug",
    "/feature-request",
  ];

  return [
    ...routes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
    })),
    ...studyChapters.map((slug) => ({
      url: `${siteUrl}/study/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...blogEntries,
  ];
}
