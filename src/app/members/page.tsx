import type { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";
import { members, type WorkingGroup } from "@/lib/members";

/** Member name → portrait in /public/members (saved by first or last name). */
const photos: Record<string, string> = {
  "Amira Ouerfelli": "/members/Amira.png",
  "Sudha Balagopalan": "/members/Balagopalan.png",
  "Barbara Sabiiti Waako": "/members/Barbara.png",
  "Bruce Mafuta": "/members/Bruce.jpg",
  "Chilala Kakoma-Bowa": "/members/Chilala.png",
  "Toby Cumberbatch": "/members/Cumberbatch.jpg",
  "Desire C Mussa": "/members/Desire.jpg",
  "Fidelis Filipatali": "/members/Fidelis.jpg",
  "Lawrence Ekeng": "/members/Lawrence.png",
  "Lane Maema": "/members/Maema.png",
  "Nicole Kawaako": "/members/Nicole.png",
  "Patience Kpeda": "/members/Patience.jpg",
  "Salamatu Sani": "/members/Salamatu.jpg",
  "Santosh Kumar Patnaik": "/members/Santosh.jpg",
  "Nicolo Stevanato": "/members/Stevanato.jpg",
  "Donatus Njoku": "/members/Donatus.jpg",
};

export const metadata: Metadata = {
  title: "Members",
  description:
    "Meet the Sankofa working-group members — volunteers across more than a dozen countries, organised into the Curricula, Communication and Implementation groups.",
};

const groupStyles: Record<WorkingGroup, string> = {
  Curricula: "bg-primary/10 text-primary",
  Communication: "bg-secondary/15 text-secondary",
  Implementation: "bg-accent/15 text-accent-strong",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export default function MembersPage() {
  const sorted = [...members].sort((a, b) => a.name.localeCompare(b.name));
  const countries = new Set(members.map((m) => m.country)).size;

  return (
    <>
      <PageHero
        eyebrow="Members"
        title="The people behind Sankofa"
        description={`${members.length} volunteers across ${countries} countries, organised into three working groups — Curricula, Communication and Implementation.`}
      />

      <Section>
        <div className="container-page">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((m) => {
              const photo = photos[m.name];
              return (
                <li
                  key={m.email}
                  className="flex min-h-[170px] overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Left half — portrait or initials panel */}
                  <div className="relative w-2/5 shrink-0 bg-secondary/10">
                    {photo ? (
                      <Image
                        src={photo}
                        alt={m.name}
                        fill
                        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 13vw"
                        className="object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="absolute inset-0 grid place-items-center font-display text-2xl font-semibold text-secondary"
                      >
                        {initials(m.name)}
                      </span>
                    )}
                  </div>

                  {/* Right half — details */}
                  <div className="flex min-w-0 flex-1 flex-col p-5">
                    <h2 className="text-lg leading-tight">{m.name}</h2>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                      <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {m.country}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {m.groups.map((g) => (
                        <span
                          key={g}
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${groupStyles[g]}`}
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>
    </>
  );
}
