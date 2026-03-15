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

type OrbitItem = { title: string; src: string };

const SPRING_CONFIG = { stiffness: 50, damping: 20, restDelta: 0.01 };

export function OrbitCarousel({ items, baseVelocity = 6, dragSensitivity = 0.3, dragVelocityScale = 0.3 }: {
  items: OrbitItem[]; baseVelocity?: number; dragSensitivity?: number; dragVelocityScale?: number;
}) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const safeItems = useMemo(() => items.slice(0, 12), [items]);
  const [isDragging, setIsDragging] = useState(false);
  const rotation = useMotionValue(0);
  const orbitDeg = useTransform(rotation, (v) => `${v.toFixed(2)}deg`);
  const dragBoost = useSpring(0, SPRING_CONFIG);
  const isDraggingRef = useRef(false);

  useAnimationFrame((_time, delta) => {
    if (isDraggingRef.current) return;
    rotation.set(rotation.get() + (baseVelocity + dragBoost.get()) * (delta / 1000));
  });

  const onPanStart = useCallback(() => { setIsDragging(true); isDraggingRef.current = true; dragBoost.jump(0); }, [dragBoost]);
  const onPan = useCallback((_: unknown, info: PanInfo) => { rotation.set(rotation.get() + info.delta.x * dragSensitivity); }, [rotation, dragSensitivity]);
  const onPanEnd = useCallback((_: unknown, info: PanInfo) => {
    setIsDragging(false); isDraggingRef.current = false;
    dragBoost.jump(info.velocity.x * dragVelocityScale - baseVelocity); dragBoost.set(0);
  }, [dragBoost, dragVelocityScale, baseVelocity]);

  useEffect(() => {
    if (!stageRef.current) return;
    const onScroll = () => {
      const stage = stageRef.current, shell = shellRef.current;
      if (!stage || !shell) return;
      const rect = shell.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      stage.style.setProperty("--scroll-pitch", `${((progress - 0.5) * 24).toFixed(2)}deg`);
      stage.style.setProperty("--depth-shift", `${((progress - 0.5) * 90).toFixed(2)}px`);
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
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (safeItems.length === 0) return null;

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
              {safeItems.map((item, index) => (
                <div className="orbit-card" key={item.src}
                  style={{ "--item-index": String(index), "--item-total": String(safeItems.length), "--card-ratio": "1" } as CSSProperties}>
                  <img src={item.src} alt={item.title} draggable={false} />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
