import type { ReactNode } from "react"

import { ComponentPreview } from "@/components/docs/preview"
import {
  Graph,
  GraphActivity,
  GraphBars,
  GraphBody,
  GraphBullet,
  GraphCalendar,
  GraphCells,
  GraphCompare,
  GraphCountdown,
  GraphDiff,
  GraphFlow,
  GraphFunnel,
  GraphGantt,
  GraphHeatmap,
  GraphInvoice,
  GraphKpi,
  GraphMeter,
  GraphPlot,
  GraphRank,
  GraphRule,
  GraphSlope,
  GraphSpark,
  GraphSpec,
  GraphStack,
  GraphStat,
  GraphTable,
  GraphTimeline,
  GraphTimer,
  GraphTree,
  GraphUptime,
  GraphWaffle,
  GraphWaterfall,
} from "@/components/graphs"

type Example = {
  title: string
  description?: string
  code: string
  preview: ReactNode
}

function Examples({ items }: { items: Example[] }) {
  return (
    <div className="flex flex-col gap-16">
      {items.map((item) => (
        <ComponentPreview
          code={item.code}
          description={item.description}
          key={item.title}
          title={item.title}
        >
          {item.preview}
        </ComponentPreview>
      ))}
    </div>
  )
}

const tableExamples: Example[] = [
  {
    title: "Research cost",
    description: "Numeric columns, right-aligned, with a footer total.",
    code: `import { GraphTable } from "@/registry/default/graph-table/graph-table"

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
    preview: (
      <GraphTable
        align={["left", "right", "right", "right"]}
        footer={["Total", "437,141", "396", "~50m"]}
        headers={["Agent", "Tokens", "Tool calls", "Time"]}
        rows={[
          ["Inks and paper", "115,207", "120", "16m"],
          ["Overprint and drift", "135,218", "164", "16m"],
          ["Naming the patterns", "186,716", "112", "18m"],
        ]}
        title="WHAT THE RESEARCH COST"
      />
    ),
  },
  {
    title: "Taste, explained",
    description: "Two copy columns. No footer.",
    code: `import { GraphTable } from "@/registry/default/graph-table/graph-table"

<GraphTable
  title="TASTE, EXPLAINED"
  headers={["Decision", "Reason"]}
  align={["left", "left"]}
  rows={[
    ["ease-out on enter", "feels snappier"],
    ["180ms, not 400ms", "feels faster, more responsive"],
    ["springs for gestures", "they carry your momentum"],
    ["scale 0.97 on press", "it makes the UI feel alive"],
    ["no animation at all", "you open it hundreds of times"],
  ]}
/>`,
    preview: (
      <GraphTable
        align={["left", "left"]}
        headers={["Decision", "Reason"]}
        rows={[
          ["ease-out on enter", "feels snappier"],
          ["180ms, not 400ms", "feels faster, more responsive"],
          ["springs for gestures", "they carry your momentum"],
          ["scale 0.97 on press", "it makes the UI feel alive"],
          ["no animation at all", "you open it hundreds of times"],
        ]}
        title="TASTE, EXPLAINED"
      />
    ),
  },
]

const flowExamples: Example[] = [
  {
    title: "Optimistic UI",
    description:
      "Highlight the node that updates on tap. Mute the server sync step.",
    code: `import { GraphFlow } from "@/registry/default/graph-flow/graph-flow"

<GraphFlow
  title="OPTIMISTIC UI"
  rows={[
    {
      nodes: [
        { label: "tap" },
        { label: "server" },
        { label: "update" },
      ],
    },
    {
      nodes: [
        { label: "tap" },
        { label: "update", tone: "accent" },
        { label: "server syncs", stretch: true, tone: "muted" },
      ],
    },
  ]}
/>`,
    preview: (
      <GraphFlow
        rows={[
          {
            nodes: [{ label: "tap" }, { label: "server" }, { label: "update" }],
          },
          {
            nodes: [
              { label: "tap" },
              { label: "update", tone: "accent" },
              { label: "server syncs", stretch: true, tone: "muted" },
            ],
          },
        ]}
        title="OPTIMISTIC UI"
      />
    ),
  },
  {
    title: "Publish path",
    description: "A linear pipeline. Every node is default tone.",
    code: `import { GraphFlow } from "@/registry/default/graph-flow/graph-flow"

<GraphFlow
  title="PUBLISH PATH"
  rows={[
    {
      nodes: [
        { label: "write" },
        { label: "review" },
        { label: "ship" },
      ],
    },
  ]}
/>`,
    preview: (
      <GraphFlow
        rows={[
          {
            nodes: [{ label: "write" }, { label: "review" }, { label: "ship" }],
          },
        ]}
        title="PUBLISH PATH"
      />
    ),
  },
]

const barsExamples: Example[] = [
  {
    title: "Before / after",
    description:
      "Same shape on both sides. After uses the accent. Before uses the second hue.",
    code: `import { GraphBars } from "@/registry/default/graph-bars/graph-bars"

<GraphBars
  title="THROUGHPUT"
  palette="duo"
  from={{ label: "before", values: [2, 4, 3, 5, 2] }}
  to={{ label: "after", size: "lg", values: [2, 4, 3, 5, 2] }}
/>`,
    preview: (
      <GraphBars
        from={{ label: "before", values: [2, 4, 3, 5, 2] }}
        palette="duo"
        title="THROUGHPUT"
        to={{ label: "after", size: "lg", values: [2, 4, 3, 5, 2] }}
      />
    ),
  },
  {
    title: "Draft to shipped",
    description: "Different values. Processor label is custom.",
    code: `import { GraphBars } from "@/registry/default/graph-bars/graph-bars"

<GraphBars
  title="DRAFT TO SHIPPED"
  processor="edit"
  from={{ label: "draft", values: [1, 2, 2, 3, 1] }}
  to={{ label: "shipped", size: "lg", values: [3, 5, 4, 6, 5] }}
/>`,
    preview: (
      <GraphBars
        from={{ label: "draft", values: [1, 2, 2, 3, 1] }}
        processor="edit"
        title="DRAFT TO SHIPPED"
        to={{ label: "shipped", size: "lg", values: [3, 5, 4, 6, 5] }}
      />
    ),
  },
]

const rankExamples: Example[] = [
  {
    title: "Routes",
    description: "Pages ordered by visits. The longest bar is the busiest.",
    code: `import { GraphRank } from "@/registry/default/graph-rank/graph-rank"

<GraphRank
  title="ROUTES"
  items={[
    { label: "/docs", value: 12400 },
    { label: "/install", value: 4100 },
    { label: "/plot", value: 860 },
    { label: "/rank", value: 420 },
  ]}
/>`,
    preview: (
      <GraphRank
        items={[
          { label: "/docs", value: 12400 },
          { label: "/install", value: 4100 },
          { label: "/plot", value: 860 },
          { label: "/rank", value: 420 },
        ]}
        title="ROUTES"
      />
    ),
  },
  {
    title: "Coverage",
    description: "Every bar uses the same scale, so the percents line up.",
    code: `import { GraphRank } from "@/registry/default/graph-rank/graph-rank"

<GraphRank
  title="COVERAGE"
  max={100}
  items={[
    { label: "frame", value: 100, display: "100%" },
    { label: "plot", value: 82, display: "82%" },
    { label: "invoice", value: 41, display: "41%" },
  ]}
/>`,
    preview: (
      <GraphRank
        items={[
          { label: "frame", value: 100, display: "100%" },
          { label: "plot", value: 82, display: "82%" },
          { label: "invoice", value: 41, display: "41%" },
        ]}
        max={100}
        title="COVERAGE"
      />
    ),
  },
]

const cellsExamples: Example[] = [
  {
    title: "Two ways to learn",
    description: "Sparse fragments versus a filled grid.",
    code: `import { GraphCells } from "@/registry/default/graph-cells/graph-cells"

<GraphCells
  title="TWO WAYS TO LEARN"
  items={[
    {
      label: "fragments",
      cells: [
        [1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
      ],
    },
    {
      label: "a system",
      cells: [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
      ],
    },
  ]}
/>`,
    preview: (
      <GraphCells
        items={[
          {
            label: "fragments",
            cells: [
              [1, 0, 1, 0, 0],
              [0, 1, 0, 1, 0],
              [1, 0, 0, 0, 1],
            ],
          },
          {
            label: "a system",
            cells: [
              [1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1],
            ],
          },
        ]}
        title="TWO WAYS TO LEARN"
      />
    ),
  },
  {
    title: "Coverage",
    description: "A single grid. Empty cells stay as the quiet glyph.",
    code: `import { GraphCells } from "@/registry/default/graph-cells/graph-cells"

<GraphCells
  title="COVERAGE"
  items={[
    {
      label: "this week",
      cells: [
        [1, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [1, 0, 1, 1, 1],
      ],
    },
  ]}
/>`,
    preview: (
      <GraphCells
        items={[
          {
            label: "this week",
            cells: [
              [1, 1, 1, 1, 0],
              [1, 1, 0, 1, 1],
              [1, 0, 1, 1, 1],
            ],
          },
        ]}
        title="COVERAGE"
      />
    ),
  },
]

const meterExamples: Example[] = [
  {
    title: "Shipped",
    description: "Dashes stay empty until the fill animates in.",
    code: `import { GraphMeter } from "@/registry/default/graph-meter/graph-meter"

<GraphMeter
  title="SHIPPED"
  value={0.67}
  caption="characters, not a progress bar"
/>`,
    preview: (
      <GraphMeter
        caption="characters, not a progress bar"
        title="SHIPPED"
        value={0.67}
      />
    ),
  },
  {
    title: "Coverage",
    description: "Fewer ticks. Tighter meter.",
    code: `import { GraphMeter } from "@/registry/default/graph-meter/graph-meter"

<GraphMeter title="COVERAGE" value={0.92} ticks={10} caption="tests passing" />`,
    preview: (
      <GraphMeter
        caption="tests passing"
        ticks={10}
        title="COVERAGE"
        value={0.92}
      />
    ),
  },
]

const sparkExamples: Example[] = [
  {
    title: "Latency",
    description: "Highlight the latest value. Earlier points are muted.",
    code: `import { GraphSpark } from "@/registry/default/graph-spark/graph-spark"

<GraphSpark
  title="LATENCY"
  data={[2, 3, 4, 3, 6, 5, 8, 7, 9, 6, 10, 8]}
  caption="last point is the accent"
/>`,
    preview: (
      <GraphSpark
        caption="last point is the accent"
        data={[2, 3, 4, 3, 6, 5, 8, 7, 9, 6, 10, 8]}
        title="LATENCY"
      />
    ),
  },
  {
    title: "Requests",
    description: "A quieter series.",
    code: `import { GraphSpark } from "@/registry/default/graph-spark/graph-spark"

<GraphSpark
  title="REQUESTS"
  data={[4, 4, 5, 3, 6, 8, 7, 9, 8, 6, 5, 7]}
  caption="last twelve deploys"
/>`,
    preview: (
      <GraphSpark
        caption="last twelve deploys"
        data={[4, 4, 5, 3, 6, 8, 7, 9, 8, 6, 5, 7]}
        title="REQUESTS"
      />
    ),
  },
]

const treeExamples: Example[] = [
  {
    title: "Registry",
    description: "Nested nodes. Accent the file you care about.",
    code: `import { GraphTree } from "@/registry/default/graph-tree/graph-tree"

<GraphTree
  title="REGISTRY"
  nodes={[
    {
      label: "registry/default",
      children: [
        {
          label: "graph-frame",
          children: [
            { label: "graph-frame.tsx", meta: "ui" },
            { label: "graph-motion.ts", meta: "lib" },
          ],
        },
        {
          label: "graph-tree",
          children: [
            { label: "graph-tree.tsx", meta: "ui", accent: true },
          ],
        },
      ],
    },
  ]}
/>`,
    preview: (
      <GraphTree
        nodes={[
          {
            label: "registry/default",
            children: [
              {
                label: "graph-frame",
                children: [
                  { label: "graph-frame.tsx", meta: "ui" },
                  { label: "graph-motion.ts", meta: "lib" },
                ],
              },
              {
                label: "graph-tree",
                children: [
                  { label: "graph-tree.tsx", meta: "ui", accent: true },
                ],
              },
            ],
          },
        ]}
        title="REGISTRY"
      />
    ),
  },
  {
    title: "Team",
    description: "Same component. Org chart, not a filesystem.",
    code: `import { GraphTree } from "@/registry/default/graph-tree/graph-tree"

<GraphTree
  title="ON CALL"
  nodes={[
    {
      label: "platform",
      children: [
        { label: "api", meta: "priya" },
        { label: "workers", meta: "jon", accent: true },
        { label: "edge", meta: "mina" },
      ],
    },
  ]}
/>`,
    preview: (
      <GraphTree
        nodes={[
          {
            label: "platform",
            children: [
              { label: "api", meta: "priya" },
              { label: "workers", meta: "jon", accent: true },
              { label: "edge", meta: "mina" },
            ],
          },
        ]}
        title="ON CALL"
      />
    ),
  },
]

const timelineExamples: Example[] = [
  {
    title: "Shipped",
    description:
      "The current row uses the accent. Upcoming rows stay outline-only.",
    code: `import { GraphTimeline } from "@/registry/default/graph-timeline/graph-timeline"

<GraphTimeline
  title="SHIPPED"
  events={[
    { date: "Mar 12", label: "CLI copies the files" },
    { date: "Mar 18", label: "Docs, live previews", state: "now" },
    { date: "Apr 02", label: "Registry listed", state: "next" },
  ]}
/>`,
    preview: (
      <GraphTimeline
        events={[
          { date: "Mar 12", label: "CLI copies the files" },
          { date: "Mar 18", label: "Docs, live previews", state: "now" },
          { date: "Apr 02", label: "Registry listed", state: "next" },
        ]}
        title="SHIPPED"
      />
    ),
  },
  {
    title: "Incident",
    description: "Three events with the rollback marked as current.",
    code: `import { GraphTimeline } from "@/registry/default/graph-timeline/graph-timeline"

<GraphTimeline
  title="INCIDENT"
  events={[
    { date: "14:02", label: "p95 crossed 800ms" },
    { date: "14:11", label: "rolled back the cache flag", state: "now" },
    { date: "14:40", label: "write the postmortem", state: "next" },
  ]}
/>`,
    preview: (
      <GraphTimeline
        events={[
          { date: "14:02", label: "p95 crossed 800ms" },
          {
            date: "14:11",
            label: "rolled back the cache flag",
            state: "now",
          },
          { date: "14:40", label: "write the postmortem", state: "next" },
        ]}
        title="INCIDENT"
      />
    ),
  },
]

const stackExamples: Example[] = [
  {
    title: "Bundle",
    description:
      "palette multi paints each segment. js, css, and images each get a hue.",
    code: `import { GraphStack } from "@/registry/default/graph-stack/graph-stack"

<GraphStack
  title="BUNDLE"
  palette="multi"
  rows={[
    {
      label: "marketing",
      segments: [
        { label: "js", value: 48 },
        { label: "css", value: 22 },
        { label: "images", value: 30 },
      ],
    },
    {
      label: "docs",
      segments: [
        { label: "js", value: 28 },
        { label: "css", value: 18 },
        { label: "images", value: 54 },
      ],
    },
  ]}
/>`,
    preview: (
      <GraphStack
        palette="multi"
        rows={[
          {
            label: "marketing",
            segments: [
              { label: "js", value: 48 },
              { label: "css", value: 22 },
              { label: "images", value: 30 },
            ],
          },
          {
            label: "docs",
            segments: [
              { label: "js", value: 28 },
              { label: "css", value: 18 },
              { label: "images", value: 54 },
            ],
          },
        ]}
        title="BUNDLE"
      />
    ),
  },
  {
    title: "Tokens",
    description: "Single row showing how token usage splits.",
    code: `import { GraphStack } from "@/registry/default/graph-stack/graph-stack"

<GraphStack
  title="TOKENS"
  ticks={28}
  rows={[
    {
      label: "week",
      segments: [
        { label: "prompt", value: 61 },
        { label: "completion", value: 27 },
        { label: "cached", value: 12 },
      ],
    },
  ]}
/>`,
    preview: (
      <GraphStack
        rows={[
          {
            label: "week",
            segments: [
              { label: "prompt", value: 61 },
              { label: "completion", value: 27 },
              { label: "cached", value: 12 },
            ],
          },
        ]}
        ticks={28}
        title="TOKENS"
      />
    ),
  },
]

const funnelExamples: Example[] = [
  {
    title: "Install",
    description:
      "Percentages compare to the first step. stage dims the other rows.",
    code: `import { GraphFunnel } from "@/registry/default/graph-funnel/graph-funnel"

<GraphFunnel
  title="INSTALL"
  stage="ship"
  steps={[
    { label: "docs", value: 12400, display: "12,400" },
    { label: "copy", value: 4100, display: "4,100" },
    { label: "ship", value: 860, display: "860" },
  ]}
/>`,
    preview: (
      <GraphFunnel
        stage="ship"
        steps={[
          { label: "docs", value: 12400, display: "12,400" },
          { label: "copy", value: 4100, display: "4,100" },
          { label: "ship", value: 860, display: "860" },
        ]}
        title="INSTALL"
      />
    ),
  },
  {
    title: "Signup",
    description: "Shorter bar width. Same percentage logic.",
    code: `import { GraphFunnel } from "@/registry/default/graph-funnel/graph-funnel"

<GraphFunnel
  title="SIGNUP"
  ticks={16}
  steps={[
    { label: "visit", value: 8000, display: "8,000" },
    { label: "start", value: 2400, display: "2,400" },
    { label: "verify", value: 960, display: "960" },
    { label: "paid", value: 180, display: "180" },
  ]}
/>`,
    preview: (
      <GraphFunnel
        steps={[
          { label: "visit", value: 8000, display: "8,000" },
          { label: "start", value: 2400, display: "2,400" },
          { label: "verify", value: 960, display: "960" },
          { label: "paid", value: 180, display: "180" },
        ]}
        ticks={16}
        title="SIGNUP"
      />
    ),
  },
]

const ganttExamples: Example[] = [
  {
    title: "Launch",
    description:
      "complete sets bar fill. progress marks the current date on the track.",
    code: `import { GraphGantt } from "@/registry/default/graph-gantt/graph-gantt"

<GraphGantt
  title="LAUNCH"
  stage="build"
  progress={0.58}
  ticks={["q1", "q2", "q3", "q4"]}
  items={[
    { label: "design", start: 0, end: 0.35, complete: 1 },
    { label: "build", start: 0.2, end: 0.75, complete: 0.55 },
    { label: "docs", start: 0.55, end: 0.9, complete: 0.2 },
    { label: "ship", start: 0.85, end: 1, complete: 0 },
  ]}
/>`,
    preview: (
      <GraphGantt
        items={[
          { label: "design", start: 0, end: 0.35, complete: 1 },
          { label: "build", start: 0.2, end: 0.75, complete: 0.55 },
          { label: "docs", start: 0.55, end: 0.9, complete: 0.2 },
          { label: "ship", start: 0.85, end: 1, complete: 0 },
        ]}
        progress={0.58}
        stage="build"
        ticks={["q1", "q2", "q3", "q4"]}
        title="LAUNCH"
      />
    ),
  },
  {
    title: "Week",
    description: "A denser track. Same API.",
    code: `import { GraphGantt } from "@/registry/default/graph-gantt/graph-gantt"

<GraphGantt
  title="THIS WEEK"
  columns={20}
  ticks={["mon", "wed", "fri"]}
  items={[
    { label: "rfc", start: 0, end: 0.4, accent: true },
    { label: "patch", start: 0.35, end: 0.8 },
    { label: "review", start: 0.7, end: 1 },
  ]}
/>`,
    preview: (
      <GraphGantt
        columns={20}
        items={[
          { label: "rfc", start: 0, end: 0.4, accent: true },
          { label: "patch", start: 0.35, end: 0.8 },
          { label: "review", start: 0.7, end: 1 },
        ]}
        ticks={["mon", "wed", "fri"]}
        title="THIS WEEK"
      />
    ),
  },
]

const plotExamples: Example[] = [
  {
    title: "p95",
    description: "Last cap is the live point.",
    code: `import { GraphPlot } from "@/registry/default/graph-plot/graph-plot"

<GraphPlot
  title="P95"
  data={[2, 3, 3, 5, 4, 7, 6, 8, 5, 9, 7, 6]}
  labels={["jan", "dec"]}
/>`,
    preview: (
      <GraphPlot
        data={[2, 3, 3, 5, 4, 7, 6, 8, 5, 9, 7, 6]}
        labels={["jan", "dec"]}
        title="P95"
      />
    ),
  },
  {
    title: "Errors",
    description: "Line only. progress reveals a prefix.",
    code: `import { GraphPlot } from "@/registry/default/graph-plot/graph-plot"

<GraphPlot
  title="ERRORS"
  variant="line"
  height={5}
  progress={0.7}
  data={[1, 1, 4, 2, 8, 3, 2, 1, 5, 2]}
  labels={["mon", "fri"]}
/>`,
    preview: (
      <GraphPlot
        data={[1, 1, 4, 2, 8, 3, 2, 1, 5, 2]}
        height={5}
        labels={["mon", "fri"]}
        progress={0.7}
        title="ERRORS"
        variant="line"
      />
    ),
  },
]

const waffleExamples: Example[] = [
  {
    title: "Coverage",
    description: "One hundred cells. Value is how many are lit.",
    code: `import { GraphWaffle } from "@/registry/default/graph-waffle/graph-waffle"

<GraphWaffle
  title="COVERAGE"
  value={0.73}
  caption="73 of 100 tests green"
/>`,
    preview: (
      <GraphWaffle
        caption="73 of 100 tests green"
        title="COVERAGE"
        value={0.73}
      />
    ),
  },
  {
    title: "Quota",
    description: "Fewer cells. Same 0–1 value.",
    code: `import { GraphWaffle } from "@/registry/default/graph-waffle/graph-waffle"

<GraphWaffle
  title="QUOTA"
  value={0.4}
  cells={40}
  columns={8}
  caption="seats used"
/>`,
    preview: (
      <GraphWaffle
        caption="seats used"
        cells={40}
        columns={8}
        title="QUOTA"
        value={0.4}
      />
    ),
  },
]

const diffExamples: Example[] = [
  {
    title: "Bundle",
    description:
      "Adds use the accent. Removes use the second hue. Footer is the total.",
    code: `import { GraphDiff } from "@/registry/default/graph-diff/graph-diff"

<GraphDiff
  title="BUNDLE"
  palette="duo"
  rows={[
    { label: "vendor", value: "84 kb" },
    { label: "app", value: "31 kb", sign: "add" },
    { label: "sourcemaps", value: "12 kb", sign: "remove" },
  ]}
  footer={{ label: "shipped", value: "103 kb" }}
/>`,
    preview: (
      <GraphDiff
        footer={{ label: "shipped", value: "103 kb" }}
        palette="duo"
        rows={[
          { label: "vendor", value: "84 kb" },
          { label: "app", value: "31 kb", sign: "add" },
          { label: "sourcemaps", value: "12 kb", sign: "remove" },
        ]}
        title="BUNDLE"
      />
    ),
  },
  {
    title: "Headcount",
    description: "Running total with hire and leave rows.",
    code: `import { GraphDiff } from "@/registry/default/graph-diff/graph-diff"

<GraphDiff
  title="HEADCOUNT"
  rows={[
    { label: "start", value: "12" },
    { label: "hired", value: "3", sign: "add" },
    { label: "left", value: "1", sign: "remove" },
  ]}
  footer={{ label: "now", value: "14" }}
/>`,
    preview: (
      <GraphDiff
        footer={{ label: "now", value: "14" }}
        rows={[
          { label: "start", value: "12" },
          { label: "hired", value: "3", sign: "add" },
          { label: "left", value: "1", sign: "remove" },
        ]}
        title="HEADCOUNT"
      />
    ),
  },
]

const invoiceExamples: Example[] = [
  {
    title: "Studio invoice",
    description:
      "From, bill-to, line items with qty and rate, total in accent.",
    code: `import { GraphInvoice } from "@/registry/default/graph-invoice/graph-invoice"

<GraphInvoice
  title="INVOICE 0041"
  from={{
    name: "markdown graphs",
    lines: ["kshv.me", "GSTIN 29AXXXXX1234Z5"],
  }}
  to={{
    name: "Acme Studio",
    lines: ["14 Market Street", "San Francisco, CA"],
  }}
  meta={[
    { label: "No.", value: "0041" },
    { label: "Issued", value: "Mar 12, 2026" },
    { label: "Due", value: "Apr 11, 2026" },
  ]}
  items={[
    { description: "Design system", qty: "1", rate: "4,200", amount: "4,200" },
    { description: "Motion pass", qty: "1", rate: "1,800", amount: "1,800" },
    { description: "Docs rewrite", qty: "8h", rate: "180", amount: "1,440" },
  ]}
  totals={[
    { label: "Subtotal", value: "7,440" },
    { label: "Tax", value: "0" },
    { label: "Amount due", value: "7,440", accent: true },
  ]}
  note="Net 30. Wire to the account on file."
/>`,
    preview: (
      <GraphInvoice
        from={{
          name: "markdown graphs",
          lines: ["kshv.me", "GSTIN 29AXXXXX1234Z5"],
        }}
        items={[
          {
            description: "Design system",
            qty: "1",
            rate: "4,200",
            amount: "4,200",
          },
          {
            description: "Motion pass",
            qty: "1",
            rate: "1,800",
            amount: "1,800",
          },
          {
            description: "Docs rewrite",
            qty: "8h",
            rate: "180",
            amount: "1,440",
          },
        ]}
        meta={[
          { label: "No.", value: "0041" },
          { label: "Issued", value: "Mar 12, 2026" },
          { label: "Due", value: "Apr 11, 2026" },
        ]}
        note="Net 30. Wire to the account on file."
        title="INVOICE 0041"
        to={{
          name: "Acme Studio",
          lines: ["14 Market Street", "San Francisco, CA"],
        }}
        totals={[
          { label: "Subtotal", value: "7,440" },
          { label: "Tax", value: "0" },
          { label: "Amount due", value: "7,440", accent: true },
        ]}
      />
    ),
  },
  {
    title: "Quote",
    description: "No qty or rate columns. Just description and amount.",
    code: `import { GraphInvoice } from "@/registry/default/graph-invoice/graph-invoice"

<GraphInvoice
  title="QUOTE"
  from={{ name: "markdown graphs" }}
  to={{ name: "Northwind" }}
  meta={[{ label: "Valid until", value: "May 01" }]}
  items={[
    { description: "Registry install", amount: "0" },
    { description: "Custom graph", amount: "2,400" },
  ]}
  totals={[{ label: "Estimate", value: "2,400", accent: true }]}
/>`,
    preview: (
      <GraphInvoice
        from={{ name: "markdown graphs" }}
        items={[
          { description: "Registry install", amount: "0" },
          { description: "Custom graph", amount: "2,400" },
        ]}
        meta={[{ label: "Valid until", value: "May 01" }]}
        title="QUOTE"
        to={{ name: "Northwind" }}
        totals={[{ label: "Estimate", value: "2,400", accent: true }]}
      />
    ),
  },
]

const compareExamples: Example[] = [
  {
    title: "Plans",
    description:
      "Booleans become checkmarks. Studio is the highlighted column.",
    code: `import { GraphCompare } from "@/registry/default/graph-compare/graph-compare"

<GraphCompare
  title="PLANS"
  columns={["Solo", "Studio"]}
  accent="Studio"
  rows={[
    { label: "Registry", values: [true, true] },
    { label: "Accent picker", values: [true, true] },
    { label: "Private source", values: [false, true] },
    { label: "Price", values: ["$0", "$24"] },
  ]}
/>`,
    preview: (
      <GraphCompare
        accent="Studio"
        columns={["Solo", "Studio"]}
        rows={[
          { label: "Registry", values: [true, true] },
          { label: "Accent picker", values: [true, true] },
          { label: "Private source", values: [false, true] },
          { label: "Price", values: ["$0", "$24"] },
        ]}
        title="PLANS"
      />
    ),
  },
  {
    title: "Before after",
    description: "Three columns. Text cells stay as text.",
    code: `import { GraphCompare } from "@/registry/default/graph-compare/graph-compare"

<GraphCompare
  title="RENDER"
  columns={["Mermaid", "SVG", "This"]}
  accent="This"
  rows={[
    { label: "Source", values: [".md", ".svg", ".tsx"] },
    { label: "In git", values: [true, false, true] },
    { label: "Themable", values: [false, false, true] },
  ]}
/>`,
    preview: (
      <GraphCompare
        accent="This"
        columns={["Mermaid", "SVG", "This"]}
        rows={[
          { label: "Source", values: [".md", ".svg", ".tsx"] },
          { label: "In git", values: [true, false, true] },
          { label: "Themable", values: [false, false, true] },
        ]}
        title="RENDER"
      />
    ),
  },
]

const statExamples: Example[] = [
  {
    title: "This week",
    description: "Three large figures. The last number is the accent.",
    code: `import { GraphStat } from "@/registry/default/graph-stat/graph-stat"

<GraphStat
  title="THIS WEEK"
  items={[
    { value: "12,400", label: "docs" },
    { value: "4,100", label: "copies" },
    { value: "860", label: "shipped", accent: true },
  ]}
/>`,
    preview: (
      <GraphStat
        items={[
          { value: "12,400", label: "docs" },
          { value: "4,100", label: "copies" },
          { value: "860", label: "shipped", accent: true },
        ]}
        title="THIS WEEK"
      />
    ),
  },
  {
    title: "Latency",
    description: "Hint sits under the label in the frame color.",
    code: `import { GraphStat } from "@/registry/default/graph-stat/graph-stat"

<GraphStat
  title="P95"
  items={[
    { value: "142ms", label: "read", hint: "−18ms" },
    { value: "410ms", label: "write", hint: "+22ms", accent: true },
  ]}
/>`,
    preview: (
      <GraphStat
        items={[
          { value: "142ms", label: "read", hint: "−18ms" },
          { value: "410ms", label: "write", hint: "+22ms", accent: true },
        ]}
        title="P95"
      />
    ),
  },
]

const kpiExamples: Example[] = [
  {
    title: "Reads",
    description:
      "The number is the headline. The spark is the last twelve points.",
    code: `import { GraphKpi } from "@/registry/default/graph-kpi/graph-kpi"

<GraphKpi
  title="READS"
  value="12,400"
  label="this week"
  hint="+18%"
  data={[4, 5, 5, 6, 8, 7, 9, 8, 11, 10, 12, 14]}
/>`,
    preview: (
      <GraphKpi
        data={[4, 5, 5, 6, 8, 7, 9, 8, 11, 10, 12, 14]}
        hint="+18%"
        label="this week"
        title="READS"
        value="12,400"
      />
    ),
  },
  {
    title: "Latency",
    description: "A latency number with a falling series.",
    code: `import { GraphKpi } from "@/registry/default/graph-kpi/graph-kpi"

<GraphKpi
  title="P95"
  value="142ms"
  label="read"
  hint="−18ms"
  data={[8, 7, 9, 6, 5, 7, 4, 5, 3, 4, 3, 2]}
/>`,
    preview: (
      <GraphKpi
        data={[8, 7, 9, 6, 5, 7, 4, 5, 3, 4, 3, 2]}
        hint="−18ms"
        label="read"
        title="P95"
        value="142ms"
      />
    ),
  },
]

const specExamples: Example[] = [
  {
    title: "Type",
    description: "Label column, value column. Accent the token that matters.",
    code: `import { GraphSpec } from "@/registry/default/graph-spec/graph-spec"

<GraphSpec
  title="TYPE"
  rows={[
    { label: "Family", value: "Geist Mono" },
    { label: "Size", value: "14 / 21" },
    { label: "Tracking", value: "+0.02em" },
    { label: "Figures", value: "tabular" },
    { label: "Accent", value: "--graph-accent", accent: true },
    { label: "Duo", value: "--graph-accent-2" },
    { label: "Tri", value: "--graph-accent-3" },
  ]}
/>`,
    preview: (
      <GraphSpec
        rows={[
          { label: "Family", value: "Geist Mono" },
          { label: "Size", value: "14 / 21" },
          { label: "Tracking", value: "+0.02em" },
          { label: "Figures", value: "tabular" },
          { label: "Accent", value: "--graph-accent", accent: true },
          { label: "Duo", value: "--graph-accent-2" },
          { label: "Tri", value: "--graph-accent-3" },
        ]}
        title="TYPE"
      />
    ),
  },
  {
    title: "Ship to",
    description: "Same layout as a packing slip.",
    code: `import { GraphSpec } from "@/registry/default/graph-spec/graph-spec"

<GraphSpec
  title="SHIP TO"
  rows={[
    { label: "Name", value: "A. Rao" },
    { label: "City", value: "Bengaluru" },
    { label: "Carrier", value: "Delhivery" },
    { label: "ETA", value: "Thu", accent: true },
  ]}
/>`,
    preview: (
      <GraphSpec
        rows={[
          { label: "Name", value: "A. Rao" },
          { label: "City", value: "Bengaluru" },
          { label: "Carrier", value: "Delhivery" },
          { label: "ETA", value: "Thu", accent: true },
        ]}
        title="SHIP TO"
      />
    ),
  },
]

function activityDays(start: string, length: number) {
  const [year, month, day] = start.split("-").map(Number)
  const origin = Date.UTC(year, (month ?? 1) - 1, day)
  return Array.from({ length }, (_, index) => {
    const time = origin + index * 86_400_000
    const date = new Date(time).toISOString().slice(0, 10)
    const dow = new Date(time).getUTCDay()
    const week = Math.floor(index / 7)
    let count = 0
    if (dow > 0 && dow < 6) {
      const pulse = (week + dow) % 9
      count =
        pulse === 0
          ? 12
          : pulse === 4
            ? 7
            : pulse % 3 === 0
              ? 3
              : index % 5 === 0
                ? 1
                : 0
    } else if (index % 13 === 0) {
      count = 2
    }
    return { date, count }
  })
}

const yearActivity = activityDays("2025-09-01", 371)
const quarterActivity = activityDays("2026-06-01", 91)

const uptimeQuarter = Array.from({ length: 90 }, (_, index) => {
  if (index === 41 || index === 42) {
    return "down" as const
  }
  if (index === 18 || index === 60 || index === 61) {
    return "degraded" as const
  }
  return "ok" as const
})

const activityExamples: Example[] = [
  {
    title: "Year",
    description:
      "Dated counts. The grid, month labels, and intensity scale are derived.",
    code: `import { GraphActivity } from "@/registry/default/graph-activity/graph-activity"

function activityDays(start: string, length: number) {
  const [year, month, day] = start.split("-").map(Number)
  const origin = Date.UTC(year, month - 1, day)
  return Array.from({ length }, (_, index) => {
    const time = origin + index * 86_400_000
    const date = new Date(time).toISOString().slice(0, 10)
    const dow = new Date(time).getUTCDay()
    const week = Math.floor(index / 7)
    let count = 0
    if (dow > 0 && dow < 6) {
      const pulse = (week + dow) % 9
      count =
        pulse === 0 ? 12 : pulse === 4 ? 7 : pulse % 3 === 0 ? 3 : index % 5 === 0 ? 1 : 0
    }
    return { date, count }
  })
}

<GraphActivity
  title="COMMITS"
  days={activityDays("2025-09-01", 371)}
/>`,
    preview: <GraphActivity days={yearActivity} title="COMMITS" />,
  },
  {
    title: "Quarter",
    description:
      'Shorter range. glyphs="ascii" swaps the block characters for .- =#@.',
    code: `import { GraphActivity } from "@/registry/default/graph-activity/graph-activity"

<GraphActivity
  title="SHIPPED"
  weekStartsOn={1}
  glyphs="ascii"
  days={activityDays("2026-06-01", 91)}
  caption="Jun – Aug"
/>`,
    preview: (
      <GraphActivity
        caption="Jun – Aug"
        days={quarterActivity}
        glyphs="ascii"
        title="SHIPPED"
        weekStartsOn={1}
      />
    ),
  },
]

const heatmapExamples: Example[] = [
  {
    title: "Punchcard",
    description: "Same glyphs as Activity. Low intensity uses the second hue.",
    code: `import { GraphHeatmap } from "@/registry/default/graph-heatmap/graph-heatmap"

<GraphHeatmap
  title="DEPLOYS"
  palette="duo"
  columns={["0", "4", "8", "12", "16", "20"]}
  rows={[
    { label: "Mon", values: [0, 1, 4, 8, 6, 1] },
    { label: "Tue", values: [0, 0, 5, 9, 4, 2] },
    { label: "Wed", values: [1, 0, 6, 12, 5, 1] },
    { label: "Thu", values: [0, 2, 4, 7, 8, 3] },
    { label: "Fri", values: [0, 1, 3, 5, 2, 0] },
    { label: "Sat", values: [0, 0, 1, 0, 0, 0] },
    { label: "Sun", values: [0, 0, 0, 1, 0, 0] },
  ]}
/>`,
    preview: (
      <GraphHeatmap
        columns={["0", "4", "8", "12", "16", "20"]}
        palette="duo"
        rows={[
          { label: "Mon", values: [0, 1, 4, 8, 6, 1] },
          { label: "Tue", values: [0, 0, 5, 9, 4, 2] },
          { label: "Wed", values: [1, 0, 6, 12, 5, 1] },
          { label: "Thu", values: [0, 2, 4, 7, 8, 3] },
          { label: "Fri", values: [0, 1, 3, 5, 2, 0] },
          { label: "Sat", values: [0, 0, 1, 0, 0, 0] },
          { label: "Sun", values: [0, 0, 0, 1, 0, 0] },
        ]}
        title="DEPLOYS"
      />
    ),
  },
  {
    title: "Coverage",
    description: "Lock max so two heatmaps share a scale.",
    code: `import { GraphHeatmap } from "@/registry/default/graph-heatmap/graph-heatmap"

<GraphHeatmap
  title="TESTS"
  max={10}
  legend={false}
  columns={["a", "b", "c", "d"]}
  rows={[
    { label: "auth", values: [10, 8, 4, 2] },
    { label: "billing", values: [6, 10, 7, 1] },
    { label: "docs", values: [2, 3, 9, 8] },
  ]}
/>`,
    preview: (
      <GraphHeatmap
        columns={["a", "b", "c", "d"]}
        legend={false}
        max={10}
        rows={[
          { label: "auth", values: [10, 8, 4, 2] },
          { label: "billing", values: [6, 10, 7, 1] },
          { label: "docs", values: [2, 3, 9, 8] },
        ]}
        title="TESTS"
      />
    ),
  },
]

const calendarExamples: Example[] = [
  {
    title: "Marked days",
    description: "month is 1–12. today is passed in so render stays stable.",
    code: `import { GraphCalendar } from "@/registry/default/graph-calendar/graph-calendar"

<GraphCalendar
  year={2026}
  month={8}
  today={27}
  marks={[12, 18, 27]}
/>`,
    preview: (
      <GraphCalendar marks={[12, 18, 27]} month={8} today={27} year={2026} />
    ),
  },
  {
    title: "Sunday start",
    description: "weekStartsOn 0 matches a US calendar.",
    code: `import { GraphCalendar } from "@/registry/default/graph-calendar/graph-calendar"

<GraphCalendar
  title="SHIP WEEK"
  year={2026}
  month={3}
  weekStartsOn={0}
  marks={[{ day: 12, accent: true }, { day: 18 }]}
/>`,
    preview: (
      <GraphCalendar
        marks={[{ day: 12, accent: true }, { day: 18 }]}
        month={3}
        title="SHIP WEEK"
        weekStartsOn={0}
        year={2026}
      />
    ),
  },
]

const waterfallExamples: Example[] = [
  {
    title: "Margin",
    description:
      "First row starts the run. Negative values use the second hue. Last row is the total.",
    code: `import { GraphWaterfall } from "@/registry/default/graph-waterfall/graph-waterfall"

<GraphWaterfall
  title="MARGIN"
  palette="duo"
  items={[
    { label: "Revenue", value: 48 },
    { label: "Refunds", value: -6 },
    { label: "Hosting", value: -4 },
    { label: "Profit", value: 38 },
  ]}
/>`,
    preview: (
      <GraphWaterfall
        items={[
          { label: "Revenue", value: 48 },
          { label: "Refunds", value: -6 },
          { label: "Hosting", value: -4 },
          { label: "Profit", value: 38 },
        ]}
        palette="duo"
        title="MARGIN"
      />
    ),
  },
  {
    title: "Headcount",
    description: "kind can be set by hand when the last row is not a total.",
    code: `import { GraphWaterfall } from "@/registry/default/graph-waterfall/graph-waterfall"

<GraphWaterfall
  title="TEAM"
  items={[
    { label: "Start", value: 12, kind: "start" },
    { label: "Hired", value: 4, kind: "in" },
    { label: "Left", value: 2, kind: "out" },
    { label: "Now", value: 14, kind: "end" },
  ]}
/>`,
    preview: (
      <GraphWaterfall
        items={[
          { label: "Start", value: 12, kind: "start" },
          { label: "Hired", value: 4, kind: "in" },
          { label: "Left", value: 2, kind: "out" },
          { label: "Now", value: 14, kind: "end" },
        ]}
        title="TEAM"
      />
    ),
  },
]

const uptimeExamples: Example[] = [
  {
    title: "Ninety days",
    description:
      "One glyph per day, wrapped every 30. Percent is the share of ok days.",
    code: `import { GraphUptime } from "@/registry/default/graph-uptime/graph-uptime"

<GraphUptime
  title="API"
  from="Jun 1"
  to="Aug 29"
  days={Array.from({ length: 90 }, (_, index) =>
    index === 41 || index === 42
      ? "down"
      : index === 18 || index === 60
        ? "degraded"
        : "ok"
  )}
/>`,
    preview: (
      <GraphUptime days={uptimeQuarter} from="Jun 1" title="API" to="Aug 29" />
    ),
  },
  {
    title: "Incident window",
    description: "empty days sit as dashes so a gap stays visible.",
    code: `import { GraphUptime } from "@/registry/default/graph-uptime/graph-uptime"

<GraphUptime
  title="WEBHOOKS"
  days={[
    "ok", "ok", "ok", "degraded", "ok",
    "empty", "empty",
    "ok", "down", "ok", "ok", "ok",
  ]}
  from="Mon"
  to="Fri"
/>`,
    preview: (
      <GraphUptime
        days={[
          "ok",
          "ok",
          "ok",
          "degraded",
          "ok",
          "empty",
          "empty",
          "ok",
          "down",
          "ok",
          "ok",
          "ok",
        ]}
        from="Mon"
        title="WEBHOOKS"
        to="Fri"
      />
    ),
  },
]

const slopeExamples: Example[] = [
  {
    title: "Traffic",
    description: "Up uses the accent. Down uses the second hue.",
    code: `import { GraphSlope } from "@/registry/default/graph-slope/graph-slope"

<GraphSlope
  title="TRAFFIC"
  palette="duo"
  fromLabel="2025"
  toLabel="2026"
  items={[
    { label: "docs", from: 8200, to: 12400 },
    { label: "copy", from: 5100, to: 4100 },
    { label: "ship", from: 640, to: 860 },
  ]}
/>`,
    preview: (
      <GraphSlope
        fromLabel="2025"
        items={[
          { label: "docs", from: 8200, to: 12400 },
          { label: "copy", from: 5100, to: 4100 },
          { label: "ship", from: 640, to: 860 },
        ]}
        palette="duo"
        title="TRAFFIC"
        toLabel="2026"
      />
    ),
  },
  {
    title: "Latency",
    description: "Decimals stay tabular. Flat rows use a dash.",
    code: `import { GraphSlope } from "@/registry/default/graph-slope/graph-slope"

<GraphSlope
  title="P95"
  fromLabel="before"
  toLabel="after"
  items={[
    { label: "read", from: 160, to: 142 },
    { label: "write", from: 388, to: 410 },
    { label: "cache", from: 12, to: 12 },
  ]}
/>`,
    preview: (
      <GraphSlope
        fromLabel="before"
        items={[
          { label: "read", from: 160, to: 142 },
          { label: "write", from: 388, to: 410 },
          { label: "cache", from: 12, to: 12 },
        ]}
        title="P95"
        toLabel="after"
      />
    ),
  },
]

const bulletExamples: Example[] = [
  {
    title: "Targets",
    description: "Fill is the actual. The marker is the target.",
    code: `import { GraphBullet } from "@/registry/default/graph-bullet/graph-bullet"

<GraphBullet
  title="BUDGET"
  items={[
    { label: "Design", value: 42, target: 40 },
    { label: "Motion", value: 18, target: 24 },
    { label: "Docs", value: 9, target: 12 },
  ]}
/>`,
    preview: (
      <GraphBullet
        items={[
          { label: "Design", value: 42, target: 40 },
          { label: "Motion", value: 18, target: 24 },
          { label: "Docs", value: 9, target: 12 },
        ]}
        title="BUDGET"
      />
    ),
  },
  {
    title: "Capacity",
    description: "max locks the track when values share a scale.",
    code: `import { GraphBullet } from "@/registry/default/graph-bullet/graph-bullet"

<GraphBullet
  title="LOAD"
  items={[
    { label: "CPU", value: 72, target: 80, max: 100 },
    { label: "RAM", value: 34, target: 64, max: 100 },
    { label: "SSD", value: 91, target: 90, max: 100 },
  ]}
/>`,
    preview: (
      <GraphBullet
        items={[
          { label: "CPU", value: 72, target: 80, max: 100 },
          { label: "RAM", value: 34, target: 64, max: 100 },
          { label: "SSD", value: 91, target: 90, max: 100 },
        ]}
        title="LOAD"
      />
    ),
  },
]

const timerExamples: Example[] = [
  {
    title: "Incident",
    description: "Counts up from a start time.",
    code: `import { GraphTimer } from "@/registry/default/graph-timer/graph-timer"

<GraphTimer
  title="INCIDENT"
  kind="elapsed"
  at="2026-08-27T08:00:00Z"
  caption="api"
/>`,
    preview: (
      <GraphTimer
        at="2026-08-27T08:00:00Z"
        caption="api"
        kind="elapsed"
        title="INCIDENT"
      />
    ),
  },
  {
    title: "Last deploy",
    description: "How long since the last deploy.",
    code: `import { GraphTimer } from "@/registry/default/graph-timer/graph-timer"

<GraphTimer
  title="SHIPPED"
  kind="ago"
  at="2026-08-27T12:00:00Z"
  caption="last deploy"
/>`,
    preview: (
      <GraphTimer
        at="2026-08-27T12:00:00Z"
        caption="last deploy"
        kind="ago"
        title="SHIPPED"
      />
    ),
  },
  {
    title: "Local",
    description: "The time of day, updating every second.",
    code: `import { GraphTimer } from "@/registry/default/graph-timer/graph-timer"

<GraphTimer
  title="LOCAL"
  kind="clock"
/>`,
    preview: <GraphTimer kind="clock" title="LOCAL" />,
  },
]

const countdownExamples: Example[] = [
  {
    title: "Freeze",
    description: "Until New Year's. After that it says open.",
    code: `import { GraphCountdown } from "@/registry/default/graph-countdown/graph-countdown"

<GraphCountdown
  title="FREEZE"
  to="2027-01-01T00:00:00Z"
  done="open"
  caption="until launch"
/>`,
    preview: (
      <GraphCountdown
        caption="until launch"
        done="open"
        title="FREEZE"
        to="2027-01-01T00:00:00Z"
      />
    ),
  },
  {
    title: "Closed",
    description: "The date has passed, so the frame shows the label you set.",
    code: `import { GraphCountdown } from "@/registry/default/graph-countdown/graph-countdown"

<GraphCountdown
  title="WINDOW"
  to="2020-01-01T00:00:00Z"
  done="closed"
/>`,
    preview: (
      <GraphCountdown done="closed" title="WINDOW" to="2020-01-01T00:00:00Z" />
    ),
  },
]

const frameExamples: Example[] = [
  {
    title: "Titled frame",
    description: "Compose Graph, GraphTitle, GraphBody, and GraphRule.",
    code: `import {
  Graph,
  GraphBody,
  GraphRule,
} from "@/registry/default/graph-frame/graph-frame"

<Graph title="USAGE">
  <GraphBody className="flex flex-col gap-4">
    <p>Content goes inside the frame.</p>
    <GraphRule />
    <p className="text-graph-muted">Same dashed border as the other graphs.</p>
  </GraphBody>
</Graph>`,
    preview: (
      <Graph title="USAGE">
        <GraphBody className="flex flex-col gap-4">
          <p>Content goes inside the frame.</p>
          <GraphRule />
          <p className="text-graph-muted">
            Same dashed border as the other graphs.
          </p>
        </GraphBody>
      </Graph>
    ),
  },
  {
    title: "Untitled",
    description:
      "Skip title and the top edge stays a dashed line. corner swaps the +.",
    code: `import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"

<Graph corner="*">
  <GraphBody>
    <p>Corners still sit on the frame. Caption is optional.</p>
  </GraphBody>
</Graph>`,
    preview: (
      <Graph corner="*">
        <GraphBody>
          <p>Corners still sit on the frame. Caption is optional.</p>
        </GraphBody>
      </Graph>
    ),
  },
]

export const examplesBySlug: Record<string, Example[]> = {
  "graph-table": tableExamples,
  "graph-flow": flowExamples,
  "graph-bars": barsExamples,
  "graph-rank": rankExamples,
  "graph-cells": cellsExamples,
  "graph-meter": meterExamples,
  "graph-spark": sparkExamples,
  "graph-tree": treeExamples,
  "graph-timeline": timelineExamples,
  "graph-stack": stackExamples,
  "graph-funnel": funnelExamples,
  "graph-gantt": ganttExamples,
  "graph-plot": plotExamples,
  "graph-waffle": waffleExamples,
  "graph-diff": diffExamples,
  "graph-invoice": invoiceExamples,
  "graph-compare": compareExamples,
  "graph-stat": statExamples,
  "graph-kpi": kpiExamples,
  "graph-spec": specExamples,
  "graph-activity": activityExamples,
  "graph-heatmap": heatmapExamples,
  "graph-calendar": calendarExamples,
  "graph-waterfall": waterfallExamples,
  "graph-uptime": uptimeExamples,
  "graph-slope": slopeExamples,
  "graph-bullet": bulletExamples,
  "graph-timer": timerExamples,
  "graph-countdown": countdownExamples,
  "graph-frame": frameExamples,
}

export { Examples }
