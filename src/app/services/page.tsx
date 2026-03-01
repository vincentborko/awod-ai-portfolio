import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI commercial assets, cinematic short-form production, and creative systems for scalable content output.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <main className="page-top page-theme-services">
        <section className="section guided-section guided-start services-intro-section">
          <div className="shell page-hero">
            <p className="home-chapter-tag">Chapter 01</p>
            <p className="section-kicker">Services</p>
            <h1 className="section-title">Built for Results, Not Just Output</h1>
            <p className="section-copy">
              Pricing is discussed in a booking call by design. Scope depends on
              goals, speed, and required output depth.
            </p>
          </div>
        </section>

        <section className="section guided-section services-offer-section">
          <div className="shell">
            <header className="page-section-head">
              <p className="home-chapter-tag">Chapter 02</p>
              <p className="section-kicker">Offer Stack</p>
              <h2 className="section-title">Services built for campaign execution.</h2>
              <p className="section-copy">
                Pick the output lane first, then scale depth and speed based on timeline.
              </p>
            </header>
            <div className="card-grid page-card-grid">
              {services.map((service) => (
                <article className="glass-card" key={service.title}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  <p className="service-scope-note">
                    Scope and quote are defined in the booking call based on
                    deliverables, timeline, and revision depth.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section guided-section guided-end services-cta-section">
          <div className="shell cta-band">
            <div>
              <p className="home-chapter-tag">Chapter 03</p>
              <p className="section-kicker">Next Step</p>
              <h2 className="section-title">Book a Call.</h2>
            </div>
            <Link className="button-primary" href="/contact">
              Book a Call
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
