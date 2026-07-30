import { Metadata } from "next";
import ClientHome from "./ClientHome";

export const metadata = {
  title: "Target95+ - Master ICSE & ISC Computer Science with AI",
  description: "Prepare for ICSE and ISC Computer Science board exams with AI-powered learning. Practice previous year questions, solve Java programs, and score 95+ with our comprehensive platform.",
  keywords: "ICSE computer science, ISC computer science, board exam preparation, AI learning, Java programming, previous year questions, CISCE study material",
  openGraph: {
    title: "Target95+ - Master ICSE & ISC Computer Science with AI",
    description: "Prepare for ICSE and ISC Computer Science board exams with AI-powered learning. Score 95+ with our comprehensive platform.",
    type: "website",
    locale: "en_IN",
    siteName: "Target95+",
  },
  twitter: {
    card: "summary_large_image",
    title: "Target95+ - Master ICSE & ISC Computer Science with AI",
    description: "Prepare for ICSE and ISC Computer Science board exams with AI-powered learning.",
  },
};

export default function Home() {
  return <ClientHome />;
}