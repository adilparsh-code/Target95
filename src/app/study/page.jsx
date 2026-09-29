import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StudyHome from "../components/study/StudyHome";
import ErrorBoundary from "../components/ui/ErrorBoundary";

export const metadata = {
  title: "Study Center | Target95+",
  description: "A structured chapter-based study experience for learners.",
};

export default function StudyPage() {
  return (
    <main className="stitch-page internal-page internal-study min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <div className="stitch-surface mb-5 p-5 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Study Center</p>
          <h1 className="mt-2 text-2xl font-black tracking-[-0.035em] text-slate-950 sm:text-3xl dark:text-white">Learn with a clear path.</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-400">Choose a subject, move chapter by chapter, and keep your revision focused.</p>
        </div>
        <ErrorBoundary><StudyHome /></ErrorBoundary>
      </div>
      <Footer />
    </main>
  );
}
