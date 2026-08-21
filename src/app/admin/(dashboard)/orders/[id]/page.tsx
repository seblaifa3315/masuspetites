import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Truck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { OrderStatusManager } from "@/components/admin/order-status-manager";
import { OrderTimeline } from "@/components/admin/order-timeline";
import { OrderNotes } from "@/components/admin/order-notes";

interface ShippingAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true, notes: { orderBy: { createdAt: "asc" } } },
  });

  if (!order) notFound();

  const address = order.shippingAddress as ShippingAddress;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Back link */}
      <Link
        href="/admin/orders"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">
            {order.orderNumber}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {order.createdAt.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid gap-6">
        {/* Customer */}
        <div className="rounded-lg border border-border p-6">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">
            Customer
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted">Name</p>
              <p className="mt-0.5 text-foreground">{order.customerName}</p>
            </div>
            <div>
              <p className="text-xs text-muted">Email</p>
              <p className="mt-0.5 text-foreground">{order.customerEmail}</p>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="rounded-lg border border-border p-6">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">
            Shipping Address
          </h2>
          <div className="space-y-0.5 text-foreground">
            {address.line1 && <p>{address.line1}</p>}
            {address.line2 && <p>{address.line2}</p>}
            <p>
              {[address.city, address.state, address.postal_code]
                .filter(Boolean)
                .join(", ")}
            </p>
            {address.country && <p>{address.country}</p>}
          </div>
        </div>

        {/* Items */}
        <div className="rounded-lg border border-border p-6">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">
            Items
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-2 text-left font-medium text-muted">
                  Product
                </th>
                <th className="pb-2 text-left font-medium text-muted">Size</th>
                <th className="pb-2 text-center font-medium text-muted">
                  Qty
                </th>
                <th className="pb-2 text-right font-medium text-muted">
                  Unit Price
                </th>
                <th className="pb-2 text-right font-medium text-muted">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-b border-border">
                  <td className="py-3 text-foreground">{item.productName}</td>
                  <td className="py-3 text-muted">{item.sizeLabel}</td>
                  <td className="py-3 text-center text-muted">
                    {item.quantity}
                  </td>
                  <td className="py-3 text-right text-muted">
                    ${(item.unitPriceCents / 100).toFixed(2)}
                  </td>
                  <td className="py-3 text-right text-foreground">
                    ${((item.unitPriceCents * item.quantity) / 100).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={4}
                  className="pt-4 text-right font-medium text-foreground"
                >
                  Total
                </td>
                <td className="pt-4 text-right text-lg font-bold text-accent">
                  ${(order.totalCents / 100).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Tracking info (visible when shipped or delivered) */}
        {(order.status === "SHIPPED" || order.status === "DELIVERED") && (
          <div className="rounded-lg border border-border p-6">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted">
              <Truck className="h-4 w-4" />
              Tracking
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted">Carrier</p>
                <p className="mt-0.5 text-foreground">
                  {order.shippingCarrier}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">Tracking Number</p>
                <p className="mt-0.5 text-foreground">
                  {order.trackingNumber}
                </p>
              </div>
              {order.shippedAt && (
                <div>
                  <p className="text-xs text-muted">Shipped</p>
                  <p className="mt-0.5 text-foreground">
                    {order.shippedAt.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}
              {order.deliveredAt && (
                <div>
                  <p className="text-xs text-muted">Delivered</p>
                  <p className="mt-0.5 text-foreground">
                    {order.deliveredAt.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="rounded-lg border border-border p-6">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">
            Timeline
          </h2>
          <OrderTimeline order={order} />
        </div>

        {/* Add Note */}
        <div className="rounded-lg border border-border p-6">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">
            Add Note
          </h2>
          <OrderNotes orderId={order.id} />
        </div>

        {/* Update Status */}
        <div className="rounded-lg border border-border p-6">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">
            Update Status
          </h2>
          <OrderStatusManager orderId={order.id} status={order.status} />
        </div>
      </div>
    </div>
  );
}
