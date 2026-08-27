export type NavLink = {
  href: string
  label: string
}

export type PropRow = {
  name: string
  type: string
  default?: string
  description: string
}

export type ComponentDoc = {
  slug: string
  title: string
  name: string
  description: string
  registry: string
  dependencies: string[]
  props: PropRow[]
}

export const getStarted: NavLink[] = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs/installation", label: "Installation" },
]

export const components: ComponentDoc[] = [
  {
    slug: "graph-table",
    title: "Table",
    name: "GraphTable",
    description: "Framed data table with an optional footer row for totals.",
    registry: "graph-table",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "headers",
        type: "string[]",
        description: "Column headings. Sentence case.",
      },
      {
        name: "rows",
        type: "ReactNode[][]",
        description: "Body cells, one array per row.",
      },
      {
        name: "footer",
        type: "ReactNode[]",
        description: "Optional totals row under a rule.",
      },
      {
        name: "align",
        type: '("left" | "right")[]',
        default: "left, then right",
        description:
          "Per-column alignment. Defaults to left on the first column.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-flow",
    title: "Flow",
    name: "GraphFlow",
    description:
      "Process diagram with nodes on a dashed arrow. Accent a node to highlight a path.",
    registry: "graph-flow",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "rows",
        type: "FlowRow[]",
        description: "Each row is a sequence of nodes.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-bars",
    title: "Bars",
    name: "GraphBars",
    description:
      "Two bar groups side by side, with a label between them. The right group is usually the larger one.",
    registry: "graph-bars",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "from",
        type: "BarSeries",
        description: "Left series. values is an array of relative heights.",
      },
      {
        name: "to",
        type: "BarSeries",
        description: "Right series. Set size to lg for the larger group.",
      },
      {
        name: "processor",
        type: "string",
        default: '"AI"',
        description: "Label between the two groups.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-cells",
    title: "Cells",
    name: "GraphCells",
    description:
      "Grid of filled and empty cells. Useful for density, coverage, or comparing two sets.",
    registry: "graph-cells",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "items",
        type: "CellGrid[]",
        description: "Each item is a labeled 0/1 matrix.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-scale",
    title: "Scale",
    name: "GraphScale",
    description:
      "Labeled scale for contrast ratios, type sizes, or anything that needs a number and a short label.",
    registry: "graph-scale",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "items",
        type: "ScaleItem[]",
        description: "ratio, label, token, and optional accent.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-radii",
    title: "Radii",
    name: "GraphRadii",
    description:
      "Nested border radii. Inner radius equals outer minus padding.",
    registry: "graph-radii",
    dependencies: [],
    props: [
      {
        name: "title",
        type: "string",
        default: '"NESTED RADII"',
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "outer",
        type: "number",
        default: "16",
        description: "Outer corner radius in pixels.",
      },
      {
        name: "inset",
        type: "number",
        default: "4",
        description: "Padding between the two frames.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-meter",
    title: "Meter",
    name: "GraphMeter",
    description:
      "Progress bar drawn with = characters. Empty slots stay as dashes.",
    registry: "graph-meter",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "value",
        type: "number",
        description: "0 to 1.",
      },
      {
        name: "ticks",
        type: "number",
        default: "14",
        description: "Number of character slots.",
      },
      {
        name: "caption",
        type: "string",
        description: "Muted line under the meter.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-spark",
    title: "Spark",
    name: "GraphSpark",
    description:
      "Sparkline from block characters. Values scale to the highest point.",
    registry: "graph-spark",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "data",
        type: "number[]",
        description: "Relative values. Scaled to the max.",
      },
      {
        name: "caption",
        type: "string",
        description: "Muted line under the sparkline.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-tree",
    title: "Tree",
    name: "GraphTree",
    description:
      "Nested tree with branch glyphs. Accent a node to highlight it.",
    registry: "graph-tree",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "nodes",
        type: "TreeNode[]",
        description:
          "Nested nodes. Each may have label, meta, accent, and children.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-timeline",
    title: "Timeline",
    name: "GraphTimeline",
    description:
      "Vertical list of dates. Mark one row as current with the accent color.",
    registry: "graph-timeline",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "events",
        type: "TimelineEvent[]",
        description: "date, label, and optional state: done, now, or next.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-stack",
    title: "Stack",
    name: "GraphStack",
    description:
      "Stacked bar for parts of a whole. Different glyphs per segment instead of colors.",
    registry: "graph-stack",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "rows",
        type: "StackRow[]",
        description: "Each row has a label and labeled numeric segments.",
      },
      {
        name: "accent",
        type: "string",
        description:
          "Segment label to paint with the accent. Defaults to the first.",
      },
      {
        name: "ticks",
        type: "number",
        default: "24",
        description: "Bar width in characters.",
      },
      {
        name: "glyphs",
        type: "string[]",
        description: "Characters used per segment, in order.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-funnel",
    title: "Funnel",
    name: "GraphFunnel",
    description:
      "Steps get narrower as values drop. Percentages compare to the first step.",
    registry: "graph-funnel",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "steps",
        type: "FunnelStep[]",
        description: "label, value, and optional display string for the count.",
      },
      {
        name: "ticks",
        type: "number",
        default: "20",
        description: "Width of the first bar, in characters.",
      },
      {
        name: "stage",
        type: "string",
        description: "Step label to focus. Other rows recede.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-gantt",
    title: "Gantt",
    name: "GraphGantt",
    description:
      "Schedule chart. start and end are fractions from 0 to 1 along the track.",
    registry: "graph-gantt",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "items",
        type: "GanttItem[]",
        description:
          "label, start, end, optional complete (0–1 fill inside the bar).",
      },
      {
        name: "ticks",
        type: "string[]",
        description: "Labels under the track, spaced at the ends.",
      },
      {
        name: "columns",
        type: "number",
        default: "24",
        description: "Track width in characters.",
      },
      {
        name: "stage",
        type: "string",
        description: "Row label to focus. Other rows recede.",
      },
      {
        name: "progress",
        type: "number",
        description: "0–1 playhead. Draws ▾ on the track.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-plot",
    title: "Plot",
    name: "GraphPlot",
    description: "Line or area chart built from columns of block characters.",
    registry: "graph-plot",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "data",
        type: "number[]",
        description: "One value per column, left to right.",
      },
      {
        name: "labels",
        type: "string[]",
        description: "First and last labels under the axis.",
      },
      {
        name: "height",
        type: "number",
        default: "7",
        description: "Rows in the plot.",
      },
      {
        name: "variant",
        type: '"line" | "area"',
        default: '"area"',
        description: "Area fills down from the cap with ░.",
      },
      {
        name: "progress",
        type: "number",
        default: "1",
        description: "0–1. How many columns are revealed.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-waffle",
    title: "Waffle",
    name: "GraphWaffle",
    description: "Grid of 100 cells. The value sets how many are filled in.",
    registry: "graph-waffle",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "value",
        type: "number",
        description: "Share from 0 to 1.",
      },
      {
        name: "cells",
        type: "number",
        default: "100",
        description: "Total cells in the grid.",
      },
      {
        name: "columns",
        type: "number",
        default: "10",
        description: "Cells per row.",
      },
      {
        name: "caption",
        type: "string",
        description: "Muted line under the percent.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-diff",
    title: "Diff",
    name: "GraphDiff",
    description:
      "List with add, remove, and unchanged rows. Works for changelogs or bundle sizes.",
    registry: "graph-diff",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "rows",
        type: "DiffRow[]",
        description: "label, value, and optional sign: add, remove, or keep.",
      },
      {
        name: "footer",
        type: "DiffRow",
        description: "Total row under a rule.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-invoice",
    title: "Invoice",
    name: "GraphInvoice",
    description:
      "Document table for invoices and quotes. From, bill-to, line items, and a totals block.",
    registry: "graph-invoice",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "from",
        type: "InvoiceParty",
        description: "Issuer name and optional address lines.",
      },
      {
        name: "to",
        type: "InvoiceParty",
        description: "Recipient name and optional address lines.",
      },
      {
        name: "meta",
        type: "InvoiceMeta[]",
        description: "Fields like number, issued, due.",
      },
      {
        name: "items",
        type: "InvoiceItem[]",
        description:
          "Line items. qty and rate are optional; columns hide when unused.",
      },
      {
        name: "totals",
        type: "InvoiceTotal[]",
        description: "Rows under the items. Set accent on the amount due.",
      },
      {
        name: "note",
        type: "string",
        description: "Muted line under the totals. Payment terms, etc.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-compare",
    title: "Compare",
    name: "GraphCompare",
    description:
      "Feature matrix. Cells are text or true/false, drawn as ✓ and –.",
    registry: "graph-compare",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "columns",
        type: "string[]",
        description: "Option names across the top.",
      },
      {
        name: "rows",
        type: "CompareRow[]",
        description: "label plus one value per column. Booleans become ✓ or –.",
      },
      {
        name: "accent",
        type: "string",
        description: "Column name to highlight. Other columns recede.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-stat",
    title: "Stat",
    name: "GraphStat",
    description:
      "A row of large numbers with labels. Use it for KPIs, not as a chart.",
    registry: "graph-stat",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "items",
        type: "StatItem[]",
        description: "value, label, optional hint, optional accent.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-spec",
    title: "Spec",
    name: "GraphSpec",
    description:
      "Aligned label and value rows. Spec sheets, shipping labels, type samples.",
    registry: "graph-spec",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "rows",
        type: "SpecRow[]",
        description: "label, value, and optional accent.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-frame",
    title: "Frame",
    name: "Graph",
    description:
      "Dashed frame wrapper used by every graph. Compose with GraphTitle, GraphBody, GraphRule, and GraphArrow.",
    registry: "graph-frame",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Optional caption. Renders as [ TITLE ] on the top edge.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the figure.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Usually GraphBody.",
      },
    ],
  },
]

export function getComponent(slug: string) {
  return components.find((item) => item.slug === slug)
}
