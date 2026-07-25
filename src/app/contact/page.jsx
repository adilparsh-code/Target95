import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <Container>
        <div className="py-12">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
              <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
              <p className="mt-4 text-lg text-gray-600">
                Have questions or feedback? We'd love to hear from you. Reach out and we'll respond as soon as possible.
              </p>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Get in Touch</h2>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">📧</div>
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <a href="mailto:support@target95.com" className="text-blue-600 hover:text-blue-700">
                          support@target95.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">📍</div>
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p className="text-gray-700">India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">⏰</div>
                      <div>
                        <p className="font-medium text-gray-900">Response Time</p>
                        <p className="text-gray-700">Within 24-48 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Quick Links</h2>
                  <div className="mt-4 space-y-2">
                    <a href="/faq" className="block text-blue-600 hover:text-blue-700">
                      Frequently Asked Questions
                    </a>
                    <a href="/feedback" className="block text-blue-600 hover:text-blue-700">
                      Submit Feedback
                    </a>
                    <a href="/report-bug" className="block text-blue-600 hover:text-blue-700">
                      Report a Bug
                    </a>
                    <a href="/feature-request" className="block text-blue-600 hover:text-blue-700">
                      Request a Feature
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6">
                <h3 className="text-lg font-semibold text-blue-900">Before You Contact Us</h3>
                <p className="mt-2 text-sm text-blue-800">
                  Please check our <a href="/faq" className="underline">FAQ section</a> first. You might find the answer to your question there.
                  For technical issues, try refreshing the page or clearing your browser cache.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}