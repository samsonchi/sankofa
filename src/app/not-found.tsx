import type { Metadata } from "next";
import { Home, ArrowLeft, Compass } from "lucide-react";
import { SankofaMark } from "@/components/sankofa-mark";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/curriculum", label: "Curriculum" },
  { href: "/pilots", label: "Pilot Projects" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(110%_80%_at_50%_0%,#fbf6ec_0%,#faf5ec_50%,#f3e9d6_100%)]"
      />
      <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <SankofaMark className="h-14 w-14 text-primary" />

        <p className="mt-8 font-display text-7xl font-bold leading-none text-primary sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl">This path leads nowhere</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          Sankofa means <em>&ldquo;go back and fetch it.&rdquo;</em> The page
          you&rsquo;re looking for has moved or never existed — so let&rsquo;s
          head back and find what you came for.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            <Home className="h-5 w-5" aria-hidden />
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="lg">
            <ArrowLeft className="h-5 w-5" aria-hidden />
            Get in touch
          </ButtonLink>
        </div>

        <div className="mt-12 w-full max-w-md">
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent-strong">
            <Compass className="h-4 w-4" aria-hidden />
            Or explore
          </p>
          <nav
            aria-label="Helpful links"
            className="flex flex-wrap justify-center gap-2.5"
          >
            {links.map((l) => (
              <ButtonLink key={l.href} href={l.href} variant="ghost" size="sm">
                {l.label}
              </ButtonLink>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
