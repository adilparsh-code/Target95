import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <Container>
        <div className="py-12">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
              <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="mt-4 text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>

              <div className="mt-8 space-y-8 text-gray-700">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
                  <p className="mt-3">
                    Target95+ ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">2. Information We Collect</h2>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">Personal Information</h3>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>Name and email address (for account creation)</li>
                    <li>Learning progress and performance data</li>
                    <li>Practice session history and test results</li>
                    <li>Bookmarked questions and study materials</li>
                  </ul>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">Usage Information</h3>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>Pages visited and features used</li>
                    <li>Time spent on the platform</li>
                    <li>Device and browser information</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>To provide and improve our educational services</li>
                    <li>To personalize your learning experience</li>
                    <li>To track your progress and provide analytics</li>
                    <li>To communicate important updates and notifications</li>
                    <li>To ensure platform security and prevent abuse</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">4. Data Storage and Security</h2>
                  <p className="mt-3">
                    We use industry-standard security measures to protect your data. Your information is stored securely using Firebase, a trusted cloud platform. We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">5. Data Sharing</h2>
                  <p className="mt-3">
                    We do not sell, trade, or rent your personal information to third parties. We may share anonymized, aggregated data for research and improvement purposes. We may disclose information if required by law or to protect our rights and safety.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">6. Your Rights</h2>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Export your learning data</li>
                    <li>Opt out of non-essential communications</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">7. Cookies and Tracking</h2>
                  <p className="mt-3">
                    We use essential cookies to maintain your session and preferences. We may use analytics tools to understand platform usage. You can control cookie settings through your browser preferences.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">8. Children's Privacy</h2>
                  <p className="mt-3">
                    Our platform is designed for students aged 13 and above. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will take immediate action to delete it.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">9. Changes to This Policy</h2>
                  <p className="mt-3">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">10. Contact Us</h2>
                  <p className="mt-3">
                    If you have questions about this Privacy Policy, please contact us at:
                  </p>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>Email: support@target95.com</li>
                    <li>Contact Page: <a href="/contact" className="text-blue-600 hover:text-blue-700">/contact</a></li>
                  </ul>
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