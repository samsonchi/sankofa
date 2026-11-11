import type { Metadata } from "next";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "News",
  description:
    "Updates, stories and announcements from the Sankofa community-led STREAM education movement.",
};

type Post = {
  title: string;
  date: string;
  excerpt: string;
  tag: string;
  href?: string;
  external?: boolean;
};

// Main highlighted story
const featured: Post = {
  title: "Inclusive creative arts learning in Najjanankumbi, Kampala",
  date: "2026",
  tag: "Field Update",
  excerpt:
    "Inclusive creative arts learning in Najjanankumbi, Kampala During a creative arts session in Uganda, learners explored banana plant fibers to craft ropes, mats, dolls and more. A powerful moment of inclusion unfolded when a girl with special needs transitioned from quiet observer to active participant — a reminder that accessible materials and peer invitation can nurture belonging without complex interventions.",
  href: "https://www.linkedin.com/feed/update/urn:li:activity:7463263813237239808/?actorCompanyId=112653715",
  external: true,
};

// All other grid stories (including the IEEE feature)
const posts: Post[] = [
  {
    title: "Three Sankofa pilots operational in Tanzania",
    date: "August 2026",
    tag: "Network update",
    excerpt:
      "A chance meeting in October 2025 became a classroom of 95 children. Ten months on, Honda, Udilo Mufindi and Mdabulo are running together with the Rural Development Organization, teaching 185 pupils with the resources already at hand.",
    href: "/pilots/tanzania-network",
  },
  {
    title: "Sankofa Club takes a student-written curriculum to Echipparra Tribal School",
    date: "July 2026",
    tag: "Outreach report",
    excerpt:
      "A new Kerala pilot: 29 engineering students at Christ College of Engineering wrote around 50 course plans using only what is at hand, taught them to 106 tribal schoolchildren, and presented the results to an IEEE Smart Village panel.",
    href: "/pilots/echipparra-kerala",
  },
  {
    title: "Banana fibre, a ball, and every small response that counted",
    date: "12 August 2026",
    tag: "Field note",
    excerpt:
      "A new Uganda pilot at a special needs centre in Greater Kampala: forty minutes of banana fibre art and ball play with learners with high support needs — and a lasting lesson about what participation really looks like.",
    href: "/pilots/uganda-banana-fibre",
  },
  {
    title: "Sankofa featured in IEEE Smart Village EMPOWER",
    date: "September 2024",
    tag: "Feature",
    excerpt:
      "EMPOWER profiles how Sankofa brings STREAM to marginalised communities by honouring the past through local knowledge and traditions — with working group members across 14 countries and pilots underway in three.",
    href: "https://smartvillage.ieee.org/news/empower-vol-5-issue-3-sept-2024/",
    external: true,
  },
  {
    title: "Master Plan 2026 & Beyond published",
    date: "January 2026",
    tag: "Announcement",
    excerpt:
      "A volunteer-centred roadmap setting our vision, one-year goals and rolling 90-day priorities — from securing funding to running five pilots across five countries.",
  },
  {
    title: "Community surveys begin across pilot regions",
    date: "Q1 2026",
    tag: "Field update",
    excerpt:
      "Volunteers are carrying out community surveys to understand local needs — essential groundwork for new pilots and for fundraising. Community identities stay private.",
  },
];

function PostMeta({ date, tag }: { date: string; tag: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted">
      <span className="rounded-full bg-accent/15 px-3 py-0.5 text-xs font-semibold text-accent-strong">
        {tag}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-4 w-4" aria-hidden />
        {date}
      </span>
    </div>
  );
}

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="Stories from the network"
        description="Milestones, field updates and features as Sankofa grows. New stories from pilots in Tanzania, India, Nigeria and beyond are on the way."
      />

      <Section>
        <div className="container-page">
          {/* Featured Post Banner */}
          <a
            href={featured.href}
            target={featured.external ? "_blank" : undefined}
            rel={featured.external ? "noopener noreferrer" : undefined}
            className="group block rounded-2xl border border-border bg-surface p-8 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-10"
          >
            <PostMeta date={featured.date} tag={featured.tag} />
            <h2 className="mt-4 text-2xl sm:text-3xl">
              <span className="bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
                {featured.title}
              </span>
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">
              {featured.excerpt}
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 font-medium text-primary">
              Read on LinkedIn
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </span>
          </a>

          {/* Grid Layout */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {posts.map((p) => {
              const CardWrapper = p.href ? "a" : "div";
              return (
                <CardWrapper
                  key={p.title}
                  href={p.href}
                  target={p.external ? "_blank" : undefined}
                  rel={p.external ? "noopener noreferrer" : undefined}
                  className={`flex flex-col rounded-2xl border border-border bg-surface p-7 shadow-sm ${
                    p.href ? "group transition-shadow hover:shadow-md" : ""
                  }`}
                >
                  <PostMeta date={p.date} tag={p.tag} />
                  <h3 className="mt-3 text-xl">
                    {p.href ? (
                      <span className="bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
                        {p.title}
                      </span>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">{p.excerpt}</p>
                  {p.href && (
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      {p.external ? "Read external resource" : "Read the full story"}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  )}
                </CardWrapper>
              );
            })}
          </div>

          <p className="mt-10 text-center text-sm text-muted">
            More stories coming soon. Want to share an update from your pilot?{" "}
            <a
              href="/portal/reporting"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary-hover"
            >
              Submit it through the portal
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
