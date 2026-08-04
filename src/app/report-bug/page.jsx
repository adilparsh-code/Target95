import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

export const metadata = {
  title: "Report a Bug | Target95+",
  description: "Report a bug or issue you encountered on Target95+. We'll investigate and fix it promptly.",
};

export default function ReportBugPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="h-20 sm:h-24 lg:h-28"></div>
      <Container>
        <div className="py-12">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Report a Bug</h1>
            <p className="text-lg text-gray-600 mb-8">
              Found something not working? Let us know and we'll fix it right away.
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
                  <label htmlFor="page" className="block text-sm font-semibold text-gray-700 mb-2">Page / URL</label>
                  <input type="text" id="page" name="page" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500" placeholder="e.g. /dashboard" />
                </div>
                <div>
                  <label htmlFor="browser" className="block text-sm font-semibold text-gray-700 mb-2">Browser & Device</label>
                  <input type="text" id="browser" name="browser" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500" placeholder="e.g. Chrome on Windows" />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea id="description" name="description" rows="6" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500" placeholder="Describe the issue in detail..." required></textarea>
                </div>
                <Button className="w-full">
                  Submit Bug Report
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
