"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <div className="shell">
        <div className="header-inner">
          <Link className="brand" href="/" onClick={() => setIsMenuOpen(false)}>
            {site.name}
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <Link className="header-cta" href="/contact">
            {site.primaryCta}
          </Link>
          <button
            type="button"
            className="header-menu-toggle"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      <div className={`mobile-nav-panel${isMenuOpen ? " is-open" : ""}`} id="mobile-nav-panel">
        <div className="shell mobile-nav-shell">
          <nav className="mobile-nav-links" aria-label="Mobile primary">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <Link className="header-cta mobile-nav-cta" href="/contact" onClick={() => setIsMenuOpen(false)}>
            {site.primaryCta}
          </Link>
        </div>
      </div>
    </header>
  );
}
