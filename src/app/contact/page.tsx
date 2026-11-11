import type { Metadata } from "next";
import Image from "next/image";
import { Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Sankofa Initiative — send us a message or reach us at info@teachsankofa.org.",
};

const EMAIL = "info@teachsankofa.org";

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/teachsankofa",
    icon: FacebookIcon,
  },
  {
    label: "X",
    href: "https://x.com/teachsankofa",
    icon: XIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sankofa-initiative/",
    icon: LinkedinIcon,
  },
];

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.014 1.792-4.68 4.533-4.68 1.313 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        description="Questions, ideas, or want to help bring STREAM learning to a community? Send us a message — we'd love to hear from you."
      />

      <Section>
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Left — image + direct contact */}
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
              <Image
                src="/contact.png"
                alt="Sankofa Initiative"
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-strong">
                E-mail
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-2 inline-flex max-w-full items-center gap-2 break-all text-lg font-medium text-foreground transition-colors hover:text-primary sm:text-xl"
              >
                <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                {EMAIL}
              </a>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-strong">
                Follow us
              </p>
              <div className="mt-3 flex gap-3">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border-strong bg-surface text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
