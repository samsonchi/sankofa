import { FocusBlur } from "@/components/motion/focus-blur";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";

const VIDEO_ID = "8_VCdAHLhas";

export function TiassaleSection() {
  return (
    <Section tone="sunken">
      <div className="container-page">
        <FocusBlur>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-strong">
            Please watch / Regardez (english &amp; français)
          </p>
          <h2 className="text-balance text-3xl sm:text-4xl">
            <span aria-hidden>🌍 </span>
            TIASSALÉ, CÔTE D&apos;IVOIRE: Citizens Reshaping Democracy —
            Citoyens Réinventent la Démocratie
          </h2>
        </FocusBlur>

        <RevealGroup className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <RevealItem>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
              <div className="relative aspect-video w-full">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
                  title="TIASSALÉ, Côte d'Ivoire — Citizens Reshaping Democracy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="space-y-5 text-lg leading-relaxed text-foreground">
              <p>
                Dear Friends, Chers Amis,
              </p>
              <p>
                On this{" "}
                <em className="text-accent-strong">
                  INTERNATIONAL DAY OF DEMOCRACY
                </em>
                , we share a very special encounter from our recent One Home
                Journey through West Africa.
              </p>
              <p>
                At a time when democracy is under profound pressure worldwide,
                the city of{" "}
                <em>Tiassalé in Côte d&apos;Ivoire touched and inspired us</em>.
              </p>
              <p>
                Under Mayor <em>ASSALÉ Tiémoko</em> and his committed Municipal
                Council, the city is building what they call a{" "}
                <em>&ldquo;society of trust&rdquo;</em> — making citizen
                participation, transparency and accountability a lived practice.
              </p>
              <p>
                For the two of us this goes to the core of the One Home
                Journey&apos;s mission:{" "}
                <em>
                  democracy needs to be lived from the ground up — with citizens
                  becoming active co-creators of the places they call home.
                </em>
              </p>
              <p>
                That is why we recognised{" "}
                <em>TIASSALÉ as a HOME FOR HUMANITY CITY</em>.
              </p>
              <p>
                Today we launch our short film about this inspiring city.
              </p>
              <p>
                <em>Please watch, share — and be inspired.</em>
              </p>
              <blockquote className="border-l-4 border-l-accent-strong pl-5 font-display text-xl font-semibold leading-snug text-primary">
                <p>FROM TRUST COMES PARTICIPATION.</p>
                <p>FROM PARTICIPATION COMES RESPONSIBILITY.</p>
                <p>FROM RESPONSIBILITY COMES A HOME FOR ALL.</p>
              </blockquote>
              <p className="text-muted">
                Merci &amp; With love,
                <br />
                Alexander &amp; Rama and the Home for Humanity Team
              </p>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </Section>
  );
}
