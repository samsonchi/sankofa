import {
  ArrowRight,
  Sprout,
  Users,
  Recycle,
  Share2,
  Lightbulb,
  Compass,
  Palette,
  Target,
  Scale,
  Lock,
  ClipboardList,
} from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { Hero } from "@/components/home/hero";
import { StatsMarquee } from "@/components/home/stats-marquee";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { Typewriter } from "@/components/motion/typewriter";
import { FocusBlur } from "@/components/motion/focus-blur";

const VISION =
  "Every child, regardless of circumstance, has access to learning STREAM fundamentals through education rooted in their daily life, culture, and community.";

const approach = [
  {
    icon: Sprout,
    title: "Rooted in daily life",
    body: "Children learn STREAM fundamentals through the flora, fauna, water and food that surround them — concepts that resonate with their culture and context.",
  },
  {
    icon: Users,
    title: "Led by local mentors",
    body: "We empower community mentors to teach with what they already have, building self-reliance rather than dependence on outside resources.",
  },
  {
    icon: Recycle,
    title: "What's at hand",
    body: "No expensive labs or kits required. Lessons are designed around available, everyday materials so any community can begin.",
  },
  {
    icon: Share2,
    title: "Shared & improving",
    body: "Every lesson plan is shared openly, evaluated in the field, and refined together — a living library that grows with each contributor.",
  },
];

const streamLetters = [
  { letter: "S", word: "Science" },
  { letter: "T", word: "Technology" },
  { letter: "R", word: "Reading" },
  { letter: "E", word: "Engineering" },
  { letter: "A", word: "Art" },
  { letter: "M", word: "Mathematics" },
];

const pillars = [
  {
    eyebrow: "Group",
    image: "/image1.jpg",
    body: "The group currently comprises members from 14 countries—India, the USA, 10 from Africa, and 2 from Europe—working within three organizational groups: curricula, documentation and communication, and implementation.",
  },
  {
    eyebrow: "Goal",
    image: "/image2.jpg",
    body: "With help from organizations around the world, we are developing our core framework. To promote cultural, societal and environmental inclusion and sensitivity, we seek to teach STREAM using only what's at hand at the point of delivery—automatically establishing a bi-directional dialog.",
  },
  {
    eyebrow: "Implementation",
    image: "/image3.jpg",
    body: "To further simplify implementation, electronics will play no active role in actual “classes”—reasoning this will compel everyone involved to think through everything thoroughly—ensuring that ideas and concepts are presented clearly and concisely.",
  },
];

const outcomes = [
  "Self-confidence in acquiring new skills",
  "Self-reliance in designing and running their own activities",
  "Aspiration toward higher education",
  "Discovering a talent — and the desire to hone it",
];

const values = [
  { icon: Compass, label: "Courage" },
  { icon: Lightbulb, label: "Curiosity" },
  { icon: Palette, label: "Creativity" },
  { icon: Target, label: "Impact" },
  { icon: Scale, label: "Good judgement" },
];

const pilots = [
  {
    name: "Honda",
    place: "Tanzania",
    body: "An active pilot bringing STREAM learning to the community, with local teachers leading the way.",
  },
  {
    name: "Sadangi",
    place: "India",
    body: "Working alongside the Aashraa Foundation, which built trust through nutrition kits and health camps before learning began.",
  },
  {
    name: "New pilots",
    place: "Coming soon",
    body: "More communities are joining across Africa and beyond as the network grows through 2026.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />


      {/* Stats marquee */}
      <Section tone="ink" className="py-10 sm:py-12">
        <StatsMarquee />
      </Section>

      {/* What STREAM means · trust */}
      <Section tone="sunken">
        <div className="container-page">
          <FocusBlur className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-strong">
              What we bring
            </p>
            <h2 className="text-3xl sm:text-4xl">
              Sankofa brings STREAM to underserved communities
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Science, Technology, Reading, Engineering, Art and Mathematics —
              taught through daily life, culture and the resources already at
              hand.
            </p>
          </FocusBlur>

          <RevealGroup className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {streamLetters.map(({ letter, word }) => (
              <RevealItem key={letter}>
                <div className="h-full rounded-2xl border border-border bg-surface p-5 text-center shadow-sm">
                  <span className="font-display text-3xl font-semibold text-primary">
                    {letter}
                  </span>
                  <p className="mt-1 text-sm font-medium text-muted">{word}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <FocusBlur className="mt-10">
            <div className="rounded-2xl border-l-4 border-l-accent-strong border-y border-r border-border bg-surface p-7 shadow-sm sm:p-8">
              <p className="text-lg leading-relaxed text-foreground">
                Through this work, Sankofa builds trust with the communities it
                serves — a necessary step in community engagement, and one that
                is essential to IEEE Smart Village&apos;s core mission of
                Empowerment through Enterprise
              </p>
            </div>
          </FocusBlur>
        </div>
      </Section>

      {/* The idea */}
      <Section>
        <FocusBlur className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            eyebrow="The idea"
            title="Quality learning shouldn't depend on circumstance"
            description="Sankofa acts as a catalyst — empowering local mentors to teach STREAM fundamentals using what their communities already have. We honour the past through local knowledge and traditions, while opening doors to the future."
          />
          <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
            {/* invisible full text reserves space → no layout shift while typing */}
            <div className="relative">
              <p
                aria-hidden
                className="invisible font-display text-2xl font-semibold leading-snug"
              >
                &ldquo;{VISION}&rdquo;
              </p>
              <p className="absolute inset-0 font-display text-2xl font-semibold leading-snug text-foreground">
                <Typewriter text={`“${VISION}”`} />
              </p>
            </div>
            <p className="mt-5 text-sm font-medium uppercase tracking-wider text-accent-strong">
              Our vision
            </p>
          </div>
        </FocusBlur>
      </Section>

      {/* Group · Goal · Implementation */}
      <Section>
        <div className="container-page">
          <RevealGroup className="grid gap-y-16">
            {pillars.map(({ eyebrow, image, body }, i) => (
              <RevealItem key={eyebrow}>
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                  <TiltCard
                    className={`overflow-hidden rounded-2xl border border-border bg-surface shadow-sm ${
                      i % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={image}
                      alt={eyebrow}
                      width={768}
                      height={576}
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </TiltCard>
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-strong">
                      {eyebrow}
                    </p>
                    <p className="text-lg leading-relaxed text-foreground">
                      {body}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Approach */}
      <Section tone="sunken">
        <div className="container-page">
          <FocusBlur>
            <SectionHeader
              eyebrow="Our approach"
              title="A way of teaching that any community can begin"
            />
          </FocusBlur>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
            {approach.map(({ icon: Icon, title, body }) => (
              <RevealItem key={title}>
                <TiltCard className="h-full rounded-2xl border border-border bg-surface p-7 shadow-sm hover:shadow-xl">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl">{title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{body}</p>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Outcomes */}
      <Section>
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <FocusBlur>
            <SectionHeader
              eyebrow="What we look for"
              title="The outcomes that matter"
              description="Success isn't a test score. We look for children who grow in confidence and curiosity — and carry it forward."
            />
          </FocusBlur>
          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {outcomes.map((o, i) => (
              <RevealItem key={o}>
                <div className="flex h-full gap-4 rounded-xl border border-border bg-surface p-5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 font-display text-sm font-semibold text-accent-strong">
                    {i + 1}
                  </span>
                  <span className="leading-snug text-foreground">{o}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Pilots preview */}
      <Section tone="sunken">
        <div className="container-page">
          <FocusBlur className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              eyebrow="In the field"
              title="Pilot projects, community by community"
            />
            <ButtonLink href="/pilots" variant="ghost" size="sm">
              All pilot projects
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </FocusBlur>
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {pilots.map((p) => (
              <RevealItem key={p.name}>
                <TiltCard className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7 shadow-sm hover:shadow-xl">
                  <p className="text-sm font-semibold uppercase tracking-wider text-accent-strong">
                    {p.place}
                  </p>
                  <h3 className="mt-1 text-2xl">{p.name}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <div className="container-page">
          <FocusBlur>
            <SectionHeader
              eyebrow="What we stand for"
              title="The spirit of Sankofa"
              align="center"
              className="mx-auto"
            />
          </FocusBlur>
          <RevealGroup className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {values.map(({ icon: Icon, label }) => (
              <RevealItem key={label}>
                <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-2.5 text-foreground">
                  <Icon className="h-4 w-4 text-primary" aria-hidden />
                  <span className="font-medium">{label}</span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* CTA band */}
      <Section tone="sunken" className="py-16">
        <RevealGroup className="container-page grid gap-6 md:grid-cols-2">
          <RevealItem>
            <div className="flex h-full flex-col rounded-2xl bg-primary p-8 text-on-primary">
              <ClipboardList className="h-8 w-8 text-accent" aria-hidden />
              <h3 className="mt-4 text-2xl text-on-primary">
                Help us understand a community
              </h3>
              <p className="mt-2 leading-relaxed text-on-primary/85">
                Community surveys are essential to how we plan pilots and seek
                funding. Identities stay private — we only note a general area.
              </p>
              <div className="mt-6">
                <ButtonLink
                  href="https://www.linkedin.com/company/112653715"
                  variant="outline"
                  className="border-on-primary/30 bg-transparent text-on-primary hover:border-on-primary hover:text-on-primary"
                >
                  Take the survey
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
              </div>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-8">
              <Lock className="h-8 w-8 text-primary" aria-hidden />
              <h3 className="mt-4 text-2xl">For Sankofa volunteers</h3>
              <p className="mt-2 leading-relaxed text-muted">
                Access shared teaching materials, upload your own lesson ideas,
                and submit pilot reports through the controlled-access member
                portal.
              </p>
              <div className="mt-6">
                <ButtonLink href="/portal">
                  Enter the member portal
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </Section>
    </>
  );
}
