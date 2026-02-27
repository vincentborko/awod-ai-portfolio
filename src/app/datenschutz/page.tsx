import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy according to GDPR and TDDDG.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="page-top">
        <section className="section guided-section guided-start">
          <div className="shell page-hero">
            <p className="section-kicker">Legal</p>
            <h1 className="section-title">Privacy Policy</h1>
            <p>
              This policy explains how personal data is processed when you use
              this website.
            </p>
          </div>
        </section>

        <section className="section guided-section guided-end">
          <div className="shell">
            <div className="faq-list">
              <article className="faq-item">
                <strong>1. Data Controller</strong>
                <p>
                  The controller responsible for data processing on this website
                  under GDPR is:
                  <br />
                  Awedis Mosoyan
                  <br />
                  Detmolder str. 20, 10713 Berlin, Germany
                  <br />
                  Email: Awedis.m@web.de
                  <br />
                  Phone: 01777809035
                </p>
              </article>

              <article className="faq-item">
                <strong>2. Processing Purposes and Legal Bases</strong>
                <p>
                  Personal data is processed to provide a functional website,
                  respond to inquiries, support project initiation, and display
                  portfolio content.
                </p>
                <p>
                  The main legal bases are Art. 6(1)(f) GDPR (legitimate
                  interest in secure and efficient operations), Art. 6(1)(b)
                  GDPR (pre-contractual communication and appointment booking),
                  and, where applicable, Art. 6(1)(a) GDPR (consent).
                </p>
              </article>

              <article className="faq-item">
                <strong>3. Hosting and Server Log Files</strong>
                <p>
                  This website is hosted by Vercel. When the website is
                  accessed, technically necessary connection data may be
                  processed (for example IP address, date/time, requested URL,
                  referrer, user agent, and status codes) to deliver the
                  service and detect misuse or errors.
                </p>
                <p>
                  Legal basis: Art. 6(1)(f) GDPR. Recipient: hosting provider.
                  More information:
                  <br />
                  <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
                    https://vercel.com/legal/privacy-policy
                  </a>
                </p>
              </article>

              <article className="faq-item">
                <strong>4. Contact by Email or Phone</strong>
                <p>
                  If you contact us, we process your details and message content
                  to handle your request.
                </p>
                <p>
                  Legal basis: Art. 6(1)(b) GDPR (pre-contractual) or
                  Art. 6(1)(f) GDPR.
                </p>
              </article>

              <article className="faq-item">
                <strong>5. Appointment Booking via Calendly</strong>
                <p>
                  The booking page includes a Calendly integration. When used,
                  data may be transmitted to and processed by Calendly (for
                  example contact details, booked slot, and technical connection
                  data).
                </p>
                <p>
                  Legal basis: Art. 6(1)(b) GDPR (appointment initiation and
                  organization) and Art. 6(1)(f) GDPR. Calendly privacy details:
                  <br />
                  <a href="https://calendly.com/legal/privacy-notice" target="_blank" rel="noreferrer">
                    https://calendly.com/legal/privacy-notice
                  </a>
                </p>
              </article>

              <article className="faq-item">
                <strong>6. External Content (Instagram/YouTube)</strong>
                <p>
                  Portfolio areas can include external content (Instagram embeds
                  and YouTube no-cookie embeds). Loading these elements can
                  transmit personal data (for example IP address and technical
                  usage data) to the respective providers.
                </p>
                <p>
                  Provider policies:
                  <br />
                  <a href="https://privacycenter.instagram.com/policy" target="_blank" rel="noreferrer">
                    https://privacycenter.instagram.com/policy
                  </a>
                  <br />
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                    https://policies.google.com/privacy
                  </a>
                </p>
              </article>

              <article className="faq-item">
                <strong>7. Recipients, Processing Agreements, Third-Country Transfers</strong>
                <p>
                  Data is shared only when required for operating the website and
                  its functions, for example with hosting and appointment
                  providers.
                </p>
                <p>
                  If providers are outside the EU/EEA or data is transferred to
                  third countries, transfers are based on legal safeguards (for
                  example EU Standard Contractual Clauses or adequacy decisions,
                  where applicable).
                </p>
              </article>

              <article className="faq-item">
                <strong>8. Storage Duration</strong>
                <p>
                  Personal data is stored only as long as necessary for the
                  relevant purpose or as required by legal retention duties.
                </p>
                <p>
                  Communication data is generally deleted after the request is
                  completed unless legal or contractual reasons require retention.
                </p>
              </article>

              <article className="faq-item">
                <strong>9. Your Rights</strong>
                <p>
                  You have the right of access, rectification, erasure,
                  restriction of processing, data portability, and objection.
                  Consent can be withdrawn at any time with effect for the
                  future.
                </p>
              </article>

              <article className="faq-item">
                <strong>10. Right to Lodge a Complaint</strong>
                <p>
                  You have the right to lodge a complaint with a data protection
                  supervisory authority. Responsible authority in Berlin:
                  <br />
                  Berlin Commissioner for Data Protection and Freedom of
                  Information
                  <br />
                  Alt-Moabit 59-61, 10555 Berlin
                  <br />
                  Email: mailbox@datenschutz-berlin.de
                  <br />
                  <a href="https://www.datenschutz-berlin.de/kontakt.html" target="_blank" rel="noreferrer">
                    https://www.datenschutz-berlin.de/kontakt.html
                  </a>
                </p>
              </article>

              <article className="faq-item">
                <strong>11. Version and Updates</strong>
                <p>
                  Last updated: February 25, 2026. This policy may be updated if
                  legal, technical, or organizational conditions change.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
