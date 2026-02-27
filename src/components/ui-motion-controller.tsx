"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const BUTTON_SELECTOR = ".button-primary, .button-secondary, .header-cta, .case-link";

export function UiMotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;
    body.classList.add("reveal-ready");

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main .section"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.16 },
    );

    sections.forEach((section, index) => {
      section.classList.remove("is-revealed");
      section.style.setProperty("--reveal-delay", `${Math.min(index * 35, 140)}ms`);
      observer.observe(section);
    });

    const buttons = Array.from(document.querySelectorAll<HTMLElement>(BUTTON_SELECTOR));
    const cleanup: Array<() => void> = [];

    buttons.forEach((button) => {
      const onMove = (event: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left) / Math.max(rect.width, 1);
        const y = (event.clientY - rect.top) / Math.max(rect.height, 1);
        const tiltX = (x - 0.5) * 2;
        const tiltY = (y - 0.5) * 2;
        button.style.setProperty("--tilt-x", tiltX.toFixed(3));
        button.style.setProperty("--tilt-y", tiltY.toFixed(3));
        button.classList.add("is-tilting");
      };

      const onLeave = () => {
        button.style.setProperty("--tilt-x", "0");
        button.style.setProperty("--tilt-y", "0");
        button.classList.remove("is-tilting");
      };

      button.addEventListener("mousemove", onMove);
      button.addEventListener("mouseleave", onLeave);
      button.addEventListener("blur", onLeave);
      cleanup.push(() => {
        button.removeEventListener("mousemove", onMove);
        button.removeEventListener("mouseleave", onLeave);
        button.removeEventListener("blur", onLeave);
      });
    });

    return () => {
      observer.disconnect();
      cleanup.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
