import {
  DollarSign,
  CreditCard,
  Truck,
  TrendingDown,
  Landmark,
  Wallet,
} from "lucide-react";
import { DashboardDateFilter } from "@/components/admin/dashboard/date-filter";
import { FinancesChart } from "@/components/admin/finances-breakdown";
import { FinancesSettingsForm } from "@/components/admin/finances-settings-form";
import {
  getFinancesSummary,
  getMonthlyFinances,
  getYearlyFinances,
  type FinancesSummary,
} from "@/lib/finances-queries";
import type { DateRange } from "@/lib/dashboard-queries";

function formatCents(cents: number): string {
  const abs = Math.abs(cents);
  const formatted = `$${(abs / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  return cents < 0 ? `-${formatted}` : formatted;
}

const summaryCards: {
  key: keyof FinancesSummary;
  label: string;
  icon: typeof DollarSign;
  negative?: boolean;
}[] = [
  { key: "grossRevenue", label: "Gross Revenue", icon: DollarSign },
  { key: "stripeFees", label: "Stripe Fees", icon: CreditCard, negative: true },
  { key: "shippingCosts", label: "Shipping", icon: Truck, negative: true },
  { key: "netBeforeTax", label: "Net Before Tax", icon: TrendingDown },
  { key: "estimatedTax", label: "Est. Tax", icon: Landmark, negative: true },
  { key: "estimatedTakeHome", label: "Est. Take-Home", icon: Wallet },
];

export default async function FinancesPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const { from, to } = await searchParams;

  const dateFrom = from || "";
  const dateTo = to || "";

  const range: DateRange = {};
  if (dateFrom) range.from = new Date(dateFrom);
  if (dateTo) range.to = new Date(dateTo);

  const [summary, monthlyData, yearlyData] = await Promise.all([
    getFinancesSummary(range),
    getMonthlyFinances(),
    getYearlyFinances(),
  ]);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold">Finances</h1>
        <p className="mt-1 text-muted">
          Estimated breakdown of revenue, fees, and margins.
        </p>
      </div>

      <div className="space-y-6">
        <DashboardDateFilter dateFrom={dateFrom} dateTo={dateTo} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            const value = summary[card.key];
            return (
              <div
                key={card.key}
                className="rounded-lg border border-border bg-surface p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-accent/10 p-2">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <p className="text-sm text-muted">{card.label}</p>
                </div>
                <p className="mt-3 text-2xl font-bold text-foreground">
                  {card.negative ? `- ${formatCents(value as number)}` : formatCents(value as number)}
                </p>
              </div>
            );
          })}
        </div>

        <FinancesChart monthlyData={monthlyData} yearlyData={yearlyData} />

        <FinancesSettingsForm />

        <p className="text-center text-xs text-muted">
          These are estimates based on your configured rates. Consult an
          accountant for tax obligations.
        </p>
      </div>
    </div>
  );
}
