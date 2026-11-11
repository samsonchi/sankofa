import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  editorWritesAllowed,
  forbidden,
  safeSlug,
  uploadsRoot,
} from "@/lib/pilot-editor-server";

export const dynamic = "force-dynamic";

const MAX_BYTES = 25 * 1024 * 1024;

/** Only formats the story renderer can actually display. */
const allowed: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
  "video/mp4": "mp4",
};

function fileStem(name: string) {
  const stem = name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
  return stem || "media";
}

export async function POST(request: Request) {
  if (!editorWritesAllowed()) return forbidden();

  const form = await request.formData();
  const file = form.get("file");
  const slug = safeSlug(form.get("slug"));

  if (!(file instanceof File)) {
    return Response.json({ error: "No file was received." }, { status: 400 });
  }

  const ext = allowed[file.type];
  if (!ext) {
    return Response.json(
      { error: `${file.type || "That file type"} is not supported. Use JPG, PNG, WebP, AVIF, GIF or MP4.` },
      { status: 415 },
    );
  }

  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: `That file is ${(file.size / 1024 / 1024).toFixed(1)} MB — the limit is 25 MB.` },
      { status: 413 },
    );
  }

  const dir = path.join(uploadsRoot, slug);
  await mkdir(dir, { recursive: true });

  // Timestamp keeps re-uploads of the same filename from clobbering each other.
  const name = `${fileStem(file.name)}-${Date.now().toString(36)}.${ext}`;
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));

  return Response.json({
    src: `/pilots/uploads/${slug}/${name}`,
    kind: file.type.startsWith("video/") ? "video" : "image",
  });
}
