import { Metadata } from "next";
import ClientHome from "./ClientHome";
import HomeProductPreview from "./components/HomeProductPreview";

export const metadata = {
  title: "Target95+ - Master CISCE & CBSE Computer Science with AI",
  description: "Prepare for CISCE (ICSE & ISC) and CBSE Computer Science board exams with AI-powered learning. Practice previous year questions, solve Python programs, and score 95+ with our comprehensive platform.",
  keywords: "CISCE computer science, ICSE computer science, ISC computer science, CBSE computer science, board exam preparation, AI learning, Python programming, previous year questions, CISCE study material, CBSE study material",
  openGraph: {
    title: "Target95+ - Master CISCE & CBSE Computer Science with AI",
    description: "Prepare for CISCE (ICSE & ISC) and CBSE Computer Science board exams with AI-powered learning. Score 95+ with our comprehensive platform.",
    type: "website",
    locale: "en_IN",
    siteName: "Target95+",
  },
  twitter: {
    card: "summary_large_image",
    title: "Target95+ - Master CISCE & CBSE Computer Science with AI",
    description: "Prepare for CISCE (ICSE & ISC) and CBSE Computer Science board exams with AI-powered learning.",
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-200/25 blur-3xl" />
        <div className="absolute -right-32 top-32 h-96 w-96 rounded-full bg-indigo-200/25 blur-3xl" />
        <div className="absolute left-1/2 top-0 h-px w-[min(80vw,1000px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />
      </div>
      <div className="relative z-10">
        <ClientHome />
        <HomeProductPreview />
      </div>
    </div>
  );
}
