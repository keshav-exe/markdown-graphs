# markdown graphs

React components for ASCII-style tables, charts, and diagrams in MDX. Each graph sits in a dashed frame with a title on the top edge. One accent color. You copy the source into your project — this is not an npm package.

[Docs](https://mdx-graphs.kshv.me/docs) · [Install](https://mdx-graphs.kshv.me/docs/installation) · [GitHub](https://github.com/keshav-exe/markdown-graphs)

## Install

You need an existing [shadcn](https://ui.shadcn.com) project and [`motion`](https://motion.dev).

One component:

```bash
pnpm dlx shadcn@latest add https://mdx-graphs.kshv.me/r/graph-table.json
```

Everything:

```bash
pnpm dlx shadcn@latest add https://mdx-graphs.kshv.me/r/all.json
```

Files land under `@/registry/default`. Import them from there:

```tsx
import { GraphTable } from "@/registry/default/graph-table/graph-table"
```

Add the registry once in `components.json` if you want to install by name:

```json
{
  "registries": {
    "@markdown-graphs": "https://mdx-graphs.kshv.me/r/{name}.json"
  }
}
```

```bash
pnpm dlx shadcn@latest add @markdown-graphs/graph-table
```

## Components

| Component | Registry item | Use for |
| --- | --- | --- |
| Table | `graph-table` | Data tables with optional footer totals |
| Flow | `graph-flow` | Process diagrams on a dashed arrow |
| Bars | `graph-bars` | Two bar groups, side by side |
| Cells | `graph-cells` | Filled / empty grids |
| Scale | `graph-scale` | Labeled ratios and type samples |
| Radii | `graph-radii` | Nested corner radii |
| Meter | `graph-meter` | Progress as `=` and `-` |
| Spark | `graph-spark` | Sparkline from block characters |
| Tree | `graph-tree` | File or org trees |
| Timeline | `graph-timeline` | Dated events, one row current |
| Stack | `graph-stack` | Parts of a whole, glyphs instead of colors |
| Funnel | `graph-funnel` | Steps that get narrower |
| Gantt | `graph-gantt` | Schedule on a character track |
| Plot | `graph-plot` | Line or area from columns of glyphs |
| Waffle | `graph-waffle` | Share of 100 cells |
| Diff | `graph-diff` | Add / remove / keep rows |
| Invoice | `graph-invoice` | From, bill-to, line items, totals |
| Compare | `graph-compare` | Feature matrix (`✓` / `–`) |
| Stat | `graph-stat` | Large figures with labels |
| Spec | `graph-spec` | Label / value sheets |
| Frame | `graph-frame` | Shared dashed frame primitives |

Each docs page has CLI, manual, and agent install tabs. Copy page puts the markdown (install, prompt, examples, props) on the clipboard.

## Design

- Geist Mono. Dashed frame, `+` corners, title as `[ TITLE ]`.
- One accent: `--graph-accent`. Unused rows recede with opacity, not a second color.
- Glyphs do the drawing (`█ ░ - = + ├ └ ✓`). Borders are dashes, not SVG strokes.
- Numbers use `tabular-nums`. Amounts sit right-aligned.
- Motion is transform and opacity only, 220ms, no loops. `prefers-reduced-motion` sets duration to 0.

## Development

```bash
pnpm install
pnpm dev
```

Rebuild the shadcn registry after changing files under `registry/default`:

```bash
pnpm registry:build
```

## License

[MIT](LICENSE)
