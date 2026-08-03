import { CheckCircle2, BookOpen, Calculator, Code, FileText, BarChart3 } from "lucide-react";
import Container from "./ui/Container";

const icseFeatures = [
  "Class 9 & 10 Computer Applications",
  "10 years of previous year questions",
  "Programming fundamentals with BlueJ",
  "Chapter-wise notes & summaries",
  "Full-length mock tests",
  "Teacher-created content aligned to syllabus"
];

const iscFeatures = [
  "Class 11 & 12 Computer Science",
  "Comprehensive Java programming coverage",
  "Data Structures & OOP concepts",
  "Computer Science practical preparation",
  "Previous year paper solutions",
  "Advanced mock tests with marking scheme"
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
            ICSE & ISC Support
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive preparation material for all CISCE board students from Class 9 through 12
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* ICSE Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-blue-100 hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">ICSE</h3>
            <p className="text-gray-500 mb-6">Class 9 & 10 • Computer Applications</p>
            
            <ul className="space-y-4">
              {icseFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ISC Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-indigo-100 hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">ISC</h3>
            <p className="text-gray-500 mb-6">Class 11 & 12 • Computer Science</p>
            
            <ul className="space-y-4">
              {iscFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
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