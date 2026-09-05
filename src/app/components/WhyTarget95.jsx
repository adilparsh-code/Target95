import { Brain, Target, Zap, Shield, TrendingUp, Users, ArrowUpRight } from "lucide-react";
import Container from "./ui/Container";

const reasons = [
  { icon: Brain, title: "AI-Powered Learning", description: "Get clear explanations, personalised help and guidance whenever a concept feels difficult." },
  { icon: Target, title: "Board Exam Focused", description: "Study with content structured around the expectations of CISCE and CBSE learners." },
  { icon: Zap, title: "Instant Feedback", description: "Practise, see where you went wrong and turn mistakes into your next improvement." },
  { icon: Shield, title: "Proven Study Methods", description: "Use active recall, spaced repetition and focused practice to make study time count." },
  { icon: TrendingUp, title: "Progress Analytics", description: "See your performance, recognise weak areas and build momentum towards your target." },
  { icon: Users, title: "Student First", description: "A focused experience built around less distraction and more meaningful preparation." },
];

export default function WhyTarget95() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.5fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Why Target95?</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] text-slate-950 sm:text-5xl">Less noise.<br /><span className="text-blue-600">More progress.</span></h2>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-600">Everything is designed to make the next study decision obvious — what to learn, what to practise and where to improve.</p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-xs text-white">95</span> Built around your target score</div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return <div key={reason.title} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:p-7"><div className="flex items-center justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white"><Icon className="h-5 w-5" /></div><span className="text-xs font-bold text-slate-300">0{index + 1}</span></div><h3 className="mt-6 text-lg font-extrabold text-slate-950">{reason.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{reason.description}</p><div className="mt-5 flex items-center gap-1 text-xs font-bold text-blue-600 opacity-0 transition group-hover:opacity-100">Learn smarter <ArrowUpRight className="h-3.5 w-3.5" /></div></div>;
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
