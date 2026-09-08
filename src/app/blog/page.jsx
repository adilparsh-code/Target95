import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import { listPublishedArticles } from "../lib/blog";

export const metadata = {
  title: "Blog & Knowledge Hub | Target95+",
  description:
    "Practical explainers, board updates, coding, AI, development and opportunities for students and learners.",
};

export const dynamic = "force-dynamic";

const categories = [
  { slug: "ai-technology", icon: "✦", title: "AI & Technology", description: "AI tools, technology news and practical use cases." },
  { slug: "education-board-updates", icon: "▣", title: "Education & Board Updates", description: "ICSE, ISC, CBSE and important education updates." },
  { slug: "school-subjects", icon: "◈", title: "School Subjects", description: "Concept explainers, revision help and study strategies." },
  { slug: "school-coding", icon: "</>", title: "School Coding", description: "Java, Python and board-level programming guidance." },
  { slug: "development", icon: "⌘", title: "Development", description: "Web development, GitHub, APIs, tools and deployment." },
  { slug: "programming", icon: "λ", title: "Programming", description: "Fundamentals, problem solving, debugging and best practices." },
  { slug: "opportunities", icon: "↗", title: "Opportunities", description: "Scholarships, competitions, olympiads and useful courses." },
  { slug: "trending-explainers", icon: "↯", title: "Trending Explainers", description: "Complex and trending topics explained simply." },
];

function getCategoryLabel(slug) {
  return categories.find((category) => category.slug === slug)?.title || "Target95+";
}

function getArticleHref(article) {
  return `/blog/${article.category}/${article.slug}`;
}

export default async function BlogPage() {
  let articles = [];
  try {
    articles = await listPublishedArticles(12);
  } catch {
    articles = [];
  }

  const featured = articles[0] || null;
  const latest = featured ? articles.slice(1, 7) : articles.slice(0, 6);

  return (
    <main id="main-content" className="min-h-screen bg-[#f7f9fc] text-slate-950 dark:bg-slate-950 dark:text-white">
      <Navbar />

      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-blue-100/70 blur-3xl dark:bg-blue-950/30" />
        <div className="pointer-events-none absolute -left-40 bottom-[-14rem] h-[30rem] w-[30rem] rounded-full bg-indigo-100/60 blur-3xl dark:bg-indigo-950/20" />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_.75fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/40 dark:text-blue-300">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                Target95+ Knowledge Hub
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                Learn what matters.
                <span className="block text-blue-600 dark:text-blue-400">Understand it better.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
                Useful, student-first articles on boards, coding, AI, development, subjects and opportunities — without the unnecessary jargon.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#latest" className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-400">
                  Explore latest articles
                </a>
                <a href="#categories" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-700 dark:hover:text-blue-400">
                  Browse categories
                </a>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-3 shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900">
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Built for learners</p>
                  <div className="mt-6 space-y-4">
                    {["Clear concepts", "Current updates", "Practical coding", "Real opportunities"].map((item, index) => (
                      <div key={item} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-100 text-sm font-black text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">0{index + 1}</span>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="categories" className="scroll-mt-20 border-b border-slate-200/80 bg-white py-12 sm:py-16 dark:border-slate-800 dark:bg-slate-950">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Explore</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Find your learning lane</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">Jump directly into the kind of content you need today.</p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/${category.slug}`}
                className="group rounded-2xl border border-slate-200 bg-[#f9fafc] p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-950/5 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-blue-800 dark:hover:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-sm font-black text-blue-600 shadow-sm ring-1 ring-slate-200 transition group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600 dark:bg-slate-800 dark:ring-slate-700">{category.icon}</span>
                  <span className="text-lg text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500">↗</span>
                </div>
                <h3 className="mt-5 text-base font-extrabold">{category.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{category.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="latest" className="scroll-mt-20 py-14 sm:py-20">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">The reading list</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Latest from Target95+</h2>
            </div>
            {articles.length > 0 && <span className="hidden text-sm font-semibold text-slate-500 sm:block dark:text-slate-400">Freshly published</span>}
          </div>

          {featured ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
              <Link href={getArticleHref(featured)} className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-xl shadow-slate-950/10 sm:p-9 dark:border-slate-800">
                <div className="pointer-events-none absolute right-[-5rem] top-[-6rem] h-64 w-64 rounded-full bg-blue-600/30 blur-3xl" />
                <div className="relative flex h-full min-h-[300px] flex-col justify-between">
                  <div>
                    <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold">Featured · {getCategoryLabel(featured.category)}</span>
                    <h3 className="mt-7 max-w-2xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">{featured.title}</h3>
                    {featured.excerpt && <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">{featured.excerpt}</p>}
                  </div>
                  <span className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-extrabold text-blue-300 transition group-hover:gap-3">Read featured article <span>→</span></span>
                </div>
              </Link>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {latest.slice(0, 2).map((article) => (
                  <Link key={article.id} href={getArticleHref(article)} className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">{getCategoryLabel(article.category)}</p>
                    <h3 className="mt-3 text-xl font-black leading-snug tracking-tight">{article.title}</h3>
                    {article.excerpt && <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{article.excerpt}</p>}
                    <span className="mt-5 inline-flex text-sm font-extrabold text-slate-700 group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-blue-400">Read →</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-xl dark:bg-blue-950/40">✦</div>
              <h3 className="mt-5 text-xl font-black">The first articles are on their way</h3>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500 dark:text-slate-400">The publishing pipeline is preparing useful, reviewed content for the Knowledge Hub.</p>
            </div>
          )}

          {latest.length > 2 && (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {latest.slice(2, 6).map((article) => (
                <Link key={article.id} href={getArticleHref(article)} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">{getCategoryLabel(article.category)}</p>
                  <h3 className="mt-3 line-clamp-3 text-base font-extrabold leading-6">{article.title}</h3>
                  <span className="mt-5 inline-flex text-sm font-bold text-blue-600 dark:text-blue-400">Read →</span>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="pb-14 sm:pb-20">
        <Container>
          <div className="overflow-hidden rounded-[2rem] border border-blue-200/70 bg-blue-50 p-7 sm:p-9 dark:border-blue-900/50 dark:bg-blue-950/25">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">What comes next</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">A smarter publishing workflow</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Target95 is being prepared for a controlled AI-assisted workflow that researches topics, drafts useful articles, checks current claims and publishes approved content.</p>
              </div>
              <div className="grid shrink-0 grid-cols-3 gap-2 rounded-2xl border border-blue-200/70 bg-white/80 p-2 text-center dark:border-blue-900/50 dark:bg-slate-900/70">
                <div className="rounded-xl px-3 py-2"><div className="text-lg font-black">Research</div><div className="text-[11px] font-semibold text-slate-500">discover</div></div>
                <div className="rounded-xl px-3 py-2"><div className="text-lg font-black">Review</div><div className="text-[11px] font-semibold text-slate-500">verify</div></div>
                <div className="rounded-xl px-3 py-2"><div className="text-lg font-black">Publish</div><div className="text-[11px] font-semibold text-slate-500">share</div></div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
