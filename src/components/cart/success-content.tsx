"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";

interface SuccessContentProps {
  orderNumber: string | null;
}

export default function SuccessContent({ orderNumber }: SuccessContentProps) {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <CheckCircle
        className="w-16 h-16 mb-4"
        style={{ color: "var(--accent)" }}
      />
      <h1 className="font-heading text-3xl font-bold mb-2">
        Thank you for your order!
      </h1>
      {orderNumber && (
        <p className="text-sm text-muted mb-2">
          Order number{" "}
          <span className="text-accent font-semibold">{orderNumber}</span>
        </p>
      )}
      <p className="text-muted mb-8" style={{ maxWidth: "28rem" }}>
        Your payment was successful. You&apos;ll receive a confirmation
        email shortly with your order details.
      </p>
      <Link
        href="/#collection"
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
