import { Fragment } from "react";

/**
 * Lightweight inline markup for story text. The data model keeps every block's
 * text a plain string, so emphasis travels as markers the editor writes and the
 * renderer resolves:
 *
 *   **bold**   _italic_   [label](https://example.com)
 *
 * Anything that isn't one of those three shapes is rendered verbatim, so older
 * stories written before the editor existed are unaffected.
 */
const INLINE = /(\*\*[^*\n]+\*\*|_[^_\n]+_|\[[^\]\n]+\]\([^)\s]+\))/g;

export function renderInline(text: string) {
  const parts = text.split(INLINE);

  return parts.map((part, i) => {
    if (!part) return null;

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("_") && part.endsWith("_")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }

    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      const external = /^https?:\/\//.test(href);
      return (
        <a
          key={i}
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
          className="font-medium text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:decoration-primary"
        >
          {label}
        </a>
      );
    }

    return <Fragment key={i}>{part}</Fragment>;
  });
}
