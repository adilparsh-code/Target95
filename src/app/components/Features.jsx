import Container from "./ui/Container";
import SectionTitle from "./ui/SectionTitle";

const features = [
  {
    icon: "🤖",
    title: "AI Assisted Learning",
    description: "Get instant explanations and personalized help from our AI tutor whenever you're stuck on a concept.",
  },
  {
    icon: "📋",
    title: "Previous Year Questions",
    description: "Practice with a vast collection of past board exam questions with detailed solutions and explanations.",
  },
  {
    icon: "📈",
    title: "Smart Progress Tracking",
    description: "Monitor your performance with detailed analytics and identify areas that need more attention.",
  },
  {
    icon: "✍️",
    title: "Interactive Practice",
    description: "Hands-on coding exercises and interactive quizzes that reinforce your understanding of key concepts.",
  },
  {
    icon: "📱",
    title: "Responsive Platform",
    description: "Seamlessly learn across all your devices — desktop, tablet, or mobile — with a consistent experience.",
  },
  {
    icon: "⚡",
    title: "Fast Performance",
    description: "Lightning-fast page loads and smooth transitions ensure zero friction in your learning journey.",
  },
];

export default function Features() {
  return (
    <section className="relative bg-white py-16 md:py-24" aria-labelledby="features-heading">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white pointer-events-none" />

      <Container className="relative">
        <SectionTitle
          id="features-heading"
          title="Why Target95+"
          subtitle="Everything you need to master ICSE & ISC Computer Science"
          className="text-center"
        />

        <div className="mt-12 md:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}