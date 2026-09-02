"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { createCheckoutSession } from "@/app/cart/actions";

export default function CartContent() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const [pending, startTransition] = useTransition();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  useEffect(() => {
    setMounted(true);
    const lgMq = window.matchMedia("(min-width: 1024px)");
    const smMq = window.matchMedia("(min-width: 640px)");
    setIsDesktop(lgMq.matches);
    setIsWide(smMq.matches);
    const lgHandler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    const smHandler = (e: MediaQueryListEvent) => setIsWide(e.matches);
    lgMq.addEventListener("change", lgHandler);
    smMq.addEventListener("change", smHandler);
    return () => {
      lgMq.removeEventListener("change", lgHandler);
      smMq.removeEventListener("change", smHandler);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const subtotalCents = items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <ShoppingBag className="w-16 h-16 text-muted mb-4" />
        <h2 className="font-heading text-2xl font-bold mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted mb-6">
          Looks like you haven&apos;t added any prints yet.
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

  return (
    <>
      <h1 className="font-heading text-3xl font-bold" style={{ marginBottom: "1.5rem" }}>Your Cart</h1>
      <div
        style={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          gap: "2rem",
        }}
      >
      {/* Items list */}
      <div style={{ flex: 1, minWidth: 0 }}>

        <div className="flex flex-col gap-4">
          {items.map((item) => {
            const lineTotal = (
              (item.priceCents * item.quantity) /
              100
            ).toFixed(2);
            const unitPrice = (item.priceCents / 100).toFixed(2);

            return (
              <div
                key={item.variantId}
                className="bg-surface border border-border rounded-lg"
                style={{
                  display: "flex",
                  flexDirection: isWide ? "row" : "column",
                  gap: "1rem",
                  padding: "1rem",
                }}
              >
                {/* Image */}
                <Link
                  href={`/product/${item.slug}`}
                  className="rounded-md overflow-hidden"
                  style={{
                    flexShrink: 0,
                    width: isWide ? "6rem" : "100%",
                    height: isWide ? "6rem" : "12rem",
                  }}
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-background flex items-center justify-center text-muted text-sm">
                      No image
                    </div>
                  )}
                </Link>

                {/* Details */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    flexDirection: isWide ? "row" : "column",
                    alignItems: isWide ? "center" : "flex-start",
                    gap: "0.75rem",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-medium hover:text-accent transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted" style={{ marginTop: "0.125rem" }}>
                      ${unitPrice}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity - 1)
                        }
                        className="p-2 text-muted hover:text-foreground transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.variantId,
                            Math.min(10, item.quantity + 1)
                          )
                        }
                        className="p-2 text-muted hover:text-foreground transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="p-2 text-muted hover:text-red-500 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Line total */}
                  <p
                    className="text-sm font-semibold"
                    style={{
                      width: isWide ? "5rem" : "auto",
                      textAlign: isWide ? "right" : "left",
                    }}
                  >
                    ${lineTotal}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order summary */}
      <div style={{ width: isDesktop ? "20rem" : "100%", flexShrink: 0 }}>
        <div className="bg-surface border border-border rounded-lg p-6" style={{ position: isDesktop ? "sticky" : "static", top: "6rem" }}>
          <h2 className="font-heading text-lg font-bold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted">Subtotal</span>
            <span className="font-medium">
              ${(subtotalCents / 100).toFixed(2)}
            </span>
          </div>

          <p className="text-xs text-muted mb-6">
            Free shipping · No taxes added
          </p>

          <button
            disabled={pending}
            onClick={() =>
              startTransition(() =>
                createCheckoutSession(
                  items.map((i) => ({ variantId: i.variantId, quantity: i.quantity }))
                )
              )
            }
            className={`w-full flex items-center justify-center gap-2 py-3 px-6 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors cursor-pointer ${
              pending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {pending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Redirecting…
              </>
            ) : (
              "Proceed to Checkout"
            )}
          </button>

          <Link
            href="/#collection"
            className="mt-4 w-full inline-flex items-center justify-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
