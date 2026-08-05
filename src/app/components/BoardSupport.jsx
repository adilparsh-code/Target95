import { CheckCircle2, BookOpen, Code } from "lucide-react";
import Container from "./ui/Container";

const cisceFeatures = [
  "ICSE (Classes 9–10)",
  "ISC (Classes 11–12)",
  "Computer Science Learning Platform",
  "Chapter-wise notes & summaries",
  "Full-length mock tests",
  "10 years of previous year questions",
];

const cbseFeatures = [
  "Classes 11–12",
  "Python Programming",
  "Question Bank",
  "Mock Tests",
  "AI Learning",
];

export default function BoardSupport() {
  return (
    <section className="relative bg-white py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 pointer-events-none" />
      
      <Container className="relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Complete Board Coverage
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Board Support
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive preparation material for all CISCE and CBSE board students
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* CISCE Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-blue-100 hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">CISCE</h3>
            <p className="text-gray-500 mb-6">Council for the Indian School Certificate Examinations</p>
            
            <ul className="space-y-4">
              {cisceFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CBSE Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-green-100 hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">CBSE</h3>
            <p className="text-gray-500 mb-6">Python Programming • Classes 11–12</p>
            
            <ul className="space-y-4">
              {cbseFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}