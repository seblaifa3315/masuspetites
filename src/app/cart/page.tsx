import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/storefront/navbar";
import Footer from "@/components/storefront/footer";
import CartContent from "@/components/cart/cart-content";

export const metadata = {
  title: "Cart — Masus Petites",
};

export default function CartPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/#collection"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Link>

        <CartContent />
      </main>
      <Footer />
    </>
  );
}
