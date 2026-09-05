import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuestionBank from "../components/QuestionBank";

export default function QuestionBankPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <div className="mb-5 rounded-[28px] border border-slate-200/80 bg-white/80 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:p-7 dark:border-slate-800 dark:bg-slate-900/65">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Practice</p>
          <h1 className="mt-2 text-2xl font-black tracking-[-0.035em] text-slate-950 sm:text-3xl dark:text-white">Practice questions with purpose.</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-400">Find the right questions, review your answers, and build exam confidence one attempt at a time.</p>
        </div>
        <QuestionBank />
      </div>
      <Footer />
    </main>
  );
}
