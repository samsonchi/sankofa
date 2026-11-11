import { readdir, readFile, mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import {
  draftsDir,
  editorWritesAllowed,
  forbidden,
  safeSlug,
} from "@/lib/pilot-editor-server";
import type { PilotDraft } from "@/lib/pilot-draft";

export const dynamic = "force-dynamic";

/** List every draft saved on this machine. */
export async function GET() {
  try {
    const files = await readdir(draftsDir);
    const drafts = await Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map(async (f) => {
          const raw = await readFile(path.join(draftsDir, f), "utf8");
          return JSON.parse(raw) as PilotDraft;
        }),
    );
    drafts.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
    return Response.json({ drafts, writable: editorWritesAllowed() });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return Response.json({ drafts: [], writable: editorWritesAllowed() });
    }
    return Response.json({ error: "Could not read saved drafts." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!editorWritesAllowed()) return forbidden();

  let draft: PilotDraft;
  try {
    draft = (await request.json()) as PilotDraft;
  } catch {
    return Response.json({ error: "Malformed draft." }, { status: 400 });
  }

  if (!draft?.id || typeof draft.id !== "string") {
    return Response.json({ error: "Draft is missing an id." }, { status: 400 });
  }

  const record: PilotDraft = { ...draft, updatedAt: new Date().toISOString() };
  const file = path.join(draftsDir, `${safeSlug(draft.slug || draft.id)}.json`);

  await mkdir(draftsDir, { recursive: true });
  await writeFile(file, `${JSON.stringify(record, null, 2)}\n`, "utf8");

  return Response.json({
    draft: record,
    savedTo: path.relative(process.cwd(), file),
  });
}

export async function DELETE(request: Request) {
  if (!editorWritesAllowed()) return forbidden();

  const slug = safeSlug(new URL(request.url).searchParams.get("slug"));
  try {
    await unlink(path.join(draftsDir, `${slug}.json`));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      return Response.json({ error: "Could not delete that draft." }, { status: 500 });
    }
  }
  return Response.json({ ok: true });
}
