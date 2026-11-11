import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, CalendarDays } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { pilots, statusStyles } from "@/lib/pilots";

export const metadata: Metadata = {
  title: "Pilot Projects",
  description:
    "Sankofa pilot projects bring community-led STREAM education to communities across Africa, India and beyond.",
};

export default function PilotsPage() {
  const featured = pilots.filter((p) => p.story);
  const rest = pilots.filter((p) => !p.story);

  return (
    <>
      <PageHero
        eyebrow="Pilot Projects"
        title="Learning that grows, community by community"
        description="Each pilot is shaped by the place it serves. To protect privacy, communities are identified only by general area — our target is at least one Sankofa-led pilot in every volunteer country by the end of 2026."
      />

      <Section>
        <div className="container-page">
          {/* Pilots with a full story, image side alternating */}
          <div className="mb-12 space-y-8">
            {featured.map((p, i) => {
              const story = p.story!;
              return (
                <Link
                  key={p.slug}
                  href={`/pilots/${p.slug}`}
                  className="group grid overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md md:grid-cols-2"
                >
                  <div
                    className={`relative aspect-[4/3] md:aspect-auto md:min-h-full ${
                      i % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={story.hero.src}
                      alt={story.hero.alt}
                      fill
                      priority={i === 0}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-col p-7 sm:p-9">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                      <span className="rounded-full bg-accent/15 px-3 py-0.5 text-xs font-semibold text-accent-strong">
                        {story.tag}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" aria-hidden />
                        <time dateTime={story.dateTime}>{story.date}</time>
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-muted">
                      <MapPin className="h-4 w-4 text-accent-strong" aria-hidden />
                      {p.country} · {p.name}
                    </div>

                    <h2 className="mt-2 text-2xl sm:text-3xl">
                      <span className="bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
                        {story.title}
                      </span>
                    </h2>

                    <p className="mt-4 leading-relaxed text-muted">
                      {story.lead}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-1.5 font-medium text-primary">
                      Read the full story
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((p) => (
              <article
                key={p.slug}
                className="flex flex-col rounded-2xl border border-border bg-surface p-7 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-muted">
                      <MapPin className="h-4 w-4 text-accent-strong" aria-hidden />
                      {p.country}
                    </div>
                    <h2 className="mt-1 text-2xl">{p.name}</h2>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[p.status]}`}
                  >
                    {p.status}
                  </span>
                </div>
                <p className="mt-4 leading-relaxed text-muted">{p.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-dashed border-border-strong bg-surface-sunken p-8 text-center">
            <h2 className="text-2xl">Could your community be next?</h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted">
              We&rsquo;re actively seeking new pilots and the community surveys
              that make them possible. If you&rsquo;d like to start a Sankofa
              programme, we&rsquo;d love to hear from you.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact">
                Get in touch
                <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/portal/reporting" variant="outline">
                Submit a pilot report
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
