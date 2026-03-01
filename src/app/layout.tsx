import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteHeader } from "@/components/site-header";
import { UiMotionController } from "@/components/ui-motion-controller";
import { seoKeywords, site } from "@/data/site";
import "./globals.css";

const headingFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? site.siteUrl),
  title: {
    default: "AWOD.AI | Cinematic AI Portfolio",
    template: "%s | AWOD.AI",
  },
  description: site.description,
  keywords: seoKeywords,
  openGraph: {
    title: "AWOD.AI | Cinematic AI Portfolio",
    description: site.description,
    url: "/",
    siteName: "AWOD.AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AWOD.AI cinematic AI portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AWOD.AI | Cinematic AI Portfolio",
    description: site.description,
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <UiMotionController />
        <ScrollProgress />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
