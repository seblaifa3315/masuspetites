"use client";

import { useState } from "react";
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
}

export default function ProductCard({
  id,
  name,
  slug,
  imageUrl,
  priceCents,
  variantId,
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

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
    <Link
      href={`/product/${slug}`}
      className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-surface block"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-muted">
          No image
        </div>
      )}

      {/* Bottom gradient overlay — always visible */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Name + price pinned to bottom */}
      <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-white line-clamp-1">{name}</h3>
          <p className="text-sm text-white/70">${price}</p>
        </div>

        {/* Add to cart — slides up on hover */}
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
  );
}
