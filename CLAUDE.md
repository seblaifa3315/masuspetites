# Tattoo Art Prints — E-commerce

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript, src/ directory)
- **Styling:** Tailwind CSS v4 (always-dark theme, no light mode)
- **Fonts:** Inter (body), Space Grotesk (headings)
- **ORM:** Prisma with Supabase PostgreSQL
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage (product images)
- **Payments:** Stripe (Checkout Sessions)
- **Emails:** Resend (order confirmations)
- **State:** Zustand (cart)
- **UI Components:** shadcn/ui (admin)
- **Testing:** Vitest (unit), Playwright (e2e)

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Storefront homepage
│   ├── product/[slug]/     # Product detail page
│   ├── cart/               # Cart page
│   ├── checkout/success/   # Post-checkout confirmation
│   ├── admin/              # Admin dashboard (login, products, orders, messages)
│   └── api/webhooks/       # Stripe webhook handler
├── components/
│   ├── storefront/         # Storefront UI components
│   ├── product/            # Product display components
│   ├── cart/               # Cart components
│   └── admin/              # Admin panel components
├── lib/
│   ├── prisma.ts           # Prisma client singleton
│   ├── supabase/           # Supabase clients (browser + server)
│   ├── stripe.ts           # Stripe client
│   ├── resend.ts           # Resend client
│   └── store/cart.ts       # Zustand cart store
├── types/                  # Shared TypeScript types
└── generated/              # Prisma generated types
```

## Theme Palette
- Background: #0A0A0A
- Surface: #161616
- Border: #262626
- Foreground: #F0F0F0
- Muted: #737373
- Accent: #7C3AED (deep violet)
- Accent hover: #6D28D9
