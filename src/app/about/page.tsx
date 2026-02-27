import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Approach, process, and collaboration model behind AWOD.AI cinematic visual production.",
};

export default function AboutPage() {
  return (
    <>
      <main className="page-top page-theme-about">
        <section className="section guided-section guided-start about-intro-section">
          <div className="shell page-hero">
            <p className="home-chapter-tag">Chapter 01</p>
            <p className="section-kicker">About</p>
            <h1 className="section-title">Clear, Visionary, Cinematic</h1>
            <p className="section-copy">
              I build AI visuals for brands and creatives who want premium
              aesthetics with faster production cycles. The focus is always
              function-first: each asset should support message, momentum, and
              conversion.
            </p>
          </div>
        </section>

        <section className="section guided-section about-principles-section">
          <div className="shell">
            <header className="page-section-head">
              <p className="home-chapter-tag">Chapter 02</p>
              <p className="section-kicker">Operating Principles</p>
              <h2 className="section-title">A process designed for clarity and speed.</h2>
              <p className="section-copy">
                The workflow keeps quality high while reducing decision friction for clients.
              </p>
            </header>
            <div className="card-grid page-card-grid">
              <article className="glass-card">
                <h3>How I Work</h3>
                <ul>
                  <li>1. Brief clarity: hook, message, CTA.</li>
                  <li>2. Creative direction and visual exploration.</li>
                  <li>3. Fast AI production loops with quality control.</li>
                  <li>4. Delivery in launch-ready formats.</li>
                </ul>
              </article>
              <article className="glass-card">
                <h3>Who It Is For</h3>
                <ul>
                  <li>Agencies needing speed and premium output.</li>
                  <li>Founders launching products or campaigns.</li>
                  <li>Artists and creatives using AI as a leverage layer.</li>
                </ul>
              </article>
              <article className="glass-card">
                <h3>Founder-Led Collaboration</h3>
                <p>
                  You work directly with the founder from first brief to final
                  delivery. That keeps decisions fast, quality consistent, and
                  communication clear throughout production.
                </p>
                <p>
                  The goal is simple: visuals that look premium and support real
                  campaign outcomes, not aesthetic output without strategic value.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section guided-section guided-end about-cta-section">
          <div className="shell cta-band">
            <div>
              <p className="home-chapter-tag">Chapter 03</p>
              <p className="section-kicker">Collaboration</p>
              <h2 className="section-title">Ready to build your next visual system?</h2>
            </div>
            <Link className="button-primary" href="/contact">
              Start a Project
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
