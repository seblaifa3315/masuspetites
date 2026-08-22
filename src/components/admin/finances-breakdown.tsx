"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { MonthlyFinances, YearlyFinances } from "@/lib/finances-queries";

interface ThemeColors {
  foreground: string;
  muted: string;
  accent: string;
  surface: string;
  border: string;
}

const DARK_DEFAULTS: ThemeColors = {
  foreground: "#F0F0F0",
  muted: "#737373",
  accent: "#EC4899",
  surface: "#161616",
  border: "#262626",
};

function useThemeColors(): ThemeColors {
  const [colors, setColors] = useState<ThemeColors>(DARK_DEFAULTS);

  useEffect(() => {
    function read() {
      const style = getComputedStyle(document.documentElement);
      setColors({
        foreground:
          style.getPropertyValue("--foreground").trim() ||
          DARK_DEFAULTS.foreground,
        muted:
          style.getPropertyValue("--muted").trim() || DARK_DEFAULTS.muted,
        accent:
          style.getPropertyValue("--accent").trim() || DARK_DEFAULTS.accent,
        surface:
          style.getPropertyValue("--surface").trim() || DARK_DEFAULTS.surface,
        border:
          style.getPropertyValue("--border").trim() || DARK_DEFAULTS.border,
      });
    }

    read();

    const observer = new MutationObserver(() => read());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return colors;
}

function formatMonthLabel(month: string): string {
  const [year, m] = month.split("-");
  const date = new Date(Number(year), Number(m) - 1);
  return date.toLocaleDateString("en-US", { month: "short" });
}

function fillMonthlyGaps(data: MonthlyFinances[]): MonthlyFinances[] {
  const now = new Date();
  const months: MonthlyFinances[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const existing = data.find((r) => r.month === key);
    months.push(
      existing ?? {
        month: key,
        grossRevenue: 0,
        stripeFees: 0,
        shippingCosts: 0,
        netBeforeTax: 0,
        estimatedTakeHome: 0,
      },
    );
  }
  return months;
}

const BAR_COLORS = {
  grossRevenue: "#EC4899",
  netBeforeTax: "#8B5CF6",
  estimatedTakeHome: "#22C55E",
};

export function FinancesChart({
  monthlyData,
  yearlyData,
}: {
  monthlyData: MonthlyFinances[];
  yearlyData: YearlyFinances[];
}) {
  const colors = useThemeColors();
  const [period, setPeriod] = useState("monthly");

  const isMonthly = period === "monthly";

  const filled = fillMonthlyGaps(monthlyData);
  const monthlyDisplay = filled.map((d) => ({
    label: formatMonthLabel(d.month),
    "Gross Revenue": d.grossRevenue / 100,
    "Net Before Tax": d.netBeforeTax / 100,
    "Est. Take-Home": d.estimatedTakeHome / 100,
  }));

  const yearlyDisplay = yearlyData.map((d) => ({
    label: d.year,
    "Gross Revenue": d.grossRevenue / 100,
    "Net Before Tax": d.netBeforeTax / 100,
    "Est. Take-Home": d.estimatedTakeHome / 100,
  }));

  const display = isMonthly ? monthlyDisplay : yearlyDisplay;

  return (
    <div className="min-w-0 rounded-lg border border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted">Breakdown</h3>
        <div className="flex gap-1 rounded-lg border border-border p-0.5">
          {[
            { key: "monthly", label: "Monthly" },
            { key: "yearly", label: "Yearly" },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => setPeriod(opt.key)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                period === opt.key
                  ? "bg-accent text-white"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={display}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.muted, fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: colors.muted, fontSize: 12 }}
            tickFormatter={(v: number) => `$${v}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.foreground,
              borderRadius: 8,
              fontSize: 13,
            }}
            labelStyle={{ color: colors.muted }}
            formatter={(value) => [`$${Number(value).toFixed(2)}`]}
          />
          <Legend
            formatter={(value: string) => (
              <span style={{ color: colors.foreground, fontSize: 13 }}>
                {value}
              </span>
            )}
          />
          <Bar
            dataKey="Gross Revenue"
            fill={BAR_COLORS.grossRevenue}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="Net Before Tax"
            fill={BAR_COLORS.netBeforeTax}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="Est. Take-Home"
            fill={BAR_COLORS.estimatedTakeHome}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
