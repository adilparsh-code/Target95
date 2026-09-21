import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Container from "../../components/ui/Container";
import {
  BLOG_CATEGORIES,
  BLOG_CATEGORY_LABELS,
  articlePath,
  estimateReadingMinutes,
  formatArticleDate,
  listPublishedArticlesByCategory,
  toIsoDate,
} from "../../lib/blog";

export const dynamic = "force-dynamic";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400";

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const label = BLOG_CATEGORY_LABELS[category];
  if (!label) return { title: { absolute: "Blog | Target95+" }, robots: { index: false, follow: false } };

  // absolute: the root layout template ("%s | Target95+") would otherwise add the suffix twice.
  const title = { absolute: `${label} | Target95+ Blog` };
  const description = `Target95+ articles and explainers about ${label.toLowerCase()}.`;
  const path = `/blog/${category}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, siteName: "Target95+", locale: "en_US", title, description },
    twitter: { card: "summary", title, description },
  };
}

export default async function BlogCategoryPage({ params }) {
  const { category } = await params;
  const title = BLOG_CATEGORY_LABELS[category];
  if (!title) notFound();

  let articles = [];
  try {
    articles = await listPublishedArticlesByCategory(category);
  } catch {
    articles = [];
  }

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <Container className="py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500 dark:text-slate-400">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li><Link href="/" className={`hover:underline ${focusRing}`}>Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className={`hover:underline ${focusRing}`}>Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-slate-700 dark:text-slate-200">{title}</li>
            </ol>
          </nav>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Target95+ Blog</p>
          <h1 className="mt-2 break-words text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">{title}</h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">Fresh, useful content selected for students, teachers and learners.</p>

          <nav aria-label="Blog categories" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {BLOG_CATEGORIES.map((slug) => {
                const active = slug === category;
                return (
                  <li key={slug}>
                    <Link
                      href={`/blog/${slug}`}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${focusRing} ${
                        active
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-700"
                      }`}
                    >
                      {BLOG_CATEGORY_LABELS[slug]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Container>
      </section>

      <section className="py-10 sm:py-16">
        <Container>
          {articles.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-10 dark:border-slate-700 dark:bg-slate-900">
              <div aria-hidden="true" className="text-4xl">📝</div>
              <h2 className="mt-4 text-xl font-black text-slate-950 dark:text-white">No articles here yet</h2>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-400">We publish only reviewed articles, so this category may be empty for now. Browse the other categories, or keep learning on Target95+ in the meantime.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/blog#categories" className={`inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700 ${focusRing}`}>Browse all categories</Link>
                <Link href="/study" className={`inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 ${focusRing}`}>Open the Study Center</Link>
              </div>
            </div>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => {
                const publishedIso = toIsoDate(article.publishedAt);
                return (
                  <li key={article.id || article.slug}>
                    <article className="group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800">
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">{title}</p>
                      <h2 className="mt-3 text-xl font-black leading-snug text-slate-950 dark:text-white">
                        <Link href={articlePath(article)} className={`after:absolute after:inset-0 after:rounded-3xl ${focusRing}`}>{article.title}</Link>
                      </h2>
                      {article.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{article.excerpt}</p>}
                      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                        {publishedIso && <><time dateTime={publishedIso}>{formatArticleDate(article.publishedAt)}</time><span aria-hidden="true"> · </span></>}
                        {estimateReadingMinutes(article.content)} min read
                      </p>
                      <span aria-hidden="true" className="mt-auto pt-5 font-bold text-blue-600 dark:text-blue-400">Read article →</span>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </section>
      <Footer />
    </main>
  );
}
