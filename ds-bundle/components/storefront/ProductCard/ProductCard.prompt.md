ProductCard from masus-petites-storefront. Use via `window.MasusPetites.ProductCard` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### WithImage

```jsx
() => (
  <div className="w-64">
    <ProductCard
      id="prod-1"
      name="Serpent & Rose"
      slug="serpent-and-rose"
      imageUrl={PLACEHOLDER_IMAGE}
      priceCents={4800}
      variantId="var-1"
      aspectRatio="3/4"
    />
  </div>
)
```

### NoImage

```jsx
() => (
  <div className="w-64">
    <ProductCard
      id="prod-2"
      name="Anchor Study"
      slug="anchor-study"
      imageUrl={null}
      priceCents={3600}
      variantId="var-2"
      aspectRatio="3/4"
    />
  </div>
)
```
