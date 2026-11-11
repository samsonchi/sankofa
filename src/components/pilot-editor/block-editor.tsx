"use client";

import {
  ArrowDown,
  ArrowUp,
  Columns3,
  Copy,
  Plus,
  Rows3,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { blockLabels, emptyMedia, type BlockType } from "@/lib/pilot-draft";
import type { StoryBlock } from "@/lib/pilots";
import { Field, IconButton, RichTextArea, TextInput } from "./fields";
import { MediaEditor } from "./media-input";

function ItemRow({
  value,
  onChange,
  onRemove,
  onEnter,
  placeholder,
  marker,
  canRemove,
}: {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  onEnter: () => void;
  placeholder: string;
  marker: React.ReactNode;
  canRemove: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-2 w-6 shrink-0 text-center text-sm text-muted">{marker}</span>
      <RichTextArea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        minRows={1}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onEnter();
          }
        }}
      />
      <IconButton
        label="Remove item"
        onClick={onRemove}
        disabled={!canRemove}
        className="mt-1 hover:bg-destructive/10 hover:text-destructive"
      >
        <X className="h-4 w-4" aria-hidden />
      </IconButton>
    </div>
  );
}

function BlockBody({
  block,
  onChange,
  slug,
}: {
  block: StoryBlock;
  onChange: (next: StoryBlock) => void;
  slug: string;
}) {
  switch (block.type) {
    case "heading":
      return (
        <TextInput
          rich
          value={block.text}
          onChange={(text) => onChange({ ...block, text })}
          placeholder="Section heading"
          className="border-transparent bg-transparent px-0 font-display text-2xl font-bold tracking-tight focus:border-transparent"
        />
      );

    case "paragraph":
      return (
        <RichTextArea
          value={block.text}
          onChange={(text) => onChange({ ...block, text })}
          placeholder="Write the story…"
          minRows={3}
          className="border-transparent bg-transparent px-0 text-lg leading-[1.75] focus:border-transparent"
        />
      );

    case "quote":
      return (
        <div className="space-y-2 border-l-4 border-primary pl-4">
          <RichTextArea
            value={block.text}
            onChange={(text) => onChange({ ...block, text })}
            placeholder="The line worth pulling out"
            className="border-transparent bg-transparent px-0 font-display text-xl font-semibold focus:border-transparent"
          />
          <TextInput
            value={block.attribution ?? ""}
            onChange={(attribution) => onChange({ ...block, attribution })}
            placeholder="Attribution (optional)"
            className="border-transparent bg-transparent px-0 text-sm text-muted focus:border-transparent"
          />
        </div>
      );

    case "list":
    case "numbered": {
      const setItems = (items: string[]) => onChange({ ...block, items });
      return (
        <div className="space-y-2">
          {block.items.map((item, i) => (
            <ItemRow
              key={i}
              value={item}
              marker={block.type === "numbered" ? i + 1 : "•"}
              placeholder="List item"
              canRemove={block.items.length > 1}
              onChange={(value) =>
                setItems(block.items.map((x, j) => (j === i ? value : x)))
              }
              onRemove={() => setItems(block.items.filter((_, j) => j !== i))}
              onEnter={() =>
                setItems([...block.items.slice(0, i + 1), "", ...block.items.slice(i + 1)])
              }
            />
          ))}
          <button
            type="button"
            onClick={() => setItems([...block.items, ""])}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
            Add item
          </button>
        </div>
      );
    }

    case "pathway": {
      const setSteps = (steps: string[]) => onChange({ ...block, steps });
      return (
        <div className="flex flex-wrap items-center gap-2">
          {block.steps.map((step, i) => (
            <div key={i} className="flex items-center gap-1">
              <TextInput
                value={step}
                onChange={(value) =>
                  setSteps(block.steps.map((x, j) => (j === i ? value : x)))
                }
                placeholder={`Step ${i + 1}`}
                className="h-9 w-40 rounded-full border-accent/40 bg-accent/10 py-0 text-center text-sm font-semibold tracking-wide text-accent-strong uppercase"
              />
              <IconButton
                label="Remove step"
                onClick={() => setSteps(block.steps.filter((_, j) => j !== i))}
                disabled={block.steps.length <= 2}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </IconButton>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setSteps([...block.steps, ""])}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
            Step
          </button>
        </div>
      );
    }

    case "table": {
      const setCell = (r: number, c: number, value: string) =>
        onChange({
          ...block,
          rows: block.rows.map((row, i) =>
            i === r ? row.map((cell, j) => (j === c ? value : cell)) : row,
          ),
        });

      return (
        <div className="space-y-3">
          <TextInput
            value={block.caption ?? ""}
            onChange={(caption) => onChange({ ...block, caption })}
            placeholder="Table caption (optional)"
            className="border-transparent bg-transparent px-0 text-xs font-semibold tracking-[0.14em] text-accent-strong uppercase focus:border-transparent"
          />

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-surface-sunken">
                <tr>
                  {block.columns.map((col, c) => (
                    <th key={c} className="border-b border-border p-1">
                      <TextInput
                        value={col}
                        onChange={(value) =>
                          onChange({
                            ...block,
                            columns: block.columns.map((x, j) => (j === c ? value : x)),
                          })
                        }
                        placeholder={`Column ${c + 1}`}
                        className="h-8 border-transparent bg-transparent py-0 text-sm font-semibold"
                      />
                    </th>
                  ))}
                  <th className="w-9 border-b border-border" />
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c} className="border-b border-border p-1 last:border-b">
                        <TextInput
                          value={cell}
                          onChange={(value) => setCell(r, c, value)}
                          className="h-8 border-transparent bg-transparent py-0 text-sm"
                        />
                      </td>
                    ))}
                    <td className="border-b border-border text-center">
                      <IconButton
                        label={`Remove row ${r + 1}`}
                        onClick={() =>
                          onChange({ ...block, rows: block.rows.filter((_, i) => i !== r) })
                        }
                        disabled={block.rows.length <= 1}
                        className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="h-3.5 w-3.5" aria-hidden />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-3 text-sm font-medium text-primary">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 hover:underline"
              onClick={() =>
                onChange({
                  ...block,
                  rows: [...block.rows, block.columns.map(() => "")],
                })
              }
            >
              <Rows3 className="h-3.5 w-3.5" aria-hidden />
              Add row
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 hover:underline"
              onClick={() =>
                onChange({
                  ...block,
                  columns: [...block.columns, ""],
                  rows: block.rows.map((row) => [...row, ""]),
                })
              }
            >
              <Columns3 className="h-3.5 w-3.5" aria-hidden />
              Add column
            </button>
            {block.columns.length > 2 && (
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-muted hover:underline"
                onClick={() =>
                  onChange({
                    ...block,
                    columns: block.columns.slice(0, -1),
                    rows: block.rows.map((row) => row.slice(0, -1)),
                  })
                }
              >
                <X className="h-3.5 w-3.5" aria-hidden />
                Remove last column
              </button>
            )}
          </div>
        </div>
      );
    }

    case "media": {
      const setItems = (items: typeof block.items) => onChange({ ...block, items });
      return (
        <div className="space-y-3">
          <div className={cn("grid gap-3", block.items.length > 1 && "sm:grid-cols-2")}>
            {block.items.map((item, i) => (
              <MediaEditor
                key={i}
                value={item}
                slug={slug}
                label={block.items.length > 1 ? `Item ${i + 1}` : "Media"}
                onChange={(next) => setItems(block.items.map((x, j) => (j === i ? next : x)))}
                onRemove={
                  block.items.length > 1
                    ? () => setItems(block.items.filter((_, j) => j !== i))
                    : undefined
                }
              />
            ))}
          </div>
          {block.items.length < 4 && (
            <button
              type="button"
              onClick={() => setItems([...block.items, emptyMedia()])}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Add another {block.items.length === 1 ? "— they sit side by side" : "item"}
            </button>
          )}
        </div>
      );
    }
  }
}

export function BlockCard({
  block,
  index,
  total,
  slug,
  active,
  onChange,
  onMove,
  onDuplicate,
  onDelete,
  onFocus,
}: {
  block: StoryBlock;
  index: number;
  total: number;
  slug: string;
  active: boolean;
  onChange: (next: StoryBlock) => void;
  onMove: (direction: -1 | 1) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onFocus: () => void;
}) {
  return (
    <section
      id={`block-${index}`}
      onFocusCapture={onFocus}
      className={cn(
        "group relative scroll-mt-40 rounded-xl border px-4 py-3 transition-colors",
        active
          ? "border-primary/40 bg-primary/[0.03]"
          : "border-transparent hover:border-border",
      )}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-[0.65rem] font-semibold tracking-[0.12em] text-muted uppercase">
          {blockLabels[block.type as BlockType]}
        </span>
        <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <IconButton label="Move up" onClick={() => onMove(-1)} disabled={index === 0}>
            <ArrowUp className="h-4 w-4" aria-hidden />
          </IconButton>
          <IconButton
            label="Move down"
            onClick={() => onMove(1)}
            disabled={index === total - 1}
          >
            <ArrowDown className="h-4 w-4" aria-hidden />
          </IconButton>
          <IconButton label="Duplicate" onClick={onDuplicate}>
            <Copy className="h-4 w-4" aria-hidden />
          </IconButton>
          <IconButton
            label="Delete block"
            onClick={onDelete}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
          </IconButton>
        </div>
      </div>

      <BlockBody block={block} onChange={onChange} slug={slug} />
    </section>
  );
}

export { Field };
