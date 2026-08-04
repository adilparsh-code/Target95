import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="h-20 sm:h-24 lg:h-28"></div>
      <Container>
        <div className="py-12">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
              <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
              <p className="mt-4 text-sm text-gray-600">Last updated: July 31, 2026</p>

              <div className="mt-8 space-y-8 text-gray-700">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
                  <p className="mt-3">
                    By accessing or using Target95+ ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">2. Description of Service</h2>
                  <p className="mt-3">
                    Target95+ is an AI-powered learning platform designed to help ICSE and ISC Computer Science students prepare for their examinations. The Platform provides study materials, practice questions, mock tests, and performance analytics.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">3. User Accounts</h2>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">Registration</h3>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>You must provide accurate and complete information when creating an account</li>
                    <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                    <li>You must notify us immediately of any unauthorized access to your account</li>
                    <li>One person or entity may not maintain more than one account</li>
                  </ul>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">Account Termination</h3>
                  <p className="mt-2">
                    We reserve the right to suspend or terminate your account if you violate these terms or engage in fraudulent, abusive, or harmful activities.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">4. Acceptable Use</h2>
                  <p className="mt-3">You agree not to:</p>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>Use the Platform for any illegal or unauthorized purpose</li>
                    <li>Attempt to gain unauthorized access to any portion of the Platform</li>
                    <li>Interfere with or disrupt the Platform's functionality</li>
                    <li>Share, reproduce, or distribute content from the Platform without permission</li>
                    <li>Use automated systems to access the Platform without our consent</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Post false, misleading, or fraudulent content</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">5. Intellectual Property</h2>
                  <p className="mt-3">
                    All content on the Platform, including but not limited to text, graphics, logos, questions, and software, is the property of Target95+ or its licensors and is protected by copyright and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">6. User Content</h2>
                  <p className="mt-3">
                    By submitting feedback, suggestions, or other content to the Platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute such content for the purpose of improving and promoting the Platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">7. Privacy and Data</h2>
                  <p className="mt-3">
                    Your use of the Platform is subject to our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">8. Disclaimers</h2>
                  <p className="mt-3">
                    The Platform is provided "as is" without warranties of any kind. We do not guarantee that the Platform will be error-free, secure, or available at all times. We are not responsible for any errors or omissions in the content. Educational outcomes may vary, and we do not guarantee specific examination results.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">9. Limitation of Liability</h2>
                  <p className="mt-3">
                    To the maximum extent permitted by law, Target95+ shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from your use of the Platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">10. Changes to Terms</h2>
                  <p className="mt-3">
                    We reserve the right to modify these Terms of Service at any time. We will notify users of significant changes by posting a notice on the Platform or sending an email. Your continued use of the Platform after changes constitutes acceptance of the new terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">11. Governing Law</h2>
                  <p className="mt-3">
                    These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be resolved in the courts of India.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">12. Contact Information</h2>
                  <p className="mt-3">
                    If you have questions about these Terms of Service, please contact us at:
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