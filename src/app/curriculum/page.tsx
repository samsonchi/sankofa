import type { Metadata } from "next";
import {
  ArrowRight,
  FlaskConical,
  Cpu,
  BookOpen,
  Hammer,
  Palette,
  Calculator,
  Leaf,
  Droplets,
  Bird,
  Wheat,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Curriculum",
  description:
    "How Sankofa teaches STREAM — Science, Technology, Reading, Engineering, Art and Mathematics — through local culture and everyday materials.",
};

const stream = [
  { icon: FlaskConical, letter: "S", word: "Science", note: "Observing the natural world" },
  { icon: Cpu, letter: "T", word: "Technology", note: "Tools that solve real problems" },
  { icon: BookOpen, letter: "R", word: "Reading", note: "Reading & writing to communicate" },
  { icon: Hammer, letter: "E", word: "Engineering", note: "Designing and building" },
  { icon: Palette, letter: "A", word: "Art", note: "Expression and craft" },
  { icon: Calculator, letter: "M", word: "Mathematics", note: "Pattern, measure and logic" },
];

const principles = [
  {
    title: "Keep implementation in sight",
    body: "Every lesson is designed to be taught — by a local mentor, in a real classroom or under a tree — not to sit on a shelf. Practicality comes first.",
  },
  {
    title: "Teach with what's at hand",
    body: "Lessons draw on familiar elements from the surroundings — flora, fauna, water, food — so learning costs little and feels immediately relevant.",
  },
  {
    title: "Evaluate and improve together",
    body: "Mentors try a plan, record what happened, and feed it back. Each round of honest feedback makes the next version stronger.",
  },
  {
    title: "Translate and adapt",
    body: "Plans are shared so they can be translated and reshaped for each community — from English into Swahili and beyond.",
  },
];

const themes = [
  { icon: Leaf, label: "Flora" },
  { icon: Bird, label: "Fauna" },
  { icon: Droplets, label: "Water" },
  { icon: Wheat, label: "Food" },
];

export default function CurriculumPage() {
  return (
    <>
      <PageHero
        eyebrow="Curriculum"
        title="STREAM, taught through the world children already know"
        description="Sankofa lessons turn everyday surroundings into a laboratory. The goal is not memorisation, but confidence, curiosity and the ability to design and build."
      />

      {/* STREAM breakdown */}
      <Section>
        <div className="container-page">
          <SectionHeader
            eyebrow="What STREAM means"
            title="Six disciplines, one connected way of learning"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stream.map(({ icon: Icon, letter, word, note }) => (
              <div
                key={word}
                className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 font-display text-xl font-semibold text-primary">
                  {letter}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-accent-strong" aria-hidden />
                    <h3 className="text-lg">{word}</h3>
                  </div>
                  <p className="mt-1 text-sm leading-snug text-muted">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Principles */}
      <Section tone="sunken">
        <div className="container-page">
          <SectionHeader
            eyebrow="How a Sankofa lesson works"
            title="Principles behind every plan"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-surface p-7 shadow-sm"
              >
                <span className="font-display text-3xl font-semibold text-accent/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Themes */}
      <Section>
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            eyebrow="Starting points"
            title="Drawn from familiar surroundings"
            description="A single theme — the plants outside, the water people carry, the food they grow — can open the door to every STREAM discipline at once."
          />
          <ul className="grid grid-cols-2 gap-4">
            {themes.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent-strong">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <span className="font-display text-xl">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* CTA to repository */}
      <Section tone="ink" className="py-16">
        <div className="container-page flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl text-[#f3ebdb]">
              The full lesson library lives in the member portal
            </h2>
            <p className="mt-3 leading-relaxed text-[#c9b89c]">
              Teaching materials are shared with controlled access — so we know
              where they&rsquo;re used and can keep improving them together.
              Volunteers can browse and contribute lesson plans there.
            </p>
          </div>
          <ButtonLink href="/portal/materials" size="lg" className="shrink-0">
            Open the repository
            <ArrowRight className="h-5 w-5" aria-hidden />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
