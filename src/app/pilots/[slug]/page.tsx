import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { StoryArticle } from "@/components/pilot-story/story-view";
import { getPilot, pilots, pilotsWithStories } from "@/lib/pilots";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pilotsWithStories.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pilot = getPilot(slug);
  if (!pilot?.story) return { title: "Pilot not found" };

  return {
    title: pilot.story.title,
    description: pilot.story.lead,
    openGraph: {
      title: pilot.story.title,
      description: pilot.story.lead,
      type: "article",
      publishedTime: pilot.story.dateTime,
      images: [{ url: pilot.story.hero.src }],
    },
  };
}

export default async function PilotStoryPage({ params }: PageProps) {
  const { slug } = await params;
  const pilot = getPilot(slug);
  if (!pilot?.story) notFound();

  const others = pilots.filter((p) => p.slug !== pilot.slug).slice(0, 3);

  return (
    <StoryArticle pilot={pilot} story={pilot.story} backHref="/pilots">
      {/* Related pilots */}
      <div className="container-page mt-20">
        <div className="rounded-2xl border border-dashed border-border-strong bg-surface-sunken p-8">
          <h2 className="text-2xl">More from the pilot network</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((p) => (
              <div
                key={p.slug}
                className="rounded-xl border border-border bg-surface p-5"
              >
                <div className="flex items-center gap-1.5 text-sm font-medium text-muted">
                  <MapPin className="h-4 w-4 text-accent-strong" aria-hidden />
                  {p.country}
                </div>
                <h3 className="mt-1 text-lg">{p.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/pilots">
              See all pilot projects
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Start a pilot with us
            </ButtonLink>
          </div>
        </div>
      </div>
    </StoryArticle>
  );
}
