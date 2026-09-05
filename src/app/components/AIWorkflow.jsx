import { Search, Brain, Target, Award, ArrowRight } from "lucide-react";
import Container from "./ui/Container";

const steps = [
  { icon: Search, number: "01", title: "Identify gaps", description: "Find the topics where more practice will make the biggest difference." },
  { icon: Brain, number: "02", title: "Understand", description: "Break difficult concepts down with clear, AI-assisted explanations." },
  { icon: Target, number: "03", title: "Practise smart", description: "Focus your questions and revision on the areas that need attention." },
  { icon: Award, number: "04", title: "Master & improve", description: "Track the progress and build confidence as your weak areas become strengths." },
];

export default function AIWorkflow() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,.2),transparent_42%)]" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">AI-powered learning loop</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] sm:text-5xl">Your preparation gets smarter as you learn.</h2>
          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">A simple loop: discover the gap, understand the concept, practise it and measure the improvement.</p>
        </div>

        <div className="relative mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-16 hidden h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent lg:block" />
          {steps.map((step) => { const Icon = step.icon; return <div key={step.number} className="relative rounded-3xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur transition hover:border-blue-300/30 hover:bg-white/[0.08] sm:p-7"><div className="flex items-center justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-200 ring-1 ring-blue-300/10"><Icon className="h-5 w-5" /></div><span className="text-xs font-black tracking-[0.18em] text-slate-600">{step.number}</span></div><h3 className="mt-7 text-xl font-extrabold">{step.title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p><ArrowRight className="mt-7 h-4 w-4 text-slate-600" /></div>; })}
        </div>
      </Container>
    </section>
  );
}
