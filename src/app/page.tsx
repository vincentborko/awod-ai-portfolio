import type { Metadata } from "next";
import Link from "next/link";
import { HeroVideoStage } from "@/components/hero-video-stage";
import { HomeRail } from "@/components/home-rail";
import { SiteFooter } from "@/components/site-footer";
import { SocialSection } from "@/components/social-section";
import { TickerStrip } from "@/components/ticker-strip";
import {
  cases,
  decisionPath,
  faqs,
  services,
  site,
  socials,
  tickerItems,
  toCaseAnchor,
  trustSignals,
} from "@/data/site";
import { getBaseUrl, toAbsoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Cinematic AI visuals for agencies, founders, and artists. Explore portfolio, services, and direct booking.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const baseUrl = getBaseUrl();
  const organizationId = toAbsoluteUrl("#organization", baseUrl);
  const websiteId = toAbsoluteUrl("#website", baseUrl);
  const serviceId = toAbsoluteUrl("#service", baseUrl);
  const faqId = toAbsoluteUrl("#faq", baseUrl);

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        url: baseUrl,
        logo: toAbsoluteUrl("/media/branding/awod-icon.png", baseUrl),
        email: `mailto:${site.email}`,
        sameAs: socials.map((social) => social.href),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: baseUrl,
        name: site.name,
        publisher: {
          "@id": organizationId,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: site.name,
        description: site.description,
        url: baseUrl,
        areaServed: "EU and international (remote)",
        provider: {
          "@id": organizationId,
        },
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
        />
        <HomeRail />
        <HeroVideoStage />

        <section className="section section-tight guided-section guided-start home-ticker-section">
          <div className="shell">
            <TickerStrip items={tickerItems} />
          </div>
        </section>

        <section className="section section-tight guided-section home-trust-section" id="trust">
          <div className="shell home-trust-shell">
            {trustSignals.map((signal) => (
              <article className="home-trust-item" key={signal.label}>
                <p>{signal.label}</p>
                <strong>{signal.value}</strong>
                <span>{signal.note}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section guided-section home-story-section" id="proof">
          <div className="shell">
            <div className="home-story-layout">
              <header className="home-chapter-head">
                <p className="home-chapter-tag">Chapter 01</p>
                <p className="section-kicker">What You Get</p>
                <h2 className="section-title">Clear creative direction and delivery.</h2>
                <p className="section-copy">
                  Each project follows a structured path from brief to final, platform-ready assets.
                </p>
              </header>
              <div className="service-flow-grid">
                {services.map((service, index) => (
                  <article className="service-flow-card" key={service.title}>
                    <p className="service-flow-index">{String(index + 1).padStart(2, "0")}</p>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <div className="service-flow-pills">
                      {service.details.map((detail) => (
                        <span key={detail}>{detail}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section guided-section home-path-section" id="decision-path">
          <div className="shell">
            <div className="home-path-head">
              <div>
                <p className="home-chapter-tag">Chapter 02</p>
                <p className="section-kicker">Decision Path</p>
                <h2 className="section-title">Three simple steps to start.</h2>
              </div>
              <Link className="button-primary" href="/contact">
                Book a Call
              </Link>
            </div>
            <div className="home-path-grid">
              {decisionPath.map((step, index) => (
                <article className="path-step-card" key={step.title}>
                  <p className="path-step-index">{String(index + 1).padStart(2, "0")}</p>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                  <Link className="path-step-link" href={step.href}>
                    {step.action}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section guided-section home-work-section" id="portfolio-preview">
          <div className="shell">
            <div className="home-work-head">
              <div>
                <p className="home-chapter-tag">Chapter 03</p>
                <p className="section-kicker">Selected Work</p>
                <h2 className="section-title">Selected client work.</h2>
                <p className="section-copy">
                  Preview selected projects here. Full case breakdowns and assets are in the portfolio.
                </p>
              </div>
              <Link className="button-secondary" href="/portfolio">
                Open Full Portfolio
              </Link>
            </div>
            <div className="home-work-mosaic">
              {cases.map((item, index) => {
                const isPrimary = index === 0;
                return (
                <Link
                  className={`work-tile-link${isPrimary ? " is-primary" : ""}`}
                  href={`/portfolio#${toCaseAnchor(item.name)}`}
                  key={item.name}
                  aria-label={`View ${item.name} in portfolio`}
                >
                  <article className={`work-tile tone-${(index % 3) + 1}`}>
                    {isPrimary ? <span className="work-tile-intent">Start Here</span> : null}
                    <p className="work-tile-index">Case {String(index + 1).padStart(2, "0")}</p>
                    <h3>{item.name}</h3>
                    <p className="work-tile-headline">{item.headline}</p>
                    <p className="work-tile-outcome">{item.outcome}</p>
                    <div className="work-tile-meta">
                      <span>{item.industry}</span>
                      <span>{item.formats}</span>
                    </div>
                    <p className="work-tile-click-hint">View case details</p>
                  </article>
                </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section guided-section home-faq-section" id="faq">
          <div className="shell">
            <div className="home-faq-layout">
              <header className="home-faq-head">
                <p className="home-chapter-tag">Chapter 04</p>
                <p className="section-kicker">Buyer FAQ</p>
                <h2 className="section-title">Common questions before booking.</h2>
                <p className="section-copy">
                  Short answers on scope, timing, licensing, and onboarding.
                </p>
              </header>
              <div className="faq-pillar-list">
                {faqs.map((faq, index) => (
                  <details className="faq-pillar-item" key={faq.question}>
                    <summary className="faq-pillar-trigger">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{faq.question}</p>
                    </summary>
                    <div className="faq-pillar-panel">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SocialSection />

        <section className="section guided-section guided-end home-cta-section">
          <div className="shell cta-band">
            <div>
              <p className="section-kicker">Primary Conversion</p>
              <h2 className="section-title">Need assets for your next campaign?</h2>
            </div>
            <div className="hero-cta-row">
              <Link className="button-primary" href="/contact">
                Book a Call
              </Link>
              <Link className="button-secondary" href="/services">
                Explore Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
