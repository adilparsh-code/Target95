import "./globals.css";
import AuthProviderWrapper from "./components/AuthProviderWrapper";
import { ThemeProvider } from "./components/ThemeProvider";
import PWAPrompt from "./components/PWAPrompt";
import OfflineBanner from "./components/OfflineBanner";
import IOSInstallPrompt from "./components/IOSInstallPrompt";

export const metadata = {
  title: {
    default: "Target95+ | ICSE, ISC & CBSE Computer Science Learning",
    template: "%s | Target95+",
  },
  description:
    "Master ICSE, ISC & CBSE Computer Science and Information Technology with AI-powered practice, mock tests, study material, and progress tracking.",
  keywords: [
    "ICSE Computer Science",
    "ISC Computer Science",
    "CBSE Computer Science",
    "CBSE Information Technology",
    "Java Programming",
    "Python Programming",
    "Target95",
    "ICSE Practice",
    "ISC Practice",
    "CBSE Practice",
  ],
  authors: [{ name: "Target95+" }],
  creator: "Target95+",
  publisher: "Target95+",
  metadataBase: new URL("https://target95.vercel.app"),
  openGraph: {
    title: "Target95+ | ICSE, ISC & CBSE Computer Learning",
    description:
      "Master ICSE, ISC & CBSE with AI-powered practice, mock tests, and progress tracking.",
    url: "https://target95.vercel.app",
    siteName: "Target95+",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Target95+ | ICSE, ISC & CBSE Computer Learning",
    description:
      "AI-powered practice, mock tests, study material, and progress tracking.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProviderWrapper>
            <OfflineBanner />
            {children}
            <PWAPrompt />
            <IOSInstallPrompt />
          </AuthProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
