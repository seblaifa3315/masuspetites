import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { OrderRow } from "@/components/admin/order-row";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ email: string }>;
}) {
  const { email: rawEmail } = await params;
  const email = decodeURIComponent(rawEmail);

  const orders = await prisma.order.findMany({
    where: { customerEmail: email },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  if (orders.length === 0) notFound();

  const clientName = orders[0].customerName;
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + o.totalCents, 0);
  const firstOrderDate = orders[orders.length - 1].createdAt;
  const lastOrderDate = orders[0].createdAt;

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="mx-auto max-w-4xl">
      {/* Back link */}
      <Link
        href="/admin/clients"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Clients
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">{clientName}</h1>
        <p className="mt-1 text-sm text-muted">{email}</p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs text-muted">Total Orders</p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {totalOrders}
          </p>
        </div>
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs text-muted">Total Spent</p>
          <p className="mt-1 text-2xl font-bold text-accent">
            ${(totalSpent / 100).toFixed(2)}
          </p>
        </div>
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs text-muted">First Order</p>
          <p className="mt-1 text-lg font-medium text-foreground">
            {formatDate(firstOrderDate)}
          </p>
        </div>
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs text-muted">Last Order</p>
          <p className="mt-1 text-lg font-medium text-foreground">
            {formatDate(lastOrderDate)}
          </p>
        </div>
      </div>

      {/* Order history */}
      <div className="rounded-lg border border-border">
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
            Order History
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-4 py-3 text-left font-medium text-muted">
                Order #
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted">
                Name
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
              <th className="px-4 py-3 text-right font-medium text-muted">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow key={order.id} href={`/admin/orders/${order.id}`}>
                <td className="px-4 py-3 font-medium text-foreground">
                  {order.orderNumber}
                </td>
                <td className="px-4 py-3 text-muted">
                  {order.customerName}
                </td>
                <td className="px-4 py-3 text-center text-muted">
                  {order.items.reduce((sum, i) => sum + i.quantity, 0)}
                </td>
                <td className="px-4 py-3 text-right text-foreground">
                  ${(order.totalCents / 100).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-center">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 text-right text-muted">
                  {order.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </OrderRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
