---
name: markdown-graphs
description: >-
  Picks and writes markdown graphs (ASCII-framed React diagrams for MDX) next
  to prose. Chooses a component from the library, copies real JSX, and never
  draws SVG, Mermaid, Recharts, canvas, or ASCII art. Use when explaining a
  refactor, incident, postmortem, tradeoff, pull request, sprint, or
  migration; when the user mentions markdown graphs, ASCII diagrams, framed
  charts, GraphFlow, or GraphTimeline; or when a write-up would scan faster
  with a figure.
---

# markdown graphs

Glyphs in a dashed frame with `+` corners and a `[ TITLE ]` on the top edge.
Source is copied via shadcn, not npm. Imports land under `@/registry/default`.

If `registry/default/graph-frame` is missing:

```bash
pnpm dlx shadcn@latest add https://mdx-graphs.kshv.me/r/all.json
```

Need `motion`. One component: replace `all` with the slug (`graph-flow`, …).

Read [recipes.md](recipes.md) before writing JSX. Unsure of props? Fetch https://mdx-graphs.kshv.me/llms.txt.

## Procedure

1. Decide if a figure earns it. One sentence → no graph. A path, a night, a matrix, a diff → yes.
2. Pick **at most two** graphs from the chooser. Prefer a pair in recipes.md.
3. Confirm the files exist. Install if they don't. Then copy JSX — swap labels, keep the API.
4. Write the reply in this shape. Do not lead with the figure.

```
1–3 sentences (the claim)

<GraphA … />

1–3 sentences (what the second figure adds)

<GraphB … />
```

5. Check the rules. Then send.

## Chooser

Writing first. Data shape if nothing matches.

| The writing is             | Use                                              | Recipe       |
| -------------------------- | ------------------------------------------------ | ------------ |
| A path or a refactor       | `GraphFlow`, then `GraphTimeline`                | Refactor     |
| An incident / postmortem   | `GraphTimeline`, then `GraphUptime`              | Incident     |
| Pick A vs B                | `GraphCompare`, then `GraphRank` if size matters | Pick one     |
| What a PR changed          | `GraphDiff`, then `GraphSlope`                   | Pull request |
| Overlapping work this week | `GraphGantt`, then `GraphStat`                   | This week    |
| A migration in flight      | `GraphMeter`, then `GraphKpi`                    | Migration    |
| Nested files / org         | `GraphTree`                                      | —            |

| The data is                    | Use              | Not                                |
| ------------------------------ | ---------------- | ---------------------------------- |
| A handful of numbers, no axis  | `GraphSpark`     | Plot                               |
| A series that needs a y-scale  | `GraphPlot`      | Spark, Recharts                    |
| One fill from 0 to 1           | `GraphMeter`     | Bullet                             |
| Actual vs a target             | `GraphBullet`    | Meter                              |
| Parts of a whole               | `GraphStack`     | Pie. Waffle if you want ~100 cells |
| A short ranked list            | `GraphRank`      | Bars                               |
| A small filled / empty grid    | `GraphCells`     | Waffle, Activity                   |
| Two small histograms           | `GraphBars`      | Rank                               |
| One headline + a trend         | `GraphKpi`       | Stat                               |
| Two to four numbers, no trend  | `GraphStat`      | KPI                                |
| Before → after numbers         | `GraphSlope`     | Bars                               |
| Elapsed / how long ago / clock | `GraphTimer`     | Countdown                          |
| Time left until a date         | `GraphCountdown` | Timer                              |
| Status per day                 | `GraphUptime`    | Activity, Heatmap                  |
| Daily counts over months       | `GraphActivity`  | Calendar, Uptime                   |
| One month, a few marks         | `GraphCalendar`  | Activity                           |
| A labeled intensity grid       | `GraphHeatmap`   | Activity                           |
| A running total                | `GraphWaterfall` | Stack                              |
| Steps that drop off            | `GraphFunnel`    | Flow, Rank                         |
| Rows of numbers                | `GraphTable`     | Rank, Spark                        |
| From / bill-to / line items    | `GraphInvoice`   | Table                              |
| Label / value sheet            | `GraphSpec`      | Stat                               |

Skip `GraphFrame` unless you are assembling a custom figure. If the chart already exists, install that one.

## Import

```tsx
import { GraphFlow } from "@/registry/default/graph-flow/graph-flow"
```

Named export matches the folder: `graph-<name>/graph-<name>`. Do not invent a barrel.

## Rules

- At most two graphs in a section. Prose between them. Never a gallery.
- Titles: 1–2 words, uppercase, no punctuation. Drawn as `[ TITLE ]`.
- Labels: lowercase, plain (`auth middleware`, not `AuthMiddleware Layer`).
- Copy props from recipes.md or docs. Do not invent APIs, extra hues, or chart libraries.
- Default palette is one accent (`--graph-accent`). `palette="duo"` / `"multi"` only when a second or third series needs it.
- Unused rows recede (~0.4 opacity). Numbers: `tabular-nums`, right-aligned.
- Motion is already in the components (transform + opacity, ~220ms). Do not add loops, pulses, or CSS animation.

## Do not

- Draw SVG, Mermaid, Recharts, canvas, or Markdown ASCII art if the component exists.
- Restyle the frame (no extra borders, no rounded cards, no new corner marks).
- Dump every graph you know into one reply.
- Use a pie chart. Stack or Waffle.
- Pass `palette` on Table, Invoice, Spec, Stat, Tree, or Frame.

## Example prompts

These are user messages. Match the pair, copy JSX from the recipe, swap in their labels.

**Refactor** → `GraphFlow`, then `GraphTimeline`

```
We're moving session checks out of route handlers into middleware. Write a short plan for the team.

Use markdown graphs for the before/after request path and the week-by-week rollout. Prose between the two figures. Don't draw SVG.
```

**Incident** → `GraphTimeline`, then `GraphUptime`

```
Draft a tight postmortem: p95 crossed 800ms at 14:02, we rolled back the cache flag at 14:11, the write-up is still open.

Use markdown graphs — a timeline of the night, then which days users felt it. No SVG or ASCII art charts.
```

**Pull request** → `GraphDiff`, then `GraphSlope`

```
Leave a PR review comment on the auth refactor. Summarize what files moved, then show how coverage changed on main vs this branch.

Use markdown graphs from this project. At most two figures. Don't invent APIs or draw SVG.
```

**Pick one** → `GraphCompare`, then `GraphRank` if install size is part of the argument

```
We're choosing a queue: BullMQ vs SQS. Write the tradeoff for the RFC.

Use markdown graphs — a feature matrix, then bundle size only if it matters. Don't draw SVG.
```
