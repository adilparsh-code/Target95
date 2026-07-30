import { Brain, Target, Zap, Shield, TrendingUp, Users } from "lucide-react";
import Container from "./ui/Container";

const reasons = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Our advanced AI tutor provides personalized explanations, answers your questions 24/7, and adapts to your learning style for maximum retention.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Target,
    title: "Board Exam Focused",
    description: "Everything is specifically designed for ICSE and ISC board exams. Previous year questions, marking schemes, and topper strategies included.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Get immediate feedback on your practice attempts. Know exactly where you stand and what you need to improve to score higher.",
    color: "from-orange-500 to-yellow-500"
  },
  {
    icon: Shield,
    title: "Proven Study Methods",
    description: "Built on proven learning methodologies used by toppers worldwide. Spaced repetition, active recall, and micro-learning baked in.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Detailed performance tracking with insights. Visualize your growth, identify patterns, and celebrate every milestone.",
    color: "from-indigo-500 to-blue-500"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a community of thousands of serious students. Stay motivated, share strategies, and learn together.",
    color: "from-rose-500 to-orange-500"
  }
];

export default function WhyTarget95() {
  return (
    <section className="relative bg-white py-20 md:py-32">
      <Container>
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Target95?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're not just another learning platform. We're your partner in achieving academic excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}