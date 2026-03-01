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
              <h1 className="section-title">I do not create content to fill feeds.</h1>
              <p className="section-copy">
                I build visuals that make people feel something and remember the
                brand behind it. AWOD.AI exists because reach without meaning is
                empty. My goal is to create work with message, quality, and
                momentum.
              </p>
              <div className="about-profile-strip" aria-label="Founder profile highlights">
                <span>23 years old</span>
                <span>B.Sc. in Business Administration - Digital Economy</span>
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
              <h2 className="section-title">From viral experiments to purposeful brand output.</h2>
              <p className="section-copy">
                I started by mixing League of Legends characters into new visual
                concepts on social media. The content reached hundreds of
                thousands of views, but I learned a hard truth: attention alone
                fades quickly when there is no purpose.
              </p>
            </header>
            <ol className="about-journey-track">
              <li className="about-journey-step about-journey-step-primary">
                <p className="about-story-label">Then</p>
                <h3>Creative curiosity with strong reach.</h3>
                <p>
                  The early phase proved I can build ideas people stop scrolling
                  for. It also showed me that novelty without a message cannot
                  sustain long-term motivation.
                </p>
              </li>
              <li className="about-journey-step">
                <p className="about-story-label">Now</p>
                <h3>AWOD.AI is built for real brand outcomes.</h3>
                <p>
                  I have worked with AI tools for about 1.5 years and shifted
                  AWOD.AI to branding-focused execution around six months ago.
                  Today the mission is clear: create premium assets with intent,
                  not noise.
                </p>
              </li>
              <li className="about-journey-step about-journey-step-quote">
                <p className="about-story-label">Why clients call</p>
                <h3>
                  Markets change weekly. Most teams do not have time to master
                  every AI shift.
                </h3>
                <p>
                  I help agencies, companies, and creatives stay current, act
                  faster, and use AI as a real advantage without losing brand
                  quality.
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
              <h2 className="section-title">How working with me feels.</h2>
            </header>
            <div className="about-fit-layout">
              <div className="about-fit-stack">
                <article className="about-fit-card">
                  <h3>Best fit clients</h3>
                  <p>Teams that want speed, clear direction, and premium execution.</p>
                  <p>People who value message and conversion over empty trend chasing.</p>
                </article>
                <article className="about-fit-card about-fit-card-alt">
                  <h3>Not the right fit</h3>
                  <p>Projects that only want cheap volume with no creative standard.</p>
                  <p>Teams that expect strategy-quality results without brief clarity.</p>
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
              <h2 className="section-title">If this feels aligned, let us map your next sprint.</h2>
              <p>One focused call. Clear scope, timeline, and next steps.</p>
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
