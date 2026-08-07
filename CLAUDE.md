# Tattoo Art Prints — E-commerce

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript, src/ directory)
- **Styling:** Tailwind CSS v4 (storefront: always-dark; admin: dark/light toggle)
- **Fonts:** Inter (body), Space Grotesk (headings)
- **Icons:** Lucide React
- **ORM:** Prisma with Supabase PostgreSQL
- **Auth:** Supabase Auth (2-hour session expiry enforced via cookie)
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
│   ├── admin/              # Admin dashboard
│   │   ├── (dashboard)/    # Route group: sidebar layout
│   │   │   ├── layout.tsx  # Sidebar + main content layout
│   │   │   ├── page.tsx    # Dashboard home
│   │   │   ├── products/   # Products management
│   │   │   ├── orders/     # Orders management
│   │   │   └── messages/   # Messages management
│   │   ├── login/          # Admin login (split-screen with image)
│   │   ├── forgot-password/# Password reset request
│   │   ├── update-password/# Set new password after reset
│   │   └── auth/callback/  # Supabase auth code exchange
│   └── api/webhooks/       # Stripe webhook handler
├── components/
│   ├── storefront/         # Storefront UI components
│   ├── product/            # Product display components
│   ├── cart/               # Cart components
│   └── admin/              # Admin panel components
│       ├── sidebar.tsx     # Collapsible sidebar with nav, user info
│       ├── theme-toggle.tsx# Dark/light mode toggle
│       └── logout-button.tsx
├── lib/
│   ├── prisma.ts           # Prisma client singleton
│   ├── supabase/           # Supabase clients (browser + server)
│   ├── stripe.ts           # Stripe client
│   ├── resend.ts           # Resend client
│   └── store/cart.ts       # Zustand cart store
├── types/                  # Shared TypeScript types
└── generated/              # Prisma generated types
```

## Auth Flow
- Admin login at `/admin/login`
- Forgot password → Supabase sends reset email → `/admin/auth/callback` exchanges code → `/admin/update-password`
- Session expiry: 2-hour cookie (`admin_session_start`) checked in `src/proxy.ts`
- Public admin routes (no auth required): `/admin/login`, `/admin/forgot-password`, `/admin/auth/callback`, `/admin/update-password`

## Theme Palette (Dark — default)
- Background: #0A0A0A
- Surface: #161616
- Border: #262626
- Foreground: #F0F0F0
- Muted: #737373
- Accent: #7C3AED (deep violet)
- Accent hover: #6D28D9

## Theme Palette (Light — admin only)
- Background: #F5F5F5
- Surface: #FFFFFF
- Border: #E5E5E5
- Foreground: #171717
- Muted: #737373
- Accent: #7C3AED (deep violet)
- Accent hover: #6D28D9
