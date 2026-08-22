## Masus Petites storefront components

This library is the real storefront + cart UI from the Masus Petites tattoo-art-print
e-commerce app (Next.js + Tailwind v4). It is **always dark** — there is no light mode
for these components (light mode exists only in this app's separate admin panel, not
synced here).

### Wrapping and setup

Most components set their own background. A few sit directly on the page body in the
real app and expect **you** to provide it: `Faq`, `Footer`, `ProductGrid`, `CartContent`,
`SuccessContent`. Wrap any composition using them (and the page/frame in general) in:

```jsx
<div className="bg-background text-foreground">{/* your layout */}</div>
```

No context/theme provider component exists in this bundle — the dark palette is CSS
custom properties on `:root`, always active, no wrapper component needed beyond the
background/text classes above.

### Styling idiom — Tailwind v4 utility classes on named tokens

Style with Tailwind utility classes built from this app's real design tokens (defined in
`styles.css`, not generic Tailwind defaults):

| Class | Token | Use |
|---|---|---|
| `bg-background` | `#0A0A0A` | page background |
| `bg-surface` | `#161616` | card/section background |
| `border-border` | `#262626` | hairline borders |
| `text-foreground` | `#F0F0F0` | primary text |
| `text-muted` | `#737373` | secondary text |
| `bg-accent` / `text-accent` | `#EC4899` | brand pink — CTAs, highlights |
| `hover:bg-accent-hover` | `#DB2777` | accent hover state |
| `font-heading` | Cinzel Decorative | display/heading font — use for titles, never body copy |
| (default sans) | Inter | body font — the default, no class needed |

These are exact class names verified against the compiled stylesheet — don't invent
`bg-primary`, `bg-dark`, etc.

### Where the truth lives

`styles.css` (imports `_ds_bundle.css`, the real compiled Tailwind output — every class
above is defined there with the real token values) and each component's own
`<Name>.prompt.md` / `<Name>.d.ts` for its exact prop API.

### Idiomatic snippet

```jsx
<div className="bg-surface border border-border rounded-lg p-6">
  <h3 className="font-heading text-lg text-foreground mb-2">Title</h3>
  <p className="text-muted text-sm mb-4">Supporting copy.</p>
  <button className="bg-accent hover:bg-accent-hover text-white font-medium rounded-lg px-4 py-2">
    Action
  </button>
</div>
```

# MasusPetites (masus-petites-storefront@0.1.0)

This design system is the published masus-petites-storefront React library, bundled as a single
browser global. All 15 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.MasusPetites`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry: it `@import`s the tokens, fonts, and component styles (`_ds_bundle.css`). Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.MasusPetites.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { About } = window.MasusPetites;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<About />);
```

## Tokens

129 CSS custom properties from masus-petites-storefront. Names are
preserved verbatim from upstream. They are declared inside `_ds_bundle.css` (this DS ships one compiled stylesheet rather than separate token files).

- **color** (38): `--color-red-400`, `--color-red-500`, `--color-yellow-400`, …
- **spacing** (5): `--tw-space-y-reverse`, `--tw-inset-shadow`, `--tw-inset-shadow-alpha`, …
- **typography** (13): `--font-mono`, `--font-weight-thin`, `--font-weight-medium`, …
- **radius** (3): `--radius-md`, `--radius-lg`, `--radius-2xl`
- **shadow** (7): `--tw-shadow`, `--tw-ring-shadow`, `--tw-shadow-alpha`, …
- **other** (63): `--spacing`, `--container-sm`, `--container-md`, …

## Components

### storefront
- `About`
- `Contact`
- `Faq`
- `Footer`
- `Hero`
- `InstagramIcon`
- `Navbar`
- `ProductCard`
- `ProductDetail`
- `ProductGrid`
- `TattooCarousel`
- `TikTokIcon`
- `XIcon`

### cart
- `CartContent`
- `SuccessContent`
