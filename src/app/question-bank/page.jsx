import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuestionBank from "../components/QuestionBank";

export default function QuestionBankPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.18),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
              Practice library
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Question Bank
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Find board-focused questions, practise by topic, and build the accuracy you need for 95+.
            </p>
          </div>
        </div>
      </section>
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-50">
        <QuestionBank />
      </div>
      <Footer />
    </main>
  );
}
