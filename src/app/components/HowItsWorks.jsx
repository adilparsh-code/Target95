import SectionCard from "./SectionCard";

const steps = [
  {
    icon: "📘",
    title: "Choose Chapter",
    description: "Select your ICSE chapter to begin learning.",
  },
  {
    icon: "📝",
    title: "Practice Questions",
    description: "Solve chapter-wise previous year questions.",
  },
  {
    icon: "🤖",
    title: "Learn with AI",
    description: "Get instant explanations whenever you&apos;re stuck.",
  },
  {
    icon: "🏆",
    title: "Track Progress",
    description: "Monitor your performance and improve every day.",
  },
];

export default function HowItsWorks() {
  return (
    <section className="bg-slate-100 py-24" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="how-it-works-heading" className="text-center text-5xl font-extrabold text-gray-900">
          How It Works
        </h2>

        <p className="mt-4 text-center text-lg text-gray-600">
          Learn step by step with our AI-powered platform.
        </p>

        <div className="mt-20 grid gap-8 md:grid-cols-4">
          {steps.map((step) => (
            <SectionCard key={step.title} icon={step.icon} title={step.title} description={step.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
