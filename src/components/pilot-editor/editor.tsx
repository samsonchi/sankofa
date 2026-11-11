"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Bold,
  Braces,
  Check,
  ChevronDown,
  CircleAlert,
  Columns2,
  Download,
  Eye,
  FilePlus2,
  FileText,
  Folder,
  Italic,
  Link2,
  Loader2,
  PanelRight,
  Pencil,
  Plus,
  Printer,
  Redo2,
  Save,
  Trash2,
  Undo2,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/cn";
import {
  blockLabels,
  blockTypes,
  countWords,
  createEmptyDraft,
  emptyBlock,
  loadLocalDrafts,
  persistLocalDraft,
  readingTimeFor,
  removeLocalDraft,
  draftToPilot,
  toTypeScript,
  validateDraft,
  type BlockType,
  type PilotDraft,
} from "@/lib/pilot-draft";
import type { PilotStory, StoryBlock } from "@/lib/pilots";
import { StoryArticle } from "@/components/pilot-story/story-view";
import { BlockCard } from "./block-editor";
import { DocumentPanel } from "./document-panel";
import { FormatProvider, useFormatting } from "./fields";

type ViewMode = "write" | "split" | "preview";
type SaveState = "idle" | "saving" | "saved" | "error";

const HISTORY_COALESCE_MS = 600;

function blockPreview(block: StoryBlock) {
  switch (block.type) {
    case "heading":
    case "paragraph":
    case "quote":
      return block.text;
    case "list":
    case "numbered":
      return block.items.filter(Boolean).join(", ");
    case "pathway":
      return block.steps.filter(Boolean).join(" → ");
    case "table":
      return block.caption || block.columns.filter(Boolean).join(" · ");
    case "media":
      return `${block.items.length} item${block.items.length === 1 ? "" : "s"}`;
  }
}

/* ------------------------------------------------------------------ *
 * Ribbon
 * ------------------------------------------------------------------ */

function RibbonButton({
  label,
  icon: Icon,
  onClick,
  disabled,
  active,
  wide,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={wide ? undefined : label}
      aria-pressed={active}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-35",
        active
          ? "bg-primary text-on-primary"
          : "text-foreground hover:bg-surface-sunken",
      )}
    >
      <Icon className="h-4 w-4" aria-hidden />
      {wide && <span className="hidden lg:inline">{label}</span>}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-6 w-px shrink-0 bg-border" aria-hidden />;
}

function InsertMenu({ onInsert }: { onInsert: (type: BlockType) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-on-primary transition-colors hover:bg-primary-hover"
      >
        <Plus className="h-4 w-4" aria-hidden />
        Insert
        <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
      </button>

      {open && (
        <div className="absolute top-11 left-0 z-40 w-56 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-lg">
          {blockTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                onInsert(type);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-surface-sunken"
            >
              {blockLabels[type]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FormatButtons() {
  const { wrap } = useFormatting();
  return (
    <>
      <RibbonButton label="Bold (Ctrl+B)" icon={Bold} onClick={() => wrap("**", "**")} />
      <RibbonButton label="Italic (Ctrl+I)" icon={Italic} onClick={() => wrap("_", "_")} />
      <RibbonButton
        label="Link"
        icon={Link2}
        onClick={() => {
          const href = window.prompt("Link address", "https://");
          if (href) wrap("[", `](${href})`);
        }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Editor
 * ------------------------------------------------------------------ */

export function PilotEditor() {
  const [draft, setDraft] = useState<PilotDraft | null>(null);
  const [view, setView] = useState<ViewMode>("split");
  const [panelOpen, setPanelOpen] = useState(true);
  const [activeBlock, setActiveBlock] = useState(0);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [localDrafts, setLocalDrafts] = useState<PilotDraft[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const [history, setHistory] = useState<{ past: PilotDraft[]; future: PilotDraft[] }>({
    past: [],
    future: [],
  });
  const lastPush = useRef(0);
  const importInput = useRef<HTMLInputElement>(null);

  // Restore the most recent local draft, or start a fresh one. This has to wait
  // for the client: localStorage does not exist while the page is prerendered.
  useEffect(() => {
    const stored = loadLocalDrafts();
    /* eslint-disable react-hooks/set-state-in-effect -- one-shot hydration of
       browser-only state; there is nothing to read until the client mounts. */
    setLocalDrafts(stored);
    setDraft(stored[0] ?? createEmptyDraft());
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  /** Snapshots the pre-edit draft, coalescing bursts of typing into one step. */
  const pushHistory = useCallback((current: PilotDraft) => {
    const now = Date.now();
    if (now - lastPush.current < HISTORY_COALESCE_MS) return;
    lastPush.current = now;
    setHistory((h) => ({ past: [...h.past.slice(-59), current], future: [] }));
  }, []);

  /** Replaces the whole document — opening a draft, importing, starting over. */
  const commit = useCallback(
    (next: PilotDraft) => {
      if (draft) {
        lastPush.current = 0;
        pushHistory(draft);
      }
      setDraft(next);
      setSaveState("idle");
    },
    [draft, pushHistory],
  );

  const patchDraft = useCallback(
    (patch: Partial<PilotDraft>) => {
      if (!draft) return;
      pushHistory(draft);
      setDraft({ ...draft, ...patch });
      setSaveState((state) => (state === "idle" ? state : "idle"));
    },
    [draft, pushHistory],
  );

  const patchStory = useCallback(
    (patch: Partial<PilotStory>) => {
      if (!draft) return;
      patchDraft({ story: { ...draft.story, ...patch } });
    },
    [draft, patchDraft],
  );

  // Autosave to the browser so a refresh never costs work.
  useEffect(() => {
    if (!draft) return;
    const id = window.setTimeout(() => {
      persistLocalDraft({ ...draft, updatedAt: new Date().toISOString() });
      setLocalDrafts(loadLocalDrafts());
    }, 700);
    return () => window.clearTimeout(id);
  }, [draft]);

  const undo = useCallback(() => {
    if (!draft || history.past.length === 0) return;
    setHistory({
      past: history.past.slice(0, -1),
      future: [...history.future, draft],
    });
    setDraft(history.past[history.past.length - 1]);
    lastPush.current = 0;
  }, [draft, history]);

  const redo = useCallback(() => {
    if (!draft || history.future.length === 0) return;
    setHistory({
      past: [...history.past, draft],
      future: history.future.slice(0, -1),
    });
    setDraft(history.future[history.future.length - 1]);
    lastPush.current = 0;
  }, [draft, history]);

  const saveToServer = useCallback(async () => {
    if (!draft) return;
    setSaveState("saving");
    setMessage(null);
    try {
      const res = await fetch("/api/pilot-drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = (await res.json()) as { savedTo?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Save failed.");
      setSaveState("saved");
      setSavedAt(new Date().toLocaleTimeString());
      setMessage(`Saved to ${data.savedTo}`);
    } catch (error) {
      setSaveState("error");
      setMessage(error instanceof Error ? error.message : "Save failed.");
    }
  }, [draft]);

  // Word-style shortcuts.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const key = e.key.toLowerCase();
      if (key === "s") {
        e.preventDefault();
        void saveToServer();
      } else if (key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((key === "z" && e.shiftKey) || key === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [saveToServer, undo, redo]);

  const issues = useMemo(() => (draft ? validateDraft(draft) : []), [draft]);
  const errors = issues.filter((i) => i.level === "error");
  const warnings = issues.filter((i) => i.level === "warning");
  const words = draft ? countWords(draft.story) : 0;

  if (!draft) {
    return (
      <div className="grid h-[60vh] place-items-center text-muted">
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
      </div>
    );
  }

  const blocks = draft.story.blocks;

  const setBlocks = (next: StoryBlock[]) =>
    patchDraft({ story: { ...draft.story, blocks: next } });

  const insertBlock = (type: BlockType) => {
    const at = Math.min(activeBlock + 1, blocks.length);
    setBlocks([...blocks.slice(0, at), emptyBlock(type), ...blocks.slice(at)]);
    setActiveBlock(at);
    requestAnimationFrame(() =>
      document.getElementById(`block-${at}`)?.scrollIntoView({ block: "center", behavior: "smooth" }),
    );
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    const to = index + direction;
    if (to < 0 || to >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[to]] = [next[to], next[index]];
    setBlocks(next);
    setActiveBlock(to);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${draft.slug || "pilot-draft"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyTypeScript = async () => {
    await navigator.clipboard.writeText(toTypeScript(draft));
    setMessage("TypeScript copied — paste it into src/lib/pilots.ts");
  };

  const importJson = async (file: File | undefined) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as PilotDraft;
      if (!parsed?.story?.blocks) throw new Error("Not a pilot draft.");
      commit({ ...parsed, id: parsed.id || createEmptyDraft().id });
      setMessage(`Opened ${file.name}`);
    } catch {
      setMessage("That file is not a pilot draft.");
    }
  };

  const previewPilot = draftToPilot({
    ...draft,
    name: draft.name || "Untitled pilot",
    country: draft.country || "—",
    slug: draft.slug || "preview",
  });

  const previewStory: PilotStory = {
    ...draft.story,
    title: draft.story.title || "Untitled pilot story",
  };

  return (
    <FormatProvider>
      <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-surface-sunken">
        {/* Ribbon */}
        <div className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur print:hidden">
          <div className="flex flex-wrap items-center gap-1 px-4 py-2">
            <InsertMenu onInsert={insertBlock} />
            <Divider />
            <FormatButtons />
            <Divider />
            <RibbonButton
              label="Undo (Ctrl+Z)"
              icon={Undo2}
              onClick={undo}
              disabled={history.past.length === 0}
            />
            <RibbonButton
              label="Redo (Ctrl+Shift+Z)"
              icon={Redo2}
              onClick={redo}
              disabled={history.future.length === 0}
            />
            <Divider />
            <RibbonButton
              label="Write"
              icon={Pencil}
              onClick={() => setView("write")}
              active={view === "write"}
            />
            <RibbonButton
              label="Split"
              icon={Columns2}
              onClick={() => setView("split")}
              active={view === "split"}
            />
            <RibbonButton
              label="Preview"
              icon={Eye}
              onClick={() => setView("preview")}
              active={view === "preview"}
            />
            <Divider />
            <RibbonButton
              label="Properties"
              icon={PanelRight}
              onClick={() => setPanelOpen((o) => !o)}
              active={panelOpen}
            />

            <div className="ml-auto flex items-center gap-1">
              <RibbonButton label="Drafts" icon={Folder} onClick={() => setDrawerOpen(true)} wide />
              <RibbonButton
                label="New"
                icon={FilePlus2}
                onClick={() => {
                  commit(createEmptyDraft());
                  setActiveBlock(0);
                }}
              />
              <RibbonButton label="Open" icon={Upload} onClick={() => importInput.current?.click()} />
              <RibbonButton label="Export" icon={Download} onClick={exportJson} wide />
              <RibbonButton label="Copy as TypeScript" icon={Braces} onClick={() => void copyTypeScript()} />
              <RibbonButton label="Print" icon={Printer} onClick={() => window.print()} />
              <button
                type="button"
                onClick={() => void saveToServer()}
                disabled={saveState === "saving"}
                className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-lg bg-secondary px-3 text-sm font-medium text-on-primary transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {saveState === "saving" ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : saveState === "saved" ? (
                  <Check className="h-4 w-4" aria-hidden />
                ) : (
                  <Save className="h-4 w-4" aria-hidden />
                )}
                Save
              </button>
            </div>
          </div>

          {message && (
            <div
              className={cn(
                "flex items-center gap-2 border-t border-border px-4 py-1.5 text-xs",
                saveState === "error" ? "bg-destructive/8 text-destructive" : "bg-success/8 text-success",
              )}
            >
              {saveState === "error" ? (
                <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden />
              ) : (
                <Check className="h-3.5 w-3.5 shrink-0" aria-hidden />
              )}
              <span className="flex-1">{message}</span>
              <button type="button" onClick={() => setMessage(null)} className="font-medium underline">
                Dismiss
              </button>
            </div>
          )}
        </div>

        <input
          ref={importInput}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            void importJson(e.target.files?.[0]);
            e.target.value = "";
          }}
        />

        {/* Workspace */}
        <div className="flex flex-1 overflow-hidden">
          {/* Outline */}
          {view !== "preview" && (
            <aside className="hidden w-56 shrink-0 overflow-y-auto border-r border-border bg-surface px-3 py-4 xl:block print:hidden">
              <p className="px-2 pb-2 text-xs font-semibold tracking-[0.12em] text-accent-strong uppercase">
                Outline
              </p>
              <ol className="space-y-0.5">
                {blocks.map((block, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveBlock(i);
                        document
                          .getElementById(`block-${i}`)
                          ?.scrollIntoView({ block: "center", behavior: "smooth" });
                      }}
                      className={cn(
                        "w-full rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-surface-sunken",
                        activeBlock === i && "bg-primary/8",
                        block.type === "heading" && "font-semibold",
                      )}
                    >
                      <span className="block text-[0.65rem] tracking-[0.1em] text-muted uppercase">
                        {blockLabels[block.type]}
                      </span>
                      <span className="line-clamp-1 text-sm text-foreground/80">
                        {blockPreview(block) || "Empty"}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </aside>
          )}

          {/* Document canvas */}
          {view !== "preview" && (
            <div className="flex-1 overflow-y-auto px-4 py-8">
              <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface px-6 py-8 shadow-sm sm:px-10 sm:py-12">
                <p className="text-xs font-semibold tracking-[0.12em] text-accent-strong uppercase">
                  {draft.story.tag || "Field note"}
                </p>
                <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {draft.story.title || (
                    <span className="text-muted/50">Untitled pilot story</span>
                  )}
                </h1>
                <p className="mt-2 text-sm text-muted">
                  Set the headline, hero image and metadata in Properties →
                </p>

                <hr className="my-8 border-border" />

                <div className="space-y-1">
                  {blocks.map((block, i) => (
                    <BlockCard
                      key={i}
                      block={block}
                      index={i}
                      total={blocks.length}
                      slug={draft.slug}
                      active={activeBlock === i}
                      onFocus={() => setActiveBlock(i)}
                      onChange={(next) =>
                        setBlocks(blocks.map((b, j) => (j === i ? next : b)))
                      }
                      onMove={(direction) => moveBlock(i, direction)}
                      onDuplicate={() =>
                        setBlocks([...blocks.slice(0, i + 1), { ...block }, ...blocks.slice(i + 1)])
                      }
                      onDelete={() => {
                        setBlocks(
                          blocks.length === 1
                            ? [emptyBlock("paragraph")]
                            : blocks.filter((_, j) => j !== i),
                        );
                        setActiveBlock(Math.max(0, i - 1));
                      }}
                    />
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-dashed border-border pt-6">
                  {(["paragraph", "heading", "media", "quote", "list"] as BlockType[]).map(
                    (type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setActiveBlock(blocks.length - 1);
                          insertBlock(type);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-primary hover:text-primary"
                      >
                        <Plus className="h-3.5 w-3.5" aria-hidden />
                        {blockLabels[type]}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Live preview */}
          {view !== "write" && (
            <div
              className={cn(
                "overflow-y-auto bg-background",
                view === "preview" ? "flex-1" : "hidden w-1/2 shrink-0 border-l border-border lg:block",
              )}
            >
              <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-surface/95 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur print:hidden">
                <Eye className="h-3.5 w-3.5" aria-hidden />
                Live preview — exactly how /pilots/{draft.slug || "…"} will render
              </div>
              <StoryArticle pilot={previewPilot} story={previewStory} />
            </div>
          )}

          {/* Properties */}
          {panelOpen && view !== "preview" && (
            <aside className="hidden w-80 shrink-0 overflow-y-auto border-l border-border bg-surface md:block print:hidden">
              <DocumentPanel
                draft={draft}
                issues={issues}
                onDraftChange={patchDraft}
                onStoryChange={patchStory}
              />
            </aside>
          )}
        </div>

        {/* Status bar */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border bg-surface px-4 py-2 text-xs text-muted print:hidden">
          <span className="inline-flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" aria-hidden />
            {words} words · {blocks.length} blocks · {readingTimeFor(draft.story)}
          </span>
          {errors.length > 0 && (
            <span className="inline-flex items-center gap-1.5 text-destructive" title={errors.map((e) => e.message).join("\n")}>
              <CircleAlert className="h-3.5 w-3.5" aria-hidden />
              {errors.length} to fix before publishing
            </span>
          )}
          {warnings.length > 0 && (
            <span className="inline-flex items-center gap-1.5 text-accent-strong" title={warnings.map((w) => w.message).join("\n")}>
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
              {warnings.length} suggestion{warnings.length === 1 ? "" : "s"}
            </span>
          )}
          {errors.length === 0 && warnings.length === 0 && (
            <span className="inline-flex items-center gap-1.5 text-success">
              <Check className="h-3.5 w-3.5" aria-hidden />
              Ready to publish
            </span>
          )}
          <span className="ml-auto">
            {savedAt ? `Saved to disk at ${savedAt} · ` : ""}autosaved in this browser
          </span>
        </div>
      </div>

      {/* Drafts drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-foreground/30 print:hidden">
          <button
            type="button"
            aria-label="Close drafts"
            className="flex-1 cursor-default"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="w-full max-w-sm overflow-y-auto bg-surface p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg">Your drafts</h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="text-sm font-medium text-primary hover:underline"
              >
                Close
              </button>
            </div>
            <p className="mt-1 text-xs text-muted">
              Autosaved in this browser. Use Save to also write one to the repository.
            </p>

            <ul className="mt-4 space-y-2">
              {localDrafts.map((item) => (
                <li
                  key={item.id}
                  className={cn(
                    "flex items-start gap-2 rounded-xl border p-3",
                    item.id === draft.id ? "border-primary/40 bg-primary/5" : "border-border",
                  )}
                >
                  <button
                    type="button"
                    className="flex-1 text-left"
                    onClick={() => {
                      commit(item);
                      setActiveBlock(0);
                      setDrawerOpen(false);
                    }}
                  >
                    <span className="block font-medium">
                      {item.story.title || "Untitled pilot story"}
                    </span>
                    <span className="block text-xs text-muted">
                      {item.country || "No country"} ·{" "}
                      {new Date(item.updatedAt).toLocaleString()}
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label="Delete draft"
                    onClick={() => {
                      removeLocalDraft(item.id);
                      setLocalDrafts(loadLocalDrafts());
                    }}
                    className="rounded-md p-1.5 text-muted transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </li>
              ))}
              {localDrafts.length === 0 && (
                <li className="rounded-xl border border-dashed border-border-strong p-4 text-sm text-muted">
                  Nothing saved yet.
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </FormatProvider>
  );
}
