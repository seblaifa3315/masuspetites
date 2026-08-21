"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Package, CheckCircle2 } from "lucide-react";
import { updateOrderStatus } from "@/app/admin/(dashboard)/orders/actions";
import type { OrderStatus } from "@/generated/prisma/client";

const CARRIERS = ["USPS", "UPS", "FedEx", "DHL", "Other"];

function todayString() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

export function OrderStatusManager({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) {
  const [isPending, startTransition] = useTransition();
  const [showShipForm, setShowShipForm] = useState(false);
  const [showDeliverForm, setShowDeliverForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleMarkShipped(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await updateOrderStatus(orderId, "SHIPPED", formData);
      if (result?.error) {
        setError(result.error);
      } else {
        router.refresh();
      }
    });
  }

  function handleMarkDelivered(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await updateOrderStatus(orderId, "DELIVERED", formData);
      if (result?.error) {
        setError(result.error);
      } else {
        router.refresh();
      }
    });
  }

  if (status === "DELIVERED") {
    return (
      <div className="flex items-center gap-2 text-green-400">
        <CheckCircle2 className="h-5 w-5" />
        <span className="text-sm font-medium">
          This order has been delivered.
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {status === "PAID" && !showShipForm && (
        <button
          onClick={() => setShowShipForm(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Package className="h-4 w-4" />
          Mark as Shipped
        </button>
      )}

      {status === "PAID" && showShipForm && (
        <form action={handleMarkShipped} className="space-y-4">
          <div>
            <label
              htmlFor="trackingNumber"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Tracking Number
            </label>
            <input
              type="text"
              id="trackingNumber"
              name="trackingNumber"
              required
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
              placeholder="Enter tracking number"
            />
          </div>
          <div>
            <label
              htmlFor="shippingCarrier"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Shipping Carrier
            </label>
            <select
              id="shippingCarrier"
              name="shippingCarrier"
              required
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
            >
              <option value="">Select carrier</option>
              {CARRIERS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="shippedDate"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Shipped Date
            </label>
            <input
              type="date"
              id="shippedDate"
              name="shippedDate"
              required
              defaultValue={todayString()}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? "Updating..." : "Confirm Shipped"}
            </button>
            <button
              type="button"
              onClick={() => setShowShipForm(false)}
              className="rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:bg-surface"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {status === "SHIPPED" && !showDeliverForm && (
        <button
          onClick={() => setShowDeliverForm(true)}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
        >
          <CheckCircle2 className="h-4 w-4" />
          Mark as Delivered
        </button>
      )}

      {status === "SHIPPED" && showDeliverForm && (
        <form action={handleMarkDelivered} className="space-y-4">
          <div>
            <label
              htmlFor="deliveredDate"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Delivered Date
            </label>
            <input
              type="date"
              id="deliveredDate"
              name="deliveredDate"
              required
              defaultValue={todayString()}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
            >
              {isPending ? "Updating..." : "Confirm Delivered"}
            </button>
            <button
              type="button"
              onClick={() => setShowDeliverForm(false)}
              className="rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:bg-surface"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
