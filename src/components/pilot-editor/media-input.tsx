"use client";

import { useRef, useState } from "react";
import { ImageIcon, Loader2, Trash2, Upload, Video } from "lucide-react";
import { cn } from "@/lib/cn";
import { aspects, emptyMedia } from "@/lib/pilot-draft";
import type { Media } from "@/lib/pilots";
import { Field, RichTextArea, Select, TextInput } from "./fields";

const ACCEPT = "image/jpeg,image/png,image/webp,image/avif,image/gif,video/mp4";

/** Keeps a failed upload usable in the browser without blowing the draft budget. */
const INLINE_FALLBACK_LIMIT = 1.5 * 1024 * 1024;

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsDataURL(file);
  });
}

export function MediaEditor({
  value,
  onChange,
  onRemove,
  slug,
  label = "Image",
}: {
  value: Media;
  onChange: (next: Media) => void;
  onRemove?: () => void;
  /** Uploads are filed under the pilot's slug in /public. */
  slug: string;
  label?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function accept(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);

    const form = new FormData();
    form.append("file", file);
    form.append("slug", slug || "untitled");

    try {
      const res = await fetch("/api/pilot-uploads", { method: "POST", body: form });
      const data = (await res.json()) as { src?: string; kind?: Media["kind"]; error?: string };

      if (res.ok && data.src) {
        onChange({ ...value, src: data.src, kind: data.kind ?? value.kind });
      } else if (file.size <= INLINE_FALLBACK_LIMIT && file.type.startsWith("image/")) {
        // Server can't write here — keep the picture in the draft so the author
        // can carry on, and say so.
        onChange({ ...value, src: await readAsDataUrl(file), kind: "image" });
        setError(
          `${data.error ?? "Upload failed."} Kept in this draft only — export the draft to preserve it.`,
        );
      } else {
        setError(data.error ?? "Upload failed.");
      }
    } catch {
      setError("Upload failed — is the dev server still running?");
    } finally {
      setBusy(false);
    }
  }

  const hasFile = Boolean(value.src);

  return (
    <div className="rounded-xl border border-border bg-surface-sunken/50 p-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold tracking-[0.1em] text-accent-strong uppercase">
          {label}
        </span>
        <div className="flex items-center gap-1">
          <Select
            value={value.kind}
            onChange={(kind) => onChange({ ...value, kind })}
            options={["image", "video"] as const}
            labels={{ image: "Image", video: "Video" }}
            className="h-8 w-auto py-0 text-xs"
          />
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              title="Remove"
              aria-label="Remove media"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>
      </div>

      {/* Drop zone / preview */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void accept(e.dataTransfer.files[0]);
        }}
        className={cn(
          "relative overflow-hidden rounded-lg border-2 border-dashed transition-colors",
          dragging ? "border-primary bg-primary/5" : "border-border-strong bg-surface",
        )}
      >
        {hasFile && value.kind === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value.src}
            alt=""
            className="h-40 w-full bg-surface-sunken object-contain"
          />
        ) : hasFile ? (
          <video
            src={value.src}
            controls
            className="h-40 w-full bg-foreground object-contain"
          />
        ) : (
          <div className="flex h-32 flex-col items-center justify-center gap-1.5 text-muted">
            {value.kind === "video" ? (
              <Video className="h-6 w-6 opacity-50" aria-hidden />
            ) : (
              <ImageIcon className="h-6 w-6 opacity-50" aria-hidden />
            )}
            <p className="text-sm">Drag a file here</p>
          </div>
        )}

        {busy && (
          <div className="absolute inset-0 grid place-items-center bg-surface/80">
            <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden />
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <input
          ref={input}
          type="file"
          accept={ACCEPT}
          className="hidden"
          onChange={(e) => {
            void accept(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => input.current?.click()}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
        >
          <Upload className="h-3.5 w-3.5" aria-hidden />
          {hasFile ? "Replace file" : "Choose file"}
        </button>
        <Select
          value={value.aspect}
          onChange={(aspect) => onChange({ ...value, aspect })}
          options={aspects}
          className="h-8 w-auto py-0 text-xs"
        />
      </div>

      {error && (
        <p className="mt-2 rounded-md bg-destructive/8 px-2 py-1.5 text-xs leading-relaxed text-destructive">
          {error}
        </p>
      )}

      <div className="mt-3 space-y-2.5">
        <Field label="Alt text" hint="Describe the picture for readers who cannot see it.">
          {(id) => (
            <TextInput
              id={id}
              value={value.alt}
              onChange={(alt) => onChange({ ...value, alt })}
              placeholder="Learners holding up what they made"
              className={cn(
                "text-sm",
                hasFile && !value.alt.trim() && "border-destructive/60",
              )}
            />
          )}
        </Field>

        <Field label="Caption">
          {(id) => (
            <RichTextArea
              id={id}
              value={value.caption ?? ""}
              onChange={(caption) => onChange({ ...value, caption })}
              placeholder="Optional caption shown under the frame"
              className="text-sm"
            />
          )}
        </Field>

        {value.kind === "video" && (
          <Field label="Poster still" hint="Path to the image shown before playback.">
            {(id) => (
              <TextInput
                id={id}
                value={value.poster ?? ""}
                onChange={(poster) => onChange({ ...value, poster })}
                placeholder="/pilots/uploads/…/poster.jpg"
                className="text-sm"
              />
            )}
          </Field>
        )}

        <Field label="Source path">
          {(id) => (
            <TextInput
              id={id}
              value={value.src.startsWith("data:") ? "(embedded in this draft)" : value.src}
              onChange={(src) => onChange({ ...value, src })}
              readOnly={value.src.startsWith("data:")}
              placeholder="/pilots/my-pilot/photo.jpg"
              className="text-sm font-mono"
            />
          )}
        </Field>
      </div>
    </div>
  );
}

export { emptyMedia };
