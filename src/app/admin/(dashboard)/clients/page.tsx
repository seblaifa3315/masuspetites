import Link from "next/link";
import { Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { OrderRow } from "@/components/admin/order-row";
import { SortableHeader } from "@/components/admin/sortable-header";
import { Prisma } from "@/generated/prisma/client";

const CLIENTS_PER_PAGE = 20;

const ALLOWED_SORT_FIELDS = [
  "name",
  "email",
  "totalOrders",
  "totalSpent",
  "lastOrderDate",
] as const;
type SortField = (typeof ALLOWED_SORT_FIELDS)[number];

const SORT_SQL: Record<SortField, string> = {
  name: "name",
  email: "email",
  totalOrders: '"totalOrders"',
  totalSpent: '"totalSpent"',
  lastOrderDate: '"lastOrderDate"',
};

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    q?: string;
    sort?: string;
    dir?: string;
  }>;
}) {
  const { page, q, sort, dir } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const skip = (currentPage - 1) * CLIENTS_PER_PAGE;

  const searchQuery = q?.trim() || "";

  const sortField: SortField =
    sort && ALLOWED_SORT_FIELDS.includes(sort as SortField)
      ? (sort as SortField)
      : "lastOrderDate";
  const sortDir: "asc" | "desc" = dir === "asc" ? "asc" : "desc";

  const searchCondition = searchQuery
    ? Prisma.sql`AND (o."customerEmail" ILIKE ${"%" + searchQuery + "%"} OR o."customerName" ILIKE ${"%" + searchQuery + "%"})`
    : Prisma.sql``;

  const orderByClause = Prisma.raw(
    `${SORT_SQL[sortField]} ${sortDir === "asc" ? "ASC" : "DESC"}`
  );

  type ClientRow = {
    email: string;
    name: string | null;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: Date;
  };

  const clients = await prisma.$queryRaw<ClientRow[]>`
    SELECT
      o."customerEmail" AS email,
      (SELECT o2."customerName" FROM orders o2
       WHERE o2."customerEmail" = o."customerEmail"
       ORDER BY o2."createdAt" DESC LIMIT 1) AS name,
      COUNT(*)::int AS "totalOrders",
      SUM(o."totalCents")::int AS "totalSpent",
      MAX(o."createdAt") AS "lastOrderDate"
    FROM orders o
    WHERE 1=1 ${searchCondition}
    GROUP BY o."customerEmail"
    ORDER BY ${orderByClause}
    LIMIT ${CLIENTS_PER_PAGE} OFFSET ${skip}
  `;

  const countResult = await prisma.$queryRaw<[{ count: number }]>`
    SELECT COUNT(*)::int AS count FROM (
      SELECT o."customerEmail"
      FROM orders o
      WHERE 1=1 ${searchCondition}
      GROUP BY o."customerEmail"
    ) sub
  `;

  const totalCount = countResult[0]?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / CLIENTS_PER_PAGE));

  // Build base params for SortableHeader (search state without sort/dir/page)
  const baseParams = new URLSearchParams();
  if (searchQuery) baseParams.set("q", searchQuery);

  function buildParams(overrides: Record<string, string | null> = {}) {
    const params = new URLSearchParams();
    const values: Record<string, string | null> = {
      q: searchQuery || null,
      sort: sortField !== "lastOrderDate" ? sortField : null,
      dir: sortDir !== "desc" ? sortDir : null,
      ...overrides,
    };
    for (const [key, val] of Object.entries(values)) {
      if (val) params.set(key, val);
    }
    return params;
  }

  function paginationHref(p: number) {
    const params = buildParams();
    params.set("page", String(p));
    return `/admin/clients?${params.toString()}`;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold">Clients</h1>
        <p className="mt-1 text-muted">
          View clients derived from order history.
        </p>
      </div>

      {/* Search */}
      <form action="/admin/clients" className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            name="q"
            defaultValue={searchQuery}
            placeholder="Search by name or email..."
            className="w-full rounded-lg border border-border bg-surface py-2 pl-11 pr-4 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </form>

      {clients.length === 0 ? (
        <div className="rounded-lg border border-border py-12 text-center">
          <p className="text-muted">
            {searchQuery
              ? "No clients match your search."
              : "No clients yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <SortableHeader
                  label="Name"
                  field="name"
                  currentSort={sortField}
                  currentDir={sortDir}
                  params={baseParams}
                  basePath="/admin/clients"
                />
                <SortableHeader
                  label="Email"
                  field="email"
                  currentSort={sortField}
                  currentDir={sortDir}
                  params={baseParams}
                  basePath="/admin/clients"
                />
                <SortableHeader
                  label="Orders"
                  field="totalOrders"
                  currentSort={sortField}
                  currentDir={sortDir}
                  align="center"
                  params={baseParams}
                  basePath="/admin/clients"
                />
                <SortableHeader
                  label="Total Spent"
                  field="totalSpent"
                  currentSort={sortField}
                  currentDir={sortDir}
                  align="right"
                  params={baseParams}
                  basePath="/admin/clients"
                />
                <SortableHeader
                  label="Last Order"
                  field="lastOrderDate"
                  currentSort={sortField}
                  currentDir={sortDir}
                  align="right"
                  params={baseParams}
                  basePath="/admin/clients"
                />
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <OrderRow
                  key={client.email}
                  href={`/admin/clients/${encodeURIComponent(client.email)}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {client.name || "—"}
                  </td>
                  <td className="px-4 py-3 text-muted">{client.email}</td>
                  <td className="px-4 py-3 text-center text-muted">
                    {client.totalOrders}
                  </td>
                  <td className="px-4 py-3 text-right text-foreground">
                    ${(client.totalSpent / 100).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right text-muted">
                    {new Date(client.lastOrderDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </td>
                </OrderRow>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            {currentPage > 1 ? (
              <Link
                href={paginationHref(currentPage - 1)}
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
                href={paginationHref(currentPage + 1)}
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
