import type { Media, Pilot, PilotStatus, PilotStory, StoryBlock } from "@/lib/pilots";

/** A pilot story being authored: the published `Pilot` shape plus editor bookkeeping. */
export type PilotDraft = {
  id: string;
  slug: string;
  name: string;
  country: string;
  status: PilotStatus;
  /** Card summary shown on the /pilots index. */
  body: string;
  story: PilotStory;
  updatedAt: string;
};

export type BlockType = StoryBlock["type"];

export const blockTypes: BlockType[] = [
  "heading",
  "paragraph",
  "quote",
  "list",
  "numbered",
  "pathway",
  "table",
  "media",
];

export const blockLabels: Record<BlockType, string> = {
  heading: "Heading",
  paragraph: "Paragraph",
  quote: "Pull quote",
  list: "Bulleted list",
  numbered: "Numbered list",
  pathway: "Pathway",
  table: "Table",
  media: "Images & video",
};

export const statuses: PilotStatus[] = ["Active", "In development", "Coming soon"];

export const aspects: Media["aspect"][] = [
  "landscape",
  "portrait",
  "square",
  "wide",
  "tall",
];

export const DRAFTS_KEY = "sankofa.pilot-drafts.v1";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function newId() {
  return `draft-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function emptyMedia(kind: Media["kind"] = "image"): Media {
  return { kind, src: "", alt: "", caption: "", aspect: "landscape" };
}

export function emptyBlock(type: BlockType): StoryBlock {
  switch (type) {
    case "heading":
      return { type, text: "" };
    case "paragraph":
      return { type, text: "" };
    case "quote":
      return { type, text: "", attribution: "" };
    case "list":
    case "numbered":
      return { type, items: [""] };
    case "pathway":
      return { type, steps: ["", ""] };
    case "table":
      return { type, caption: "", columns: ["", ""], rows: [["", ""]] };
    case "media":
      return { type, items: [emptyMedia()] };
  }
}

function today() {
  return new Date();
}

export function formatDisplayDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function createEmptyDraft(): PilotDraft {
  const iso = today().toISOString().slice(0, 10);
  return {
    id: newId(),
    slug: "",
    name: "",
    country: "",
    status: "Active",
    body: "",
    updatedAt: new Date().toISOString(),
    story: {
      title: "",
      tag: "Field note",
      date: formatDisplayDate(iso),
      dateTime: iso,
      readingTime: "1 min read",
      location: "",
      lead: "",
      hero: emptyMedia(),
      facts: [],
      blocks: [{ type: "paragraph", text: "" }],
    },
  };
}

/** Every word an author has typed into the body, for the status bar and reading time. */
export function countWords(story: PilotStory) {
  const text: string[] = [story.lead];

  for (const block of story.blocks) {
    switch (block.type) {
      case "heading":
      case "paragraph":
        text.push(block.text);
        break;
      case "quote":
        text.push(block.text, block.attribution ?? "");
        break;
      case "list":
      case "numbered":
        text.push(...block.items);
        break;
      case "pathway":
        text.push(...block.steps);
        break;
      case "table":
        text.push(block.caption ?? "", ...block.columns, ...block.rows.flat());
        break;
      case "media":
        text.push(...block.items.map((m) => m.caption ?? ""));
        break;
    }
  }

  return text.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

/** Matches the "6 min read" convention used by the existing stories. */
export function readingTimeFor(story: PilotStory) {
  const minutes = Math.max(1, Math.round(countWords(story) / 200));
  return `${minutes} min read`;
}

export function draftToPilot(draft: PilotDraft): Pilot {
  return {
    slug: draft.slug,
    name: draft.name,
    country: draft.country,
    status: draft.status,
    body: draft.body,
    story: draft.story,
  };
}

export type Issue = { field: string; message: string; level: "error" | "warning" };

/** What must be true before a draft can stand in for a published pilot. */
export function validateDraft(draft: PilotDraft): Issue[] {
  const issues: Issue[] = [];
  const err = (field: string, message: string) =>
    issues.push({ field, message, level: "error" });
  const warn = (field: string, message: string) =>
    issues.push({ field, message, level: "warning" });

  if (!draft.story.title.trim()) err("title", "The story needs a headline.");
  if (!draft.name.trim()) err("name", "Give the pilot a short name for the index card.");
  if (!draft.slug.trim()) err("slug", "A URL slug is required.");
  else if (draft.slug !== slugify(draft.slug))
    err("slug", "Slug may only contain lowercase letters, numbers and hyphens.");
  if (!draft.country.trim()) err("country", "Add the country.");
  if (!draft.body.trim()) warn("body", "Without a card summary the pilots index will look empty.");
  if (!draft.story.lead.trim()) warn("lead", "A standfirst paragraph helps readers commit.");
  if (!draft.story.hero.src) err("hero", "Choose a hero image.");
  else if (!draft.story.hero.alt.trim())
    err("hero", "The hero image needs alt text for screen readers.");

  draft.story.blocks.forEach((block, i) => {
    const at = `block-${i}`;
    const n = i + 1;
    if ((block.type === "heading" || block.type === "paragraph") && !block.text.trim())
      warn(at, `Block ${n} (${blockLabels[block.type]}) is empty.`);
    if (block.type === "quote" && !block.text.trim())
      warn(at, `Block ${n} (pull quote) is empty.`);
    if ((block.type === "list" || block.type === "numbered") && block.items.every((x) => !x.trim()))
      warn(at, `Block ${n} has no items.`);
    if (block.type === "media") {
      block.items.forEach((m, j) => {
        if (!m.src) warn(at, `Block ${n}, item ${j + 1} has no file yet.`);
        else if (!m.alt.trim()) err(at, `Block ${n}, item ${j + 1} needs alt text.`);
      });
    }
  });

  return issues;
}

/* ------------------------------------------------------------------ *
 * Local drafts — kept in the browser so nothing is lost on a refresh.
 * ------------------------------------------------------------------ */

export function loadLocalDrafts(): PilotDraft[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(DRAFTS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return (parsed as PilotDraft[]).filter((d) => d && typeof d.id === "string");
  } catch {
    return [];
  }
}

export function persistLocalDraft(draft: PilotDraft) {
  if (typeof window === "undefined") return;
  const rest = loadLocalDrafts().filter((d) => d.id !== draft.id);
  const next = [draft, ...rest].slice(0, 25);
  try {
    window.localStorage.setItem(DRAFTS_KEY, JSON.stringify(next));
  } catch {
    // Quota exceeded — an image was probably pasted in as a data URL.
  }
}

export function removeLocalDraft(id: string) {
  if (typeof window === "undefined") return;
  const next = loadLocalDrafts().filter((d) => d.id !== id);
  window.localStorage.setItem(DRAFTS_KEY, JSON.stringify(next));
}

/* ------------------------------------------------------------------ *
 * Code generation — a draft, ready to paste into src/lib/pilots.ts.
 * ------------------------------------------------------------------ */

function q(value: string) {
  return JSON.stringify(value ?? "");
}

function camel(slug: string) {
  const words = slug.split("-").filter(Boolean);
  return (
    (words[0] ?? "new") +
    words
      .slice(1)
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join("")
  );
}

function mediaSource(m: Media, indent: string) {
  const lines = [
    `${indent}  kind: ${q(m.kind)},`,
    `${indent}  src: ${q(m.src)},`,
    ...(m.poster ? [`${indent}  poster: ${q(m.poster)},`] : []),
    `${indent}  alt: ${q(m.alt)},`,
    ...(m.caption ? [`${indent}  caption: ${q(m.caption)},`] : []),
    `${indent}  aspect: ${q(m.aspect)},`,
  ];
  return `{\n${lines.join("\n")}\n${indent}}`;
}

function blockSource(block: StoryBlock): string {
  const i = "    ";
  switch (block.type) {
    case "heading":
    case "paragraph":
      return `${i}{ type: ${q(block.type)}, text: ${q(block.text)} },`;
    case "quote":
      return `${i}{\n${i}  type: "quote",\n${i}  text: ${q(block.text)},${
        block.attribution ? `\n${i}  attribution: ${q(block.attribution)},` : ""
      }\n${i}},`;
    case "list":
    case "numbered":
      return `${i}{\n${i}  type: ${q(block.type)},\n${i}  items: [\n${block.items
        .map((x) => `${i}    ${q(x)},`)
        .join("\n")}\n${i}  ],\n${i}},`;
    case "pathway":
      return `${i}{\n${i}  type: "pathway",\n${i}  steps: [${block.steps
        .map(q)
        .join(", ")}],\n${i}},`;
    case "table":
      return `${i}{\n${i}  type: "table",${
        block.caption ? `\n${i}  caption: ${q(block.caption)},` : ""
      }\n${i}  columns: [${block.columns.map(q).join(", ")}],\n${i}  rows: [\n${block.rows
        .map((row) => `${i}    [${row.map(q).join(", ")}],`)
        .join("\n")}\n${i}  ],\n${i}},`;
    case "media":
      return `${i}{\n${i}  type: "media",\n${i}  items: [\n${block.items
        .map((m) => `${i}    ${mediaSource(m, `${i}    `)},`)
        .join("\n")}\n${i}  ],\n${i}},`;
  }
}

/** Emits a `PilotStory` const plus the `pilots` entry that references it. */
export function toTypeScript(draft: PilotDraft) {
  const { story } = draft;
  const varName = `${camel(draft.slug || "new-pilot")}Story`;

  return `const ${varName}: PilotStory = {
  title: ${q(story.title)},
  tag: ${q(story.tag)},
  date: ${q(story.date)},
  dateTime: ${q(story.dateTime)},
  readingTime: ${q(story.readingTime)},
  location: ${q(story.location)},
  lead: ${q(story.lead)},
  hero: ${mediaSource(story.hero, "  ")},
  facts: [
${story.facts.map((f) => `    { label: ${q(f.label)}, value: ${q(f.value)} },`).join("\n")}
  ],
  blocks: [
${story.blocks.map(blockSource).join("\n")}
  ],
};

// Add to the \`pilots\` array:
{
  slug: ${q(draft.slug)},
  name: ${q(draft.name)},
  country: ${q(draft.country)},
  status: ${q(draft.status)},
  body: ${q(draft.body)},
  story: ${varName},
},
`;
}
