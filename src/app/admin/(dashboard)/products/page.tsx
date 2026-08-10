import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductActions } from "@/components/admin/product-actions";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: { variants: true },
    orderBy: [{ isActive: "desc" }, { name: "asc" }],
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Products</h1>
          <p className="mt-1 text-muted">
            Manage your tattoo art prints here.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-medium text-white transition-colors hover:bg-accent-hover"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface text-left text-sm text-muted">
              <th className="px-4 py-3 font-medium">Image</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-12 text-center text-muted"
                >
                  No products yet. Click &ldquo;Add Product&rdquo; to get
                  started.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const priceCents = product.variants[0]?.priceCents ?? 0;
                const price = `$${(priceCents / 100).toFixed(2)}`;

                return (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-surface/50"
                  >
                    <td className="px-4 py-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded border border-border bg-surface">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-muted">
                            —
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-muted">{price}</td>
                    <td className="px-4 py-3">
                      <ProductActions
                        productId={product.id}
                        productName={product.name}
                        isActive={product.isActive}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
