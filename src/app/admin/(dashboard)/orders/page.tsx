import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { OrderRow } from "@/components/admin/order-row";
import { OrderFilters } from "@/components/admin/order-filters";
import { SortableHeader } from "@/components/admin/sortable-header";
import type { OrderStatus } from "@/generated/prisma/client";

const ORDERS_PER_PAGE = 20;

const ALLOWED_SORT_FIELDS = ["createdAt", "totalCents", "status"] as const;
type SortField = (typeof ALLOWED_SORT_FIELDS)[number];

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    page?: string;
    q?: string;
    from?: string;
    to?: string;
    sort?: string;
    dir?: string;
  }>;
}) {
  const { status, page, q, from, to, sort, dir } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const skip = (currentPage - 1) * ORDERS_PER_PAGE;

  const statusFilter =
    status && ["PAID", "SHIPPED", "DELIVERED"].includes(status)
      ? (status as OrderStatus)
      : null;

  const searchQuery = q?.trim() || "";
  const dateFrom = from || "";
  const dateTo = to || "";

  // Sort params
  const sortField: SortField =
    sort && ALLOWED_SORT_FIELDS.includes(sort as SortField)
      ? (sort as SortField)
      : "createdAt";
  const sortDir: "asc" | "desc" =
    dir === "asc" ? "asc" : "desc";

  // Build where clause
  const conditions: Record<string, unknown>[] = [];

  if (statusFilter) {
    conditions.push({ status: statusFilter });
  }

  if (searchQuery) {
    conditions.push({
      OR: [
        { orderNumber: { contains: searchQuery, mode: "insensitive" } },
        { customerName: { contains: searchQuery, mode: "insensitive" } },
        { customerEmail: { contains: searchQuery, mode: "insensitive" } },
      ],
    });
  }

  if (dateFrom || dateTo) {
    const dateCondition: Record<string, Date> = {};
    if (dateFrom) {
      dateCondition.gte = new Date(dateFrom);
    }
    if (dateTo) {
      const endOfDay = new Date(dateTo);
      endOfDay.setHours(23, 59, 59, 999);
      dateCondition.lte = endOfDay;
    }
    conditions.push({ createdAt: dateCondition });
  }

  const where = conditions.length > 0 ? { AND: conditions } : {};

  const [orders, totalCount, paidCount, shippedCount, deliveredCount] =
    await Promise.all([
      prisma.order.findMany({
        where,
        include: { items: true },
        orderBy: { [sortField]: sortDir },
        skip,
        take: ORDERS_PER_PAGE,
      }),
      prisma.order.count({ where }),
      prisma.order.count({ where: { status: "PAID" } }),
      prisma.order.count({ where: { status: "SHIPPED" } }),
      prisma.order.count({ where: { status: "DELIVERED" } }),
    ]);

  const allCount = paidCount + shippedCount + deliveredCount;
  const totalPages = Math.max(1, Math.ceil(totalCount / ORDERS_PER_PAGE));

  const statusTabs: {
    label: string;
    value: OrderStatus | null;
    count: number;
  }[] = [
    { label: "All", value: null, count: allCount },
    { label: "Paid", value: "PAID", count: paidCount },
    { label: "Shipped", value: "SHIPPED", count: shippedCount },
    { label: "Delivered", value: "DELIVERED", count: deliveredCount },
  ];

  function buildParams(overrides: Record<string, string | null> = {}) {
    const params = new URLSearchParams();
    const values: Record<string, string | null> = {
      status: statusFilter,
      q: searchQuery || null,
      from: dateFrom || null,
      to: dateTo || null,
      sort: sortField !== "createdAt" ? sortField : null,
      dir: sortDir !== "desc" ? sortDir : null,
      ...overrides,
    };
    for (const [key, val] of Object.entries(values)) {
      if (val) params.set(key, val);
    }
    return params;
  }

  // Build base params for SortableHeader (all filter state without sort/dir/page)
  const baseParams = new URLSearchParams();
  if (statusFilter) baseParams.set("status", statusFilter);
  if (searchQuery) baseParams.set("q", searchQuery);
  if (dateFrom) baseParams.set("from", dateFrom);
  if (dateTo) baseParams.set("to", dateTo);

  function paginationHref(p: number) {
    const params = buildParams();
    params.set("page", String(p));
    return `/admin/orders?${params.toString()}`;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold">Orders</h1>
        <p className="mt-1 text-muted">View and manage customer orders.</p>
      </div>

      {/* Search & date filters */}
      <OrderFilters
        searchQuery={searchQuery}
        dateFrom={dateFrom}
        dateTo={dateTo}
        statusFilter={statusFilter || ""}
      />

      {/* Status filter tabs */}
      <div className="mb-6 flex items-center gap-2">
        {statusTabs.map((tab) => {
          const isActive = statusFilter === tab.value;
          const params = buildParams({
            status: tab.value,
            page: null,
          });
          const href =
            params.toString()
              ? `/admin/orders?${params.toString()}`
              : "/admin/orders";
          return (
            <Link
              key={tab.label}
              href={href}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-white"
                  : "text-muted hover:bg-surface hover:text-foreground"
              }`}
            >
              {tab.label} ({tab.count})
            </Link>
          );
        })}
      </div>

      {orders.length === 0 ? (
        <div className="rounded-lg border border-border py-12 text-center">
          <p className="text-muted">
            {searchQuery || dateFrom || dateTo
              ? "No orders match your filters."
              : statusFilter
                ? `No ${statusFilter.toLowerCase()} orders found.`
                : "No orders yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left font-medium text-muted">
                  Order #
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted">
                  Customer
                </th>
                <th className="px-4 py-3 text-center font-medium text-muted">
                  Items
                </th>
                <SortableHeader
                  label="Total"
                  field="totalCents"
                  currentSort={sortField}
                  currentDir={sortDir}
                  align="right"
                  params={baseParams}
                />
                <SortableHeader
                  label="Status"
                  field="status"
                  currentSort={sortField}
                  currentDir={sortDir}
                  align="center"
                  params={baseParams}
                />
                <SortableHeader
                  label="Date"
                  field="createdAt"
                  currentSort={sortField}
                  currentDir={sortDir}
                  align="right"
                  params={baseParams}
                />
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {order.orderNumber}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-foreground">{order.customerName}</div>
                    <div className="text-xs text-muted">
                      {order.customerEmail}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-muted">
                    {order.items.reduce((sum, i) => sum + i.quantity, 0)}
                  </td>
                  <td className="px-4 py-3 text-right text-foreground">
                    ${(order.totalCents / 100).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 text-right text-muted">
                    {order.createdAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
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
