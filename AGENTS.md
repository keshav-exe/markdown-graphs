<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# markdown graphs

ASCII-framed React diagrams for MDX. Source is copied via shadcn registry, not npm. Site: https://mdx-graphs.kshv.me. Repo: https://github.com/keshav-exe/markdown-graphs.

Nested agent notes:

- [`registry/default/AGENTS.md`](registry/default/AGENTS.md) — how to build a graph
- [`lib/docs/AGENTS.md`](lib/docs/AGENTS.md) — catalog, examples, **New** marks, OG

## Adding a graph

Do the full list. Docs pages are generated from the catalog; there is no per-component route file.

1. `registry/default/graph-<name>/graph-<name>.tsx`
2. Item in `registry.json` (and its files on the `all` item)
3. Export from `registry/default/index.ts` and `components/graphs/index.ts`
4. Entry in `lib/docs/catalog.ts` and `lib/docs/files.ts`
5. Examples in `components/docs/examples.tsx`, keyed in `examplesBySlug`
6. **Replace** `NEW_SLUGS` in `lib/docs/new.ts` with this drop’s slugs. Do not append to last drop’s list.
7. Row in the README component table
8. Homepage (`app/page.tsx`) only if it earns a slot
9. `pnpm registry:build` so `public/r/` matches source

OG images are `opengraph-image.tsx` via `lib/og`. They prerender at `next build` from the catalog. Do not commit PNGs or add a pre-commit generator. A new catalog row is enough.

## Design

- Geist Mono. Dashed frame, `+` corners (`corner` prop), title as `[ TITLE ]`.
- One accent: `--graph-accent`. Dim unused rows with opacity (~0.4), never a second series color.
- Glyphs draw the chart. Tracks span the frame (`GraphTrack` / `GraphTick`). `glyphs` is a preset (`shade` `ascii` `hash` `bar`) or a custom character array.
- `tabular-nums`. Amounts right-aligned.
- Motion: transform + opacity, ~220ms, ease-out cubic `[0.215, 0.61, 0.355, 1]`. `useReducedMotion` → duration 0. No loops, no pulsing.
- Don’t animate hundreds of cells one-by-one — stagger weeks/rows.
- Plain language. No slogans.

## Code

- Prettier: no semicolons, double quotes, 80 width, Tailwind plugin.
- Registry imports: `@/registry/default/...`. Site barrel: `@/components/graphs`.
- `"use client"` on graphs that use motion.
- Every graph forwards `corner?: string` to `Graph`. Drawing graphs also take `glyphs?: Glyphs`.
- Shared helpers live in `graph-frame` (`graph-motion.ts`). Don’t couple intensity legends into the frame — keep them in the drawing component.

## Commands

```bash
pnpm dev
pnpm typecheck
pnpm registry:build
```
