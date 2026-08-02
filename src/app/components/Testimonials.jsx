"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "./ui/Container";

const testimonials = [
  {
    id: 1,
    name: "Aryan Sharma",
    class: "ISC Class 12",
    score: "98% in Computer Science",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    quote: "Target95+ transformed how I prepared for my boards. The AI tutor explained complex Java concepts in simple terms that I could understand. I scored 98% and got into my dream engineering college!",
    school: "Delhi Public School, R.K. Puram"
  },
  {
    id: 2,
    name: "Priya Patel",
    class: "ICSE Class 10",
    score: "97% in Computer Applications",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    quote: "The previous year questions with detailed solutions were a game-changer. I could practice at my own pace and track my progress. The platform made studying so much more engaging!",
    school: "Bombay Scottish School, Mumbai"
  },
  {
    id: 3,
    name: "Rahul Mehta",
    class: "ISC Class 11",
    score: "95% in Computer Science",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    quote: "The smart progress tracking helped me identify my weak areas. The interactive coding exercises made learning Python fun. I'm more confident than ever before!",
    school: "St. Xavier's College, Kolkata"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative bg-gradient-to-b from-blue-50/50 to-white py-20 md:py-32">
      <Container>
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Thousands of Students
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from students who transformed their preparation and achieved exceptional scores in their board exams
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-lg md:text-xl text-gray-700 text-center mb-8 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <Image
                          src={testimonial.image} 
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          sizes="64px"
                          className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                        />
                        <div className="text-left">
                          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.class}</p>
                          <p className="text-sm font-semibold text-blue-600">{testimonial.score}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-blue-600 w-8" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
