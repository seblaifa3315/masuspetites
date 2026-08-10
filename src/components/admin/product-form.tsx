"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import {
  createProduct,
  updateProduct,
  type ProductActionState,
} from "@/app/admin/(dashboard)/products/actions";

type ProductData = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
  variants: {
    id: string;
    priceCents: number;
  }[];
};

export function ProductForm({ product }: { product?: ProductData }) {
  const isEdit = !!product;

  const [name, setName] = useState(product?.name ?? "");
  const [preview, setPreview] = useState<string | null>(
    product?.imageUrl ?? null,
  );

  const action = isEdit ? updateProduct : createProduct;
  const [state, formAction, isPending] = useActionState<
    ProductActionState,
    FormData
  >(action, null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  const defaultPrice = product?.variants[0]
    ? (product.variants[0].priceCents / 100).toFixed(2)
    : "";

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {isEdit && <input type="hidden" name="productId" value={product.id} />}
      {isEdit && product.variants[0] && (
        <input type="hidden" name="variantId" value={product.variants[0].id} />
      )}

      {state?.error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="e.g. Koi Fish Sleeve"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="Product description..."
        />
      </div>

      {/* Price */}
      <div>
        <label
          htmlFor="price"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Price ($)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          step="0.01"
          min="0"
          required
          defaultValue={defaultPrice}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="29.99"
        />
      </div>

      {/* Image */}
      <div>
        <label
          htmlFor="image"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Image
        </label>
        {preview && (
          <div className="relative mb-3 h-48 w-48 overflow-hidden rounded-lg border border-border">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized={preview.startsWith("blob:")}
            />
          </div>
        )}
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-accent-hover file:cursor-pointer"
        />
      </div>

      {/* Active */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          defaultChecked={product?.isActive ?? true}
          className="h-4 w-4 rounded border-border accent-accent"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-foreground">
          Active (visible on storefront)
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-accent px-6 py-2.5 font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
      >
        {isPending
          ? "Saving..."
          : isEdit
            ? "Update Product"
            : "Create Product"}
      </button>
    </form>
  );
}
