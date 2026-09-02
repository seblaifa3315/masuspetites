import Navbar from "@/components/storefront/navbar";
import Footer from "@/components/storefront/footer";
import SuccessContent from "@/components/cart/success-content";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Order Confirmed — Masus Petites",
};

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// The order is created asynchronously by the Stripe webhook, which can land
// a moment after the customer is redirected here — retry briefly so the
// order number is there for the common case instead of racing the webhook.
async function findOrderNumber(sessionId: string): Promise<string | null> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const order = await prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
      select: { orderNumber: true },
    });
    if (order) return order.orderNumber;
    await sleep(750);
  }
  return null;
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { session_id } = await searchParams;
  const orderNumber = session_id ? await findOrderNumber(session_id) : null;

  return (
    <>
      <Navbar />
      <main className="flex-1 min-w-0 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SuccessContent orderNumber={orderNumber} />
      </main>
      <Footer />
    </>
  );
}
