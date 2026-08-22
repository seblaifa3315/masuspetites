import Link from "next/link";
import { OrderRow } from "@/components/admin/order-row";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import type { OrderStatus } from "@/generated/prisma/client";

interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  totalCents: number;
  status: OrderStatus;
  createdAt: string;
  itemCount: number;
}

export function RecentOrdersTable({ orders }: { orders: RecentOrder[] }) {
  return (
    <div className="rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h3 className="text-sm font-medium text-muted">Recent Orders</h3>
        <Link
          href="/admin/orders"
          className="text-sm text-accent hover:text-accent-hover transition-colors"
        >
          View all
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="text-muted">No orders yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left font-medium text-muted">
                  Order #
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted">
                  Customer
                </th>
                <th className="px-4 py-3 text-center font-medium text-muted">
                  Items
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted">
                  Total
                </th>
                <th className="px-4 py-3 text-center font-medium text-muted">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow key={order.id} href={`/admin/orders/${order.id}`}>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {order.orderNumber}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {order.customerName}
                  </td>
                  <td className="px-4 py-3 text-center text-muted">
                    {order.itemCount}
                  </td>
                  <td className="px-4 py-3 text-right text-foreground">
                    ${(order.totalCents / 100).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <OrderStatusBadge status={order.status} />
                  </td>
                </OrderRow>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
