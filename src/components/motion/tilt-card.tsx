"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Subtle pointer-reactive 3D tilt + lift for content cards.
 * Falls back to a plain div when reduced-motion is requested.
 */
export function TiltCard({
  children,
  className,
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const cfg = { stiffness: 200, damping: 20, mass: 0.5 };
  const rotateX = useSpring(rx, cfg);
  const rotateY = useSpring(ry, cfg);

  function move(e: React.PointerEvent) {
    if (reduce || !ref.current || e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div className="[perspective:900px]" onPointerMove={move} onPointerLeave={reset}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ translateZ: 8 }}
        className={cn("transition-shadow duration-300", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
