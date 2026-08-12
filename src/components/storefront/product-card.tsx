"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Check } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  priceCents: number;
  variantId: string;
  aspectRatio?: string;
}

export default function ProductCard({
  id,
  name,
  slug,
  imageUrl,
  priceCents,
  variantId,
  aspectRatio = "3/4",
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -12;
    const rotateY = (x - 0.5) * 12;
    setTransform(`perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`);
    setGlareStyle({ opacity: 0.15, x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("");
    setGlareStyle({ opacity: 0, x: 50, y: 50 });
  }, []);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      productId: id,
      variantId,
      name,
      slug,
      imageUrl,
      priceCents,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const price = (priceCents / 100).toFixed(2);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group will-change-transform transition-transform duration-200 ease-out"
      style={{ transform }}
    >
      <Link
        href={`/product/${slug}`}
        className="relative overflow-hidden rounded-lg bg-surface block"
        style={{ aspectRatio }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted">
            No image
          </div>
        )}

        {/* Glare overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={{
            opacity: glareStyle.opacity,
            background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255,255,255,0.5) 0%, transparent 60%)`,
          }}
        />

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Name + price + cart button */}
        <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-white line-clamp-1">{name}</h3>
            <p className="text-sm text-white/70">${price}</p>
          </div>
          <button
            onClick={handleAdd}
            disabled={added}
            className={`shrink-0 p-2.5 rounded-full translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer ${
              added
                ? "bg-green-600 text-white"
                : "bg-accent hover:bg-accent-hover text-white"
            }`}
            aria-label={added ? "Added to cart" : "Add to cart"}
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </Link>
    </div>
  );
}
