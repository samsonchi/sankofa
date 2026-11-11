import Link from "next/link";
import Image from "next/image";
import { primaryNav, portalNav } from "@/lib/nav";
import { LINKEDIN_URL, SURVEY_URL } from "@/components/follow-linkedin";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-[#e9dcc6]">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-[#f3ebdb]"
              aria-label="Sankofa home"
            >
              <Image src="/logo.png" alt="Sankofa" width={80} height={80} className="h-20 w-20 object-contain" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#c9b89c]">
              Go back and fetch it. Community-led STREAM education rooted in
              local culture, daily life, and what&rsquo;s at hand.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#e9dcc6] underline-offset-4 hover:text-white hover:underline"
              >
                Follow us on LinkedIn
              </a>
              <a
                href={SURVEY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#e9dcc6] underline-offset-4 hover:text-white hover:underline"
              >
                Community Survey
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#c9b89c]">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#e9dcc6] hover:text-white hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Member portal">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#c9b89c]">
              Member Portal
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {portalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#e9dcc6] hover:text-white hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-[#c9b89c] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sankofa. A volunteer-led initiative.</p>
          <p>In affiliation with IEEE Smart Village.</p>
        </div>
      </div>
    </footer>
  );
}
