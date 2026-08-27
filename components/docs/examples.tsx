import type { ReactNode } from "react"

import { ComponentPreview } from "@/components/docs/preview"
import {
  Graph,
  GraphBars,
  GraphBody,
  GraphCells,
  GraphFlow,
  GraphMeter,
  GraphRadii,
  GraphRule,
  GraphScale,
  GraphSpark,
  GraphTable,
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
      "Accent the node that updates immediately. Stretch the muted sync.",
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
    title: "AI is an amplifier",
    description: "Same shape on both sides. The right group is just taller.",
    code: `import { GraphBars } from "@/registry/default/graph-bars/graph-bars"

<GraphBars
  title="AI IS AN AMPLIFIER"
  from={{ label: "your taste", values: [2, 4, 3, 5, 2] }}
  to={{ label: "amplified", size: "lg", values: [2, 4, 3, 5, 2] }}
/>`,
    preview: (
      <GraphBars
        from={{ label: "your taste", values: [2, 4, 3, 5, 2] }}
        title="AI IS AN AMPLIFIER"
        to={{ label: "amplified", size: "lg", values: [2, 4, 3, 5, 2] }}
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
      label: "animations.dev",
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
            label: "animations.dev",
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
    description: "A single grid. Empty cells stay as frames.",
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

const scaleExamples: Example[] = [
  {
    title: "Contrast",
    description: "Accent the ratios that actually pass.",
    code: `import { GraphScale } from "@/registry/default/graph-scale/graph-scale"

<GraphScale
  title="CONTRAST"
  items={[
    { ratio: "1.4:1", label: "you can't read this", token: "14" },
    { ratio: "2.3:1", label: "you strain to read this", token: "23" },
    { ratio: "4.5:1", label: "you can read this", token: "45", accent: true },
    { ratio: "7:1", label: "you can read this too", token: "70", accent: true },
  ]}
/>`,
    preview: (
      <GraphScale
        items={[
          { ratio: "1.4:1", label: "you can't read this", token: "14" },
          { ratio: "2.3:1", label: "you strain to read this", token: "23" },
          {
            ratio: "4.5:1",
            label: "you can read this",
            token: "45",
            accent: true,
          },
          {
            ratio: "7:1",
            label: "you can read this too",
            token: "70",
            accent: true,
          },
        ]}
        title="CONTRAST"
      />
    ),
  },
  {
    title: "Type size",
    description: "Same component, different labels.",
    code: `import { GraphScale } from "@/registry/default/graph-scale/graph-scale"

<GraphScale
  title="TYPE SIZE"
  items={[
    { ratio: "12px", label: "captions only", token: "14" },
    { ratio: "14px", label: "dense UI, never body", token: "23" },
    { ratio: "16px", label: "body on mobile", token: "45", accent: true },
    { ratio: "18px", label: "intro copy", token: "70", accent: true },
  ]}
/>`,
    preview: (
      <GraphScale
        items={[
          { ratio: "12px", label: "captions only", token: "14" },
          { ratio: "14px", label: "dense UI, never body", token: "23" },
          {
            ratio: "16px",
            label: "body on mobile",
            token: "45",
            accent: true,
          },
          { ratio: "18px", label: "intro copy", token: "70", accent: true },
        ]}
        title="TYPE SIZE"
      />
    ),
  },
]

const radiiExamples: Example[] = [
  {
    title: "Nested 16 / 4",
    description: "The default. Inner is 12px.",
    code: `import { GraphRadii } from "@/registry/default/graph-radii/graph-radii"

<GraphRadii />`,
    preview: <GraphRadii />,
  },
  {
    title: "Nested 24 / 8",
    description: "Larger outer, larger inset. Inner is 16px.",
    code: `import { GraphRadii } from "@/registry/default/graph-radii/graph-radii"

<GraphRadii title="NESTED RADII" outer={24} inset={8} />`,
    preview: <GraphRadii inset={8} outer={24} />,
  },
]

const meterExamples: Example[] = [
  {
    title: "Shipped",
    description: "Characters, not a progress bar.",
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
    description: "Swap a glyph. That's the animation.",
    code: `import { GraphSpark } from "@/registry/default/graph-spark/graph-spark"

<GraphSpark
  title="LATENCY"
  data={[2, 3, 4, 3, 6, 5, 8, 7, 9, 6, 10, 8]}
  caption="swap a glyph, that's the animation"
/>`,
    preview: (
      <GraphSpark
        caption="swap a glyph, that's the animation"
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
    <p>Drop a graph next to your prose.</p>
    <GraphRule />
    <p className="text-graph-muted">The frame is the component.</p>
  </GraphBody>
</Graph>`,
    preview: (
      <Graph title="USAGE">
        <GraphBody className="flex flex-col gap-4">
          <p>Drop a graph next to your prose.</p>
          <GraphRule />
          <p className="text-graph-muted">The frame is the component.</p>
        </GraphBody>
      </Graph>
    ),
  },
  {
    title: "Untitled",
    description: "Skip title and the top edge stays a dashed line.",
    code: `import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"

<Graph>
  <GraphBody>
    <p>Corners still sit on pluses. Caption is optional.</p>
  </GraphBody>
</Graph>`,
    preview: (
      <Graph>
        <GraphBody>
          <p>Corners still sit on pluses. Caption is optional.</p>
        </GraphBody>
      </Graph>
    ),
  },
]

export const examplesBySlug: Record<string, Example[]> = {
  "graph-table": tableExamples,
  "graph-flow": flowExamples,
  "graph-bars": barsExamples,
  "graph-cells": cellsExamples,
  "graph-scale": scaleExamples,
  "graph-radii": radiiExamples,
  "graph-meter": meterExamples,
  "graph-spark": sparkExamples,
  "graph-frame": frameExamples,
}

export { Examples }
