import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/pagenotfound"],
    },
    sitemap: "https://www.sevenstarsecurity.com.np/sitemap.xml",
  };
}