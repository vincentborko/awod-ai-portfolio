"use client";

import { useEffect, useRef, useState, useCallback, type CSSProperties } from "react";
import {
  motion, useMotionValue, useSpring, useAnimationFrame, useTransform, type PanInfo,
} from "motion/react";

type ReelItem = { title: string; src: string };

const SPRING = { stiffness: 50, damping: 20, restDelta: 0.01 };

export function ShowreelPreview({ items }: { items: ReelItem[] }) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const [isDragging, setIsDragging] = useState(false);
  const rotation = useMotionValue(0);
  const orbitDeg = useTransform(rotation, (v) => `${v.toFixed(2)}deg`);
  const dragBoost = useSpring(0, SPRING);
  const isDraggingRef = useRef(false);

  useAnimationFrame((_time, delta) => {
    if (isDraggingRef.current) return;
    rotation.set(rotation.get() + (6 + dragBoost.get()) * (delta / 1000));
  });

  const onPanStart = useCallback(() => { setIsDragging(true); isDraggingRef.current = true; dragBoost.jump(0); }, [dragBoost]);
  const onPan = useCallback((_: unknown, info: PanInfo) => { rotation.set(rotation.get() + info.delta.x * 0.3); }, [rotation]);
  const onPanEnd = useCallback((_: unknown, info: PanInfo) => {
    setIsDragging(false); isDraggingRef.current = false;
    dragBoost.jump(info.velocity.x * 0.3 - 6); dragBoost.set(0);
  }, [dragBoost]);

  useEffect(() => {
    if (!stageRef.current) return;
    const onScroll = () => {
      const stage = stageRef.current, shell = shellRef.current;
      if (!stage || !shell) return;
      const rect = shell.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      stage.style.setProperty("--scroll-pitch", `${((p - 0.5) * 24).toFixed(2)}deg`);
      stage.style.setProperty("--depth-shift", `${((p - 0.5) * 90).toFixed(2)}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  useEffect(() => {
    const stage = stageRef.current, scene = sceneRef.current;
    if (!stage || !scene) return;
    const update = () => {
      stage.style.setProperty("--orbit-radius", `${Math.max(230, Math.min(scene.clientWidth * 0.4, 620)).toFixed(1)}px`);
      stage.style.setProperty("--orbit-offset-y", "0px");
    };
    update(); window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleMeta = (src: string, w: number, h: number) => {
    if (!w || !h) return;
    setRatios((prev) => (prev[src] ? prev : { ...prev, [src]: w / h }));
  };

  const active = items[activeIndex];
  const aRatio = ratios[active.src] ?? 9 / 16;
  const aOrient = aRatio >= 1.2 ? "is-landscape" : aRatio <= 0.82 ? "is-portrait" : "is-square";

  return (
    <div className="orbit-shell" ref={shellRef}>
      <div className="orbit-stage" ref={stageRef}>
        <div className="orbit-layout">
          <motion.div className={`orbit-scene ${isDragging ? "is-dragging" : ""}`} ref={sceneRef}
            onPanStart={onPanStart} onPan={onPan} onPanEnd={onPanEnd}>
            <div className="orbit-aura" aria-hidden="true" />
            <p className="orbit-hint">Drag to rotate</p>
            <motion.div className="orbit-ring"
              style={{ "--orbit-rotation": orbitDeg } as CSSProperties & Record<string, unknown>}>
              {items.map((item, index) => {
                const ratio = ratios[item.src] ?? 9 / 16;
                const oc = ratio >= 1.2 ? "is-landscape" : ratio <= 0.82 ? "is-portrait" : "is-square";
                return (
                  <button className={`orbit-card ${oc} ${activeIndex === index ? "is-active" : ""}`}
                    key={item.src} onClick={() => setActiveIndex(index)} type="button"
                    style={{ "--item-index": String(index), "--item-total": String(items.length), "--card-ratio": ratio.toString() } as CSSProperties}>
                    <video src={item.src} autoPlay loop muted playsInline preload="metadata"
                      onLoadedMetadata={(e) => handleMeta(item.src, e.currentTarget.videoWidth, e.currentTarget.videoHeight)} />
                  </button>
                );
              })}
            </motion.div>
          </motion.div>
          <article className="orbit-focus">
            <div className={`orbit-focus-frame ${aOrient}`} style={{ aspectRatio: aRatio.toString() }}>
              <video className="orbit-focus-player" key={active.src} src={active.src} controls preload="metadata" playsInline
                onLoadedMetadata={(e) => handleMeta(active.src, e.currentTarget.videoWidth, e.currentTarget.videoHeight)} />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
