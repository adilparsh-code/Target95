import "./globals.css";
import "./stitch-home.css";
import AuthProviderWrapper from "./components/AuthProviderWrapper";
import { ThemeProvider } from "./components/ThemeProvider";
import AdaptiveLight from "./components/AdaptiveLight";
import PWAPrompt from "./components/PWAPrompt";
import OfflineBanner from "./components/OfflineBanner";
import IOSInstallPrompt from "./components/IOSInstallPrompt";
import { resolveSiteConfig } from "@/lib/siteConfig.mjs";

const site = resolveSiteConfig();

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
  metadataBase: new URL(site.origin),
  // Non-production deployments are never indexed (production metadata is unchanged).
  ...(site.indexable ? {} : { robots: { index: false, follow: false } }),
  openGraph: {
    title: "Target95+ | ICSE, ISC & CBSE Computer Learning",
    description:
      "Master ICSE, ISC & CBSE with AI-powered practice, mock tests, and progress tracking.",
    url: site.origin,
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
      <body className="site-body">
        <ThemeProvider>
          <AdaptiveLight />
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
