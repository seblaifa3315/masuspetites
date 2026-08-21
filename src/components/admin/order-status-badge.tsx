import type { OrderStatus } from "@/generated/prisma/client";

const statusStyles: Record<OrderStatus, string> = {
  PAID: "bg-yellow-500/10 text-yellow-400",
  SHIPPED: "bg-blue-500/10 text-blue-400",
  DELIVERED: "bg-green-500/10 text-green-400",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
