import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoadmapHome from "../components/roadmap/RoadmapHome";

export const metadata = {
  title: "Study Roadmap | Target95+",
  description: "Interactive study roadmap for ICSE Class 9/10 and ISC Class 11/12 Computer Science.",
};

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8"><div className="mb-6 rounded-3xl bg-slate-950 p-6 text-white shadow-xl sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">Plan with purpose</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Your Study Roadmap</h1><p className="mt-3 max-w-2xl text-slate-300">A clear path from today’s practice to exam-ready confidence.</p></div><RoadmapHome /></section>
      <Footer />
    </main>
  );
}