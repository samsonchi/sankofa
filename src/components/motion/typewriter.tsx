"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Reveals text character-by-character with a blinking caret. Runs on mount
 * (so a page refresh restarts it). Full text is exposed to assistive tech via
 * aria-label while the animated copy is aria-hidden. Static under
 * prefers-reduced-motion.
 */
export function Typewriter({
  text,
  className,
  speed = 26,
  startDelay = 400,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
  as?: "span" | "p";
}) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (reduce) {
      setCount(text.length);
      setDone(true);
      return;
    }
    let i = 0;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        setDone(true);
        return;
      }
      const ch = text[i - 1];
      const pause = /[.,;:]/.test(ch) ? 240 : ch === " " ? 12 : 0;
      timer.current = setTimeout(tick, speed + Math.random() * 38 + pause);
    };
    timer.current = setTimeout(tick, startDelay);
    return () => clearTimeout(timer.current);
  }, [text, speed, startDelay, reduce]);

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {!done && <span aria-hidden="true" className="type-caret" />}
    </Tag>
  );
}
