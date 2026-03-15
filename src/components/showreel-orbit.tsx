"use client";

import { useEffect, useMemo, useRef, useState, useCallback, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationFrame,
  useTransform,
  type PanInfo,
} from "motion/react";

type ShowreelVideo = {
  title: string;
  src: string;
};

type ShowreelOrbitProps = {
  videos: ShowreelVideo[];
};

const BASE_VELOCITY = 6; // deg/s — auto-rotation speed
const DRAG_SENSITIVITY = 0.3; // px → deg during drag
const DRAG_VELOCITY_SCALE = 0.3; // px/ms → deg/s on release

// Spring that decays dragBoost back to 0 (= back to base velocity)
const BOOST_SPRING = { stiffness: 50, damping: 20, restDelta: 0.01 };

export function ShowreelOrbit({ videos }: ShowreelOrbitProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const safeVideos = useMemo(() => videos.slice(0, 12), [videos]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const [isDragging, setIsDragging] = useState(false);

  // Rotation angle — accumulated imperatively, never animated to a target
  const rotation = useMotionValue(0);
  const orbitDeg = useTransform(rotation, (v) => `${v.toFixed(2)}deg`);

  // Velocity boost from drag release — springs back to 0
  // Total velocity = BASE_VELOCITY + dragBoost
  // When dragBoost reaches 0, we're back to pure auto-rotation
  const dragBoostTarget = useMotionValue(0);
  const dragBoost = useSpring(dragBoostTarget, BOOST_SPRING);

  const isDraggingRef = useRef(false);

  // Single integration loop — always running, never stops
  useAnimationFrame((_time, delta) => {
    if (isDraggingRef.current) return;

    const velocity = BASE_VELOCITY + dragBoost.get();
    rotation.set(rotation.get() + velocity * (delta / 1000));
  });

  // Drag handlers
  const onPanStart = useCallback(() => {
    setIsDragging(true);
    isDraggingRef.current = true;
    dragBoostTarget.set(0);
    dragBoost.jump(0);
  }, [dragBoostTarget, dragBoost]);

  const onPan = useCallback(
    (_: unknown, info: PanInfo) => {
      rotation.set(rotation.get() + info.delta.x * DRAG_SENSITIVITY);
    },
    [rotation],
  );

  const onPanEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      setIsDragging(false);
      isDraggingRef.current = false;

      // Convert release velocity (px/ms) to deg/s, subtract base so spring decays to 0
      const releaseDegPerS = info.velocity.x * DRAG_VELOCITY_SCALE * 1000;
      const boost = releaseDegPerS - BASE_VELOCITY;
      dragBoostTarget.set(boost);
    },
    [dragBoostTarget],
  );

  const onCardClick = useCallback(
    (index: number) => {
      setActiveIndex(index);
    },
    [],
  );

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
                    onClick={() => onCardClick(index)}
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
