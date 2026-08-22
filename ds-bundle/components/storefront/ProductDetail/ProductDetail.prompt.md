ProductDetail from masus-petites-storefront. Use via `window.MasusPetites.ProductDetail` (bundle loaded from the root `_ds_bundle.js`).

## Examples

### Default

```jsx
() => (
  <ProductDetail
    product={{
      id: "prod-1",
      name: "Serpent & Rose",
      slug: "serpent-and-rose",
      description:
        "A hand-drawn linework study pairing a coiled serpent with a single rose bloom. Printed on premium 300gsm archival matte paper.",
      imageUrl: PLACEHOLDER_IMAGE,
      variants: [
        { id: "var-1", sizeLabel: "Standard", dimensions: "8 x 10 in", priceCents: 4800 },
        { id: "var-2", sizeLabel: "Large", dimensions: "12 x 16 in", priceCents: 7200 },
      ],
    }}
  />
)
```
