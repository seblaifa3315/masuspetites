"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";

interface Variant {
  id: string;
  sizeLabel: string;
  dimensions: string;
  priceCents: number;
}

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    variants: Variant[];
  };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const [objectPosition, setObjectPosition] = useState("center");
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const variant = product.variants[0];
  const price = variant ? (variant.priceCents / 100).toFixed(2) : "0.00";

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = imgRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setObjectPosition(`${x}% ${y}%`);
  }, []);

  function handleAdd() {
    if (!variant) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        slug: product.slug,
        imageUrl: product.imageUrl,
        priceCents: variant.priceCents,
      });
    }
    setAdded(true);
    setQuantity(1);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isDesktop ? "row" : "column",
        gap: isDesktop ? "3rem" : "2rem",
        maxWidth: "64rem",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {/* Left — Image */}
      <div
        ref={imgRef}
        style={{
          width: isDesktop ? "28rem" : "18rem",
          flexShrink: 0,
          marginLeft: isDesktop ? 0 : "auto",
          marginRight: isDesktop ? 0 : "auto",
          borderRadius: "0.5rem",
          overflow: "hidden",
          cursor: "zoom-in",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => {
          setIsZoomed(false);
          setObjectPosition("center");
        }}
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            width={448}
            height={597}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              objectFit: "cover",
              transition: "transform 0.3s",
              transformOrigin: "center",
              transform: isZoomed ? "scale(1.5)" : "scale(1)",
              objectPosition,
            }}
          />
        ) : (
          <div className="aspect-[3/4] flex items-center justify-center text-muted">
            No image
          </div>
        )}
      </div>

      {/* Right — Info */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold">{product.name}</h1>
          <p className="mt-2 text-2xl text-accent font-semibold">${price}</p>
        </div>

        {product.description && (
          <p className="text-muted leading-relaxed">{product.description}</p>
        )}

        {variant && (
          <div className="text-sm flex items-center gap-2">
            <span className="text-muted">Size:</span>
            <span className="text-foreground font-medium">
              {variant.sizeLabel} — {variant.dimensions}
            </span>
          </div>
        )}

        {/* Quantity selector */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted">Quantity</span>
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2 text-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center text-sm font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="p-2 text-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAdd}
          disabled={added || !variant}
          className={`hero-glow-btn w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white font-medium transition-all cursor-pointer ${
            added
              ? "bg-green-600"
              : "bg-accent hover:bg-accent-hover"
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" />
              Added!
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
