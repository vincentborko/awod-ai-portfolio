import type { Metadata } from "next";
import Link from "next/link";
import { CalendlyInline } from "@/components/calendly-inline";
import { SiteFooter } from "@/components/site-footer";
import { bookingDefaults, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Booking",
  description:
    "Book discovery and strategy calls directly on-site with inline Calendly scheduling.",
};

export default function ContactPage() {
  return (
    <>
      <main className="page-top page-theme-contact">
        <section className="section guided-section guided-start contact-intro-section">
          <div className="shell page-hero">
            <p className="home-chapter-tag">Chapter 01</p>
            <p className="section-kicker">Booking</p>
            <h1 className="section-title">Start a Project Call</h1>
            <p className="section-copy">
              Book a discovery or strategy call. We align on goals, required
              deliverables, and timeline before project start.
            </p>
            <div className="hero-cta-row">
              <a className="button-secondary" href={`mailto:${site.email}`}>
                Email Directly
              </a>
            </div>
          </div>
        </section>

        <section className="section guided-section contact-calendly-section" id="booking-inline">
          <div className="shell">
            <p className="home-chapter-tag">Chapter 02</p>
            <p className="section-kicker">Inline Booking</p>
            <h2 className="section-title">Book directly on this page</h2>
            <p className="section-copy">
              Choose your slot below without leaving the website.
            </p>
            <CalendlyInline url={site.calendlyUrl} />
          </div>
        </section>

        <section className="section guided-section contact-info-section">
          <div className="shell">
            <header className="page-section-head">
              <p className="home-chapter-tag">Chapter 03</p>
              <p className="section-kicker">Call Logistics</p>
              <h2 className="section-title">Everything needed before we start.</h2>
              <p className="section-copy">
                Use this as a checklist so the first call moves straight into execution.
              </p>
            </header>
            <div className="card-grid page-card-grid">
              <article className="glass-card">
                <h3>Call Types</h3>
                <ul>
                  {bookingDefaults.callTypes.map((callType) => (
                    <li key={callType}>{callType}</li>
                  ))}
                </ul>
              </article>

              <article className="glass-card">
                <h3>Pre-Call Information</h3>
                <ul>
                  <li>Business type and campaign objective</li>
                  <li>Preferred content formats</li>
                  <li>Timeline and expected delivery window</li>
                </ul>
              </article>

              <article className="glass-card">
                <h3>EU Standard Availability</h3>
                <ul>
                  <li>Timezone: {bookingDefaults.timezone}</li>
                  <li>Availability: {bookingDefaults.availability}</li>
                  <li>Booking handled directly via inline Calendly widget.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section guided-section guided-end contact-cta-section">
          <div className="shell cta-band">
            <div>
              <p className="home-chapter-tag">Chapter 04</p>
              <p className="section-kicker">Primary CTA</p>
              <h2 className="section-title">Check availability and book.</h2>
            </div>
            <Link className="button-primary" href="#booking-inline">
              Jump to Booking Calendar
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
