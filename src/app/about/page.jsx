import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";

export const metadata = {
  title: "About Target95+ | Target95+",
  description: "Learn about Target95+, the AI-powered learning platform for ICSE & ISC Computer Science students. Master Java programming and score 95+ with our comprehensive resources.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="h-20 sm:h-24 lg:h-28"></div>
      <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
        {/* Hero Section */}
        <section className="relative isolate overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_34%),radial-gradient(circle_at_85%_25%,_rgba(79,70,229,0.12),_transparent_30%)]" />
          <div className="absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span>About Target95+</span>
            </div>
            <h1 className="text-4xl font-black leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-7xl">
              Your Ultimate ICSE & ISC
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent"> Computer Science </span>
              Learning Platform
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:text-xl">
              Target95+ is designed to help ICSE and ISC Computer Science students achieve their best scores.
              We provide comprehensive practice materials, AI-powered learning, and detailed performance analytics.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-[0_20px_70px_-35px_rgba(15,23,42,0.3)] sm:p-10 lg:p-14">
            <div className="mb-8 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-blue-200" />
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Our Mission</span>
              <span className="h-px w-10 bg-blue-200" />
            </div>
            <h2 className="text-center text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Our Mission</h2>
            <div className="prose prose-lg mx-auto mt-8 max-w-3xl text-slate-600 prose-p:leading-8 prose-p:my-5">
              <p>
                At Target95+, we believe every student has the potential to excel in Computer Science.
                Our platform bridges the gap between classroom learning and exam excellence by providing
                targeted practice, instant feedback, and intelligent learning tools.
              </p>
              <p>
                We understand the challenges of ICSE and ISC Computer Science curriculum. That's why
                we've built a platform that focuses on:
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-blue-50/80 to-transparent" />
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Why Target95+</span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">What We Offer</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Chapter-wise Practice",
                  description: "Comprehensive question banks for every chapter in the ICSE and ISC Computer Science syllabus.",
                  icon: "📚",
                },
                {
                  title: "AI-Powered Learning",
                  description: "Smart explanations and personalized learning paths powered by advanced AI technology.",
                  icon: "🤖",
                },
                {
                  title: "Previous Year Questions",
                  description: "Access to past board exam questions with detailed solutions and explanations.",
                  icon: "📝",
                },
                {
                  title: "Performance Analytics",
                  description: "Track your progress with detailed analytics, identify weak areas, and improve systematically.",
                  icon: "📊",
                },
                {
                  title: "Mock Tests",
                  description: "Simulate real exam conditions with timed mock tests and get instant results.",
                  icon: "🎯",
                },
                {
                  title: "Leaderboards",
                  description: "Compete with peers and stay motivated with weekly and monthly leaderboards.",
                  icon: "🏆",
                },
              ].map((feature, index) => (
                <div key={index} className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_-25px_rgba(37,99,235,0.45)] sm:p-7">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 text-2xl shadow-inner ring-1 ring-blue-100 transition-transform duration-300 group-hover:scale-105">
                    <span>{feature.icon}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-950">{feature.title}</h3>
                  <p className="leading-7 text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-12 shadow-[0_25px_80px_-35px_rgba(15,23,42,0.65)] sm:px-10 lg:px-14 lg:py-16">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="relative">
              <div className="mx-auto mb-12 max-w-2xl text-center">
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">Growing Every Day</span>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Our Impact</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {[
                  { number: "10,000+", label: "Students Learning" },
                  { number: "5,000+", label: "Practice Questions" },
                  { number: "12", label: "Topics Covered" },
                  { number: "200+", label: "Practice Tests" },
                ].map((stat, index) => (
                  <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-center backdrop-blur-sm sm:p-6">
                    <div className="text-3xl font-black tracking-tight text-white sm:text-4xl">{stat.number}</div>
                    <div className="mt-2 text-sm font-medium text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white via-blue-50/70 to-indigo-50/80 px-6 py-14 text-center shadow-[0_20px_70px_-40px_rgba(37,99,235,0.45)] sm:px-10 lg:px-16">
            <div className="absolute left-1/2 top-0 h-32 w-72 -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="relative">
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">The People Behind Target95+</span>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Built for Students, Driven by Passion</h2>
              <p className="mx-auto mb-8 mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                Target95+ is created by educators and developers who understand the ICSE and ISC curriculum
                inside out. We're committed to helping every student achieve their target score.
              </p>
              <Button variant="primary" href="/contact">
                Get in Touch
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
