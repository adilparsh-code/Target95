import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

export const metadata = {
  title: "Feature Request | Target95+",
  description: "Request new features for Target95+. We read every request and use them to build the platform our students need.",
};

export default function FeatureRequestPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="h-20 sm:h-24 lg:h-28"></div>
      <Container>
        <div className="py-12">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Request a Feature</h1>
            <p className="text-lg text-gray-600 mb-8">
              Have an idea that would make Target95+ even better? We'd love to hear it. Submit your request and our team will review it.
            </p>
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input type="text" id="name" name="name" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input type="email" id="email" name="email" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select id="category" name="category" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500">
                    <option value="study">Study Material</option>
                    <option value="practice">Practice & Tests</option>
                    <option value="ai">AI Tutor</option>
                    <option value="analytics">Analytics & Dashboard</option>
                    <option value="gamification">Rewards & Gamification</option>
                    <option value="mobile">Mobile App</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">Feature Title</label>
                  <input type="text" id="title" name="title" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500" placeholder="Brief title for your feature request" required />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea id="description" name="description" rows="6" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500" placeholder="Explain your feature request in detail..." required></textarea>
                </div>
                <Button className="w-full">
                  Submit Feature Request
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
