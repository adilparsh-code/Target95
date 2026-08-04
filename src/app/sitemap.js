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

export default function sitemap() {
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
  ];
}
