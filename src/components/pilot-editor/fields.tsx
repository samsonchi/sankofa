"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ *
 * Formatting target
 *
 * The ribbon's B / I / Link buttons act on whichever text field the author
 * last had focus in — the way a word processor's toolbar does. Fields
 * register themselves here on focus.
 * ------------------------------------------------------------------ */

type Target = {
  el: HTMLTextAreaElement | HTMLInputElement;
  setValue: (value: string) => void;
};

type FormatApi = {
  register: (target: Target | null) => void;
  wrap: (prefix: string, suffix: string) => void;
  hasTarget: () => boolean;
};

const FormatContext = createContext<FormatApi | null>(null);

export function FormatProvider({ children }: { children: ReactNode }) {
  const target = useRef<Target | null>(null);

  const register = useCallback((next: Target | null) => {
    target.current = next;
  }, []);

  const wrap = useCallback((prefix: string, suffix: string) => {
    const current = target.current;
    if (!current) return;

    const { el, setValue } = current;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const value = el.value;
    const selected = value.slice(start, end) || "text";

    // Toggle off if the selection is already wrapped.
    const already =
      value.slice(start - prefix.length, start) === prefix &&
      value.slice(end, end + suffix.length) === suffix;

    const next = already
      ? value.slice(0, start - prefix.length) + selected + value.slice(end + suffix.length)
      : value.slice(0, start) + prefix + selected + suffix + value.slice(end);

    setValue(next);

    const caret = already ? start - prefix.length : start + prefix.length;
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(caret, caret + selected.length);
    });
  }, []);

  const hasTarget = useCallback(() => target.current !== null, []);

  return (
    <FormatContext.Provider value={{ register, wrap, hasTarget }}>
      {children}
    </FormatContext.Provider>
  );
}

export function useFormatting() {
  const ctx = useContext(FormatContext);
  if (!ctx) throw new Error("useFormatting must be used inside <FormatProvider>");
  return ctx;
}

/* ------------------------------------------------------------------ *
 * Inputs
 * ------------------------------------------------------------------ */

const fieldBase =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-[0.95rem] text-foreground placeholder:text-muted/60 transition-colors focus:border-primary focus:outline-none";

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: (id: string) => ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={id}
        className="block text-xs font-semibold tracking-[0.1em] text-accent-strong uppercase"
      >
        {label}
      </label>
      {children(id)}
      {hint && <p className="text-xs leading-relaxed text-muted">{hint}</p>}
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  className,
  rich = false,
  ...props
}: {
  value: string;
  onChange: (value: string) => void;
  rich?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  const { register } = useFormatting();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <input
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => rich && ref.current && register({ el: ref.current, setValue: onChange })}
      onBlur={() => rich && register(null)}
      className={cn(fieldBase, className)}
      {...props}
    />
  );
}

export function Select<T extends string>({
  value,
  onChange,
  options,
  labels,
  className,
  id,
}: {
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
  labels?: Record<string, string>;
  className?: string;
  id?: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className={cn(fieldBase, "cursor-pointer", className)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {labels?.[option] ?? option}
        </option>
      ))}
    </select>
  );
}

/**
 * Auto-growing text area that participates in ribbon formatting.
 */
export function RichTextArea({
  value,
  onChange,
  className,
  minRows = 2,
  ...props
}: {
  value: string;
  onChange: (value: string) => void;
  minRows?: number;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">) {
  const { register } = useFormatting();
  const ref = useRef<HTMLTextAreaElement>(null);

  // Grow with the content so long paragraphs stay readable while writing.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      rows={minRows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => ref.current && register({ el: ref.current, setValue: onChange })}
      onKeyDown={(e) => {
        if (!(e.metaKey || e.ctrlKey)) return;
        const el = e.currentTarget;
        const wrapWith = (prefix: string, suffix: string) => {
          e.preventDefault();
          const start = el.selectionStart;
          const end = el.selectionEnd;
          const selected = el.value.slice(start, end) || "text";
          onChange(
            el.value.slice(0, start) + prefix + selected + suffix + el.value.slice(end),
          );
          requestAnimationFrame(() =>
            el.setSelectionRange(start + prefix.length, start + prefix.length + selected.length),
          );
        };
        if (e.key === "b") wrapWith("**", "**");
        if (e.key === "i") wrapWith("_", "_");
      }}
      className={cn(fieldBase, "resize-none leading-relaxed", className)}
      {...props}
    />
  );
}

export function IconButton({
  label,
  className,
  children,
  ...props
}: { label: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-sunken hover:text-foreground disabled:pointer-events-none disabled:opacity-30",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
