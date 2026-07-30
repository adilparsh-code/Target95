import { Search, Brain, Target, Award, ArrowRight } from "lucide-react";
import Container from "./ui/Container";

const steps = [
  {
    icon: Search,
    title: "1. Identify Gaps",
    description: "Our platform analyzes your performance to identify exactly which topics need more practice.",
    color: "bg-blue-500"
  },
  {
    icon: Brain,
    title: "2. AI Explains",
    description: "The AI tutor breaks down complex concepts into simple, easy-to-understand explanations.",
    color: "bg-purple-500"
  },
  {
    icon: Target,
    title: "3. Practice Smartly",
    description: "Solve targeted questions that focus on your weak areas with instant feedback.",
    color: "bg-orange-500"
  },
  {
    icon: Award,
    title: "4. Master & Excel",
    description: "Track your improvement as you master each topic and build confidence for exams.",
    color: "bg-green-500"
  }
];

export default function AIWorkflow() {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 py-20 md:py-32 text-white">
      <Container>
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold mb-4">
            AI-Powered Learning
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How AI Transforms Your Learning
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Our intelligent learning system adapts to you, making every study session count
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 h-full">
                <div className={`${step.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-slate-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}