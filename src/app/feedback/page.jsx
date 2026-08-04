import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

export const metadata = {
  title: "Feedback | Target95+",
  description: "Share your feedback about Target95+ - we value your input to improve our learning platform.",
};

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="h-20 sm:h-24 lg:h-28"></div>
      <Container>
        <div className="py-12">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Send Feedback</h1>
            <p className="text-lg text-gray-600 mb-8">
              We value your feedback. Tell us what you love, what could be better, or any suggestions you have for Target95+.
            </p>
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input type="text" id="name" name="name" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input type="email" id="email" name="email" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="rating" className="block text-sm font-semibold text-gray-700 mb-2">Overall Rating</label>
                  <select id="rating" name="rating" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500">
                    <option value="5">Excellent</option>
                    <option value="4">Very Good</option>
                    <option value="3">Good</option>
                    <option value="2">Fair</option>
                    <option value="1">Poor</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Your Feedback</label>
                  <textarea id="message" name="message" rows="6" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500" placeholder="What would you like us to know?" required></textarea>
                </div>
                <Button className="w-full">
                  Submit Feedback
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}
