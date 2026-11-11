import type { Metadata } from "next";
import { PilotEditor } from "@/components/pilot-editor/editor";

export const metadata: Metadata = {
  title: "Create a pilot story",
  description:
    "Write, illustrate and preview a Sankofa pilot story before it is published.",
  // An authoring tool has no business in search results.
  robots: { index: false, follow: false },
};

export default function CreatePilotPage() {
  return <PilotEditor />;
}
