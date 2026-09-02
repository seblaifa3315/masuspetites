import ProductCard from "./product-card";

interface Product {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  variants: { id: string; priceCents: number }[];
}

const aspectRatios = ["3/4", "4/5", "2/3", "1/1", "3/5"] as const;

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section id="collection" className="scroll-mt-20 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="font-heading text-3xl md:text-4xl text-center mb-4">
        Our Collection
      </h2>
      <p className="text-muted leading-relaxed text-center max-w-xl mx-auto mb-12">
        Each print is reproduced from an original hand-drawn tattoo design using
        pigment inks on premium acid-free, archival-quality paper — built to
        hold vivid color and fine linework for years without fading. Exact
        sizing is listed on each product page.
      </p>
      {products.length === 0 ? (
        <p className="text-center text-muted text-lg">
          No products available yet. Check back soon!
        </p>
      ) : (
        <div className="columns-[220px] gap-12 [column-fill:balance]">
          {products.map((product, i) => (
            <div key={product.id} className="mb-12 break-inside-avoid">
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
