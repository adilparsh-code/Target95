import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <Navbar />
      <div className="h-20 sm:h-24 lg:h-28"></div>
      <Container>
        <div className="relative py-12 sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_25px_80px_-40px_rgba(15,23,42,0.35)]">
            <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-7 py-10 sm:px-10 sm:py-12 lg:px-14">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-blue-300" />
                  We&apos;re here to help
                </span>
                <h1 className="mt-5 text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">Contact Us</h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100/85 sm:text-lg sm:leading-8">
                  Have questions or feedback? We&apos;d love to hear from you. Reach out and we&apos;ll respond as soon as possible.
                </p>
              </div>
            </div>

            <div className="p-7 sm:p-10 lg:p-14">
              <div className="grid gap-10 md:grid-cols-2 md:gap-12">
                <div>
                  <span className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Connect with us</span>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Get in Touch</h2>
                  <div className="mt-7 space-y-4">
                    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/50">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl">📧</div>
                      <div>
                        <p className="font-bold text-slate-950">Email</p>
                        <a href="mailto:support@target95.com" className="mt-1 inline-block text-blue-600 transition-colors hover:text-blue-700">
                          support@target95.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/50">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-xl">📍</div>
                      <div>
                        <p className="font-bold text-slate-950">Location</p>
                        <p className="mt-1 text-slate-600">India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/50">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-xl">⏰</div>
                      <div>
                        <p className="font-bold text-slate-950">Response Time</p>
                        <p className="mt-1 text-slate-600">Within 24-48 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Need an answer?</span>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Quick Links</h2>
                  <div className="mt-7 grid gap-3">
                    <a href="/faq" className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-md">
                      <span>Frequently Asked Questions</span><span className="text-slate-400 transition-transform group-hover:translate-x-1">→</span>
                    </a>
                    <a href="/feedback" className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-md">
                      <span>Submit Feedback</span><span className="text-slate-400 transition-transform group-hover:translate-x-1">→</span>
                    </a>
                    <a href="/report-bug" className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-md">
                      <span>Report a Bug</span><span className="text-slate-400 transition-transform group-hover:translate-x-1">→</span>
                    </a>
                    <a href="/feature-request" className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-md">
                      <span>Request a Feature</span><span className="text-slate-400 transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-blue-950">Before You Contact Us</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-900/80">
                      Please check our <a href="/faq" className="font-semibold underline underline-offset-2">FAQ section</a> first. You might find the answer to your question there.
                      For technical issues, try refreshing the page or clearing your browser cache.
                    </p>
                  </div>
                  <Button variant="primary" href="/faq">
                    Visit FAQ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}