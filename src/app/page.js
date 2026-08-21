import { Metadata } from "next";
import ClientHome from "./ClientHome";
import HomeVisualLayer from "./components/HomeVisualLayer";

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
      <HomeVisualLayer />
      <div className="relative z-10">
        <ClientHome />
      </div>
    </div>
  );
}
