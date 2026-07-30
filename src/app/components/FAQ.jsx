"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Container from "./ui/Container";

const faqs = [
  {
    question: "Is Target95+ completely free to use?",
    answer: "Most of our core features including access to previous year questions, study materials, and basic practice tests are completely free. We'll be introducing premium features in the future for advanced AI tutoring and personalized study plans."
  },
  {
    question: "Which boards and classes do you support?",
    answer: "We currently support ICSE (Class 9-10) and ISC (Class 11-12) Computer Science students. CBSE support is currently in development and will be launching soon."
  },
  {
    question: "How does the AI tutor work?",
    answer: "Our AI tutor can answer your questions about computer science concepts, explain programming logic, help debug code, and provide detailed explanations for any practice question you get wrong. It's available 24/7 to help you whenever you're stuck."
  },
  {
    question: "Can I track my progress over time?",
    answer: "Yes! Our platform tracks all your practice attempts, mock test scores, and topic mastery. You get detailed analytics showing your strong areas and topics that need more work."
  },
  {
    question: "Are the questions aligned with the latest syllabus?",
    answer: "Absolutely! All our content is regularly updated to align with the latest CISCE syllabus and exam patterns. We include the most recent previous year questions to ensure you're practicing with relevant material."
  },
  {
    question: "Can I use Target95+ on my mobile phone?",
    answer: "Yes! Target95+ is fully responsive and works on all devices including smartphones, tablets, and desktop computers. You can study anytime, anywhere."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative bg-gray-50 py-20 md:py-32">
      <Container>
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Target95+ and how it can help you ace your exams
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="mb-4 last:mb-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full bg-white rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}