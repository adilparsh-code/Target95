export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/dashboard", "/profile", "/settings", "/login", "/register", "/forgot-password"],
    },
    sitemap: "https://target95.vercel.app/sitemap.xml",
  };
}
