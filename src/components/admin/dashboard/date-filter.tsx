"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { X } from "lucide-react";

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

const PRESETS = [
  { label: "This Month", key: "month" },
  { label: "This Year", key: "year" },
  { label: "All Time", key: "all" },
] as const;

function getPresetRange(key: string): { from: string; to: string } {
  const now = new Date();
  const to = formatDate(now);
  if (key === "month") {
    return { from: formatDate(new Date(now.getFullYear(), now.getMonth(), 1)), to };
  }
  if (key === "year") {
    return { from: `${now.getFullYear()}-01-01`, to };
  }
  return { from: "", to: "" };
}

function detectPreset(from: string, to: string): string | null {
  for (const preset of PRESETS) {
    const range = getPresetRange(preset.key);
    if (range.from === from && range.to === to) return preset.key;
    if (preset.key === "all" && !from && !to) return "all";
  }
  return null;
}

export function DashboardDateFilter({
  dateFrom,
  dateTo,
}: {
  dateFrom: string;
  dateTo: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [customFrom, setCustomFrom] = useState(dateFrom);
  const [customTo, setCustomTo] = useState(dateTo);

  const activePreset = detectPreset(dateFrom, dateTo);

  function navigate(from: string, to: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (from) {
      params.set("from", from);
    } else {
      params.delete("from");
    }
    if (to) {
      params.set("to", to);
    } else {
      params.delete("to");
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  function applyPreset(key: string) {
    const range = getPresetRange(key);
    setCustomFrom(range.from);
    setCustomTo(range.to);
    navigate(range.from, range.to);
  }

  function applyCustomRange() {
    if (!customFrom && !customTo) return;
    navigate(customFrom, customTo);
  }

  function clearDates() {
    setCustomFrom("");
    setCustomTo("");
    navigate("", "");
  }

  const hasDateFilter = dateFrom || dateTo;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {PRESETS.map((preset) => (
        <button
          key={preset.key}
          onClick={() => applyPreset(preset.key)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            activePreset === preset.key
              ? "bg-accent text-white"
              : "border border-border text-muted hover:bg-surface hover:text-foreground"
          }`}
        >
          {preset.label}
        </button>
      ))}

      <span className="mx-1 text-border">|</span>

      <input
        type="date"
        value={customFrom}
        onChange={(e) => setCustomFrom(e.target.value)}
        className="rounded-lg border border-border bg-surface px-2 py-1 text-sm text-foreground focus:border-accent focus:outline-none"
      />
      <span className="text-sm text-muted">to</span>
      <input
        type="date"
        value={customTo}
        onChange={(e) => setCustomTo(e.target.value)}
        className="rounded-lg border border-border bg-surface px-2 py-1 text-sm text-foreground focus:border-accent focus:outline-none"
      />
      <button
        onClick={applyCustomRange}
        className="rounded-lg border border-border px-3 py-1 text-sm font-medium text-foreground transition-colors hover:bg-surface"
      >
        Apply
      </button>

      {hasDateFilter && (
        <button
          onClick={clearDates}
          className="rounded-lg px-2 py-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          <X className="inline h-3.5 w-3.5" /> Clear
        </button>
      )}
    </div>
  );
}
