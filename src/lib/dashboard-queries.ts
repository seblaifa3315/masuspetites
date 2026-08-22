import { prisma } from "@/lib/prisma";

export interface DateRange {
  from?: Date;
  to?: Date;
}

function dateWhere(range?: DateRange) {
  if (!range?.from && !range?.to) return {};
  const condition: Record<string, Date> = {};
  if (range.from) condition.gte = range.from;
  if (range.to) {
    const endOfDay = new Date(range.to);
    endOfDay.setHours(23, 59, 59, 999);
    condition.lte = endOfDay;
  }
  return { createdAt: condition };
}

export async function getTotalRevenue(range?: DateRange): Promise<number> {
  const result = await prisma.order.aggregate({
    _sum: { totalCents: true },
    where: dateWhere(range),
  });
  return result._sum.totalCents ?? 0;
}

export async function getOrderCount(range?: DateRange): Promise<number> {
  return prisma.order.count({
    where: dateWhere(range),
  });
}

export async function getNewClients(range?: DateRange): Promise<number> {
  if (range?.from) {
    const to = range.to
      ? (() => { const d = new Date(range.to); d.setHours(23, 59, 59, 999); return d; })()
      : new Date();
    const result = await prisma.$queryRaw<[{ count: number }]>`
      SELECT COUNT(*)::int AS count
      FROM (
        SELECT "customerEmail"
        FROM orders
        GROUP BY "customerEmail"
        HAVING MIN("createdAt") >= ${range.from}
          AND MIN("createdAt") <= ${to}
      ) AS new_clients
    `;
    return result[0]?.count ?? 0;
  }
  // No from date: count all unique customers (optionally up to `to`)
  const where = range?.to ? dateWhere(range) : {};
  const result = await prisma.order.groupBy({
    by: ["customerEmail"],
    where,
  });
  return result.length;
}

export async function getAverageOrderValue(range?: DateRange): Promise<number> {
  const result = await prisma.order.aggregate({
    _avg: { totalCents: true },
    where: dateWhere(range),
  });
  return Math.round(result._avg.totalCents ?? 0);
}

export async function getMonthlyRevenue(): Promise<
  { month: string; revenue: number }[]
> {
  const rows = await prisma.$queryRaw<{ month: string; revenue: number }[]>`
    SELECT
      TO_CHAR(DATE_TRUNC('month', "createdAt"), 'YYYY-MM') AS month,
      COALESCE(SUM("totalCents"), 0)::int AS revenue
    FROM orders
    WHERE "createdAt" >= DATE_TRUNC('month', NOW()) - INTERVAL '11 months'
    GROUP BY DATE_TRUNC('month', "createdAt")
    ORDER BY DATE_TRUNC('month', "createdAt")
  `;
  return rows;
}

export async function getMonthlyOrders(): Promise<
  { month: string; orders: number }[]
> {
  const rows = await prisma.$queryRaw<{ month: string; orders: number }[]>`
    SELECT
      TO_CHAR(DATE_TRUNC('month', "createdAt"), 'YYYY-MM') AS month,
      COUNT(*)::int AS orders
    FROM orders
    WHERE "createdAt" >= DATE_TRUNC('month', NOW()) - INTERVAL '11 months'
    GROUP BY DATE_TRUNC('month', "createdAt")
    ORDER BY DATE_TRUNC('month', "createdAt")
  `;
  return rows;
}

export async function getYearlyRevenue(): Promise<
  { year: string; revenue: number }[]
> {
  const rows = await prisma.$queryRaw<{ year: string; revenue: number }[]>`
    SELECT
      TO_CHAR(DATE_TRUNC('year', "createdAt"), 'YYYY') AS year,
      COALESCE(SUM("totalCents"), 0)::int AS revenue
    FROM orders
    GROUP BY DATE_TRUNC('year', "createdAt")
    ORDER BY DATE_TRUNC('year', "createdAt")
  `;
  return rows;
}

export async function getYearlyOrders(): Promise<
  { year: string; orders: number }[]
> {
  const rows = await prisma.$queryRaw<{ year: string; orders: number }[]>`
    SELECT
      TO_CHAR(DATE_TRUNC('year', "createdAt"), 'YYYY') AS year,
      COUNT(*)::int AS orders
    FROM orders
    GROUP BY DATE_TRUNC('year', "createdAt")
    ORDER BY DATE_TRUNC('year', "createdAt")
  `;
  return rows;
}

export async function getTopProducts(): Promise<
  { productName: string; unitsSold: number }[]
> {
  const rows = await prisma.$queryRaw<
    { productName: string; unitsSold: number }[]
  >`
    SELECT
      "productName" AS "productName",
      SUM(quantity)::int AS "unitsSold"
    FROM order_items
    GROUP BY "productName"
    ORDER BY "unitsSold" DESC
    LIMIT 5
  `;
  return rows;
}

export async function getTopProductsThisMonth(): Promise<
  { productName: string; unitsSold: number }[]
> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const rows = await prisma.$queryRaw<
    { productName: string; unitsSold: number }[]
  >`
    SELECT
      oi."productName" AS "productName",
      SUM(oi.quantity)::int AS "unitsSold"
    FROM order_items oi
    JOIN orders o ON o.id = oi."orderId"
    WHERE o."createdAt" >= ${startOfMonth}
    GROUP BY oi."productName"
    ORDER BY "unitsSold" DESC
    LIMIT 5
  `;
  return rows;
}

export async function getTopProductsThisYear(): Promise<
  { productName: string; unitsSold: number }[]
> {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);
  const rows = await prisma.$queryRaw<
    { productName: string; unitsSold: number }[]
  >`
    SELECT
      oi."productName" AS "productName",
      SUM(oi.quantity)::int AS "unitsSold"
    FROM order_items oi
    JOIN orders o ON o.id = oi."orderId"
    WHERE o."createdAt" >= ${startOfYear}
    GROUP BY oi."productName"
    ORDER BY "unitsSold" DESC
    LIMIT 5
  `;
  return rows;
}

export async function getOrderStatusBreakdown(): Promise<
  { status: string; count: number }[]
> {
  const rows = await prisma.$queryRaw<{ status: string; count: number }[]>`
    SELECT
      status,
      COUNT(*)::int AS count
    FROM orders
    GROUP BY status
  `;
  return rows;
}

export async function getRecentOrders() {
  return prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });
}
