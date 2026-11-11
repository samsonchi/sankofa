"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

/**
 * Scroll-driven focus effect: content is softly blurred and dimmed while it is
 * entering or leaving the viewport, and becomes sharp + fully opaque when it
 * sits in the reader's focus band. Kept subtle (max ~5px) to preserve
 * readability. Disabled under prefers-reduced-motion.
 */
export function FocusBlur({
  children,
  className,
  maxBlur = 5,
  minOpacity = 0.45,
}: {
  children: React.ReactNode;
  className?: string;
  maxBlur?: number;
  minOpacity?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Sharp plateau through the middle of the travel; blur/dim at the edges.
  const blur = useTransform(
    scrollYProgress,
    [0, 0.32, 0.68, 1],
    [maxBlur, 0, 0, maxBlur],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.32, 0.68, 1],
    [minOpacity, 1, 1, minOpacity],
  );
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{ filter, opacity, willChange: "filter, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
