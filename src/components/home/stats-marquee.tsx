const stats = [
  { value: "14", label: "Countries represented" },
  { value: "STREAM", label: "Six learning disciplines" },
  { value: "5+", label: "Pilots planned in 2026" },
  { value: "1M", label: "Children we aim to reach yearly" },
];

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 px-8 sm:px-12">
      <span className="font-display text-4xl font-bold text-accent sm:text-5xl">
        {value}
      </span>
      <span className="max-w-[14ch] text-sm leading-snug text-[#c9b89c]">
        {label}
      </span>
      <span aria-hidden className="ml-4 h-2 w-2 shrink-0 rounded-full bg-primary/60" />
    </div>
  );
}

/**
 * Infinite, seamless statistics marquee. The list is duplicated and the track
 * translates -50% on loop; the second copy is hidden from assistive tech.
 * Pauses on hover (see .marquee-group in globals.css). Static under
 * prefers-reduced-motion.
 */
export function StatsMarquee() {
  return (
    <div
      className="marquee-group relative flex overflow-hidden"
      style={{ "--marquee-duration": "32s" } as React.CSSProperties}
    >
      {/* edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-foreground to-transparent sm:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-foreground to-transparent sm:w-28"
      />

      <div className="marquee-track py-2">
        <ul className="flex items-center" aria-label="Sankofa by the numbers">
          {stats.map((s) => (
            <li key={s.label}>
              <StatItem {...s} />
            </li>
          ))}
        </ul>
        <ul className="flex items-center" aria-hidden>
          {stats.map((s) => (
            <li key={`dup-${s.label}`}>
              <StatItem {...s} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
