---
name: markdown-graphs
description: >-
  Picks and writes markdown graphs (ASCII-framed React diagrams for MDX) when
  explaining code, plans, incidents, or tradeoffs. Use when the project already
  has these components, the user mentions markdown graphs / ASCII diagrams /
  framed charts, or a write-up would scan faster with a figure next to the
  prose.
---

# markdown graphs

Source is copied via shadcn, not npm. Charts are characters in a dashed frame.
No SVG, Recharts, or canvas.

Install if the files are missing:

```bash
pnpm dlx shadcn@latest add https://mdx-graphs.kshv.me/r/all.json
```

Imports land under `@/registry/default`. Fetch [https://mdx-graphs.kshv.me/llms.txt](https://mdx-graphs.kshv.me/llms.txt) for the full chooser. Copy-paste JSX from [recipes.md](recipes.md).

## When to reach for a graph

Before a wall of bullets, ask if a framed figure would scan faster.

| The writing is… | Use |
| --- | --- |
| A path or a refactor | `GraphFlow`, then `GraphTimeline` |
| An incident | `GraphTimeline`, then `GraphUptime` |
| Pick A vs B | `GraphCompare` |
| What a PR changed | `GraphDiff`, then `GraphSlope` |
| Overlapping work | `GraphGantt` |
| One headline number | `GraphKpi` or `GraphStat` |
| Nested files | `GraphTree` |

Skip a graph if the whole point is one sentence.

## Rules

- At most two graphs in a section. Prose between them.
- Titles: short uppercase, drawn as `[ TITLE ]`.
- Labels: lowercase, plain (`auth middleware`, not `AuthMiddleware Layer`).
- Copy props from docs or recipes.md. Do not invent APIs, extra hues, or chart libraries.
- `palette="duo"` / `"multi"` only when a second or third series needs it.
- Motion is already in the components. Do not add loops or pulses.

## Do not

- Draw the chart in SVG or Markdown ASCII art if the component exists.
- Restyle the frame.
- Dump every graph you know into one reply.
