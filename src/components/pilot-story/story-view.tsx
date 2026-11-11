import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, ImageIcon, MapPin } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { renderInline } from "@/lib/rich-text";
import { statusStyles, type Media, type PilotStatus, type PilotStory, type StoryBlock } from "@/lib/pilots";

/** The identity fields a story page needs from its pilot. */
export type StoryPilot = {
  slug: string;
  name: string;
  country: string;
  status: PilotStatus;
};

export const aspectClass = {
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[2/1]",
  tall: "aspect-[9/16]",
} as const;

/** Uploads previewed before they are written to /public arrive as blob:/data: URLs,
 *  which the image optimiser cannot fetch — those fall back to a plain <img>. */
function isOptimisable(src: string) {
  return src.startsWith("/") || src.startsWith("http");
}

function MediaImage({
  item,
  priority,
  sizes,
}: {
  item: Media;
  priority?: boolean;
  sizes: string;
}) {
  if (!item.src) {
    return (
      <div className="absolute inset-0 grid place-items-center text-muted">
        <ImageIcon className="h-8 w-8 opacity-40" aria-hidden />
      </div>
    );
  }

  if (!isOptimisable(item.src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.src}
        alt={item.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      priority={priority}
      sizes={sizes}
      className="object-cover"
    />
  );
}

export function MediaFrame({ item, priority }: { item: Media; priority?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className={`relative w-full bg-surface-sunken ${aspectClass[item.aspect]}`}>
        {item.kind === "image" ? (
          <MediaImage
            item={item}
            priority={priority}
            sizes="(min-width: 1024px) 42rem, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <video
            controls
            preload="none"
            playsInline
            poster={item.poster || undefined}
            aria-label={item.alt}
            className="absolute inset-0 h-full w-full bg-foreground object-cover"
          >
            <source src={item.src} type="video/mp4" />
            Your browser does not support embedded video. {item.alt}
          </video>
        )}
      </div>
      {item.caption && (
        <figcaption className="px-5 py-3 text-sm leading-relaxed text-muted">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Block({ block }: { block: StoryBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="container-prose mt-14 mb-5 text-2xl sm:text-3xl">
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p className="container-prose mb-6 text-lg leading-[1.75] text-foreground/85">
          {renderInline(block.text)}
        </p>
      );

    case "quote":
      return (
        <Reveal className="container-prose my-10">
          <blockquote className="border-l-4 border-primary bg-surface-sunken/70 py-5 pr-6 pl-6 sm:pl-8">
            <p className="font-display text-xl leading-snug font-semibold text-foreground sm:text-2xl">
              &ldquo;{block.text}&rdquo;
            </p>
            {block.attribution && (
              <footer className="mt-3 text-sm text-muted">
                — {block.attribution}
              </footer>
            )}
          </blockquote>
        </Reveal>
      );

    case "list":
      return (
        <ul className="container-prose mb-6 space-y-3">
          {block.items.map((item, i) => (
            <li
              key={`${item}-${i}`}
              className="relative pl-6 text-lg leading-[1.7] text-foreground/85 before:absolute before:top-[0.7em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent"
            >
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol className="container-prose mb-6 space-y-4">
          {block.items.map((item, i) => (
            <li key={`${item}-${i}`} className="flex gap-4">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {i + 1}
              </span>
              <span className="text-lg leading-[1.7] text-foreground/85">
                {renderInline(item)}
              </span>
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <Reveal className="container-prose my-10">
          {block.caption && (
            <h3 className="mb-3 text-xs font-semibold tracking-[0.14em] text-accent-strong uppercase">
              {block.caption}
            </h3>
          )}
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
            <table className="w-full min-w-[30rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-surface-sunken">
                  {block.columns.map((col, i) => (
                    <th
                      key={`${col}-${i}`}
                      scope="col"
                      className="px-5 py-3 text-sm font-semibold text-foreground"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map(([name, ...cells], i) => (
                  <tr
                    key={`${name}-${i}`}
                    className="border-b border-border last:border-0"
                  >
                    <th
                      scope="row"
                      className="px-5 py-3 font-medium text-foreground"
                    >
                      {name}
                    </th>
                    {cells.map((cell, j) => (
                      <td key={j} className="px-5 py-3 text-muted">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      );

    case "pathway":
      return (
        <Reveal className="container-prose my-8">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
            {block.steps.map((step, i) => (
              <li key={`${step}-${i}`} className="flex items-center gap-2">
                <span className="rounded-full border border-accent/30 bg-accent/12 px-4 py-1.5 text-sm font-semibold tracking-wide text-accent-strong uppercase">
                  {step}
                </span>
                {i < block.steps.length - 1 && (
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-border-strong"
                    aria-hidden
                  />
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      );

    case "media": {
      const single = block.items.length === 1;
      // A lone tall image would otherwise fill the full column height.
      const narrow =
        single &&
        block.items[0].aspect !== "landscape" &&
        block.items[0].aspect !== "wide";
      return (
        <Reveal className="mx-auto my-10 w-full max-w-4xl px-6">
          <div
            className={`grid gap-5 ${single ? "" : "sm:grid-cols-2"} ${narrow ? "mx-auto max-w-md" : ""}`}
          >
            {block.items.map((item, i) => (
              <MediaFrame key={`${item.src}-${i}`} item={item} />
            ))}
          </div>
        </Reveal>
      );
    }
  }
}

/**
 * The published pilot story layout. Rendered both by /pilots/[slug] and by the
 * live preview in /pilot/create, so what an author sees is what readers get.
 */
export function StoryArticle({
  pilot,
  story,
  backHref,
  children,
}: {
  pilot: StoryPilot;
  story: PilotStory;
  /** Omitted in preview, where there is nowhere to go back to. */
  backHref?: string;
  /** Extra content appended below the body — e.g. related pilots. */
  children?: React.ReactNode;
}) {
  return (
    <article>
      {/* Header */}
      <header className="border-b border-border bg-surface-sunken">
        <div className="container-page py-12 sm:py-16">
          {backHref && (
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All pilot projects
            </Link>
          )}

          <div className={`max-w-3xl animate-rise ${backHref ? "mt-8" : ""}`}>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              {story.tag && (
                <span className="rounded-full bg-accent/15 px-3 py-0.5 text-xs font-semibold text-accent-strong">
                  {story.tag}
                </span>
              )}
              <span
                className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${statusStyles[pilot.status]}`}
              >
                {pilot.status}
              </span>
              {story.date && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  <time dateTime={story.dateTime}>{story.date}</time>
                </span>
              )}
              {story.readingTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden />
                  {story.readingTime}
                </span>
              )}
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl">{story.title}</h1>

            {story.lead && (
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {renderInline(story.lead)}
              </p>
            )}

            {story.location && (
              <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted">
                <MapPin className="h-4 w-4 text-accent-strong" aria-hidden />
                {story.location}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div className="bg-surface-sunken">
        <div className="container-page pb-12 sm:pb-16">
          <figure className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <div
              className={`relative w-full bg-surface ${aspectClass[story.hero.aspect]}`}
            >
              <MediaImage
                item={story.hero}
                priority
                sizes="(min-width: 1152px) 1104px, 100vw"
              />
            </div>
            {story.hero.caption && (
              <figcaption className="bg-surface px-5 py-3 text-sm leading-relaxed text-muted">
                {story.hero.caption}
              </figcaption>
            )}
          </figure>
        </div>
      </div>

      {/* At a glance */}
      {story.facts.length > 0 && (
        <div className="border-b border-border bg-surface">
          <div className="container-page py-8">
            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {story.facts.map((fact, i) => (
                <div key={`${fact.label}-${i}`}>
                  <dt className="text-xs font-semibold tracking-[0.14em] text-accent-strong uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-foreground/85">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      {/* Body */}
      <Section className="pt-12 sm:pt-16">
        {story.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
        {children}
      </Section>
    </article>
  );
}
