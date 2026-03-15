import type { MetadataRoute } from "next";
import { getBaseUrl, toAbsoluteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: toAbsoluteUrl("/sitemap.xml", baseUrl),
    host: baseUrl,
  };
}
