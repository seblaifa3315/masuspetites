"use server";

import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

interface CartItem {
  variantId: string;
  quantity: number;
}

export async function createCheckoutSession(items: CartItem[]) {
  if (items.length === 0) {
    throw new Error("Cart is empty");
  }

  // Fetch variant details from DB to get trusted prices
  const variants = await prisma.productVariant.findMany({
    where: { id: { in: items.map((i) => i.variantId) } },
    include: { product: true },
  });

  const lineItems = items.map((item) => {
    const variant = variants.find((v) => v.id === item.variantId);
    if (!variant) throw new Error(`Variant ${item.variantId} not found`);

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: variant.product.name,
          ...(variant.product.imageUrl
            ? { images: [variant.product.imageUrl] }
            : {}),
        },
        unit_amount: variant.priceCents,
      },
      quantity: item.quantity,
    };
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "FR", "GB", "DE", "AU"],
    },
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/cart`,
  });

  redirect(session.url!);
}
