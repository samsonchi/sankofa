"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

/**
 * Animated statistic. If the value starts with an integer (e.g. "5+", "1M",
 * "14") the number counts up on first view; the remainder is kept as a suffix.
 * Non-numeric values (e.g. "STREAM") simply render.
 */
export function CountUpStat({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1400, bounce: 0 });

  useEffect(() => {
    if (!match) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = `${target}${suffix}`;
      return;
    }
    if (inView) mv.set(target);
  }, [inView, mv, target, suffix, match, reduce]);

  useEffect(() => {
    if (!match) return;
    return spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(v)}${suffix}`;
      }
    });
  }, [spring, suffix, match]);

  if (!match) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
