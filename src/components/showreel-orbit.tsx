"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  type PanInfo,
} from "motion/react";

type ShowreelVideo = {
  title: string;
  src: string;
};

type ShowreelOrbitProps = {
  videos: ShowreelVideo[];
};

const SPRING_CONFIG = { damping: 40, stiffness: 120, mass: 1 };
const AUTO_SPEED = 0.1; // degrees per frame

export function ShowreelOrbit({ videos }: ShowreelOrbitProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const safeVideos = useMemo(() => videos.slice(0, 12), [videos]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const [isDragging, setIsDragging] = useState(false);

  // Motion values for the orbit rotation
  const rawRotation = useMotionValue(0);
  const smoothRotation = useSpring(rawRotation, SPRING_CONFIG);
  const orbitDeg = useTransform(smoothRotation, (v) => `${v.toFixed(2)}deg`);

  // Auto-rotation
  const autoRef = useRef(true);
  const autoOffsetRef = useRef(0);

  useEffect(() => {
    let frameId = 0;
    const tick = () => {
      if (autoRef.current) {
        autoOffsetRef.current += AUTO_SPEED;
        rawRotation.set(rawRotation.get() + AUTO_SPEED);
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [rawRotation]);

  // Pause auto-rotation after interaction, resume after delay
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pauseAutoRotation = (ms = 1200) => {
    autoRef.current = false;
    clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      autoRef.current = true;
    }, ms);
  };

  // Drag handling via framer-motion pan gesture
  const dragStartRotation = useRef(0);

  const onPanStart = () => {
    setIsDragging(true);
    autoRef.current = false;
    clearTimeout(pauseTimerRef.current);
    dragStartRotation.current = rawRotation.get();
  };

  const onPan = (_: unknown, info: PanInfo) => {
    const delta = info.offset.x * 0.42;
    rawRotation.set(dragStartRotation.current + delta);
  };

  const onPanEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);
    // Apply velocity-based momentum
    const velocity = info.velocity.x * 0.15;
    const target = rawRotation.get() + velocity;
    animate(rawRotation, target, {
      type: "spring",
      velocity: info.velocity.x * 0.15,
      damping: 40,
      stiffness: 80,
      onComplete: () => {
        autoRef.current = true;
      },
    });
  };

  // Scroll-based pitch and depth
  useEffect(() => {
    if (!stageRef.current) return;

    const onScroll = () => {
      const stage = stageRef.current;
      const shell = shellRef.current;
      if (!stage || !shell) return;
      const rect = shell.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));
      const pitch = (progress - 0.5) * 24;
      const depth = (progress - 0.5) * 90;

      stage.style.setProperty("--scroll-pitch", `${pitch.toFixed(2)}deg`);
      stage.style.setProperty("--depth-shift", `${depth.toFixed(2)}px`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Responsive orbit radius
  useEffect(() => {
    const stage = stageRef.current;
    const scene = sceneRef.current;
    if (!stage || !scene) return;

    const updateOrbitMetrics = () => {
      const width = scene.clientWidth;
      const height = scene.clientHeight;
      const orbitRadius = Math.max(230, Math.min(width * 0.4, 620));
      const orbitOffsetY = Math.max(10, Math.min(height * 0.065, 56));

      stage.style.setProperty("--orbit-radius", `${orbitRadius.toFixed(1)}px`);
      stage.style.setProperty("--orbit-offset-y", `${orbitOffsetY.toFixed(1)}px`);
    };

    updateOrbitMetrics();
    window.addEventListener("resize", updateOrbitMetrics);
    return () => window.removeEventListener("resize", updateOrbitMetrics);
  }, []);

  if (safeVideos.length === 0) return null;

  const activeVideo = safeVideos[activeIndex] ?? safeVideos[0];
  const activeRatio = ratios[activeVideo.src] ?? 9 / 16;
  const activeOrientation =
    activeRatio >= 1.2 ? "is-landscape" : activeRatio <= 0.82 ? "is-portrait" : "is-square";

  const handleMetadata = (src: string, width: number, height: number) => {
    if (!width || !height) return;
    const ratio = width / height;
    setRatios((prev) => (prev[src] ? prev : { ...prev, [src]: ratio }));
  };

  return (
    <div className="showreel-shell" ref={shellRef}>
      <div className="showreel-sticky" ref={stageRef}>
        <div className="showreel-layout">
          <motion.div
            className={`showreel-scene ${isDragging ? "is-dragging" : ""}`}
            ref={sceneRef}
            onPanStart={onPanStart}
            onPan={onPan}
            onPanEnd={onPanEnd}
          >
            <div className="showreel-aura" aria-hidden="true" />
            <p className="showreel-hint">Drag to rotate</p>
            <motion.div
              className="showreel-orbit"
              aria-label="3D showreel orbit"
              style={{ "--orbit-rotation": orbitDeg } as CSSProperties & Record<string, unknown>}
            >
              {safeVideos.map((video, index) => {
                const ratio = ratios[video.src] ?? 9 / 16;
                const orientationClass =
                  ratio >= 1.2 ? "is-landscape" : ratio <= 0.82 ? "is-portrait" : "is-square";
                const style = {
                  "--item-index": String(index),
                  "--item-total": String(safeVideos.length),
                  "--card-ratio": ratio.toString(),
                } as CSSProperties;

                return (
                  <button
                    className={`showreel-orbit-card ${orientationClass} ${activeIndex === index ? "is-active" : ""}`}
                    key={video.src}
                    aria-label={`Showreel video ${index + 1}`}
                    onClick={() => {
                      setActiveIndex(index);
                      pauseAutoRotation();
                    }}
                    style={style}
                    type="button"
                  >
                    <video
                      src={video.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      onLoadedMetadata={(event) =>
                        handleMetadata(
                          video.src,
                          event.currentTarget.videoWidth,
                          event.currentTarget.videoHeight,
                        )
                      }
                    />
                  </button>
                );
              })}
            </motion.div>
          </motion.div>

          <article className="showreel-focus">
            <p className="section-kicker">Focused Asset</p>
            <div
              className={`showreel-focus-frame ${activeOrientation}`}
              style={{ aspectRatio: activeRatio.toString() }}
            >
              <video
                className="showreel-focus-player"
                key={activeVideo.src}
                src={activeVideo.src}
                controls
                preload="metadata"
                playsInline
                onLoadedMetadata={(event) =>
                  handleMetadata(
                    activeVideo.src,
                    event.currentTarget.videoWidth,
                    event.currentTarget.videoHeight,
                  )
                }
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
