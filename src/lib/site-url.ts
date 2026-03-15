import { site } from "@/data/site";

function normalizeBaseUrl(rawUrl?: string | null): string | null {
  if (!rawUrl) return null;

  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    return parsed.origin;
  } catch {
    return null;
  }
}

export function getBaseUrl() {
  return normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? normalizeBaseUrl(site.siteUrl) ?? "https://example.com";
}

export function toAbsoluteUrl(path: string, baseUrl = getBaseUrl()) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (path.startsWith("#")) {
    return `${baseUrl}/${path}`;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, `${baseUrl}/`).toString();
}
