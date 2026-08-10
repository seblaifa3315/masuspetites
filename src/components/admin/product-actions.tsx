"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import {
  deleteProduct,
  toggleProductActive,
} from "@/app/admin/(dashboard)/products/actions";

export function ProductActions({
  productId,
  productName,
  isActive,
}: {
  productId: string;
  productName: string;
  isActive: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!window.confirm(`Delete "${productName}"? This cannot be undone.`)) {
      return;
    }
    startTransition(() => deleteProduct(productId));
  }

  function handleToggleActive() {
    startTransition(() => toggleProductActive(productId, !isActive));
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/products/${productId}/edit`}
        className="rounded p-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
        title="Edit"
      >
        <Pencil className="h-4 w-4" />
      </Link>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="rounded p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      <button
        onClick={handleToggleActive}
        disabled={isPending}
        className={`cursor-pointer rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors disabled:opacity-50 ${
          isActive
            ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
            : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
        }`}
        title={isActive ? "Click to deactivate" : "Click to activate"}
      >
        {isActive ? "Active" : "Inactive"}
      </button>
    </div>
  );
}
