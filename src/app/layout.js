import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import PWAPrompt from "./components/PWAPrompt";

export const metadata = {
  title: "Target95+ | ICSE & ISC Computer Science Learning",
  description: "A production-ready learning platform for Java practice, mock tests, and study resources.",
  themeColor: "#3b82f6",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Target95+",
  },
  icons: {
    icon: "/icon-192x192.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
        <PWAPrompt />
      </body>
    </html>
  );
}