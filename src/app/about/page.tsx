import type { Metadata } from "next";
import Image from "next/image";
import { BookOpenCheck, Radio, Rocket, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Sankofa is a volunteer-led initiative, affiliated with IEEE Smart Village, with members across more than a dozen countries.",
};

const groups = [
  {
    icon: BookOpenCheck,
    title: "Curricula",
    body: "Designs, reviews and field-tests lesson plans, keeping implementation and honest feedback at the centre of every idea.",
  },
  {
    icon: Radio,
    title: "Communication",
    body: "Tells the story of Sankofa and its pilots, organises shared resources, and keeps the global network connected.",
  },
  {
    icon: Rocket,
    title: "Implementation",
    body: "Runs community surveys, supports new pilots, and turns plans into learning on the ground.",
  },
];

const leadership = [
  {
    name: "Toby Cumberbatch",
    role: "Chair, ISV Education Committee",
    org: "Cooper Union · USA",
    photo: "/members/Cumberbatch.jpg",
  },
  {
    name: "Salamatu Sani",
    role: "Co-Founder, Sankofa",
    org: "IEEE Smart Village · Nigeria",
    photo: "/members/Salamatu.jpg",
  },
];

const countries = [
  "Nigeria", "India", "Tanzania", "Ghana", "Kenya", "Uganda", "Zambia",
  "Malawi", "Cameroon", "Namibia", "South Africa", "DR Congo", "Tunisia",
  "Rwanda", "USA", "England", "Scotland", "Austria", "Italy",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A volunteer movement, rooted in many places at once"
        description="Sankofa is led by volunteers who balance full-time jobs, families and travel — and who believe quality learning should reach every community. We are affiliated with IEEE Smart Village."
      />

      {/* Story */}
      <Section>
        <div className="container-prose">
          <div className="space-y-5 text-lg leading-relaxed text-foreground">
            <p>
              The name <strong>Sankofa</strong> comes from the Akan people of
              West Africa — a bird that turns its head backward to retrieve a
              precious egg. It means{" "}
              <em>&ldquo;go back and fetch it&rdquo;</em>: the past holds wisdom
              worth carrying forward.
            </p>
            <p>
              That spirit shapes everything we do. We honour local knowledge and
              traditions, and use them as the foundation for STREAM learning —
              Science, Technology, Reading, Engineering, Art and Mathematics —
              taught with the resources a community already has.
            </p>
            <p>
              Sankofa acts as a catalyst, empowering local mentors rather than
              replacing them. Our working group spans members from more than a
              dozen countries across Africa, India, Europe and the USA, organised
              into three groups that keep the work moving.
            </p>
          </div>
        </div>
      </Section>

      {/* Working groups */}
      <Section tone="sunken">
        <div className="container-page">
          <SectionHeader
            eyebrow="How we're organised"
            title="Three working groups, one mission"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {groups.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-surface p-7 shadow-sm"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Leadership */}
      <Section>
        <div className="container-page">
          <SectionHeader
            eyebrow="Stewardship"
            title="Guiding the initiative"
            description="Sankofa grew out of the IEEE Smart Village education community. Full volunteer profiles are being added — if you're a member, your photo and bio are welcome."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
            {leadership.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <Image
                  src={p.photo}
                  alt={p.name}
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg leading-tight">{p.name}</h3>
                  <p className="text-sm text-primary">{p.role}</p>
                  <p className="text-sm text-muted">{p.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Global reach */}
      <Section tone="sunken">
        <div className="container-page">
          <SectionHeader
            eyebrow="A global network"
            title="Volunteers across the world"
            align="center"
            className="mx-auto"
          />
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {countries.map((c) => (
              <li
                key={c}
                className="rounded-full border border-border-strong bg-surface px-4 py-2 text-sm font-medium text-foreground"
              >
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <ButtonLink href="/contact">
              Join the network
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
