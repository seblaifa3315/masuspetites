"use client";

import { useTransition } from "react";
import { CheckCheck } from "lucide-react";
import { markAllAsRead } from "@/app/admin/(dashboard)/messages/actions";

export function MarkAllReadButton() {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => markAllAsRead());
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground disabled:opacity-50"
    >
      <CheckCheck className="h-4 w-4" />
      Mark all as read
    </button>
  );
}
