"use client";

import { useState, useTransition } from "react";
import {
  Eye,
  EyeOff,
  Inbox,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";
import { MessageRow } from "@/components/admin/message-actions";
import {
  bulkMarkRead,
  bulkMarkUnread,
  bulkToggleStarred,
  bulkDelete,
} from "@/app/admin/(dashboard)/messages/actions";

export type SerializedMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  isStarred: boolean;
  createdAt: string;
};

export function MessagesTable({
  messages,
}: {
  messages: SerializedMessage[];
}) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  const allSelected =
    messages.length > 0 && messages.every((m) => selectedIds.has(m.id));

  function handleToggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleSelectAll() {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(messages.map((m) => m.id)));
    }
  }

  function clearSelection() {
    setSelectedIds(new Set());
  }

  function handleBulkMarkRead() {
    const ids = Array.from(selectedIds);
    startTransition(async () => {
      await bulkMarkRead(ids);
      clearSelection();
    });
  }

  function handleBulkMarkUnread() {
    const ids = Array.from(selectedIds);
    startTransition(async () => {
      await bulkMarkUnread(ids);
      clearSelection();
    });
  }

  function handleBulkStar() {
    const ids = Array.from(selectedIds);
    startTransition(async () => {
      await bulkToggleStarred(ids, true);
      clearSelection();
    });
  }

  function handleBulkUnstar() {
    const ids = Array.from(selectedIds);
    startTransition(async () => {
      await bulkToggleStarred(ids, false);
      clearSelection();
    });
  }

  function handleBulkDelete() {
    const count = selectedIds.size;
    if (
      !window.confirm(
        `Delete ${count} message${count > 1 ? "s" : ""}? This cannot be undone.`
      )
    ) {
      return;
    }
    const ids = Array.from(selectedIds);
    startTransition(async () => {
      await bulkDelete(ids);
      clearSelection();
    });
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-border py-16">
        <Inbox className="h-12 w-12 text-muted" />
        <h3 className="mt-4 text-lg font-semibold">No messages</h3>
        <p className="mt-1 text-sm text-muted">
          When customers send you messages, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      {selectedIds.size > 0 && (
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2">
          <span className="text-sm font-medium">
            {selectedIds.size} selected
          </span>
          <div className="ml-2 flex items-center gap-1">
            <button
              onClick={handleBulkMarkRead}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-background hover:text-foreground disabled:opacity-50"
              title="Mark as read"
            >
              <Eye className="h-4 w-4" />
              Mark read
            </button>
            <button
              onClick={handleBulkMarkUnread}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-background hover:text-foreground disabled:opacity-50"
              title="Mark as unread"
            >
              <EyeOff className="h-4 w-4" />
              Mark unread
            </button>
            <button
              onClick={handleBulkStar}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-background hover:text-foreground disabled:opacity-50"
              title="Star"
            >
              <Star className="h-4 w-4" />
              Star
            </button>
            <button
              onClick={handleBulkUnstar}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-background hover:text-foreground disabled:opacity-50"
              title="Unstar"
            >
              <StarOff className="h-4 w-4" />
              Unstar
            </button>
            <button
              onClick={handleBulkDelete}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface text-left text-sm text-muted">
              <th className="w-10 px-4 py-3 font-medium">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-border accent-accent"
                />
              </th>
              <th className="w-8 px-4 py-3 font-medium" />
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Message</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {messages.map((msg) => (
              <MessageRow
                key={msg.id}
                id={msg.id}
                name={msg.name}
                email={msg.email}
                message={msg.message}
                isRead={msg.isRead}
                isStarred={msg.isStarred}
                createdAt={msg.createdAt}
                isSelected={selectedIds.has(msg.id)}
                onToggleSelect={handleToggleSelect}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
