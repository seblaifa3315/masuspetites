"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// --- Theme colors hook ---

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
        foreground: style.getPropertyValue("--foreground").trim() || DARK_DEFAULTS.foreground,
        muted: style.getPropertyValue("--muted").trim() || DARK_DEFAULTS.muted,
        accent: style.getPropertyValue("--accent").trim() || DARK_DEFAULTS.accent,
        surface: style.getPropertyValue("--surface").trim() || DARK_DEFAULTS.surface,
        border: style.getPropertyValue("--border").trim() || DARK_DEFAULTS.border,
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

// --- Gap fillers ---

function fillMonthlyGaps<T extends { month: string }>(
  data: T[],
  defaultValue: Omit<T, "month">,
): T[] {
  const now = new Date();
  const months: T[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const existing = data.find((r) => r.month === key);
    months.push(existing ?? ({ month: key, ...defaultValue } as T));
  }
  return months;
}

function formatMonthLabel(month: string): string {
  const [year, m] = month.split("-");
  const date = new Date(Number(year), Number(m) - 1);
  return date.toLocaleDateString("en-US", { month: "short" });
}

// --- Shared helpers ---

function tooltipStyle(colors: ThemeColors) {
  return {
    contentStyle: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      color: colors.foreground,
      borderRadius: 8,
      fontSize: 13,
    },
    labelStyle: { color: colors.muted },
  };
}

function PeriodToggle({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { key: string; label: string }[];
}) {
  return (
    <div className="flex gap-1 rounded-lg border border-border p-0.5">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            value === opt.key
              ? "bg-accent text-white"
              : "text-muted hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// --- Revenue Chart ---

export function RevenueBarChart({
  monthlyData,
  yearlyData,
}: {
  monthlyData: { month: string; revenue: number }[];
  yearlyData: { year: string; revenue: number }[];
}) {
  const colors = useThemeColors();
  const [period, setPeriod] = useState("monthly");

  const isMonthly = period === "monthly";

  const filled = fillMonthlyGaps(monthlyData, { revenue: 0 });
  const monthlyDisplay = filled.map((d) => ({
    label: formatMonthLabel(d.month),
    dollars: d.revenue / 100,
  }));
  const yearlyDisplay = yearlyData.map((d) => ({
    label: d.year,
    dollars: d.revenue / 100,
  }));

  const display = isMonthly ? monthlyDisplay : yearlyDisplay;

  return (
    <div className="min-w-0 rounded-lg border border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted">Revenue</h3>
        <PeriodToggle
          value={period}
          onChange={setPeriod}
          options={[
            { key: "monthly", label: "Monthly" },
            { key: "yearly", label: "Yearly" },
          ]}
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={display}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
          <XAxis dataKey="label" tick={{ fill: colors.muted, fontSize: 12 }} />
          <YAxis
            tick={{ fill: colors.muted, fontSize: 12 }}
            tickFormatter={(v: number) => `$${v}`}
          />
          <Tooltip
            {...tooltipStyle(colors)}
            formatter={(value) => [`$${Number(value).toFixed(2)}`, "Revenue"]}
          />
          <Bar dataKey="dollars" fill={colors.accent} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- Orders Chart ---

export function OrdersLineChart({
  monthlyData,
  yearlyData,
}: {
  monthlyData: { month: string; orders: number }[];
  yearlyData: { year: string; orders: number }[];
}) {
  const colors = useThemeColors();
  const [period, setPeriod] = useState("monthly");

  const isMonthly = period === "monthly";

  const filled = fillMonthlyGaps(monthlyData, { orders: 0 });
  const monthlyDisplay = filled.map((d) => ({
    label: formatMonthLabel(d.month),
    orders: d.orders,
  }));
  const yearlyDisplay = yearlyData.map((d) => ({
    label: d.year,
    orders: d.orders,
  }));

  const display = isMonthly ? monthlyDisplay : yearlyDisplay;

  return (
    <div className="min-w-0 rounded-lg border border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted">Orders</h3>
        <PeriodToggle
          value={period}
          onChange={setPeriod}
          options={[
            { key: "monthly", label: "Monthly" },
            { key: "yearly", label: "Yearly" },
          ]}
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={display}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
          <XAxis dataKey="label" tick={{ fill: colors.muted, fontSize: 12 }} />
          <YAxis
            tick={{ fill: colors.muted, fontSize: 12 }}
            allowDecimals={false}
          />
          <Tooltip
            {...tooltipStyle(colors)}
            formatter={(value) => [value, "Orders"]}
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke={colors.accent}
            strokeWidth={2}
            dot={{ fill: colors.accent, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- Order Status Donut ---

const STATUS_COLORS: Record<string, string> = {
  PAID: "#EAB308",
  SHIPPED: "#3B82F6",
  DELIVERED: "#22C55E",
};

export function OrderStatusDonut({
  data,
}: {
  data: { status: string; count: number }[];
}) {
  const colors = useThemeColors();

  if (data.length === 0) {
    return (
      <div className="min-w-0 rounded-lg border border-border bg-surface p-6">
        <h3 className="mb-4 text-sm font-medium text-muted">Order Status</h3>
        <div className="flex h-[300px] items-center justify-center">
          <p className="text-muted">No orders yet.</p>
        </div>
      </div>
    );
  }

  const display = data.map((d) => ({
    name: d.status.charAt(0) + d.status.slice(1).toLowerCase(),
    value: d.count,
    color: STATUS_COLORS[d.status] ?? colors.muted,
  }));

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h3 className="mb-4 text-sm font-medium text-muted">Order Status</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={display}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {display.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.foreground,
              borderRadius: 8,
              fontSize: 13,
            }}
          />
          <Legend
            verticalAlign="bottom"
            formatter={(value: string) => (
              <span style={{ color: colors.foreground, fontSize: 13 }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- Top Products Chart ---

export function TopProductsChart({
  allTimeData,
  thisMonthData,
  thisYearData,
}: {
  allTimeData: { productName: string; unitsSold: number }[];
  thisMonthData: { productName: string; unitsSold: number }[];
  thisYearData: { productName: string; unitsSold: number }[];
}) {
  const colors = useThemeColors();
  const [period, setPeriod] = useState("all");

  const data =
    period === "month" ? thisMonthData : period === "year" ? thisYearData : allTimeData;

  const empty = data.length === 0;

  return (
    <div className="min-w-0 rounded-lg border border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted">Top Products</h3>
        <PeriodToggle
          value={period}
          onChange={setPeriod}
          options={[
            { key: "month", label: "This Month" },
            { key: "year", label: "This Year" },
            { key: "all", label: "All Time" },
          ]}
        />
      </div>
      {empty ? (
        <div className="flex h-[300px] items-center justify-center">
          <p className="text-muted">No products sold yet.</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis
              type="number"
              tick={{ fill: colors.muted, fontSize: 12 }}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="productName"
              tick={{ fill: colors.muted, fontSize: 12 }}
              width={120}
            />
            <Tooltip
              {...tooltipStyle(colors)}
              formatter={(value) => [value, "Units Sold"]}
            />
            <Bar dataKey="unitsSold" fill={colors.accent} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
