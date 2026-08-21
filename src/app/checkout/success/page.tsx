import Navbar from "@/components/storefront/navbar";
import Footer from "@/components/storefront/footer";
import SuccessContent from "@/components/cart/success-content";

export const metadata = {
  title: "Order Confirmed — Masus Petites",
};

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SuccessContent />
      </main>
      <Footer />
    </>
  );
}
