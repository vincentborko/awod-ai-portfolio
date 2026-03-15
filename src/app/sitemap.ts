import type { MetadataRoute } from "next";
import { getBaseUrl, toAbsoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const routes = [
    "/",
    "/portfolio",
    "/services",
    "/about",
    "/contact",
    "/impressum",
    "/datenschutz",
  ];

  return routes.map((route) => ({
    url: toAbsoluteUrl(route, baseUrl),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
