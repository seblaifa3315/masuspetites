"use client";

import { ShoppingBag, Truck, PackageCheck, StickyNote, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteOrderNote } from "@/app/admin/(dashboard)/orders/actions";

type TimelineEvent = {
  type: "placed" | "shipped" | "delivered" | "note";
  date: Date;
  title: string;
  details?: string;
  noteId?: string;
};

interface OrderForTimeline {
  createdAt: Date;
  shippedAt: Date | null;
  deliveredAt: Date | null;
  shippingCarrier: string | null;
  trackingNumber: string | null;
  notes: {
    id: string;
    content: string;
    createdAt: Date;
  }[];
}

const DOT_COLORS: Record<TimelineEvent["type"], string> = {
  placed: "bg-yellow-500",
  shipped: "bg-blue-500",
  delivered: "bg-green-500",
  note: "bg-muted",
};

const ICONS: Record<TimelineEvent["type"], React.ElementType> = {
  placed: ShoppingBag,
  shipped: Truck,
  delivered: PackageCheck,
  note: StickyNote,
};

function NoteDeleteButton({ noteId }: { noteId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(() => {
          deleteOrderNote(noteId);
        })
      }
      disabled={pending}
      className="ml-2 text-muted transition-colors hover:text-red-400 disabled:opacity-50"
      title="Delete note"
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  );
}

export function OrderTimeline({ order }: { order: OrderForTimeline }) {
  const events: TimelineEvent[] = [];

  events.push({
    type: "placed",
    date: new Date(order.createdAt),
    title: "Order placed",
  });

  if (order.shippedAt) {
    const details = [order.shippingCarrier, order.trackingNumber]
      .filter(Boolean)
      .join(" - ");
    events.push({
      type: "shipped",
      date: new Date(order.shippedAt),
      title: "Shipped",
      details: details || undefined,
    });
  }

  if (order.deliveredAt) {
    events.push({
      type: "delivered",
      date: new Date(order.deliveredAt),
      title: "Delivered",
    });
  }

  for (const note of order.notes) {
    events.push({
      type: "note",
      date: new Date(note.createdAt),
      title: "Note",
      details: note.content,
      noteId: note.id,
    });
  }

  events.sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="relative space-y-0">
      {events.map((event, i) => {
        const Icon = ICONS[event.type];
        const isLast = i === events.length - 1;

        return (
          <div key={`${event.type}-${event.noteId || i}`} className="relative flex gap-4 pb-6">
            {/* Vertical line */}
            {!isLast && (
              <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
            )}

            {/* Dot */}
            <div
              className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${DOT_COLORS[event.type]}`}
            >
              <Icon className="h-3.5 w-3.5 text-white" />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {event.title}
                </span>
                <span className="text-xs text-muted">
                  {event.date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  {event.date.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
                {event.noteId && <NoteDeleteButton noteId={event.noteId} />}
              </div>
              {event.details && (
                <p className="mt-1 text-sm text-muted">{event.details}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
