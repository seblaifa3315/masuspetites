"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";

const DATE_PRESETS = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "This year", days: 0 },
] as const;

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function getPresetRange(preset: (typeof DATE_PRESETS)[number]) {
  const now = new Date();
  const to = formatDate(now);
  if (preset.days === 0) {
    const from = `${now.getFullYear()}-01-01`;
    return { from, to };
  }
  const fromDate = new Date(now);
  fromDate.setDate(fromDate.getDate() - preset.days);
  return { from: formatDate(fromDate), to };
}

function matchesPreset(from: string, to: string, preset: (typeof DATE_PRESETS)[number]) {
  const range = getPresetRange(preset);
  return from === range.from && to === range.to;
}

export function OrderFilters({
  searchQuery,
  dateFrom,
  dateTo,
  statusFilter,
}: {
  searchQuery: string;
  dateFrom: string;
  dateTo: string;
  statusFilter: string;
}) {
  const router = useRouter();
  const currentParams = useSearchParams();
  const [query, setQuery] = useState(searchQuery);
  const [customFrom, setCustomFrom] = useState(dateFrom);
  const [customTo, setCustomTo] = useState(dateTo);

  // Preserve sort/dir from current URL
  const sortParam = useMemo(() => currentParams.get("sort") || "", [currentParams]);
  const dirParam = useMemo(() => currentParams.get("dir") || "", [currentParams]);

  function buildUrl(overrides: Record<string, string>) {
    const params = new URLSearchParams();
    const values: Record<string, string> = {
      status: statusFilter,
      q: searchQuery,
      from: dateFrom,
      to: dateTo,
      sort: sortParam,
      dir: dirParam,
      ...overrides,
    };
    for (const [key, val] of Object.entries(values)) {
      if (val) params.set(key, val);
    }
    // Always reset to page 1 when filters change
    params.delete("page");
    return `/admin/orders?${params.toString()}`;
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(buildUrl({ q: query.trim() }));
  }

  function clearSearch() {
    setQuery("");
    router.push(buildUrl({ q: "" }));
  }

  function applyPreset(preset: (typeof DATE_PRESETS)[number]) {
    const range = getPresetRange(preset);
    setCustomFrom(range.from);
    setCustomTo(range.to);
    router.push(buildUrl({ from: range.from, to: range.to }));
  }

  function applyCustomRange() {
    if (!customFrom && !customTo) return;
    router.push(buildUrl({ from: customFrom, to: customTo }));
  }

  function clearDateRange() {
    setCustomFrom("");
    setCustomTo("");
    router.push(buildUrl({ from: "", to: "" }));
  }

  const hasDateFilter = dateFrom || dateTo;

  return (
    <div className="mb-6 space-y-3">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search orders..."
            className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-8 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Search
        </button>
      </form>

      {/* Date range */}
      <div className="flex flex-wrap items-center gap-2">
        {DATE_PRESETS.map((preset) => {
          const isActive =
            dateFrom && dateTo && matchesPreset(dateFrom, dateTo, preset);
          return (
            <button
              key={preset.label}
              onClick={() => applyPreset(preset)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-white"
                  : "border border-border text-muted hover:bg-surface hover:text-foreground"
              }`}
            >
              {preset.label}
            </button>
          );
        })}

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
            onClick={clearDateRange}
            className="rounded-lg px-2 py-1 text-sm text-muted transition-colors hover:text-foreground"
          >
            <X className="inline h-3.5 w-3.5" /> Clear dates
          </button>
        )}
      </div>
    </div>
  );
}
