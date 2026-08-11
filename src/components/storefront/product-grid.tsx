import ProductCard from "./product-card";

interface Product {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  variants: { id: string; priceCents: number }[];
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section id="collection" className="scroll-mt-20 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
        Our Collection
      </h2>
      {products.length === 0 ? (
        <p className="text-center text-muted text-lg">
          No products available yet. Check back soon!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              slug={product.slug}
              imageUrl={product.imageUrl}
              priceCents={product.variants[0]?.priceCents ?? 0}
              variantId={product.variants[0]?.id ?? ""}
            />
          ))}
        </div>
      )}
    </section>
  );
}
