import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

// --- Hardcoded fake data arrays ---

const firstNames = [
  "Emma", "Lucas", "Chloé", "Hugo", "Léa", "Louis", "Manon", "Jules",
  "Camille", "Arthur", "Sarah", "Raphaël", "Alice", "Gabriel", "Inès",
  "Nathan", "Jade", "Théo", "Louise", "Maxime", "Zoé", "Ethan", "Lina",
  "Tom", "Eva", "Noah", "Clara", "Adam", "Juliette", "Paul",
];

const lastNames = [
  "Martin", "Bernard", "Dubois", "Thomas", "Robert", "Petit", "Richard",
  "Durand", "Moreau", "Laurent", "Simon", "Michel", "Garcia", "David",
  "Bertrand", "Roux", "Vincent", "Fournier", "Morel", "Girard",
];

const cities = [
  "Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Lille", "Nantes",
  "Strasbourg", "Montpellier", "Nice", "Rennes", "Grenoble", "Rouen",
  "Toulon", "Clermont-Ferrand",
];

const streets = [
  "12 Rue de la Paix", "45 Avenue des Champs-Élysées", "8 Boulevard Haussmann",
  "23 Rue du Faubourg Saint-Honoré", "67 Rue de Rivoli", "3 Place de la République",
  "15 Rue Oberkampf", "91 Avenue de la Liberté", "7 Rue des Lilas",
  "34 Boulevard Victor Hugo", "19 Rue Pasteur", "5 Place du Marché",
  "28 Rue Jean Jaurès", "42 Avenue Gambetta", "11 Rue de la Gare",
];

const postalCodes = [
  "75001", "75003", "75011", "69001", "13001", "31000", "33000",
  "59000", "44000", "67000", "34000", "06000", "35000", "38000", "76000",
];

const carriers = ["Colissimo", "Chronopost", "Mondial Relay", "DPD", "UPS"];

const orderNoteContents = [
  "Customer asked for gift wrapping — added tissue paper and ribbon.",
  "Shipping delayed due to carrier backlog. Customer notified via email.",
  "Customer requested address change before shipment. Updated successfully.",
  "Print quality checked — perfect condition before packing.",
  "Customer is a repeat buyer. Added a thank-you card.",
  "Fragile packaging applied — extra cardboard protection.",
  "Customer enquired about framing options. Sent recommendations via email.",
  "Order flagged for manual review — large quantity. Verified and approved.",
  "Tracking number shared with customer via email.",
  "Customer left a positive review after delivery. Noted for follow-up.",
  "Reprint needed — minor smudge on original. Replacement shipped.",
  "International shipment — customs declaration attached.",
  "Customer requested delivery on a specific date. Coordinated with carrier.",
  "Added promotional flyer for upcoming collection to package.",
  "Partial refund issued for one damaged item in transit.",
];

const contactMessageTexts = [
  "Hi! I love your tattoo art prints. Do you offer custom sizes for any of your designs?",
  "Hello, I placed an order last week and haven't received a shipping confirmation yet. Could you check on it?",
  "Your prints are absolutely stunning. Do you ship internationally?",
  "I'm interested in ordering a large print for my studio. Do you offer bulk discounts?",
  "Hey, I received my order today and the quality is amazing! Just wanted to say thank you.",
  "Could you tell me more about the paper quality you use for your prints?",
  "I'd love to see more botanical-themed designs in your collection. Any plans for that?",
  "Hi there, one of the prints arrived with a small crease in the corner. What can we do about it?",
  "Do you offer framed versions of your prints? I'd pay extra for that option.",
  "I'm a tattoo artist and would love to collaborate. How can we discuss this further?",
  "What's your return policy? I want to make sure before I place a big order.",
  "The packaging was really thoughtful — loved the little details. Keep it up!",
  "Are there any upcoming sales or promotions I should know about?",
  "I'd like to order a print as a gift. Do you include gift receipts?",
  "How long does shipping usually take within France?",
  "I saw your work on Instagram and had to check out the store. Amazing collection!",
  "Can I request a specific design that's currently out of stock?",
  "Do you use eco-friendly materials for printing and packaging?",
  "I placed two separate orders — is it possible to combine them for shipping?",
  "Would you consider offering digital downloads of your designs?",
  "Your snake and dagger design is incredible. What inspired it?",
  "Hi, I'm redecorating my apartment and want to order 5 prints. Any recommendations?",
  "Is there a way to preview how a print would look in a frame before buying?",
  "I recommended your store to all my friends. You deserve more visibility!",
  "Just curious — do you do the tattoo designs yourself or work with other artists?",
];

const contactNames = [
  "Marie Lefevre", "Antoine Mercier", "Sophie Blanchard", "Julien Perrin",
  "Isabelle Chevalier", "Pierre Bonnet", "Nathalie Rousseau", "François Lemoine",
  "Caroline Dupont", "Mathieu Garnier", "Élise Faure", "Damien Carpentier",
  "Aurélie Masson", "Romain Leclerc", "Céline André", "Benoît Fontaine",
  "Valérie Muller", "Sébastien Robin", "Mélanie Picard", "Nicolas Barbier",
  "Stéphanie Arnaud", "Olivier Marchand", "Laure Giraud", "Thibault Noel",
  "Margaux Lambert",
];

// --- Helpers ---

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(monthsAgo: number): Date {
  const now = Date.now();
  const past = now - monthsAgo * 30 * 24 * 60 * 60 * 1000;
  return new Date(past + Math.random() * (now - past));
}

function randomDateInYear(year: number): Date {
  const start = new Date(year, 0, 1).getTime();
  const end = Math.min(new Date(year + 1, 0, 1).getTime(), Date.now());
  return new Date(start + Math.random() * (end - start));
}

function generateTrackingNumber(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 13; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

// --- Main seed function ---

async function main() {
  console.log("Seeding database...\n");

  // 1. Fetch existing product variants with product names
  const variants = await prisma.productVariant.findMany({
    include: { product: { select: { name: true } } },
  });

  if (variants.length === 0) {
    console.error("No product variants found. Please add products first.");
    process.exit(1);
  }

  console.log(`Found ${variants.length} product variant(s) to reference.\n`);

  // 2. Clear seeded tables (respecting FK order)
  console.log("Clearing existing orders, notes, items, and messages...");
  await prisma.orderNote.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.contactMessage.deleteMany();
  console.log("Done.\n");

  // 3. Seed orders — spread across 2024, 2025, and 2026
  // 20 in 2024, 40 in 2025, 30 in 2026
  const orderYears: number[] = [
    ...Array(20).fill(2024),
    ...Array(40).fill(2025),
    ...Array(30).fill(2026),
  ];
  const ORDER_COUNT = orderYears.length;
  console.log(`Creating ${ORDER_COUNT} orders with items (2024–2026)...`);

  for (let i = 0; i < ORDER_COUNT; i++) {
    const orderNumber = `ORD-${1001 + i}`;
    const firstName = pick(firstNames);
    const lastName = pick(lastNames);
    const customerName = `${firstName} ${lastName}`;
    const customerEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`;
    const createdAt = randomDateInYear(orderYears[i]);

    // Determine status — older orders skew delivered, newer skew paid
    const roll = Math.random();
    const year = orderYears[i];
    let status: "PAID" | "SHIPPED" | "DELIVERED";
    if (year === 2024) {
      // 2024: mostly delivered
      status = roll < 0.1 ? "PAID" : roll < 0.2 ? "SHIPPED" : "DELIVERED";
    } else if (year === 2025) {
      // 2025: mixed
      status = roll < 0.2 ? "PAID" : roll < 0.5 ? "SHIPPED" : "DELIVERED";
    } else {
      // 2026: skew toward recent/pending
      status = roll < 0.45 ? "PAID" : roll < 0.75 ? "SHIPPED" : "DELIVERED";
    }

    // Build shipping address
    const shippingAddress = {
      line1: pick(streets),
      city: pick(cities),
      postalCode: pick(postalCodes),
      country: "FR",
    };

    // Pick 1–3 items
    const itemCount = randomInt(1, 3);
    const chosenVariants = [];
    const usedIds = new Set<string>();
    for (let j = 0; j < itemCount; j++) {
      let v = pick(variants);
      // Avoid duplicate variants in same order
      while (usedIds.has(v.id) && usedIds.size < variants.length) {
        v = pick(variants);
      }
      usedIds.add(v.id);
      const quantity = randomInt(1, 3);
      chosenVariants.push({ variant: v, quantity });
    }

    const totalCents = chosenVariants.reduce(
      (sum, item) => sum + item.variant.priceCents * item.quantity,
      0,
    );

    // Tracking info for shipped/delivered orders
    const trackingNumber =
      status !== "PAID" ? generateTrackingNumber() : undefined;
    const shippingCarrier = status !== "PAID" ? pick(carriers) : undefined;
    const shippedAt =
      status !== "PAID"
        ? new Date(createdAt.getTime() + randomInt(1, 3) * 24 * 60 * 60 * 1000)
        : undefined;
    const deliveredAt =
      status === "DELIVERED" && shippedAt
        ? new Date(
            shippedAt.getTime() + randomInt(2, 7) * 24 * 60 * 60 * 1000,
          )
        : undefined;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        status,
        customerEmail,
        customerName,
        shippingAddress,
        totalCents,
        trackingNumber,
        shippingCarrier,
        shippedAt,
        deliveredAt,
        createdAt,
        updatedAt: shippedAt ?? createdAt,
        items: {
          create: chosenVariants.map((item) => ({
            productVariantId: item.variant.id,
            productName: item.variant.product.name,
            sizeLabel: item.variant.sizeLabel,
            quantity: item.quantity,
            unitPriceCents: item.variant.priceCents,
          })),
        },
      },
    });

    // ~30% of orders get 1–2 notes
    if (Math.random() < 0.3) {
      const noteCount = randomInt(1, 2);
      for (let n = 0; n < noteCount; n++) {
        await prisma.orderNote.create({
          data: {
            orderId: order.id,
            content: pick(orderNoteContents),
            createdAt: new Date(
              createdAt.getTime() +
                randomInt(1, 10) * 24 * 60 * 60 * 1000,
            ),
          },
        });
      }
    }
  }

  console.log(`Created ${ORDER_COUNT} orders.\n`);

  // 4. Seed contact messages
  const MESSAGE_COUNT = 25;
  console.log(`Creating ${MESSAGE_COUNT} contact messages...`);

  for (let i = 0; i < MESSAGE_COUNT; i++) {
    const name = contactNames[i % contactNames.length];
    const emailName = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(" ", ".");
    const email = `${emailName}@email.com`;

    // Mix of read/unread/starred
    const isRead = Math.random() < 0.5;
    const isStarred = Math.random() < 0.2;

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        message: contactMessageTexts[i % contactMessageTexts.length],
        isRead,
        isStarred,
        createdAt: randomDate(6),
      },
    });
  }

  console.log(`Created ${MESSAGE_COUNT} contact messages.\n`);

  // 5. Summary
  const [orderCount, itemCount, noteCount, msgCount] = await Promise.all([
    prisma.order.count(),
    prisma.orderItem.count(),
    prisma.orderNote.count(),
    prisma.contactMessage.count(),
  ]);

  console.log("Seed complete!");
  console.log(`  Orders:           ${orderCount}`);
  console.log(`  Order items:      ${itemCount}`);
  console.log(`  Order notes:      ${noteCount}`);
  console.log(`  Contact messages: ${msgCount}`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
