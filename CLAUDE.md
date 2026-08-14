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
│       └── mark-all-read-button.tsx # Mark all messages as read button
├── lib/
│   ├── prisma.ts           # Prisma client singleton (PrismaPg adapter)
│   ├── supabase/           # Supabase clients (browser, server, admin)
│   ├── stripe.ts           # Stripe client
│   ├── resend.ts           # Resend client
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
- Product grid uses CSS columns masonry layout (`columns-[220px]`) with varying aspect ratios
- Product cards feature tilt/glare effect on hover + dark gradient overlay with slide-up cart button
- Hero title has breathe + flicker animations (defined in `globals.css` `@layer base`)
- Hero CTA button glows on hover (`.hero-glow-btn` class in `globals.css`)
- Navbar smooth-scrolls to sections; logo scrolls to top
- Cart store uses Zustand `persist` middleware; hydration handled with `mounted` state check
- Contact form uses `useActionState` with server action writing to `ContactMessage` table
- Custom SVG icons for Instagram, TikTok, X in `components/storefront/icons.tsx`

## Messages
- ContactMessage model has `isRead` and `isStarred` boolean fields
- Messages page is paginated (20 per page) via `?page=` search param
- Sort order: starred first → unread → newest (`isStarred desc, isRead asc, createdAt desc`)
- Server actions: toggleReadStatus, deleteMessage, markAllAsRead, toggleStarred, bulkMarkRead, bulkMarkUnread, bulkToggleStarred, bulkDelete
- MessagesTable (client component) manages bulk selection state; MessageRow handles individual row interactions
- Expand/collapse uses CSS grid `gridTemplateRows: 0fr/1fr` transition (always-rendered hidden row)
- Dates serialized to ISO strings before passing from server page to client components

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
