"use client";

import { useEffect, useMemo, useRef, useState, useCallback, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type AnimationPlaybackControls,
} from "motion/react";

type ShowreelVideo = {
  title: string;
  src: string;
};

type ShowreelOrbitProps = {
  videos: ShowreelVideo[];
};

const AUTO_SPEED = 6; // degrees per second
const DRAG_SENSITIVITY = 0.42;

export function ShowreelOrbit({ videos }: ShowreelOrbitProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const safeVideos = useMemo(() => videos.slice(0, 12), [videos]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const [isDragging, setIsDragging] = useState(false);

  const rotation = useMotionValue(0);
  const orbitDeg = useTransform(rotation, (v) => `${v.toFixed(2)}deg`);

  // Keep a handle to the current auto-rotation animation
  const autoAnimRef = useRef<AnimationPlaybackControls | null>(null);

  const startAutoRotation = useCallback(() => {
    // Start a long linear animation from current position
    const current = rotation.get();
    const target = current + 360 * 100; // enough for ~100 full loops
    autoAnimRef.current = animate(rotation, target, {
      duration: (360 * 100) / AUTO_SPEED,
      ease: "linear",
      repeat: 0,
    });
  }, [rotation]);

  const stopAutoRotation = useCallback(() => {
    if (autoAnimRef.current) {
      autoAnimRef.current.stop();
      autoAnimRef.current = null;
    }
  }, []);

  // Start auto-rotation on mount
  useEffect(() => {
    startAutoRotation();
    return () => stopAutoRotation();
  }, [startAutoRotation, stopAutoRotation]);

  // Drag handling
  const dragStartRotation = useRef(0);

  const onPanStart = useCallback(() => {
    setIsDragging(true);
    stopAutoRotation();
    dragStartRotation.current = rotation.get();
  }, [rotation, stopAutoRotation]);

  const onPan = useCallback(
    (_: unknown, info: PanInfo) => {
      rotation.set(dragStartRotation.current + info.offset.x * DRAG_SENSITIVITY);
    },
    [rotation],
  );

  const onPanEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      setIsDragging(false);
      const velocityDeg = info.velocity.x * DRAG_SENSITIVITY;

      if (Math.abs(velocityDeg) > 5) {
        animate(rotation, rotation.get() + velocityDeg * 0.4, {
          type: "decay",
          velocity: velocityDeg,
          power: 0.4,
          timeConstant: 200,
          onComplete: () => startAutoRotation(),
        });
      } else {
        startAutoRotation();
      }
    },
    [rotation, startAutoRotation],
  );

  const onCardClick = useCallback(
    (index: number) => {
      setActiveIndex(index);
      stopAutoRotation();
      setTimeout(() => startAutoRotation(), 1200);
    },
    [stopAutoRotation, startAutoRotation],
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
