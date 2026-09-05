import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";

export const metadata = {
  title: "About Target95+ | Target95+",
  description: "Learn about Target95+, the AI-powered learning platform for ICSE & ISC Computer Science students. Master Java programming and score 95+ with our comprehensive resources.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="h-20 sm:h-24 lg:h-28"></div>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5" />
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
              <span>About Target95+</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Ultimate ICSE & ISC
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Computer Science </span>
              Learning Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Target95+ is designed to help ICSE and ISC Computer Science students achieve their best scores.
              We provide comprehensive practice materials, AI-powered learning, and detailed performance analytics.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Mission</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                At Target95+, we believe every student has the potential to excel in Computer Science.
                Our platform bridges the gap between classroom learning and exam excellence by providing
                targeted practice, instant feedback, and intelligent learning tools.
              </p>
              <p>
                We understand the challenges of ICSE and ISC Computer Science curriculum. That's why
                we've built a platform that focuses on:
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Chapter-wise Practice",
                  description: "Comprehensive question banks for every chapter in the ICSE and ISC Computer Science syllabus.",
                  icon: "📚",
                },
                {
                  title: "AI-Powered Learning",
                  description: "Smart explanations and personalized learning paths powered by advanced AI technology.",
                  icon: "🤖",
                },
                {
                  title: "Previous Year Questions",
                  description: "Access to past board exam questions with detailed solutions and explanations.",
                  icon: "📝",
                },
                {
                  title: "Performance Analytics",
                  description: "Track your progress with detailed analytics, identify weak areas, and improve systematically.",
                  icon: "📊",
                },
                {
                  title: "Mock Tests",
                  description: "Simulate real exam conditions with timed mock tests and get instant results.",
                  icon: "🎯",
                },
                {
                  title: "Leaderboards",
                  description: "Compete with peers and stay motivated with weekly and monthly leaderboards.",
                  icon: "🏆",
                },
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-indigo-700">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "10,000+", label: "Students Learning" },
                { number: "5,000+", label: "Practice Questions" },
                { number: "12", label: "Topics Covered" },
                { number: "200+", label: "Practice Tests" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Students, Driven by Passion</h2>
            <p className="text-lg text-gray-600 mb-8">
              Target95+ is created by educators and developers who understand the ICSE and ISC curriculum
              inside out. We're committed to helping every student achieve their target score.
            </p>
            <Button variant="primary" href="/contact">
              Get in Touch
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
