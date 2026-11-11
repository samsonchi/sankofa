import { cn } from "@/lib/cn";

/**
 * Abstract Sankofa brandmark: a neck curving up and turning back
 * (the bird's backward glance) reaching toward a gold "egg" — the
 * heritage that is retrieved. Body uses currentColor; egg uses the
 * brand gold so it reads in any context.
 */
export function SankofaMark({
  className,
  title = "Sankofa",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label={title}
      className={cn("h-9 w-9", className)}
    >
      <path
        d="M9 33C9 18.5 19.5 9 30.5 12.2C24.2 9.6 15 15.4 16.7 25.4C17.4 30 22 32.6 26.2 29.6"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="28.4" cy="27.8" r="3.5" fill="var(--accent)" />
    </svg>
  );
}
