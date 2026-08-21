import Link from "next/link";
import { ChevronUp, ChevronDown } from "lucide-react";

type SortField = "createdAt" | "totalCents" | "status";
type SortDir = "asc" | "desc";

export function SortableHeader({
  label,
  field,
  currentSort,
  currentDir,
  align = "left",
  params,
}: {
  label: string;
  field: SortField;
  currentSort: SortField;
  currentDir: SortDir;
  align?: "left" | "right" | "center";
  params: URLSearchParams;
}) {
  const isActive = currentSort === field;
  const nextDir = isActive && currentDir === "asc" ? "desc" : "asc";

  const linkParams = new URLSearchParams(params);
  linkParams.set("sort", field);
  linkParams.set("dir", nextDir);
  linkParams.delete("page");

  const alignClass =
    align === "right"
      ? "justify-end"
      : align === "center"
        ? "justify-center"
        : "justify-start";

  const Icon = isActive && currentDir === "asc" ? ChevronUp : ChevronDown;

  return (
    <th className={`px-4 py-3 font-medium text-muted`}>
      <Link
        href={`/admin/orders?${linkParams.toString()}`}
        className={`inline-flex items-center gap-1 ${alignClass} transition-colors hover:text-foreground`}
      >
        {label}
        <Icon
          className={`h-3.5 w-3.5 ${isActive ? "text-foreground" : "text-muted opacity-0 group-hover:opacity-100"}`}
        />
      </Link>
    </th>
  );
}
