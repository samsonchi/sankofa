import { cn } from "@/lib/cn";

export function Section({
  className,
  tone = "default",
  children,
  ...props
}: {
  tone?: "default" | "sunken" | "ink";
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const tones = {
    default: "bg-background",
    sunken: "bg-surface-sunken",
    ink: "bg-foreground text-[#f3ebdb]",
  };
  return (
    <section
      className={cn("py-16 sm:py-20 lg:py-24", tones[tone], className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-strong">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
