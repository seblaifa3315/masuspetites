import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Retrieve line items from the session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    });

    // Build order items by matching back to product variants
    const orderItems = await Promise.all(
      lineItems.data.map(async (item) => {
        const product = item.price?.product as Stripe.Product;
        const dbProduct = await prisma.product.findFirst({
          where: { name: product.name },
          include: { variants: true },
        });
        const variant = dbProduct?.variants[0];

        return {
          productVariantId: variant?.id ?? "",
          productName: product.name,
          sizeLabel: variant?.sizeLabel ?? "Standard",
          quantity: item.quantity ?? 1,
          unitPriceCents: item.price?.unit_amount ?? 0,
        };
      })
    );

    // Generate sequential order number starting at 1001
    const existingOrders = await prisma.order.findMany({
      where: { orderNumber: { startsWith: "MP-" } },
      select: { orderNumber: true },
    });
    const lastNumber = existingOrders.reduce((max, o) => {
      const n = parseInt(o.orderNumber.slice(3), 10);
      return Number.isNaN(n) ? max : Math.max(max, n);
    }, 1000);
    const orderNumber = `MP-${lastNumber + 1}`;

    // Create order in database
    await prisma.order.create({
      data: {
        orderNumber,
        stripeSessionId: session.id,
        stripePaymentIntent:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id ?? null,
        status: "PAID",
        customerEmail: session.customer_details?.email ?? "",
        customerName: session.customer_details?.name ?? "",
        shippingAddress: session.collected_information?.shipping_details?.address
          ? JSON.parse(JSON.stringify(session.collected_information.shipping_details.address))
          : {},
        totalCents: session.amount_total ?? 0,
        items: {
          create: orderItems,
        },
      },
    });

    // Send confirmation emails
    const customerEmail = session.customer_details?.email;
    if (customerEmail) {
      const total = `$${((session.amount_total ?? 0) / 100).toFixed(2)}`;
      const customerName = session.customer_details?.name ?? "there";

      const itemsRowsHtml = orderItems
        .map(
          (i) => `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #262626; color: #F0F0F0; font-size: 14px;">
              ${i.productName}
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #262626; color: #737373; font-size: 14px; text-align: center;">
              ${i.quantity}
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #262626; color: #F0F0F0; font-size: 14px; text-align: right;">
              $${((i.unitPriceCents * i.quantity) / 100).toFixed(2)}
            </td>
          </tr>`
        )
        .join("");

      const emailWrapper = (content: string) => `
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

      // Email to buyer
      const buyerContent = `
        <h2 style="margin: 0 0 8px; font-size: 20px; color: #F0F0F0;">Thank you for your order!</h2>
        <p style="margin: 0 0 24px; font-size: 14px; color: #737373;">Hi ${customerName}, your order has been confirmed.</p>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; background-color: #0A0A0A; border-radius: 8px; padding: 16px;">
          <tr>
            <td style="padding: 8px 16px;">
              <p style="margin: 0; font-size: 12px; color: #737373;">Order Number</p>
              <p style="margin: 4px 0 0; font-size: 14px; color: #EC4899; font-weight: 600;">${orderNumber}</p>
            </td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
          <tr style="border-bottom: 1px solid #262626;">
            <td style="padding: 8px 0; font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 0.5px;">Item</td>
            <td style="padding: 8px 0; font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 0.5px; text-align: center;">Qty</td>
            <td style="padding: 8px 0; font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 0.5px; text-align: right;">Price</td>
          </tr>
          ${itemsRowsHtml}
          <tr>
            <td colspan="2" style="padding: 16px 0 0; font-size: 14px; font-weight: 600; color: #F0F0F0;">Total</td>
            <td style="padding: 16px 0 0; font-size: 16px; font-weight: 700; color: #EC4899; text-align: right;">${total}</td>
          </tr>
        </table>

        <p style="margin: 0; font-size: 14px; color: #737373; line-height: 1.6;">
          We'll notify you when your order ships. If you have any questions, reply to this email.
        </p>
      `;

      await resend.emails.send({
        from: "Masus Petites <onboarding@resend.dev>",
        to: customerEmail,
        subject: `Order Confirmed — ${orderNumber}`,
        html: emailWrapper(buyerContent),
      });

      // Email to seller
      const sellerEmail = process.env.CONTACT_NOTIFICATION_EMAIL;
      if (sellerEmail) {
        const shippingAddress = session.collected_information?.shipping_details?.address;
        const addressLines = shippingAddress
          ? [
              shippingAddress.line1,
              shippingAddress.line2,
              `${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postal_code}`,
              shippingAddress.country,
            ].filter(Boolean).join("<br>")
          : "Not provided";

        const sellerContent = `
          <h2 style="margin: 0 0 8px; font-size: 20px; color: #F0F0F0;">New order received!</h2>
          <p style="margin: 0 0 24px; font-size: 14px; color: #737373;">A customer just placed an order.</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; background-color: #0A0A0A; border-radius: 8px; padding: 16px;">
            <tr>
              <td style="padding: 8px 16px; width: 50%;">
                <p style="margin: 0; font-size: 12px; color: #737373;">Order Number</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #EC4899; font-weight: 600;">${orderNumber}</p>
              </td>
              <td style="padding: 8px 16px; width: 50%;">
                <p style="margin: 0; font-size: 12px; color: #737373;">Customer</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #F0F0F0; font-weight: 500;">${customerName}</p>
                <p style="margin: 2px 0 0; font-size: 12px; color: #737373;">${customerEmail}</p>
              </td>
            </tr>
          </table>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
            <tr style="border-bottom: 1px solid #262626;">
              <td style="padding: 8px 0; font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 0.5px;">Item</td>
              <td style="padding: 8px 0; font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 0.5px; text-align: center;">Qty</td>
              <td style="padding: 8px 0; font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 0.5px; text-align: right;">Price</td>
            </tr>
            ${itemsRowsHtml}
            <tr>
              <td colspan="2" style="padding: 16px 0 0; font-size: 14px; font-weight: 600; color: #F0F0F0;">Total</td>
              <td style="padding: 16px 0 0; font-size: 16px; font-weight: 700; color: #EC4899; text-align: right;">${total}</td>
            </tr>
          </table>

          <h3 style="margin: 0 0 8px; font-size: 14px; color: #F0F0F0; text-transform: uppercase; letter-spacing: 0.5px;">Shipping Address</h3>
          <p style="margin: 0; font-size: 14px; color: #737373; line-height: 1.6;">${addressLines}</p>
        `;

        await resend.emails.send({
          from: "Masus Petites <onboarding@resend.dev>",
          to: sellerEmail,
          subject: `New Order — ${orderNumber}`,
          html: emailWrapper(sellerContent),
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
