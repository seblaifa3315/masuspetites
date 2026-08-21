"use client";

import { useState, useTransition } from "react";
import { addOrderNote } from "@/app/admin/(dashboard)/orders/actions";

export function OrderNotes({ orderId }: { orderId: string }) {
  const [content, setContent] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setError("");

    startTransition(async () => {
      const result = await addOrderNote(orderId, content);
      if (result?.error) {
        setError(result.error);
      } else {
        setContent("");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add an internal note..."
        rows={3}
        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={pending || !content.trim()}
        className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
      >
        {pending ? "Adding..." : "Add Note"}
      </button>
    </form>
  );
}
