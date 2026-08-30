import { prisma } from "@/lib/prisma";
import Navbar from "@/components/storefront/navbar";
import Hero from "@/components/storefront/hero";
import ProductGrid from "@/components/storefront/product-grid";
import About from "@/components/storefront/about";
import FAQ from "@/components/storefront/faq";
import Contact from "@/components/storefront/contact";
import Footer from "@/components/storefront/footer";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { variants: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <>
      <Navbar />
      <main className="flex-1 min-w-0">
        <Hero />
        <ProductGrid products={products} />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
