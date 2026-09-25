import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";

export default function CopyrightPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="h-20 sm:h-24 lg:h-28"></div>
      <Container>
        <div className="py-12">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
              <h1 className="text-4xl font-bold text-gray-900">Copyright & Content Use</h1>
              <p className="mt-4 text-sm text-gray-600">Last updated: September 22, 2026</p>

              <div className="mt-8 space-y-8 text-gray-700">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900">1. Ownership</h2>
                  <p className="mt-3">
                    Target95+ and its original content are protected by applicable intellectual-property laws. Unless a page or item expressly states otherwise, Target95+ owns or has permission to use the original text, explanations, practice questions, solutions, examples, learning structures, graphics, software, branding, and other original materials created for the Platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">2. What You May Do</h2>
                  <p className="mt-3">
                    Students may access and use Target95+ content for their own personal learning and exam preparation through the Platform. You may quote a short portion where permitted by applicable law, provided that the use does not substitute for the Platform&apos;s content and any required attribution is given.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">3. What Requires Permission</h2>
                  <p className="mt-3">Unless permitted by law or expressly authorized by Target95+, do not:</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>Copy or republish substantial portions of Target95+ content on another website, app, book, course, PDF, channel, repository, or social account.</li>
                    <li>Sell, license, redistribute, or commercially exploit Target95+ original content.</li>
                    <li>Bulk-download, scrape, mirror, or systematically reproduce the question bank, explanations, solutions, or other content.</li>
                    <li>Remove copyright, attribution, watermark, or other rights-management information.</li>
                    <li>Create a competing database, dataset, or derivative collection from substantial portions of Target95+ content.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">4. Third-Party and Examination Material</h2>
                  <p className="mt-3">
                    Not every item displayed on Target95+ is necessarily owned by Target95+. Third-party names, trademarks, logos, examination-board materials, quotations, and other third-party material remain the property of their respective owners. Target95+ does not claim ownership over material that it does not own.
                  </p>
                  <p className="mt-3">
                    Our original explanations, transformations, examples, organization, annotations, and other independently created material should not be confused with the underlying third-party material.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">5. Reporting Suspected Infringement</h2>
                  <p className="mt-3">
                    If you believe Target95+ content has been copied or used without authorization, or if you believe material on Target95+ infringes your rights, contact us before taking further action where practical.
                  </p>
                  <p className="mt-3">Please include:</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>Your name and contact details.</li>
                    <li>The URL(s) or location(s) of the material in question.</li>
                    <li>A clear description of the original work and the material at issue.</li>
                    <li>Information supporting your ownership or authorization to act.</li>
                    <li>A concise description of the requested resolution.</li>
                  </ul>
                  <p className="mt-4">
                    Email: <a href="mailto:support@target95.com" className="font-semibold text-blue-600 hover:text-blue-700">support@target95.com</a>
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">6. Preservation of Evidence</h2>
                  <p className="mt-3">
                    Target95+ maintains version history and development records for its original content where available. If a material infringement issue arises, preserve the relevant URLs, screenshots, dates, and copies of the affected material so the issue can be investigated accurately.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">7. Legal Framework</h2>
                  <p className="mt-3">
                    Target95+ operates from India and seeks to comply with applicable Indian intellectual-property law, including the Copyright Act, 1957. Copyright protection and exceptions can depend on the specific work, ownership, facts, and permitted use; this page is a practical notice, not legal advice.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900">8. Contact</h2>
                  <p className="mt-3">
                    For permissions, licensing requests, copyright concerns, or content-use questions, contact us at support@target95.com.
                  </p>
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
