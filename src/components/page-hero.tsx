export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-border bg-surface-sunken">
      <div className="container-page py-14 sm:py-20">
        <div className="max-w-3xl animate-rise">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-strong">
            {eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl">{title}</h1>
          {description && (
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
