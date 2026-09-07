
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Container from "../../../components/ui/Container";
import {
  BLOG_CATEGORIES,
  BLOG_CATEGORY_LABELS,
  listPublishedArticlesByCategory,
  type BlogCategory,
} from "../../../lib/blog";

export const dynamic = "force-dynamic";

interface PageParams {
  category: string;
  slug: string;
}

interface BlogArticlePageProps {
  params: Promise<PageParams>;
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { category, slug } = await params;

  // Validate the category before using it.
  if (!BLOG_CATEGORIES.includes(category as BlogCategory)) {
    return null;
  }

  const validCategory = category as BlogCategory;
  const categoryLabel = BLOG_CATEGORY_LABELS[validCategory];

  let articles = [];

  try {
    articles = await listPublishedArticlesByCategory(validCategory);
  } catch (error) {
    console.error(
      `Failed to load articles for category: ${validCategory}`,
      error,
    );
    articles = [];
  }

  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return null;
  }

  const publishedDate =
    article.publishedAt &&
    typeof article.publishedAt.toDate === "function"
      ? article.publishedAt.toDate().toLocaleDateString("en-IN")
      : "Recently";

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

      <article>
        <Container className="max-w-4xl py-12 sm:py-16 lg:py-20">
          <Link
            href={`/blog/${validCategory}`}
            className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400"
          >
            ← {categoryLabel}
          </Link>

          <header className="mt-8 border-b border-slate-200 pb-8 dark:border-slate-800">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {categoryLabel}
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                {article.excerpt}
              </p>
            )}

            <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
              Published by Target95+ · {publishedDate}
            </p>
          </header>

          <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">
            {String(article.content || "")
              .split(/\n\n+/)
              .filter((paragraph) => paragraph.trim())
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </Container>
      </article>

      <Footer />
    </main>
  );
}
