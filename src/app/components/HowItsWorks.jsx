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
    <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 md:py-28" aria-labelledby="how-it-works-heading">
      <Container className="relative">
        <SectionTitle
          id="how-it-works-heading"
          title="How It Works"
          subtitle="Learn step by step with our AI-powered platform."
          className="text-center"
        />

        {/* Connecting line decoration (hidden on mobile) */}
        <div className="hidden md:block absolute top-44 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="relative mt-16 grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Step number badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-md">
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