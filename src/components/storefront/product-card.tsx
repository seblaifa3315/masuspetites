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

  function handleAdd() {
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
    <div className="group flex flex-col">
      <Link href={`/product/${slug}`} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-surface">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted">
            No image
          </div>
        )}
      </Link>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link href={`/product/${slug}`} className="text-sm font-medium hover:text-accent transition-colors line-clamp-1">
            {name}
          </Link>
          <p className="text-sm text-muted">${price}</p>
        </div>
        <button
          onClick={handleAdd}
          disabled={added}
          className={`shrink-0 p-2 rounded-lg transition-colors ${
            added
              ? "bg-green-600 text-white"
              : "bg-surface hover:bg-accent hover:text-white text-muted"
          }`}
          aria-label={added ? "Added to cart" : "Add to cart"}
        >
          {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
