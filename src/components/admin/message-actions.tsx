"use client";

import { useState, useTransition } from "react";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Mail,
  Star,
  Trash2,
} from "lucide-react";
import {
  toggleReadStatus,
  deleteMessage,
  toggleStarred,
} from "@/app/admin/(dashboard)/messages/actions";

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export function MessageRow({
  id,
  name,
  email,
  message,
  isRead,
  isStarred: starred,
  createdAt,
  isSelected,
  onToggleSelect,
}: {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  isStarred: boolean;
  createdAt: string;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isPending, startTransition] = useTransition();

  const date = new Date(createdAt);

  function handleToggleRead() {
    startTransition(() => toggleReadStatus(id));
  }

  function handleDelete() {
    if (
      !window.confirm(
        `Delete message from "${name}"? This cannot be undone.`
      )
    ) {
      return;
    }
    startTransition(() => deleteMessage(id));
  }

  function handleToggleStarred() {
    startTransition(() => toggleStarred(id));
  }

  const preview =
    message.length > 80 ? message.slice(0, 80) + "..." : message;

  return (
    <>
      <tr
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("button, a, input")) return;
          setExpanded(!expanded);
        }}
        className={`cursor-pointer transition-colors hover:bg-surface/50 ${
          !isRead ? "border-l-2 border-l-accent" : ""
        }`}
      >
        <td className="px-4 py-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(id)}
            className="h-4 w-4 rounded border-border accent-accent"
          />
        </td>
        <td className="px-4 py-3">
          {!isRead && (
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
          )}
        </td>
        <td className={`px-4 py-3 ${!isRead ? "font-semibold" : ""}`}>
          {name}
        </td>
        <td className="px-4 py-3 text-muted">{email}</td>
        <td className="px-4 py-3 text-muted">{preview}</td>
        <td
          className="px-4 py-3 text-muted whitespace-nowrap"
          title={date.toLocaleString()}
        >
          {formatDate(date)}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleStarred}
              disabled={isPending}
              className="rounded p-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground disabled:opacity-50"
              title={starred ? "Unstar" : "Star"}
            >
              <Star
                className={`h-4 w-4 ${
                  starred ? "fill-yellow-400 text-yellow-400" : ""
                }`}
              />
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="rounded p-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
              title={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={handleToggleRead}
              disabled={isPending}
              className="rounded p-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground disabled:opacity-50"
              title={isRead ? "Mark as unread" : "Mark as read"}
            >
              {isRead ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
            <a
              href={`mailto:${email}`}
              className="rounded p-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
              title="Reply"
            >
              <Mail className="h-4 w-4" />
            </a>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="rounded p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={7} className="p-0">
          <div
            className="grid transition-[grid-template-rows] duration-300 ease-in-out"
            style={{
              gridTemplateRows: expanded ? "1fr" : "0fr",
            }}
          >
            <div className="overflow-hidden">
              <div className="bg-surface/30 px-6 py-4">
                <p className="whitespace-pre-wrap text-sm text-foreground">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}
