import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Provider identification and contact details.",
  alternates: {
    canonical: "/impressum",
  },
};

export default function LegalNoticePage() {
  return (
    <>
      <main className="page-top">
        <section className="section">
          <div className="shell page-hero">
            <p className="section-kicker">Legal</p>
            <h1 className="section-title">Legal Notice</h1>
            <p>
              <strong>Name:</strong>
              <br />
              Awedis Mosoyan
            </p>
            <p>
              <strong>Address:</strong>
              <br />
              Detmolder str. 20
              <br />
              10713 Berlin
              <br />
              Germany
            </p>
            <p>
              <strong>Contact:</strong>
              <br />
              Email: Awedis.m@web.de
              <br />
              Phone: 01777809035
            </p>
            <p>
              <strong>VAT identification number (Section 27a German VAT Act):</strong>
              <br />
              Not available.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
