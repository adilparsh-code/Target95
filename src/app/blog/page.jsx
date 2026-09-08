import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import { listPublishedArticles } from "../lib/blog";
import BorderBeam from "./components/BorderBeam";
import ShimmerButton from "./components/ShimmerButton";

export const metadata = {
  title: "Blog & Knowledge Hub | Target95+",
  description: "Practical explainers, board updates, coding, AI, development and opportunities for students and learners.",
};

export const dynamic = "force-dynamic";

const categories = [
  ["ai-technology", "✦", "AI & Technology", "AI tools, technology news and practical use cases."],
  ["education-board-updates", "▣", "Education & Board Updates", "ICSE, ISC, CBSE and important education updates."],
  ["school-subjects", "◈", "School Subjects", "Concept explainers, revision help and study strategies."],
  ["school-coding", "</>", "School Coding", "Java, Python and board-level programming guidance."],
  ["development", "⌘", "Development", "Web development, GitHub, APIs, tools and deployment."],
  ["programming", "λ", "Programming", "Fundamentals, problem solving, debugging and best practices."],
  ["opportunities", "↗", "Opportunities", "Scholarships, competitions, olympiads and useful courses."],
  ["trending-explainers", "↯", "Trending Explainers", "Complex and trending topics explained simply."],
];

function categoryLabel(slug) {
  return categories.find(([value]) => value === slug)?.[2] || "Target95+";
}

function articleHref(article) {
  return `/blog/${article.category}/${article.slug}`;
}

export default async function BlogPage() {
  let articles = [];
  try { articles = await listPublishedArticles(12); } catch { articles = []; }
  const featured = articles[0] || null;
  const latest = featured ? articles.slice(1, 7) : articles.slice(0, 6);

  return (
    <main id="main-content" className="min-h-screen bg-[#f7f9fc] text-slate-950 dark:bg-slate-950 dark:text-white">
      <Navbar />
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="pointer-events-none absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-blue-200/50 blur-3xl dark:bg-blue-950/30" />
        <div className="pointer-events-none absolute -left-40 bottom-[-16rem] h-[30rem] w-[30rem] rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-950/20" />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300"><span className="h-2 w-2 rounded-full bg-blue-500" /> Target95+ Knowledge Hub</div>
              <h1 className="max-w-4xl text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-7xl">Learn what matters.<span className="block bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">Understand it better.</span></h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">Student-first explainers, board updates, coding, AI, development and opportunities — clear enough to learn and useful enough to act on.</p>
              <div className="mt-8 flex flex-wrap gap-3"><ShimmerButton href="#latest">Explore latest articles →</ShimmerButton><Link href="#categories" className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-700">Browse categories</Link></div>
              <div className="mt-8 flex flex-wrap gap-2 text-xs font-bold text-slate-500 dark:text-slate-400"><span className="rounded-full bg-slate-100 px-3 py-1.5 dark:bg-slate-900">ICSE</span><span className="rounded-full bg-slate-100 px-3 py-1.5 dark:bg-slate-900">ISC</span><span className="rounded-full bg-slate-100 px-3 py-1.5 dark:bg-slate-900">CBSE</span><span className="rounded-full bg-slate-100 px-3 py-1.5 dark:bg-slate-900">Coding</span><span className="rounded-full bg-slate-100 px-3 py-1.5 dark:bg-slate-900">AI</span></div>
            </div>
            <div className="relative mx-auto w-full max-w-md rounded-[2rem] border border-slate-200 bg-slate-50 p-2 shadow-2xl shadow-blue-950/10 dark:border-slate-800 dark:bg-slate-900">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"><BorderBeam /><div className="relative"><p className="text-xs font-black uppercase tracking-[.2em] text-slate-400">Your learning feed</p><div className="mt-6 space-y-3">{["Clear concepts", "Current updates", "Practical coding", "Real opportunities"].map((item, i) => <div key={item} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900"><span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-100 text-xs font-black text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">0{i + 1}</span><span className="text-sm font-bold">{item}</span></div>)}</div></div></div>
            </div>
          </div>
        </Container>
      </section>

      <section id="categories" className="scroll-mt-20 border-b border-slate-200/80 bg-white py-14 dark:border-slate-800 dark:bg-slate-950 sm:py-20"><Container><div className="flex items-end justify-between gap-6"><div><p className="text-xs font-black uppercase tracking-[.2em] text-blue-600 dark:text-blue-400">Explore</p><h2 className="mt-2 text-3xl font-black tracking-tight">Find your learning lane</h2></div><p className="hidden max-w-xl text-sm leading-6 text-slate-500 sm:block dark:text-slate-400">Eight focused lanes so students can get to the information they actually need.</p></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{categories.map(([slug, icon, title, description]) => <Link key={slug} href={`/blog/${slug}`} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-[#f9fafc] p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-blue-800"><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-sm font-black text-blue-600 shadow-sm ring-1 ring-slate-200 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 dark:ring-slate-700">{icon}</span><span className="text-lg text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500">↗</span></div><h3 className="mt-5 font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p></Link>)}</div></Container></section>

      <section id="latest" className="scroll-mt-20 py-14 sm:py-20"><Container><div className="flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[.2em] text-blue-600 dark:text-blue-400">The reading list</p><h2 className="mt-2 text-3xl font-black tracking-tight">Latest from Target95+</h2></div>{articles.length > 0 && <span className="hidden text-sm font-semibold text-slate-500 sm:block dark:text-slate-400">Freshly published</span>}</div>{featured ? <div className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_.7fr]"><Link href={articleHref(featured)} className="group relative overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-2xl sm:p-9"><BorderBeam /><div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" /><div className="relative flex min-h-[310px] flex-col justify-between"><div><span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold">Featured · {categoryLabel(featured.category)}</span><h3 className="mt-7 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">{featured.title}</h3>{featured.excerpt && <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">{featured.excerpt}</p>}</div><span className="text-sm font-extrabold text-blue-300 transition group-hover:translate-x-1">Read featured article →</span></div></Link><div className="grid gap-5">{latest.slice(0,2).map(article => <Link key={article.id} href={articleHref(article)} className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"><p className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">{categoryLabel(article.category)}</p><h3 className="mt-3 text-xl font-black leading-snug">{article.title}</h3>{article.excerpt && <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{article.excerpt}</p>}<span className="mt-5 inline-flex text-sm font-extrabold text-blue-600 dark:text-blue-400">Read →</span></Link>)}</div></div> : <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-xl dark:bg-blue-950/40">✦</div><h3 className="mt-5 text-xl font-black">The first articles are on their way</h3><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500 dark:text-slate-400">The publishing pipeline is preparing useful, reviewed content for the Knowledge Hub.</p></div>}{latest.length > 2 && <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{latest.slice(2,6).map(article => <Link key={article.id} href={articleHref(article)} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"><p className="text-xs font-black uppercase tracking-wider text-slate-400">{categoryLabel(article.category)}</p><h3 className="mt-3 line-clamp-3 font-extrabold leading-6">{article.title}</h3><span className="mt-5 inline-flex text-sm font-bold text-blue-600 dark:text-blue-400">Read →</span></Link>)}</div>}</Container></section>

      <section className="pb-14 sm:pb-20"><Container><div className="relative overflow-hidden rounded-[2rem] border border-blue-200/70 bg-blue-50 p-7 dark:border-blue-900/50 dark:bg-blue-950/25 sm:p-9"><BorderBeam /><div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-xs font-black uppercase tracking-[.2em] text-blue-700 dark:text-blue-300">What comes next</p><h2 className="mt-2 text-2xl font-black">A smarter publishing workflow</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Target95 is being prepared for a controlled AI-assisted workflow that researches topics, drafts useful articles, checks current claims and publishes approved content.</p></div><div className="grid shrink-0 grid-cols-3 gap-2 rounded-2xl border border-blue-200/70 bg-white/80 p-2 text-center dark:border-blue-900/50 dark:bg-slate-900/70"><div className="rounded-xl px-3 py-2"><b>Research</b><div className="text-[11px] text-slate-500">discover</div></div><div className="rounded-xl px-3 py-2"><b>Review</b><div className="text-[11px] text-slate-500">verify</div></div><div className="rounded-xl px-3 py-2"><b>Publish</b><div className="text-[11px] text-slate-500">share</div></div></div></div></div></Container></section>
      <Footer />
    </main>
  );
}
