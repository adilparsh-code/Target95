import "./globals.css";
import AuthProviderWrapper from "./components/AuthProviderWrapper";
import { ThemeProvider } from "./components/ThemeProvider";
import PWAPrompt from "./components/PWAPrompt";
import OfflineBanner from "./components/OfflineBanner";
import IOSInstallPrompt from "./components/IOSInstallPrompt";

export const metadata = {
  title: {
    default: "Target95+ | ICSE & ISC Computer Science Learning",
    template: "%s | Target95+",
  },
  description:
    "Master ICSE & ISC Computer Science with AI-powered practice, mock tests, study material, and progress tracking. Learn Java programming interactively.",
  keywords: [
    "ICSE Computer Science",
    "ISC Computer Science",
    "Java Programming",
    "ICSE Java",
    "Computer Science Learning",
    "Target95",
    "ICSE Practice",
    "ISC Practice",
  ],
  authors: [{ name: "Target95+" }],
  creator: "Target95+",
  publisher: "Target95+",
  metadataBase: new URL("https://target95.vercel.app"),
  openGraph: {
    title: "Target95+ | ICSE & ISC Computer Science Learning",
    description:
      "Master ICSE & ISC Computer Science with AI-powered practice, mock tests, and progress tracking.",
    url: "https://target95.vercel.app",
    siteName: "Target95+",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Target95+ | ICSE & ISC Computer Science Learning",
    description:
      "Master ICSE & ISC Computer Science with AI-powered practice, mock tests, and progress tracking.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Target95+",
    startupImage: ["/apple-touch-icon.png"],
  },
  applicationName: "Target95+",
  icons: {
    icon: [
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-384x384.png", sizes: "384x384", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "format-detection": "telephone=no",
    "msapplication-TileColor": "#3b82f6",
    "msapplication-TileImage": "/icon-144x144.png",
  },
};

export const viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AuthProviderWrapper>
            <OfflineBanner />
            <div id="main-content">{children}</div>
          </AuthProviderWrapper>
          <PWAPrompt />
          <IOSInstallPrompt />
        </ThemeProvider>
      </body>
    </html>
  );
}