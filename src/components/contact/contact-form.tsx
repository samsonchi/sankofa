"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const RECIPIENT = "info@teachsankofa.org";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    const subject = encodeURIComponent(`Message from ${name || "the website"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    const mailto = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;

    // brief preloader, then hand off to the visitor's email client
    setTimeout(() => {
      window.location.href = mailto;
    }, 5000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-2xl border border-border bg-surface p-7 shadow-sm sm:p-8"
    >
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-foreground">Name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="h-12 rounded-xl border border-border-strong bg-background px-4 text-foreground outline-none transition-colors placeholder:text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-foreground">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-12 rounded-xl border border-border-strong bg-background px-4 text-foreground outline-none transition-colors placeholder:text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-foreground">Message</span>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help?"
            rows={5}
            className="resize-y rounded-xl border border-border-strong bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30"
          />
        </label>

        <Button type="submit" size="lg" disabled={sending} className="mt-1 w-full">
          Send message
          <Send className="h-4 w-4" aria-hidden />
        </Button>
      </div>

      {sending && (
        <div className="absolute inset-0 grid place-items-center rounded-2xl bg-surface/85 backdrop-blur-sm">
          <span
            aria-hidden
            className="h-12 w-12 animate-spin rounded-full border-4 border-border-strong border-t-primary"
          />
        </div>
      )}
    </form>
  );
}
