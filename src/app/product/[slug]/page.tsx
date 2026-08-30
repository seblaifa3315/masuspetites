import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/storefront/navbar";
import Footer from "@/components/storefront/footer";
import ProductDetail from "@/components/storefront/product-detail";
import ProductCard from "@/components/storefront/product-card";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, description: true },
  });

  if (!product) return {};

  return {
    title: `${product.name} — Masus Petites`,
    description: product.description ?? "Original tattoo art print by Masus Petites.",
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug, isActive: true },
    include: { variants: true },
  });

  if (!product) notFound();

  const suggested = await prisma.product.findMany({
    where: { isActive: true, id: { not: product.id } },
    include: { variants: true },
    take: 4,
  });

  return (
    <>
      <Navbar />
      <main className="flex-1 min-w-0 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          href="/#collection"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Link>

        {/* Product detail */}
        <ProductDetail product={product} />

        {/* Suggested products */}
        {suggested.length > 0 && (
          <section style={{ marginTop: "4rem" }}>
            <h2 style={{ marginBottom: "2rem" }} className="font-heading text-2xl font-bold">
              You Might Also Like
            </h2>
            <div
              className="min-w-0"
              style={{
                display: "flex",
                gap: "1rem",
                overflowX: "auto",
                paddingBottom: "1rem",
              }}
            >
              {suggested.map((p) => (
                <div key={p.id} className="w-32 sm:w-40 md:w-44 flex-shrink-0">
                  <ProductCard
                    id={p.id}
                    name={p.name}
                    slug={p.slug}
                    imageUrl={p.imageUrl}
                    priceCents={p.variants[0]?.priceCents ?? 0}
                    variantId={p.variants[0]?.id ?? ""}
                    aspectRatio="3/4"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
