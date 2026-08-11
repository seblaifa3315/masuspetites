import ProductCard from "./product-card";

interface Product {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  variants: { id: string; priceCents: number }[];
}

const aspectRatios = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[2/3]", "aspect-[1/1]", "aspect-[3/5]"] as const;

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
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:balance]">
          {products.map((product, i) => (
            <div key={product.id} className="mb-6 break-inside-avoid">
              <ProductCard
                id={product.id}
                name={product.name}
                slug={product.slug}
                imageUrl={product.imageUrl}
                priceCents={product.variants[0]?.priceCents ?? 0}
                variantId={product.variants[0]?.id ?? ""}
                aspectRatio={aspectRatios[i % aspectRatios.length]}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
