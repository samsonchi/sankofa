"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { ArrowRight } from "lucide-react";

const headline = ["Every", "child", "deserves", "to", "learn,"];
const accentLine = "rooted in their own world.";

const wordContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const word: Variants = {
  hidden: { opacity: 0, y: "0.5em", rotateX: -40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Pointer-driven 3D tilt
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springCfg = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateX = useSpring(rx, springCfg);
  const rotateY = useSpring(ry, springCfg);

  function handlePointer(e: React.PointerEvent) {
    if (reduce || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 16);
    rx.set(-py * 16);
  }
  function resetTilt() {
    rx.set(0);
    ry.set(0);
  }

  // Scroll parallax for ambient orbs
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const orbA = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const orbB = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);

  return (
    <section ref={heroRef} className="relative overflow-hidden">
      {/* Background photo (darkened) + parallax orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/image.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.4]"
        />
        {/* extra darkening for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/30" />
        <motion.div
          style={{ y: orbA }}
          className="absolute -right-20 -top-24 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl"
        />
        <motion.div
          style={{ y: orbB }}
          className="absolute -left-24 top-40 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
        />
      </div>

      <div className="container-page grid items-center gap-12 pb-24 pt-16 sm:pb-32 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-44 lg:pt-28">
        {/* Copy */}
        <div>
      

          <h1 className="text-balance text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl [perspective:600px]">
            <motion.span
              className="inline-block"
              variants={wordContainer}
              initial={reduce ? false : "hidden"}
              animate="visible"
            >
              {headline.map((w, i) => (
                <motion.span
                  key={i}
                  variants={word}
                  className="mr-[0.25em] inline-block [transform-style:preserve-3d]"
                >
                  {w}
                </motion.span>
              ))}
              <motion.span variants={word} className="inline-block text-accent">
                {accentLine}
              </motion.span>
            </motion.span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80"
          >
            Sankofa brings Science, Technology, Reading, Engineering, Art and
            Mathematics to underserved communities, taught through daily life,
            culture and the resources already at hand. Through this work,
            Sankofa builds trust with the communities it serves — a necessary
            step in community engagement, and one that is essential to IEEE
            Smart Village&apos;s core mission of Empowerment through Enterprise
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <motion.span whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/curriculum"
                className="inline-flex h-13 min-h-[44px] items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-on-primary shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-primary-hover hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Explore the curriculum
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </motion.span>
            <motion.span whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="https://bit.ly/3TP3E0S"
                className="inline-flex h-13 min-h-[44px] items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-7 text-base font-medium text-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Take the community survey
              </Link>
            </motion.span>
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6 text-sm text-white/70"
          >
            <span className="font-medium text-white">Sankofa</span> — an
            Akan word: &ldquo;go back and fetch it.&rdquo; Learning drawn from
            heritage, built for the future.
          </motion.p>
        </div>

        {/* 3D tilt image */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative mx-auto w-full max-w-md [perspective:1200px]"
          onPointerMove={handlePointer}
          onPointerLeave={resetTilt}
        >
          <motion.div
            ref={cardRef}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* depth: soft glow behind */}
            <div
              aria-hidden
              style={{ transform: "translateZ(-60px)" }}
              className="absolute inset-6 rounded-[2rem] bg-primary/20 blur-2xl"
            />
            {/* depth: offset plate */}
            <div
              aria-hidden
              style={{ transform: "translateZ(-20px)" }}
              className="absolute inset-0 translate-x-4 translate-y-5 rounded-3xl bg-secondary/20"
            />
            {/* the carving */}
            <div
              style={{ transform: "translateZ(0px)" }}
              className="relative grid aspect-square place-items-center overflow-hidden rounded-3xl border border-border-strong bg-surface p-10 shadow-2xl"
            >
              <Image
                src="/logo.png"
                alt="Sankofa logo"
                width={812}
                height={812}
                priority
                sizes="(max-width: 1024px) 90vw, 38vw"
                className="h-full w-full object-contain"
              />
              {/* sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/15"
              />
            </div>

            {/* depth: floating gold egg orb */}
            <motion.div
              aria-hidden
              style={{ transform: "translateZ(70px)" }}
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-5 top-10 h-16 w-16 rounded-full bg-gradient-to-br from-accent to-accent-strong shadow-lg ring-4 ring-background"
            />
            {/* depth: floating badge */}
            <motion.div
              style={{ transform: "translateZ(50px)" }}
              animate={reduce ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-5 rounded-2xl border border-border bg-surface/90 px-4 py-3 shadow-xl backdrop-blur"
            >
              <p className="font-display text-2xl font-semibold leading-none text-primary">
                14
              </p>
              <p className="mt-1 text-xs text-muted">countries, one mission</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="pointer-events-none absolute bottom-[120px] left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-white/50 p-1.5"
        >
          <span className="h-1.5 w-1 rounded-full bg-white/70" />
        </motion.div>
      </motion.div>

      {/* Dripping-paint divider — cream pours up out of the page background */}
      <svg
        aria-hidden
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 block h-[60px] w-full text-background sm:h-[90px] lg:h-[110px]"
      >
        <path
          fill="currentColor"
          d="M0,130 L0,60 C30,60 38,22 70,24 C95,26 92,64 120,66 C150,68 150,10 195,12 C235,14 230,74 265,76 C300,78 300,32 345,34 C385,36 382,70 415,72 C450,74 450,20 500,22 C545,24 540,76 580,78 C615,80 615,38 660,40 C700,42 695,6 740,8 C780,10 778,72 815,74 C850,76 850,30 895,32 C935,34 930,70 965,72 C1000,74 1000,18 1050,20 C1095,22 1090,76 1130,78 C1165,80 1165,36 1210,38 C1250,40 1245,8 1290,10 C1330,12 1328,68 1365,70 C1400,72 1400,32 1440,34 L1440,130 Z"
        />
      </svg>
    </section>
  );
}
