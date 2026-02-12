import type { MetadataRoute } from "next";

const baseUrl = "https://lumachor.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/home", "/library", "/search"],
        disallow: ["/api/", "/chat/", "/_next/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
