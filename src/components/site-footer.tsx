import Link from "next/link";
import { site, socials } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell">
        <p>AWOD.AI - Cinematic AI portfolio and booking platform.</p>
        <p>
          Contact: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p>
          {socials.map((social, index) => (
            <span key={social.href}>
              {index > 0 ? " | " : ""}
              <a href={social.href} target="_blank" rel="noreferrer">
                {social.label} ({social.value})
              </a>
            </span>
          ))}
        </p>
        <p>
          <Link href="/impressum">Legal Notice</Link> |{" "}
          <Link href="/datenschutz">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
}
