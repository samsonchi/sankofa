import { ArrowUpRight } from "lucide-react";

export const LINKEDIN_URL =
  "https://www.linkedin.com/company/sankofa-initiative/";
export const SURVEY_URL = "https://bit.ly/3TP3E0S";

export function FollowLinkedin() {
  return (
    <section className="border-t border-border bg-surface-sunken">
      <div className="container-page py-14 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-strong">
            Stay connected
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl">
            Join the Sankofa community
          </h2>
          <p className="mt-3 text-muted">
            Follow our journey on LinkedIn, and help us reach more communities by
            taking the survey.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-medium text-on-primary shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-primary-hover hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Follow us on LinkedIn
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={SURVEY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-7 font-medium text-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Take the Community Survey
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
