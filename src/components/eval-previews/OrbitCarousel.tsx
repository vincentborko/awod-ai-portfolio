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
import { OrbitCard } from "./OrbitCard";

type OrbitItem = { title: string; src: string };

export type DepthEffects = {
  /** Cards closer scale up, further scale down */
  scale?: { front: number; back: number };
  /** Darken overlay opacity (0 = none, 1 = full black) */
  darken?: { front: number; back: number };
  /** Blur in px */
  blur?: { front: number; back: number };
  /** Card opacity */
  opacity?: { front: number; back: number };
};

const SPRING_CONFIG = { stiffness: 50, damping: 20, restDelta: 0.01 };

export function OrbitCarousel({ items, baseVelocity = 6, dragSensitivity = 0.3, dragVelocityScale = 0.3, depthEffects }: {
  items: OrbitItem[]; baseVelocity?: number; dragSensitivity?: number; dragVelocityScale?: number; depthEffects?: DepthEffects;
}) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const safeItems = useMemo(() => items.slice(0, 12), [items]);
  const [isDragging, setIsDragging] = useState(false);
  const rotation = useMotionValue(0);
  const orbitDeg = useTransform(rotation, (v) => `${v.toFixed(2)}deg`);
  const dragBoost = useSpring(0, SPRING_CONFIG);
  const isDraggingRef = useRef(false);
  const hasDepth = !!depthEffects;

  useAnimationFrame((_time, delta) => {
    if (!isDraggingRef.current) {
      rotation.set(rotation.get() + (baseVelocity + dragBoost.get()) * (delta / 1000));
    }

    // Update --depth-z on each card
    if (hasDepth) {
      const rot = rotation.get();
      const total = safeItems.length;
      for (let i = 0; i < total; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const angleDeg = ((360 / total) * i + rot) % 360;
        const angleRad = (angleDeg * Math.PI) / 180;
        // cos gives 1 at front (0°), -1 at back (180°). Normalize to 0–1.
        const depthZ = (Math.cos(angleRad) + 1) / 2;
        el.style.setProperty("--depth-z", depthZ.toFixed(3));
      }
    }
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
      stage.style.setProperty("--orbit-radius", `${Math.max(150, Math.min(scene.clientWidth * 0.26, 380)).toFixed(1)}px`);
      stage.style.setProperty("--orbit-offset-y", "0px");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (safeItems.length === 0) return null;

  // Build CSS custom properties for depth effect config on the ring
  const depthVars: Record<string, string> = {};
  if (depthEffects?.scale) {
    depthVars["--de-scale-front"] = String(depthEffects.scale.front);
    depthVars["--de-scale-back"] = String(depthEffects.scale.back);
  }
  if (depthEffects?.darken) {
    depthVars["--de-darken-front"] = String(depthEffects.darken.front);
    depthVars["--de-darken-back"] = String(depthEffects.darken.back);
  }
  if (depthEffects?.blur) {
    depthVars["--de-blur-front"] = String(depthEffects.blur.front);
    depthVars["--de-blur-back"] = String(depthEffects.blur.back);
  }
  if (depthEffects?.opacity) {
    depthVars["--de-opacity-front"] = String(depthEffects.opacity.front);
    depthVars["--de-opacity-back"] = String(depthEffects.opacity.back);
  }

  return (
    <div className="orbit-shell" ref={shellRef}>
      <div className="orbit-stage" ref={stageRef}>
        <div className="orbit-layout">
          <motion.div className={`orbit-scene ${isDragging ? "is-dragging" : ""}`} ref={sceneRef}
            onPanStart={onPanStart} onPan={onPan} onPanEnd={onPanEnd}>
            <div className="orbit-aura" aria-hidden="true" />
            <p className="orbit-hint">Drag to rotate</p>
            <motion.div className="orbit-ring"
              style={{ "--orbit-rotation": orbitDeg, ...depthVars } as CSSProperties & Record<string, unknown>}>
              {safeItems.map((item, index) => (
                <div className={`orbit-item ${hasDepth ? "has-depth" : ""}`} key={item.src}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  style={{ "--item-index": String(index), "--item-total": String(safeItems.length), "--card-ratio": "1", "--depth-z": "0.5" } as CSSProperties}>
                  <OrbitCard darkenOverlay={!!depthEffects?.darken}>
                    <img src={item.src} alt={item.title} draggable={false} />
                  </OrbitCard>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
