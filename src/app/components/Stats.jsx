"use client";

import Container from "./ui/Container";
import AnimatedCounter from "./AnimatedCounter";
import { javaQuestions, javaChapters } from "../data/javaCurriculum";

const stats = [
  {
    end: 0,
    suffix: "+",
    title: "Students Learning",
    icon: "🎓",
  },
  {
    end: javaQuestions.length,
    suffix: "+",
    title: "Questions Available",
    icon: "📝",
  },
  {
    end: javaChapters.length,
    suffix: "",
    title: "Chapters Covered",
    icon: "📚",
  },
  {
    end: 0,
    suffix: "+",
    title: "Mock Tests Taken",
    icon: "🏆",
  },
];

export default function Stats() {
  return (
    <section className="relative bg-white py-20 md:py-28" aria-label="Platform highlights">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-white to-white pointer-events-none" />

      <Container className="relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Trusted Numbers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Platform by the Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Straight from our Java Programming content library
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:gap-12 md:grid-cols-4">
          {stats.map((item, index) => (
            <div key={item.title} className="relative text-center group">
              {index < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
              )}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-700">
                <AnimatedCounter end={item.end} suffix={item.suffix} />
              </h2>
              <p className="mt-3 text-lg text-gray-600 font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
