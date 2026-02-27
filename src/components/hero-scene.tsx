"use client";

import { useEffect, useRef } from "react";

export function HeroScene() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onMove = (event: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rx = (0.5 - y) * 18;
      const ry = (x - 0.5) * 22;

      root.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      root.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    };

    const reset = () => {
      root.style.setProperty("--rx", "0deg");
      root.style.setProperty("--ry", "0deg");
    };

    root.addEventListener("mousemove", onMove);
    root.addEventListener("mouseleave", reset);

    return () => {
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div className="scene-shell" ref={rootRef}>
      <div className="scene-core">
        <div className="scene-card scene-card-main">
          <p>AI CREATIVE DIRECTION</p>
          <span>CINEMATIC OUTPUT</span>
        </div>
        <div className="scene-card scene-card-left">
          <p>ADS</p>
        </div>
        <div className="scene-card scene-card-right">
          <p>SHORT FORM</p>
        </div>
        <div className="scene-ring scene-ring-one" />
        <div className="scene-ring scene-ring-two" />
      </div>
    </div>
  );
}
