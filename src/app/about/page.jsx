import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <Container>
        <div className="py-12">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
              <h1 className="text-4xl font-bold text-gray-900">About Target95+</h1>
              <p className="mt-4 text-lg text-gray-600">
                Empowering ICSE & ISC Computer Science students with AI-powered learning tools.
              </p>

              <div className="mt-8 space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                  <p className="mt-3 text-gray-700">
                    Target95+ is dedicated to helping students achieve their academic goals by providing comprehensive, 
                    accessible, and intelligent learning resources. We believe every student deserves access to 
                    quality education tools that adapt to their learning pace and style.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">What We Offer</h2>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                      <h3 className="text-lg font-semibold text-gray-900">📚 Study Materials</h3>
                      <p className="mt-2 text-sm text-gray-700">
                        Chapter-wise notes, key concepts, and revision materials designed specifically for ICSE & ISC curriculum.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                      <h3 className="text-lg font-semibold text-gray-900">💡 Practice Questions</h3>
                      <p className="mt-2 text-sm text-gray-700">
                        Extensive question bank with MCQs, programming questions, and previous year questions.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                      <h3 className="text-lg font-semibold text-gray-900">📝 Mock Tests</h3>
                      <p className="mt-2 text-sm text-gray-700">
                        Timed mock tests that simulate real exam conditions to help you prepare effectively.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                      <h3 className="text-lg font-semibold text-gray-900">🤖 AI Tutor</h3>
                      <p className="mt-2 text-sm text-gray-700">
                        Get instant help and explanations from our AI-powered tutor whenever you're stuck.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                      <h3 className="text-lg font-semibold text-gray-900">📊 Analytics</h3>
                      <p className="mt-2 text-sm text-gray-700">
                        Track your progress, identify weak areas, and monitor your improvement over time.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                      <h3 className="text-lg font-semibold text-gray-900">🎯 Smart Practice</h3>
                      <p className="mt-2 text-sm text-gray-700">
                        AI-recommended practice sessions focused on your individual learning needs.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">Why Target95+?</h2>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span className="text-gray-700"><strong>Curriculum-Aligned:</strong> All content is designed specifically for ICSE & ISC Computer Science syllabus</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span className="text-gray-700"><strong>AI-Powered:</strong> Leverage artificial intelligence for personalized learning experiences</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span className="text-gray-700"><strong>Progress Tracking:</strong> Monitor your learning journey with detailed analytics and insights</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span className="text-gray-700"><strong>Accessible:</strong> Study anytime, anywhere on any device</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span className="text-gray-700"><strong>Free to Use:</strong> Quality education should be accessible to everyone</span>
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                  <p className="mt-3 text-gray-700">
                    We envision a world where every student has access to intelligent, personalized learning tools 
                    that help them reach their full potential. Target95+ is our step towards making that vision a reality 
                    for Computer Science students across India.
                  </p>
                </section>

                <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
                  <h2 className="text-2xl font-bold text-blue-900">Join Us on This Journey</h2>
                  <p className="mt-3 text-blue-800">
                    Whether you're preparing for your board exams or looking to strengthen your programming fundamentals, 
                    Target95+ is here to support you every step of the way. Start your learning journey today!
                  </p>
                  <div className="mt-4">
                    <a href="/register" className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                      Get Started Free
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}