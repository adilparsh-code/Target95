import SectionCard from "./SectionCard";
import Container from "./ui/Container";
import SectionTitle from "./ui/SectionTitle";

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
    description: "Get instant explanations whenever you're stuck.",
  },
  {
    icon: "🏆",
    title: "Track Progress",
    description: "Monitor your performance and improve every day.",
  },
];

export default function HowItsWorks() {
  return (
<<<<<<< HEAD
    <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 md:py-28" aria-labelledby="how-it-works-heading">
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 id="how-it-works-heading" className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          How It Works
        </h2>

        <p className="mt-4 text-center text-lg text-gray-500 max-w-xl mx-auto">
          Learn step by step with our AI-powered platform.
        </p>
=======
    <section className="bg-slate-100 py-24" aria-labelledby="how-it-works-heading">
      <Container>
        <SectionTitle
          id="how-it-works-heading"
          title="How It Works"
          subtitle="Learn step by step with our AI-powered platform."
          className="text-center"
        />
>>>>>>> 49ef4e8 (feat: improve Target95 UI, responsive design and admin module)

        {/* Connecting line decoration (hidden on mobile) */}
        <div className="hidden md:block absolute top-44 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

        <div className="relative mt-16 grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Step number badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-sm font-bold flex items-center justify-center shadow-md">
                {index + 1}
              </div>
              <SectionCard icon={step.icon} title={step.title} description={step.description} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}