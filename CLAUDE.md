# Masus Petites — Tattoo Art Prints E-commerce

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript, src/ directory)
- **Styling:** Tailwind CSS v4 (storefront: always-dark; admin: dark/light toggle)
- **Fonts:** Inter (body), Cinzel Decorative (headings)
- **Icons:** Lucide React + custom SVG icons (Instagram, TikTok, X)
- **ORM:** Prisma with Supabase PostgreSQL
- **Auth:** Supabase Auth (2-hour session expiry enforced via cookie)
- **Storage:** Supabase Storage (product images)
- **Payments:** Stripe (Checkout Sessions)
- **Emails:** Resend (order confirmations)
- **State:** Zustand (cart with localStorage persistence)
- **UI Components:** shadcn/ui (admin)
- **Testing:** Vitest (unit), Playwright (e2e)

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Storefront homepage
│   ├── actions.ts          # Contact form server action
│   ├── product/[slug]/     # Product detail page
│   ├── cart/               # Cart page
│   ├── checkout/success/   # Post-checkout confirmation
│   ├── admin/              # Admin dashboard
│   │   ├── (dashboard)/    # Route group: sidebar layout
│   │   │   ├── layout.tsx  # Sidebar + main content layout
│   │   │   ├── page.tsx    # Dashboard home
│   │   │   ├── products/   # Products management (CRUD, list, new, [id]/edit)
│   │   │   │   ├── actions.ts    # Server actions: create, update, delete, toggleActive
│   │   │   │   ├── new/          # New product page
│   │   │   │   └── [id]/edit/    # Edit product page
│   │   │   ├── orders/     # Orders management
│   │   │   ├── finances/   # Finances page (revenue/fees/margins breakdown)
│   │   │   └── messages/   # Messages management (contact form inbox)
│   │   │       └── actions.ts    # Server actions: read, delete, star, bulk ops, markAllRead
│   │   ├── login/          # Admin login (split-screen with image)
│   │   ├── forgot-password/# Password reset request
│   │   ├── update-password/# Set new password after reset
│   │   └── auth/callback/  # Supabase auth code exchange
│   └── api/webhooks/       # Stripe webhook handler
├── components/
│   ├── storefront/         # Storefront UI components
│   │   ├── navbar.tsx      # Sticky navbar with mobile menu + cart badge
│   │   ├── hero.tsx        # Full-width hero with background image + animations
│   │   ├── product-card.tsx# Product card with tilt/glare effect + dark overlay
│   │   ├── product-grid.tsx# Masonry layout product grid
│   │   ├── about.tsx       # About the artist section
│   │   ├── faq.tsx         # Accordion FAQ
│   │   ├── contact.tsx     # Contact form + social links
│   │   ├── icons.tsx       # Custom SVG icons (Instagram, TikTok, X)
│   │   └── footer.tsx      # Footer with links + socials
│   ├── product/            # Product display components
│   ├── cart/               # Cart components
│   └── admin/              # Admin panel components
│       ├── sidebar.tsx     # Collapsible sidebar with nav, user info
│       ├── theme-toggle.tsx# Dark/light mode toggle
│       ├── logout-button.tsx
│       ├── product-form.tsx   # Shared create/edit product form
│       ├── product-actions.tsx# Row actions (edit, delete, active toggle)
│       ├── message-actions.tsx  # MessageRow: expand, read/unread, star, delete, checkbox
│       ├── messages-table.tsx   # Client wrapper: bulk selection, action bar, empty state
│       ├── mark-all-read-button.tsx # Mark all messages as read button
│       ├── finances-breakdown.tsx   # Finances chart (monthly/yearly toggle)
│       └── finances-settings-form.tsx # Configurable rate settings form
├── lib/
│   ├── prisma.ts           # Prisma client singleton (PrismaPg adapter)
│   ├── supabase/           # Supabase clients (browser, server, admin)
│   ├── stripe.ts           # Stripe client
│   ├── resend.ts           # Resend client
│   ├── finances-queries.ts # Finances query helpers (summary, monthly, yearly breakdowns)
│   └── store/cart.ts       # Zustand cart store (persist middleware, localStorage)
├── types/                  # Shared TypeScript types
└── generated/              # Prisma generated types
```

## Prisma v7
- Client uses `@prisma/adapter-pg` (no `url` in schema — configured in `prisma.config.ts`)
- Import from `@/generated/prisma/client` (not `@/generated/prisma`)
- Run `npx prisma generate` after schema changes

## Supabase Storage
- Product images stored in the `product-images` public bucket
- Admin operations use the service role key (`SUPABASE_SERVICE_ROLE_KEY`) via `lib/supabase/admin.ts` to bypass RLS
- Image upload converts `File` to `Buffer` before uploading (required for server actions)

## Products
- Each product has a single variant (sizeLabel: "Standard") with a price in cents
- Product list sorted: active first, then alphabetical by name
- Slug auto-generated from product name on the server (not exposed in admin UI)

## Storefront
- Homepage sections: Navbar > Hero > Product Grid > About > FAQ > Contact > Footer
- Product grid uses CSS columns masonry layout (`columns-[220px]`) with varying aspect ratios; heading is followed by a short paragraph describing printing/paper quality
- Product cards feature tilt/glare effect on hover + dark gradient overlay with slide-up cart button
- Hero title has breathe + flicker animations (defined in `globals.css` `@layer base`)
- Hero CTA button glows on hover (`.hero-glow-btn` class in `globals.css`)
- Hero content (headline/CTA) fades in + slides up once on scroll into view, via `IntersectionObserver` (threshold 0.2, disconnects after first trigger); respects `motion-reduce`
- Hero background has a scroll-linked parallax effect: a `scroll` listener (rAF-throttled) translates the oversized background wrapper at `PARALLAX_FACTOR` (currently 0.6) of `window.scrollY`; the wrapper is intentionally oversized (`height`/`top` in `hero.tsx`) so the buffer never runs out before the section scrolls out of view — if `PARALLAX_FACTOR` changes, the buffer size must scale with it or a gap will show at the edges. Skipped under `prefers-reduced-motion: reduce`. This is also why the hero background looks more cropped/zoomed on narrow (mobile/portrait) viewports — expected, not a bug
- Navbar smooth-scrolls to sections; logo scrolls to top
- Cart store uses Zustand `persist` middleware; hydration handled with `mounted` state check
- Contact form uses `useActionState` with server action writing to `ContactMessage` table
- Custom SVG icons for Instagram, TikTok, X in `components/storefront/icons.tsx`
- No shipping cost or tax is added at Stripe Checkout (shipping is baked into the listed price); cart and product-detail pages say "Free shipping · No taxes added" — keep this in sync if that ever changes in `cart/actions.ts`

## Mobile layout pitfall
- `<body>` is `flex flex-col` (`app/layout.tsx`), so every page's `<main>` is a flex item. A flex item's default `min-width: auto` lets wide content (fixed-width rows, horizontal-scroll lists) force `<main>` — and the whole page — wider than the viewport on mobile, even with `overflow-x: auto` on the inner element itself
- Every `<main>` must carry both `min-w-0` and `w-full` alongside `max-w-7xl mx-auto` (see `app/page.tsx`, `app/cart/page.tsx`, `app/product/[slug]/page.tsx`, `app/checkout/success/page.tsx`) — `w-full` is required because `mx-auto` auto-margins on a flex item disable `align-items: stretch` and fall back to shrink-to-fit sizing, which `min-w-0` alone does not fix
- Any new fixed-width row of cards/images (e.g. a "You might also like" strip) needs responsive per-breakpoint sizing, not just a fixed rem value, or this bug reappears

## Orders & Checkout
- Order numbers use the `MP-{n}` format (e.g. `MP-1001`), starting at 1001
- Orders are **only** ever created by the Stripe webhook (`api/webhooks/stripe/route.ts`), never by the checkout server action (`cart/actions.ts`) — that action just creates the Stripe Checkout Session and redirects; the order + `OrderItem` rows and both confirmation emails (buyer + seller via `CONTACT_NOTIFICATION_EMAIL`) are created/sent from the webhook handler after Stripe reports `checkout.session.completed`
- Every real order has a `stripeSessionId` and `stripePaymentIntent` set; this is the reliable way to distinguish real orders from seeded/fake ones (fake orders have `stripeSessionId: null`)
- The webhook generates the next order number by scanning existing `MP-` orders for the current max — not by counting rows — to stay correct even if orders are deleted
- `checkout/success/page.tsx` reads `?session_id=` (from Stripe's `success_url` template) and looks up the order to display its order number. Because the webhook runs asynchronously and can land after the redirect, the page retries the DB lookup up to 5× with 750ms delays (~3.75s total) before falling back to showing no order number — this is a real race condition, not a rare edge case, so don't remove the retry when touching this page

## Seed Script Safety
- `prisma/seed.ts` is safe to re-run against a database that also has real data — it must stay that way:
  - Deletes only orders/`OrderItem`/`OrderNote` where `stripeSessionId: null` (i.e. previously seeded, never real orders)
  - Deletes only `ContactMessage` rows whose email ends in `@email.com` (the fake domain the seed script itself always generates)
  - New seeded order numbers continue after the current max `MP-` number in the DB (real or seeded) rather than resetting to `MP-1001`, so reseeding can never collide with a real order number
- If you add new fake data types to the seed script, follow the same pattern: give seeded rows an unambiguous marker (a null FK, a reserved value/domain) and filter deletes by it — never an unconditional `deleteMany()` on a table that can also hold real data

## Messages
- ContactMessage model has `isRead` and `isStarred` boolean fields
- Messages page is paginated (20 per page) via `?page=` search param
- Sort order: starred first → unread → newest (`isStarred desc, isRead asc, createdAt desc`)
- Server actions: toggleReadStatus, deleteMessage, markAllAsRead, toggleStarred, bulkMarkRead, bulkMarkUnread, bulkToggleStarred, bulkDelete
- MessagesTable (client component) manages bulk selection state; MessageRow handles individual row interactions
- Expand/collapse uses CSS grid `gridTemplateRows: 0fr/1fr` transition (always-rendered hidden row)
- Dates serialized to ISO strings before passing from server page to client components

## Finances
- `AdminSettings` model stores configurable rates: `stripeFeePercent`, `stripeFeeFixed` (cents), `shippingFlatCost` (cents), `taxRatePercent`
- Default row with `id: "default"` seeded via `prisma/seed.ts`; settings form uses `upsert` so the row is always present
- Finances page (`/admin/finances`) is a server component with date filtering via `searchParams`
- Summary cards: Gross Revenue, Stripe Fees, Shipping, Net Before Tax, Est. Tax, Est. Take-Home (all in cents, formatted to dollars)
- Stripe fee per order = `totalCents * stripeFeePercent / 100 + stripeFeeFixed` (only on successful transactions)
- Breakdown chart (`finances-breakdown.tsx`) has Monthly/Yearly toggle, uses Recharts grouped bar chart with `useThemeColors()` hook
- Rate settings form (`finances-settings-form.tsx`) is embedded at the bottom of the finances page (not in the settings page)
- Settings are loaded client-side via `getFinancesSettingsAction` server action, saved via `updateFinancesSettings`
- Dashboard's Order Status donut (`components/admin/dashboard/charts.tsx`, `STATUS_COLORS`) colors: PAID red (`#EF4444`), SHIPPED yellow (`#EAB308`), DELIVERED green (`#22C55E`)

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
- Accent: #EC4899 (hot pink)
- Accent hover: #DB2777

## Theme Palette (Light — admin only)
- Background: #F5F5F5
- Surface: #FFFFFF
- Border: #E5E5E5
- Foreground: #171717
- Muted: #737373
- Accent: #EC4899 (hot pink)
- Accent hover: #DB2777

## CSS Animations
- Custom keyframes defined in `globals.css` inside `@layer base`: `float`, `breathe`, `drift`, `flicker`
- Applied via inline `style={{ animation: "..." }}` on elements (Tailwind v4 can purge arbitrary animation classes)
- Hero CTA glow uses plain CSS class `.hero-glow-btn:hover` to avoid Tailwind purging
