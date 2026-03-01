import { socials } from "@/data/site";

export function SocialSection() {
  return (
    <section className="section guided-section home-social-section" id="social">
      <div className="shell">
        <div className="home-social-layout">
          <div className="home-social-copy">
            <p className="home-chapter-tag">Chapter 05</p>
            <p className="section-kicker">Social</p>
            <h2 className="section-title">Follow live creative output</h2>
            <p className="section-copy">
              Social channels give clients an ongoing view of current style,
              consistency, and execution quality.
            </p>
          </div>
          <div className="social-grid">
            {socials.map((social) => (
              <a
                key={social.href}
                className="social-card"
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${social.label} profile (${social.value})`}
              >
                <span className="social-card-intent">Click to open</span>
                <strong>{social.label}</strong>
                <span className="social-handle">{social.value}</span>
                <span className="social-card-action">
                  Open channel
                  <span className="social-card-arrow" aria-hidden>
                    ↗
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
