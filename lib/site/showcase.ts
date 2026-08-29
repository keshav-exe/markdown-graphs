import { MDX_SLUGS, mdxExample } from "@/lib/docs/ascii"

export type ShowcaseItem = {
  slug: string
  title: string
  name: string
  description: string
  jsx: string
  markdown: string
}

const items: Omit<ShowcaseItem, "markdown">[] = [
  {
    slug: "graph-sheet",
    name: "GraphSheet",
    title: "Sheet",
    description:
      "Grouped table with section titles. RFCs, API surfaces, specs.",
    jsx: `import { GraphSheet } from "@/registry/default/graph-sheet/graph-sheet"

<GraphSheet
  title="RFC"
  headers={["Item", "Owner", "Status"]}
  align={["left", "left", "left"]}
  sections={[
    {
      title: "Scope",
      rows: [
        ["CLI copies files", "priya", "done"],
        ["Docs previews", "jon", "now"],
      ],
    },
    {
      title: "Out of scope",
      rows: [
        ["npm package", "—", "later"],
        ["Figma kit", "—", "later"],
      ],
    },
  ]}
/>`,
  },
  {
    slug: "graph-check",
    name: "GraphCheck",
    title: "Check",
    description: "Punch list. Done rows mark [x], the rest stay [ ].",
    jsx: `import { GraphCheck } from "@/registry/default/graph-check/graph-check"

<GraphCheck
  title="LAUNCH"
  items={[
    { label: "freeze tokens", done: true },
    { label: "ship registry json", done: true },
    { label: "write the postmortem", note: "still open" },
  ]}
/>`,
  },
  {
    slug: "graph-matrix",
    name: "GraphMatrix",
    title: "Matrix",
    description:
      "Exact numbers on both axes. Confusion matrices, latency by region.",
    jsx: `import { GraphMatrix } from "@/registry/default/graph-matrix/graph-matrix"

<GraphMatrix
  title="DETECT"
  columns={["Pos", "Neg"]}
  accent="Pos"
  rows={[
    { label: "Pos", values: [41, 3] },
    { label: "Neg", values: [2, 54] },
  ]}
/>`,
  },
  {
    slug: "graph-table",
    name: "GraphTable",
    title: "Table",
    description: "Data table with optional footer totals.",
    jsx: `import { GraphTable } from "@/registry/default/graph-table/graph-table"

<GraphTable
  title="WHAT THE RESEARCH COST"
  headers={["Agent", "Tokens", "Tool calls", "Time"]}
  align={["left", "right", "right", "right"]}
  rows={[
    ["Inks and paper", "115,207", "120", "16m"],
    ["Overprint and drift", "135,218", "164", "16m"],
    ["Naming the patterns", "186,716", "112", "18m"],
  ]}
  footer={["Total", "437,141", "396", "~50m"]}
/>`,
  },
  {
    slug: "graph-waterfall",
    name: "GraphWaterfall",
    title: "Waterfall",
    description: "Running total as floating bars.",
    jsx: `import { GraphWaterfall } from "@/registry/default/graph-waterfall/graph-waterfall"

<GraphWaterfall
  title="MARGIN"
  items={[
    { label: "Revenue", value: 48 },
    { label: "Refunds", value: -6 },
    { label: "Hosting", value: -4 },
    { label: "Profit", value: 38 },
  ]}
/>`,
  },
  {
    slug: "graph-timeline",
    name: "GraphTimeline",
    title: "Timeline",
    description: "Steps in order. One row marked current.",
    jsx: `import { GraphTimeline } from "@/registry/default/graph-timeline/graph-timeline"

<GraphTimeline
  title="SHIPPED"
  events={[
    { date: "Mar 12", label: "CLI copies the files" },
    { date: "Mar 18", label: "Docs, live previews", state: "now" },
    { date: "Apr 02", label: "Registry listed", state: "next" },
  ]}
/>`,
  },
  {
    slug: "graph-compare",
    name: "GraphCompare",
    title: "Compare",
    description: "Feature matrix. Booleans become ✓ and –.",
    jsx: `import { GraphCompare } from "@/registry/default/graph-compare/graph-compare"

<GraphCompare
  title="PLANS"
  columns={["Solo", "Studio"]}
  rows={[
    { label: "Registry", values: [true, true] },
    { label: "Accent picker", values: [true, true] },
    { label: "Private source", values: [false, true] },
    { label: "Price", values: ["$0", "$24"] },
  ]}
/>`,
  },
  {
    slug: "graph-kpi",
    name: "GraphKpi",
    title: "KPI",
    description: "One headline number with a sparkline underneath.",
    jsx: `import { GraphKpi } from "@/registry/default/graph-kpi/graph-kpi"

<GraphKpi
  title="READS"
  value="12,400"
  label="this week"
  hint="+18%"
  data={[4, 5, 5, 6, 8, 7, 9, 8, 11, 10, 12, 14]}
/>`,
  },
  {
    slug: "graph-stat",
    name: "GraphStat",
    title: "Stat",
    description: "Two to four large numbers with labels.",
    jsx: `import { GraphStat } from "@/registry/default/graph-stat/graph-stat"

<GraphStat
  title="THIS WEEK"
  items={[
    { value: "12,400", label: "docs" },
    { value: "4,100", label: "copies" },
    { value: "860", label: "shipped", accent: true },
  ]}
/>`,
  },
]

export const showcaseCount = MDX_SLUGS.length

export const showcaseLayout = {
  full: "graph-table",
  pairs: [
    ["graph-sheet", "graph-check"],
    ["graph-waterfall", "graph-timeline"],
    ["graph-compare", "graph-matrix"],
    ["graph-kpi", "graph-stat"],
  ],
} as const

export const showcaseItems: ShowcaseItem[] = items.map((item) => {
  const mdx = mdxExample(item.slug)

  return {
    ...item,
    markdown: mdx?.markdown ?? "",
  }
})

export function getShowcaseItem(slug: string) {
  return showcaseItems.find((item) => item.slug === slug)
}
