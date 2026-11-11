"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]';

/**
 * Figma-style custom cursor: a precise dot that tracks tightly, plus a soft
 * brown glow that trails with spring lag for depth. Enabled only on
 * precise-pointer (mouse) devices with motion enabled; otherwise renders
 * nothing and the native cursor is used.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Dot: snappy. Glow: heavier mass = visible lag.
  const dotX = useSpring(x, { stiffness: 900, damping: 40, mass: 0.25 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40, mass: 0.25 });
  const glowX = useSpring(x, { stiffness: 130, damping: 18, mass: 0.7 });
  const glowY = useSpring(y, { stiffness: 130, damping: 18, mass: 0.7 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine.matches || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-ready");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const el = e.target as Element | null;
      setActive(Boolean(el?.closest(INTERACTIVE)));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = (e: PointerEvent) => {
      if (!e.relatedTarget) setHidden(true);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointerout", onLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerout", onLeave);
      document.documentElement.classList.remove("cursor-ready");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block"
    >
      {/* Brown glow — trails with lag */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={{
            scale: active ? 1.9 : pressed ? 0.8 : 1,
            opacity: hidden ? 0 : active ? 0.55 : 0.35,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 44,
            height: 44,
            background:
              "radial-gradient(circle, rgba(92,71,51,0.55) 0%, rgba(92,71,51,0) 70%)",
            filter: "blur(2px)",
          }}
        />
      </motion.div>

      {/* Precise dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={{
            scale: active ? 0.4 : pressed ? 0.7 : 1,
            opacity: hidden ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary"
          style={{ width: 10, height: 10 }}
        />
      </motion.div>

      {/* Ring that appears over interactive targets */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={{
            scale: active ? 1 : 0,
            opacity: active && !hidden ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/50"
          style={{ width: 40, height: 40 }}
        />
      </motion.div>
    </div>
  );
}
