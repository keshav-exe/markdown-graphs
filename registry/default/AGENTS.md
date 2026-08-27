# Registry graphs

Each item is a folder `graph-<name>/graph-<name>.tsx`. Users copy these files via shadcn; keep them self-contained aside from `graph-frame`.

## Frame

```tsx
<Graph title={title} className={className} corner={corner}>
  <GraphBody>{/* ... */}</GraphBody>
</Graph>
```

Horizontal tracks must span the frame. Use `GraphTrack` + `GraphTick` (`flex-1`), not 1ch-wide ticks with empty `1fr`.

Import primitives from `@/registry/default/graph-frame/...`, never from the site barrel.

## Glyphs and color

```ts
glyphs?: Glyphs // "shade" | "ascii" | "hash" | "bar" | readonly string[]
palette?: GraphPalette // "mono" | "duo" | "multi", default "mono"
corner?: string // default "+"
```

Resolve with `resolveGlyphs(glyphs)`. Intensity: `intensityLevel` / `intensityGlyph` / `intensityClass(level, palette)`. Series: `seriesClass` / `seriesDim` / `toneClass`. Default is one accent. Mute with `text-graph-muted` / opacity. `palette="duo"` paints the second series with `--graph-accent-2`. `palette="multi"` cycles three accents. Don't invent extra hues.

No CSS-box charts. No nested radius demos. No type-specimen / contrast-token graphs.

## Motion

`fadeUp` + `staggerList` + `graphTransition` from `graph-motion.ts`. Stagger rows/weeks, not every cell. `viewport={{ once: true }}`.

## A11y

Visible glyphs can be `aria-hidden` if a single `sr-only` sentence states the figure. Don’t dump extra `sr-only` nodes into grid tracks.

## After the source file

Wire catalog / examples / **New** slugs — see [`lib/docs/AGENTS.md`](../../lib/docs/AGENTS.md). Then `pnpm registry:build`.
