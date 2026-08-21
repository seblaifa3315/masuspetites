"use server";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { revalidatePath } from "next/cache";
import type { OrderStatus } from "@/generated/prisma/client";

export type OrderActionState = {
  error?: string;
  success?: boolean;
} | null;

const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus | null> = {
  PAID: "SHIPPED",
  SHIPPED: "DELIVERED",
  DELIVERED: null,
};

function emailWrapper(content: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 0; background-color: #0A0A0A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A0A0A; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
              <!-- Header -->
              <tr>
                <td style="padding: 32px 40px; text-align: center; border-bottom: 1px solid #262626;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #F0F0F0; letter-spacing: -0.5px;">Masus Petites</h1>
                </td>
              </tr>
              <!-- Content -->
              <tr>
                <td style="padding: 40px; background-color: #161616; border-radius: 0 0 8px 8px;">
                  ${content}
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="padding: 24px 40px; text-align: center;">
                  <p style="margin: 0; font-size: 12px; color: #737373;">
                    Masus Petites — Original tattoo art prints
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  formData?: FormData,
): Promise<OrderActionState> {
  const order = await prisma.order.findUnique({ where: { id: orderId } });

  if (!order) {
    return { error: "Order not found." };
  }

  if (VALID_TRANSITIONS[order.status] !== newStatus) {
    return { error: `Cannot transition from ${order.status} to ${newStatus}.` };
  }

  const updateData: Record<string, unknown> = { status: newStatus };

  if (newStatus === "SHIPPED") {
    const trackingNumber = formData?.get("trackingNumber") as string;
    const shippingCarrier = formData?.get("shippingCarrier") as string;

    if (!trackingNumber?.trim()) {
      return { error: "Tracking number is required." };
    }
    if (!shippingCarrier?.trim()) {
      return { error: "Shipping carrier is required." };
    }

    const shippedDateStr = formData?.get("shippedDate") as string;
    const shippedAt = shippedDateStr
      ? new Date(shippedDateStr + "T12:00:00")
      : new Date();

    updateData.trackingNumber = trackingNumber.trim();
    updateData.shippingCarrier = shippingCarrier.trim();
    updateData.shippedAt = shippedAt;
  }

  if (newStatus === "DELIVERED") {
    const deliveredDateStr = formData?.get("deliveredDate") as string;
    const deliveredAt = deliveredDateStr
      ? new Date(deliveredDateStr + "T12:00:00")
      : new Date();

    updateData.deliveredAt = deliveredAt;
  }

  await prisma.order.update({
    where: { id: orderId },
    data: updateData,
  });

  // Send customer email notification
  if (order.customerEmail) {
    try {
      if (newStatus === "SHIPPED") {
        const shippedDate = (updateData.shippedAt as Date).toLocaleDateString(
          "en-US",
          { month: "long", day: "numeric", year: "numeric" },
        );

        const shippedContent = `
          <h2 style="margin: 0 0 8px; font-size: 20px; color: #F0F0F0;">Your order is on its way!</h2>
          <p style="margin: 0 0 24px; font-size: 14px; color: #737373;">
            Hi ${order.customerName || "there"}, your order was shipped on ${shippedDate}.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; background-color: #0A0A0A; border-radius: 8px; padding: 16px;">
            <tr>
              <td style="padding: 8px 16px; width: 50%;">
                <p style="margin: 0; font-size: 12px; color: #737373;">Order Number</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #EC4899; font-weight: 600;">${order.orderNumber}</p>
              </td>
              <td style="padding: 8px 16px; width: 50%;">
                <p style="margin: 0; font-size: 12px; color: #737373;">Carrier</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #F0F0F0; font-weight: 500;">${updateData.shippingCarrier}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 16px; width: 50%;">
                <p style="margin: 0; font-size: 12px; color: #737373;">Tracking Number</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #F0F0F0; font-weight: 500;">${updateData.trackingNumber}</p>
              </td>
              <td style="padding: 8px 16px; width: 50%;">
                <p style="margin: 0; font-size: 12px; color: #737373;">Shipped Date</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #F0F0F0; font-weight: 500;">${shippedDate}</p>
              </td>
            </tr>
          </table>

          <p style="margin: 0; font-size: 14px; color: #737373; line-height: 1.6;">
            You can track your package using the tracking number above. If you have any questions, reply to this email.
          </p>
        `;

        await resend.emails.send({
          from: "Masus Petites <onboarding@resend.dev>",
          to: order.customerEmail,
          subject: `Order Shipped — ${order.orderNumber}`,
          html: emailWrapper(shippedContent),
        });
      }

      if (newStatus === "DELIVERED") {
        const deliveredDate = (
          updateData.deliveredAt as Date
        ).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        const deliveredContent = `
          <h2 style="margin: 0 0 8px; font-size: 20px; color: #F0F0F0;">Your order has been delivered!</h2>
          <p style="margin: 0 0 24px; font-size: 14px; color: #737373;">
            Hi ${order.customerName || "there"}, your order was delivered on ${deliveredDate}.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; background-color: #0A0A0A; border-radius: 8px; padding: 16px;">
            <tr>
              <td style="padding: 8px 16px; width: 50%;">
                <p style="margin: 0; font-size: 12px; color: #737373;">Order Number</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #EC4899; font-weight: 600;">${order.orderNumber}</p>
              </td>
              <td style="padding: 8px 16px; width: 50%;">
                <p style="margin: 0; font-size: 12px; color: #737373;">Delivered Date</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #F0F0F0; font-weight: 500;">${deliveredDate}</p>
              </td>
            </tr>
          </table>

          <p style="margin: 0; font-size: 14px; color: #737373; line-height: 1.6;">
            We hope you love your new art prints! Thank you for supporting Masus Petites. If you have any questions, reply to this email.
          </p>
        `;

        await resend.emails.send({
          from: "Masus Petites <onboarding@resend.dev>",
          to: order.customerEmail,
          subject: `Order Delivered — ${order.orderNumber}`,
          html: emailWrapper(deliveredContent),
        });
      }
    } catch (err) {
      console.error("Failed to send status update email:", err);
    }
  }

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);

  return { success: true };
}

export async function addOrderNote(
  orderId: string,
  content: string,
): Promise<OrderActionState> {
  const trimmed = content.trim();
  if (!trimmed) {
    return { error: "Note content cannot be empty." };
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    return { error: "Order not found." };
  }

  await prisma.orderNote.create({
    data: { orderId, content: trimmed },
  });

  revalidatePath(`/admin/orders/${orderId}`);
  return { success: true };
}

export async function deleteOrderNote(
  noteId: string,
): Promise<OrderActionState> {
  const note = await prisma.orderNote.findUnique({ where: { id: noteId } });
  if (!note) {
    return { error: "Note not found." };
  }

  await prisma.orderNote.delete({ where: { id: noteId } });

  revalidatePath(`/admin/orders/${note.orderId}`);
  return { success: true };
}
