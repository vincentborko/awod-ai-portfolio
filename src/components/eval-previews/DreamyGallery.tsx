"use client";

import { useEffect, useRef, useState, useCallback, type CSSProperties } from "react";
import {
  motion, useMotionValue, useSpring, useAnimationFrame, useTransform, type PanInfo,
} from "motion/react";

type GalleryItem = { title: string; src: string };

const DREAMY_SPRING = { stiffness: 12, damping: 6, restDelta: 0.001 };

export function DreamyGallery({ items }: { items: GalleryItem[] }) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const rotation = useMotionValue(0);
  const orbitDeg = useTransform(rotation, (v) => `${v.toFixed(2)}deg`);
  const dragBoost = useSpring(0, DREAMY_SPRING);
  const isDraggingRef = useRef(false);

  useAnimationFrame((_time, delta) => {
    if (isDraggingRef.current) return;
    const v = dragBoost.get();
    if (Math.abs(v) > 0.001) rotation.set(rotation.get() + v * (delta / 1000));
  });

  const onPanStart = useCallback(() => { setIsDragging(true); isDraggingRef.current = true; dragBoost.jump(0); }, [dragBoost]);
  const onPan = useCallback((_: unknown, info: PanInfo) => { rotation.set(rotation.get() + info.delta.x * 0.3); }, [rotation]);
  const onPanEnd = useCallback((_: unknown, info: PanInfo) => {
    setIsDragging(false); isDraggingRef.current = false;
    dragBoost.jump(info.velocity.x * 0.4); dragBoost.set(0);
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
      stage.style.setProperty("--orbit-radius", `${Math.max(280, Math.min(scene.clientWidth * 0.44, 700)).toFixed(1)}px`);
      stage.style.setProperty("--orbit-offset-y", "0px");
    };
    update(); window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="dreamy-shell" ref={shellRef}>
      <div className="dreamy-stage" ref={stageRef}>
        <div className="dreamy-layout">
          <motion.div className={`dreamy-scene ${isDragging ? "is-dragging" : ""}`} ref={sceneRef}
            onPanStart={onPanStart} onPan={onPan} onPanEnd={onPanEnd}>
            <div className="dreamy-aura" aria-hidden="true" />
            <p className="dreamy-hint">Drag to explore</p>
            <motion.div className="dreamy-ring"
              style={{ "--orbit-rotation": orbitDeg } as CSSProperties & Record<string, unknown>}>
              {items.map((item, index) => {
                const ratio = ratios[item.src] ?? 0.75;
                const oc = ratio >= 1.2 ? "is-landscape" : ratio <= 0.82 ? "is-portrait" : "is-square";
                return (
                  <div className={`dreamy-card ${oc}`} key={item.src}
                    style={{ "--item-index": String(index), "--item-total": String(items.length), "--card-ratio": ratio.toString() } as CSSProperties}>
                    <img src={item.src} alt={item.title} draggable={false}
                      onLoad={(e) => {
                        const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
                        if (w && h) setRatios((prev) => (prev[item.src] ? prev : { ...prev, [item.src]: w / h }));
                      }} />
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
