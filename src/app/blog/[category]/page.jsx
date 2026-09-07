import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Container from "../../components/ui/Container";
import { BLOG_CATEGORIES, BLOG_CATEGORY_LABELS, listPublishedArticlesByCategory } from "../../lib/blog";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const title = BLOG_CATEGORY_LABELS[category] || "Blog";
  return {
    title: `${title} | Target95+ Blog`,
    description: `Target95+ articles and explainers about ${title.toLowerCase()}.`,
  };
}

export default async function BlogCategoryPage({ params }) {
  const { category } = await params;
  const title = BLOG_CATEGORY_LABELS[category];
  if (!title) return null;

  let articles = [];
  try {
    articles = await listPublishedArticlesByCategory(category);
  } catch {
    articles = [];
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <Container className="py-14 sm:py-18">
          <Link href="/blog" className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400">← Back to Blog</Link>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Target95+ Blog</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 dark:text-white">{title}</h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">Fresh, useful content selected for students, teachers and learners.</p>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          {articles.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
              <div className="text-4xl">📝</div>
              <h2 className="mt-4 text-xl font-black text-slate-950 dark:text-white">Content is being prepared</h2>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-400">The automated editorial pipeline is collecting and preparing the first quality articles for this category.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article key={article.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">{title}</p>
                  <h2 className="mt-3 text-xl font-black text-slate-950 dark:text-white">{article.title}</h2>
                  {article.excerpt && <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{article.excerpt}</p>}
                  <Link href={`/blog/${category}/${article.slug}`} className="mt-5 inline-flex font-bold text-blue-600 hover:underline dark:text-blue-400">Read article →</Link>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>
      <Footer />
    </main>
  );
}
