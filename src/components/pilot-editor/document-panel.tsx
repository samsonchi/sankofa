"use client";

import { useState } from "react";
import { ChevronDown, Plus, Wand2, X } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  formatDisplayDate,
  readingTimeFor,
  slugify,
  statuses,
  type Issue,
  type PilotDraft,
} from "@/lib/pilot-draft";
import type { PilotStory } from "@/lib/pilots";
import { Field, RichTextArea, Select, TextInput } from "./fields";
import { MediaEditor } from "./media-input";

function Group({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-surface-sunken"
      >
        {title}
        <ChevronDown
          className={cn("h-4 w-4 text-muted transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open && <div className="space-y-4 px-4 pb-5">{children}</div>}
    </div>
  );
}

export function DocumentPanel({
  draft,
  issues,
  onDraftChange,
  onStoryChange,
}: {
  draft: PilotDraft;
  issues: Issue[];
  onDraftChange: (patch: Partial<PilotDraft>) => void;
  onStoryChange: (patch: Partial<PilotStory>) => void;
}) {
  const [slugLocked, setSlugLocked] = useState(false);
  const errorFor = (field: string) =>
    issues.find((i) => i.field === field && i.level === "error");

  const setName = (name: string) => {
    onDraftChange(slugLocked ? { name } : { name, slug: slugify(name) });
  };

  const facts = draft.story.facts;
  const setFacts = (next: typeof facts) => onStoryChange({ facts: next });

  return (
    <div className="divide-y divide-border">
      <Group title="Story header">
        <Field label="Headline">
          {(id) => (
            <TextInput
              id={id}
              value={draft.story.title}
              onChange={(title) => onStoryChange({ title })}
              placeholder="Banana fibre, a ball, and every small response that counted"
              className={cn(errorFor("title") && "border-destructive/60")}
            />
          )}
        </Field>

        <Field label="Standfirst" hint="The paragraph under the headline. Cmd/Ctrl+B and +I work here.">
          {(id) => (
            <RichTextArea
              id={id}
              value={draft.story.lead}
              onChange={(lead) => onStoryChange({ lead })}
              minRows={4}
              placeholder="Forty minutes in a school compound…"
            />
          )}
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tag">
            {(id) => (
              <TextInput
                id={id}
                value={draft.story.tag}
                onChange={(tag) => onStoryChange({ tag })}
                placeholder="Field note"
              />
            )}
          </Field>

          <Field label="Date">
            {(id) => (
              <TextInput
                id={id}
                type="date"
                value={draft.story.dateTime}
                onChange={(dateTime) =>
                  onStoryChange({ dateTime, date: formatDisplayDate(dateTime) })
                }
              />
            )}
          </Field>
        </div>

        <Field label="Location" hint="Kept general — communities are never named precisely.">
          {(id) => (
            <TextInput
              id={id}
              value={draft.story.location}
              onChange={(location) => onStoryChange({ location })}
              placeholder="Special needs centre, Greater Kampala, Uganda"
            />
          )}
        </Field>

        <Field label="Reading time">
          {(id) => (
            <div className="flex gap-2">
              <TextInput
                id={id}
                value={draft.story.readingTime}
                onChange={(readingTime) => onStoryChange({ readingTime })}
              />
              <button
                type="button"
                title="Calculate from the word count"
                onClick={() => onStoryChange({ readingTime: readingTimeFor(draft.story) })}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border-strong px-3 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
              >
                <Wand2 className="h-3.5 w-3.5" aria-hidden />
                Auto
              </button>
            </div>
          )}
        </Field>
      </Group>

      <Group title="Hero image">
        <MediaEditor
          value={draft.story.hero}
          slug={draft.slug}
          label="Hero"
          onChange={(hero) => onStoryChange({ hero })}
        />
        {errorFor("hero") && (
          <p className="text-xs text-destructive">{errorFor("hero")?.message}</p>
        )}
      </Group>

      <Group title="At a glance" defaultOpen={false}>
        <p className="text-xs leading-relaxed text-muted">
          The four-column fact strip under the hero. Leave it empty to hide the strip.
        </p>
        <div className="space-y-2">
          {facts.map((fact, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="grid flex-1 gap-2">
                <TextInput
                  value={fact.label}
                  onChange={(label) =>
                    setFacts(facts.map((f, j) => (j === i ? { ...f, label } : f)))
                  }
                  placeholder="Activity"
                  className="text-xs font-semibold tracking-[0.1em] uppercase"
                />
                <TextInput
                  value={fact.value}
                  onChange={(value) =>
                    setFacts(facts.map((f, j) => (j === i ? { ...f, value } : f)))
                  }
                  placeholder="Banana fibre art and play"
                  className="text-sm"
                />
              </div>
              <button
                type="button"
                aria-label={`Remove fact ${i + 1}`}
                onClick={() => setFacts(facts.filter((_, j) => j !== i))}
                className="mt-1 rounded-md p-1.5 text-muted transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setFacts([...facts, { label: "", value: "" }])}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden />
          Add fact
        </button>
      </Group>

      <Group title="Pilot & index card" defaultOpen={false}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Pilot name">
            {(id) => (
              <TextInput
                id={id}
                value={draft.name}
                onChange={setName}
                placeholder="Banana Fibre Art & Play"
                className={cn(errorFor("name") && "border-destructive/60")}
              />
            )}
          </Field>
          <Field label="Country">
            {(id) => (
              <TextInput
                id={id}
                value={draft.country}
                onChange={(country) => onDraftChange({ country })}
                placeholder="Uganda"
                className={cn(errorFor("country") && "border-destructive/60")}
              />
            )}
          </Field>
        </div>

        <Field label="URL slug" hint={`Published at /pilots/${draft.slug || "…"}`}>
          {(id) => (
            <TextInput
              id={id}
              value={draft.slug}
              onChange={(slug) => {
                setSlugLocked(true);
                onDraftChange({ slug: slugify(slug) });
              }}
              placeholder="uganda-banana-fibre"
              className={cn("font-mono text-sm", errorFor("slug") && "border-destructive/60")}
            />
          )}
        </Field>

        <Field label="Status">
          {(id) => (
            <Select
              id={id}
              value={draft.status}
              onChange={(status) => onDraftChange({ status })}
              options={statuses}
            />
          )}
        </Field>

        <Field label="Card summary" hint="The paragraph shown on the /pilots index.">
          {(id) => (
            <RichTextArea
              id={id}
              value={draft.body}
              onChange={(body) => onDraftChange({ body })}
              minRows={4}
              placeholder="An inclusive pilot at a special needs centre…"
            />
          )}
        </Field>
      </Group>
    </div>
  );
}
