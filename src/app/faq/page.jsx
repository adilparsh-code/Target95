import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";

export const metadata = {
  title: "FAQ | Target95+",
  description: "Frequently asked questions about Target95+ - the AI-powered learning platform for ICSE & ISC Computer Science students.",
};

const faqs = [
  {
    question: "How do I start learning?",
    answer: "Click the 'Get Started' button on the homepage, create an account, and select your board (ICSE/CBSE). Then choose a subject like Java Programming and start with chapter-wise study material.",
  },
  {
    question: "Is Target95+ free to use?",
    answer: "Target95+ offers both free and premium content. Basic chapters, practice questions, and mock tests are available for free. Premium features include advanced analytics, personalized AI tutoring, and detailed progress reports.",
  },
  {
    question: "What boards do you support?",
    answer: "We support ICSE (Class 9-10 Computer Applications) and ISC (Class 11-12 Computer Science) boards. CBSE content is coming soon.",
  },
  {
    question: "Do I need to install anything?",
    answer: "No installation required. Target95+ is a web-based platform that works on any modern browser. You can also install it as a Progressive Web App (PWA) on your device for offline access.",
  },
  {
    question: "How do I track my progress?",
    answer: "Your progress is automatically saved and can be viewed from your Dashboard. You can see chapter completion, practice test scores, and streaks all in one place.",
  },
  {
    question: "Can I reset my password?",
    answer: "Yes. If you forget your password, click the 'Forgot Password' link on the login page and we'll send you a reset email.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="h-20 sm:h-24 lg:h-28"></div>
      <Container>
        <div className="py-12">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600 mb-8">
              Find answers to common questions about Target95+ and how to get the most out of your learning experience.
            </p>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h2>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}
