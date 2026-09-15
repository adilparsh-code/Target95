import { Bot, ClipboardCheck, BarChart3, Code2, Smartphone, Zap, ArrowRight } from "lucide-react";
import Container from "./ui/Container";
import Link from "next/link";

const features = [
  { icon: Bot, title: "AI Assisted Learning", description: "Get clear explanations and personalised help when a concept stops making sense.", href: "/ai-tutor" },
  { icon: ClipboardCheck, title: "Previous Year Questions", description: "Practise with board-style questions and detailed solutions built for exam preparation.", href: "/question-bank" },
  { icon: BarChart3, title: "Smart Progress Tracking", description: "Understand your performance and see which areas deserve more attention.", href: "/analytics" },
  { icon: Code2, title: "Interactive Practice", description: "Reinforce concepts with coding exercises, quizzes and hands-on problem solving.", href: "/practice" },
  { icon: Smartphone, title: "Learn Anywhere", description: "A responsive experience that keeps your study flow consistent across devices.", href: null },
  { icon: Zap, title: "Fast & Focused", description: "Clean pages, quick interactions and less friction between you and your next task.", href: null },
];

export default function Features() {
  return <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="features-heading"><Container className="relative"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div className="max-w-2xl"><p className="type-label font-bold tracking-wide text-blue-600">Everything you need</p><h2 id="features-heading" className="mt-4 type-display font-black tracking-[-0.03em] text-slate-950">Tools that turn study time into progress.</h2></div><p className="max-w-md type-body leading-6 text-slate-500 sm:text-right">Learn the concept. Practise it. Find the gap. Come back stronger.</p></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{features.map((feature, index) => { const Icon = feature.icon; const CardTag = feature.href ? Link : "div"; return <CardTag key={feature.title} {...(feature.href ? { href: feature.href } : {})} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-blue-500"><div className="flex items-center justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white"><Icon className="h-5 w-5" /></div><span className="type-label font-black tracking-wide text-slate-300">0{index + 1}</span></div><h3 className="mt-6 type-heading-sm font-extrabold text-slate-950">{feature.title}</h3><p className="mt-2 type-body leading-6 text-slate-600">{feature.description}</p>{feature.href && <span className="mt-5 inline-flex items-center gap-2 type-body font-bold text-blue-700">Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>}<div className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-blue-500 transition duration-300 group-hover:scale-x-100" /></CardTag>; })}</div></Container></section>;
}
