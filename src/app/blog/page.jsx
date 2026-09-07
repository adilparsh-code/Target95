import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";

export const metadata = {
  title: "Blog & Knowledge Hub | Target95+",
  description: "AI, education, school subjects, coding, development, opportunities and useful explainers for students and learners.",
};

const categories = [
  { slug: "ai-technology", icon: "🤖", title: "AI & Technology", description: "AI tools, technology news, practical use cases and important updates." },
  { slug: "education-board-updates", icon: "📰", title: "Education & Board Updates", description: "Useful ICSE, ISC, CBSE and education-related updates for students." },
  { slug: "school-subjects", icon: "📚", title: "School Subjects", description: "Concept explainers, study strategies and revision help across subjects." },
  { slug: "school-coding", icon: "💻", title: "School Coding", description: "Java, Python, programming concepts and board-level coding guidance." },
  { slug: "development", icon: "👨‍💻", title: "Development", description: "Web development, GitHub, APIs, frameworks, tools and deployment." },
  { slug: "programming", icon: "🧠", title: "Programming", description: "Programming fundamentals, problem solving, debugging and best practices." },
  { slug: "opportunities", icon: "🎯", title: "Scholarships / Competitions / Opportunities", description: "Scholarships, coding contests, olympiads, courses and useful opportunities." },
  { slug: "trending-explainers", icon: "🔥", title: "Trending Explainers", description: "Complex or trending topics explained clearly without unnecessary jargon." },
];

export default function BlogPage() {
  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-blue-50/60 dark:from-slate-950 dark:via-slate-950 dark:to-blue-950/20">
      <Navbar />

      <section className="relative overflow-hidden border-b border-slate-200/70 dark:border-slate-800/70">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.10),transparent_32%)]" />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-300">
              <span>📰</span>
              <span>Target95+ Knowledge Hub</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              Learn. Stay Updated. <span className="text-blue-600 dark:text-blue-400">Keep Growing.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
              A growing collection of useful articles covering school subjects, coding, development, AI, education updates and opportunities.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="mb-8 flex flex-col gap-2 sm:mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Explore by category</p>
            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl dark:text-white">What do you want to read?</h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">Fresh content will be added here as the Target95 publishing and automation system comes online.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/${category.slug}`}
                className="group rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-blue-800"
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-2xl transition-transform duration-200 group-hover:scale-110 dark:bg-slate-800">{category.icon}</div>
                <h3 className="text-base font-extrabold text-slate-950 dark:text-white">{category.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{category.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-400">Explore <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-14 sm:pb-20">
        <Container>
          <div className="rounded-3xl border border-blue-200/70 bg-blue-50/70 p-6 sm:p-8 dark:border-blue-900/50 dark:bg-blue-950/25">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-blue-700 dark:text-blue-300">Coming next</p>
                <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white">AI-assisted daily publishing</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Target95 will be prepared for a controlled workflow that researches topics, drafts useful articles, checks current claims and publishes approved content automatically.</p>
              </div>
              <div className="shrink-0 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <div className="text-2xl font-black text-slate-950 dark:text-white">1</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">quality post / day target</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
