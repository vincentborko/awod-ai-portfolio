"use client";

import { useEffect, useState } from "react";

const railItems = [
  { id: "trust", label: "Trust", href: "#trust" },
  { id: "proof", label: "Proof", href: "#proof" },
  { id: "decision-path", label: "Path", href: "#decision-path" },
  { id: "portfolio-preview", label: "Work", href: "#portfolio-preview" },
  { id: "faq", label: "FAQ", href: "#faq" },
  { id: "social", label: "Social", href: "#social" },
  { id: "book", label: "Book", href: "/contact" },
];

export function HomeRail() {
  const [activeId, setActiveId] = useState("trust");

  useEffect(() => {
    const sectionIds = ["trust", "proof", "decision-path", "portfolio-preview", "faq", "social"];

    const onScroll = () => {
      let current = "trust";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.34) current = id;
      }

      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <aside className="home-rail" aria-label="Quick navigation">
      {railItems.map((item) => {
        const isActive = item.id === "book" ? false : activeId === item.id;
        return (
          <a
            key={item.label}
            href={item.href}
            className={`${isActive ? "is-active" : ""}${item.id === "book" ? " is-book" : ""}`.trim()}
            aria-current={isActive ? "true" : undefined}
          >
            <span className="home-rail-dot" aria-hidden />
            <span>{item.label}</span>
          </a>
        );
      })}
    </aside>
  );
}
