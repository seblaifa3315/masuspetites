import { prisma } from "@/lib/prisma";
import type { DateRange } from "@/lib/dashboard-queries";

const DEFAULT_SETTINGS = {
  id: "default",
  stripeFeePercent: 2.9,
  stripeFeeFixed: 30,
  shippingFlatCost: 550,
  taxRatePercent: 25.0,
};

export async function getFinancesSettings() {
  const settings = await prisma.adminSettings.findUnique({
    where: { id: "default" },
  });
  return settings ?? DEFAULT_SETTINGS;
}

export interface FinancesSummary {
  grossRevenue: number;
  orderCount: number;
  stripeFees: number;
  shippingCosts: number;
  netBeforeTax: number;
  estimatedTax: number;
  estimatedTakeHome: number;
}

export async function getFinancesSummary(
  range?: DateRange,
): Promise<FinancesSummary> {
  const settings = await getFinancesSettings();

  const where: Record<string, unknown> = {};
  if (range?.from || range?.to) {
    const condition: Record<string, Date> = {};
    if (range.from) condition.gte = range.from;
    if (range.to) {
      const endOfDay = new Date(range.to);
      endOfDay.setHours(23, 59, 59, 999);
      condition.lte = endOfDay;
    }
    where.createdAt = condition;
  }

  const orders = await prisma.order.findMany({
    where,
    select: { totalCents: true },
  });

  const orderCount = orders.length;
  const grossRevenue = orders.reduce((sum, o) => sum + o.totalCents, 0);

  // Stripe fees: per-order (percentage + fixed)
  const stripeFees = orders.reduce((sum, o) => {
    const percentageFee = Math.round(
      o.totalCents * (settings.stripeFeePercent / 100),
    );
    return sum + percentageFee + settings.stripeFeeFixed;
  }, 0);

  const shippingCosts = orderCount * settings.shippingFlatCost;
  const netBeforeTax = grossRevenue - stripeFees - shippingCosts;
  const estimatedTax = Math.max(
    0,
    Math.round(netBeforeTax * (settings.taxRatePercent / 100)),
  );
  const estimatedTakeHome = netBeforeTax - estimatedTax;

  return {
    grossRevenue,
    orderCount,
    stripeFees,
    shippingCosts,
    netBeforeTax,
    estimatedTax,
    estimatedTakeHome,
  };
}

export interface MonthlyFinances {
  month: string;
  grossRevenue: number;
  stripeFees: number;
  shippingCosts: number;
  netBeforeTax: number;
  estimatedTakeHome: number;
}

export interface YearlyFinances {
  year: string;
  grossRevenue: number;
  stripeFees: number;
  shippingCosts: number;
  netBeforeTax: number;
  estimatedTakeHome: number;
}

export async function getYearlyFinances(): Promise<YearlyFinances[]> {
  const settings = await getFinancesSettings();

  const rows = await prisma.$queryRaw<
    { year: string; revenue: number; count: number }[]
  >`
    SELECT
      TO_CHAR(DATE_TRUNC('year', "createdAt"), 'YYYY') AS year,
      COALESCE(SUM("totalCents"), 0)::int AS revenue,
      COUNT(*)::int AS count
    FROM orders
    GROUP BY DATE_TRUNC('year', "createdAt")
    ORDER BY DATE_TRUNC('year', "createdAt")
  `;

  const ordersByYear = await prisma.$queryRaw<
    { year: string; totalCents: number }[]
  >`
    SELECT
      TO_CHAR(DATE_TRUNC('year', "createdAt"), 'YYYY') AS year,
      "totalCents"
    FROM orders
    ORDER BY DATE_TRUNC('year', "createdAt")
  `;

  const orderMap = new Map<string, number[]>();
  for (const o of ordersByYear) {
    const arr = orderMap.get(o.year) ?? [];
    arr.push(o.totalCents);
    orderMap.set(o.year, arr);
  }

  return rows.map((r) => {
    const yearOrders = orderMap.get(r.year) ?? [];
    const stripeFees = yearOrders.reduce((sum, totalCents) => {
      return (
        sum +
        Math.round(totalCents * (settings.stripeFeePercent / 100)) +
        settings.stripeFeeFixed
      );
    }, 0);
    const shippingCosts = r.count * settings.shippingFlatCost;
    const netBeforeTax = r.revenue - stripeFees - shippingCosts;
    const estimatedTax = Math.max(
      0,
      Math.round(netBeforeTax * (settings.taxRatePercent / 100)),
    );
    const estimatedTakeHome = netBeforeTax - estimatedTax;

    return {
      year: r.year,
      grossRevenue: r.revenue,
      stripeFees,
      shippingCosts,
      netBeforeTax,
      estimatedTakeHome,
    };
  });
}

export async function getMonthlyFinances(): Promise<MonthlyFinances[]> {
  const settings = await getFinancesSettings();

  const rows = await prisma.$queryRaw<
    { month: string; revenue: number; count: number }[]
  >`
    SELECT
      TO_CHAR(DATE_TRUNC('month', "createdAt"), 'YYYY-MM') AS month,
      COALESCE(SUM("totalCents"), 0)::int AS revenue,
      COUNT(*)::int AS count
    FROM orders
    WHERE "createdAt" >= DATE_TRUNC('month', NOW()) - INTERVAL '11 months'
    GROUP BY DATE_TRUNC('month', "createdAt")
    ORDER BY DATE_TRUNC('month', "createdAt")
  `;

  // For per-order Stripe fees we also need individual order totals per month
  const ordersByMonth = await prisma.$queryRaw<
    { month: string; totalCents: number }[]
  >`
    SELECT
      TO_CHAR(DATE_TRUNC('month', "createdAt"), 'YYYY-MM') AS month,
      "totalCents"
    FROM orders
    WHERE "createdAt" >= DATE_TRUNC('month', NOW()) - INTERVAL '11 months'
    ORDER BY DATE_TRUNC('month', "createdAt")
  `;

  // Group individual orders by month for accurate Stripe fee calculation
  const orderMap = new Map<string, number[]>();
  for (const o of ordersByMonth) {
    const arr = orderMap.get(o.month) ?? [];
    arr.push(o.totalCents);
    orderMap.set(o.month, arr);
  }

  return rows.map((r) => {
    const monthOrders = orderMap.get(r.month) ?? [];
    const stripeFees = monthOrders.reduce((sum, totalCents) => {
      return (
        sum +
        Math.round(totalCents * (settings.stripeFeePercent / 100)) +
        settings.stripeFeeFixed
      );
    }, 0);
    const shippingCosts = r.count * settings.shippingFlatCost;
    const netBeforeTax = r.revenue - stripeFees - shippingCosts;
    const estimatedTax = Math.max(
      0,
      Math.round(netBeforeTax * (settings.taxRatePercent / 100)),
    );
    const estimatedTakeHome = netBeforeTax - estimatedTax;

    return {
      month: r.month,
      grossRevenue: r.revenue,
      stripeFees,
      shippingCosts,
      netBeforeTax,
      estimatedTakeHome,
    };
  });
}
