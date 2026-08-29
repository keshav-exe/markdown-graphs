# Docs catalog

Sidenav, `/docs/[slug]`, install copy, and props tables all read from here. Adding a catalog row is what creates the page.

## Files

| File                                  | Role                                                             |
| ------------------------------------- | ---------------------------------------------------------------- |
| `catalog.ts`                          | `components[]` — slug, title, name, description, registry, props |
| `files.ts`                            | Source paths shown on the Manual / GitHub install tabs           |
| `new.ts`                              | `NEW_SLUGS` — which sidenav links get a **new** mark             |
| `recipes.ts`                          | Composed write-ups on `/docs/examples` and `/llms.txt`           |
| `components/docs/examples.tsx`        | `examplesBySlug[slug]`                                           |
| `components/docs/recipe-card.tsx`     | Live previews for recipes                                        |
| `components/docs/nav.tsx`             | Renders `isNewSlug(item.slug)`                                   |
| `app/docs/[slug]/opengraph-image.tsx` | Per-page OG. Uses catalog title + description                    |

## New marks

`NEW_SLUGS` is the **current drop**, not a changelog.

When you ship new graphs:

```ts
export const NEW_SLUGS = ["graph-this-drop", "graph-also-this-drop"] as const
```

Replace the array. Do not append last drop’s slugs. Empty the list if nothing in this change is new.

Marks are sidenav-only (desktop + mobile). Tiny mono `new` in `text-graph-accent`. No pill chrome. Do not badge the `/docs` component grid unless asked.

`nav.tsx` already calls `isNewSlug`. Don’t hardcode slugs there.

## Palette prop

Drawing graphs take `palette?: "mono" | "duo" | "multi"`. Don't paste it into every catalog row. `PALETTE_SLUGS` + `paletteProp` in `catalog.ts` inject it before `corner`. Skip table, invoice, spec, stat, tree, frame.

`when` / `not` live in `lib/docs/chooser.ts`. They feed the agent prompt, docs blurb, and `/llms.txt`. Update that map when you add a graph. Composed examples live in `recipes.ts` — add a recipe there and a preview in `recipe-card.tsx`.
