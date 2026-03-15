import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Personal story, creative mission, and founder-led collaboration principles behind AWOD.AI.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <main className="page-top page-theme-about">
        <section className="section guided-section guided-start about-intro-section">
          <div className="shell page-hero about-intro-layout">
            <div className="about-intro-copy">
              <p className="home-chapter-tag">Chapter 01</p>
              <p className="section-kicker">About</p>
              <h1 className="section-title">I build work that people remember.</h1>
              <p className="section-copy">
                AWOD.AI is focused on clear visual storytelling, solid craft,
                and outputs that are usable in real campaigns.
              </p>
              <div className="about-profile-strip" aria-label="Founder profile highlights">
                <span>B.Sc. in Business Administration (Digital Economy)</span>
                <span>Based in Berlin</span>
                <span>Founder-led from first brief to final delivery</span>
              </div>
              <div className="about-reading-path" aria-label="Reading path">
                <span>Origin</span>
                <span>Shift</span>
                <span>Collaboration Fit</span>
              </div>
            </div>
            <div className="about-portrait-frame" aria-label="Portrait frame placeholder">
              <div className="about-portrait-placeholder" role="img" aria-label="Reserved founder portrait area">
                <span className="about-portrait-label">Founder Portrait</span>
                <span className="about-portrait-hint">4:5 vertical recommended</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section guided-section about-journey-section">
          <div className="shell about-journey-layout">
            <header className="page-section-head about-journey-head">
              <p className="home-chapter-tag">Chapter 02</p>
              <p className="section-kicker">My Shift</p>
              <h2 className="section-title">From experiments to client-focused production.</h2>
              <p className="section-copy">
                I started with social-first creative experiments. The reach was
                strong, but long-term value came from work tied to clear brand
                goals and practical delivery.
              </p>
            </header>
            <ol className="about-journey-track">
              <li className="about-journey-step about-journey-step-primary">
                <p className="about-story-label">Then</p>
                <h3>Creative experiments with strong reach.</h3>
                <p>
                  This phase proved fast concepting and audience attention, but
                  also showed the limits of trend-only content.
                </p>
              </li>
              <li className="about-journey-step">
                <p className="about-story-label">Now</p>
                <h3>AWOD.AI is focused on useful client outcomes.</h3>
                <p>
                  I have worked with AI tools for around 1.5 years and now focus
                  on campaign-ready visuals, clear process, and reliable quality.
                </p>
              </li>
              <li className="about-journey-step about-journey-step-quote">
                <p className="about-story-label">Why teams work with me</p>
                <h3>
                  AI tools move fast, and most teams cannot test every new workflow.
                </h3>
                <p>
                  I translate that speed into practical production pipelines that
                  stay aligned with brand quality.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="section guided-section about-fit-section">
          <div className="shell about-fit-shell">
            <header className="page-section-head">
              <p className="home-chapter-tag">Chapter 03</p>
              <p className="section-kicker">Collaboration Fit</p>
              <h2 className="section-title">How collaboration works.</h2>
            </header>
            <div className="about-fit-layout">
              <div className="about-fit-stack">
                <article className="about-fit-card">
                  <h3>Best fit clients</h3>
                  <p>Teams that value clear direction, fast feedback, and strong visual quality.</p>
                  <p>Projects with clear goals and realistic timelines.</p>
                </article>
                <article className="about-fit-card about-fit-card-alt">
                  <h3>Not the right fit</h3>
                  <p>Volume-only requests with no quality standards.</p>
                  <p>Projects without basic briefing clarity.</p>
                </article>
              </div>
              <article className="about-fit-card about-fit-card-pillars">
                <h3>What you can expect</h3>
                <div className="about-pillars" aria-label="Working style">
                  <span>Direct communication</span>
                  <span>Fast iteration loops</span>
                  <span>High quality control</span>
                  <span>Founder-level accountability</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section guided-section guided-end about-cta-section">
          <div className="shell cta-band">
            <div>
              <p className="home-chapter-tag">Chapter 04</p>
              <p className="section-kicker">Book the Call</p>
              <h2 className="section-title">If this fits your needs, let us plan the next sprint.</h2>
              <p>One short call to define scope, timeline, and next steps.</p>
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
