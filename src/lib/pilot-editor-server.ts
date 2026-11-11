import path from "node:path";

/**
 * The editor writes into the repository working tree (drafts as JSON, uploads
 * into /public). That only makes sense on a writable, trusted machine, so it is
 * off in production unless the deployment explicitly opts in and the filesystem
 * is known to persist.
 */
export function editorWritesAllowed() {
  return (
    process.env.NODE_ENV !== "production" ||
    process.env.PILOT_EDITOR_ENABLED === "true"
  );
}

export const draftsDir = path.join(process.cwd(), "content", "pilot-drafts");

export const uploadsRoot = path.join(process.cwd(), "public", "pilots", "uploads");

export function forbidden() {
  return Response.json(
    {
      error:
        "Saving to the server is disabled here. Your work is still autosaved in this browser — use Export to download it.",
    },
    { status: 403 },
  );
}

/** Defensive: never let a slug escape its directory. */
export function safeSlug(value: unknown) {
  const slug = String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return slug || "untitled";
}
