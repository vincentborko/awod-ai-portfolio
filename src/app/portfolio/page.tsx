import type { Metadata } from "next";
import Link from "next/link";
import { CaseAssetGallery } from "@/components/case-asset-gallery";
import { ShowreelOrbit } from "@/components/showreel-orbit";
import { SiteFooter } from "@/components/site-footer";
import { cases, showreelVideos, toCaseAnchor } from "@/data/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected AI creative projects, showreel videos, and case references for brands, artists, and agencies.",
};

export default function PortfolioPage() {
  return (
    <>
      <main className="page-top page-theme-portfolio">
        <section className="section guided-section guided-start portfolio-showreel-section">
          <div className="shell">
            <p className="home-chapter-tag">Chapter 01</p>
            <p className="section-kicker">Video Showreel</p>
            <h2 className="section-title">Immersive motion showreel</h2>
            <p className="section-copy">
              Assets are arranged in a continuously moving horizontal 3D carousel.
              The focus player changes only when you select a new clip.
            </p>
            <ShowreelOrbit videos={showreelVideos} />
          </div>
        </section>

        <section className="section guided-section portfolio-intro-section">
          <div className="shell page-hero">
            <p className="home-chapter-tag">Chapter 02</p>
            <p className="section-kicker">Portfolio</p>
            <h1 className="section-title">Proof-Led AI Case Studies</h1>
            <p className="section-copy">
              Structured work samples for agencies, artists, and brands. Each
              case is presented in a clear project arc: challenge, production
              system, and delivered outcome.
            </p>
            <div className="hero-cta-row">
              <Link className="button-primary" href="/contact">
                Start a Project
              </Link>
              <Link className="button-secondary" href="/services">
                Service Scope
              </Link>
            </div>
          </div>
        </section>

        <section className="section guided-section guided-end portfolio-cases-section">
          <div className="shell portfolio-story-shell">
            <div className="case-breakdown-stack">
              {cases.map((item, index) => {
                return (
                  <article className="featured-case" id={toCaseAnchor(item.name)} key={item.name}>
                    <div className="featured-case-orb" aria-hidden />
                    <header className="featured-case-head">
                      <p className="featured-case-label">
                        Case Study {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2 className="featured-case-title">{item.name}</h2>
                      <p className="featured-case-headline">{item.headline}</p>
                      <div className="featured-case-meta">
                        <span>{item.industry}</span>
                        <span>{item.formats}</span>
                        <span>{item.publicationStatus}</span>
                      </div>
                    </header>

                    <div className="featured-proof-grid">
                      {item.proof.map((point) => (
                        <div className="featured-proof-item" key={point.label}>
                          <p>{point.label}</p>
                          <strong>{point.value}</strong>
                        </div>
                      ))}
                    </div>

                    <div className="featured-case-body">
                      <div className="featured-case-column">
                        <h3>Challenge</h3>
                        <p>{item.challenge}</p>
                        <h3>Execution Pipeline</h3>
                        <ol className="case-process-list">
                          {item.process.map((step) => (
                            <li key={step.title}>
                              <strong>{step.title}</strong>
                              <p>{step.detail}</p>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="featured-case-column featured-result-panel">
                        <h3>Result</h3>
                        <p className="featured-case-outcome">{item.outcome}</p>
                        <h3>Project KPIs</h3>
                        <ul className="case-kpi-list">
                          {item.kpis.map((kpi) => (
                            <li key={kpi}>{kpi}</li>
                          ))}
                        </ul>
                        <p>
                          <strong>Solution:</strong> {item.solution}
                        </p>
                        <p>
                          <strong>Impact:</strong> {item.metrics}
                        </p>
                        <CaseAssetGallery caseName={item.name} assetLinks={item.assetLinks} />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="case-cta-strip">
              <p>
                Need this structure for your brand? We can build campaign-ready AI
                visual systems with fast review loops and platform-ready delivery.
              </p>
              <Link className="button-secondary" href="/contact">
                Book Strategy Call
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
