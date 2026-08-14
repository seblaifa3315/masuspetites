import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MessagesTable } from "@/components/admin/messages-table";
import { MarkAllReadButton } from "@/components/admin/mark-all-read-button";

const MESSAGES_PER_PAGE = 20;

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const skip = (currentPage - 1) * MESSAGES_PER_PAGE;

  const [messages, totalCount, unreadCount] = await Promise.all([
    prisma.contactMessage.findMany({
      orderBy: [
        { isStarred: "desc" },
        { isRead: "asc" },
        { createdAt: "desc" },
      ],
      skip,
      take: MESSAGES_PER_PAGE,
    }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / MESSAGES_PER_PAGE));

  const serializedMessages = messages.map((msg) => ({
    id: msg.id,
    name: msg.name,
    email: msg.email,
    message: msg.message,
    isRead: msg.isRead,
    isStarred: msg.isStarred,
    createdAt: msg.createdAt.toISOString(),
  }));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-heading text-3xl font-bold">Messages</h1>
            <p className="mt-1 text-muted">
              View customer messages and inquiries.
            </p>
          </div>
          {unreadCount > 0 && (
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-white">
              {unreadCount} unread
            </span>
          )}
        </div>
        {unreadCount > 0 && <MarkAllReadButton />}
      </div>

      <MessagesTable messages={serializedMessages} />

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            {currentPage > 1 ? (
              <Link
                href={`/admin/messages?page=${currentPage - 1}`}
                className="rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-surface"
              >
                Previous
              </Link>
            ) : (
              <span className="rounded-md border border-border px-3 py-1.5 text-sm text-muted opacity-50">
                Previous
              </span>
            )}
            {currentPage < totalPages ? (
              <Link
                href={`/admin/messages?page=${currentPage + 1}`}
                className="rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-surface"
              >
                Next
              </Link>
            ) : (
              <span className="rounded-md border border-border px-3 py-1.5 text-sm text-muted opacity-50">
                Next
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
