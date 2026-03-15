"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { showreelVideos, stats } from "@/data/site";

const CURSOR_TRAIL_IMAGES = [
  "/media/trail/trail-01.jpg",
  "/media/trail/trail-02.jpg",
  "/media/trail/trail-03.jpg",
  "/media/trail/trail-04.jpg",
  "/media/trail/trail-05.jpg",
];

export function HeroVideoStage() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pointerInsideRef = useRef(false);
  const hasMovedRef = useRef(false);
  const trailEngagedRef = useRef(false);
  const hoverStartRef = useRef(0);
  const trailRevealStartRef = useRef(0);
  const pointerTargetRef = useRef({ x: 0.5, y: 0.45 });
  const thumbRefs = useRef<Array<HTMLElement | null>>([]);
  const trailRef = useRef(
    Array.from({ length: CURSOR_TRAIL_IMAGES.length }, () => ({
      x: 0.5,
      y: 0.45,
      alpha: 0,
    })),
  );
  const heroVideos = showreelVideos.map((video) => video.src);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLayerOne, setShowLayerOne] = useState(true);
  const [pointerInside, setPointerInside] = useState(false);
  const [trailEngaged, setTrailEngaged] = useState(false);
  const [trailLoopOffset, setTrailLoopOffset] = useState(0);
  const [layerOneSrc, setLayerOneSrc] = useState(heroVideos[0] ?? "");
  const [layerTwoSrc, setLayerTwoSrc] = useState(heroVideos[1] ?? heroVideos[0] ?? "");

  useEffect(() => {
    trailEngagedRef.current = trailEngaged;
  }, [trailEngaged]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onMove = (event: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        hoverStartRef.current = performance.now();
        trailRevealStartRef.current = hoverStartRef.current;
        setTrailEngaged(true);
      }
      pointerTargetRef.current = { x, y };
      stage.style.setProperty("--mx", `${x.toFixed(3)}`);
      stage.style.setProperty("--my", `${y.toFixed(3)}`);
    };

    const onLeave = () => {
      pointerInsideRef.current = false;
      hasMovedRef.current = false;
      trailRevealStartRef.current = 0;
      stage.style.setProperty("--mx", "0.5");
      stage.style.setProperty("--my", "0.45");
      setPointerInside(false);
      setTrailEngaged(false);
    };

    const onEnter = () => {
      pointerInsideRef.current = true;
      hasMovedRef.current = false;
      hoverStartRef.current = 0;
      trailRevealStartRef.current = 0;
      setPointerInside(true);
      setTrailEngaged(false);
      setTrailLoopOffset(0);
      trailRef.current.forEach((point) => {
        point.x = 0.5;
        point.y = 0.45;
        point.alpha = 0;
      });
    };

    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseenter", onEnter);
    stage.addEventListener("mouseleave", onLeave);

    return () => {
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseenter", onEnter);
      stage.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    let rafId = 0;
    const animateTrail = () => {
      const now = performance.now();
      const trail = trailRef.current;
      const target = pointerTargetRef.current;
      const engaged = pointerInsideRef.current && trailEngagedRef.current;
      const hoverDuration = engaged ? now - trailRevealStartRef.current : 0;
      const visibleCount = engaged
        ? Math.min(trail.length, Math.max(1, Math.floor(hoverDuration / 320) + 1))
        : 0;

      trail[0].x += (target.x - trail[0].x) * 0.28;
      trail[0].y += (target.y - trail[0].y) * 0.28;

      for (let index = 1; index < trail.length; index += 1) {
        trail[index].x += (trail[index - 1].x - trail[index].x) * 0.24;
        trail[index].y += (trail[index - 1].y - trail[index].y) * 0.24;
      }

      for (let index = 0; index < trail.length; index += 1) {
        const node = thumbRefs.current[index];
        if (!node) continue;
        const point = trail[index];
        const targetAlpha = index < visibleCount ? Math.max(0.2, 0.96 - index * 0.15) : 0;
        const lerpAlpha = targetAlpha > point.alpha ? 0.28 : 0.1;
        point.alpha += (targetAlpha - point.alpha) * lerpAlpha;
        const scale = 0.72 + point.alpha * 0.42;

        node.style.setProperty("--trail-x", `${(point.x * 100).toFixed(2)}%`);
        node.style.setProperty("--trail-y", `${(point.y * 100).toFixed(2)}%`);
        node.style.setProperty("--trail-opacity", point.alpha.toFixed(3));
        node.style.setProperty("--trail-scale", scale.toFixed(3));
      }

      rafId = window.requestAnimationFrame(animateTrail);
    };

    rafId = window.requestAnimationFrame(animateTrail);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (!pointerInside || !trailEngaged || CURSOR_TRAIL_IMAGES.length <= 1) return;

    const loop = window.setInterval(() => {
      setTrailLoopOffset((prev) => (prev + 1) % CURSOR_TRAIL_IMAGES.length);
    }, 880);

    return () => window.clearInterval(loop);
  }, [pointerInside, trailEngaged]);

  useEffect(() => {
    if (heroVideos.length <= 1) return;

    const interval = window.setInterval(() => {
      const nextIndex = (activeIndex + 1) % heroVideos.length;
      const nextSrc = heroVideos[nextIndex];

      if (showLayerOne) {
        setLayerTwoSrc(nextSrc);
      } else {
        setLayerOneSrc(nextSrc);
      }

      setShowLayerOne((prev) => !prev);
      setActiveIndex(nextIndex);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [activeIndex, heroVideos, showLayerOne]);

  return (
    <section className="home-hero" ref={stageRef}>
      <video
        className={`home-hero-video-layer ${showLayerOne ? "is-visible" : ""}`}
        src={layerOneSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      <video
        className={`home-hero-video-layer ${showLayerOne ? "" : "is-visible"}`}
        src={layerTwoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      <div className={`home-hero-cursor-layer ${pointerInside ? "is-active" : ""}`} aria-hidden="true">
        {CURSOR_TRAIL_IMAGES.map((image, index) => {
          const loopedIndex = (trailLoopOffset + index) % CURSOR_TRAIL_IMAGES.length;
          const source = CURSOR_TRAIL_IMAGES[loopedIndex] ?? image;
          const thumbStyle = {
            "--thumb-ox": `${[0, -9, 10, -8, 6][index] ?? 0}px`,
            "--thumb-oy": `${[0, 4, 8, 12, 16][index] ?? 0}px`,
            "--thumb-width": `${[124, 118, 112, 106, 100][index] ?? 112}px`,
            "--thumb-rot": `${[-3, 3, -2, 2, -1][index] ?? 0}deg`,
          } as CSSProperties;

          return (
            <article
              className="home-hero-thumb"
              key={index}
              ref={(node) => {
                thumbRefs.current[index] = node;
              }}
              style={thumbStyle}
            >
              <div className="home-hero-thumb-frame">
                <Image alt="" fill sizes="124px" src={source} />
              </div>
            </article>
          );
        })}
      </div>
      <div className="home-hero-vfx-grid" aria-hidden="true" />
      <div className="home-hero-vfx-glow" aria-hidden="true" />
      <div className="home-hero-vfx-noise" aria-hidden="true" />

      <div className="shell home-hero-content">
        <p className="section-kicker">AI Creative Portfolio</p>
        <h1 className="home-hero-title">
          Cinematic AI Assets
          <span>Built for revenue moments.</span>
        </h1>
        <p className="home-hero-copy">
          Campaign visuals engineered for attention, brand trust, and clear next actions.
        </p>
        <div className="hero-cta-row">
          <Link className="button-primary" href="/contact">
            Book a Call
          </Link>
          <Link className="button-secondary" href="/portfolio">
            View Portfolio
          </Link>
        </div>
        <div className="home-hero-metrics">
          {stats.map((item) => (
            <article key={item.label} className="home-hero-metric">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
