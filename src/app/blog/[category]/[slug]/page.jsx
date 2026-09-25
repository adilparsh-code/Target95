import { cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Container from "../../../components/ui/Container";
import {
  BLOG_CATEGORIES,
  BLOG_CATEGORY_LABELS,
  BLOG_SITE_URL,
  DEMO_ARTICLE,
  articlePath,
  estimateReadingMinutes,
  formatArticleDate,
  getAdjacentArticles,
  getLearningLinks,
  getRelatedArticles,
  listPublishedArticles,
  toIsoDate,
} from "../../../lib/blog";

export const dynamic = "force-dynamic";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400";
const linkClass = `font-bold text-blue-600 hover:underline dark:text-blue-400 ${focusRing}`;

// One read per request, shared by generateMetadata and the page.
const loadArticles = cache(async () => {
  try {
    return await listPublishedArticles(100);
  } catch {
    return [];
  }
});

async function findArticle(category, slug) {
  if (!BLOG_CATEGORIES.includes(category)) return { article: null, articles: [] };
  let articles = await loadArticles();

  // Keep the first public article available even if Firestore is temporarily
  // unavailable or the production Firebase configuration is incomplete.
  if (!articles.length && category === DEMO_ARTICLE.category && slug === DEMO_ARTICLE.slug) {
    articles = [DEMO_ARTICLE];
  }

  const article = articles.find((item) => item.category === category && item.slug === slug) || null;
  return { article, articles };
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const { article } = await findArticle(category, slug);
  if (!article) {
    return { title: { absolute: "Article not found | Target95+ Blog" }, robots: { index: false, follow: false } };
  }

  const path = articlePath(article);
  // absolute: the root layout template ("%s | Target95+") would otherwise add the suffix twice.
  const title = { absolute: article.seoTitle || `${article.title} | Target95+ Blog` };
  const description = article.metaDescription || article.excerpt || undefined;
  const keywords = Array.isArray(article.keywords) && article.keywords.length ? article.keywords : undefined;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      siteName: "Target95+",
      locale: "en_US",
      title,
      description,
      publishedTime: toIsoDate(article.publishedAt) || undefined,
      section: BLOG_CATEGORY_LABELS[category],
      tags: keywords,
    },
    twitter: { card: "summary", title, description },
  };
}

// Tailwind's preflight strips default element styles and the typography plugin
// is not installed, so every element is styled explicitly here.
function renderInline(text, keyPrefix) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4
      ? <strong key={`${keyPrefix}-${i}`} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>
      : part
  );
}

const bodyText = "text-base leading-8 text-slate-700 sm:text-lg sm:leading-9 dark:text-slate-300";

function renderContent(content) {
  const normalised = String(content || "")
    .replace(/\r\n/g, "\n")
    // A heading directly followed by text is still its own block.
    .replace(/^(#{2,3} [^\n]+)\n(?!\n)/gm, "$1\n\n");

  return normalised.split(/\n\n+/).map((block, index) => {
    const text = block.trim();
    if (!text) return null;
    if (text.startsWith("## ")) {
      return <h2 key={index} className="mt-12 mb-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl dark:text-white">{renderInline(text.slice(3), index)}</h2>;
    }
    if (text.startsWith("### ")) {
      return <h3 key={index} className="mt-8 mb-3 text-xl font-extrabold text-slate-950 sm:text-2xl dark:text-white">{renderInline(text.slice(4), index)}</h3>;
    }

    const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length && lines.every((line) => /^[-*]\s+/.test(line))) {
      return (
        <ul key={index} className={`mt-5 list-disc space-y-2 pl-6 ${bodyText}`}>
          {lines.map((line, i) => <li key={i}>{renderInline(line.replace(/^[-*]\s+/, ""), `${index}-${i}`)}</li>)}
        </ul>
      );
    }
    if (lines.length && lines.every((line) => /^\d+[.)]\s+/.test(line))) {
      return (
        <ol key={index} className={`mt-5 list-decimal space-y-2 pl-6 ${bodyText}`}>
          {lines.map((line, i) => <li key={i}>{renderInline(line.replace(/^\d+[.)]\s+/, ""), `${index}-${i}`)}</li>)}
        </ol>
      );
    }

    return <p key={index} className={`mt-5 ${bodyText}`}>{renderInline(text, index)}</p>;
  });
}

// "<" is escaped so article text can never close the script tag.
function jsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function ArticleLinkCard({ article, eyebrow, rel, className = "" }) {
  return (
    <Link
      href={articlePath(article)}
      rel={rel}
      className={`group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800 ${focusRing} ${className}`}
    >
      <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">{eyebrow}</span>
      <span className="mt-2 block font-extrabold leading-6 text-slate-950 dark:text-white">{article.title}</span>
    </Link>
  );
}

export default async function BlogArticlePage({ params }) {
  const { category, slug } = await params;
  if (!BLOG_CATEGORIES.includes(category)) notFound();

  const { article, articles } = await findArticle(category, slug);
  if (!article) notFound();

  const categoryLabel = BLOG_CATEGORY_LABELS[category];
  const url = `${BLOG_SITE_URL}${articlePath(article)}`;
  const publishedIso = toIsoDate(article.publishedAt);
  const modifiedIso = toIsoDate(article.updatedAt);
  const minutes = estimateReadingMinutes(article.content);
  const { newer, older } = getAdjacentArticles(articles, article);
  const related = getRelatedArticles(articles, article, {
    limit: 3,
    exclude: [newer?.slug, older?.slug].filter(Boolean),
  });
  const learningLinks = getLearningLinks(category);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription || article.excerpt || undefined,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: publishedIso || undefined,
    dateModified: modifiedIso || publishedIso || undefined,
    articleSection: categoryLabel,
    keywords: Array.isArray(article.keywords) && article.keywords.length ? article.keywords.join(", ") : undefined,
    inLanguage: "en",
    author: { "@type": "Organization", name: "Target95+", url: BLOG_SITE_URL },
    publisher: { "@type": "Organization", name: "Target95+", url: BLOG_SITE_URL },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BLOG_SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BLOG_SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: categoryLabel, item: `${BLOG_SITE_URL}/blog/${category}` },
      { "@type": "ListItem", position: 4, name: article.title, item: url },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbLd) }} />
      <Navbar />
      <Container className="max-w-4xl py-10 sm:py-14 lg:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500 dark:text-slate-400">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li><Link href="/" className={`hover:underline ${focusRing}`}>Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/blog" className={`hover:underline ${focusRing}`}>Blog</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={`/blog/${category}`} className={`hover:underline ${focusRing}`}>{categoryLabel}</Link></li>
            <li aria-hidden="true" className="hidden sm:block">/</li>
            <li aria-current="page" className="hidden max-w-[18rem] truncate font-semibold text-slate-700 sm:block dark:text-slate-200">{article.title}</li>
          </ol>
        </nav>

        <article className="mt-8">
          <header className="border-b border-slate-200 pb-8 dark:border-slate-800">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">{categoryLabel}</p>
            <h1 className="mt-3 break-words text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">{article.title}</h1>
            {article.excerpt && <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{article.excerpt}</p>}
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
              <span>Published by Target95+</span>
              <span aria-hidden="true">·</span>
              {publishedIso ? <time dateTime={publishedIso}>{formatArticleDate(article.publishedAt)}</time> : <span>Recently</span>}
              <span aria-hidden="true">·</span>
              <span>{minutes} min read</span>
            </p>
          </header>
          <div className="mt-10 max-w-prose break-words">
            {renderContent(article.content)}
          </div>
        </article>

        {(newer || older) && (
          <nav aria-label={`More ${categoryLabel} articles`} className="mt-14 grid gap-4 sm:grid-cols-2">
            {older ? <ArticleLinkCard article={older} eyebrow="← Older article" rel="prev" /> : <span className="hidden sm:block" />}
            {newer && <ArticleLinkCard article={newer} eyebrow="Newer article →" rel="next" className="sm:col-start-2" />}
          </nav>
        )}

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-14">
            <h2 id="related-heading" className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">Related articles</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id || item.slug}>
                  <Link href={articlePath(item)} className={`group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800 ${focusRing}`}>
                    <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">{BLOG_CATEGORY_LABELS[item.category] || "Target95+"}</span>
                    <span className="mt-3 font-extrabold leading-6 text-slate-950 dark:text-white">{item.title}</span>
                    {item.excerpt && <span className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.excerpt}</span>}
                    <span aria-hidden="true" className="mt-4 text-sm font-bold text-blue-600 dark:text-blue-400">Read →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="learn-heading" className="mt-14 rounded-3xl border border-blue-200/70 bg-blue-50 p-6 sm:p-8 dark:border-blue-900/50 dark:bg-blue-950/25">
          <p className="text-xs font-black uppercase tracking-[.2em] text-blue-700 dark:text-blue-300">Keep learning</p>
          <h2 id="learn-heading" className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">Put it into practice on Target95+</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {learningLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`block h-full rounded-2xl border border-blue-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700 ${focusRing}`}>
                  <span className="font-extrabold text-slate-950 dark:text-white">{link.label}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600 dark:text-slate-400">{link.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href={`/blog/${category}`} className={linkClass}>← All {categoryLabel} articles</Link>
          <Link href="/blog" className={linkClass}>Blog home</Link>
        </p>
      </Container>
      <Footer />
    </main>
  );
}
